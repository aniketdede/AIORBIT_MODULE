# architecture.md
> High-level architecture, module design, and structural blueprints

---

## 1. ARCHITECTURE & SYSTEM DESIGN

### System Overview
The **AI Orbit Tools Module** is architected as an enterprise-grade full-stack web application leveraging Next.js 14 App Router, React Server Components (RSC), and client-side interactive state mutators. It strictly implements the high-contrast dark theme visual language of [AI Orbit](https://aiorbit.club/tools).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT PRESENTATION LAYER                       │
│  • React Server Components (RSC) + Selective Hydration Client Hooks    │
│  • Tailwind CSS Design Tokens (#09090b canvas, border-white/10)        │
│  • Sub-10ms UI Interactions (Debounced Search, Grid/Table Switcher)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     REST API & ROUTE HANDLER LAYER                     │
│  • Type-Safe Route Handlers (/api/tools, /api/tools/[slug])            │
│  • Query Validation & Dynamic In-Memory Filtering/Sorting Engine       │
│  • Optimistic State Mutation & Session Persistence                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         PERSISTENT DATA STORE                          │
│  • Structured AI Tool Data Repository (20+ Verified Entries)            │
│  • Local Storage Client State Sync (Bookmarks, Upvotes, Layout Mode)   │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Engineering Patterns
1. **Selective Client Hydration:** Page shell and header render on server for instant LCP (Largest Contentful Paint), while interactive state filters hydrate seamlessly on the client.
2. **Optimistic UI Updates:** Upvote and bookmark actions update local component state immediately before making async backend API requests, delivering 0ms perceived user latency.
3. **Resilient Fallbacks:** Image load errors on domain favicons gracefully degrade to SVG tech icons (`Cpu` / `Sparkles`) without breaking component layouts.

---

## 2. FOLDER & FILE STRUCTURE

```
/home/user/
├── PRD.md                       # Product Requirement Document (Senior Dev Specs)
├── architecture.md              # System Design & Module Architecture
├── rules.md                     # Engineering Standards, Conventions & Limits
├── phases.doc.md                # Development Roadmap & Execution Flow
├── design.md                    # Visual Design System & AI Orbit Tokens
├── memory.md                    # Project Memory & Progress Log
├── package.json                 # Core Dependencies & Build Scripts
├── next.config.mjs              # Next.js Server & Remote Image Config
├── tailwind.config.ts           # Tailwind Design Tokens Setup
├── tsconfig.json                # Strict TypeScript Configuration
├── src/
│   ├── app/                     # App Router Routes & API Endpoints
│   │   ├── layout.tsx           # Global Root Layout (Navbar & Footer)
│   │   ├── page.tsx             # Root Redirect -> /tools
│   │   ├── globals.css          # Tailwind Directives & Custom Scrollbars
│   │   ├── tools/
│   │   │   ├── page.tsx         # AI Tools Directory (Listing Module)
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Tool Detail Spec Hub
│   │   └── api/
│   │       └── tools/
│   │           ├── route.ts     # GET /api/tools (Search, Filter, Sort)
│   │           └── [slug]/
│   │               └── route.ts # GET & POST /api/tools/[slug] (Detail & Upvote)
│   ├── components/              # Modular Production UI Components
│   │   ├── Navbar.tsx           # Navigation Header with Search Trigger
│   │   ├── Footer.tsx           # Minimalist AI Orbit Footer
│   │   ├── SearchHeader.tsx     # Hero Search & Quick Tag Pills
│   │   ├── CategoryFilters.tsx # Category Pills & View Mode Toggle
│   │   ├── ToolCardGrid.tsx     # Grid View Rendering Component
│   │   ├── ToolCardList.tsx     # Compact Table View Component
│   │   ├── ToolDetailHero.tsx   # Product Banner & CTA Hub
│   │   ├── ToolSpecsGrid.tsx    # Technical Specifications Grid
│   │   ├── RelatedTools.tsx     # Related Stack Recommendations
│   │   └── SkeletonLoader.tsx   # Loading Skeleton Components
│   ├── lib/                     # Core Business Logic & Helpers
│   │   ├── utils.ts             # Class Mergers & Formatting Utilities
│   │   └── mockData.ts          # 20+ Real AI Tool Data Records
│   └── types/                   # TypeScript Interfaces & Contracts
│       └── tool.ts              # ToolItem, Category, Pricing & API Types
```

---

## 3. PRODUCTION TECH STACK

| Technology | Role | Senior Developer Justification |
| :--- | :--- | :--- |
| **Next.js 14** | Full-Stack Framework | App Router, SSR, and API route handler efficiency |
| **TypeScript 5** | Language Contract | Strict static typing across components, API routes, and data models |
| **Tailwind CSS 3.4** | Utility Styling | High-performance CSS output matching AI Orbit dark tokens |
| **Lucide React** | Icon System | Lightweight vector icons with zero render overhead |
| **Framer Motion** | Micro-Animations | Smooth view mode transitions and state pill toggles |
