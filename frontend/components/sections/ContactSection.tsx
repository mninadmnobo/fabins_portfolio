'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, X, Building2, User } from 'lucide-react'
import { submitDeploymentRequest, type DeploymentRequest } from '@/lib/api/contact'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUpProps } from '@/lib/animations'

/**
 * CONTACT SECTION — the deployment-request form.
 *
 * ─── WHERE THE DATA GOES ────────────────────────────────────────────────────
 * Submitting calls `submitDeploymentRequest` in `lib/api/contact.ts`, which
 * POSTs to the Spring Boot API at `/api/v1/deployment-requests`. The backend
 * records the enquiry and dispatches two emails asynchronously. This component
 * knows none of that: it only needs the `{ ok }` result, so changing transport
 * or moving to a server action means editing that one file and nothing here.
 *
 * ─── COLD STARTS ────────────────────────────────────────────────────────────
 * The API runs on Render's free tier, which suspends a service after ~15
 * minutes of inactivity and takes roughly 30-50 seconds to boot the JVM again
 * on the next request. The first visitor after a quiet period therefore waits
 * far longer than the others.
 *
 * Two things follow from that, and both are deliberate:
 *   • `lib/api/contact.ts` sets a 60s request timeout rather than the usual
 *     10-15s, so a cold start resolves as a slow success instead of a spurious
 *     "request timed out" on a submission the backend actually accepted.
 *   • The `sending` state must stay visibly pending for that whole window —
 *     hence a disabled `fieldset` and a changed button label, not a spinner
 *     that a visitor might read as a hang. Do not add a client-side timeout
 *     shorter than the one in the API module.
 * Moving the backend to a paid always-on plan is what removes this; when that
 * happens the timeout can safely drop back to ~15s.
 *
 * ─── FORM STATE ─────────────────────────────────────────────────────────────
 * `status` drives which of three views is rendered:
 *   'editing'   → the form (also the state returned to after an error)
 *   'sending'   → the form, disabled, with a pending button label
 *   'submitted' → the confirmation panel or popup modal
 * `errorMessage` is set only when a submission fails and is shown above the
 * submit button; the visitor's input is preserved so they can simply retry.
 */

type FormStatus = 'editing' | 'sending' | 'submitted'

/** Starting values, also used to reset the form after a successful send. */
const EMPTY_FORM: DeploymentRequest = {
  millName: '',
  contactName: '',
  email: '',
  phone: '',
  message: '',
}

export const ContactSection = () => {
  const [status, setStatus] = useState<FormStatus>('editing')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<DeploymentRequest>(EMPTY_FORM)
  const [lastSubmitted, setLastSubmitted] = useState<DeploymentRequest | null>(null)

  /**
   * Returns an onChange handler bound to one field, so each input needs only
   * `onChange={updateField('email')}` rather than its own callback.
   */
  const updateField =
    (field: keyof DeploymentRequest) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((previous) => ({ ...previous, [field]: event.target.value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setStatus('sending')
    setErrorMessage(null)

    // Can legitimately take up to 60s on a cold backend — see the note at the
    // top of this file. `submitDeploymentRequest` never throws, so there is no
    // try/catch here and no path that leaves the form stuck in 'sending'.
    const result = await submitDeploymentRequest(formData)

    if (result.ok) {
      setLastSubmitted({ ...formData })
      setStatus('submitted')
      setFormData(EMPTY_FORM)
    } else {
      // Stay on the form with the visitor's input intact so they can retry.
      setStatus('editing')
      setErrorMessage(result.error)
    }
  }

  const isSending = status === 'sending'

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Left: the pitch ──────────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <SectionHeader
            layout="bare"
            eyebrow="Deploy FABINS"
            title={
              <>
                UPGRADE YOUR
                <br />
                INSPECTION
              </>
            }
            description="Tell us about your mill specs and we'll come back with a tailored retrofit assessment for your existing inspection frames."
            descriptionClassName="max-w-md"
          />

          <motion.div {...fadeUpProps(0.22)} className="mt-8 space-y-3 text-sm text-ink-muted">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              Saturn Textiles Ltd — R&amp;D Department
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              Dhaka, Bangladesh
            </p>
          </motion.div>
        </div>

        {/* ── Right: the form, or the confirmation ─────────────────────── */}
        <motion.div {...fadeUpProps(0.18)} className="lg:col-span-7">
          <div className="card !p-8 sm:!p-10">
            {status === 'submitted' ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-panel-2 text-accent">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-ink">Request received</h3>
                <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                  Thanks for your interest in FABINS. Our engineering team will review your mill
                  specifications and get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('editing')}
                  className="btn btn-ghost mt-2 !px-5 !py-2.5 text-[13px]"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* `fieldset` disables every control at once while sending. */}
                <fieldset disabled={isSending} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Mill / Factory">
                      <input
                        type="text"
                        name="millName"
                        required
                        autoComplete="organization"
                        placeholder="Apex Textile Mills"
                        value={formData.millName}
                        onChange={updateField('millName')}
                        className="field"
                      />
                    </Field>

                    <Field label="Contact Person">
                      <input
                        type="text"
                        name="contactName"
                        required
                        autoComplete="name"
                        placeholder="GM, Quality Assurance"
                        value={formData.contactName}
                        onChange={updateField('contactName')}
                        className="field"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Work Email">
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="gm@apextextiles.com"
                        value={formData.email}
                        onChange={updateField('email')}
                        className="field"
                      />
                    </Field>

                    <Field label="Phone / WhatsApp">
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+880 1700-000000"
                        value={formData.phone}
                        onChange={updateField('phone')}
                        className="field"
                      />
                    </Field>
                  </div>

                  <Field label="Inspection Requirements & Fabric Specs">
                    <textarea
                      rows={3}
                      name="message"
                      placeholder="Fabric types, roll widths, daily volume, buyer quality standards…"
                      value={formData.message}
                      onChange={updateField('message')}
                      className="field resize-none"
                    />
                  </Field>
                </fieldset>

                {/* `role="alert"` makes screen readers announce a failure. */}
                {errorMessage && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending ? 'Sending…' : 'Send deployment request'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── High-End Success Popup Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {status === 'submitted' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStatus('editing')}
              className="fixed inset-0 bg-ink/50 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-panel p-8 shadow-2xl shadow-accent/20"
            >
              {/* Top Ambient Glow Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-cyan-500 to-blue-600" />

              {/* Close Icon Button */}
              <button
                onClick={() => setStatus('editing')}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-panel-2 hover:text-ink transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                {/* Glowing Success Badge */}
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-accent ring-8 ring-accent/5">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-ink">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-sm">
                  Thank you for your enquiry. Your deployment request has been logged in our R&amp;D queue, and a confirmation email has been dispatched.
                </p>

                {/* Submitted Summary Details Box */}
                {lastSubmitted && (
                  <div className="mt-6 w-full rounded-xl border border-line bg-panel-2 p-4 text-left space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                      <Building2 className="h-4 w-4 shrink-0 text-accent" />
                      <span>Mill: <strong className="font-semibold text-ink">{lastSubmitted.millName}</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                      <User className="h-4 w-4 shrink-0 text-accent" />
                      <span>Contact: <strong className="font-semibold text-ink">{lastSubmitted.contactName}</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                      <Mail className="h-4 w-4 shrink-0 text-accent" />
                      <span>Email sent to: <strong className="font-semibold text-accent">{lastSubmitted.email}</strong></span>
                    </div>
                  </div>
                )}

                {/* Got it Dismiss Button */}
                <button
                  onClick={() => setStatus('editing')}
                  className="btn btn-primary mt-6 w-full !py-3 font-semibold text-sm shadow-md"
                >
                  Got it, thank you!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  )
}

/**
 * A labelled form row: the uppercase caption plus its control.
 *
 * The caption markup was repeated verbatim for all five fields. Wrapping the
 * control in a `<label>` also means clicking the caption focuses the input,
 * without needing to manage matching `id`/`htmlFor` pairs.
 */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  )
}