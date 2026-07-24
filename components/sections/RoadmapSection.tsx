'use client'

import { motion } from 'framer-motion'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'
import { CheckCircle2, ArrowRight, Clock, Rocket, ShieldCheck } from 'lucide-react'

export const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-24 border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Project Trajectory
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Where the Project Stands, <span className="text-cyan-400">and What Comes Next</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From a working bench prototype to statistical performance validation, factory pilots, and commercial mill deployment.
          </p>
        </motion.div>

        {/* 4 Phase Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FABINS_POC_DATA.roadmap.map((item, idx) => {
            const isCompleted = item.status === 'completed'
            const isInProgress = item.status === 'in_progress'

            return (
              <motion.div
                key={item.phase}
                {...fadeUpProps(idx * 0.1)}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative group ${
                  isCompleted
                    ? 'bg-[#090d16] border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    : isInProgress
                    ? 'bg-[#090d16] border-cyan-500/40 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                    : 'bg-[#090d16]/60 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                      {item.phase}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                        <Clock className="w-3 h-3 animate-spin" /> Next
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Upcoming</span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-mono mb-4 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
