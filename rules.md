# rules.md
> Engineering standards, coding conventions, error guidelines, and AI boundaries

---

## 1. WHAT TO USE (APPROVED PATTERNS)

* **Architecture:** Next.js 14 App Router with React Server Components (`RSC`) for page shells and Client Components (`"use client"`) isolated strictly to interactive leaves (search inputs, filter bars, view toggles).
* **Styling Strategy:** Tailwind CSS utility classes using custom dark design tokens (`bg-[#09090b]`, `border-white/10`, `text-white`, `text-zinc-400`).
* **Type Safety:** 100% strict TypeScript types for all component props, API request/response objects, and state parameters. Zero usage of `any`.
* **Component Modularity:** Single Responsibility Principle (SRP)—keep component files under 200 lines, cleanly separating UI presentation from data fetching logic.
* **Optimistic Mutations:** Immediate UI state feedback for user upvotes and bookmarks with asynchronous background API sync.

---

## 2. WHAT TO AVOID (ANTI-PATTERNS)

* **DO NOT** break or alter the AI Orbit visual identity (no bright/white background sections or unstyled borders).
* **DO NOT** introduce bloated UI component libraries (such as heavy Bootstrap or Material UI packages) that mess with Tailwind build bundles.
* **DO NOT** execute un-debounced search state updates on every keypress without controlling re-renders.
* **DO NOT** use inline style objects (`style={{ ... }}`) when Tailwind utility classes are available.
* **DO NOT** hardcode API origin strings (`http://localhost:3000`); use relative routes (`/api/tools`).

---

## 3. LIBRARIES & DEPENDENCIES

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `^14.2.15` | Core App Router framework |
| `react` / `react-dom` | `^18.3.1` | UI rendering engine |
| `typescript` | `^5.6.3` | Type validation & static analysis |
| `tailwindcss` | `^3.4.14` | CSS utility compiler |
| `lucide-react` | `^0.453.0` | Minimalist UI vector icons |
| `clsx` / `tailwind-merge` | `^2.5.4` | Safe class name merger utility (`cn()`) |

---

## 4. ERROR HANDLING & RESILIENCE

* **Graceful API Failures:** API routes return standardized JSON error messages (`{ error: 'Resource not found' }`) with appropriate HTTP status codes (404, 500).
* **Media Fallbacks:** Missing domain favicons fall back automatically to SVG vector icons (`Cpu`) without throwing image load errors in the browser console.
* **Empty Search States:** Display informative empty state screens with a 1-click "Reset All Filters" CTA when zero tools match search queries.

---

## 5. BOUNDARIES OF AI

* **Accurate Tech Metadata:** AI dummy data entries must reflect real software engineering products (e.g. ChatGPT, Claude, Cursor, v0.dev, Perplexity) with accurate API and pricing attributes.
* **Zero Hallucinated Imports:** Every module import must reference actual installed packages or verified local paths.

---

## 6. GENERAL ENGINEERING CONVENTIONS

* **Naming:** Component files in PascalCase (`ToolCardGrid.tsx`), utilities in camelCase (`formatNumber.ts`), types in PascalCase (`ToolItem`).
* **Format:** 2-space indentation, semicolons omitted, clean JSX formatting.
* **Performance:** Debounced search queries, optimized web fonts, zero layout shifts (`CLS = 0`).
