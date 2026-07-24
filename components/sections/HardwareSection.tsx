'use client'

import { motion } from 'framer-motion'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'
import { Camera, Sliders, Sun, Monitor, Cpu, Sparkles } from 'lucide-react'

const HARDWARE_ICONS = [Camera, Sliders, Sun, Monitor]

export const HardwareSection = () => {
  return (
    <section id="hardware" className="py-24 border-b border-cyan-500/20 relative bg-[#02050b]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Industrial Machine-Vision Components
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Prototype Built — <span className="text-cyan-400">4 Hardware & Software Pillars</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Bench-scale fabric inspection prototype comprising the conveyor transport system, uniform illumination unit, line-scan camera with lens assembly, encoder, and edge-computing node.
          </p>
        </motion.div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FABINS_POC_DATA.hardwarePillars.map((pillar, idx) => {
            const Icon = HARDWARE_ICONS[idx] || Cpu
            return (
              <motion.div
                key={pillar.id}
                {...fadeUpProps(idx * 0.1)}
                className="bg-[#090d16] p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900 text-cyan-400 border border-cyan-500/30">
                      {pillar.spec}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-mono mb-2 group-hover:text-cyan-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-cyan-300 mb-3 font-mono">
                    {pillar.headline}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-emerald-400 font-bold">Catalogue Grade</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
