package com.fabins.controller;

import com.fabins.dto.request.CreateContactInquiry;
import com.fabins.dto.response.ContactInquiryResponse;
import com.fabins.service.ContactInquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

/**
 * HTTP endpoint for general contact inquiries submitted via the FABINS
 * homepage "Let's Connect" form.
 *
 * <p>This class only translates between HTTP and the service layer:
 * bind and validate the payload, call one service method, choose a status
 * code. Any business logic beyond that belongs in
 * {@link ContactInquiryService}.
 *
 * <h2>API design notes</h2>
 * <ul>
 *   <li><strong>Versioned path</strong> — everything sits under
 *       {@code /api/v1}. A breaking change ships as {@code /api/v2} while
 *       v1 keeps working, so a deployed frontend never breaks because of a
 *       backend release.</li>
 *   <li><strong>Plural noun, no verbs</strong> — the resource is
 *       {@code /contact-inquiries}. The HTTP method is the verb, which is
 *       why there is no {@code /submitContactInquiry}.</li>
 *   <li><strong>201 with a {@code Location} header</strong> on success, as
 *       required for a POST that creates a resource. The Location points to
 *       the inquiry's canonical URL even though there is no public GET endpoint
 *       for it yet — adding one later does not break existing clients.</li>
 * </ul>
 *
 * <h2>Access control</h2>
 * Submitting an inquiry is completely public — it is the homepage contact form.
 * There are no admin endpoints on this resource yet. If an admin list view is
 * added in a future iteration, it will require the admin role exactly as the
 * deployment-request endpoints do.
 */
@RestController
@RequestMapping("/api/v1/contact-inquiries")
@Tag(name = "Contact inquiries", description = "General visitor inquiries submitted from the homepage 'Let\\'s Connect' form")
public class ContactInquiryController {

    private final ContactInquiryService service;

    /**
     * Spring injects the service implementation. Constructor injection is
     * preferred: the dependency is explicit, the field can be {@code final},
     * and unit tests can construct this controller without a Spring context.
     */
    public ContactInquiryController(ContactInquiryService service) {
        this.service = service;
    }

    /**
     * Submits a new general contact inquiry. This endpoint is public and backs
     * the homepage "Let's Connect" form.
     *
     * <p>Bean Validation (triggered by {@code @Valid}) runs before this method
     * body executes. Any constraint violation produces a 400 with a JSON body
     * listing every offending field — see {@code GlobalExceptionHandler}.
     *
     * <p>The honeypot field is checked in the service layer: a non-blank value
     * causes a fake-success 201 to be returned without any database activity,
     * preventing bot detection.
     *
     * @param dto  the validated incoming request payload
     * @param ucb  injected by Spring to build the {@code Location} header using
     *             the current request's scheme and host
     * @return 201 Created with {@code Location} header and the new inquiry in the body
     */
    @Operation(summary = "Submit a contact inquiry",
            description = "Public endpoint — backs the homepage 'Let\'s Connect' form. Returns 201 with a tracking reference code.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Inquiry recorded successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed — see error body for field details",
                    content = @Content(mediaType = "application/problem+json")),
            @ApiResponse(responseCode = "429", description = "Too many requests"),
            @ApiResponse(responseCode = "500", description = "Unexpected server error")
    })
    @PostMapping
    public ResponseEntity<ContactInquiryResponse> submit(
            @Valid @RequestBody CreateContactInquiry dto,
            UriComponentsBuilder ucb) {

        ContactInquiryResponse response = service.submit(dto);

        URI location = ucb.path("/api/v1/contact-inquiries/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    /**
     * One-click acknowledge endpoint — placed as a button in the admin
     * notification email.
     *
     * <p>Clicking it (GET or POST, to survive email client prefetching):
     * <ol>
     *   <li>Moves the inquiry status from {@code NEW} to {@code REPLIED}.</li>
     *   <li>Dispatches an asynchronous acknowledgement email to the visitor.</li>
     *   <li>Returns a human-readable HTML confirmation in the browser tab.</li>
     * </ol>
     *
     * <p>This endpoint is <strong>public</strong> — no credentials required.
     * Security is provided by the UUID's opacity: the 128-bit random value
     * is not guessable, and it only appears inside the admin's email inbox.
     *
     * <p>Both GET and POST are accepted: some email security scanners perform a
     * preflight GET on every link before the admin clicks it. Accepting GET
     * means that preflight marks the inquiry as acknowledged before the human
     * acts. Accepting POST and making GET idempotent (same outcome) addresses
     * this: the admin's deliberate click sends POST, the scanner's preflight
     * sends GET, both produce the same result.
     */
    @RequestMapping(value = "/{id}/acknowledge", method = { RequestMethod.GET, RequestMethod.POST })
    @Operation(summary = "Acknowledge a contact inquiry and notify the visitor")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Inquiry acknowledged and visitor notified"),
            @ApiResponse(responseCode = "404", description = "No inquiry with that id", content = @Content())
    })
    public ResponseEntity<String> acknowledge(@PathVariable UUID id) {
        ContactInquiryResponse response = service.acknowledge(id);

        String html = """
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8"><title>Inquiry Acknowledged</title></head>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8fafc;">
                  <div style="max-width: 520px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; padding: 35px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h2 style="color: #0f172a; margin-top: 0;"><span style="color: #0891b2;">&#10003;</span> Inquiry Successfully Acknowledged</h2>
                    <p style="font-size: 15px; color: #1e293b;">Contact inquiry <strong>%s</strong> from <strong>%s</strong> has been acknowledged.</p>
                    <p style="color: #64748b; font-size: 14px;">An acknowledgement email has been dispatched to <strong>%s</strong> confirming the team will reply personally.</p>
                  </div>
                </body>
                </html>
                """.formatted(response.referenceCode(), response.name(), response.email());

        return ResponseEntity.ok()
                .contentType(new MediaType(MediaType.TEXT_HTML, StandardCharsets.UTF_8))
                .body(html);
    }
}
