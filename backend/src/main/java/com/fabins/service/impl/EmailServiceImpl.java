package com.fabins.service.impl;

import com.fabins.config.ApiProperties;
import com.fabins.entity.DeploymentRequest;
import com.fabins.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;
import java.util.Objects;

/**
 * Sends the transactional emails triggered by a deployment request.
 *
 * <h2>Two delivery engines, tried in order</h2>
 * <ol>
 *   <li><strong>Brevo REST API over HTTPS (port 443)</strong> — the primary
 *       engine, used whenever the configured credential is a Brevo key
 *       ({@value #BREVO_KEY_PREFIX}…). Cloud PaaS providers (Render, Fly, most
 *       of AWS) block outbound SMTP on ports 25/465/587 to fight spam, so an
 *       SMTP connection there does not fail fast — it hangs until the socket
 *       times out. Port 443 is never blocked, which is why this path is first
 *       and why it returns in well under a second.</li>
 *   <li><strong>JavaMail over SMTPS (port 465, implicit SSL)</strong> — the
 *       fallback, used when the REST call fails or the deployment supplies a
 *       non-Brevo SMTP credential. Configured under {@code spring.mail.*}.</li>
 * </ol>
 *
 * <p>With no credential configured at all, both engines are skipped and the
 * message is logged instead, so local development needs no mail account.
 *
 * <h2>Threading</h2>
 * Every public method is {@code @Async}: dispatch runs on the
 * {@code applicationTaskExecutor} pool so the HTTP response to the visitor
 * returns immediately rather than waiting on a mail server. Nothing is
 * propagated back to the caller — a failed notification must never turn a
 * successfully recorded enquiry into an error response — so failures are logged
 * with their full stack trace and nothing else.
 *
 * @see com.fabins.config.ApiProperties.Mail
 */
@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    /** Brevo's transactional email endpoint. HTTPS only, so port 443. */
    private static final URI BREVO_ENDPOINT = URI.create("https://api.brevo.com/v3/smtp/email");

    /** Brevo issues keys starting with xsmtpsib- (legacy/SMTP keys) or xkeysib- (v3 REST/MCP keys). */
    private static final String BREVO_KEY_PREFIX_SMTP = "xsmtpsib-";
    private static final String BREVO_KEY_PREFIX_REST = "xkeysib-";

    /** Caps how long a hung network path can occupy an async worker thread. */
    private static final Duration HTTP_TIMEOUT = Duration.ofSeconds(10);

    private static final String TEMPLATE_ADMIN_NOTIFICATION = "templates/email/admin-notification.html";
    private static final String TEMPLATE_SENDER_CONFIRMATION = "templates/email/sender-confirmation.html";
    private static final String TEMPLATE_ACKNOWLEDGEMENT = "templates/email/acknowledgement-email.html";

    /**
     * Null when no {@code spring.mail.host} is configured. Resolved once at
     * construction rather than per send, since the bean cannot appear later.
     */
    private final JavaMailSender mailSender;

    private final ApiProperties properties;
    private final ObjectMapper objectMapper;

    /**
     * Shared across sends. {@link HttpClient} is immutable and thread-safe, and
     * reusing one keeps the TLS session and connection pool warm — a cold
     * handshake per email would cost more than the request itself.
     */
    private final HttpClient httpClient;

    /**
     * @param mailSenderProvider looked up through an {@link ObjectProvider} because
     *                           Spring Boot only defines a {@link JavaMailSender}
     *                           when {@code spring.mail.host} is set; a plain
     *                           constructor parameter would make the whole
     *                           application fail to start without mail configured
     * @param properties         the bound {@code fabins.*} configuration
     * @param objectMapper       Spring's configured mapper, used to build the Brevo
     *                           request body so that quotes, newlines, and non-ASCII
     *                           characters in a template are escaped correctly
     */
    public EmailServiceImpl(ObjectProvider<JavaMailSender> mailSenderProvider,
                            ApiProperties properties,
                            ObjectMapper objectMapper) {
        this.mailSender = mailSenderProvider.getIfAvailable();
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(HTTP_TIMEOUT)
                .build();
    }

    /**
     * Notifies the R&D team of a new enquiry and confirms receipt to the mill.
     *
     * <p>The two sends are independent: a failure of the first must not suppress
     * the second, so each is dispatched separately.
     *
     * @param request the newly persisted deployment request
     */
    @Override
    @Async
    public void sendDeploymentRequestNotifications(DeploymentRequest request) {
        log.info("Dispatching deployment request notifications for id {} [Ref: {}]",
                request.getId(), request.getReferenceCode());

        sendAdminNotification(request);
        sendSenderConfirmation(request);
    }

    /**
     * Tells the mill contact that a human on the R&D team has picked up their
     * enquiry. Triggered by the one-click acknowledge link in the admin email.
     *
     * @param request the request that has just moved to {@code IN_REVIEW}
     */
    @Override
    @Async
    public void sendAcknowledgementNotification(DeploymentRequest request) {
        ApiProperties.Mail mail = properties.mail();
        String reference = request.getReferenceCode();

        String body = render(TEMPLATE_ACKNOWLEDGEMENT, Map.of(
                "contactName", request.getContactName(),
                "millName", request.getMillName(),
                "requestId", reference,
                "adminEmail", mail.adminAddress()
        ));

        dispatch(request.getEmail(),
                String.format(mail.acknowledgementSubject(), reference),
                body,
                mail.adminAddress());
    }

    /**
     * Sends the internal alert carrying the submitter's full details plus the
     * one-click acknowledge link.
     *
     * <p>{@code Reply-To} is set to the mill's address so that replying from the
     * inbox reaches the enquirer directly rather than the shared sender account.
     */
    private void sendAdminNotification(DeploymentRequest request) {
        ApiProperties.Mail mail = properties.mail();
        String reference = request.getReferenceCode();

        String body = render(TEMPLATE_ADMIN_NOTIFICATION, Map.ofEntries(
                Map.entry("acknowledgeUrl", acknowledgeUrl(request)),
                Map.entry("requestId", reference),
                Map.entry("millName", request.getMillName()),
                Map.entry("contactName", request.getContactName()),
                Map.entry("designation", Objects.requireNonNullElse(request.getDesignation(), "N/A")),
                Map.entry("email", request.getEmail()),
                Map.entry("phone", Objects.requireNonNullElse(request.getPhone(), "N/A")),
                Map.entry("location", Objects.requireNonNullElse(request.getLocation(), "N/A")),
                Map.entry("factoryType", Objects.requireNonNullElse(request.getFactoryType(), "N/A")),
                Map.entry("inspectionFramesCount", Objects.requireNonNullElse(request.getInspectionFramesCount(), "N/A")),
                Map.entry("fabricTypes", Objects.requireNonNullElse(request.getFabricTypes(), "N/A")),
                Map.entry("dailyProductionVolume", Objects.requireNonNullElse(request.getDailyProductionVolume(), "N/A")),
                Map.entry("inspectionSpeed", Objects.requireNonNullElse(request.getInspectionSpeed(), "N/A")),
                Map.entry("rollWidth", Objects.requireNonNullElse(request.getRollWidth(), "N/A")),
                Map.entry("defectTypes", Objects.requireNonNullElse(request.getDefectTypes(), "N/A")),
                Map.entry("erpIntegrationNeeded", Objects.requireNonNullElse(request.getErpIntegrationNeeded(), "N/A")),
                Map.entry("targetTimeline", Objects.requireNonNullElse(request.getTargetTimeline(), "N/A")),
                Map.entry("submittedAt", String.valueOf(request.getSubmittedAt())),
                Map.entry("message", Objects.requireNonNullElse(request.getMessage(), "None provided"))
        ));

        dispatch(mail.adminAddress(),
                String.format(mail.adminSubject(), request.getMillName()),
                body,
                request.getEmail());
    }

    /** Sends the "we have your enquiry" receipt to the mill contact. */
    private void sendSenderConfirmation(DeploymentRequest request) {
        ApiProperties.Mail mail = properties.mail();
        String reference = request.getReferenceCode();

        String body = render(TEMPLATE_SENDER_CONFIRMATION, Map.of(
                "contactName", request.getContactName(),
                "millName", request.getMillName(),
                "requestId", reference,
                "adminEmail", mail.adminAddress()
        ));

        dispatch(request.getEmail(),
                String.format(mail.senderSubject(), reference),
                body,
                mail.adminAddress());
    }

    /**
     * Builds the absolute URL of the one-click acknowledge endpoint.
     *
     * <p>Must be absolute: the link is clicked from an email client, which has
     * no notion of this server's origin. The base comes from
     * {@code fabins.backend-url} ({@code FABINS_BACKEND_URL} in the environment),
     * which is the single value to change when the API moves to a custom domain.
     *
     * @return e.g. {@code https://api.fabins.com/api/v1/deployment-requests/{id}/acknowledge}
     */
    private String acknowledgeUrl(DeploymentRequest request) {
        String base = properties.backendUrl().trim();
        if (base.endsWith("/")) {
            base = base.substring(0, base.length() - 1);
        }
        return base + "/api/v1/deployment-requests/" + request.getId() + "/acknowledge";
    }

    /**
     * Loads an HTML template from the classpath and substitutes its placeholders.
     *
     * <p>Deliberately not Thymeleaf: these templates only ever interpolate flat
     * strings, and plain replacement keeps the email layer free of a view engine
     * and its startup cost.
     *
     * @param resourcePath classpath location, e.g. {@code templates/email/x.html}
     * @param values       placeholder name (without braces) to replacement text
     * @return the rendered HTML document
     * @throws IllegalStateException if the template is missing from the jar,
     *                               which is a packaging fault and not something
     *                               a retry could fix
     */
    private String render(String resourcePath, Map<String, String> values) {
        String template;
        try (InputStream in = new ClassPathResource(resourcePath).getInputStream()) {
            template = new String(in.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("Email template missing from classpath: " + resourcePath, e);
        }

        for (Map.Entry<String, String> value : values.entrySet()) {
            template = template.replace("{{" + value.getKey() + "}}", value.getValue());
        }
        return template;
    }

    /**
     * Delivers one message, trying the HTTPS engine before the SMTP engine.
     *
     * <p>This is the only method that decides which transport is used, so adding
     * a third provider means adding one branch here and nothing else.
     *
     * @param to      recipient address
     * @param subject rendered subject line
     * @param html    rendered HTML body
     * @param replyTo address a reply should go to, which is rarely the sender
     */
    private void dispatch(String to, String subject, String html, String replyTo) {
        String apiKey = properties.mail().apiKey();

        // No credential anywhere — `fabins.mail.api-key` falls back to the SMTP
        // password, so blank means nothing at all is configured. Log and stop:
        // attempting SMTP here would fail on authentication and bury a
        // developer's console in stack traces on every form submission.
        if (apiKey == null || apiKey.isBlank()) {
            log.info("[MAIL SIMULATED] To: {} | Subject: '{}' — set SPRING_MAIL_PASSWORD to send for real",
                    to, subject);
            return;
        }

        String trimmedKey = apiKey.trim();
        boolean isBrevoKey = trimmedKey.startsWith(BREVO_KEY_PREFIX_SMTP) || trimmedKey.startsWith(BREVO_KEY_PREFIX_REST);

        if (isBrevoKey && sendViaBrevoApi(to, subject, html, replyTo, trimmedKey)) {
            return;
        }

        // Engine 2 — SMTPS.
        sendViaSmtp(to, subject, html, replyTo);
    }

    /**
     * Posts the message to Brevo's transactional email API.
     *
     * <p>The body is assembled as a Jackson {@link ObjectNode} rather than by
     * string formatting: an email body is arbitrary HTML containing quotes and
     * newlines, and hand-escaping it is the kind of thing that works until the
     * day a mill's name contains an apostrophe.
     *
     * @param apiKey a validated Brevo key
     * @return {@code true} when Brevo accepted the message; {@code false} on any
     *         failure, having logged the cause, so the caller can fall back
     */
    private boolean sendViaBrevoApi(String to, String subject, String html, String replyTo, String apiKey) {
        try {
            ObjectNode payload = objectMapper.createObjectNode();
            payload.putObject("sender")
                    .put("name", properties.mail().senderName())
                    .put("email", properties.mail().fromAddress());
            payload.putArray("to").addObject().put("email", to);
            payload.putObject("replyTo").put("email", replyTo != null ? replyTo : properties.mail().fromAddress());
            payload.put("subject", subject);
            payload.put("htmlContent", html);

            HttpRequest httpRequest = HttpRequest.newBuilder(BREVO_ENDPOINT)
                    .timeout(HTTP_TIMEOUT)
                    .header("accept", "application/json")
                    // Trimmed: a key pasted into a dashboard env field very often
                    // carries a trailing newline, which produces a bare 401.
                    .header("api-key", apiKey.trim())
                    .header("content-type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(
                            objectMapper.writeValueAsString(payload), StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("Email delivered to {} via Brevo REST API [HTTP {}]", to, response.statusCode());
                return true;
            }

            log.warn("Brevo REST API rejected the message for {} [HTTP {}]: {} — falling back to SMTP",
                    to, response.statusCode(), response.body());
            return false;
        } catch (InterruptedException e) {
            // Restore the flag: swallowing an interrupt hides shutdown from the
            // pool and can leave the JVM refusing to stop.
            Thread.currentThread().interrupt();
            log.warn("Brevo REST API call for {} was interrupted — falling back to SMTP", to, e);
            return false;
        } catch (Exception e) {
            log.warn("Brevo REST API call for {} failed — falling back to SMTP", to, e);
            return false;
        }
    }

    /**
     * Delivers the message with JavaMail over the configured SMTP transport.
     *
     * <p>Reached only when the REST engine was skipped or failed. The bean is
     * absent when {@code spring.mail.host} is unset, which is not the case in
     * any shipped profile but is cheap to guard against.
     */
    private void sendViaSmtp(String to, String subject, String html, String replyTo) {
        if (mailSender == null) {
            log.error("Cannot send to {}: no mail host is configured (spring.mail.host)", to);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            // multipart=true is required for an HTML body; UTF-8 keeps the
            // reference codes and any non-ASCII mill name intact.
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());

            helper.setFrom(properties.mail().fromAddress(), properties.mail().senderName());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            if (replyTo != null && !replyTo.isBlank()) {
                helper.setReplyTo(replyTo);
            }

            mailSender.send(message);
            log.info("Email delivered to {} via SMTP", to);
        } catch (Exception e) {
            // Terminal: both engines are exhausted. Logged with the stack trace
            // because the cause is usually a connect timeout (a blocked port) or
            // an authentication failure, and only the trace distinguishes them.
            log.error("Email delivery to {} failed on every configured engine", to, e);
        }
    }
}