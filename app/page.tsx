import { PageShell } from '@/components/layout/PageShell'
import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeStrip } from '@/components/sections/MarqueeStrip'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SystemSection } from '@/components/sections/SystemSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <MarqueeStrip />
      <ProblemSection />
      <AboutSection />
      <SystemSection />
      <TeamSection />
      <ContactSection />
    </PageShell>
  )
}
