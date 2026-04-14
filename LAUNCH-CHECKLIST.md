# Launch Checklist — Norwich Free Walking Tour Website

Living document. Tick as items are confirmed. `[MANUAL]` items can only be verified by Tom (external tools, real browser, live DNS, etc.).

Status key: `[x]` done · `[ ]` pending · `[!]` blocker found during this review.

---

## Build / code health

- [x] `npm run build` passes cleanly (single ESLint warning — inline GA snippet. See note in *Non-blocking* below).
- [x] `npm run lint` passes (same warning as above — non-blocking).
- [x] `npx tsc --noEmit` reports 0 errors.
- [x] No stray `console.log` calls in production code. Only two survive, both inside `if (!process.env.RESEND_API_KEY)` branches in `app/api/{contact,subscribe}/route.ts` that never fire in production.
- [ ] **[BLOCKER] `.env.example` missing.** Add one listing `RESEND_API_KEY` (only required server-side env var). Vercel-owned env vars (`VERCEL_URL` etc.) don't need to be documented.

## Content / SEO

- [x] Every route has `metadata` export with `title` + `description`. Checked: `/`, `/tour`, `/book`, `/contact`, `/private-tours`, `/privacy`, `/terms`.
- [x] `app/sitemap.ts` and `app/robots.ts` exist; routes render from Next static generation.
- [ ] `[MANUAL]` Open the live sitemap once deployed, confirm it lists all public routes against the correct `https://www.norwichfreewalkingtours.co.uk` host.
- [ ] `[MANUAL]` Paste JSON-LD from page source into [schema.org validator](https://validator.schema.org/) — expect `TouristAttraction`, `Offer`, `Event` to validate.
- [ ] `[MANUAL]` Every internal link resolves (run the site, click through all nav + footer + CTA links, expect no 404s).
- [x] Zero `norwichfreewalkingtour.com` (old/typo'd domain) references remaining — verified in previous session.
- [ ] **[BLOCKER] Favicon file missing.** `CLAUDE.md` specifies `/public/favicon.jpeg`; `public/` currently only contains `logo.png`, `Logo.png.png`, `Logo.svg.svg` and the images directory. Add the green map-pin favicon as `public/favicon.jpeg` and/or `public/favicon.ico`.
- [ ] **[BLOCKER] OG image missing.** No `public/og-image.*` found. Social cards will fall back to default. Create a 1200×630 branded image and reference it in `app/layout.tsx` `openGraph.images`.
- [x] Privacy policy is published at `/privacy` and links from footer and cookie banner (verified during prior review).
- [ ] `[MANUAL]` Confirm all real text on `/privacy` reflects the launch reality (domain, Resend sub-processor, GA4, UK ICO contact).

## Infrastructure

- [ ] `[MANUAL]` GTM container `GTM-PTF5DB67` is **published** (not just in Preview) with the GA4 config tag for `G-75NZL8LFG9` firing on All Pages, gated by Consent Mode.
- [ ] `[MANUAL]` Resend domain `norwichfreewalkingtours.co.uk` shows "verified" in Resend dashboard.
- [ ] `[MANUAL]` Vercel project has `RESEND_API_KEY` set in *Production* (and ideally *Preview*) environments.
- [ ] `[MANUAL]` DNS cutover plan documented: switch Namecheap nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com` **only after** the Vercel preview URL passes the in-browser checks below. Keep a TTL-aware fallback plan written down before switching.

## Quality / UX

- [ ] `[MANUAL]` Mobile 375px: Hero headline + primary CTA visible without scroll.
- [ ] `[MANUAL]` Keyboard-only flow: tab through Home → Book → submit. No focus traps, visible focus rings, Enter triggers CTAs.
- [ ] `[MANUAL]` Lighthouse mobile targets: Performance ≥ 85, SEO = 100, Accessibility = 100, Best Practices = 100.
- [ ] `[MANUAL]` Cross-browser smoke test: Safari iOS, Chrome Android, desktop Chrome/Safari/Firefox.
- [ ] `[MANUAL]` Reduced-motion check: Framer Motion entrance animations should degrade gracefully when OS has reduced motion on.

## Legal / Trust

- [x] Privacy policy linked from cookie banner and footer.
- [ ] `[MANUAL]` Meeting-point address (Outside The Forum, Millennium Plain, NR2 1TF) matches physical sign / what the guide says on the day.
- [ ] `[MANUAL]` Send-test: after `RESEND_API_KEY` is in Vercel, submit the contact form with your own email address and confirm the notification arrives at `hello@norwichfreewalkingtours.co.uk`.
- [ ] `[MANUAL]` Subscribe endpoint send-test: submit the home-page email capture and confirm a `New subscriber:` email arrives in the same inbox.

## Security

- [x] Contact-form HTML injection fixed via `escapeHtml()` (see `docs/SECURITY-REVIEW.md`).
- [x] Subscribe endpoint ships with the same defences from day one.
- [x] `npm audit --omit=dev`: 1 high-severity advisory set in `next@14.2.35`. All findings are DoS-only; no data / auth impact. Accepted for launch, upgrade scheduled post-launch (documented in `docs/SECURITY-REVIEW.md`).
- [x] Security headers (HSTS, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy) set in `next.config.mjs`.
- [ ] `[MANUAL]` Post-launch XSS sanity check: submit `<script>alert(1)</script>` in the contact form name/message fields and confirm the delivered email shows escaped entities, not a real script tag.
- [ ] `[MANUAL]` Confirm `git ls-files '.env*'` returns zero tracked files before pushing to GitHub (no secrets committed).

## Per-page smoke check (run against the Vercel preview URL before DNS cutover)

- [ ] `[MANUAL]` `/` — hero renders, booking iframe loads, CTAs navigate to `/book`, Why Norwich section shows 4 quotes, FAQ expands/collapses, email capture submits and shows success state.
- [ ] `[MANUAL]` `/tour` — 11 stops render in order, map image loads.
- [ ] `[MANUAL]` `/book` — booking widget iframe loads and is interactive.
- [ ] `[MANUAL]` `/contact` — form submits, success state displays, email arrives (post-Resend).
- [ ] `[MANUAL]` `/private-tours` — arcade hero image renders, copy displays.
- [ ] `[MANUAL]` `/privacy` and `/terms` — render with expected copy, no Lorem ipsum.
- [ ] `[MANUAL]` Cookie banner — "Decline" clears GA cookies, "Accept" fires the GTM tag (verify in GTM Preview or GA4 Realtime).

---

## Blockers surfaced by this review

1. **Missing `public/favicon.jpeg`** — add before launch.
2. **Missing `public/og-image.*`** — add before launch or social link previews look unbranded.
3. **Missing `.env.example`** — low-risk but expected housekeeping for an open repo.

All other items are either already green or require Tom's manual verification with tools outside this checkout (Vercel, Resend, GTM, real browser).

## Non-blocking

- ESLint warning on inline GA snippet (`app/layout.tsx:200`): suggests `next/script`. Refactor is low-risk but the inline approach is intentional so Consent Mode defaults are set before any analytics pixel can fire. Documented as known.

## Post-launch follow-ups

- Upgrade `next` to `15.x` then `16.x` once breaking-change surface can be properly tested. Re-run `npm audit` and commit the clean output.
- Swap `<WhyNorwich />` back to `<Testimonials />` once real Google Reviews are available (see `CLAUDE.md` Section 10).
- Remove the "Coming May 2026" badge on `components/Hero.tsx` on launch day.
- Set up official Instagram account and update footer link.
- Add "From £X" anchor to `/private-tours` when pricing is decided.
