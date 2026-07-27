'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Camera, Sliders, Sun, Monitor, Cpu, Sparkles } from 'lucide-react'
import { FABINS_SYSTEM_DATA } from '@/lib/data/fabins-system'
import { fadeUpProps } from '@/lib/animations'
import { cn } from '@/lib/utils'

const HARDWARE_ICONS = [Camera, Sliders, Sun, Monitor]

export const SystemSection = () => {
  const [centeredIndex, setCenteredIndex] = useState<number>(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const steps = FABINS_SYSTEM_DATA.pipelineSteps

  // Detect which card is closest to the center of the scroll container
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const containerCenter = container.scrollLeft + container.clientWidth / 2

    let minDistance = Infinity
    let closestIndex = 0

    const cards = container.querySelectorAll<HTMLElement>('[data-card-index]')
    cards.forEach((card) => {
      const cardIndex = Number(card.getAttribute('data-card-index'))
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(containerCenter - cardCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = cardIndex
      }
    })

    setCenteredIndex(closestIndex)
  }, [])

  // Smooth scroll to card by index
  const scrollToCard = useCallback((index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cards = container.querySelectorAll<HTMLElement>('[data-card-index]')
    const targetCard = cards[index]

    if (targetCard) {
      const targetLeft =
        targetCard.offsetLeft - container.clientWidth / 2 + targetCard.offsetWidth / 2
      container.scrollTo({ left: targetLeft, behavior: 'smooth' })
    }
  }, [])

  // Attach scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const safeCenteredIndex = Math.min(
    Math.max(0, centeredIndex),
    Math.max(0, steps.length - 1)
  )

  const handlePrev = () => {
    const prevIndex = safeCenteredIndex > 0 ? safeCenteredIndex - 1 : steps.length - 1
    scrollToCard(prevIndex)
  }

  const handleNext = () => {
    const nextIndex = safeCenteredIndex < steps.length - 1 ? safeCenteredIndex + 1 : 0
    scrollToCard(nextIndex)
  }

  return (
    <section id="system" className="bg-canvas-alt/60 py-24 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <motion.span {...fadeUpProps(0.05)} className="eyebrow">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent" />
              The system
            </motion.span>
            <motion.h2 {...fadeUpProps(0.1)} className="display mt-5 text-[clamp(2rem,4.4vw,3.25rem)]">
              FROM ROLLING FABRIC
              <br />
              TO INSTANT REPORT.
            </motion.h2>
          </div>
          <motion.p {...fadeUpProps(0.16)} className="max-w-md leading-relaxed text-ink-muted">
            Synchronized with real fabric motion to deliver millimeter-accurate defect detection at full production speed.
          </motion.p>
        </div>

        {/* Smooth Horizontal Carousel Stage */}
        <motion.div {...fadeUpProps(0.25)} className="relative w-full py-4">
          {/* Previous / Next Arrow Controls */}
          {steps.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous step"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-line bg-panel/90 backdrop-blur-xl text-ink-muted transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110 active:scale-95 shadow-lg shadow-black/20 cursor-pointer group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next step"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-line bg-panel/90 backdrop-blur-xl text-ink-muted transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110 active:scale-95 shadow-lg shadow-black/20 cursor-pointer group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Native Smooth Scroll Track */}
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 py-6 px-[calc(50%-160px)] sm:px-[calc(50%-220px)] lg:px-[calc(50%-240px)] select-none [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {steps.map((step, idx) => {
              const isCenter = idx === safeCenteredIndex

              return (
                <div
                  key={step.stepNumber}
                  data-card-index={idx}
                  onClick={() => scrollToCard(idx)}
                  className={cn(
                    'snap-center shrink-0 w-[300px] sm:w-[420px] lg:w-[460px]',
                    'p-[1.5px] rounded-[28px] transition-all duration-500 ease-out cursor-pointer group transform',
                    isCenter
                      ? 'bg-gradient-to-b from-accent/80 via-accent-bright/50 to-blue-600/30 shadow-[0_20px_50px_rgba(8,145,178,0.35),0_0_25px_rgba(8,145,178,0.2)] -translate-y-3 scale-105 filter blur-0 opacity-100 z-20'
                      : 'bg-line/40 shadow-lg translate-y-2 scale-95 filter blur-[1.5px] opacity-60 z-10 hover:opacity-90 hover:blur-0'
                  )}
                >
                  {/* Card Content Container */}
                  <div className="relative w-full h-full p-6 sm:p-7 rounded-[26px] bg-panel/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
                    {/* Top Neon Accent Beam */}
                    <div
                      className={cn(
                        'absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl transition-all duration-500',
                        isCenter
                          ? 'bg-gradient-to-r from-accent via-accent-bright to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                          : 'bg-line'
                      )}
                    />

                    <div>
                      {/* Step Header Row */}
                      <div className="flex items-center justify-between gap-2 mb-5 pt-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-accent-quiet text-accent border border-accent/30 shadow-[0_0_10px_rgba(34,211,238,0.15)]">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span>Step {String(step.stepNumber).padStart(2, '0')}</span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          Phase {step.stepNumber} of {steps.length}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors duration-300 mb-3">
                        {step.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-sm leading-relaxed text-ink-muted font-normal min-h-[48px]">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-line/60 flex items-center justify-between text-xs text-ink-soft font-mono">
                      <span>FABINS Inspection Pipeline</span>
                      <span className="text-accent font-semibold">0{step.stepNumber} / 0{steps.length}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Dots */}
          {steps.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125',
                    i === safeCenteredIndex
                      ? 'w-8 bg-gradient-to-r from-accent to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                      : 'w-2.5 bg-line-strong hover:bg-accent/60'
                  )}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Hardware pillars */}
        <div className="mt-20">
          <motion.h3 {...fadeUpProps(0.05)} className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">
            Built on catalogue industrial hardware
          </motion.h3>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FABINS_SYSTEM_DATA.hardwarePillars.map((pillar, idx) => {
              const Icon = HARDWARE_ICONS[idx] || Cpu
              return (
                <motion.div key={pillar.id} {...fadeUpProps(idx * 0.07)} className="card card-hover">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-panel-2 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="chip !text-[10px] text-accent">{pillar.spec}</span>
                  </div>
                  <h4 className="text-base font-semibold tracking-tight">{pillar.title}</h4>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                    {pillar.headline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
