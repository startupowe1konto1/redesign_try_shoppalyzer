# Shoppalyzer — domain + hosting design

> Status: approved 2026-06-13. Source brief: `shoppalyzer-domain-hosting-brief.md` (in `Claude_code/`).

## Decisions

| Decision | Choice |
|---|---|
| Canonical TLD | `shoppalyzer.pl` is canonical. `shoppalyzer.com` registered defensively and 301-redirects to `.pl`. |
| App/landing split | root = landing page; `app.shoppalyzer.pl` = backend (login/signup/dashboard). |
| DNS provider | Cloudflare DNS (nameservers delegated to Cloudflare; all records managed there). |
| Hosting | Stays on Vercel for both projects. Domains attached via Vercel → Settings → Domains. |
| SSL | Automatic via Vercel (Let's Encrypt). No manual config. |
| Email on domain | Out of scope for now. Documented follow-up. |

## Target architecture

| Hostname | Serves | Vercel project | DNS record (Cloudflare) |
|---|---|---|---|
| `shoppalyzer.pl` | Landing (this repo) | `shoppalyzer_pre-scraper` | `A` / `ALIAS` → Vercel apex per Vercel's live instructions |
| `www.shoppalyzer.pl` | 301 → `shoppalyzer.pl` | landing project | `CNAME` → Vercel; redirect configured in Vercel |
| `app.shoppalyzer.pl` | Backend (login/signup/dashboard) | `shoppalyzer-backend` | `CNAME` → Vercel |
| `shoppalyzer.com` (+ `www`) | 301 → `shoppalyzer.pl` | — | redirect at Cloudflare (Redirect Rule) or tiny Vercel redirect project |

Notes:
- Cloudflare proxying (orange cloud) for the Vercel records should follow Vercel's current guidance; default to DNS-only if there is any TLS conflict.
- Old `*.vercel.app` URLs keep working but the canonical host is `shoppalyzer.pl`.

## Code changes (this repo) — triggered once `shoppalyzer.pl` is live

1. `index.html` — set absolute `og:url`, `og:image`, `twitter:image` to `https://shoppalyzer.pl/...`; add `<link rel="canonical">`.
2. `src/lib/app-links.ts` — `APP_BASE_URL` → `https://app.shoppalyzer.pl`; fix comment to `.pl`.
3. `src/components/Navbar.tsx:7` — remove the duplicate hardcoded login URL; import `APP_LOGIN_URL` from `app-links.ts` (single source of truth).
4. `vercel.json` — review CSP / security headers (audited 2026-05-22). No new external sources expected since email is deferred; verify the backend host reference if the landing points at it.
5. SEO — add/update `public/robots.txt` (+ sitemap URL); register `shoppalyzer.pl` in Google Search Console; re-test OG with Facebook/LinkedIn debuggers. Consider `sitemap.xml`.
6. Confirm GTM / cookie config (`CookieConsent.tsx`) has no hardcoded `vercel.app` host.

## Sequencing

1. Research & recommend registrar (renewal price, `.pl` support, Cloudflare-compatibility) + capture Vercel's exact current DNS records for apex + subdomain.
2. User purchases `shoppalyzer.pl` and `shoppalyzer.com`; assistant guides Cloudflare nameserver delegation + Vercel domain attach.
3. After `.pl` resolves with automatic SSL, apply the code changes above as a single commit + deploy.
4. Verify: `www` and `.com` redirects (301), OG rendering, Google Search Console.

## Out of scope (documented follow-ups)

- Email-on-domain (Zoho vs Google Workspace) + MX/SPF/DKIM/DMARC.
- Updating the **backend** repo's own internal links to `app.shoppalyzer.pl` (separate repo; cannot be edited from this repo).

## Constraints

- Assistant researches and recommends only; **the user performs the actual domain purchase** (payment/account access).
- Firecrawl must not be used (user instruction); use built-in WebSearch.
- `vercel.json` and `CookieConsent.tsx` were set during a security audit — change with care.
