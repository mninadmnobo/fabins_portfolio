'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin } from 'lucide-react'
import { fadeUpProps } from '@/lib/animations'

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    millName: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const update = (key: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [key]: e.target.value })

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch */}
          <div className="lg:col-span-5">
            <motion.span {...fadeUpProps(0.05)} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Deploy FABINS
            </motion.span>
            <motion.h2
              {...fadeUpProps(0.1)}
              className="display mt-5 text-[clamp(2rem,4.4vw,3.25rem)]"
            >
              UPGRADE YOUR
              <br />
              INSPECTION
            </motion.h2>
            <motion.p {...fadeUpProps(0.16)} className="mt-6 max-w-md leading-relaxed text-ink-muted">
              Tell us about your mill specs and we&apos;ll come back with a tailored retrofit assessment for your
              existing inspection frames.
            </motion.p>

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

          {/* Form */}
          <motion.div {...fadeUpProps(0.18)} className="lg:col-span-7">
            <div className="card !p-8 sm:!p-10">
              {submitted ? (
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
                    onClick={() => setSubmitted(false)}
                    className="btn btn-ghost mt-2 !px-5 !py-2.5 text-[13px]"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                        Mill / Factory
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Apex Textile Mills"
                        value={formData.millName}
                        onChange={update('millName')}
                        className="field"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                        Contact Person
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="GM, Quality Assurance"
                        value={formData.contactName}
                        onChange={update('contactName')}
                        className="field"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                        Work Email
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="gm@apextextiles.com"
                        value={formData.email}
                        onChange={update('email')}
                        className="field"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                        Phone / WhatsApp
                      </span>
                      <input
                        type="tel"
                        placeholder="+880 1700-000000"
                        value={formData.phone}
                        onChange={update('phone')}
                        className="field"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      Inspection Requirements &amp; Fabric Specs
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Fabric types, roll widths, daily volume, buyer quality standards…"
                      value={formData.message}
                      onChange={update('message')}
                      className="field resize-none"
                    />
                  </label>

                  <button type="submit" className="btn btn-primary w-full">
                    Send deployment request
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
