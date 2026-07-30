package com.fabins.mapper;

import com.fabins.dto.request.CreateDeploymentRequest;
import com.fabins.dto.response.DeploymentRequestResponse;
import com.fabins.entity.DeploymentRequest;
import org.springframework.stereotype.Component;

/**
 * Converts between {@link DeploymentRequest} entities and their DTOs.
 *
 * <p>Mapping lives here rather than being scattered across services and
 * controllers, so there is exactly one place to update when a field is added.
 * Adding a column to the entity has no effect on the API until this class
 * exposes it — which is the point: leaking an internal field has to be a
 * deliberate act, not an accident.
 *
 * <p>Written by hand rather than generated with MapStruct or ModelMapper.
 * With one entity the mapping is a dozen lines, and hand-written code produces
 * clearer stack traces and no build-time code generation to reason about.
 * Introduce MapStruct once the number of mappings makes this tedious.
 */
@Component
public class DeploymentRequestMapper {

    /**
     * Builds a new entity from a submitted payload.
     *
     * <p>Delegates to the entity's factory method rather than setting fields,
     * so the status still starts at {@code NEW} by construction.
     */
    public DeploymentRequest toEntity(CreateDeploymentRequest request) {
        return DeploymentRequest.submit(
                request.millName(),
                request.contactName(),
                request.email(),
                request.phone(),
                request.message()
        );
    }

    /** Converts a persisted entity into its API representation. */
    public DeploymentRequestResponse toResponse(DeploymentRequest entity) {
        return new DeploymentRequestResponse(
                entity.getId(),
                entity.getReferenceCode(),
                entity.getMillName(),
                entity.getContactName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getMessage(),
                entity.getStatus(),
                entity.getSubmittedAt(),
                entity.getUpdatedAt()
        );
    }
}
