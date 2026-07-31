'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Cpu, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeUpProps } from '@/lib/animations'

/**
 * CONTACT SECTION — Overview & Deployment Entry Portal.
 *
 * Prompts mill managers, quality engineers, and factory directors to open the
 * dedicated RMG Industry Assessment Portal at `/deploy`.
 */
export const ContactSection = () => {
  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* Left: Section Header & Contact Pitch */}
        <div className="lg:col-span-6">
          <SectionHeader
            layout="bare"
            eyebrow="READY TO UPGRADE YOUR MILL?"
            title={
              <>
                TRANSFORM YOUR
                <br />
                INSPECTION FRAMES
              </>
            }
            description="Our R&D team conducts custom technical assessments for knit, woven, and denim inspection frames. Submit your machine specifications and target defect criteria for a tailored retrofit plan."
            descriptionClassName="max-w-xl"
          />

          <motion.div {...fadeUpProps(0.22)} className="mt-8 space-y-4 text-sm text-ink-muted">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-semibold text-ink">Saturn Textiles Limited</span>
                <span className="text-xs text-ink-soft">Department of Research &amp; Development</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-semibold text-ink">Direct Enquiry Email</span>
                <a href="mailto:saturn.rnd.innovation@gmail.com" className="text-xs text-accent hover:underline">
                  saturn.rnd.innovation@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-quiet text-accent border border-accent/20">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-semibold text-ink">Automation Systems Laboratory</span>
                <span className="text-xs text-ink-soft">Dhaka, Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Premium Assessment Gateway Card */}
        <motion.div {...fadeUpProps(0.18)} className="lg:col-span-6">
          <div className="relative rounded-3xl border border-accent/30 bg-panel/90 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(8,145,178,0.25)] backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-quiet px-3.5 py-1 text-xs font-semibold text-accent mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Dedicated RMG Assessment Portal
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-ink font-heading">
              Submit Your Mill Assessment
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              We collect detailed machine specifications (frame quantity, fabric roll widths, inspection speeds, and defect focus areas) to design your mill's camera mountings and AI pipeline.
            </p>

            <div className="mt-6 space-y-3 text-xs text-ink-soft">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>ASTM D5430 Four-Point Standard Automated Grading</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Cpu className="h-4 w-4 text-accent shrink-0" />
                <span>Retrofits existing backlight/toplight inspection frames in under 4 hours</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <Link
                href="/deploy"
                className="btn btn-primary w-full justify-center !py-3.5 text-sm font-bold shadow-lg group"
              >
                <span>Open RMG Deployment Form</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}