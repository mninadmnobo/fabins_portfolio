'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Calculator,
  Info,
  ChevronRight,
  Layers,
} from 'lucide-react'
import { FABINS_SYSTEM_DATA } from '@/lib/data/fabins-system'
import { fadeUpProps } from '@/lib/animations'
import { cn } from '@/lib/utils'

export const StandardsSection = () => {
  const [activeDefect, setActiveDefect] = useState(FABINS_SYSTEM_DATA.standardsDefects[0])

  return (
    <section id="standards" className="py-24 sm:py-28 bg-canvas-alt/40 border-y border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <motion.span {...fadeUpProps(0.05)} className="eyebrow">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent" />
            Defects &amp; Four-Point Grading
          </motion.span>
          <motion.h2
            {...fadeUpProps(0.1)}
            className="display mt-5 text-[clamp(1.65rem,3.5vw,2.65rem)]"
          >
            WHAT IS A FABRIC DEFECT &amp;
            <br />
            <span className="text-accent">HOW IS IT SCORED?</span>
          </motion.h2>
          <motion.p {...fadeUpProps(0.16)} className="mt-4 leading-relaxed text-ink-muted">
            Fabric faults are detected in real-time and automatically scored using the industry-standard Four-Point System.
          </motion.p>
        </div>

        {/* 1. Four-Point Penalty Rules Grid */}
        <div className="mb-14">
          <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
            <Calculator className="h-4 w-4 text-accent" />
            1. The ASTM D5430 Four-Point Penalty Rules
          </h3>

          <motion.div {...fadeUpProps(0.2)} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FABINS_SYSTEM_DATA.standardsRules.map((rule, idx) => (
              <div
                key={idx}
                className="card !p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={cn('rounded-full border px-3 py-1 font-mono text-xs font-extrabold', rule.badge)}>
                    {rule.points}
                  </span>
                  <span className="font-mono text-[10px] text-ink-soft">Rule {idx + 1}</span>
                </div>
                <h4 className="mt-4 text-sm font-bold text-ink">{rule.size}</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{rule.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 2. Interactive Section: What is a Defect vs How Roll Points are Calculated */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Interactive Defect Explanations */}
          <motion.div {...fadeUpProps(0.24)} className="lg:col-span-6 flex flex-col">
            <div className="card !p-6 sm:!p-8 border-line bg-panel h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-line pb-4 mb-4">
                  <Layers className="h-5 w-5 text-accent" />
                  <div>
                    <h3 className="text-base font-bold text-ink">
                      2. Common Fabric Defects
                    </h3>
                    <p className="text-xs font-mono text-ink-soft">
                      ASTM D5430 Defect Taxonomy
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {FABINS_SYSTEM_DATA.standardsDefects.map((defect) => {
                    const isSelected = activeDefect.id === defect.id
                    return (
                      <button
                        key={defect.id}
                        onClick={() => setActiveDefect(defect)}
                        className={cn(
                          'w-full text-left rounded-2xl border p-4 transition-all duration-200 cursor-pointer',
                          isSelected
                            ? 'border-accent bg-panel-2 shadow-sm shadow-accent/10 translate-x-1'
                            : 'border-line/70 bg-panel-2/40 hover:bg-panel-2 hover:border-line-strong'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-ink">{defect.name}</h4>
                          <span className={cn('rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-bold', defect.tagColor)}>
                            {defect.scoring}
                          </span>
                        </div>

                        <div className="mt-2.5 space-y-1.5 text-xs">
                          <p className="text-ink-muted">
                            <strong className="text-ink font-semibold">What it is: </strong>
                            {defect.whatIsIt}
                          </p>
                          {isSelected && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-accent pt-1 leading-relaxed"
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

          {/* Right: How the Final Roll Score is Calculated Formula Card */}
          <motion.div {...fadeUpProps(0.28)} className="lg:col-span-6 flex flex-col">
            <div className="card !p-6 sm:!p-8 border-accent/20 bg-panel h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-line pb-4 mb-4">
                  <Calculator className="h-5 w-5 text-accent" />
                  <div>
                    <h3 className="text-base font-bold text-ink">
                      3. How Total Roll Grade is Calculated
                    </h3>
                    <p className="text-xs font-mono text-ink-soft">
                      ASTM D5430 Standard Formula
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                  After inspecting a fabric roll, total penalty points are normalized per 100 square yards to determine if the roll passes export quality standards.
                </p>

                {/* Mathematical Formula Card */}
                <div className="my-4 rounded-2xl border border-accent/30 bg-accent-quiet/40 p-4 text-center">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">
                    Official Four-Point Formula
                  </span>
                  <div className="py-1 font-mono text-xs sm:text-sm font-bold text-ink">
                    Points / 100 yd² = <span className="text-accent">(Total Points × 3,600)</span> ÷ <span className="text-ink-muted">(Yards × Width Ins)</span>
                  </div>
                </div>

                {/* Step-by-Step Example Calculation */}
                <div className="space-y-2 rounded-2xl border border-line bg-panel-2 p-4 text-xs">
                  <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">
                    Example Roll Calculation:
                  </h4>

                  <div className="space-y-1.5 text-ink-muted">
                    <div className="flex justify-between border-b border-line/60 pb-1.5">
                      <span>Fabric Roll Spec:</span>
                      <span className="font-mono font-semibold text-ink">100 Yards Length × 60 Inches Width</span>
                    </div>
                    <div className="flex justify-between border-b border-line/60 pb-1.5">
                      <span>Defects Found:</span>
                      <span className="font-mono font-semibold text-amber-600">3 Slubs (3 pts) + 1 Hole (4 pts) = 7 Pts</span>
                    </div>
                    <div className="flex justify-between border-b border-line/60 pb-1.5">
                      <span>Formula Output:</span>
                      <span className="font-mono font-semibold text-accent">(7 × 3,600) ÷ (100 × 60) = 4.2 Pts</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Acceptance Result:</span>
                      <span className="font-mono font-bold text-emerald-600">PASS (Grade A · Limit: 40 pts)</span>
                    </div>
                  </div>
                </div>

                {/* Grade Acceptance Scale Table */}
                <div className="mt-4 rounded-2xl border border-line p-4 space-y-2">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Standard Buyer Acceptance Thresholds
                  </span>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-700">
                      <span className="block font-bold">0 – 20 Pts</span>
                      <span className="text-[10px] opacity-80">Grade A (Pass)</span>
                    </div>
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-700">
                      <span className="block font-bold">21 – 40 Pts</span>
                      <span className="text-[10px] opacity-80">Grade B (Pass)</span>
                    </div>
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-700">
                      <span className="block font-bold">&gt; 40 Pts</span>
                      <span className="text-[10px] opacity-80">REJECT / Cut</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Footer Note */}
              <div className="mt-5 flex items-center gap-2 text-[11px] text-ink-soft border-t border-line pt-4">
                <Info className="h-4 w-4 text-accent shrink-0" />
                <span>FABINS automates this entire calculation process instantly as the fabric unrolls.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


