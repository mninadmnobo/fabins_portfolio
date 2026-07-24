'use client'

import { motion } from 'framer-motion'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'
import { ShieldAlert, CheckCircle2, Award, Zap } from 'lucide-react'

export const HonestPositionSection = () => {
  return (
    <section className="py-20 border-b border-cyan-500/20 relative bg-[#02050b]/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          {...fadeUpProps(0.1)}
          className="bg-[#090d16] border-2 border-amber-500/30 p-8 sm:p-10 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-mono text-white uppercase tracking-wider">
                Honest R&D Position — Capabilities & Next Validation
              </h3>
              <p className="text-xs font-mono text-amber-400">Engineering Integrity Statement</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
            {FABINS_POC_DATA.overview.honestPosition}
          </p>

          <div className="p-6 rounded-2xl bg-[#030712] border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              Closing R&D Statement
            </h4>
            <p>
              {FABINS_POC_DATA.overview.closingStatement}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
