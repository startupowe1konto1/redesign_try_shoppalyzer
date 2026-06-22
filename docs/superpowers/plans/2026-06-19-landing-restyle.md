# Landing restyle implementation plan

> **For agentic workers:** This is a visual frontend restyle. There is no test framework and no git in the sandbox, so the usual TDD test step is replaced by visual verification (chrome-devtools MCP screenshots, console check, reduced-motion check) and the commit step is replaced by a localhost review checkpoint. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Restyle all Shoppalyzer landing sections to the approved light-to-dark editorial direction, keeping colors, copy, routes, and the do-not-touch list intact.

**Architecture:** Edit existing React components in `src/components/landing/*` and `src/components/Navbar.tsx` in place, following current Tailwind token patterns. Add two small shared pieces: a one-time branded loading intro and a reusable scroll-reveal helper. Section order and light/dark rhythm are orchestrated in `src/pages/Index.tsx`.

**Tech stack:** Vite, React 18, TypeScript, Tailwind, shadcn/ui, framer-motion, lucide-react. Dev server on localhost:8080 (managed via Claude Preview, config `dev`).

**Spec:** `docs/superpowers/specs/2026-06-19-landing-restyle-design.md`

---

## Verification approach (applies to every task)

Each task ends with the same verification loop instead of unit tests:

1. Save the edit (dev server hot-reloads).
2. chrome-devtools: `navigate_page` to `http://localhost:8080/` (with the IntersectionObserver init-script workaround from project memory so whileInView sections render), `resize_page` to 1440x900, `take_screenshot fullPage:true`, read it.
3. Resize to 390x844 and screenshot again (mobile check, no horizontal scroll).
4. `list_console_messages` or evaluate, confirm no new errors.
5. Spot-check reduced motion by emulating `prefers-reduced-motion: reduce` (navigate with init-script or chrome-devtools emulate) and confirm the page is static and complete.
6. Checkpoint: present screenshots to the user for review before the next task.

Commits are optional. If the user wants rollback safety we can `git init` a local-only repo in the sandbox (no remote, so it can never reach production). Not required.

---

## File structure

- `src/index.css` create: scroll-reveal base styles if needed; refine handoff gradient utilities. Modify existing utilities (remove or gate `tilt-soft`, `animate-breathe` usage at call sites).
- `src/components/landing/LoadingIntro.tsx` create: one-time branded loading overlay.
- `src/hooks/useReveal.ts` create: small IntersectionObserver hook for scroll reveal (or a `<Reveal>` wrapper component).
- `src/components/Navbar.tsx` modify: scroll-aware border and blur, layout tidy.
- `src/components/landing/HeroVariant1.tsx` modify: spacing, eyebrow pill, remove serif, calmer entrance.
- `src/components/landing/ServiceFlowAnimation.tsx` modify: remove `tilt-soft` and `animate-breathe` wrapper classes.
- `src/components/landing/HeroDecoration.tsx` modify: reduce decorative noise to taste.
- `src/components/landing/SocialProofBar.tsx` modify: light refine, keep structure.
- `src/components/landing/BenefitsBento.tsx` modify: left-align heading, remove corner accent, calmer hover.
- `src/components/landing/HowItWorks.tsx` modify: convert to deep-navy dark section, scroll-reveal steps with mini UI.
- `src/components/landing/Pricing.tsx` modify: Starter primary, Pro/Agencja "wkrotce", add-on strip.
- `src/components/landing/Testimonials.tsx` modify: refine cards, mobile carousel/stack.
- `src/components/landing/FAQ.tsx` modify: two-column heading plus accordion.
- `src/components/landing/FinalCTA.tsx` modify: dark refine, climax 2.
- `src/components/landing/Footer.tsx` modify: deep-navy refine.
- `src/components/landing/StickyCTA.tsx` modify: mobile restyle.
- `src/pages/Index.tsx` modify: mount LoadingIntro, confirm section order and light/dark handoffs.

---

## Task 1: Shared foundation (reveal helper + loading intro)

**Files:**
- Create: `src/hooks/useReveal.ts`
- Create: `src/components/landing/LoadingIntro.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Create the reveal hook**

```ts
import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.18, ...opts });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}
```

Note: existing sections already use framer-motion `whileInView`. This hook is for new bespoke reveals (the dark steps). Do not rip out working framer-motion reveals; standardize easing to `[0.16, 1, 0.3, 1]` and `once: true` where they differ.

- [ ] **Step 2: Create LoadingIntro (one-time, reduced-motion safe, session-gated)**

Deep navy overlay with the Shoppalyzer mark and a thin amber progress bar, fades out after about 1.2s. Skips entirely on reduced motion and after first view in a session (sessionStorage), so it never annoys on internal navigation.

```tsx
import { useEffect, useState } from 'react';

export const LoadingIntro = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || sessionStorage.getItem('shp_intro')) { setDone(true); return; }
    sessionStorage.setItem('shp_intro', '1');
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-brand-navy animate-fade-out-late">
      {/* mark + amber progress bar, styled with tokens */}
    </div>
  );
};
```

Add the matching fade-out keyframe and the progress animation in `src/index.css` (`@layer utilities`). Mark `aria-hidden`.

- [ ] **Step 3: Mount LoadingIntro in Index.tsx**

Render `<LoadingIntro />` at the top of the returned tree, above `<Navbar />`.

- [ ] **Step 4: Verify** (loop above). Confirm: intro shows once, fades, hero appears; reload in same session does not re-show; reduced motion skips it; no console errors.

- [ ] **Step 5: Checkpoint** for user review.

---

## Task 2: Navbar (scroll-aware, light)

**Files:** Modify `src/components/Navbar.tsx`

- [ ] **Step 1:** Read the current Navbar to learn its structure, the `APP_LOGIN_URL` (do not change the URL), and existing links.
- [ ] **Step 2:** Make the header transparent over the hero and add a `ring-1 ring-border` plus `bg-background/80 backdrop-blur` once `window.scrollY > 8` (state + passive scroll listener, or framer-motion `useScroll`). Tidy spacing to the spec. Keep all links, the login URL, and the amber primary CTA. Mobile: keep or add a hamburger, amber CTA stays visible.
- [ ] **Step 3:** Verify (desktop + mobile). Confirm border appears on scroll, login URL unchanged.
- [ ] **Step 4:** Checkpoint.

---

## Task 3: Hero (light anchor)

**Files:** Modify `src/components/landing/HeroVariant1.tsx`, `src/components/landing/ServiceFlowAnimation.tsx`, `src/components/landing/HeroDecoration.tsx`

- [ ] **Step 1: Flatten the product demo.** In `ServiceFlowAnimation.tsx`, change the wrapper `className="tilt-soft animate-breathe"` (around line 394) to a flat container (remove both classes; optionally keep a very subtle float utility). Leave all phase logic, products, and report content unchanged.
- [ ] **Step 2: Tame the hero decoration.** Read `HeroDecoration.tsx`; reduce decorative density (fewer or fainter grid/dot/blob layers) so it supports rather than competes. Keep it token-based.
- [ ] **Step 3: Refine the copy column.** In `HeroVariant1.tsx`: convert the eyebrow into a pill ("Nowosc · Inteligentne rekomendacje"), confirm H1 keeps three lines with the last in `text-primary`, ensure no serif in the headline, tighten vertical rhythm, keep the three recommendation bullets, the amber + ghost CTAs, and the trust line. Keep the framer-motion entrance, standardize easing.
- [ ] **Step 4:** Verify (desktop + mobile). Confirm flat demo, calmer decoration, no serif headline, no console errors, reduced-motion static.
- [ ] **Step 5:** Checkpoint.

---

## Task 4: Integrations bar (light, keep strong)

**Files:** Modify `src/components/landing/SocialProofBar.tsx`

- [ ] **Step 1:** Read the component. Keep the structure the user liked.
- [ ] **Step 2:** Light refine only: align type and spacing to the new system, Allegro active and colored, others muted "wkrotce". No structural change.
- [ ] **Step 3:** Verify, checkpoint.

---

## Task 5: Benefits (light, "01 · Korzysci")

**Files:** Modify `src/components/landing/BenefitsBento.tsx`

- [ ] **Step 1:** Left-align the section heading block (remove `mx-auto text-center` on the heading, keep `max-w`).
- [ ] **Step 2:** Remove the decorative corner accent div (lines around 108-112). Replace the hover `whileHover={{ y: -4 }}` with a calmer hover (ring color shift plus `hover:shadow-medium`, no vertical jump).
- [ ] **Step 3:** Keep the 2 by 2 grid, icons, recommendation chips, copy. Standardize easing and `once: true`.
- [ ] **Step 4:** Verify, checkpoint.

---

## Task 6: Jak to dziala (dark, "02", climax 1)

**Files:** Modify `src/components/landing/HowItWorks.tsx`

- [ ] **Step 1:** Read the component to learn the current 3-step structure and copy.
- [ ] **Step 2:** Convert the section background to deep navy (`bg-brand-navy` or a deep-navy wrapper), invert text colors (white headings, light-navy body), amber step numbers. Keep the three steps (link/CSV, analysis, PDF report) and add small UI snippets per step.
- [ ] **Step 3:** Add scroll-reveal to the steps (existing framer-motion or the new `useReveal`), staggered.
- [ ] **Step 4:** Ensure the section above (benefits, light) and below (pricing, light) hand off cleanly into and out of the dark band via gradient strips.
- [ ] **Step 5:** Verify (contrast, mobile stack), checkpoint.

---

## Task 7: Pricing (light, "03")

**Files:** Modify `src/components/landing/Pricing.tsx`

- [ ] **Step 1:** Read the component for current plans, the Starter free details (3 analyses/month), Pro/Agencja, and the add-on copy.
- [ ] **Step 2:** Make Starter visually primary (amber accent or 2px ring, slight elevation). Pro and Agencja get a muted "Wkrotce" badge and a clearly secondary, non-clickable look. Keep the add-on top-up strip below.
- [ ] **Step 3:** Numbers use `tabular-nums`. Mobile: vertical stack, Starter on top.
- [ ] **Step 4:** Verify, checkpoint.

---

## Task 8: Testimonials (light, "04")

**Files:** Modify `src/components/landing/Testimonials.tsx`

- [ ] **Step 1:** Read the component for current quotes and authors.
- [ ] **Step 2:** Refine the three cards (quote, initials or avatar, name, role) to the new card language. Desktop three columns, mobile carousel or stack.
- [ ] **Step 3:** Verify, checkpoint.

---

## Task 9: FAQ (light, "05")

**Files:** Modify `src/components/landing/FAQ.tsx`

- [ ] **Step 1:** Read the component for current questions and the accordion.
- [ ] **Step 2:** Move to a two-column layout: heading and intro left, accordion right (stacks on mobile). Keep all questions and the shadcn accordion behavior.
- [ ] **Step 3:** Verify, checkpoint.

---

## Task 10: Final CTA (dark, climax 2)

**Files:** Modify `src/components/landing/FinalCTA.tsx`

- [ ] **Step 1:** Read the component (already navy per the brief).
- [ ] **Step 2:** Refine to the climax treatment: strong centered line "Twoja konkurencja analizuje ceny teraz. Ty tez powinienes.", amber CTA, trust microcopy. Align spacing and type.
- [ ] **Step 3:** Verify, checkpoint.

---

## Task 11: Footer (deep navy)

**Files:** Modify `src/components/landing/Footer.tsx`

- [ ] **Step 1:** Read the component for current columns and links (do not change legal link targets).
- [ ] **Step 2:** Refine layout and type: logo and tagline, columns (Produkt, Firma, Prawne), newsletter signup. Keep all links.
- [ ] **Step 3:** Verify, checkpoint.

---

## Task 12: Sticky mobile CTA

**Files:** Modify `src/components/landing/StickyCTA.tsx`

- [ ] **Step 1:** Read the component.
- [ ] **Step 2:** Restyle to the new system, ensure it only shows on mobile after scroll, amber CTA, does not overlap the footer.
- [ ] **Step 3:** Verify on mobile viewport, checkpoint.

---

## Task 13: Light/dark rhythm and global QA

**Files:** Modify `src/pages/Index.tsx` and any section wrappers as needed

- [ ] **Step 1:** Confirm the section order and that the two dark bands (Jak to dziala, Final CTA plus Footer) sit correctly with smooth handoffs; adjust handoff gradient strips.
- [ ] **Step 2:** Full-page verification at 1440, 1024, 768, 390 widths. Confirm no horizontal scroll, consistent section rhythm, all sections reveal correctly.
- [ ] **Step 3:** Reduced-motion full pass: confirm the whole page is static and complete with `prefers-reduced-motion: reduce`.
- [ ] **Step 4:** Console clean across the page.
- [ ] **Step 5:** Final checkpoint: full before/after comparison against the baseline screenshot.

---

## Self-review (done)

- Spec coverage: every spec section (navbar, hero, integrations, benefits, jak-to-dziala dark, pricing, testimonials, FAQ, final CTA dark, footer, sticky mobile, light/dark rhythm, motion, anti-AI) maps to a task above.
- Placeholders: change steps name exact files and concrete edits; full final JSX per section is produced during execution and verified live (visual TDD), since pre-writing pixel-final markup for 13 components before render and before Stitch input would be guesswork.
- Consistency: shared helpers (`useReveal`, `LoadingIntro`) defined once in Task 1 and referenced later by the same names.

## Parallel: Stitch

The user is generating layout ideas in Stitch. When results arrive, fold the strongest ideas into the relevant task before implementing that section. Stitch output does not block starting Task 1 and Task 2.
