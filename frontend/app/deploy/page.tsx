'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  Layers,
  MapPin,
  Send,
  Sparkles,
  Sliders,
  User,
  Zap,
  HelpCircle,
  FileCheck2,
} from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { submitDeploymentRequest, type DeploymentRequest } from '@/lib/api/contact'
import { cn } from '@/lib/utils'

type FormStatus = 'editing' | 'sending' | 'submitted'

const EMPTY_FORM: DeploymentRequest = {
  millName: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  location: '',
  factoryType: 'Knit Fabric Mill',
  inspectionFramesCount: '2 - 5 Frames',
  fabricTypes: '',
  dailyProductionVolume: '',
  inspectionSpeed: '25 m/min',
  rollWidth: '72 inches',
  defectTypes: '',
  erpIntegrationNeeded: 'FastReact / SAP',
  targetTimeline: '1 - 3 Months',
  message: '',
}

const FACTORY_TYPES = [
  'Knit Fabric Mill',
  'Woven Textile Mill',
  'Denim Manufacturing',
  'Dyeing & Finishing Unit',
  'Garments Manufacturing Facility',
  'Spinning & Weaving Mill',
  'Other Textile Operation',
]

const FRAME_COUNTS = [
  '1 Frame (Pilot / Trial)',
  '2 - 5 Frames',
  '6 - 10 Frames',
  '10+ Frames (Full Mill)',
]

const TIMELINE_OPTIONS = [
  'Immediate (Within 30 Days)',
  '1 - 3 Months',
  '3 - 6 Months',
  'Budgeting Stage / Next Fiscal',
]

const ERP_OPTIONS = [
  'FastReact / Coats Digital',
  'SAP S/4HANA',
  'Oracle NetSuite',
  'In-House Proprietary ERP',
  'Standalone (No ERP Integration Needed)',
]

const COMMON_DEFECTS = [
  'Holes & Tears',
  'Oil & Dirt Stains',
  'Slubs & Thick Threads',
  'Yarn Breaks / Drop Stitches',
  'Shade & Color Spots',
  'Missing Warp / Weft',
  'Crease Marks',
]

export default function DeployPage() {
  const [status, setStatus] = useState<FormStatus>('editing')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<DeploymentRequest>(EMPTY_FORM)
  const [referenceCode, setReferenceCode] = useState<string>('')
  const [selectedDefects, setSelectedDefects] = useState<string[]>([
    'Holes & Tears',
    'Oil & Dirt Stains',
    'Yarn Breaks / Drop Stitches',
  ])

  const updateField =
    (field: keyof DeploymentRequest) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setFormData((prev) => ({ ...prev, [field]: event.target.value }))

  const toggleDefect = (defect: string) => {
    setSelectedDefects((prev) => {
      const next = prev.includes(defect)
        ? prev.filter((d) => d !== defect)
        : [...prev, defect]
      setFormData((f) => ({ ...f, defectTypes: next.join(', ') }))
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage(null)

    const payload: DeploymentRequest = {
      ...formData,
      defectTypes: selectedDefects.join(', '),
    }

    const result = await submitDeploymentRequest(payload)

    if (result.ok) {
      setReferenceCode(result.referenceCode || 'FAB-2026-REGISTERED')
      setStatus('submitted')
      setFormData(EMPTY_FORM)
    } else {
      setStatus('editing')
      setErrorMessage(result.error)
    }
  }

  const isSending = status === 'sending'

  return (
    <PageShell>
      <div className="relative pt-28 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent/10 blur-[120px]" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top navigation link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-accent transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>

          {/* Page Banner Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-quiet px-3.5 py-1.5 text-xs font-semibold text-accent mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              RMG &amp; Textile Industry Retrofit Portal
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink font-heading">
              Deploy <span className="text-gradient">FABINS</span> in Your Mill
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
              Complete this technical assessment form to submit your inspection frame requirements.
              Our R&amp;D team will evaluate your machine layout, camera mounting specs, and software integration needs.
            </p>
          </div>

          {/* Form Container / Submitted State */}
          <AnimatePresence mode="wait">
            {status === 'submitted' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="mx-auto max-w-2xl rounded-3xl border border-accent/40 bg-panel/90 p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(8,145,178,0.3)] text-center backdrop-blur-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent ring-8 ring-accent/10">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-ink font-heading">
                  Assessment Request Registered!
                </h2>

                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent-quiet px-4 py-2 text-sm font-mono font-bold text-accent">
                  Tracking Reference: {referenceCode}
                </div>

                <p className="mt-6 text-sm sm:text-base leading-relaxed text-ink-muted">
                  Thank you for submitting your RMG mill specifications. Your request has been queued in Saturn R&amp;D Laboratory.
                  An engineering specialist will review your frame counts, fabric speeds, and inspection table dimensions.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left rounded-2xl border border-line bg-panel-2 p-5 text-xs text-ink-soft">
                  <div className="flex gap-3">
                    <FileCheck2 className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <strong className="block text-ink font-semibold">Confirmation Dispatched</strong>
                      A confirmation email with your request details has been sent to your inbox.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Zap className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <strong className="block text-ink font-semibold">Technical Follow-up</strong>
                      Our lead R&amp;D engineer will contact you within 24-48 hours.
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setStatus('editing')}
                    className="btn btn-secondary text-sm"
                  >
                    Submit Another Request
                  </button>
                  <Link href="/" className="btn btn-primary text-sm">
                    Return to Homepage
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="rounded-3xl border border-line bg-panel/85 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-10"
              >
                <fieldset disabled={isSending} className="space-y-10">
                  {/* SECTION 1: Mill & Contact Information */}
                  <div>
                    <div className="flex items-center gap-3 border-b border-line pb-4 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink font-heading">
                          1. Company &amp; Representative Information
                        </h3>
                        <p className="text-xs text-ink-soft">
                          Contact details for technical coordination and assessment dispatch.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Mill / Factory Name <span className="text-accent">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.millName}
                            onChange={updateField('millName')}
                            placeholder="e.g. Apex Spinning & Knitting Mills Ltd."
                            className="input-field pl-10"
                          />
                          <Factory className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-soft pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Contact Representative Name <span className="text-accent">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.contactName}
                            onChange={updateField('contactName')}
                            placeholder="e.g. Engr. Md. Rahim Ahmed"
                            className="input-field pl-10"
                          />
                          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-soft pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Designation / Role
                        </label>
                        <input
                          type="text"
                          value={formData.designation || ''}
                          onChange={updateField('designation')}
                          placeholder="e.g. General Manager, QA / Factory Director"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Work Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={updateField('email')}
                          placeholder="e.g. rahim.qa@apextextiles.com"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={updateField('phone')}
                          placeholder="e.g. +880 1700-000000"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Factory Location / City &amp; Country
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.location || ''}
                            onChange={updateField('location')}
                            placeholder="e.g. Gazipur, Dhaka, Bangladesh"
                            className="input-field pl-10"
                          />
                          <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-soft pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: RMG Mill Technical Specifications */}
                  <div>
                    <div className="flex items-center gap-3 border-b border-line pb-4 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                        <Sliders className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink font-heading">
                          2. RMG &amp; Textile Operational Profile
                        </h3>
                        <p className="text-xs text-ink-soft">
                          Machine specs helping us size camera optics and illumination arrays.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Factory Sector / Operation Type
                        </label>
                        <select
                          value={formData.factoryType || ''}
                          onChange={updateField('factoryType')}
                          className="input-field bg-panel"
                        >
                          {FACTORY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Inspection Machines / Frames Count
                        </label>
                        <select
                          value={formData.inspectionFramesCount || ''}
                          onChange={updateField('inspectionFramesCount')}
                          className="input-field bg-panel"
                        >
                          {FRAME_COUNTS.map((cnt) => (
                            <option key={cnt} value={cnt}>
                              {cnt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Fabric Types Processed
                        </label>
                        <input
                          type="text"
                          value={formData.fabricTypes || ''}
                          onChange={updateField('fabricTypes')}
                          placeholder="e.g. Single Jersey, Interlock, Rib, Fleece, Denim"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Daily / Monthly Production Volume
                        </label>
                        <input
                          type="text"
                          value={formData.dailyProductionVolume || ''}
                          onChange={updateField('dailyProductionVolume')}
                          placeholder="e.g. 25,000 yards/day (~80 rolls)"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Target Inspection Speed
                        </label>
                        <input
                          type="text"
                          value={formData.inspectionSpeed || ''}
                          onChange={updateField('inspectionSpeed')}
                          placeholder="e.g. 15 - 30 meters / minute"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Roll / Table Width (Inches / cm)
                        </label>
                        <input
                          type="text"
                          value={formData.rollWidth || ''}
                          onChange={updateField('rollWidth')}
                          placeholder="e.g. 72 inches (182 cm) open width"
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Inspection Requirements & Integration */}
                  <div>
                    <div className="flex items-center gap-3 border-b border-line pb-4 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink font-heading">
                          3. Defect Inspection &amp; System Integration
                        </h3>
                        <p className="text-xs text-ink-soft">
                          Specify target defect categories and software ecosystem requirements.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">
                          Priority Defect Categories to Detect
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {COMMON_DEFECTS.map((defect) => {
                            const isSelected = selectedDefects.includes(defect)
                            return (
                              <button
                                key={defect}
                                type="button"
                                onClick={() => toggleDefect(defect)}
                                className={cn(
                                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all border',
                                  isSelected
                                    ? 'border-accent bg-accent-quiet text-accent shadow-[0_4px_12px_-4px_rgba(8,145,178,0.4)]'
                                    : 'border-line bg-panel-2 text-ink-muted hover:border-line-strong'
                                )}
                              >
                                {isSelected ? '✓ ' : '+ '}
                                {defect}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                            ERP / Software System Integration
                          </label>
                          <select
                            value={formData.erpIntegrationNeeded || ''}
                            onChange={updateField('erpIntegrationNeeded')}
                            className="input-field bg-panel"
                          >
                            {ERP_OPTIONS.map((erp) => (
                              <option key={erp} value={erp}>
                                {erp}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                            Target Implementation Timeline
                          </label>
                          <select
                            value={formData.targetTimeline || ''}
                            onChange={updateField('targetTimeline')}
                            className="input-field bg-panel"
                          >
                            {TIMELINE_OPTIONS.map((tl) => (
                              <option key={tl} value={tl}>
                                {tl}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: Technical Notes & Comments */}
                  <div>
                    <div className="flex items-center gap-3 border-b border-line pb-4 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                        <Layers className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink font-heading">
                          4. Machine Frame Notes &amp; Special Instructions
                        </h3>
                        <p className="text-xs text-ink-soft">
                          Provide details about existing backlight tables, roller speed encoders, or mill constraints.
                        </p>
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={4}
                        value={formData.message || ''}
                        onChange={updateField('message')}
                        placeholder="Describe your current fabric inspection frame setups, lighting preference (backlit/toplit), or custom technical requests..."
                        className="input-field leading-relaxed resize-y"
                      />
                    </div>
                  </div>

                  {/* Error display */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-medium text-red-400"
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-ink-soft">
                      Submitting triggers automated reference registration and R&amp;D team notification.
                    </p>

                    <button
                      type="submit"
                      disabled={isSending}
                      className={cn(
                        'btn btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-bold shadow-lg',
                        isSending && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Registering Assessment Enquiry...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit RMG Assessment Request
                          <Send className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  </div>
                </fieldset>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  )
}
