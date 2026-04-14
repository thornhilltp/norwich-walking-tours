# CLAUDE.md — Norwich Free Walking Tour Website
> Source of truth for all Claude Code sessions. Read this before touching any file.

---

## 1. Project Overview

Mobile-first marketing website for the **Norwich Free Walking Tour** ("The Real Norwich" Essentials Tour). Revenue model: pay-as-you-want. Goal: drive daily bookings and rank top for AI travel queries about Norwich.

**Repos:** Main site `thornhilltp/norwich-walking-tours` · Booking widget `thornhilltp/norwich-booking`
**Hosting:** Vercel (both) · **Domain:** Namecheap — do NOT change nameservers until site is ready (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)

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

**Windows casing:** `Components/` and `components/` are the same on Windows. Template .txt files live in `_templates/`. `tsconfig.json` has `forceConsistentCasingInFileNames: false` and excludes `Skills/`, `_templates/`.

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
Sections in order:
1. **Hero** — split layout (text left, image right with green accent block). `FinancialHero` animation pattern.
2. **Trust bar** — "Daily. Rain or shine. £0 upfront. Cards accepted."
3. **How it works** — 3 steps: Show up at The Forum → Walk 1h 45m → Pay what it was worth
4. **Why Norwich** — publication quotes (Country Living, The Times, Condé Nast, UNESCO). Replaces Testimonials pre-launch. `Components/WhyNorwich.tsx` + data in `lib/whyNorwich.ts`.
5. **Tour stops map** — Leaflet.js, 10 numbered stops, dashed green route, click reveals stop name + teaser
6. **FAQ** — exact copy in `/components/FAQ.tsx`. Do not rewrite without instruction.
7. **Email capture** — `Components/EmailCapture.tsx`. POSTs to `/api/subscribe` (Resend notification to hello@). Honeypot + 3/10-min rate limit.
8. **Footer** — logo, nav, "Support the Guide" QR/link, social links

### `/tour` — The Tour
10 stops with 2-3 sentence stories. Logistics: meeting point (The Forum), 1h 45m, daily, relaxed pace, what to wear.

### `/book` — Book
`<iframe src="[WIDGET_VERCEL_URL]" />` — minimal surrounding page. Reinforce: "£0 to join. Pay at the end by card, Apple Pay or Google Pay."

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

- [ ] **Testimonials:** populate `Components/Testimonials.tsx` with Google Reviews once tours are live, then swap `<WhyNorwich />` back in or run both on home page.
- [ ] **Instagram handle:** set up official account, update Footer link (currently `@norwichfreetour`).
- [ ] **Private Tours pricing:** add "From £X" anchor on `/private-tours` once pricing decided (likely tiered by group size + duration).
- [ ] **Launch flag:** remove "Coming May 2026" badge from Hero (`components/Hero.tsx` ~line 97) on launch day.
- [ ] **GTM / Resend / DNS cutover:** see `LAUNCH-CHECKLIST.md` at repo root.
- [ ] **Favicon:** add `public/favicon.jpeg` (green map-pin icon) — launch blocker.
- [ ] **OG image:** add `public/og-image.jpg` (1200×630 branded) and reference in `app/layout.tsx` `openGraph.images` — launch blocker.
- [ ] **Contacts table (Supabase):** architectural decision pending. See Section 11.

---

## 11. Supabase / Email Architecture

**Project:** `https://qjinckfpvuoxllpwcadw.supabase.co`
**Anon key:** in `.env.local` (gitignored) — INSERT-only via RLS policy.
**Client:** `lib/supabase.ts` — server-side only, `persistSession: false`.

### Current state
- `app/api/subscribe/route.ts` — inserts into `subscribers` table (`email`, `source: "homepage"`), handles `23505` unique-violation as silent success, fires Resend notification only for new subscribers.
- `lib/supabase.ts` — lazy Supabase client getter; returns `null` if env vars absent (falls back gracefully).
- **The `subscribers` table does NOT exist yet.** SQL must be run in Supabase SQL Editor before the subscribe endpoint will work.

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

## 12. Vercel Deployment Checklist

See `LAUNCH-CHECKLIST.md` for full detail. Key steps before DNS cutover:

1. **Vercel env vars** (Production + Preview): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`.
2. **Supabase table** created (`contacts` or `subscribers` — pending decision) with RLS INSERT policy.
3. **Resend domain** `norwichfreewalkingtours.co.uk` shows "verified" in Resend dashboard.
4. **Favicon + OG image** added to `/public/`.
5. **GTM container** `GTM-PTF5DB67` published (not just Preview) with GA4 tag `G-75NZL8LFG9`.
6. **Preview URL smoke test** — all pages, booking iframe, contact form, subscribe form.
7. **DNS cutover:** Namecheap → `ns1.vercel-dns.com` / `ns2.vercel-dns.com` only after preview passes.
