'use client'

import { motion } from 'framer-motion'
import { UserX, Clock, BarChart2, Database, Zap, Globe, ShieldAlert, Cpu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FABINS_SYSTEM_DATA, type ProblemIconName } from '@/lib/data/fabins-system'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUpProps } from '@/lib/animations'

/**
 * PROBLEM SECTION — why manual inspection at the frame does not scale.
 *
 * Content: `FABINS_SYSTEM_DATA.problemItems` in `lib/data/fabins-system.ts`.
 * Every item is rendered; there is no filtering here.
 */

/**
 * Maps each icon name used in the content to a real icon component.
 *
 * Typed as `Record<ProblemIconName, LucideIcon>`, which means TypeScript will
 * not compile unless this map covers every name in the `ProblemIconName` union.
 * Add an icon name to the data file and the build fails here until you supply
 * the matching icon — so a card can never render with a missing icon.
 */
const PROBLEM_ICONS: Record<ProblemIconName, LucideIcon> = {
  UserX,
  Clock,
  BarChart2,
  Database,
  Zap,
  Globe,
  ShieldAlert,
  Cpu,
}

export const ProblemSection = () => (
  <section id="problem" className="py-24 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="The problem"
        title={
          <>
            THE HUMAN LIMIT AT
            <br />
            THE INSPECTION FRAME
          </>
        }
        description="Bangladesh RMG is a national export pillar, yet quality control at the frame is still one inspector, one pair of eyes, one tally sheet — while competing manufacturing hubs have already automated it."
      />

      {/* Card grid. Sized for four items per row on large screens. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FABINS_SYSTEM_DATA.problemItems.map((item, index) => {
          const Icon = PROBLEM_ICONS[item.iconName]

          return (
            <motion.div
              key={item.id}
              // Stagger each card slightly so the row cascades in on scroll.
              {...fadeUpProps(index * 0.07)}
              className="card card-hover"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-panel-2 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  </section>
)