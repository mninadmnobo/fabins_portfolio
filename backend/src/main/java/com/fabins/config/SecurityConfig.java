package com.fabins.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Who can call what, and from which browser origins.
 *
 * <h2>The access model</h2>
 * <ul>
 *   <li>{@code POST /api/v1/deployment-requests} is <strong>public</strong> —
 *       it backs the contact form on the public website.</li>
 *   <li>Every other endpoint on that resource returns submitters' names, email
 *       addresses, and phone numbers, so it requires the {@code ADMIN} role.
 *       Leaving these open would publish the company's entire sales pipeline.</li>
 *   <li>{@code /actuator/health} is public so a load balancer can probe it;
 *       the remaining actuator endpoints are not.</li>
 *   <li>Swagger UI is open in development. See the note on {@code prod} below.</li>
 * </ul>
 *
 * <h2>Why HTTP Basic and not JWT</h2>
 * There is exactly one admin account and no browser-based admin UI yet. Basic
 * over HTTPS is the right amount of machinery for that, and swapping it for
 * OAuth2 or JWT later means changing only this class. Do not use Basic without
 * TLS in production — the credentials are merely base64-encoded, not encrypted.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final ApiProperties properties;

    public SecurityConfig(ApiProperties properties) {
        this.properties = properties;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CORS must be enabled here for the rules below to apply to
                // preflight requests; the source bean is defined further down.
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                /*
                 * CSRF protection is disabled because this is a stateless API
                 * authenticated per-request with an Authorization header, not
                 * with a session cookie. CSRF attacks rely on the browser
                 * attaching a cookie automatically; with no cookie there is
                 * nothing to forge. Re-enable it the moment cookie or session
                 * authentication is introduced.
                 */
                .csrf(csrf -> csrf.disable())

                // No server-side session is created or consulted.
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        // Public: the website's contact form and email acknowledgment link.
                        .requestMatchers(HttpMethod.POST, "/api/v1/deployment-requests").permitAll()
                        .requestMatchers("/api/v1/deployment-requests/*/acknowledge").permitAll()

                        // Public: liveness probe for load balancers.
                        .requestMatchers("/actuator/health/**").permitAll()

                        /*
                         * API documentation. Convenient in development; in
                         * production it advertises your entire attack surface.
                         * It is switched off there via springdoc.*.enabled in
                         * application-prod.yml — if you re-enable it, note that
                         * these routes are permitAll.
                         */
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**")
                        .permitAll()

                        // Dev-only H2 console; disabled outside the dev profile.
                        .requestMatchers("/h2-console/**").permitAll()

                        // Everything else — including the admin endpoints and
                        // the remaining actuator endpoints — needs the role.
                        .anyRequest().hasRole("ADMIN")
                )

                // Lets the H2 console render, which uses frames. Harmless in
                // production because the console is not enabled there.
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    /**
     * The single admin account, loaded from configuration.
     *
     * <p>In-memory is appropriate while there is one operator. When real user
     * management is needed, replace this bean with one backed by a database —
     * nothing else in the application refers to it.
     */
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        ApiProperties.Admin admin = properties.admin();

        return new InMemoryUserDetailsManager(
                User.withUsername(admin.username())
                        .password(passwordEncoder.encode(admin.password()))
                        .roles("ADMIN")
                        .build()
        );
    }

    /**
     * BCrypt hashing for the stored credential.
     *
     * <p>Deliberately slow, which is what makes offline brute-forcing of a
     * leaked hash impractical. Never store or compare a password in plain text.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Browser origin rules, driven by {@code fabins.cors.allowed-origins}.
     *
     * <p>This is what allows the Next.js frontend on a different port to call
     * the API. Without it the browser blocks the response — note that CORS is a
     * browser-enforced policy, so it is not a substitute for authentication;
     * anything outside a browser ignores it entirely.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(properties.cors().allowedOrigins());
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // Lets the frontend read the Location header returned by POST.
        configuration.setExposedHeaders(List.of("Location"));

        // Required for the browser to send the Authorization header.
        configuration.setAllowCredentials(true);

        // Cache preflight results for an hour to cut round-trips.
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }
}
