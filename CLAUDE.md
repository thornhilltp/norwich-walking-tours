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
- [x] Zoho inbound MX records in Vercel DNS + clean root SPF for Zoho

**Still pending:**
- [ ] **Launch badge:** remove "Coming May 2026" badge from Hero (`components/Hero.tsx` ~line 98) on launch day (tours start May 2026).
- [ ] **Testimonials:** populate `components/Testimonials.tsx` with Google Reviews once tours are live, then add alongside or replace `<WhyNorwich />`.
- [ ] **Instagram handle:** set up official account, update Footer link (currently `@norwichfreetour`).
- [ ] **Private Tours pricing:** add "From £X" anchor on `/private-tours` once pricing decided.
- [ ] **Contacts table (Supabase):** architectural decision pending. See Section 11. Currently using `subscribers` table for homepage signups only.

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
- DNS (Vercel → Domains → DNS): root SPF is `v=spf1 include:zoho.com ~all` (Zoho outbound via `hello@`). Resend's SPF lives on the `send` subdomain and must not be added to the root. `~all` is terminal — nothing after it parses.
- Zoho region is **`.com`** (not `.eu`). MX records: `mx.zoho.com` (10), `mx2.zoho.com` (20), `mx3.zoho.com` (50).

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
