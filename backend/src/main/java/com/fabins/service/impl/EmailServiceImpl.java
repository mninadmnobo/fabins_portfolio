package com.fabins.service.impl;

import com.fabins.config.ApiProperties;
import com.fabins.entity.DeploymentRequest;
import com.fabins.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/**
 * Implementation of {@link EmailService} that sends formatted HTML email notifications
 * using external HTML templates and centralized configuration properties.
 */
@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;
    private final ApiProperties apiProperties;

    public EmailServiceImpl(ObjectProvider<JavaMailSender> mailSenderProvider, ApiProperties apiProperties) {
        this.mailSender = mailSenderProvider.getIfAvailable();
        this.apiProperties = apiProperties;
    }

    @Override
    @Async
    public void sendDeploymentRequestNotifications(DeploymentRequest request) {
        log.info("🚀 Starting background email dispatch for deployment request id {} [Ref: {}]",
                request.getId(), request.getReferenceCode());
        try {
            sendAdminNotification(request);
            sendSenderConfirmation(request);
        } catch (Exception e) {
            log.error("❌ Failed to send deployment request email notifications for request id {}: ",
                    request.getId(), e);
        }
    }

    @Override
    @Async
    public void sendAcknowledgementNotification(DeploymentRequest request) {
        log.info("🚀 Starting background acknowledgement email dispatch for request id {} [Ref: {}]",
                request.getId(), request.getReferenceCode());
        try {
            String adminEmail = apiProperties.mail().adminAddress();
            String fromEmail = apiProperties.mail().fromAddress();
            String refCode = request.getReferenceCode();
            String subject = String.format(apiProperties.mail().acknowledgementSubject(), refCode);

            String template = loadTemplate("templates/email/acknowledgement-email.html");
            String content = template
                    .replace("{{contactName}}", request.getContactName())
                    .replace("{{millName}}", request.getMillName())
                    .replace("{{requestId}}", refCode)
                    .replace("{{adminEmail}}", adminEmail);

            sendHtmlEmail(request.getEmail(), fromEmail, subject, content, adminEmail);
            log.info("Acknowledgement confirmation email dispatched to {} [Ref: {}]", request.getEmail(), refCode);
        } catch (Exception e) {
            log.error("Failed to send acknowledgement email for request id {}: ",
                    request.getId(), e);
        }
    }

    /**
     * Sends a detailed formal notification email to the R&D admin team.
     */
    private void sendAdminNotification(DeploymentRequest request) {
        String adminEmail = apiProperties.mail().adminAddress();
        String fromEmail = apiProperties.mail().fromAddress();
        String refCode = request.getReferenceCode();
        String subject = String.format(apiProperties.mail().adminSubject(), request.getMillName());
        String backendUrl = System.getenv("FABINS_BACKEND_URL");
        if (backendUrl == null || backendUrl.isBlank()) {
            backendUrl = System.getProperty("FABINS_BACKEND_URL", "https://fabins-api.onrender.com");
        }
        if (backendUrl.endsWith("/")) {
            backendUrl = backendUrl.substring(0, backendUrl.length() - 1);
        }
        String acknowledgeUrl = backendUrl + "/api/v1/deployment-requests/" + request.getId() + "/acknowledge";

        String template = loadTemplate("templates/email/admin-notification.html");
        String content = template
                .replace("{{acknowledgeUrl}}", acknowledgeUrl)
                .replace("{{requestId}}", refCode)
                .replace("{{millName}}", request.getMillName())
                .replace("{{contactName}}", request.getContactName())
                .replace("{{email}}", request.getEmail())
                .replace("{{phone}}", request.getPhone() != null ? request.getPhone() : "N/A")
                .replace("{{submittedAt}}", String.valueOf(request.getSubmittedAt()))
                .replace("{{message}}", request.getMessage() != null ? request.getMessage() : "None provided");

        sendHtmlEmail(adminEmail, fromEmail, subject, content, request.getEmail());
        log.info("R&D team email notification dispatched to {} [Ref: {}]", adminEmail, refCode);
    }

    /**
     * Sends an automated confirmation email to the submitting mill contact person.
     */
    private void sendSenderConfirmation(DeploymentRequest request) {
        String adminEmail = apiProperties.mail().adminAddress();
        String fromEmail = apiProperties.mail().fromAddress();
        String refCode = request.getReferenceCode();
        String subject = String.format(apiProperties.mail().senderSubject(), refCode);

        String template = loadTemplate("templates/email/sender-confirmation.html");
        String content = template
                .replace("{{contactName}}", request.getContactName())
                .replace("{{millName}}", request.getMillName())
                .replace("{{requestId}}", refCode)
                .replace("{{adminEmail}}", adminEmail);

        sendHtmlEmail(request.getEmail(), fromEmail, subject, content, adminEmail);
        log.info("Sender confirmation email dispatched to {} [Ref: {}]", request.getEmail(), refCode);
    }

    /**
     * Helper to read external HTML template files from classpath resources.
     */
    private String loadTemplate(String resourcePath) {
        try (InputStream is = new ClassPathResource(resourcePath).getInputStream()) {
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("Failed to load email template: {}", resourcePath, e);
            throw new IllegalStateException("Email template missing: " + resourcePath, e);
        }
    }

    private void sendHtmlEmail(String to, String from, String subject, String htmlContent, String replyTo) {
        if (mailSender == null) {
            log.info("📧 [MAIL DEV SIMULATION] To: {} | Subject: '{}' (Configure SPRING_MAIL_PASSWORD to send live SMTP emails)",
                    to, subject);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(from, "Saturn Textiles R&D");
            } catch (Exception ignored) {
                helper.setFrom(from);
            }
            helper.setTo(to);
            if (replyTo != null && !replyTo.isBlank()) {
                helper.setReplyTo(replyTo);
            }
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            log.warn("SMTP send skipped or failed for recipient {}: {}. (Configure spring.mail properties for live SMTP delivery)",
                    to, e.getMessage(), e);
        }
    }
}
