package com.fabins.controller;

import com.fabins.dto.request.CreateDeploymentRequest;
import com.fabins.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * End-to-end tests for the deployment request endpoints.
 *
 * <p>Runs the full application against an in-memory database, so the real
 * Flyway migrations, the real validation, and the real security rules are all
 * exercised. A mocked-repository slice test would pass even if the schema and
 * the entity disagreed; this would not.
 *
 * <p>{@code @Transactional} rolls each test back afterwards, so tests cannot
 * see each other's rows and can run in any order.
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class DeploymentRequestControllerTest {

    private static final String ENDPOINT = "/api/v1/deployment-requests";

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Replaced with a mock so the suite never opens a network connection to a
     * mail provider. {@code @MockitoBean} is the Spring Framework 6.2 successor
     * to Spring Boot's deprecated {@code @MockBean}.
     */
    @MockitoBean
    private EmailService emailService;

    private MockMvc mockMvc;

    /**
     * Built manually rather than with {@code @AutoConfigureMockMvc} so that
     * {@code springSecurity()} is applied — without it the security filter
     * chain is bypassed and every authorisation assertion below would pass
     * regardless of the rules.
     */
    private MockMvc mockMvc() {
        if (mockMvc == null) {
            mockMvc = MockMvcBuilders.webAppContextSetup(context)
                    .apply(springSecurity())
                    .build();
        }
        return mockMvc;
    }

    private String json(Object value) throws Exception {
        return objectMapper.writeValueAsString(value);
    }

    private static CreateDeploymentRequest validRequest() {
        return new CreateDeploymentRequest(
                "Apex Textile Mills",
                "GM, Quality Assurance",
                "gm@apextextiles.com",
                "+880 1700-000000",
                "Knits and woven, 60in rolls."
        );
    }

    // ── Creating ────────────────────────────────────────────────────────────

    @Test
    @DisplayName("POST is public and returns 201 with a Location header")
    void submitAnonymously() throws Exception {
        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(validRequest())))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.millName").value("Apex Textile Mills"))
                // Every new request must start at NEW, whatever the client sends.
                .andExpect(jsonPath("$.status").value("NEW"))
                .andExpect(jsonPath("$.submittedAt").exists());
    }

    @Test
    @DisplayName("POST accepts a request with no phone or message")
    void submitWithoutOptionalFields() throws Exception {
        var minimal = new CreateDeploymentRequest(
                "Small Mill", "Owner", "owner@smallmill.com", null, null);

        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(minimal)))
                .andExpect(status().isCreated())
                // Null fields are omitted entirely (default-property-inclusion: non_null).
                .andExpect(jsonPath("$.phone").doesNotExist());
    }

    @Test
    @DisplayName("POST trims surrounding whitespace")
    void submitTrimsWhitespace() throws Exception {
        var padded = new CreateDeploymentRequest(
                "  Apex Textile Mills  ", "  GM  ", "  gm@apextextiles.com  ", "   ", "  hello  ");

        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(padded)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.millName").value("Apex Textile Mills"))
                // A whitespace-only phone becomes null rather than "   ".
                .andExpect(jsonPath("$.phone").doesNotExist());
    }

    // ── Validation ──────────────────────────────────────────────────────────

    @Test
    @DisplayName("POST rejects a missing mill name with a per-field error")
    void rejectMissingMillName() throws Exception {
        var invalid = new CreateDeploymentRequest(
                null, "GM", "gm@apextextiles.com", null, null);

        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(invalid)))
                .andExpect(status().isBadRequest())
                // RFC 9457 problem+json, not a Whitelabel page.
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.errors.millName").value("Mill name is required"));
    }

    @Test
    @DisplayName("POST rejects a malformed email")
    void rejectInvalidEmail() throws Exception {
        var invalid = new CreateDeploymentRequest(
                "Apex", "GM", "not-an-email", null, null);

        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(invalid)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    @DisplayName("POST reports every invalid field at once, not just the first")
    void reportAllFieldErrors() throws Exception {
        var invalid = new CreateDeploymentRequest(null, null, "bad", null, null);

        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(invalid)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.millName").exists())
                .andExpect(jsonPath("$.errors.contactName").exists())
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    @DisplayName("POST rejects malformed JSON with 400, not 500")
    void rejectMalformedJson() throws Exception {
        mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ not json"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Malformed request"));
    }

    // ── Authorisation ───────────────────────────────────────────────────────

    @Test
    @DisplayName("GET list is rejected without credentials")
    void listRequiresAuthentication() throws Exception {
        mockMvc().perform(get(ENDPOINT))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET by id is rejected without credentials")
    void getByIdRequiresAuthentication() throws Exception {
        mockMvc().perform(get(ENDPOINT + "/" + UUID.randomUUID()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("PATCH status is rejected without credentials")
    void patchRequiresAuthentication() throws Exception {
        mockMvc().perform(patch(ENDPOINT + "/" + UUID.randomUUID() + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"IN_REVIEW\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("A non-admin role is forbidden from the admin endpoints")
    void listForbiddenForNonAdmin() throws Exception {
        mockMvc().perform(get(ENDPOINT))
                .andExpect(status().isForbidden());
    }

    // ── Reading and updating as admin ───────────────────────────────────────

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("GET list returns a paginated envelope")
    void listAsAdmin() throws Exception {
        mockMvc().perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(validRequest())));

        mockMvc().perform(get(ENDPOINT))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("GET list filters by status")
    void listFilteredByStatus() throws Exception {
        mockMvc().perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(validRequest())));

        mockMvc().perform(get(ENDPOINT).param("status", "NEW"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1));

        mockMvc().perform(get(ENDPOINT).param("status", "CLOSED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("GET by unknown id returns a 404 problem document")
    void getUnknownId() throws Exception {
        mockMvc().perform(get(ENDPOINT + "/" + UUID.randomUUID()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Resource not found"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("GET with a non-UUID id returns 400, not 500")
    void getMalformedId() throws Exception {
        mockMvc().perform(get(ENDPOINT + "/not-a-uuid"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid parameter"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("PATCH moves a request to a new status")
    void changeStatusAsAdmin() throws Exception {
        String body = mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(validRequest())))
                .andReturn().getResponse().getContentAsString();

        String id = objectMapper.readTree(body).get("id").asText();

        mockMvc().perform(patch(ENDPOINT + "/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"IN_REVIEW\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("IN_REVIEW"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("PATCH rejects an unknown status value")
    void rejectUnknownStatus() throws Exception {
        mockMvc().perform(patch(ENDPOINT + "/" + UUID.randomUUID() + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"NOT_A_STATUS\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("DELETE all removes all stored requests")
    void deleteAllAsAdmin() throws Exception {
        mockMvc().perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(validRequest())));

        mockMvc().perform(delete(ENDPOINT))
                .andExpect(status().isNoContent());

        mockMvc().perform(get(ENDPOINT))
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("DELETE by id removes a single request")
    void deleteByIdAsAdmin() throws Exception {
        String body = mockMvc().perform(post(ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(validRequest())))
                .andReturn().getResponse().getContentAsString();

        String id = objectMapper.readTree(body).get("id").asText();

        mockMvc().perform(delete(ENDPOINT + "/" + id))
                .andExpect(status().isNoContent());

        mockMvc().perform(get(ENDPOINT + "/" + id))
                .andExpect(status().isNotFound());
    }
}
