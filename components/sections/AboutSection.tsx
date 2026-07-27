'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'

export const AboutSection = () => (
  <section id="about" className="py-24 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky heading */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.span {...fadeUpProps(0.05)} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About FAB<span className="text-accent">INS</span>
            </motion.span>
            <motion.h2
              {...fadeUpProps(0.1)}
              className="display mt-5 text-[clamp(2rem,4.4vw,3.25rem)]"
            >
              RETROFIT,
              <br />
              NOT REPLACE.
            </motion.h2>
            <motion.p {...fadeUpProps(0.16)} className="mt-6 max-w-md leading-relaxed text-ink-muted">
              Imported inspection systems ask a mill to throw away its inspection machine. FABINS
              is built the other way round — a low-cost, high-precision upgrade that mounts onto
              the frames a factory already runs.
            </motion.p>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="lg:col-span-7">
          <div className="mb-3 hidden grid-cols-12 gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft sm:grid">
            <span className="col-span-3" />
            <span className="col-span-4">Conventional</span>
            <span className="col-span-5 text-accent">FABINS</span>
          </div>

          {FABINS_POC_DATA.retrofitComparisons.map((row, idx) => (
            <motion.div
              key={row.dimension}
              {...fadeUpProps(idx * 0.06)}
              className="grid grid-cols-1 gap-4 border-t border-line py-6 sm:grid-cols-12 sm:items-start sm:gap-6"
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
            </motion.div>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </div>
  </section>
)
