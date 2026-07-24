'use client'

import { motion } from 'framer-motion'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'
import { Eye, ShieldAlert, CheckCircle2, FileText, Target } from 'lucide-react'

export const DefectGallerySection = () => {
  return (
    <section className="py-24 border-b border-cyan-500/20 relative bg-[#02050b]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Real Optical Samples (Roll R-001)
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Defect Classification & <span className="text-cyan-400">Physical Measurement</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every defect is detected, classified, and measured in physical millimeters — not just pixel counts — on moving fabric.
          </p>
        </motion.div>

        {/* 3 Defect Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FABINS_POC_DATA.defectSamples.map((defect, idx) => (
            <motion.div
              key={defect.id}
              {...fadeUpProps(idx * 0.1)}
              className="bg-[#090d16] rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Visual Simulated Fabric Defect Frame */}
              <div className={`h-48 bg-gradient-to-br ${defect.bgGradient} p-6 relative flex items-center justify-center border-b border-slate-800`}>
                {/* Optical Reticle Retaining Box */}
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-cyan-400/80 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,240,255,0.3)] bg-cyan-950/40">
                  <div className="w-6 h-6 rounded-full bg-cyan-400/40 animate-ping absolute" />
                  <Target className="w-8 h-8 text-cyan-300 relative z-10" />
                  <span className="absolute -bottom-6 bg-[#030712] text-cyan-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                    {defect.sizeMm}mm
                  </span>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900/90 text-cyan-400 border border-cyan-500/30">
                    {defect.name}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {defect.penaltyPoints} Penalty Pt{defect.penaltyPoints > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono mb-1">{defect.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {defect.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-cyan-300 leading-normal">
                  <span className="text-slate-500 block uppercase text-[9px] font-bold mb-0.5">Scoring Rule:</span>
                  {defect.scoringRule}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Sub-mm Resolution</span>
                <span className="text-cyan-400 font-bold">100% Confident</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
