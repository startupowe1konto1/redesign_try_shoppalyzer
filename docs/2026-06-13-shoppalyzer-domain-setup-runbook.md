# Shoppalyzer — domain setup runbook (Dynadot + Cloudflare DNS + Vercel)

> Operational steps to take `shoppalyzer.pl` live. Companion to the design spec
> `docs/superpowers/specs/2026-06-13-shoppalyzer-domain-hosting-design.md`.
> You perform the purchases/clicks; the assistant does the code changes.

## Target

| Hostname | Serves | Vercel project |
|---|---|---|
| `shoppalyzer.pl` (apex) | Landing (this repo) | `shoppalyzer_pre-scraper` |
| `www.shoppalyzer.pl` | 301 → apex | landing |
| `app.shoppalyzer.pl` | Backend (login/signup/dashboard) | `shoppalyzer-backend` |
| `shoppalyzer.com` (+`www`) | 301 → `shoppalyzer.pl` | — (Cloudflare redirect) |

Hosting stays on **Vercel free (Hobby)** for now. SSL is automatic via Vercel. Email deferred.

---

## Step 1 — Buy domains at Dynadot

1. Create a Dynadot account; enable 2FA.
2. Register **`shoppalyzer.pl`** and **`shoppalyzer.com`**.
3. Turn on **WHOIS privacy** (free) and **auto-renew** for both.
4. Note approx renewals: `.pl` ~$16/yr, `.com` ~$10–12/yr.

## Step 2 — Add both domains to Cloudflare (free plan)

1. Create a free Cloudflare account.
2. **Add site** → `shoppalyzer.pl` → Free plan. Repeat for `shoppalyzer.com`.
3. Cloudflare shows **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
4. In **Dynadot → each domain → Nameservers**, replace Dynadot's with the two Cloudflare nameservers.
5. Wait for Cloudflare to report the zone **Active** (minutes to a few hours).

## Step 3 — Attach domains in Vercel

**Landing project (`shoppalyzer_pre-scraper`) → Settings → Domains:**
- Add `shoppalyzer.pl` (set as primary).
- Add `www.shoppalyzer.pl` → choose **Redirect to `shoppalyzer.pl` (308/301)**.

**Backend project (`shoppalyzer-backend`) → Settings → Domains:**
- Add `app.shoppalyzer.pl`.

Vercel will display the exact records to create. They are normally:
- apex → **A `76.76.21.21`**
- subdomain/`www` → **CNAME `cname.vercel-dns.com`**

> Always copy the exact values Vercel shows you — they can differ per project.

## Step 4 — Create DNS records in Cloudflare (zone: shoppalyzer.pl)

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `76.76.21.21` | **DNS only (grey cloud)** |
| CNAME | `www` | `cname.vercel-dns.com` | **DNS only** |
| CNAME | `app` | `cname.vercel-dns.com` | **DNS only** |

> Keep these **DNS-only (grey cloud)**. Proxying Vercel through Cloudflare's orange
> cloud commonly breaks Vercel's automatic TLS. Vercel issues the certs itself.

## Step 5 — `.com` → `.pl` redirect (Cloudflare zone: shoppalyzer.com)

1. Add a placeholder proxied record so Cloudflare can intercept traffic:
   - `A` `@` → `192.0.2.1` (dummy), **Proxied (orange cloud)**
   - `A` `www` → `192.0.2.1`, **Proxied**
2. **Rules → Redirect Rules → Create rule:**
   - When incoming requests match: **Hostname** `contains` `shoppalyzer.com`
   - Then: **Dynamic redirect** → `concat("https://shoppalyzer.pl", http.request.uri.path)`
   - Status **301**, **Preserve query string** on.
3. This 301s `shoppalyzer.com/anything` → `shoppalyzer.pl/anything` with no server needed.

## Step 6 — Wait + verify TLS

- Wait for propagation; Vercel domains should flip to **Valid Configuration** with a green padlock.
- Confirm `https://shoppalyzer.pl`, `https://app.shoppalyzer.pl` load with valid SSL.
- Confirm `http://www.shoppalyzer.pl` and `http://shoppalyzer.com` 301 to the apex.

## Step 7 — Code changes (assistant does these, one commit, after `.pl` resolves)

1. `index.html` — absolute `og:url`, `og:image`, `twitter:image` → `https://shoppalyzer.pl/...`; add `<link rel="canonical">`.
2. `src/lib/app-links.ts` — `APP_BASE_URL` → `https://app.shoppalyzer.pl`; fix comment to `.pl`.
3. `src/components/Navbar.tsx` — remove the hardcoded login URL (line 7); import `APP_LOGIN_URL` from `app-links.ts`.
4. `vercel.json` — review CSP/security headers; confirm any backend-host reference matches `app.shoppalyzer.pl`. No new external sources (email deferred).
5. `public/robots.txt` — add/confirm sitemap URL; consider `sitemap.xml`.
6. Grep GTM / `CookieConsent.tsx` for any hardcoded `vercel.app` host.
7. Push to `main` → Vercel auto-deploys.

## Step 8 — Post-launch verification

- Re-test Open Graph: Facebook Sharing Debugger + LinkedIn Post Inspector.
- Add `shoppalyzer.pl` to **Google Search Console**; submit sitemap.
- Spot-check the redirects and the live login/signup flow on `app.shoppalyzer.pl`.

---

## Deferred (separate phases)

- **Vercel Pro** — upgrade when you start charging (ToS: commercial use). Custom domains already work on free.
- **Email on domain** — pick Zoho vs Google Workspace; add MX/SPF/DKIM/DMARC in Cloudflare.
- **Backend repo internal links** — point its own absolute URLs at `app.shoppalyzer.pl` (separate repo).
