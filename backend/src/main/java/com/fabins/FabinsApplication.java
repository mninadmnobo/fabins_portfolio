package com.fabins;

import com.fabins.config.ApiProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Entry point for the FABINS API.
 *
 * <p>{@code @SpringBootApplication} enables component scanning for this package
 * and everything beneath it, which is why every other class lives under
 * {@code com.fabins}. A class placed outside this package is silently never
 * registered as a bean.
 *
 * <p>{@code @EnableJpaAuditing} is what makes the {@code @CreatedDate} and
 * {@code @LastModifiedDate} fields on entities populate themselves.
 *
 * <h2>Running locally</h2>
 * <pre>
 *   ./mvnw spring-boot:run
 * </pre>
 * Then open <a href="http://localhost:8080/swagger-ui.html">the API docs</a>.
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties(ApiProperties.class)
public class FabinsApplication {

    public static void main(String[] args) {
        SpringApplication.run(FabinsApplication.class, args);
    }
}
