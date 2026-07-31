'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Send,
  Rocket,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { fadeUpProps } from '@/lib/animations'
import { useContactForm } from '@/lib/hooks/useContactForm'

/**
 * CONTACT SECTION — "Let's Connect" general enquiry form.
 *
 * Renders a styled contact form (name / email / subject / message) that posts
 * to `POST /api/v1/contact-inquiries` on the Spring Boot backend. Includes:
 *
 * - **Honeypot** bot protection: a hidden field that must stay empty.
 * - **Loading state**: disabled button with a spinner while the request is in
 *   flight.
 * - **Success card**: replaces the form with a tracking reference code and a
 *   "Send another" link, so the user can submit again without a page reload.
 * - **Error banner**: inline error message when the server rejects the request.
 * - **Deploy CTA**: a small callout below the form points to `/deploy` for
 *   visitors who want to submit a full RMG factory assessment instead of a
 *   general message.
 *
 * All form state and HTTP logic lives in {@link useContactForm} — this
 * component is intentionally a pure rendering layer with no fetch calls.
 */
export const ContactSection = () => {
  const { formData, setFormData, handleSubmit, isLoading, result, reset } = useContactForm()

  /** Shared input class string — extracted to avoid repetition in JSX. */
  const inputClass =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-soft ' +
    'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors'

  return (
    <Section id="contact">
      <div className="mx-auto max-w-3xl">
        {/* ── Section header ───────────────────────────────────────────────── */}
        <div className="mb-8 text-center space-y-3">
          <motion.span {...fadeUpProps(0.05)} className="eyebrow mx-auto justify-center">
            <span className="h-2 w-2 rounded-full bg-accent sm:h-2.5 sm:w-2.5" />
            LET&#39;S CONNECT
          </motion.span>

          <motion.p
            {...fadeUpProps(0.1)}
            className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-ink-muted"
          >
            Have a question, technical inquiry, or partnership request? Send a message to our R&amp;D team below and we will respond within 1–2 business days.
          </motion.p>

          <motion.div {...fadeUpProps(0.14)} className="pt-2">
            <Link
              href="/deploy"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-quiet px-4.5 py-2 text-xs font-semibold text-accent transition-all duration-300 hover:border-accent hover:bg-accent/15 hover:shadow-sm"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>Looking for factory deployment? Open FABINS deployment Form</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── Form card ────────────────────────────────────────────────────── */}
        <motion.div {...fadeUpProps(0.14)} className="mt-10">
          <div className="rounded-3xl border border-line bg-panel/90 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(8,145,178,0.12)] backdrop-blur-xl">

            {/* ── Success state ─────────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              {result?.ok === true ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-quiet text-accent border border-accent/30">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">Message Received!</h3>
                  <p className="text-sm text-ink-muted max-w-sm">
                    Thank you for reaching out. Our R&amp;D team will reply to your message within
                    1–2 working days.
                  </p>
                  {result.referenceCode && (
                    <div className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-quiet px-4 py-2">
                      <span className="text-xs text-ink-muted">Reference:</span>
                      <code className="text-xs font-bold text-accent font-mono">
                        {result.referenceCode}
                      </code>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-2 text-sm font-semibold text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* ── Honeypot (invisible to real users) ─────────────────── */}
                  {/*
                   * This input is hidden with CSS and never shown or labelled.
                   * A bot that fills every visible field will also fill this one,
                   * and the backend uses that as the signal to silently fake success.
                   */}
                  <input
                    type="text"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={formData.honeypot}
                    onChange={e => setFormData(p => ({ ...p, honeypot: e.target.value }))}
                    className="hidden"
                  />

                  {/* ── Error banner ──────────────────────────────────────── */}
                  {result?.ok === false && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {result.error}
                    </motion.div>
                  )}

                  {/* ── Name & Email row ──────────────────────────────────── */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="your@company.com"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* ── Subject ───────────────────────────────────────────── */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      required
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {/* ── Message ───────────────────────────────────────────── */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* ── Submit button ─────────────────────────────────────── */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    id="contact-submit-btn"
                    className="btn btn-primary w-full justify-center !py-3.5 text-sm font-bold shadow-lg group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </Section>
  )
}