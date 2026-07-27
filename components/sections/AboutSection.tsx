'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { FABINS_SYSTEM_DATA } from '@/lib/data/fabins-system'
import { fadeUpProps } from '@/lib/animations'

export const AboutSection = () => (
  <section id="about" className="py-24 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-14 max-w-3xl">
        <motion.span {...fadeUpProps(0.05)} className="eyebrow">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent" />
          The Strategy
        </motion.span>
        <motion.h2 {...fadeUpProps(0.1)} className="display mt-5 text-[clamp(2rem,4.4vw,3.25rem)]">
          WHY RETROFIT EXISTING
          <br />
          <span className="text-accent">INSPECTION FRAMES?</span>
        </motion.h2>
        <motion.p {...fadeUpProps(0.16)} className="mt-4 leading-relaxed text-ink-muted">
          Importing complete automated inspection machines from abroad requires millions in capital expenditure and disruptive factory floor redesign. FABINS upgrades the inspection frames already sitting in Bangladeshi mills.
        </motion.p>
      </div>

      {/* Retrofit vs Conventional Machine Grid */}
      <motion.div {...fadeUpProps(0.22)} className="overflow-hidden rounded-3xl border border-line bg-panel shadow-sm">
        <div className="grid grid-cols-12 border-b border-line bg-panel-2 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-ink-soft">
          <div className="col-span-3 sm:col-span-3">Dimension</div>
          <div className="col-span-4 sm:col-span-4 text-rose-500/80">Conventional Machine</div>
          <div className="col-span-5 sm:col-span-5 text-accent font-extrabold">FABINS Retrofit</div>
        </div>

        <div className="divide-y divide-line/60">
          {FABINS_SYSTEM_DATA.aboutComparisons.map((row) => (
            <div
              key={row.dimension}
              className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-12 sm:items-start sm:gap-6"
            >
              <span className="text-lg font-semibold tracking-tight sm:col-span-3">
                {row.dimension}
              </span>

              <div className="sm:col-span-4">
                <span className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                  <X className="h-3.5 w-3.5 shrink-0" />
                  {row.conventional}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  {row.conventionalDetail}
                </p>
              </div>

              <div className="sm:col-span-5">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <Check className="h-3.5 w-3.5 shrink-0" />
                  {row.fabins}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{row.fabinsDetail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)
