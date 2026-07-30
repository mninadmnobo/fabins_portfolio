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
 * @param cors  browser origin rules
 * @param admin credentials for the protected endpoints
 * @param mail  email notification configuration
 */
@ConfigurationProperties(prefix = "fabins")
public record ApiProperties(Cors cors, Admin admin, Mail mail) {

    /**
     * Which browser origins may call this API.
     *
     * @param allowedOrigins exact origins, e.g. {@code http://localhost:3000}.
     *                       Wildcards are not used: credentials cannot be sent
     *                       to a wildcard origin, and listing origins
     *                       explicitly keeps an unknown site from calling the
     *                       API from a visitor's browser.
     */
    public record Cors(List<String> allowedOrigins) {
    }

    /**
     * Credentials for the admin endpoints.
     *
     * @param username admin account name
     * @param password <strong>must be supplied by an environment variable in
     *                 production.</strong> The default in {@code application.yml}
     *                 exists only so the app starts locally; the {@code prod}
     *                 profile has no default and will refuse to boot without it.
     */
    public record Admin(String username, String password) {
    }

    /**
     * Email notification settings and templates metadata.
     *
     * @param adminAddress recipient address for internal alert notifications
     * @param fromAddress  sender address on outgoing emails
     * @param adminSubject subject format string for internal alerts
     * @param senderSubject subject format string for sender confirmations
     */
    public record Mail(
            String adminAddress,
            String fromAddress,
            String adminSubject,
            String senderSubject,
            String acknowledgementSubject
    ) {
    }
}
