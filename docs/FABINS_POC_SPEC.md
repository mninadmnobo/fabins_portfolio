# 📄 FABINS — Proof of Concept Technical Specification

## Home & System Summary
FABINS (Automated Fabric Inspection System) is an AI-based machine-vision system developed by **Saturn Textiles Limited R&D** that replaces manual fabric grading with an automated optical pipeline.

---

## Key Hardware Components
1. **Line-Scan Camera**: 8192px industrial color line rate sensor imaging full fabric width per line.
2. **Rotary Encoder & Lens**: Calibrated optics with encoder-triggered line capture locking geometry to actual fabric travel speed.
3. **Lighting & Conveyor Rig**: Uniform high-CRI illumination over a continuous-motion fabric transport assembly.
4. **Edge Computing Node & Web Dashboard**: Real-time YOLOv8 defect detection, Four-Point penalty calculation, and browser-based inspection report generator.

---

## Live Demonstration Run (Roll R-001)
- **Context**: Live inspection run on Roll R-001 at Saturn Textiles Limited against a Tommy Hilfiger order.
- **Defects Sized & Resolved**: 36 defects across 3 defect categories (Holes, Joints, Oil Spots).
- **Smallest Defect Sized**: 0.7mm resolved in continuous motion.
- **Penalty Points**: 75 total points computed under ASTM D5430 Four-Point scoring rules.

---

## Retrofit Value Proposition
- **Strategy**: Upgrade existing mill inspection frames as a low-cost retrofit rather than importing expensive foreign machines.
- **Target Audience**: Bangladeshi textile mills and garment export manufacturers.
