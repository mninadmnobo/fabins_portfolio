package com.fabins.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Incoming payload for {@code POST /api/v1/deployment-requests}.
 *
 * <p>
 * A record, so it is immutable and Jackson can bind it straight from JSON.
 *
 * <h2>Where validation happens</h2>
 * The annotations below run before the controller method body executes,
 * because the parameter is marked {@code @Valid}. A violation never reaches the
 * service — it is turned into a 400 response listing every offending field by
 * {@code GlobalExceptionHandler}.
 *
 * <p>
 * <strong>Keep the limits in step</strong> with the column widths on the
 * {@code DeploymentRequest} entity and in the Flyway migration. Widening a
 * field here without widening the column produces a 500 at insert time instead
 * of a clean 400.
 */
@Schema(description = "A mill's request for a FABINS retrofit assessment")
public record CreateDeploymentRequest(

        @Schema(example = "Apex Textile Mills", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(message = "Mill name is required") @Size(max = 200, message = "Mill name must be at most {max} characters") String millName,

        @Schema(example = "Rahim Ahmed", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(message = "Contact name is required") @Size(max = 200, message = "Contact name must be at most {max} characters") String contactName,

        @Schema(example = "General Manager, Quality Assurance") @Size(max = 150, message = "Designation must be at most {max} characters") String designation,

        @Schema(example = "gm@apextextiles.com", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(message = "Email is required") @Email(message = "Email must be a valid address") @Size(max = 320, message = "Email must be at most {max} characters") String email,

        @Schema(example = "+880 1700-000000") @Size(max = 50, message = "Phone must be at most {max} characters") @Pattern(regexp = "^$|^[+0-9][0-9 ()\\-]{4,}$", message = "Phone may contain digits, spaces, and + ( ) - only") String phone,

        @Schema(example = "Gazipur, Dhaka, Bangladesh") @Size(max = 200, message = "Location must be at most {max} characters") String location,

        @Schema(example = "Knit Fabric Mill") @Size(max = 100, message = "Factory type must be at most {max} characters") String factoryType,

        @Schema(example = "4 Frames") @Size(max = 50, message = "Inspection frames count must be at most {max} characters") String inspectionFramesCount,

        @Schema(example = "Single Jersey, Interlock, Rib, Fleece") @Size(max = 500, message = "Fabric types must be at most {max} characters") String fabricTypes,

        @Schema(example = "25,000 yards/day") @Size(max = 100, message = "Daily production volume must be at most {max} characters") String dailyProductionVolume,

        @Schema(example = "25 m/min") @Size(max = 50, message = "Inspection speed must be at most {max} characters") String inspectionSpeed,

        @Schema(example = "72 inches") @Size(max = 50, message = "Roll width must be at most {max} characters") String rollWidth,

        @Schema(example = "Holes, Stains, Slubs, Yarn breaks, Color variation") @Size(max = 500, message = "Defect types must be at most {max} characters") String defectTypes,

        @Schema(example = "FastReact / SAP") @Size(max = 100, message = "ERP integration requirement must be at most {max} characters") String erpIntegrationNeeded,

        @Schema(example = "1-3 Months") @Size(max = 100, message = "Target timeline must be at most {max} characters") String targetTimeline,

        @Schema(example = "Need custom mounting for 72-inch roll-to-roll backlit inspection tables.") @Size(max = 5000, message = "Message must be at most {max} characters") String message) {
    /**
     * Compact constructor: trims whitespace and normalises blank optional
     * fields to {@code null} before validation runs.
     */
    public CreateDeploymentRequest {
        millName = trimToNull(millName);
        contactName = trimToNull(contactName);
        designation = trimToNull(designation);
        email = trimToNull(email);
        phone = trimToNull(phone);
        location = trimToNull(location);
        factoryType = trimToNull(factoryType);
        inspectionFramesCount = trimToNull(inspectionFramesCount);
        fabricTypes = trimToNull(fabricTypes);
        dailyProductionVolume = trimToNull(dailyProductionVolume);
        inspectionSpeed = trimToNull(inspectionSpeed);
        rollWidth = trimToNull(rollWidth);
        defectTypes = trimToNull(defectTypes);
        erpIntegrationNeeded = trimToNull(erpIntegrationNeeded);
        targetTimeline = trimToNull(targetTimeline);
        message = trimToNull(message);
    }

    /** Overloaded constructor for 5-field minimal/legacy requests. */
    public CreateDeploymentRequest(String millName, String contactName, String email, String phone, String message) {
        this(millName, contactName, null, email, phone, null, null, null, null, null, null, null, null, null, null, message);
    }

    private static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
