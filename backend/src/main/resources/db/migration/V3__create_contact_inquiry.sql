-- =============================================================================
-- V3 — contact_inquiry
--
-- Stores general visitor enquiries submitted through the "Let's Connect"
-- contact form on the FABINS homepage. This is distinct from deployment
-- requests (V1/V2) which carry deep RMG technical specifications.
--
-- RULES FOR THIS DIRECTORY
--   * Never edit a migration that has been applied anywhere but your own
--     machine. Flyway checksums each file; changing an applied one makes the
--     application refuse to start. Write V2, V3, … instead.
--   * Name files `V<n>__<snake_case_description>.sql` — two underscores.
--   * Keep the SQL portable across PostgreSQL (production) and H2 in
--     PostgreSQL-compatibility mode (development and tests).
-- =============================================================================

CREATE TABLE contact_inquiry
(
    -- Application-generated UUID: opaque to the submitter and non-enumerable
    -- by design. The reference code in the response is derived from this id.
    id         UUID         NOT NULL,

    -- Lengths mirror the @Size limits on CreateContactInquiry. Validation
    -- rejects oversized input before it reaches this layer.
    name       VARCHAR(200) NOT NULL,

    -- 320 = 64-character local part + '@' + 255-character domain; RFC 5321 max.
    email      VARCHAR(320) NOT NULL,
    subject    VARCHAR(300) NOT NULL,
    message    VARCHAR(4000) NOT NULL,

    -- Stored as text (not an ordinal) so the column is human-readable
    -- and re-ordering the Java enum never corrupts existing rows.
    status     VARCHAR(20)  NOT NULL,

    -- JPA auditing writes these as UTC instants.
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL,

    CONSTRAINT pk_contact_inquiry PRIMARY KEY (id),

    -- Guards against rows inserted outside the application.
    CONSTRAINT ck_contact_inquiry_status
        CHECK (status IN ('NEW', 'REPLIED'))
);

-- The admin list is sorted newest-first and often filtered by status.
-- A composite index in that order serves both the filtered and unfiltered
-- queries without a sort step.
CREATE INDEX ix_contact_inquiry_status_created
    ON contact_inquiry (status, created_at DESC);

-- Supports the unfiltered "newest first" listing.
CREATE INDEX ix_contact_inquiry_created
    ON contact_inquiry (created_at DESC);
