# Landing Quick-Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 8 high-return, low-risk improvements to the Shoppalyzer landing page across performance, conversion, accessibility, and visual polish — without architectural rewrites.

**Architecture:** Pure Vite + React 18 SPA. Changes are localized: provider wrapping (App.tsx), route/component lazy-loading (React.lazy + Suspense), a small new sticky-CTA component, an IntersectionObserver pause in the hero animation, font-payload trimming in index.html, and a social OG image asset. No backend, no new top-level deps.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind, framer-motion, react-router-dom 6, lucide-react.

**Verification model:** This repo has no unit-test suite. Each task is verified by (a) `npm run build` succeeding (type-check + bundle), (b) visual check on the running dev server at http://localhost:8080, and where relevant (c) a Lighthouse pass via the chrome-devtools MCP. **No commits happen until the user verifies the whole batch on localhost** (per user instruction this session).

**Worktree note:** Do NOT create a git worktree. The dev server runs against the working directory and the user is previewing live; a worktree would detach the preview. Work in-place.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/App.tsx` | Modify | Wrap app in `MotionConfig reducedMotion="user"` (Task 1, done); add `React.lazy` + `Suspense` for non-landing routes (Task 4) |
| `src/pages/Index.tsx` | Modify | Lazy-load `HeroVariant2`/`HeroVariant3`; mount `StickyCTA` (Tasks 2, 5) |
| `index.html` | Modify | Trim Google Fonts weights (Task 3); add proper OG image meta (Task 8) |
| `src/components/landing/StickyCTA.tsx` | Create | Scroll-triggered persistent primary CTA (Task 5) |
| `src/components/landing/ServiceFlowAnimation.tsx` | Modify | Pause the loop when offscreen via IntersectionObserver (Task 6) |
| Various landing sections | Modify (conditional) | Add `min-height` only where Lighthouse shows CLS (Task 7) |
| `public/og-card.png` | Create | 1200×630 social share image (Task 8) |

---

## Task 1: Global reduced-motion respect (a11y) — ALREADY DONE

**Files:**
- Modify: `src/App.tsx`

This task was applied before the plan was written. Verify it matches the intended state.

- [x] **Step 1: Import MotionConfig**

`src/App.tsx` should import:
```tsx
import { MotionConfig } from "framer-motion";
```

- [x] **Step 2: Wrap the tree**

The `App` component wraps everything inside `<QueryClientProvider>` with `<MotionConfig reducedMotion="user"> ... </MotionConfig>`. With `"user"`, every framer-motion component automatically drops transform/layout animations (keeps opacity/color) when the OS has "Reduce motion" enabled.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds, no TS errors.

- [ ] **Step 4: Verify behavior**

In OS settings enable "Reduce motion" (Windows: Settings → Accessibility → Visual effects → Animation effects OFF), reload http://localhost:8080. Expected: scroll-in sections appear without the upward slide (opacity-only). Disable again to confirm motion returns.

---

## Task 2: Lazy-load unused hero variants (performance)

**Files:**
- Modify: `src/pages/Index.tsx`

`HeroVariant2` and `HeroVariant3` are only reachable via `?v=2` / `?v=3` but are eagerly imported, bloating the initial bundle for the 99% who see Variant1.

- [ ] **Step 1: Replace eager imports with lazy**

In `src/pages/Index.tsx`, change the top imports. Remove:
```tsx
import { HeroVariant1 } from '@/components/landing/HeroVariant1';
import { HeroVariant2 } from '@/components/landing/HeroVariant2';
import { HeroVariant3 } from '@/components/landing/HeroVariant3';
```
Replace with (keep Variant1 eager — it's the LCP element; lazy only the rare alternates):
```tsx
import { lazy, Suspense } from 'react';
import { HeroVariant1 } from '@/components/landing/HeroVariant1';
const HeroVariant2 = lazy(() => import('@/components/landing/HeroVariant2').then(m => ({ default: m.HeroVariant2 })));
const HeroVariant3 = lazy(() => import('@/components/landing/HeroVariant3').then(m => ({ default: m.HeroVariant3 })));
```

- [ ] **Step 2: Wrap the variant switch in Suspense**

Change the hero render line:
```tsx
{variant === '2' ? <HeroVariant2 /> : variant === '3' ? <HeroVariant3 /> : <HeroVariant1 />}
```
to:
```tsx
{variant === '2' || variant === '3' ? (
  <Suspense fallback={<div className="min-h-[600px]" />}>
    {variant === '2' ? <HeroVariant2 /> : <HeroVariant3 />}
  </Suspense>
) : (
  <HeroVariant1 />
)}
```

- [ ] **Step 3: Verify build + chunks**

Run: `npm run build`
Expected: build succeeds; output shows separate `HeroVariant2`/`HeroVariant3` chunks emitted (not in the main entry chunk).

- [ ] **Step 4: Verify visually**

Load http://localhost:8080/ (Variant1 unchanged) and http://localhost:8080/?v=2 (Variant2 still renders after a brief Suspense). No visual regression on default.

---

## Task 3: Trim font payload (performance / LCP)

**Files:**
- Modify: `index.html`

Confirmed usage: Geist `300` (font-light) is unused → drop. Geist `800` (font-extrabold) is used → keep. Geist Mono `400/500` used → keep. Newsreader is effectively unused (`.font-editorial` defined in index.css but never applied to an element; only one decorative SVG italic in HeroDecoration) → reduce to `400` + `400 italic`.

- [ ] **Step 1: Replace the Google Fonts stylesheet href**

In `index.html`, replace the existing fonts `<link rel="stylesheet" href="...">` URL:
```
https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&display=swap
```
with:
```
https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap
```
(Drops Geist 300 and Newsreader 300/500/600/700 — keeps everything actually rendered.)

- [ ] **Step 2: Verify no visual regression**

Reload http://localhost:8080. Headings (font-extrabold/bold), body (400/500), and any mono/price text must look identical. Scan hero, benefits, pricing, footer, and one legal page (`/regulamin`) where `font-extrabold` is used.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds (index.html is static; this just confirms nothing else broke).

---

## Task 4: Route-level code-splitting (performance — biggest bundle win)

**Files:**
- Modify: `src/App.tsx`

`SampleReport` pulls in `jspdf` + `jspdf-autotable` + `html2canvas` + `recharts` (hundreds of KB) into the main bundle even though it's a separate route. Lazy-load all non-landing routes; keep `Index` eager (it's the entry/LCP page).

- [ ] **Step 1: Convert page imports to lazy**

In `src/App.tsx`, keep the eager Index import:
```tsx
import Index from "./pages/Index";
```
Replace the other five page imports:
```tsx
import SampleReport from "./pages/SampleReport";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import PolitykaCookies from "./pages/PolitykaCookies";
import Regulamin from "./pages/Regulamin";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound";
```
with:
```tsx
import { lazy, Suspense } from "react";
const SampleReport = lazy(() => import("./pages/SampleReport"));
const PolitykaPrywatnosci = lazy(() => import("./pages/PolitykaPrywatnosci"));
const PolitykaCookies = lazy(() => import("./pages/PolitykaCookies"));
const Regulamin = lazy(() => import("./pages/Regulamin"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const NotFound = lazy(() => import("./pages/NotFound"));
```
(These pages use `export default`, so no `.then` unwrap needed.)

- [ ] **Step 2: Wrap Routes in Suspense**

Wrap the `<Routes>...</Routes>` block in a `<Suspense>` with a minimal fallback:
```tsx
<Suspense fallback={<div className="min-h-screen bg-background" />}>
  <Routes>
    {/* ...existing routes unchanged... */}
  </Routes>
</Suspense>
```

- [ ] **Step 3: Verify build + chunks**

Run: `npm run build`
Expected: succeeds; build output shows separate chunks for `SampleReport` (and the heavy `jspdf`/`html2canvas`/`recharts` vendor split) no longer in the main entry chunk. Note the reduced main chunk size.

- [ ] **Step 4: Verify navigation**

On http://localhost:8080: click "Zobacz przykładowy raport" → `/sample-report` loads (brief blank fallback, then renders). Visit `/regulamin`, `/kontakt`, and a 404 path. All render correctly.

---

## Task 5: Sticky scroll CTA (conversion)

**Files:**
- Create: `src/components/landing/StickyCTA.tsx`
- Modify: `src/pages/Index.tsx`

A persistent primary CTA that slides in once the hero scrolls out of view, and hides while the FinalCTA section is on screen (to avoid a double CTA). Reuses the same `APP_SIGNUP_URL` and copy as the hero/navbar.

- [ ] **Step 1: Create the component**

Create `src/components/landing/StickyCTA.tsx`:
```tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { APP_SIGNUP_URL } from '@/lib/app-links';

/**
 * Persistent primary CTA. Appears after the user scrolls past ~70% of the
 * first viewport, and hides again when the bottom FinalCTA section is visible
 * (so we never show two competing CTAs at once).
 */
export const StickyCTA = () => {
  const [show, setShow] = useState(false);
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };

  useEffect(() => {
    const finalCta = document.getElementById('final-cta');

    let finalVisible = false;
    let observer: IntersectionObserver | undefined;
    if (finalCta) {
      observer = new IntersectionObserver(
        ([entry]) => { finalVisible = entry.isIntersecting; update(); },
        { threshold: 0 },
      );
      observer.observe(finalCta);
    }

    const update = () => {
      const scrolledEnough = window.scrollY > window.innerHeight * 0.7;
      setShow(scrolledEnough && !finalVisible);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pointer-events-none sm:px-6 sm:pb-5"
        >
          <div className="container pointer-events-auto">
            <div className="
              flex items-center justify-between gap-4
              rounded-2xl bg-brand-navy text-white shadow-strong
              ring-1 ring-white/10
              px-4 py-3 sm:px-6 sm:py-4
            ">
              <span className="hidden sm:block text-sm font-medium text-white/85">
                Zacznij analizować Allegro już dziś — pierwsza analiza za darmo.
              </span>
              <button
                onClick={goToSignup}
                className="
                  group inline-flex items-center justify-center gap-2 w-full sm:w-auto
                  bg-accent-brand text-accent-brand-foreground
                  font-semibold text-sm px-5 py-3 rounded-xl
                  shadow-medium hover:bg-accent-brand-hover
                  transition-colors
                "
              >
                Wypróbuj za darmo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

- [ ] **Step 2: Give FinalCTA an id anchor**

In `src/components/landing/FinalCTA.tsx`, add `id="final-cta"` to the root `<section ...>` element so the observer can target it.

- [ ] **Step 3: Mount StickyCTA in Index**

In `src/pages/Index.tsx`, import and render it once after `<FinalCTA />`:
```tsx
import { StickyCTA } from '@/components/landing/StickyCTA';
```
```tsx
      <FinalCTA />
      <StickyCTA />
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Verify behavior**

On http://localhost:8080: at top → no sticky bar. Scroll past the hero → bar slides up from bottom. Scroll to the FinalCTA section → bar disappears. Click "Wypróbuj za darmo" → navigates to signup URL. Check mobile width (390px): full-width button, label hidden. With OS reduced-motion on, it should fade without the spring slide.

---

## Task 6: Pause hero animation when offscreen (performance / INP)

**Files:**
- Modify: `src/components/landing/ServiceFlowAnimation.tsx`

The phase loop (`PHASE_MS` = 9–12s each) runs continuously even after the hero scrolls away, burning CPU and hurting INP/battery. Gate the phase-advance timers on an `isVisible` flag driven by IntersectionObserver on the component root.

- [ ] **Step 1: Add a root ref + visibility state**

In `ServiceFlowAnimation.tsx`, in the main component add:
```tsx
const rootRef = useRef<HTMLDivElement>(null);
const [isVisible, setIsVisible] = useState(true);

useEffect(() => {
  const el = rootRef.current;
  if (!el) return;
  const io = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 },
  );
  io.observe(el);
  return () => io.disconnect();
}, []);
```
Attach `ref={rootRef}` to the component's outermost wrapper element.

- [ ] **Step 2: Gate the phase timer on visibility**

Find the `useEffect` that advances phases (the one using `PHASE_MS` to set a timeout/interval for the current phase). Add `isVisible` to its dependency array and early-return when not visible so no new timer is scheduled:
```tsx
useEffect(() => {
  if (!isVisible) return;            // pause loop while offscreen
  // ...existing phase-advance timer logic unchanged...
}, [/* ...existing deps..., */ isVisible]);
```
(Keep the existing cleanup that clears the timer — pausing simply means not rescheduling while hidden; it resumes from the current phase when the hero is back in view.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds, no exhaustive-deps lint error (add `isVisible` properly).

- [ ] **Step 4: Verify behavior**

On http://localhost:8080: hero animation cycles normally while in view. Scroll down so the hero leaves the viewport, wait ~15s, scroll back — it should resume cleanly (no crash, no stuck state). Optional: chrome-devtools performance trace shows reduced scripting while scrolled away.

---

## Task 7: Measure & fix CLS (performance)

**Files:**
- Modify (conditional): landing section files where Lighthouse attributes shift — likely `ServiceFlowAnimation.tsx` wrapper and `SocialProofBar.tsx`.

Do not guess. Measure first, then add `min-height` reservations only where a shift is reported.

- [ ] **Step 1: Run Lighthouse on the running dev server**

Use the chrome-devtools MCP: navigate to http://localhost:8080 and run a Lighthouse audit (or `performance_start_trace` + reload). Record the CLS score and the specific elements listed under "Avoid large layout shifts".

- [ ] **Step 2: Decide**

If CLS ≤ 0.1 and no elements are flagged → mark this task done with a note "CLS already within target, no change needed." Skip remaining steps.
If elements are flagged → proceed.

- [ ] **Step 3: Reserve space for flagged elements**

For each flagged element add an explicit `min-height` (mobile + desktop) sized to its rendered height so late content/fonts/images don't push layout. Example pattern for the hero animation wrapper:
```tsx
<div ref={rootRef} className="... min-h-[420px] lg:min-h-[520px]">
```
And for the social proof bar section, reserve its row height if it shifts on font load:
```tsx
<section className="border-y border-border bg-surface-muted/40 min-h-[72px]">
```
Use the actual measured heights from Step 1, not these placeholders.

- [ ] **Step 4: Re-measure**

Re-run Lighthouse. Expected: CLS ≤ 0.1. Confirm no visual regression at 390px and desktop.

---

## Task 8: Proper social share image (SEO / social)

**Files:**
- Create: `public/og-card.png` (1200×630)
- Modify: `index.html`

`og:image` currently points at `favicon-512.png` (square icon) — link previews on LinkedIn/Slack/Facebook look broken. Provide a real 1200×630 card.

- [ ] **Step 1: Produce the 1200×630 card**

Create `public/og-card.png` at exactly 1200×630. Use the Photopea MCP (or Nakkas SVG → export) to compose: brand-navy background (`#1E4D72`), the Shoppalyzer logo/mark, the headline "Twój automatyczny analityk Allegro", and an accent-amber (`#E8843A`) detail. Keep key content within a centered safe area (~1080×540). Export as PNG to `public/og-card.png`. **Confirm the visual with the user before finalizing** (this is the one task with a subjective asset).

- [ ] **Step 2: Update meta tags**

In `index.html`, update the OG block and add Twitter card tags + absolute URL:
```html
<meta property="og:title" content="Shoppalyzer — Zarabiaj więcej na Allegro" />
<meta property="og:description" content="Codziennie tracisz marżę, bo nie wiesz gdzie jej szukać. Shoppalyzer to zmienia." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://shoppalyzer-pre-scraper.vercel.app/" />
<meta property="og:image" content="https://shoppalyzer-pre-scraper.vercel.app/og-card.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Shoppalyzer — Zarabiaj więcej na Allegro" />
<meta name="twitter:description" content="Codziennie tracisz marżę, bo nie wiesz gdzie jej szukać. Shoppalyzer to zmienia." />
<meta name="twitter:image" content="https://shoppalyzer-pre-scraper.vercel.app/og-card.png" />
```

- [ ] **Step 3: Verify build + asset**

Run: `npm run build`
Expected: succeeds; `og-card.png` copied into `dist/`. Open http://localhost:8080/og-card.png to confirm the image serves. (Real social-preview rendering can only be confirmed after deploy.)

---

## Self-Review

- **Spec coverage:** All 8 approved quick-wins map to Tasks 1–8 respectively. ✔
- **Placeholder scan:** Task 7 uses `min-h-[420px]` etc. as *examples* explicitly labeled "use actual measured heights" — this is intentional because the values depend on a measurement step, not an unfilled placeholder. All other tasks contain exact code. ✔
- **Type/name consistency:** `StickyCTA` (Task 5) created and imported under the same name; `id="final-cta"` set in FinalCTA and queried in StickyCTA; `rootRef`/`isVisible` introduced and reused consistently in Task 6. ✔
- **Scope:** Single landing-page surface, no independent subsystems — one plan is appropriate. ✔

## Commit strategy (after user verifies on localhost)

Per user instruction, **no commits until the full batch is verified on localhost.** Then commit per logical change:
1. `feat(a11y): respect prefers-reduced-motion globally via MotionConfig`
2. `perf(landing): lazy-load unused hero variants`
3. `perf(landing): trim unused Google Font weights`
4. `perf(app): code-split non-landing routes`
5. `feat(landing): add scroll-triggered sticky CTA`
6. `perf(hero): pause ServiceFlowAnimation when offscreen`
7. `perf(landing): reserve space to fix CLS` (only if Task 7 changed anything)
8. `feat(seo): add proper 1200x630 OG share image`

Push to `main` only on explicit "push" from the user.
