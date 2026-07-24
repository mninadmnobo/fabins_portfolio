export interface SystemOverview {
  productName: string
  tagline: string
  subtitle: string
  provenSummary: string
}

export interface IndustryProblem {
  id: string
  title: string
  description: string
  iconName: string
}

export interface RetrofitComparison {
  dimension: string
  conventional: string
  conventionalDetail: string
  fabins: string
  fabinsDetail: string
}

export interface PipelineStep {
  stepNumber: number
  title: string
  shortTitle: string
  description: string
}

export interface HardwarePillar {
  id: string
  title: string
  headline: string
  spec: string
  description: string
}

export interface DefectSample {
  id: string
  name: string
  sizeMm: number
  penaltyPoints: number
  description: string
  scoringRule: string
  bgGradient: string
}

export interface MetricItem {
  id: string
  value: string
  label: string
  sublabel: string
  accentColor: string
}

export interface RoadmapPhase {
  phase: string
  title: string
  status: 'completed' | 'in_progress' | 'upcoming'
  details: string[]
}

export const FABINS_POC_DATA = {
  overview: {
    productName: 'FABINS',
    standsFor: 'Fabric Inspection Automation',
    fullTitle: 'Fabric Inspection Automation (FABINS)',
    tagline: 'AI-Powered Fabric Fault Detection System',
    subtitle: 'An AI-powered Fabric Fault Detection System that automates the inspection process — capturing moving fabric, detecting and classifying defects, measuring them in millimeters, and applying the Four-Point Scoring System.',
    provenSummary: 'FABINS (Fabric Inspection Automation) is an AI-powered fabric fault detection system that automates the fabric inspection process. It replaces manual fabric grading with a high-speed line-scan computer vision pipeline that detects and classifies defects, measures them in millimeters, applies the industry-standard Four-Point System, and issues a completed inspection report without human intervention.',
    honestPosition: 'The POC demonstrates capability — the pipeline works end to end on real fabric. It does not yet demonstrate statistical performance accuracy, throughput and measurement precision require the validation phase before commercial or investment claims can be made on them.',
    closingStatement: 'FABINS shows that an AI-powered fabric fault detection system can work on real factory hardware using the standards and inspection process already followed by Bangladeshi textile mills. It proves that the entire workflow from capturing fabric rolls to generating an inspection report can run automatically with minimal human involvement.'
  },

  industryProblems: [
    {
      id: 'manual',
      title: 'Manual, Person-Dependent',
      description: 'Grading still relies on an inspector\'s eye at the frame — not on installed machine capacity.',
      iconName: 'UserX'
    },
    {
      id: 'fatigue',
      title: 'Fatigue & Monotony',
      description: 'Long shifts watching moving cloth degrade attention — a physiological limit, not a discipline issue.',
      iconName: 'Clock'
    },
    {
      id: 'inconsistent',
      title: 'Inconsistent Quality',
      description: 'Two inspectors grade the same roll differently — human error is unavoidable, not occasional.',
      iconName: 'BarChart2'
    },
    {
      id: 'no-data',
      title: 'Almost No Usable Data',
      description: 'A tally sheet, not a defect map — nothing to trace faults back to a machine or batch.',
      iconName: 'Database'
    },
    {
      id: 'global-shift',
      title: 'Global Shift to AI Inspection',
      description: 'Textile manufacturing worldwide is automating quality control with machine vision.',
      iconName: 'Zap'
    },
    {
      id: 'china-moved',
      title: 'China Has Already Moved',
      description: 'Competing manufacturing hubs are already deploying automated inspection at scale.',
      iconName: 'Globe'
    },
    {
      id: 'rmg-pillar',
      title: 'RMG Is a National Pillar',
      description: 'Ready-made garments are one of Bangladesh\'s largest export and employment sectors.',
      iconName: 'ShieldAlert'
    },
    {
      id: 'smart-manufacturing',
      title: 'Smart Manufacturing Is Required',
      description: 'To keep global buyers, Bangladesh must adopt AI-driven inspection at pace.',
      iconName: 'Cpu'
    }
  ] as IndustryProblem[],

  retrofitComparisons: [
    {
      dimension: 'Approach',
      conventional: 'Replace',
      conventionalDetail: 'Replace the complete inspection machine outright',
      fabins: 'Upgrade',
      fabinsDetail: 'Upgrade the existing inspection machine as a retrofit'
    },
    {
      dimension: 'Investment',
      conventional: 'High Capital',
      conventionalDetail: 'New machine purchased outright at high foreign cost',
      fabins: 'Low-Cost Retrofit',
      fabinsDetail: 'Low-cost retrofit integration into existing mill hardware'
    },
    {
      dimension: 'Installation',
      conventional: 'Long Downtime',
      conventionalDetail: 'Long changeover and extended factory commissioning',
      fabins: 'Fast Deployment',
      fabinsDetail: 'Fast deployment with minimal production disruption'
    },
    {
      dimension: 'Support & Fit',
      conventional: 'Vendor-Dependent',
      conventionalDetail: 'Overseas service with high barrier for mid-sized mills',
      fabins: 'Locally Engineered',
      fabinsDetail: 'Locally engineered & supported for local fabrics and specs'
    }
  ] as RetrofitComparison[],

  pipelineSteps: [
    {
      stepNumber: 1,
      title: 'Camera Captures',
      shortTitle: 'Capture',
      description: 'High-speed line-scan camera captures the full fabric width as it moves.'
    },
    {
      stepNumber: 2,
      title: 'Image Acquisition',
      shortTitle: 'Acquisition',
      description: 'Rotary encoder triggers every image line from actual fabric travel for precise sync.'
    },
    {
      stepNumber: 3,
      title: 'AI Defect Detection',
      shortTitle: 'Detection',
      description: 'Deep learning vision model resolves sub-millimeter defects on moving fabric in real time.'
    },
    {
      stepNumber: 4,
      title: 'Classify & Measure (mm)',
      shortTitle: 'Classification',
      description: 'Distinguishes holes, joints, oil spots, and measures exact physical size in millimeters.'
    },
    {
      stepNumber: 5,
      title: 'Four-Point Grading',
      shortTitle: 'Grading',
      description: 'Applies Four-Point penalty rules automatically, including fixed hole penalty overrides.'
    },
    {
      stepNumber: 6,
      title: 'Report & Dashboard',
      shortTitle: 'Reporting',
      description: 'Issues mill\'s own official inspection report format, signed and ready for sign-off.'
    }
  ] as PipelineStep[],

  hardwarePillars: [
    {
      id: 'camera',
      title: 'Line-Scan Camera',
      headline: '8192px Industrial Color Sensor',
      spec: '8192px Line Rate',
      description: 'Industrial high-resolution line-scan camera capturing the full fabric width with sub-millimeter optical clarity per line.'
    },
    {
      id: 'encoder',
      title: 'Lens & Encoder',
      headline: 'Encoder-Triggered Sync',
      spec: 'Rotary Hardware Pulse',
      description: 'Calibrated optics paired with a rotary hardware encoder, locking capture geometry to actual fabric speed regardless of conveyor variance.'
    },
    {
      id: 'lighting',
      title: 'Lighting & Conveyor',
      headline: 'Controlled Illumination Rig',
      spec: 'Uniform High-CRI LED',
      description: 'Custom-designed uniform lighting assembly over a continuous-motion fabric transport rig, eliminating shadow artifacts.'
    },
    {
      id: 'software',
      title: 'AI Software & Dashboard',
      headline: 'Browser Operator Interface',
      spec: 'Real-Time Edge Pipeline',
      description: 'Detection, grading, and reporting pipeline with an intuitive browser-based operator dashboard for live feeds and report downloads.'
    }
  ] as HardwarePillar[],

  demonstrationRun: {
    title: 'Roll R-001 Demonstration Run',
    subtitle: 'Proven on Real Production Fabric',
    context: 'A live inspection run was executed on roll R-001 at Saturn Textiles Limited against a Tommy Hilfiger order, witnessed by academic and industry observers.',
    provenChecklist: [
      'End-to-end automated inspection — capture to finished report with no manual step',
      'AI defect detection — sub-millimeter defects resolved on fabric in motion',
      'Defect classification — hole, joint and oil spot correctly distinguished',
      'Physical measurement — every detection sized in millimeters, not just pixels',
      'Four-Point grading — penalty rules, including the hole override, applied automatically',
      'Automatic report generation — the mill\'s own inspection sheet, populated and ready to sign',
      'Operator dashboard — live feed, analysis control and inspection history',
      'Industrial machine-vision pipeline — built entirely on catalogue industrial components'
    ],
    metrics: [
      { id: 'defects', value: '36', label: 'Defects Detected', sublabel: 'Resolved on moving roll R-001', accentColor: 'cyan' },
      { id: 'classes', value: '3', label: 'Defect Classes', sublabel: 'Hole, Joint & Oil Spot', accentColor: 'blue' },
      { id: 'smallest', value: '0.7mm', label: 'Smallest Defect', sublabel: 'Resolved in single-pass motion', accentColor: 'emerald' },
      { id: 'confidence', value: '100%', label: 'Detections Sized', sublabel: 'Physical size & confidence', accentColor: 'indigo' },
      { id: 'range', value: '79:1', label: 'Size Range Handled', sublabel: 'Sub-mm to 50mm in one pass', accentColor: 'cyan' },
      { id: 'penalty', value: '75', label: 'Penalty Points', sublabel: 'Computed via Four-Point System', accentColor: 'purple' }
    ] as MetricItem[]
  },

  defectSamples: [
    {
      id: 'hole',
      name: 'Hole Defect',
      sizeMm: 2.2,
      penaltyPoints: 4,
      description: 'Structural disruption in weave pattern. Triggered fixed 4-point penalty override automatically.',
      scoringRule: 'Four-Point Rule: Fixed 4 points override regardless of physical diameter.',
      bgGradient: 'from-[#030712] via-[#0b1329] to-[#1e1b4b]'
    },
    {
      id: 'joint',
      name: 'Fabric Joint',
      sizeMm: 49.5,
      penaltyPoints: 1,
      description: 'Yarn joining seam across fabric length. Correctly classified as joint rather than structural tear.',
      scoringRule: 'Four-Point Rule: Scored based on length tiering (<50mm = 1pt).',
      bgGradient: 'from-[#030712] via-[#09152b] to-[#0284c7]'
    },
    {
      id: 'oil-spot',
      name: 'Oil Spot Staining',
      sizeMm: 5.8,
      penaltyPoints: 1,
      description: 'Machinery oil droplet stain on cotton weave. Sized accurately in millimeters under high-CRI lighting.',
      scoringRule: 'Four-Point Rule: Minor localized stain (<75mm = 1pt).',
      bgGradient: 'from-[#030712] via-[#061e29] to-[#059669]'
    }
  ] as DefectSample[],

  roadmap: [
    {
      phase: 'Phase 1',
      title: 'Proof of Concept (Done) & Validation (Next)',
      status: 'completed',
      details: [
        'Bench-scale prototype built & demonstrated on production roll R-001 at Saturn Textiles Limited.',
        'Working end-to-end pipeline: line-scan capture ➔ AI detection ➔ Four-Point grading ➔ PDF/CSV reporting.',
        'Validation phase next: statistical accuracy, throughput, and measurement precision testing.'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Higher AI Accuracy & Defect Expansion',
      status: 'in_progress',
      details: [
        'Fine-tuning vision model accuracy on wider fabric blends and weave textures.',
        'Expanding defect classification categories beyond holes, joints, and oil spots.',
        'Optimizing edge-node inference speed for higher loom conveyor velocities.'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Factory Pilot Deployment',
      status: 'upcoming',
      details: [
        'Installing retrofit hardware rig onto live factory floor inspection frames.',
        'Multi-shift operator testing with real-time feedback loops and mill manager dashboards.',
        'ERP & mill production database integration for automated roll grading sign-off.'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Commercial Product & Scaled Deployment',
      status: 'upcoming',
      details: [
        'Turnkey commercial retrofit kit for textile mills across Bangladesh.',
        'Local engineering support, maintenance service, and custom spec adaptation.',
        'Industrial AI deployment standardizing quality assurance across RMG export mills.'
      ]
    }
  ] as RoadmapPhase[]
}
