# design.md
> Visual design system & UI/UX tokens matching AI Orbit

---

## 1. UI/UX PHILOSOPHY

* **Visual Anchor:** Exact visual match to [AI Orbit](https://aiorbit.club/tools).
* **Senior Developer Standard:** Clean, high-contrast, dark-first UI optimized for high density information scanning with zero visual clutter.
* **Layout Geometry:**
  * Container constraint: `max-w-7xl` with horizontal padding (`px-4 sm:px-6 lg:px-8`).
  * CSS Grid responsive layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5`).
* **Responsiveness:** Mobile-first architecture adapting seamlessly from 375px mobile viewports to ultra-wide displays.

---

## 2. COLOR PALETTE & DESIGN TOKENS

The color palette strictly adheres to the AI Orbit dark design system:

| Token Name | Class / Hex | Visual Application |
| :--- | :--- | :--- |
| **Canvas Background** | `bg-[#09090b]` / `#09090b` | Dark slate main page background |
| **Card Surface** | `bg-zinc-900/60` / `#121215` | Elevated dark card container background |
| **Normal Border** | `border-white/10` | Subtle subtle card and input borders |
| **Hover Border** | `border-zinc-700` | Highlighted border on card hover state |
| **Primary Text** | `text-white` / `#FFFFFF` | Headlines, tool titles, and primary CTAs |
| **Secondary Text** | `text-zinc-400` / `#A1A1AA` | Subtitles, descriptions, metadata |
| **Muted Text** | `text-zinc-500` / `#71717A` | Labels, footers, and fallback text |
| **Free Tier Badge** | `text-emerald-400` / `bg-emerald-500/10` | Free pricing tier indicator |
| **Freemium Badge** | `text-blue-400` / `bg-blue-500/10` | Freemium pricing tier indicator |
| **Paid Tier Badge** | `text-amber-400` / `bg-amber-500/10` | Paid tier indicator |

---

## 3. TYPOGRAPHY HIERARCHY

* **Font Stack:** Inter / System Sans (`font-sans`)
* **H1 (Hero Heading):** `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white`
* **H2 (Section Heading):** `text-lg sm:text-xl font-bold text-white`
* **Card Titles:** `text-base font-semibold text-white group-hover:text-zinc-200`
* **Body / Descriptions:** `text-xs text-zinc-400 leading-relaxed`

---

## 4. LOCAL PREFERENCE STORAGE

The client application persists user preferences in `localStorage`:
1. **Layout View:** Choice between `Grid View` and `List / Table View`.
2. **Bookmarked Tools:** Array of saved tool IDs.
3. **Upvoted Tools:** Array of upvoted tool IDs preventing duplicate votes in session.
