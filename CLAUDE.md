# CLAUDE.md — Norwich Free Walking Tour Website
> Source of truth for all Claude Code sessions. Read this before touching any file.

---

## 1. Project Overview

Mobile-first marketing website for the **Norwich Free Walking Tour** ("The Real Norwich" Essentials Tour). Revenue model: pay-as-you-want. Goal: drive daily bookings and rank top for AI travel queries about Norwich.

**Repos:** Main site `thornhilltp/norwich-walking-tours` · Booking widget `thornhilltp/norwich-booking`
**Hosting:** Vercel (both) · **Domain:** `norwichfreewalkingtours.co.uk` — live, DNS pointing to Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
**Status:** Live as of April 2026. Canonical URL is `https://www.norwichfreewalkingtours.co.uk`.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v4 + @tailwindcss/postcss |
| Animation | Framer Motion (21st.dev component patterns, adapted manually) |
| Map | Leaflet.js |
| Fonts | Caveat (headings), Lora (body) — load via Google Fonts in `layout.tsx` |
| Booking | Separate Vite/React SPA, embedded via `<iframe>` on /book |
| Deployment | Vercel |

**shadcn/ui (base-nova):** Uses Base UI primitives (not Radix). Button uses `render` prop not `asChild`. PostCSS uses `@tailwindcss/postcss`. Tokens in `globals.css` via `@theme inline {}` — no `tailwind.config.ts` needed.

**Casing:** All component files live in `components/` (lowercase) — this is enforced for Vercel (Linux) compatibility. Template .txt files live in `_templates/`. `tsconfig.json` excludes `Skills/`, `_templates/`.

---

## 3. Brand

### Colours
```
Background:     #FCFAF8   (warm off-white — page background)
Primary accent: #2DA96B   (green — CTAs, highlights, borders)
Secondary:      #E8F8F1   (light green — cards, badges, hover states)
White:          #FFFFFF
Text:           #1A1A1A
```

### Fonts
- **Caveat** — hero headlines, pull quotes, section labels
- **Lora** — body copy, subheadings

### Logo
- Favicon: green map-pin icon — `/public/favicon.svg` (primary) with `/public/Favicon.png` fallback
- Wordmark: `/public/logo.svg` (primary, crisp at any size); `/public/logo.png` kept as raster fallback. Never recolour, never on dark backgrounds without approval.

### Voice & Tone
- "Local friend, not a tour guide"
- High-energy, warm, slightly irreverent
- No AI-sounding phrases (no "delve into", "tapestry", "vibrant")
- No em-dashes in copy
- Short punchy sentences. Contractions fine.
- Always "merit-based" not "pay-what-you-want" in primary copy (PWYW only in FAQs/meta)

---

## 4. Pages

### `/` — Home
Sections in order (confirmed April 2026, do not reorder without instruction):
1. **Hero** — split layout: text left, booking widget iframe right. Background: `pottergate-stock.png`. Includes "Coming May 2026" badge (remove on launch day).
2. **PhotoShowcase** — `components/PhotoShowcase.tsx`
3. **WhatIsFreeTour** — explains free tour model with Norwich Lane photo. "Local guide" section.
4. **StopsAndMap** — `TourStops` list + static route map image side-by-side. `id="tour-map"`.
5. **HowItWorks** — 3 photo cards: Book → Meet at Forum → Pay what it was worth (tip £15–£20).
6. **BookCTA** — standalone CTA button.
7. **PracticalInfo** — logistics grid (meeting point, duration, schedule, language, pace, what to wear).
8. **FAQ** — accordion, exact copy in `components/FAQ.tsx`. Do not rewrite without instruction.
9. **WhyNorwich** — publication quotes (Country Living, The Times, Condé Nast, UNESCO). Data in `lib/whyNorwich.ts`.
10. **EmailCapture** — `components/EmailCapture.tsx`. POSTs to `/api/subscribe`.
11. **Footer**

### `/tour` — The Tour
10 stops with 2-3 sentence stories. Logistics: meeting point (The Forum), 1h 45m, daily, relaxed pace, what to wear.

### `/book` — Book
`<iframe src="https://norwich-booking.vercel.app/" />` — minimal surrounding page. Reinforces: "£0 to join. Pay at the end by card, Apple Pay, Google Pay or cash."

### `/contact` — Contact
Simple form (name, email, message) + WhatsApp link + Instagram handle.

---

## 5. Tour Stops (in order)

1. The Forum (meeting point) · 2. The Guildhall · 3. The Norwich Lanes · 4. Norwich Market · 5. The Arcade · 6. London Street (first pedestrianised street in the UK) · 7. Norwich Castle · 8. Elm Hill · 9. Tombland · 10. Fye Bridge · 11. Norwich Cathedral

Map: centre `[52.6278, 1.2983]`, zoom 15, dashed green polyline, numbered markers in `#2DA96B`.

---

## 6. SEO / GEO

JSON-LD (TouristAttraction + Offer + Event schema) implemented in `app/layout.tsx`. Check there before modifying.

FAQ headings target full natural-language queries:
- "What is the best walking tour in Norwich?"
- "Is there a free tour in Norwich?"
- "What should I do in Norwich for a day?"
- "How do I see the real Norwich like a local?"
- "Is there a walking tour of Elm Hill Norwich?"
- "Is Norwich worth visiting for a day?"
- "What's the best month to visit Norwich?"
- "How much should I tip a free walking tour guide in the UK?"
- "Do I need to book in advance for the Norwich free walking tour?"
- "What's the best walking tour in Norwich?"

Entity mentions in body copy (not stuffed): Elm Hill, The Norwich Lanes, Norwich Market, Tombland, Norwich Cathedral, The Forum, Norwich Castle.

---

## 7. Mobile-First Rules

- All layouts start mobile. Desktop is enhancement.
- Hero CTA visible without scroll on 375px screen.
- 3-tap rule: Home → Book → Confirm.
- Touch targets minimum 44px.
- Leaflet: `scrollWheelZoom: false` on mobile.

---

## 8. Animation Components (21st.dev — adapt, do not install)

- **Hero** (`Hero_Animated_Pictures.txt`) — overlapping image cards right, hover tilt, grid background overlay via `--border` CSS var
- **Testimonials** (`Animated_Testimonial.txt`) — auto-rotate 6s, dot nav, scroll-triggered entrance, star ratings, initials fallback
- **Reveal Text** (`Reveal_Text.txt`) — spring-in letters on load, background image reveal on hover (use for "NORWICH")
- **Wave Text** (`wave_text.txt`) — letter bounce on hover with spring physics (nav links / CTA labels)

Source files in `_templates/`.

---

## 9. Do Not

- Do not use dark hero backgrounds (brand bg is `#FCFAF8`)
- Do not use em-dashes in any copy
- Do not write AI-sounding phrases
- Do not change nameservers until explicitly told to
- Do not modify the booking widget repo from the main site session
- Do not install 21st.dev as a package — adapt patterns manually
- Do not use stock tourism photography — use authentic Norwich architectural photography

---

## 10. Pending / TODO

**Completed (April 2026 launch):**
- [x] Favicon: `public/favicon.svg` (primary) + `public/Favicon.png` fallback
- [x] OG image: `public/og-image.jpg` (1200×630), referenced in `app/layout.tsx`
- [x] Vercel env vars set (Supabase + Resend)
- [x] DNS cutover: Namecheap → `ns1/ns2.vercel-dns.com`. Site is live.
- [x] GTM `GTM-PTF5DB67` + GA4 `G-75NZL8LFG9` wired up with Consent Mode v2
- [x] `subscribers` table created in Supabase with RLS INSERT policy
- [x] GDPR marketing consent checkbox on homepage subscribe form (client + server validation)
- [x] Zoho inbound MX records in Vercel DNS + clean root SPF for Zoho (region corrected to `.eu` on 2026-04-14)
- [x] **GTM Consent Mode v2 — region-aware defaults + working gtag update** (fixed 2026-04-15). EEA/GB/CH default denied; rest of world analytics granted. `CookieConsent.tsx` now uses proper `gtag('consent', 'update', …)` with `arguments` object. GA4 receiving events; GTM Container Quality should clear within 48h.
- [x] **Sitemap + robots confirmed healthy** (reviewed 2026-04-15). `app/sitemap.ts` covers all 7 pages with sensible priorities; `app/robots.ts` points to it.
- [x] **Google Search Console set up** (2026-04-15). Domain property verified via DNS TXT. Sitemap `sitemap.xml` submitted. GA4 ↔ GSC associated. Homepage Live URL test returns "Page can be indexed" + "URL is available to Google". Prior "noindex" / missing robots.txt flags were stale crawl data from pre-DNS-cutover (Apr 3) and cleared on re-inspection. Indexing requested for homepage; other 6 pages to be discovered via sitemap. Still pending: link GSC ↔ Google Business Profile once GBP exists.
- [x] **JSON-LD schema cleanup** (2026-04-15). Removed malformed nested `Event` block (was missing required `startDate`/`location` — wrong shape for a near-daily recurring tour anyway). Removed self-served `aggregateRating` from both `TouristAttraction` and `LocalBusiness` (no real reviews yet → Google policy violation risk). Added `image` to `LocalBusiness` pointing at `/og-image.jpg`. Removed empty-string `telephone`. Result in Rich Results Test: 2 clean entities, 0 critical errors, 1 optional "telephone missing" warning (intentional — waiting on business WhatsApp number).
- [x] **Social handles reserved + Footer icons wired** (2026-04-15). Instagram, TikTok, Facebook all registered as `@norwichfreewalkingtours`. `components/Footer.tsx` now renders all three as a pill-row of inline-SVG brand icons (lucide-react dropped `Instagram`/`Facebook` exports for trademark reasons, so we inline all three for consistency). `sameAs` in JSON-LD updated with all three profile URLs for Knowledge Panel entity linking. Pinterest not yet reserved.

**Still pending — near-term (pre / at launch):**

_Launch admin:_
- [ ] **Launch badge:** remove "Coming May 2026" badge from Hero (`components/Hero.tsx` ~line 98) on launch day (tours start May 2026).
- [ ] **Testimonials:** populate `components/Testimonials.tsx` with Google Reviews once tours are live, then add alongside or replace `<WhyNorwich />`. Also the moment to add `aggregateRating` + `review` objects back into JSON-LD (removed 2026-04-15 because self-serving without real reviews is against Google policy).
- [ ] **Private Tours pricing:** add "From £X" anchor on `/private-tours` once pricing decided.
- [ ] **Contacts table (Supabase):** architectural decision pending. See Section 11. Currently using `subscribers` table for homepage signups only.
- [ ] **Contact form email bounce:** still unresolved — Zoho EU rejects Resend-sent mail with `554 5.7.7 Email policy violation` (suspected self-spoof check). Next steps: (1) test `From: onboarding@resend.dev` in `app/api/contact/route.ts` to confirm hypothesis; (2) either add Resend IPs / `send.` subdomain to Zoho trusted-senders in `mailadmin.zoho.eu` (do NOT use generic Allowed List — became exclusive last time and broke Hotmail), or verify `send.norwichfreewalkingtours.co.uk` in Resend and send from `noreply@send.…`.
- [ ] **Google Business Profile:** create + verify listing for Norwich Free Walking Tour. Category: Tour agency (primary); Walking tour, Tourist attraction (secondary). Service area: Norwich city centre. Address pin: The Forum, Millennium Plain, Norwich NR2 1TF. Booking link: `/book`. Description and bio copy drafted 2026-04-15 (Lincoln-style warm paragraph + 11 stops, entity keywords woven in). Link GBP ↔ Search Console + GA4 after verification.
- [ ] **Pinterest account:** `@norwichfreewalkingtours` (IG/TikTok/FB reserved 2026-04-15 but Pinterest not yet). Once reserved, add a fourth icon to `components/Footer.tsx` and a fourth URL to JSON-LD `sameAs` in `app/layout.tsx`. Pinterest content plan: vertical (1000×1500) pinnable cards with text-overlay on Norwich photos.
- [ ] **Bio / profile link UTMs:** every social bio link back to the site must carry `?utm_source={instagram|tiktok|facebook|pinterest}&utm_medium=social&utm_campaign=bio`. Document the final set of bio URLs in a memory record once all platforms live.
- [ ] **GA4 outbound-click event via GTM:** Footer social icons carry no UTMs on outgoing URLs (correct — UTMs are for inbound links). Set up a GTM trigger (Click - Just Links, regex match for `instagram.com|tiktok.com|facebook.com|pinterest.com`) → GA4 event `outbound_social_click` with platform as a parameter. Lets us see which channels visitors click through to without relying on each platform's own analytics.
- [ ] **Public liability insurance:** review UK options for guided walking tours. Target £2m–£5m cover. Quote-compare: PGL (tour-guide specialist), Hiscox, Simply Business, Protectivity, Insure4Sport. Check: premium, cover limits, whether overseas visitors are included, whether pay-as-you-want model affects classification.

_Technical (from April 2026 site review):_
- [ ] **T1. Dynamic-import Leaflet** in `components/TourMap.tsx` via `next/dynamic({ ssr: false })`. Saves ~80 KB from initial JS bundle.
- [ ] **T2. Hero background via `next/image`** instead of CSS `background-image`. `Hero.tsx` currently loads `pottergate-stock.png` raw — no webp/avif, no `sizes`, no priority hint. Apply same treatment to any other PNGs >50 KB in `/public/images/`.
- [ ] **T3. Add `loading.tsx` + `error.tsx`** for `/book` and `/tour`. Booking iframe (`norwich-booking.vercel.app`) currently has no fallback on slow load or failure.
- [ ] **T4. Tighten CSP** in `next.config.mjs` — remove `'unsafe-eval'` from `script-src`, narrow `connect-src` to required endpoints only.
- [ ] **T5. Add `public/.well-known/security.txt`** with disclosure contact (likely `hello@norwichfreewalkingtours.co.uk`) and policy link.
- [ ] **T6. Respect `prefers-reduced-motion`** in `Hero.tsx`, `PhotoShowcase.tsx` and any other Framer Motion components. `globals.css` has the media query but the JS components ignore it. WCAG AA requirement.
- [ ] **T7. Preload Caveat font** in `app/layout.tsx` — used in hero headline, currently can FOIT on first paint.
- [ ] **T8. Error monitoring** — add Sentry (free tier) or enable Vercel's built-in observability so failed Resend / Supabase calls + client-side exceptions surface automatically.
- [ ] **T9. Rate-limit `/api/subscribe` and `/api/contact`** — Vercel or Upstash rate limiter, e.g. 5 submissions per IP per minute. Honeypot helps but doesn't stop burst abuse.
- [ ] **T10. Inline email validation on contact form** — `type="email"` + aria-describedby error state so bad emails fail client-side, not server-side.
- [ ] **T11. Remove unused `@next/third-parties`** from `package.json` — imported but never used (GTM is wired manually).
- [ ] **T12. Audit colour contrast on button hover/focus states** — base green CTA passes WCAG AA 4.5:1 but hover/focus states not verified.
- [ ] **T13. Booking iframe mobile scroll** in `app/book/page.tsx` — verify on a real phone; if the widget grows beyond its fixed height, users may not be able to scroll inside. Consider `scrolling="yes"` or auto-resize script.

_Marketing — near-term:_
- [ ] **M3. Replace stock photography with authentic tour photos** once tours run (target June 2026 onwards). Guest shots, guide in action, weather variety. Update Hero, `PhotoShowcase`, `HowItWorks`, per-stop pages.
- [ ] **M4. FAQPage JSON-LD** in `components/FAQ.tsx` (separate from existing TouristAttraction schema in `app/layout.tsx`). Unlocks rich FAQ accordions in Google SERP — typically +10–20% CTR.
- [ ] **M5. Verify "As seen in" publication quotes** in `lib/whyNorwich.ts` — confirm Country Living / Times / Condé Nast / UNESCO are tour-specific or Norwich-general. Adjust wording for accuracy (e.g. "Norwich featured in…") and add genuine tour press post-launch.
- [ ] **M8. Group size line** — add "Limited to 15 per tour to keep the group walkable" to Hero / Practical Info. Honest scarcity signal.
- [ ] **M10. Sticky mobile book CTA audit** — verify `<StickyBookCTA />` actually shows and doesn't lag on scroll on a real phone. Mobile = 70%+ of traffic.
- [ ] **M12. OG image upgrade** — replace generic `public/og-image.jpg` with a guide-on-Elm-Hill (or similar) shot once real tour photos exist. Dependent on M3.

**Longer-term / post-launch iteration:**
- [ ] **M1. Meet Your Guide page** (`/about-the-guide`) — headshot, 2–3 paragraph story, favourite stop, Q&A section. Biggest trust gap on the site today.
- [ ] **M6. Per-stop deep-dive pages** — decision deferred until Search Console has ~4–6 weeks of impression data post-GSC setup. Pick the 2 stops with highest impressions and lowest average position (signal Google is already ranking us for that query but we're not top — a dedicated page pushes us up). Candidates to watch: Elm Hill, Norwich Cathedral, Norwich Castle, The Norwich Lanes, Norwich Market, Tombland. Target format once picked: ~500 words each, per-stop OG image, internal links from `/tour`.
- [ ] **M7. Blog / editorial section** — pillar post "Norwich city guide"; long-tail: "Things to do in Norwich", "Norwich for families", "Norwich in the rain", "Self-guided Norwich walk". Monthly cadence, feeds the email list.
- [ ] **M9. Hotel / concierge partnership sheet** — printable A5 PDF for hotel front desks with QR → `/book`. Distribute to Norwich hotels, hostels, B&Bs.
- [ ] **M11. Press kit page** (`/press`) — brand assets, guide bio, high-res photos, quote sheet. Makes journalist coverage frictionless.
- [ ] **M15. Seasonal landing pages** — "Norwich in spring / autumn" etc. Decision deferred until Search Console data shows which seasonal queries are getting impressions.

---

## 11. Supabase / Email Architecture

**Project:** `https://qjinckfpvuoxllpwcadw.supabase.co`
**Anon key:** in `.env.local` (gitignored) — INSERT-only via RLS policy.
**Client:** `lib/supabase.ts` — server-side only, `persistSession: false`.

### Current state
- `app/api/subscribe/route.ts` — inserts into `subscribers` table (`email`, `source: "homepage"`), handles `23505` unique-violation as silent success, fires Resend notification only for new subscribers. **Requires `consent: true` in the request body** — rejects 400 otherwise (UK/EU GDPR opt-in requirement).
- `components/EmailCapture.tsx` — renders a required consent checkbox with a link to `/privacy`; submit button disabled until ticked.
- `lib/supabase.ts` — lazy Supabase client getter; returns `null` if env vars absent (falls back gracefully).
- **`subscribers` table is live in Supabase** with RLS INSERT-only policy. Email capture is functional.

### Deployment pipeline — do not skip
- Env var changes in Vercel **do not apply to existing deployments** — always redeploy (Deployments → latest → ⋯ → Redeploy) after editing env vars.
- The Supabase anon key is a JWT (`header.payload.signature`) — paste all three dot-separated parts. Pasting only the signature returns **401** from PostgREST.
- DNS (Vercel → Domains → DNS): root SPF is `v=spf1 include:zoho.eu ~all` (Zoho outbound via `hello@`, EU region). Resend's SPF lives on the `send` subdomain and must not be added to the root. `~all` is terminal — nothing after it parses.
- Zoho region is **`.eu`** (corrected 2026-04-14 — earlier docs incorrectly said `.com`). Admin console: `mailadmin.zoho.eu`. MX records: `mx.zoho.eu` (10), `mx2.zoho.eu` (20), `mx3.zoho.eu` (50).
- **Git CLI on Tom's Windows machine has no user identity configured globally** — he commits via GitHub Desktop / VS Code. Repo-local config was set 2026-04-15: `user.name="Tom Thornhill"`, `user.email="tomthornhill@hotmail.co.uk"` (lives in `.git/config`, scoped to this repo only).
- **Always run `npm run build` locally before `git push`.** Vercel fails builds on TS/ESLint errors that `next dev` silently tolerates. Two failed production deploys this session caught by running local build afterwards.

### Pending architectural decision — Unified contacts table
Tom asked whether to unify mailing-list signups + booking customers into a single `contacts` (email list) table rather than a standalone `subscribers` table.

**Recommendation (agreed, pending Tom's confirmation):**
- One `contacts` table with `marketing_opt_in BOOLEAN DEFAULT FALSE` and `marketing_opt_in_at TIMESTAMPTZ`.
- `bookings` table gets a FK to `contacts.id` (or we join on email).
- Booking = transactional consent only. Marketing opt-in requires explicit checkbox (unticked by default) at booking, or homepage sign-up form.
- GDPR/PECR UK law: booking email ≠ marketing consent. Must keep separate flags.
- `unsubscribe_token UUID DEFAULT gen_random_uuid()` for one-click unsubscribe links.

**Information needed before building:**
1. Schema of existing `bookings` table (run `\d bookings` in Supabase SQL Editor).
2. What `email_preferences` table currently does in booking widget (tracks transactional opt-outs?).
3. Tom's decision: implement cross-repo now, or marketing site first then migrate booking widget later?

### Suggested `contacts` table SQL (draft — do not run until decision confirmed)
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  first_source TEXT,  -- 'homepage_signup' | 'booking' | 'contact_form'
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  marketing_opt_in_at TIMESTAMPTZ,
  marketing_opt_out_at TIMESTAMPTZ,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_contacts"
  ON contacts FOR INSERT TO anon WITH CHECK (true);
```

---

## 12. Deployment — Current State

Site is **live** at `https://www.norwichfreewalkingtours.co.uk` as of April 2026.

| Item | Status |
|---|---|
| Vercel env vars | Done |
| Supabase `subscribers` table + RLS | Done |
| Resend domain verified | Done |
| Favicon + OG image | Done |
| GTM `GTM-PTF5DB67` + GA4 `G-75NZL8LFG9` | Done |
| DNS cutover (Namecheap → Vercel) | Done |
| www canonical with root redirect | Done |

Booking widget hosted separately at `https://norwich-booking.vercel.app/` (repo: `thornhilltp/norwich-booking`). Embedded via `<iframe>` in both `/book` page and Hero widget slot. Do not modify the booking widget from this repo session.
