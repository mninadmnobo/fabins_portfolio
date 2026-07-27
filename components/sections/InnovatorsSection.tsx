'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { User, ChevronDown } from 'lucide-react'
import { fabinsInnovators, InnovatorMember } from '@/lib/data/innovators'
import { InnovatorDetails } from '@/components/ui/InnovatorDetails'
import { fadeUpProps } from '@/lib/animations'

const LinkedinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#0A66C2" />
    <path d="M19 19H15.8202V13.8407C15.8202 12.5199 15.3408 11.6163 14.1565 11.6163C13.2505 11.6163 12.716 12.2217 12.4795 12.808C12.3929 13.0182 12.3708 13.3108 12.3708 13.6046V19H9.18972C9.18972 19 9.2323 10.3709 9.18972 9.46736H12.3708V10.8202C12.7937 10.1659 13.5517 9.2323 15.2492 9.2323C17.3392 9.2323 18.9189 10.5975 18.9189 13.5414V19H19Z" fill="white" />
    <path d="M5.53906 8.01633C6.65089 8.01633 7.34509 7.28308 7.32454 6.36875C7.30399 5.43317 6.65089 4.7207 5.56116 4.7207C4.47143 4.7207 3.75488 5.43317 3.75488 6.36875C3.75488 7.28308 4.45088 8.01633 5.53906 8.01633ZM3.94824 19H7.12933V9.46736H3.94824V19Z" fill="white" />
  </svg>
)

export const InnovatorsSection = () => {
  const [selectedMember, setSelectedMember] = useState<InnovatorMember | null>(null)

  return (
    <section id="innovators" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <motion.span {...fadeUpProps(0.05)} className="eyebrow">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent" />
              The Innovators
            </motion.span>
            <motion.h2
              {...fadeUpProps(0.1)}
              className="display mt-5 text-[clamp(1.4rem,2.6vw,2.15rem)]"
            >
              INNOVATORS BEHIND
              <br />
              FAB<span className="text-accent">INS</span>
            </motion.h2>
          </div>
          <motion.p {...fadeUpProps(0.16)} className="max-w-md leading-relaxed text-ink-muted">
            System architecture, hardware integration, computer vision and production software —
            built at the Saturn Textiles Ltd R&amp;D department.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fabinsInnovators.map((member, idx) => (
            <motion.article
              key={member.id}
              {...fadeUpProps(idx * 0.1)}
              className="card card-hover group flex flex-col gap-6 !p-6 sm:flex-row sm:items-start"
            >
              {/* Portrait */}
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-panel-2 sm:h-44 sm:w-36">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`${member.name} portrait`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-soft">
                    <User className="h-10 w-10" />
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-lg font-semibold leading-snug tracking-tight">{member.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {member.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{member.bio}</p>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="group inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-accent transition-all duration-300 hover:text-accent-bright hover:-translate-y-0.5 active:scale-95"
                  >
                    View details
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </button>
                  {member.social?.linkedin && (
                    <Link
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="group inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-ink-muted transition-all duration-300 hover:text-[#0A66C2] hover:-translate-y-0.5 active:scale-95"
                    >
                      <LinkedinIcon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
                      <span>LinkedIn</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <InnovatorDetails member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
