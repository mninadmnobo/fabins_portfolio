'use client'

import { useEffect, useId, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, Mail, ExternalLink, User } from 'lucide-react'
import type { InnovatorMember } from '@/lib/data/innovators'

/**
 * INNOVATOR PROFILE MODAL — the full biography dialog opened from an
 * innovator card in `InnovatorsSection`.
 *
 * The parent owns the open/closed state and wraps this in Framer Motion's
 * `<AnimatePresence>`; this component renders only when a member is selected
 * and handles its own exit animation.
 *
 * ─── ACCESSIBILITY ──────────────────────────────────────────────────────────
 * This is a modal dialog, so it takes over the keyboard while open:
 *   - focus moves into the dialog on open and returns to the card on close
 *   - Tab and Shift+Tab cycle within the dialog instead of escaping behind it
 *   - Escape closes it, as does clicking the backdrop
 *   - background scrolling is locked
 * Keep all four behaviours if you refactor this — they are what make it a
 * dialog rather than a floating box.
 *
 * ─── ON THE COLOURS ─────────────────────────────────────────────────────────
 * This dialog deliberately uses its own blue/slate palette rather than the
 * site's teal `--accent` tokens. The values are collected in `PALETTE` below
 * so the whole modal can be recoloured in one edit. To bring it in line with
 * the rest of the site, swap them for `text-accent` / `border-line` /
 * `text-ink-muted` and friends — but note that this changes the visual design,
 * so it is left as an explicit decision rather than done silently.
 */

/** Every colour used by this dialog, in one place. See the note above. */
const PALETTE = {
  panel: 'bg-white',
  border: 'border-blue-500/70',
  glow: 'shadow-[0_0_45px_rgba(37,99,235,0.25)]',
  ring: 'ring-blue-500/80',
  accentText: 'text-blue-500',
  headingText: 'text-slate-900',
  bodyText: 'text-slate-600',
  listText: 'text-slate-700',
  labelText: 'text-slate-800',
  mutedText: 'text-slate-400',
  hairline: 'border-slate-100',
  hoverSurface: 'hover:bg-slate-100',
} as const

/** Selector matching everything the focus trap should cycle through. */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface InnovatorDetailsProps {
  /** The person to display. Changing this swaps content without remounting. */
  member: InnovatorMember
  /** Called on Escape, on backdrop click, and on the close button. */
  onClose: () => void
}

export function InnovatorDetails({ member, onClose }: InnovatorDetailsProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  // Ties the dialog to its heading for screen readers.
  const headingId = useId()

  useEffect(() => {
    // Remember what was focused so we can hand focus back when the modal closes.
    const previouslyFocused = document.activeElement as HTMLElement | null

    // Lock background scrolling so the page behind does not move under the modal.
    document.body.style.overflow = 'hidden'

    // Move focus into the dialog; without this, the next Tab would land on the
    // page behind the modal.
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      // Focus trap: wrap from the last focusable element back to the first
      // (and vice versa for Shift+Tab) so focus cannot leave the dialog.
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose])

  // Fall back to the one-line card bio if no long-form biography was written.
  const bioParagraphs = member.extendedBio ?? [member.bio]

  return (
    <>
      {/* Backdrop — dims the page and closes the dialog when clicked. */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Dialog panel — fixed header, scrollable body. */}
      <motion.div
        key="panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className={`fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[92%] max-w-3xl -translate-x-1/2
                   -translate-y-1/2 flex-col overflow-hidden rounded-[28px] border-2
                   ${PALETTE.border} ${PALETTE.panel} ${PALETTE.glow}`}
      >
        {/* ── Header: portrait, name, title, close button ─────────────────── */}
        <div
          className={`flex shrink-0 items-center justify-between gap-4 border-b ${PALETTE.hairline} ${PALETTE.panel} p-6 sm:px-8`}
        >
          <div className="flex items-center gap-5 sm:gap-6">
            <div
              className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm ring-2 ${PALETTE.ring} sm:h-20 sm:w-20`}
            >
              {member.image ? (
                /* eslint-disable-next-line @next/next/no-img-element -- see note in README on image optimisation */
                <img
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                /* Fallback when a member has no portrait in `public/`. */
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <User className={`h-8 w-8 ${PALETTE.accentText}`} />
                </div>
              )}
            </div>

            <div>
              <h3
                id={headingId}
                className={`text-xl font-extrabold tracking-tight ${PALETTE.headingText} sm:text-2xl md:text-3xl`}
              >
                {member.name}
              </h3>
              <p className={`mt-1 text-sm font-semibold ${PALETTE.accentText} sm:text-base`}>
                {member.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close profile"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${PALETTE.mutedText}
                       transition-colors ${PALETTE.hoverSurface} hover:text-slate-700`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Body: biography, responsibilities, links ─────────────────────── */}
        <div
          className={`flex-1 space-y-7 overflow-y-auto p-6 text-sm leading-relaxed ${PALETTE.bodyText} sm:p-8 sm:text-base`}
        >
          <div className="space-y-4">
            {bioParagraphs.map((paragraph, index) => (
              <p key={index} className={`leading-relaxed ${PALETTE.bodyText}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {member.responsibilities.length > 0 && (
            <div>
              <h4
                className={`mb-3 text-xs font-extrabold uppercase tracking-widest ${PALETTE.headingText}`}
              >
                Key Responsibilities
              </h4>
              <ul className={`list-disc space-y-1.5 pl-5 ${PALETTE.listText}`}>
                {member.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/*
            Links block. Every row is optional and renders only when the matching
            field exists on the member, so adding a link means editing
            `lib/data/innovators.ts` only — unless it is a brand-new *kind* of
            link, in which case add a `<ProfileLink>` row here too.
          */}
          {(member.social || member.email) && (
            <div>
              <h4
                className={`mb-3 text-xs font-extrabold uppercase tracking-widest ${PALETTE.headingText}`}
              >
                Links &amp; Profiles
              </h4>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {member.social?.portfolio && (
                  <ProfileLink
                    href={member.social.portfolio}
                    label="Portfolio"
                    value={stripProtocol(member.social.portfolio)}
                  />
                )}
                {member.social?.github && (
                  <ProfileLink
                    href={member.social.github}
                    label="GitHub"
                    value={stripProtocol(member.social.github)}
                  />
                )}
                {member.social?.linkedin && (
                  <ProfileLink
                    href={member.social.linkedin}
                    label="LinkedIn"
                    value={stripProtocol(member.social.linkedin)}
                  />
                )}
                {member.social?.scholar && (
                  <ProfileLink
                    href={member.social.scholar}
                    label="Google Scholar"
                    value={member.social.scholarName || 'Google Scholar'}
                  />
                )}
                {member.social?.orcid && (
                  <ProfileLink
                    href={member.social.orcid}
                    label="ORCID"
                    /* ORCID URLs end in the identifier itself, e.g. .../0009-0006-2781-6693 */
                    value={member.social.orcid.split('/').pop() ?? member.social.orcid}
                  />
                )}
                {member.email && (
                  <ProfileLink
                    href={`mailto:${member.email}`}
                    label="Email"
                    value={member.email}
                    icon="mail"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

/** Strips `https://` and a leading `www.` so long URLs read cleanly. */
function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '')
}

/**
 * One "Label: value" row in the links grid.
 *
 * Extracted because the six rows above were six copies of the same 12 lines of
 * markup, differing only in their label and how the display text was derived.
 */
function ProfileLink({
  href,
  label,
  value,
  icon = 'external',
}: {
  href: string
  /** Bold prefix, e.g. "GitHub". */
  label: string
  /** Display text for the link target. */
  value: string
  /** `mail` for mailto links, `external` for everything else. */
  icon?: 'external' | 'mail'
}) {
  const Icon = icon === 'mail' ? Mail : ExternalLink
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      // Only http(s) links open in a new tab; a mailto: would open a blank one.
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-2 text-sm transition-colors hover:opacity-85"
    >
      <Icon className={`h-4 w-4 shrink-0 ${PALETTE.accentText}`} />
      <span className={`font-bold ${PALETTE.labelText}`}>{label}:</span>
      <span className={`${PALETTE.accentText} hover:underline`}>{value}</span>
    </Link>
  )
}