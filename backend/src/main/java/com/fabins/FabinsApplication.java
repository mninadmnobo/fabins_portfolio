package com.fabins;

import com.fabins.config.ApiProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Entry point for the FABINS API.
 *
 * <p>
 * {@code @SpringBootApplication} enables component scanning for this package
 * and everything beneath it, which is why every other class lives under
 * {@code com.fabins}. A class placed outside this package is silently never
 * registered as a bean.
 *
 * <p>
 * {@code @EnableJpaAuditing} is what makes the {@code @CreatedDate} and
 * {@code @LastModifiedDate} fields on entities populate themselves.
 *
 * <h2>Running locally</h2>
 * 
 * <pre>
 *   ./mvnw spring-boot:run
 * </pre>
 * 
 * Then open <a href="http://localhost:8080/swagger-ui.html">the API docs</a>.
 */
@SpringBootApplication
@EnableAsync
@EnableJpaAuditing
@EnableConfigurationProperties(ApiProperties.class)
public class FabinsApplication {

    public static void main(String[] args) {
        loadDotEnv();
        sanitizeDatabaseUrl();
        SpringApplication.run(FabinsApplication.class, args);
    }

    /**
     * Prepends `jdbc:` prefix to standard PostgreSQL URLs provided by cloud platforms like Render or Railway.
     */
    private static void sanitizeDatabaseUrl() {
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl == null || dbUrl.isBlank()) {
            dbUrl = System.getProperty("DATABASE_URL");
        }
        if (dbUrl != null && !dbUrl.isBlank()) {
            if ((dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://")) && !dbUrl.startsWith("jdbc:")) {
                String jdbcUrl = "jdbc:" + dbUrl;
                System.setProperty("DATABASE_URL", jdbcUrl);
                System.setProperty("spring.datasource.url", jdbcUrl);
            }
        }
    }

    /**
     * Automatically loads key-value pairs from gitignored `.env` file into system
     * properties
     * for frictionless local development without manual terminal environment
     * passing.
     */
    private static void loadDotEnv() {
        java.io.File envFile = new java.io.File("../.env");
        if (!envFile.exists()) {
            envFile = new java.io.File(".env");
        }
        if (envFile.exists()) {
            try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.FileReader(envFile))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    line = line.trim();
                    if (!line.isEmpty() && !line.startsWith("#") && line.contains("=")) {
                        int eqIdx = line.indexOf('=');
                        String key = line.substring(0, eqIdx).trim();
                        String val = line.substring(eqIdx + 1).trim();
                        if (val.length() >= 2 && ((val.startsWith("\"") && val.endsWith("\""))
                                || (val.startsWith("'") && val.endsWith("'")))) {
                            val = val.substring(1, val.length() - 1);
                        }
                        // Set both original ENV format (SPRING_MAIL_PASSWORD) and Spring property
                        // format (spring.mail.password)
                        // so System properties take absolute precedence over old OS terminal variables.
                        System.setProperty(key, val);
                        String springKey = key.toLowerCase().replace('_', '.');
                        System.setProperty(springKey, val);
                    }
                }
            } catch (Exception ignored) {
                // Silently ignore if file reading fails
            }
        }
    }
}
