package com.fabins.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Incoming payload for {@code POST /api/v1/deployment-requests}.
 *
 * <p>A record, so it is immutable and Jackson can bind it straight from JSON.
 *
 * <h2>Where validation happens</h2>
 * The annotations below run before the controller method body executes,
 * because the parameter is marked {@code @Valid}. A violation never reaches the
 * service — it is turned into a 400 response listing every offending field by
 * {@code GlobalExceptionHandler}.
 *
 * <p><strong>Keep the limits in step</strong> with the column widths on the
 * {@code DeploymentRequest} entity and in the Flyway migration. Widening a
 * field here without widening the column produces a 500 at insert time instead
 * of a clean 400.
 */
@Schema(description = "A mill's request for a FABINS retrofit assessment")
public record CreateDeploymentRequest(

        @Schema(example = "Apex Textile Mills", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "Mill name is required")
        @Size(max = 200, message = "Mill name must be at most {max} characters")
        String millName,

        @Schema(example = "GM, Quality Assurance", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "Contact name is required")
        @Size(max = 200, message = "Contact name must be at most {max} characters")
        String contactName,

        /*
         * @Email is deliberately permissive — it rejects obvious nonsense but
         * accepts anything plausibly deliverable. Stricter patterns reject
         * valid real-world addresses, and the only true test of an address is
         * sending mail to it.
         */
        @Schema(example = "gm@apextextiles.com", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "Email is required")
        @Email(message = "Email must be a valid address")
        @Size(max = 320, message = "Email must be at most {max} characters")
        String email,

        /*
         * Optional, and intentionally loose: this has to accept international
         * formats with +, spaces, dashes, and parentheses. It blocks letters
         * and stray symbols without trying to know every country's rules.
         */
        @Schema(example = "+880 1700-000000")
        @Size(max = 50, message = "Phone must be at most {max} characters")
        @Pattern(
                regexp = "^$|^[+0-9][0-9 ()\\-]{4,}$",
                message = "Phone may contain digits, spaces, and + ( ) - only"
        )
        String phone,

        @Schema(example = "Knits and woven, 60in rolls, ~40 rolls/day.")
        @Size(max = 5000, message = "Message must be at most {max} characters")
        String message
) {
    /**
     * Compact constructor: trims whitespace and normalises blank optional
     * fields to {@code null} before validation runs.
     *
     * <p>Without this, a phone field containing only spaces would be stored as
     * {@code "   "} — technically present, useless in practice.
     */
    public CreateDeploymentRequest {
        millName = trimToNull(millName);
        contactName = trimToNull(contactName);
        email = trimToNull(email);
        phone = trimToNull(phone);
        message = trimToNull(message);
    }

    private static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
