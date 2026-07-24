'use client'

import { motion } from 'framer-motion'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'
import { Camera, Cpu, ArrowRight, CheckCircle, Sliders, FileSpreadsheet } from 'lucide-react'

export const PipelineSection = () => {
  return (
    <section id="pipeline" className="py-24 border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Automated Inspection Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            One Pass: <span className="text-cyan-400">Capture to Signed-Ready Report</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Camera captures full fabric width as it moves; a rotary encoder triggers every image line from actual fabric travel, so measurements stay accurate regardless of speed.
          </p>
        </motion.div>

        {/* 6 Step Interactive Horizontal / Grid Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          {FABINS_POC_DATA.pipelineSteps.map((step, idx) => (
            <motion.div
              key={step.stepNumber}
              {...fadeUpProps(idx * 0.08)}
              className="bg-[#090d16] p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Step Number Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-[#030712] font-mono text-xs font-extrabold flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                  {step.stepNumber}
                </span>
                {idx < 5 && (
                  <ArrowRight className="w-4 h-4 text-cyan-500/40 hidden lg:block absolute -right-2 top-6 z-10" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 mb-2 uppercase tracking-wider group-hover:text-white transition-colors">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Line Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400/70">
                Phase {step.stepNumber} Active
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
