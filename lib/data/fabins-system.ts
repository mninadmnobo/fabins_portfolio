/**
 * FABINS Fabric Inspection Automation — System Dataset & Specifications
 *
 * Single source of truth mapped 1-to-1 with Web UI Section Components:
 * - ProblemSection   <---> ProblemItem              (problemItems)
 * - AboutSection     <---> AboutComparison          (aboutComparisons)
 * - SystemSection    <---> SystemPipelineStep       (pipelineSteps)
 *                    <---> SystemHardwarePillar     (hardwarePillars)
 * - StandardsSection <---> StandardsRule            (standardsRules)
 *                    <---> StandardsDefectExplanation (standardsDefects)
 */

export interface ProblemItem {
  id: string
  title: string
  description: string
  iconName: string
}

export interface AboutComparison {
  dimension: string
  conventional: string
  conventionalDetail: string
  fabins: string
  fabinsDetail: string
}

export interface SystemPipelineStep {
  stepNumber: number
  title: string
  shortTitle: string
  description: string
}

export interface SystemHardwarePillar {
  id: string
  title: string
  headline: string
  spec: string
  description: string
}

export interface StandardsRule {
  points: string
  size: string
  desc: string
  badge: string
}

export interface StandardsDefectExplanation {
  id: string
  name: string
  scoring: string
  whatIsIt: string
  howCalculated: string
  tagColor: string
}

export const FABINS_SYSTEM_DATA = {
  // ProblemSection dataset
  problemItems: [
    {
      id: 'manual',
      title: 'Manual, Person-Dependent',
      description: "Grading still relies on an inspector's eye at the frame — not on installed machine capacity.",
      iconName: 'UserX',
    },
    {
      id: 'fatigue',
      title: 'Fatigue & Monotony',
      description: 'Long shifts watching moving cloth degrade attention — a physiological limit, not a discipline issue.',
      iconName: 'Clock',
    },
    {
      id: 'inconsistent',
      title: 'Inconsistent Quality',
      description: 'Two inspectors grade the same roll differently — human error is unavoidable, not occasional.',
      iconName: 'BarChart2',
    },
    {
      id: 'no-data',
      title: 'Almost No Usable Data',
      description: 'A tally sheet, not a defect map — nothing to trace faults back to a machine or batch.',
      iconName: 'Database',
    },
    {
      id: 'global-shift',
      title: 'Global Shift to AI Inspection',
      description: 'Textile manufacturing worldwide is automating quality control with machine vision.',
      iconName: 'Zap',
    },
    {
      id: 'china-moved',
      title: 'China Has Already Moved',
      description: 'Competing manufacturing hubs are already deploying automated inspection at scale.',
      iconName: 'Globe',
    },
    {
      id: 'rmg-pillar',
      title: 'RMG Is a National Pillar',
      description: "Ready-made garments are one of Bangladesh's largest export and employment sectors.",
      iconName: 'ShieldAlert',
    },
    {
      id: 'smart-manufacturing',
      title: 'Smart Manufacturing Is Required',
      description: 'To keep global buyers, Bangladesh must adopt AI-driven inspection at pace.',
      iconName: 'Cpu',
    },
  ] as ProblemItem[],

  // AboutSection dataset
  aboutComparisons: [
    {
      dimension: 'Approach',
      conventional: 'Replace',
      conventionalDetail: 'Replace the complete inspection machine outright',
      fabins: 'Upgrade',
      fabinsDetail: 'Upgrade the existing inspection machine as a retrofit',
    },
    {
      dimension: 'Investment',
      conventional: 'High Capital',
      conventionalDetail: 'New machine purchased outright at high foreign cost',
      fabins: 'Low-Cost Retrofit',
      fabinsDetail: 'Low-cost retrofit integration into existing mill hardware',
    },
    {
      dimension: 'Installation',
      conventional: 'Long Downtime',
      conventionalDetail: 'Long changeover and extended factory commissioning',
      fabins: 'Fast Deployment',
      fabinsDetail: 'Fast deployment with minimal production disruption',
    },
    {
      dimension: 'Support & Fit',
      conventional: 'Vendor-Dependent',
      conventionalDetail: 'Overseas service with high barrier for mid-sized mills',
      fabins: 'Locally Engineered',
      fabinsDetail: 'Locally engineered & supported for local fabrics and specs',
    },
  ] as AboutComparison[],

  // SystemSection datasets
  pipelineSteps: [
    {
      stepNumber: 1,
      title: 'Camera Captures',
      shortTitle: 'Capture',
      description: 'High-speed line-scan camera captures the full fabric width as it moves.',
    },
    {
      stepNumber: 2,
      title: 'Image Acquisition',
      shortTitle: 'Acquisition',
      description: 'Rotary encoder triggers every image line from actual fabric travel for precise sync.',
    },
    {
      stepNumber: 3,
      title: 'AI Defect Detection',
      shortTitle: 'Detection',
      description: 'Deep learning vision model resolves sub-millimeter defects on moving fabric in real time.',
    },
    {
      stepNumber: 4,
      title: 'Classify & Measure (mm)',
      shortTitle: 'Classification',
      description: 'Distinguishes holes, joints, oil spots, and measures exact physical size in millimeters.',
    },
    {
      stepNumber: 5,
      title: 'Four-Point Grading',
      shortTitle: 'Grading',
      description: 'Applies Four-Point penalty rules automatically, including fixed hole penalty overrides.',
    },
    {
      stepNumber: 6,
      title: 'Report & Dashboard',
      shortTitle: 'Reporting',
      description: "Issues mill's own official inspection report format, signed and ready for sign-off.",
    },
  ] as SystemPipelineStep[],

  hardwarePillars: [
    {
      id: 'camera',
      title: 'Line-Scan Camera',
      headline: '8192px Industrial Color Sensor',
      spec: '8192px Line Rate',
      description: 'Industrial high-resolution line-scan camera capturing the full fabric width with sub-millimeter optical clarity per line.',
    },
    {
      id: 'encoder',
      title: 'Lens & Encoder',
      headline: 'Encoder-Triggered Sync',
      spec: 'Rotary Hardware Pulse',
      description: 'Calibrated optics paired with a rotary hardware encoder, locking capture geometry to actual fabric speed regardless of conveyor variance.',
    },
    {
      id: 'lighting',
      title: 'Lighting & Conveyor',
      headline: 'Controlled Illumination Rig',
      spec: 'Uniform High-CRI LED',
      description: 'Custom-designed uniform lighting assembly over a continuous-motion fabric transport rig, eliminating shadow artifacts.',
    },
    {
      id: 'software',
      title: 'AI Software & Dashboard',
      headline: 'Browser Operator Interface',
      spec: 'Real-Time Edge Pipeline',
      description: 'Detection, grading, and reporting pipeline with an intuitive browser-based operator dashboard for live feeds and report downloads.',
    },
  ] as SystemHardwarePillar[],

  // StandardsSection datasets
  standardsRules: [
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
  ] as StandardsRule[],

  standardsDefects: [
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
  ] as StandardsDefectExplanation[],
}

export const fabinsSystemData = FABINS_SYSTEM_DATA
