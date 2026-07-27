'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, Mail, ExternalLink, User } from 'lucide-react'
import type { InnovatorMember } from '@/lib/data/innovators'

interface InnovatorDetailsProps {
  member: InnovatorMember
  onClose: () => void
}

export function InnovatorDetails({ member, onClose }: InnovatorDetailsProps) {
  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const bioParagraphs = member.extendedBio ?? [member.bio]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <motion.div
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} — profile`}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[92%] max-w-3xl -translate-x-1/2
                   -translate-y-1/2 flex-col overflow-hidden rounded-[28px] border-2 border-blue-500/70 bg-white
                   shadow-[0_0_45px_rgba(37,99,235,0.25)]"
      >
        {/* ── Fixed Header ────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white p-6 sm:px-8">
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Avatar with blue ring */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-2 ring-blue-500/80 shadow-sm sm:h-20 sm:w-20">
              {member.image ? (
                <img
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <User className="h-8 w-8 text-blue-500" />
                </div>
              )}
            </div>

            {/* Name & Title */}
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-blue-500 sm:text-base">
                {member.title}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close profile"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400
                       transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Scrollable Body Content ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 text-sm sm:text-base leading-relaxed text-slate-600">
          {/* Extended Bio / Overview */}
          <div className="space-y-4">
            {bioParagraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-slate-600">
                {para}
              </p>
            ))}
          </div>

          {/* Key Responsibilities */}
          {member.responsibilities && member.responsibilities.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-900">
                KEY RESPONSIBILITIES
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
                {member.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Links & Profiles */}
          {(member.social || member.email) && (
            <div>
              <h4 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-900">
                LINKS &amp; PROFILES
              </h4>
              <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2">
                {/* 1. Portfolio */}
                {member.social?.portfolio && (
                  <Link
                    href={member.social.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="font-bold text-slate-800">Portfolio:</span>
                    <span className="text-blue-500 hover:underline">
                      {member.social.portfolio.replace(/^https?:\/\//, '')}
                    </span>
                  </Link>
                )}

                {/* 2. GitHub */}
                {member.social?.github && (
                  <Link
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="font-bold text-slate-800">GitHub:</span>
                    <span className="text-blue-500 hover:underline">
                      {member.social.github.replace(/^https?:\/\//, '')}
                    </span>
                  </Link>
                )}

                {/* 3. LinkedIn */}
                {member.social?.linkedin && (
                  <Link
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="font-bold text-slate-800">LinkedIn:</span>
                    <span className="text-blue-500 hover:underline">
                      {member.social.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </Link>
                )}

                {/* 4. Google Scholar */}
                {member.social?.scholar && (
                  <Link
                    href={member.social.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="font-bold text-slate-800">Google Scholar:</span>
                    <span className="text-blue-500 hover:underline">
                      {member.social.scholarName || 'Google Scholar'}
                    </span>
                  </Link>
                )}

                {/* 5. ORCID */}
                {member.social?.orcid && (
                  <Link
                    href={member.social.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="font-bold text-slate-800">ORCID:</span>
                    <span className="text-blue-500 hover:underline">
                      {member.social.orcid.split('/').pop()}
                    </span>
                  </Link>
                )}

                {/* 6. Email */}
                {member.email && (
                  <Link
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="font-bold text-slate-800">Email:</span>
                    <span className="text-blue-500 hover:underline">
                      {member.email}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
