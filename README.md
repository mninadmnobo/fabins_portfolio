# ⚡ FABINS — Official Product Portfolio Web Application

An enterprise-grade, high-performance product portfolio for **FABINS** (*AI-Based Automated Fabric Defect Inspection System*), built for **Saturn Textiles Limited R&D**.

This repository contains the standalone product web application showcasing the technical feasibility, prototype hardware specifications, live production roll R-001 demonstration metrics, Four-Point inspection report engine, and commercial retrofit roadmap.

---

## 🎨 Design & Aesthetic Theme

- **Theme**: Ultra-Tech Cyber Sapphire & Electric Cyan (`#00F0FF`, `#2563EB`, `#10B981` on Obsidian `#030712`).
- **Typography**: Industrial Monospace headers paired with clean Sans-Serif body copy.
- **Glassmorphism & Motion**: High-contrast glow cards, interactive Four-Point report simulator, and smooth scroll entrance animations (`once: false`).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Project Structure

```
fabins_portfolio/
├── app/
│   ├── globals.css         # Cyber-grid overlay & Electric Cyan theme tokens
│   ├── layout.tsx          # Root layout & SEO metadata
│   └── page.tsx            # Full product landing page with interactive modals
├── components/
│   ├── layout/             # Navbar, Footer, PageShell
│   ├── ui/                 # Badge, ComparisonTable, LeaderDetails, ReportSimulatorModal
│   └── sections/           # Hero, Problem, WhyFabins, Pipeline, Hardware,
│                           # RollDemonstration, DefectGallery, Roadmap, HonestPosition,
│                           # DevelopmentTeam, DeployFabins
├── lib/
│   ├── data/
│   │   ├── fabins-system.ts # Complete single source of truth for FABINS system dataset
│   │   └── innovators.ts   # Innovators & Engineering Team single source of truth
│   ├── animations.ts       # Shared Framer Motion scroll entrance presets
│   └── utils.ts            # Class merging & utility functions
```

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   pnpm install
   # or npm install
   ```

2. **Run Development Server**:
   ```bash
   pnpm dev
   # or npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

---

## 👥 Development Team

- **Md. Rahinur Rahman** — Lead AI Systems Engineer (*Dept. of EEE, BUET Graduate*)
- **Mohammad Ninad Mahmud Nobo** — Lead AI Software Engineer (*Dept. of CSE, BUET Graduate*)
