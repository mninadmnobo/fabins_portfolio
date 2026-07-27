'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin } from 'lucide-react'
import { submitDeploymentRequest, type DeploymentRequest } from '@/lib/api/contact'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUpProps } from '@/lib/animations'

/**
 * CONTACT SECTION — the deployment-request form.
 *
 * ─── WHERE THE DATA GOES ────────────────────────────────────────────────────
 * Nowhere yet. Submitting calls `submitDeploymentRequest` in
 * `lib/api/contact.ts`, which is currently a stub. This component is already
 * written against the real contract — it handles pending, success, and failure
 * — so connecting the backend means editing that one file and nothing here.
 *
 * ─── FORM STATE ─────────────────────────────────────────────────────────────
 * `status` drives which of three views is rendered:
 *   'editing'   → the form (also the state returned to after an error)
 *   'sending'   → the form, disabled, with a pending button label
 *   'submitted' → the confirmation panel
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

    const result = await submitDeploymentRequest(formData)

    if (result.ok) {
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
                <h3 className="text-xl font-semibold tracking-tight">Request received</h3>
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