'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, Layers } from 'lucide-react'
import { FABINS_SYSTEM_DATA, type Tone, type CalculationRow } from '@/lib/data/fabins-system'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUpProps } from '@/lib/animations'
import { cn } from '@/lib/utils'

/**
 * STANDARDS SECTION — what a fabric defect is and how ASTM D5430 scores it.
 *
 * Content: `standardsRules`, `standardsDefects`, `gradeThresholds`, and
 * `rollCalculation` in `lib/data/fabins-system.ts`.
 *
 * Three blocks, numbered in the copy so a mill visitor can follow the argument:
 *   1. the four penalty bands
 *   2. an interactive list of common defects (click one to reveal how it scores)
 *   3. the roll-level formula, a worked example, and the acceptance scale
 */

/**
 * Turns a semantic `Tone` from the content into Tailwind classes.
 *
 * Colours live here rather than in the data file so that content stays free of
 * styling — a rebrand is one edit in this map instead of a find-and-replace
 * across dozens of content strings.
 *
 * Typed as `Record<Tone, string>`: add a tone to the union in the data file and
 * this will not compile until you give it a colour here.
 *
 * The class strings are written out in full rather than interpolated
 * (`bg-${tone}-500/10`) because Tailwind scans source text literally and would
 * not generate classes it cannot see.
 */
const TONE_CLASSES: Record<Tone, string> = {
  blue: 'border-blue-500/30 bg-blue-500/10 text-blue-700',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
  orange: 'border-orange-500/30 bg-orange-500/10 text-orange-700',
  red: 'border-red-500/30 bg-red-500/10 text-red-700',
  purple: 'border-purple-500/30 bg-purple-500/10 text-purple-700',
  cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-700',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
}

/** Emphasis styling for each row of the worked calculation. */
const CALCULATION_TONES: Record<CalculationRow['emphasis'], string> = {
  neutral: 'font-semibold text-ink',
  warning: 'font-semibold text-amber-600',
  accent: 'font-semibold text-accent',
  success: 'font-bold text-emerald-600',
}

export const StandardsSection = () => {
  // The first defect is expanded on load so the panel is never empty.
  const [activeDefectId, setActiveDefectId] = useState(
    FABINS_SYSTEM_DATA.standardsDefects[0].id
  )

  return (
    <Section id="standards" className="border-y border-line bg-canvas-alt/40">
      <SectionHeader
        eyebrow="Defects & Four-Point Grading"
        // Runs smaller than the site default because the heading is long.
        titleClassName="text-[clamp(1.65rem,3.5vw,2.65rem)]"
        title={
          <>
            WHAT IS A FABRIC DEFECT &amp;
            <br />
            <span className="text-accent">HOW IS IT SCORED?</span>
          </>
        }
        description="Fabric faults are detected in real-time and automatically scored using the industry-standard Four-Point System."
      />

      {/* ── 1. Penalty bands ───────────────────────────────────────────── */}
      <div className="mb-14">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
          <Calculator className="h-4 w-4 text-accent" />
          1. The ASTM D5430 Four-Point Penalty Rules
        </h3>

        <motion.div
          {...fadeUpProps(0.2)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FABINS_SYSTEM_DATA.standardsRules.map((rule, index) => (
            <div key={rule.points} className="card !p-5 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'rounded-full border px-3 py-1 font-mono text-xs font-extrabold',
                    TONE_CLASSES[rule.tone]
                  )}
                >
                  {rule.points}
                </span>
                <span className="font-mono text-[10px] text-ink-soft">Rule {index + 1}</span>
              </div>
              <h4 className="mt-4 text-sm font-bold text-ink">{rule.size}</h4>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{rule.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* ── 2. Interactive defect list ───────────────────────────────── */}
        <motion.div {...fadeUpProps(0.24)} className="flex flex-col lg:col-span-6">
          <div className="card flex h-full flex-col justify-between border-line bg-panel !p-6 sm:!p-8">
            <div>
              <div className="mb-4 flex items-center gap-2 border-b border-line pb-4">
                <Layers className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="text-base font-bold text-ink">2. Common Fabric Defects</h3>
                  <p className="font-mono text-xs text-ink-soft">ASTM D5430 Defect Taxonomy</p>
                </div>
              </div>

              <div className="space-y-3">
                {FABINS_SYSTEM_DATA.standardsDefects.map((defect) => {
                  const isSelected = activeDefectId === defect.id

                  return (
                    <button
                      key={defect.id}
                      onClick={() => setActiveDefectId(defect.id)}
                      aria-expanded={isSelected}
                      className={cn(
                        'w-full cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200',
                        isSelected
                          ? 'translate-x-1 border-accent bg-panel-2 shadow-sm shadow-accent/10'
                          : 'border-line/70 bg-panel-2/40 hover:border-line-strong hover:bg-panel-2'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-ink">{defect.name}</h4>
                        <span
                          className={cn(
                            'rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-bold',
                            TONE_CLASSES[defect.tone]
                          )}
                        >
                          {defect.scoring}
                        </span>
                      </div>

                      <div className="mt-2.5 space-y-1.5 text-xs">
                        <p className="text-ink-muted">
                          <strong className="font-semibold text-ink">What it is: </strong>
                          {defect.whatIsIt}
                        </p>

                        {/* Scoring detail is revealed only for the selected defect. */}
                        {isSelected && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="pt-1 leading-relaxed text-accent"
                          >
                            <strong className="font-semibold">How scored: </strong>
                            {defect.howCalculated}
                          </motion.p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 3. Roll-level formula, example, and acceptance scale ─────── */}
        <motion.div {...fadeUpProps(0.28)} className="flex flex-col lg:col-span-6">
          <div className="card flex h-full flex-col justify-between border-accent/20 bg-panel !p-6 sm:!p-8">
            <div>
              <div className="mb-4 flex items-center gap-2 border-b border-line pb-4">
                <Calculator className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="text-base font-bold text-ink">
                    3. How Total Roll Grade is Calculated
                  </h3>
                  <p className="font-mono text-xs text-ink-soft">ASTM D5430 Standard Formula</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                After inspecting a fabric roll, total penalty points are normalized per 100 square
                yards to determine if the roll passes export quality standards.
              </p>

              {/*
                The formula stays as markup rather than moving into the data
                file because the numerator and denominator are colour-coded,
                which a plain string cannot express.
              */}
              <div className="my-4 rounded-2xl border border-accent/30 bg-accent-quiet/40 p-4 text-center">
                <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                  Official Four-Point Formula
                </span>
                <div className="py-1 font-mono text-xs font-bold text-ink sm:text-sm">
                  Points / 100 yd² = <span className="text-accent">(Total Points × 3,600)</span> ÷{' '}
                  <span className="text-ink-muted">(Yards × Width Ins)</span>
                </div>
              </div>

              {/* Worked example. The final row drops the separator to read as a conclusion. */}
              <div className="space-y-2 rounded-2xl border border-line bg-panel-2 p-4 text-xs">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink">
                  Example Roll Calculation:
                </h4>

                <div className="space-y-1.5 text-ink-muted">
                  {FABINS_SYSTEM_DATA.rollCalculation.map((row, index) => {
                    const isLast = index === FABINS_SYSTEM_DATA.rollCalculation.length - 1

                    return (
                      <div
                        key={row.label}
                        className={cn(
                          'flex justify-between',
                          isLast ? 'pt-1' : 'border-b border-line/60 pb-1.5'
                        )}
                      >
                        <span>{row.label}</span>
                        <span className={cn('font-mono', CALCULATION_TONES[row.emphasis])}>
                          {row.value}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Buyer acceptance scale. Laid out for exactly three bands. */}
              <div className="mt-4 space-y-2 rounded-2xl border border-line p-4">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Standard Buyer Acceptance Thresholds
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  {FABINS_SYSTEM_DATA.gradeThresholds.map((threshold) => (
                    <div
                      key={threshold.range}
                      className={cn('rounded-xl border p-2', TONE_CLASSES[threshold.tone])}
                    >
                      <span className="block font-bold">{threshold.range}</span>
                      <span className="text-[10px] opacity-80">{threshold.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[11px] text-ink-soft">
              <Info className="h-4 w-4 shrink-0 text-accent" />
              <span>
                FABINS automates this entire calculation process instantly as the fabric unrolls.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}