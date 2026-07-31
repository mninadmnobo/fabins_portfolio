package com.fabins.entity.enums;

/**
 * Workflow stages for a general contact inquiry submitted via the homepage
 * "Let's Connect" form.
 *
 * <ul>
 *   <li>{@link #NEW} — the inquiry has just been received and is waiting for a
 *       team member to read and reply.</li>
 *   <li>{@link #REPLIED} — an R&amp;D team member has responded to the
 *       inquiry.</li>
 * </ul>
 *
 * <p>Values are persisted as their {@link #name()} string (not as an ordinal),
 * so re-ordering or inserting enum constants will never silently corrupt rows
 * that are already stored in the database.</p>
 *
 * <p>The database column is constrained to the same set via a {@code CHECK}
 * clause in {@code V3__create_contact_inquiry.sql}, so an out-of-range value
 * inserted outside the application is rejected at the database level too.</p>
 */
public enum ContactInquiryStatus {

    /**
     * The inquiry is freshly submitted and has not yet received a reply from
     * the R&amp;D team. This is the initial status assigned by
     * {@code ContactInquiryServiceImpl} on every new submission.
     */
    NEW,

    /**
     * A member of the R&amp;D team has replied to the inquiry, either directly
     * by email or by moving it through the admin dashboard.
     */
    REPLIED
}
