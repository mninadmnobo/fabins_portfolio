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
import { fadeUpProps } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ASTM D5430 Four-Point Rule Breakdown
const FOUR_POINT_RULES = [
  {
    points: '1 Point',
    size: 'Up to 3 inches (75 mm)',
    desc: 'Minor defect or short localized yarn imperfection.',
    badge: 'border-blue-500/30 bg-blue-500/10 text-blue-700',
  },
  {
    points: '2 Points',
    size: '3 to 6 inches (75 – 150 mm)',
    desc: 'Medium imperfection extending across several warp/weft yarns.',
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
  },
  {
    points: '3 Points',
    size: '6 to 9 inches (150 – 230 mm)',
    desc: 'Major imperfection affecting fabric appearance or strength.',
    badge: 'border-orange-500/30 bg-orange-500/10 text-orange-700',
  },
  {
    points: '4 Points',
    size: 'Over 9 inches (230 mm+) or Holes',
    desc: 'Critical defect or any physical hole/tear regardless of size.',
    badge: 'border-red-500/30 bg-red-500/10 text-red-700',
  },
]

// Common Fabric Defects & How They're Scored
const DEFECT_EXPLANATIONS = [
  {
    id: 'hole',
    name: 'Hole / Physical Tear',
    scoring: '4 Points (Fixed Override)',
    whatIsIt: 'A rupture or missing warp/weft yarns caused by needle breakage, sharp objects, or loom friction.',
    howCalculated: 'Under ASTM D5430, any physical hole or tear automatically receives a maximum 4-point penalty, regardless of how small its diameter is.',
    tagColor: 'bg-red-500/10 text-red-700 border-red-500/30',
  },
  {
    id: 'slub',
    name: 'Yarn Slub / Thick Place',
    scoring: '1 – 2 Points (By Length)',
    whatIsIt: 'An abnormal yarn thickening or lump that creates a visible streak across the woven or knitted surface.',
    howCalculated: 'Sized in millimeters by high-speed vision cameras. Slubs under 75mm score 1 point; slubs between 75mm–150mm score 2 points.',
    tagColor: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
  },
  {
    id: 'oil',
    name: 'Machine Oil Stain',
    scoring: '1 – 3 Points (By Size)',
    whatIsIt: 'Dark lubricant drops transferred onto the cloth from high-speed loom bearings or weaving machinery.',
    howCalculated: 'Evaluated by physical area and contrast under calibrated high-CRI lighting. Small spots score 1 point; larger streaks score 2–3 points.',
    tagColor: 'bg-orange-500/10 text-orange-700 border-orange-500/30',
  },
  {
    id: 'shading',
    name: 'Color Shade Variation',
    scoring: '3 Points (Per Meter)',
    whatIsIt: 'Uneven dye absorption or tone banding resulting in visible side-to-center or end-to-end color mismatch.',
    howCalculated: 'Detected via multispectral camera sensors. Assigned 3 points per affected meter of fabric roll length.',
    tagColor: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
  },
  {
    id: 'needle',
    name: 'Needle Line / Drop Stitch',
    scoring: '2 – 4 Points (Continuous)',
    whatIsIt: 'A continuous vertical stripe or missing loop caused by a bent or broken needle on knitting cylinders.',
    howCalculated: 'Measured along the continuous defect run. Scored per linear segment according to length thresholds.',
    tagColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/30',
  },
]

export const ReportSection = () => {
  const [activeDefect, setActiveDefect] = useState(DEFECT_EXPLANATIONS[0])

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
            {FOUR_POINT_RULES.map((rule, idx) => (
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
                  {DEFECT_EXPLANATIONS.map((defect) => {
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
