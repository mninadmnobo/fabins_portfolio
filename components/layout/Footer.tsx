'use client'

import React from 'react'
import { Cpu, ShieldCheck, ChevronRight, Activity, MapPin } from 'lucide-react'

export const Footer = () => {
  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: topOffset, behavior: 'smooth' })
      }
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <footer className="bg-[#02050b] border-t border-cyan-500/25 text-slate-400 py-16 relative overflow-hidden">
      {/* Ambient Cyber Backdrop Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 mb-14">
          
          {/* Brand & R&D Badge Column */}
          <div className="md:col-span-2 space-y-5">
            <a href="/" onClick={(e) => scrollToTarget(e, 'home')} className="flex items-center gap-3.5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.45)] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white font-mono tracking-wider flex items-center">
                  FAB<span className="text-cyan-400">INS</span>
                </span>
                <span className="block text-[10px] text-cyan-400/90 font-mono tracking-widest uppercase mt-0.5">
                  Fabric Inspection Automation
                </span>
              </div>
            </a>

            <p className="text-xs leading-relaxed text-slate-300/90 max-w-md font-sans">
              <strong className="text-white font-semibold">Fabric Inspection Automation (FABINS)</strong> — An AI-powered fabric defect detection platform automating inspection with a high-speed line-scan camera vision pipeline and Four-Point Scoring engine.
            </p>

            {/* R&D Institutional Badge */}
            <div className="p-3.5 rounded-2xl bg-[#060c1c]/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.1)] inline-flex items-center gap-3 max-w-md">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-xs font-mono">
                <span className="block text-slate-300 font-semibold">Saturn Textiles Limited</span>
                <span className="text-cyan-400 text-[11px] font-medium block">
                  Department of Research and Development (R&D)
                </span>
              </div>
            </div>
          </div>

          {/* System Architecture Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              System Architecture
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              {[
                { name: 'Line-Scan Hardware Trigger', target: 'pipeline' },
                { name: 'Hikrobot 8192px Sensor', target: 'hardware' },
                { name: 'YOLOv8 AI Defect Engine', target: 'pipeline' },
                { name: 'Four-Point Scoring Rules', target: 'demonstration' },
                { name: 'Automated Report Generator', target: 'report-sim' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.target}`}
                    onClick={(e) => scrollToTarget(e, item.target)}
                    className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-500/60 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Development Team */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
              Development Team
            </h4>
            <ul className="space-y-4 text-xs font-mono">
              <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
                <a
                  href="#team"
                  onClick={(e) => scrollToTarget(e, 'team')}
                  className="block group"
                >
                  <span className="block font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Md. Rahinur Rahman
                  </span>
                  <span className="text-cyan-400 text-[11px] block mt-0.5 font-medium">
                    Lead AI Systems Engineer <span className="text-slate-400">(EEE, BUET)</span>
                  </span>
                </a>
              </li>
              <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
                <a
                  href="#team"
                  onClick={(e) => scrollToTarget(e, 'team')}
                  className="block group"
                >
                  <span className="block font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Mohammad Ninad Mahmud Nobo
                  </span>
                  <span className="text-cyan-400 text-[11px] block mt-0.5 font-medium">
                    Lead AI Software Engineer <span className="text-slate-400">(CSE, BUET)</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator Line with Ambient Glow */}
        <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mb-8">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400/20 border border-cyan-400 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">FABINS R&D Team</span> • Saturn Textiles Limited. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>System Status: Operational</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-slate-400 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
