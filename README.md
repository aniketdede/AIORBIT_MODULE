# AI Orbit — AI Tools & Product Detail Hub Module

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-Particle_Canvas-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=flat-square)](https://github.com/aniketdede/AIORBIT_MODULE)

A full-stack, enterprise-grade **AI Tools Directory & Product Detail Hub** module engineered matching the exact dark-mode design system and visual identity of [AI Orbit](https://aiorbit.club/tools). Built with Next.js 14 App Router, React Server Components (RSC), TypeScript, Tailwind CSS, Three.js, and REST API Route Handlers.

---

##  Key Features

* **Sub-10ms Instant Search & Hotkeys (`⌘K`)**: Debounced real-time query engine matching tool names, descriptions, tasks, and developers with zero layout shift (`CLS = 0`).
* **Multi-Category Query Engine**: 12+ tech verticals (*All, Coding, Chatbots, Image Generation, Video, Audio, Productivity, Marketing, Business, Education, Agents, Workflow Automation*).
* **Quick Filter Shortcuts**: One-click boolean filter pills for *Trending, Popular, New, Free, Top Rated*.
* **Dual View Mode Switcher**:
  * **Grid View**: High-density dark cards featuring real domain favicons, category badges, pricing tiers (*Free, Freemium, Paid*), ratings, upvote counters, and bookmark toggles.
  * **Table View**: Compact engineer-focused data grid matching `aiorbit.club` table layout (`TOOL`, `DESCRIPTION`, `TASK`, `PRICING`, `API`, `OPEN-SOURCE`, `RELEASED`, `ACTIONS`).
* **Dynamic Product Detail Hub (`/tools/[slug]`)**: Deep-dive technical specifications (API availability, open-source status, release date, developer, pros/cons breakdown, and category-matched related tool recommendations).
* **Optimistic UI & Memory Persistence**: Real-time upvote and bookmark state mutators backed by client `localStorage` and background API synchronization.
* **Ambient Dark Theme Aesthetics**: Three.js 3D particle surface background (`DottedSurface`) and subtle dark radial ambient gradients.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Server-Side Rendering, Static Generation & Route Handlers |
| **Language** | TypeScript 5 | Strict static typing across components, API routes, and data models |
| **Styling** | Tailwind CSS 3.4 | Dark canvas design tokens (`#09090b`, `border-white/10`) |
| **3D Graphics** | Three.js & `next-themes` | Interactive animated particle background surface |
| **Icons** | Lucide React | Lightweight vector icon set |
| **State Persistence** | React Hooks & `localStorage` | Client view preferences, bookmarks, and upvote session tracking |

---

## 📁 Repository Structure

```
/
├── PRD.md                       # Product Requirement Document
├── architecture.md              # System Architecture & Component Diagrams
├── rules.md                     # Coding Guidelines & Security Standards
├── phases.doc.md                # Development Roadmap & Phase Completion
├── design.md                    # Visual Design System & Color Tokens
├── memory.md                    # Project Execution & State Tracking
├── README.md                    # Comprehensive Project Overview
├── package.json                 # Core Dependencies & Build Scripts
├── next.config.mjs              # Next.js Config
├── tailwind.config.ts           # Tailwind Custom Theme Setup
├── tsconfig.json                # Strict TypeScript Configuration
├── src/
│   ├── app/                     # Next.js App Router Pages & API Routes
│   │   ├── layout.tsx           # Global Root Layout (Navbar & Footer)
│   │   ├── page.tsx             # Root Redirect -> /tools
│   │   ├── globals.css          # Tailwind Directives & Custom Scrollbars
│   │   ├── tools/
│   │   │   ├── page.tsx         # AI Tools Directory (Listing Page)
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Tool Detail Page
│   │   └── api/
│   │       └── tools/
│   │           ├── route.ts     # GET /api/tools (Search, Filter, Sort)
│   │           └── [slug]/
│   │               └── route.ts # GET & POST /api/tools/[slug]
│   ├── components/              # Modular UI Components
│   │   ├── AiOrbitLogo.tsx      # Single-Source Vector Orbital Brand Mark
│   │   ├── Navbar.tsx           # Navigation Header
│   │   ├── Footer.tsx           # Minimal Dark Footer
│   │   ├── SearchHeader.tsx     # Hero Search & Quick Tag Pills
│   │   ├── CategoryFilters.tsx # Category Pills & View Mode Switcher
│   │   ├── ToolCardGrid.tsx     # Grid View Layout Component
│   │   ├── ToolCardList.tsx     # Table View Layout Component
│   │   ├── ToolDetailHero.tsx   # Product Banner & CTA Hub
│   │   ├── ToolSpecsGrid.tsx    # Technical Specifications Grid
│   │   ├── RelatedTools.tsx     # Related Stack Recommendations
│   │   ├── SkeletonLoader.tsx   # Pulse Skeleton Loading Component
│   │   ├── AiOrbitPlatformBanner.tsx # Lower Landing Page Platform Banner
│   │   └── ui/
│   │       └── dotted-surface.tsx # Three.js Animated Background
│   ├── lib/                     # Utilities & Data Repositories
│   │   ├── utils.ts             # Class Mergers & Formatting Helpers
│   │   └── mockData.ts          # 20+ Real AI Tool Data Records
│   └── types/                   # TypeScript Interfaces & Contracts
│       └── tool.ts              # Tool, Category & API Response Types
```

---

## 🚦 Getting Started Locally

### Prerequisites
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/aniketdede/AIORBIT_MODULE.git
cd AIORBIT_MODULE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the live application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📚 Standard Project Documentation Suite

* **[PRD.md](./PRD.md)** — Product Requirement Document & Executive Goals.
* **[architecture.md](./architecture.md)** — System Architecture & Component Interaction Diagrams.
* **[rules.md](./rules.md)** — Engineering Standards, Anti-Patterns, and Guidelines.
* **[phases.doc.md](./phases.doc.md)** — Project Roadmap & Development Phase Breakdown.
* **[design.md](./design.md)** — Color Tokens, Typography, and Design Guidelines.
* **[memory.md](./memory.md)** — Execution Log & Active Context Memory.

---

## 👤 Author

**Aniket Dede**
* **GitHub**: [@aniketdede](https://github.com/aniketdede)
* **Email**: [aniketdede12@gmail.com](mailto:aniketdede12@gmail.com)
* **Role Applied For**: AI Full Stack Developer Internship (*The AI Signal*)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
