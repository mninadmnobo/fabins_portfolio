'use client'

import { useState } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { WhyFabinsSection } from '@/components/sections/WhyFabinsSection'
import { PipelineSection } from '@/components/sections/PipelineSection'
import { HardwareSection } from '@/components/sections/HardwareSection'
import { RollDemonstrationSection } from '@/components/sections/RollDemonstrationSection'
import { DefectGallerySection } from '@/components/sections/DefectGallerySection'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { HonestPositionSection } from '@/components/sections/HonestPositionSection'
import { DevelopmentTeamSection } from '@/components/sections/DevelopmentTeamSection'
import { DeployFabinsSection } from '@/components/sections/DeployFabinsSection'
import { ReportSimulatorModal } from '@/components/ui/ReportSimulatorModal'

export default function Home() {
  const [reportModalOpen, setReportModalOpen] = useState(false)

  return (
    <PageShell>
      {/* 1. Home Section */}
      <HeroSection onOpenReportModal={() => setReportModalOpen(true)} />

      {/* 2. Industry Problem & RMG Context */}
      <ProblemSection />

      {/* 3. Why FABINS Value & Retrofit Advantage */}
      <WhyFabinsSection />

      {/* 4. One Pass Pipeline (6 Steps) */}
      <PipelineSection />

      {/* 5. Hardware Pillars (8192px camera, lens & encoder, illumination, dashboard) */}
      <HardwareSection />

      {/* 6. Roll R-001 Live Production Demonstration Run */}
      <RollDemonstrationSection />

      {/* 7. Defect Classification & Physical Measurement Gallery */}
      <DefectGallerySection />

      {/* 8. Four-Point Report Simulator Anchor Banner */}
      <section id="report-sim" className="py-16 bg-[#030814] border-b border-cyan-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Interactive Report Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono uppercase">
            Test the Four-Point Penalty Generator
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            Adjust defect counts (holes, joints, oil spots) and roll dimensions to see how FABINS automatically applies ASTM D5430 penalty rules and calculates grade accept/reject thresholds.
          </p>
          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold font-mono text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 cursor-pointer"
          >
            Launch Interactive Report Simulator
          </button>
        </div>
      </section>

      {/* 9. Roadmap & Trajectory */}
      <RoadmapSection />

      {/* 10. Honest Position Statement */}
      <HonestPositionSection />

      {/* 11. Development Team */}
      <DevelopmentTeamSection />

      {/* 12. Deployment Inquiry Form */}
      <DeployFabinsSection />

      {/* Interactive Report Simulator Modal */}
      <ReportSimulatorModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </PageShell>
  )
}
