'use client'

import { motion } from 'framer-motion'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'
import { CheckCircle2, ShieldCheck, Zap, BarChart2, Award, FileText } from 'lucide-react'

export const RollDemonstrationSection = () => {
  const { demonstrationRun } = FABINS_POC_DATA

  return (
    <section id="demonstration" className="py-24 border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Real Production Proof
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Roll R-001 <span className="text-cyan-400">Demonstration Run</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {demonstrationRun.context}
          </p>
        </motion.div>

        {/* 6 Key Performance Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {demonstrationRun.metrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              {...fadeUpProps(idx * 0.05)}
              className="bg-[#090d16] p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 text-center flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 group-hover:scale-110 transition-transform block mb-1">
                  {metric.value}
                </span>
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1">
                  {metric.label}
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {metric.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proven Features Checklist Box */}
        <motion.div
          {...fadeUpProps(0.3)}
          className="bg-[#090d16]/90 border border-cyan-500/20 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
              What Was Proven on Real Production Fabric
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demonstrationRun.provenChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#030712]/60 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 leading-relaxed font-sans">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
