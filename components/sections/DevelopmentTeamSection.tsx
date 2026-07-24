'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, User } from 'lucide-react'
import { fabinsTeamMembers, TeamMember } from '@/lib/data/leaders'
import { LeaderDetails } from '@/components/ui/LeaderDetails'
import { fadeInUpVariants, staggerContainer, defaultViewport } from '@/lib/animations'

/** High-contrast official LinkedIn SVG logo badge */
const LinkedinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#0A66C2" />
    <path d="M19 19H15.8202V13.8407C15.8202 12.5199 15.3408 11.6163 14.1565 11.6163C13.2505 11.6163 12.716 12.2217 12.4795 12.808C12.3929 13.0182 12.3708 13.3108 12.3708 13.6046V19H9.18972C9.18972 19 9.2323 10.3709 9.18972 9.46736H12.3708V10.8202C12.7937 10.1659 13.5517 9.2323 15.2492 9.2323C17.3392 9.2323 18.9189 10.5975 18.9189 13.5414V19H19Z" fill="white" />
    <path d="M5.53906 8.01633C6.65089 8.01633 7.34509 7.28308 7.32454 6.36875C7.30399 5.43317 6.65089 4.7207 5.56116 4.7207C4.47143 4.7207 3.75488 5.43317 3.75488 6.36875C3.75488 7.28308 4.45088 8.01633 5.53906 8.01633ZM3.94824 19H7.12933V9.46736H3.94824V19Z" fill="white" />
  </svg>
)

export function DevelopmentTeamSection() {
  const members = fabinsTeamMembers
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const selectedIdx = selectedMember ? members.indexOf(selectedMember) : -1

  const containerVariants = staggerContainer()
  const itemVariants = fadeInUpVariants

  return (
    <section id="team" className="relative py-24 px-4 md:px-8 overflow-hidden border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <motion.div variants={itemVariants}>
            <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              Engineering Leadership
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-mono"
          >
            FABINS <span className="text-cyan-400">Development Team</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="relative max-w-xl mx-auto h-[1px] my-6 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(0,240,255,0.6)]" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Lead AI Engineers driving system architecture, hardware integration, computer vision algorithms, and production software at <br />
            <span className="text-cyan-400">Saturn Textiles Limited - Department of Research and Development (R&D).</span>
          </motion.p>
        </motion.div>

        {/* ── Team Card Grid ─────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {members.map((member, idx) => {
            const isFeatured = idx === 0

            return (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-[#090d16] border border-slate-800 rounded-[2rem] p-8 flex flex-col hover:border-cyan-500/50 transition-colors shadow-2xl hover:shadow-[0_0_35px_rgba(0,240,255,0.15)] group"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full p-1 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] bg-[#030712] group-hover:scale-105 transition-transform duration-300">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name} portrait`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-slate-400">
                        <User className="w-20 h-20 text-cyan-400/80" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Name · Title · CTA */}
                <div className="text-center flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 min-h-[3.5rem] flex items-center justify-center leading-tight font-mono group-hover:text-cyan-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-400 font-mono">{member.title}</p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 max-w-xs mx-auto font-sans">{member.bio}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="w-8 h-[2px] mx-auto mt-6 mb-8 rounded-full bg-cyan-500" />
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-500/40 hover:border-cyan-400 bg-cyan-500/10 hover:bg-cyan-400 text-cyan-400 hover:text-black text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/40 hover:scale-105 active:scale-95 mb-2 cursor-pointer"
                    >
                      View Details <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                    </button>
                  </div>
                </div>

                {/* Social footer */}
                <div className="mt-6 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center justify-center">
                    <Link
                      href={member.social?.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-transparent border border-transparent text-slate-300 hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-all duration-300 hover:shadow-[0_0_25px_rgba(10,102,194,0.8)] hover:scale-105 active:scale-95 group/link cursor-pointer font-mono text-xs font-semibold"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedinIcon className="w-5 h-5 shrink-0 group-hover/link:scale-110 transition-transform" />
                      <span className="tracking-wide">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* ── Member Profile Modal ──────────────────────────────── */}
      <AnimatePresence>
        {selectedMember && (
          <LeaderDetails
            member={selectedMember}
            isFeatured={selectedIdx === 0}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
