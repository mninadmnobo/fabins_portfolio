'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpProps } from '@/lib/animations'
import { Send, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react'

export const DeployFabinsSection = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    millName: '',
    contactName: '',
    email: '',
    phone: '',
    inspectionFrameType: 'Conventional Rolling Frame',
    dailyVolumeRolls: '50-100 Rolls/Day',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 relative bg-[#02050b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div {...fadeUpProps(0.1)} className="text-center mb-16 sm:mb-20 space-y-6 sm:space-y-8">
          <span className="inline-block text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            System Deployment & Retrofit
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide uppercase font-mono leading-relaxed">
            <span className="block mb-3 sm:mb-4">
              DEPLOY <span className='text-cyan-400'>FABINS</span> FOR FABRIC INSPECTION
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-2">
            Upgrade your fabric quality control today. Place your deployment request or schedule an executive buyer consultation with <br />
            <span className="text-cyan-400">Saturn Textiles Limited - Department of Research and Development (R&D).</span>
          </p>
        </motion.div>

        <motion.div
          {...fadeUpProps(0.2)}
          className="bg-[#090d16] border border-cyan-500/30 p-8 sm:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-mono text-white">Procurement Request Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for your interest in purchasing FABINS Automation. Our engineering team will review your mill specifications and contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Mill / Factory Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Textiles Mills"
                    value={formData.millName}
                    onChange={(e) => setFormData({ ...formData, millName: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Contact Person & Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. General Manager (Quality Assurance)"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="gm@apextextiles.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 17XX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Existing Frame Type</label>
                  <select
                    value={formData.inspectionFrameType}
                    onChange={(e) => setFormData({ ...formData, inspectionFrameType: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  >
                    <option>Conventional Rolling Frame</option>
                    <option>Continuous Loom Inspection Rig</option>
                    <option>Custom Inspection Bench</option>
                    <option>Other / Unsure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Daily Production Volume</label>
                  <select
                    value={formData.dailyVolumeRolls}
                    onChange={(e) => setFormData({ ...formData, dailyVolumeRolls: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  >
                    <option>Under 50 Rolls/Day</option>
                    <option>50-100 Rolls/Day</option>
                    <option>100-300 Rolls/Day</option>
                    <option>300+ Rolls/Day</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-2">Additional Mill Specifications or Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Describe your current fabric types (cotton, twill, denim), roll widths, or buyer quality scoring standards..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#030712] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-mono text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Deployment Request
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
