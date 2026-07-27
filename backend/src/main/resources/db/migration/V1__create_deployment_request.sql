-- =============================================================================
-- V1 — deployment_request
--
-- Flyway applies every file in this directory in version order and records what
-- it has run in the `flyway_schema_history` table, so the same migration is
-- never applied twice.
--
-- RULES FOR THIS DIRECTORY
--   * Never edit a migration that has been applied anywhere but your own
--     machine. Flyway checksums each file; changing an applied one makes the
--     application refuse to start. Write V2, V3, … instead.
--   * Name files `V<n>__<snake_case_description>.sql` — two underscores.
--   * Keep the SQL portable across PostgreSQL (production) and H2 in
--     PostgreSQL-compatibility mode (development and tests).
-- =============================================================================

CREATE TABLE deployment_request
(
    -- Application-generated UUID rather than a sequence: the id is handed to
    -- anonymous submitters in the Location header, and sequential ids would
    -- leak how many enquiries the business has received.
    id            UUID         NOT NULL,

    -- Lengths mirror the @Size limits on CreateDeploymentRequest. Validation
    -- rejects oversized input first; these are the last line of defence.
    mill_name     VARCHAR(200) NOT NULL,
    contact_name  VARCHAR(200) NOT NULL,

    -- 320 = 64-character local part + '@' + 255-character domain, the maximum
    -- length permitted by RFC 5321.
    email         VARCHAR(320) NOT NULL,

    -- Nullable: the website form does not require these.
    phone         VARCHAR(50),
    message       VARCHAR(5000),

    -- Stored as text, not an ordinal, so the column is readable and reordering
    -- the Java enum cannot corrupt existing rows.
    status        VARCHAR(20)  NOT NULL,

    -- Set by JPA auditing. Both are UTC instants.
    submitted_at  TIMESTAMP    NOT NULL,
    updated_at    TIMESTAMP    NOT NULL,

    CONSTRAINT pk_deployment_request PRIMARY KEY (id),

    -- Keeps the column honest even if a row is inserted outside the
    -- application. Extend this list in a new migration when adding a status.
    CONSTRAINT ck_deployment_request_status
        CHECK (status IN ('NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED'))
);

-- The admin list is always sorted newest-first and often filtered by status.
-- A composite index in that exact order lets both the filtered and unfiltered
-- queries be served without a sort step.
CREATE INDEX ix_deployment_request_status_submitted
    ON deployment_request (status, submitted_at DESC);

-- Supports the unfiltered "newest first" listing.
CREATE INDEX ix_deployment_request_submitted
    ON deployment_request (submitted_at DESC);