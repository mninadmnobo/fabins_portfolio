'use client'

import { motion } from 'framer-motion'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import { fadeUpProps } from '@/lib/animations'
import { ShieldCheck, Cpu } from 'lucide-react'

export const WhyFabinsSection = () => {
  return (
    <section id="why-fabins" className="py-24 border-b border-cyan-500/20 relative bg-[#02050b]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Why FABINS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Why FABINS — <span className="text-cyan-400">Retrofit, Not Replace</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Foreign automated inspection systems typically require a mill to replace its existing inspection machine outright. FABINS is designed the opposite way: as a low-cost, high-precision retrofit that integrates into the inspection frames a factory already owns.
          </p>
        </motion.div>

        {/* Side by Side Comparison Table */}
        <motion.div {...fadeUpProps(0.2)}>
          <ComparisonTable />
        </motion.div>

        {/* Bottom Value Props Banner */}
        <motion.div {...fadeUpProps(0.3)} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#090d16] border border-cyan-500/20 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono mb-1">Zero Loom Frame Capital Cost</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mounts onto existing conveyor frames, eliminating multi-million Taka machine import costs.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090d16] border border-cyan-500/20 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono mb-1">Mill-Specific Standard Customization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adapts scoring logic to local fabric width specs and buyer-specific penalty thresholds.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090d16] border border-cyan-500/20 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono mb-1">Local Engineering & Rapid Support</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Engineered in Bangladesh with direct on-site technical support and immediate spares availability.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
