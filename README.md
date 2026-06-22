# Shoppalyzer — Landing (Redesign)

Pre-launch landing page for Shoppalyzer, a SaaS product that delivers automated competitive-intelligence reports for Polish e-commerce sellers on Allegro.

> **Inteligentna analiza konkurencji dostępna dla każdego.**

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion (page + scroll animations)
- jsPDF + html2canvas (sample-report PDF export)
- Tally.so (waitlist embed)

## Local development

```bash
npm install
npm run dev      # → http://localhost:8080
npm run build    # production bundle
```

## Project structure

```
src/
  components/
    landing/        # Hero variants, BenefitsBento, HowItWorks, Pricing, Testimonials, FAQ, FinalCTA, Footer, SocialProofBar
    ui/             # shadcn primitives
    Navbar.tsx
    RecommendationChip.tsx   # the brand signature element
    CountUp.tsx              # pl-PL number animations
    WaitlistModal.tsx
    CookieConsent.tsx
  pages/
    Index.tsx                # main landing
    SampleReport.tsx         # /sample-report (downloadable PDF demo)
    Kontakt.tsx
    PolitykaPrywatnosci.tsx
    PolitykaCookies.tsx
    Regulamin.tsx
  lib/format.ts              # Polish locale formatters
  index.css                  # design tokens
public/
  shoppalyzer-logo.svg       # horizontal lockup
  shoppalyzer-mark.svg       # icon-only
  favicon-*.png, apple-touch-icon.png, site.webmanifest
brand-assets/                # exported logos in SVG + PNG, light + dark variants
```

## Hero variants

The `/` route supports three hero variants for A/B testing via query string:

- `/` (default) — primary: "Przestań zgadywać. Zacznij zarabiać więcej."
- `/?v=2` — angle: time savings ("6 godzin w Excelu tygodniowo")
- `/?v=3` — angle: margin opportunities ("Twoja konkurencja już wie, kiedy możesz zarobić więcej")

## Deploy

Designed to deploy to Vercel as a static SPA (Vite build → `dist/`). `vercel.json` is committed at the project root.
