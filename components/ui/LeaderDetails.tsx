'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, Mail, ExternalLink, User } from 'lucide-react'
import type { TeamMember } from '@/lib/data/leaders'

interface LeaderDetailsProps {
  member: TeamMember
  onClose: () => void
}

export function LeaderDetails({ member, onClose }: LeaderDetailsProps) {
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

  const links = [
    member.social?.portfolio && { label: 'Portfolio', href: member.social.portfolio },
    member.social?.github && { label: 'GitHub', href: member.social.github },
    member.social?.linkedin && { label: 'LinkedIn', href: member.social.linkedin },
    member.social?.scholar && { label: 'Google Scholar', href: member.social.scholar },
    member.social?.orcid && { label: 'ORCID', href: member.social.orcid },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} — profile`}
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        className="fixed left-1/2 top-1/2 z-50 flex max-h-[86vh] w-[94%] max-w-3xl -translate-x-1/2
                   -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-line bg-panel
                   shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line p-6 sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-line bg-panel-2">
              {member.image ? (
                <img
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-ink-soft">
                  <User className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {member.name}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {member.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close profile"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line
                       bg-panel text-ink-muted transition-colors hover:border-line-strong hover:text-accent"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-8 overflow-y-auto p-6 sm:p-8">
          <div className="space-y-4 leading-relaxed text-ink-muted">
            {(member.extendedBio ?? [member.bio]).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {member.responsibilities.length > 0 && (
            <div>
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Key responsibilities
              </h4>
              <ul className="mt-4 space-y-2.5">
                {member.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(links.length > 0 || member.email) && (
            <div>
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Links
              </h4>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-panel-2 px-4 py-2
                               text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-accent"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                ))}
                {member.email && (
                  <Link
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-panel-2 px-4 py-2
                               text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-accent"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {member.email}
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
