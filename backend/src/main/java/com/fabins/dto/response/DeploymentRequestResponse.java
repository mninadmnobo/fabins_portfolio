package com.fabins.dto.response;

import com.fabins.entity.enums.DeploymentRequestStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import java.util.UUID;

/**
 * What the API returns for a deployment request.
 *
 * <p>Separate from the {@code DeploymentRequest} entity on purpose. The entity
 * is free to grow internal fields — sales notes, an assigned engineer, a lead
 * score — without any risk of them appearing in a response. Anything a client
 * should see has to be added here deliberately.
 *
 * <p>Conversion from the entity lives in {@code DeploymentRequestMapper}, not
 * here, so this stays a pure data carrier with no knowledge of persistence.
 */
@Schema(description = "A submitted deployment request")
public record DeploymentRequestResponse(

        @Schema(description = "Server-generated identifier")
        UUID id,

        @Schema(description = "Contextual human-readable reference code, e.g. FAB-2026-ABB5B9D6")
        String referenceCode,

        String millName,
        String contactName,
        String designation,
        String email,

        @Schema(description = "Null when the submitter did not provide one")
        String phone,

        String location,
        String factoryType,
        String inspectionFramesCount,
        String fabricTypes,
        String dailyProductionVolume,
        String inspectionSpeed,
        String rollWidth,
        String defectTypes,
        String erpIntegrationNeeded,
        String targetTimeline,

        @Schema(description = "Null when the submitter left it blank")
        String message,

        @Schema(description = "Stage of the follow-up process")
        DeploymentRequestStatus status,

        @Schema(description = "When the request was received (UTC)")
        Instant submittedAt,

        @Schema(description = "When the request was last modified (UTC)")
        Instant updatedAt
) {
}
