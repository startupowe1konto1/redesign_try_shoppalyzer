# Starter Prompt — Marketing Site Visual + Text Edits

> Paste this into a fresh Claude Code session running in the `shoppalyzer_pre-scraper` repo. Then describe each change you want one at a time.

---

# Role

You're helping me make **focused visual and text edits** to the Shoppalyzer marketing landing page. Not building features. Not refactoring. Just tweaking copy, colors, spacing, layout, fixing typos, adjusting which elements appear where.

# Stack you need to know

- **Vite + React 18 + TypeScript** (NOT Next.js — this is a pure SPA)
- **Tailwind CSS** (config at `tailwind.config.ts`) — design tokens use brand-navy, primary, accent-brand, success, warning, danger
- **shadcn/ui** components in `src/components/ui/`
- **Framer Motion** for animations
- **React Router** (`react-router-dom`) for the 5 routes: `/`, `/sample-report`, `/regulamin`, `/polityka-prywatnosci`, `/polityka-cookies`, `/kontakt`
- **Polish locale** — all user-facing copy is Polish. When rewriting copy, keep it Polish unless I explicitly ask for translation
- Live at `https://shoppalyzer-pre-scraper.vercel.app` (auto-deploys on push to `main`)

# File map (where to find things)

```
src/
  pages/
    Index.tsx                    landing page assembly
    SampleReport.tsx             /sample-report (the demo report page)
    Regulamin.tsx                /regulamin
    PolitykaPrywatnosci.tsx      /polityka-prywatnosci
    PolitykaCookies.tsx          /polityka-cookies
    Kontakt.tsx                  /kontakt
  components/
    Navbar.tsx                   top bar with CTAs
    CookieConsent.tsx            bottom-right consent banner (GDPR-gated)
    WaitlistModal.tsx            newsletter signup modal (Tally embed)
    FeatureCard.tsx
    landing/
      HeroVariant1.tsx           main hero (currently used)
      HeroVariant2.tsx HeroVariant3.tsx  alternates (not currently used)
      ServiceFlowAnimation.tsx   animated mockup right of hero
      BenefitsBento.tsx          "korzyści" section
      HowItWorks.tsx             "jak to działa" section
      Pricing.tsx                pricing tiers
      Testimonials.tsx           "opinie sprzedawców"
      FAQ.tsx                    accordion FAQ
      FinalCTA.tsx               bottom-of-page CTA before footer
      Footer.tsx                 footer with newsletter form
      HeroDecoration.tsx         background SVG/decoration
      HeroDashboardMockup.tsx    (older mockup, replaced by ServiceFlowAnimation)
  lib/
    app-links.ts                 APP_SIGNUP_URL etc. — backend signup link constant
    format.ts                    fmtPLN, fmtPercent
    utils.ts                     cn() and shadcn helpers
  context/
    WaitlistContext.tsx          modal trigger context (newsletter form)
  ui/                            shadcn primitives (button, card, etc.)
```

# Conventions

- **Dev server is already running** at `http://localhost:5173`. Don't run `npm run dev` again — it'll error on port-in-use. The user's browser shows live preview.
- **For visual changes**: when you can't tell from code alone whether something will look right, ask the user to confirm by checking their browser tab — they can see your edit immediately.
- **For Polish copy changes**: write idiomatic Polish, not literal translation. When unsure between two phrasings, ask. The brand voice is: business-direct, no fluff, no exclamation marks unless the section requires energy.
- **For Tailwind colors**: use the existing semantic tokens (`bg-primary`, `text-accent-brand`, `border-border`, `text-muted-foreground`) — don't introduce raw hex values unless explicitly asked.
- **For spacing**: respect the 4/6/8/12/16/20/24 Tailwind scale. Don't introduce arbitrary values like `mt-[37px]` without reason.
- **Make one focused change per turn.** If the user asks for multiple things in one message, ask which to do first or batch them only if they're closely related.

## Git workflow

- Git is configured for the user (`240530642+startupowe1konto1@users.noreply.github.com`).
- **Commit per logical change** — don't accumulate dozens of unrelated edits in one commit. Commit message style: `chore(ui): tweak X heading wording` / `fix(landing): correct typo in benefit Y` / `feat(footer): rewrite newsletter blurb`.
- **Do NOT push to GitHub** until the user explicitly says "push" or "ship it". Local commits are fine.
- When pushing, the user has to provide a fresh fine-grained PAT (scoped to `shoppalyzer_pre-scraper`, Contents: read+write). The previous token may have expired — ask for a fresh one each session.

## How to verify visual changes

Pick the right tool for the kind of change:

**Pure text / copy change** (rewriting a heading, fixing a typo):
→ Read the file, edit, done. User checks their browser tab to confirm.

**Layout / spacing / color change**:
→ Read the file, edit, ASK the user to check the browser tab and screenshot if something looks off.

**Animation / interaction change** (hover, scroll, motion):
→ Make the change. Optionally use Playwright MCP if available to take a screenshot:
```
mcp__playwright__browser_navigate → http://localhost:5173
mcp__playwright__browser_take_screenshot
```
But usually the user checking the live browser tab is faster.

**Multi-page or multi-state change** (e.g. "change the same heading style on /regulamin, /polityka-prywatnosci, /polityka-cookies"):
→ Use Grep to find all instances, edit each, confirm with the user one by one if they want to check.

## What NOT to do without asking

- Don't modify `vercel.json` (security headers, set during the 2026-05-22 audit)
- Don't modify `CookieConsent.tsx` GTM-loading logic (GDPR consent-gating, set during audit)
- Don't modify `src/lib/app-links.ts` (the backend signup URL — changes affect the CTA flow)
- Don't run `npm audit fix` or upgrade dependencies (clean post-audit; bumps need their own review)
- Don't touch the legal pages' compliance wording (`/regulamin`, `/polityka-prywatnosci`, `/polityka-cookies`) without explicit approval — they're GDPR-vetted
- Don't add new external script tags or third-party embeds (would require CSP changes in `vercel.json`)
- Don't add new top-level dependencies — ask first

# Starting

Read the layout. Wait for the user to tell you what to change.

When the user describes a change:
1. Find the relevant file(s) via Read or Grep
2. Make the edit
3. Briefly describe what changed (1-2 sentences)
4. If it's visual, suggest the user check the browser tab
5. Wait for next instruction — DON'T preemptively make additional changes

Quick mental model: every turn = one edit + brief confirmation. No big plans, no spec docs, no subagents. Just fast iteration.

---

# Live URLs (reference)

- Local preview: `http://localhost:5173`
- Production: `https://shoppalyzer-pre-scraper.vercel.app`
- Backend it links to: `https://shoppalyzer-backend-ls4m.vercel.app/signup`

# Repo state (as of 2026-05-24)

- Latest commit: see `git log -1 --oneline`
- Recently shipped: security audit hardening (CSP, GTM consent gating, npm audit fix), CTA wiring to backend signup, ServiceFlowAnimation hero, removed eyebrow texts
- Branch policy: work on `main`, push when ready
