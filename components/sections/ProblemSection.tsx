'use client'

import { motion } from 'framer-motion'
import { UserX, Clock, BarChart2, Database, Zap, Globe, ShieldAlert, Cpu } from 'lucide-react'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'

const ICON_MAP: Record<string, React.ElementType> = {
  UserX,
  Clock,
  BarChart2,
  Database,
  Zap,
  Globe,
  ShieldAlert,
  Cpu,
}

export const ProblemSection = () => {
  return (
    <section className="py-20 border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...fadeUpProps(0.1)} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Industry Context & Challenges
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Why This Matters for <span className="text-cyan-400">Bangladesh RMG</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Fabric grading is still a manual, human-paced task — at exactly the moment global manufacturing is automating quality control.
          </p>
        </motion.div>

        {/* 8 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FABINS_POC_DATA.industryProblems.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconName] || Cpu
            return (
              <motion.div
                key={item.id}
                {...fadeUpProps(idx * 0.05)}
                className="bg-[#090d16]/80 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
