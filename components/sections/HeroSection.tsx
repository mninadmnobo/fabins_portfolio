'use client'

import { motion } from 'framer-motion'
import { Cpu, ShieldCheck, PlayCircle, ArrowRight, Zap, CheckCircle2, FileText } from 'lucide-react'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'

interface HeroSectionProps {
  onOpenReportModal: () => void
}

export const HeroSection = ({ onOpenReportModal }: HeroSectionProps) => {
  return (
    <section id="home" className="relative pt-12 pb-24 overflow-hidden border-b border-cyan-500/20">
      {/* Background Neon Ambient Glow Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Proof of Concept Banner Chip */}
        <motion.div {...fadeUpProps(0.1)} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>Proof of Concept Demonstrated on Production Fabric</span>
          </div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1
            {...fadeUpProps(0.2)}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans"
          >
            <span className="block font-mono text-cyan-400 text-3xl sm:text-5xl mb-2 font-extrabold tracking-widest uppercase">
              FABINS
            </span>
            <span className="block text-2xl sm:text-4xl font-extrabold font-mono tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Fabric Inspection Automation
            </span>
          </motion.h1>

          <motion.p
            {...fadeUpProps(0.3)}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light"
          >
            {FABINS_POC_DATA.overview.subtitle}
          </motion.p>

          {/* Quick Summary Card */}
          <motion.div
            {...fadeUpProps(0.4)}
            className="bg-[#090d16]/90 border border-cyan-500/20 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Proven on Real Fabric Roll R-001 at Saturn Textiles Limited
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {FABINS_POC_DATA.overview.provenSummary}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero Action Buttons */}
          <motion.div {...fadeUpProps(0.5)} className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#demonstration"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-[#030712] bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer font-mono"
            >
              <PlayCircle className="w-5 h-5 text-[#030712]" />
              View Roll R-001 Demonstration
            </a>

            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-slate-200 bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono shadow-lg"
            >
              <FileText className="w-5 h-5 text-cyan-400" />
              Simulate Four-Point Report
            </button>
          </motion.div>
        </div>

        {/* Feature Highlights Quick Bar */}
        <motion.div
          {...fadeUpProps(0.6)}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
        >
          <div className="p-4 rounded-2xl bg-[#090d16]/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Retrofit Architecture (No New Frame)</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#090d16]/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">8192px Line-Scan Camera</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#090d16]/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Four-Point Penalty Engine</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#090d16]/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Locally Engineered in Bangladesh</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
