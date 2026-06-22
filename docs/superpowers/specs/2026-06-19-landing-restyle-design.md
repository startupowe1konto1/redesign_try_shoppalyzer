# Shoppalyzer landing restyle, design spec

Date: 2026-06-19
Status: approved direction, ready for implementation plan
Sandbox: `shoppalyzer_landing_page_redesign_test` (git-less copy of `shoppalyzer_pre-scraper`, runs on localhost:8080)

## 1. Context and goal

The Shoppalyzer landing already has a mature design system ("Less AI, more editorial", warm off-white, navy and amber, Geist and Newsreader, soft shadows). The goal of this work is a complete visual restyle that keeps the current colors and section structure but raises execution so the page reads as tidy, clear, and not "AI generic". The same Polish copy, links, routes, and product logic stay; this is a visual and layout pass.

Audience: Allegro sellers, from solo merchants to agencies. Tone: business direct, data driven, trustworthy.

## 2. Scope

In scope:
- Visual restyle of all landing sections on the home route, plus the sticky mobile CTA and footer.
- Keeping and refining the existing `ServiceFlowAnimation` as the hero product demo.
- Responsive behavior, desktop first, with a polished mobile layout.

Out of scope (do not touch):
- `vercel.json` (CSP and headers, security audit).
- `CookieConsent.tsx` (GTM consent gating, GDPR).
- `src/lib/app-links.ts` and the login URL in `Navbar.tsx`.
- Wording of legal pages (`/regulamin`, `/polityka-*`), GDPR vetted.
- New dependencies, unless agreed first (performance budget).
- Absolute OG URLs in `index.html`.

## 3. Design direction (locked)

A light-to-dark scroll journey. The page starts light (warm off-white, trust) and uses deep navy sections as the two narrative climaxes. Craft level inspired by Raycast, guided scroll narrative inspired by Mercury, small animated product windows inspired by Ramp, subtle branded loading inspired by Linear. Motion is purposeful and restrained, never busy like Stripe or Framer. The aesthetic is warmed for e-commerce sellers, not cold or developer focused.

Colors stay exactly as today (see section 4).

## 4. Foundation (visual language)

### 4.1 Color and the light/dark map
Tokens stay (defined in `src/index.css`): primary navy `#1E4D72`, deep navy `#102D45`, accent amber `#E8843A`, background warm white `#FAFAF7`, white surfaces, warm grey borders, status colors green `#22A46B` (raise), yellow `#F2A60C` (hold), red `#D93838` (lower).

Light/dark rhythm down the page:
- Light: navbar, hero, integrations bar, benefits.
- Dark (deep navy), climax 1: "Jak to dziala".
- Light again: pricing, testimonials, FAQ.
- Dark (deep navy), climax 2: final CTA, then footer.

Transitions between light and dark use a subtle gradient handoff, no hard seams.

### 4.2 Typography
- Display and H1: Geist 800, tracking -0.03em, fluid 30px to 50px.
- Section H2: Geist 700, tracking -0.025em, 28px to 38px, second line in `primary`.
- Eyebrow: Geist Mono 11px, tracking 0.2em, uppercase, muted (for example "02 · Jak to dziala").
- Body: 15px to 16px, muted foreground. All numbers use `tabular-nums`.
- Newsreader serif used only on one or two punctual accents, never in headlines (the serif headline was an "AI tell" in the Stitch test).

### 4.3 Spacing and layout
- Section vertical rhythm: py-24 on mobile, py-32 on desktop.
- Container max width 1320px (existing Tailwind container).
- Break the "everything centered" symmetry: some sections use left aligned headings and asymmetric layouts (benefits heading left, FAQ as a two column heading plus accordion).

### 4.4 Motion and performance budget
- Loading: one short branded intro (about 1.2s) on first load, then reveal of the hero.
- Section entrances: scroll reveal fade plus translate up, `once: true`, ease `[0.16, 1, 0.3, 1]`, stagger 60ms to 80ms.
- Hero: keep `ServiceFlowAnimation` but remove `tilt-soft` and `animate-breathe`, optional minimal float only.
- All motion respects `prefers-reduced-motion`. Heavy assets stay lazy. No new heavy dependencies.

### 4.5 Components
- Cards: `bg-surface`, `ring-1 ring-border`, radius 14px to 16px, calm hover (ring or soft shadow, no universal -y lift).
- Buttons: amber primary with soft shadow, ghost with `ring-border`.
- Recommendation chips: raise, hold, lower in green, yellow, red. This is a product signature, kept.
- Shadows: only `soft`, `medium`, `hero` tokens. No glow.

### 4.6 Anti-AI guardrails
No purple or violet gradients, no glassmorphism, no decorative blobs, no centering everything, no fake 3D tilt, Lucide icons not emoji, gradients limited to subtle light and dark handoffs.

## 5. Section by section

1. Navbar, light, sticky. Transparent over hero, gains a border and light blur on scroll. Logo left, links center or right, ghost "Zaloguj sie" plus amber "Wyprobuj za darmo". Mobile: hamburger, amber CTA stays.

2. Hero, light, the anchor. Two column grid about 1.05 to 0.95. Left: pill eyebrow "Nowosc · Inteligentne rekomendacje", H1 in three lines with the last in primary, subhead, three recommendation bullets, CTA row (amber plus ghost), trust line. Right: `ServiceFlowAnimation`, flattened. Content staggers in after the loading intro. Soft handoff at the bottom.

3. Integrations bar, light. The element the user liked from the Stitch test, kept strong. Slim band: "Analizujemy dane z:" plus Allegro (active, colored) plus other platforms greyed as "wkrotce". Minimal, clean.

4. Benefits, light, "01 · Korzysci". H2 "Inne narzedzia pokazuja dane. Shoppalyzer mowi Ci, co zrobic." plus four cards in a 2 by 2 grid: Lucide icon, recommendation chip, title, description. Remove the corner accent gradient, calmer hover, left aligned heading.

5. Jak to dziala, dark deep navy, "02", climax 1. H2 "Od linku do decyzji w 60 sekund." Three steps as cards or windows revealing on scroll, with mini UI snippets (link, analysis checks, PDF), amber step numbers.

6. Pricing, light, "03". Three plans: Starter (free, active, highlighted with an amber accent or 2px ring), Pro and Agencja with a "Wkrotce" badge (muted). Below, an add-on top-up strip. Tabular numbers, Starter visually primary.

7. Testimonials, light, "04". H2 "Sprzedawcy na Allegro juz to wiedza." Three cards (quote, initials or avatar, name, role). Desktop three columns, mobile carousel or stack.

8. FAQ, light, "05". Two column layout: heading left, accordion right. Calm spacing.

9. Final CTA, dark deep navy, climax 2. Strong line "Twoja konkurencja analizuje ceny teraz. Ty tez powinienes." plus amber CTA plus trust microcopy.

10. Footer, deep navy. Logo and tagline, columns (Produkt, Firma, Prawne), newsletter signup for sellers.

Global: restyled sticky mobile CTA (`StickyCTA`), consistent section rhythm, reduced motion support everywhere.

## 6. Workflow and environment

- Build and verify locally on localhost:8080. Nothing is committed to the production repo by this work.
- Visual verification uses chrome-devtools MCP (see project memory: Playwright MCP and Claude Preview have issues with this page).
- Implementation is component by component, each verified visually before moving on.
- Stitch is being used in parallel by the user to generate layout ideas; useful results will be folded into the implementation.

## 7. Success criteria

- All ten sections restyled to the direction above, light/dark rhythm in place.
- Colors unchanged, recommendation chip signature kept.
- No "AI tells" from the guardrail list.
- Fully responsive, no horizontal scroll at any breakpoint, mobile polished.
- Motion purposeful, performant, reduced-motion safe.
- No regressions to the do-not-touch list.

## 8. Open items

- Exact pricing add-on wording and testimonial content reuse from current components.
- Whether to keep the macOS window chrome on the hero demo or move to a cleaner app bar (decide during hero implementation).
