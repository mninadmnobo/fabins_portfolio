package com.fabins.controller;

import com.fabins.dto.request.ChangeStatusRequest;
import com.fabins.dto.request.CreateDeploymentRequest;
import com.fabins.dto.response.DeploymentRequestResponse;
import com.fabins.dto.response.PageResponse;
import com.fabins.entity.enums.DeploymentRequestStatus;
import com.fabins.service.DeploymentRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

/**
 * HTTP endpoints for deployment requests.
 *
 * <p>This class only translates between HTTP and the service layer: bind and
 * validate the payload, call one service method, choose a status code. Any
 * logic beyond that belongs in {@link DeploymentRequestService}.
 *
 * <h2>API design notes</h2>
 * <ul>
 *   <li><strong>Versioned path</strong> — everything sits under {@code /api/v1}.
 *       A breaking change ships as {@code /api/v2} while v1 keeps working, so
 *       a deployed frontend never breaks because the backend was released.</li>
 *   <li><strong>Plural noun, no verbs</strong> — the resource is
 *       {@code /deployment-requests}. The HTTP method is the verb, which is why
 *       there is no {@code /submitDeploymentRequest}.</li>
 *   <li><strong>201 with a {@code Location} header</strong> on create, as
 *       required for a POST that creates a resource.</li>
 *   <li><strong>PATCH, not PUT</strong>, for the status change: it modifies one
 *       field rather than replacing the whole resource.</li>
 *   <li><strong>Status as a sub-resource</strong> ({@code /{id}/status}) rather
 *       than a general update endpoint, so a client cannot rewrite the mill's
 *       submitted details while changing a workflow stage.</li>
 * </ul>
 *
 * <h2>Access control</h2>
 * Creating a request is public — it is the website's contact form. Everything
 * else exposes submitters' contact details and requires the admin role; see
 * {@code SecurityConfig}.
 */
@RestController
@RequestMapping("/api/v1/deployment-requests")
@Tag(name = "Deployment requests", description = "Retrofit assessment enquiries from mills")
public class DeploymentRequestController {

    private final DeploymentRequestService service;

    public DeploymentRequestController(DeploymentRequestService service) {
        this.service = service;
    }

    /**
     * Submits a new deployment request. Public — this backs the website form.
     *
     * <p>{@code @Valid} is what triggers the constraints on
     * {@link CreateDeploymentRequest}; without it they are silently ignored.
     */
    @PostMapping
    @Operation(
            summary = "Submit a deployment request",
            description = "Public endpoint backing the contact form on the FABINS site."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Request recorded"),
            @ApiResponse(responseCode = "400", description = "Validation failed", content = @Content())
    })
    public ResponseEntity<DeploymentRequestResponse> submit(
            @Valid @RequestBody CreateDeploymentRequest request,
            UriComponentsBuilder uriBuilder
    ) {
        DeploymentRequestResponse created = service.submit(request);

        // Built from the incoming request rather than hardcoded, so the URI is
        // correct behind a proxy or on a non-default port.
        URI location = uriBuilder
                .path("/api/v1/deployment-requests/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    /**
     * Lists requests, newest first. Admin only.
     *
     * <p>{@code @PageableDefault} caps the page size, so a client cannot ask
     * for a million rows in one call.
     *
     * @param status optional filter, e.g. {@code ?status=NEW}
     */
    @GetMapping
    @Operation(summary = "List deployment requests", security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "A page of requests"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid credentials", content = @Content())
    })
    public PageResponse<DeploymentRequestResponse> list(
            @RequestParam(required = false) DeploymentRequestStatus status,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.list(status, pageable);
    }

    /** Fetches a single request by id. Admin only. */
    @GetMapping("/{id}")
    @Operation(summary = "Get one deployment request", security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "The request"),
            @ApiResponse(responseCode = "404", description = "No request with that id", content = @Content())
    })
    public DeploymentRequestResponse getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    /** Moves a request to a new stage of the follow-up process. Admin only. */
    @PatchMapping("/{id}/status")
    @Operation(summary = "Change a request's status", security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Updated request"),
            @ApiResponse(responseCode = "404", description = "No request with that id", content = @Content())
    })
    public DeploymentRequestResponse changeStatus(
            @PathVariable UUID id,
            @Valid @RequestBody ChangeStatusRequest request
    ) {
        return service.changeStatus(id, request.status());
    }
}
