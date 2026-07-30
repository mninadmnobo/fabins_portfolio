package com.fabins.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * Type-safe binding for the {@code fabins.*} keys in {@code application.yml}.
 *
 * <p>Using a record instead of scattered {@code @Value("${…}")} annotations
 * means the configuration is discoverable in one place, and a missing or
 * misspelled key fails at startup rather than at the first request that needs
 * it. Registered via {@code @EnableConfigurationProperties} on the main class.
 *
 * <p><strong>Every component below must have a corresponding key in
 * {@code application.yml}.</strong> Records are bound by constructor, so a key
 * that is absent everywhere binds as {@code null} rather than failing loudly.
 *
 * @param cors       browser origin rules
 * @param admin      credentials for the protected endpoints
 * @param mail       email notification configuration
 * @param backendUrl public origin this API is reachable at, used to build
 *                   absolute links that are placed inside outgoing emails
 */
@ConfigurationProperties(prefix = "fabins")
public record ApiProperties(Cors cors, Admin admin, Mail mail, String backendUrl) {

    /**
     * Which browser origins may call this API.
     *
     * @param allowedOrigins origin patterns, e.g. {@code http://localhost:3000}
     *                       or {@code https://*.vercel.app}. Bound in
     *                       {@code SecurityConfig} via
     *                       {@code setAllowedOriginPatterns}, which — unlike
     *                       {@code setAllowedOrigins} — supports wildcards
     *                       alongside {@code allowCredentials(true)}.
     */
    public record Cors(List<String> allowedOrigins) {
    }

    /**
     * Credentials for the admin endpoints.
     *
     * @param username admin account name
     * @param password <strong>must be supplied by an environment variable in
     *                 production.</strong> The default in {@code application.yml}
     *                 exists only so the app starts locally.
     */
    public record Admin(String username, String password) {
    }

    /**
     * Email notification settings.
     *
     * <p>The engine that actually delivers a message is chosen in
     * {@code EmailServiceImpl} from {@link #apiKey()}: a Brevo key selects the
     * HTTPS REST transport, anything else falls through to JavaMail SMTP.
     *
     * @param adminAddress          recipient address for internal alert notifications
     * @param fromAddress           sender address on outgoing emails; must be a
     *                              verified sender in the Brevo account, or the
     *                              REST API rejects the send with HTTP 400
     * @param senderName            display name shown next to {@code fromAddress}
     *                              in the recipient's inbox
     * @param apiKey                Brevo credential. A value starting with
     *                              {@code xsmtpsib-} is a Brevo SMTP/API key and
     *                              enables the HTTPS REST transport; blank
     *                              disables live sending entirely (dev mode)
     * @param adminSubject          subject format string for internal alerts,
     *                              {@code %s} = mill name
     * @param senderSubject         subject format string for sender confirmations,
     *                              {@code %s} = reference code
     * @param acknowledgementSubject subject format string for acknowledgements,
     *                              {@code %s} = reference code
     */
    public record Mail(
            String adminAddress,
            String fromAddress,
            String senderName,
            String apiKey,
            String adminSubject,
            String senderSubject,
            String acknowledgementSubject
    ) {
    }
}
