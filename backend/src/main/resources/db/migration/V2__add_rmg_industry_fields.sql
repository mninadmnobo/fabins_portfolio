-- =============================================================================
-- V2 — add RMG industry assessment fields to deployment_request
-- =============================================================================

ALTER TABLE deployment_request ADD COLUMN designation VARCHAR(150);
ALTER TABLE deployment_request ADD COLUMN location VARCHAR(200);
ALTER TABLE deployment_request ADD COLUMN factory_type VARCHAR(100);
ALTER TABLE deployment_request ADD COLUMN inspection_frames_count VARCHAR(50);
ALTER TABLE deployment_request ADD COLUMN fabric_types VARCHAR(500);
ALTER TABLE deployment_request ADD COLUMN daily_production_volume VARCHAR(100);
ALTER TABLE deployment_request ADD COLUMN inspection_speed VARCHAR(50);
ALTER TABLE deployment_request ADD COLUMN roll_width VARCHAR(50);
ALTER TABLE deployment_request ADD COLUMN defect_types VARCHAR(500);
ALTER TABLE deployment_request ADD COLUMN erp_integration_needed VARCHAR(100);
ALTER TABLE deployment_request ADD COLUMN target_timeline VARCHAR(100);
