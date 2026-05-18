# /home-v2 Status — Handoff Notes

> Experimental homepage rebuild. Lives on branch `claude/suspicious-poitras-e6b805`, deployed only to Vercel preview, `noindex`'d so Google won't crawl it. Production `/` is untouched until explicit merge to `main`.

**Latest commit:** `8e00fb5` (SEO + AI data updates: llms.txt, sitemap, Person schema).
**Preview:** https://norwich-walking-tours-git-cl-6e7397-tomthornhill-7302s-projects.vercel.app/home-v2
**Local:** `http://localhost:3000/home-v2` (run `npm install && npm run dev` in this worktree first)

---

## Section order (top → bottom)

1. **HeroV2** — `id="top"`. Brand image bg, dark overlay (75%). H1 is the value prop, NOT the brand name (dropped — brand lives in nav + title + JSON-LD). H1 reads: *"See Norwich with"* [Lora bold white] / *"someone who lives here."* [Caveat green, very large]. Badge above H1: "Tours run daily · 1h 45m". CTA + secondary "or see where we go" link. Booking widget right column. Partner logos below. No grid overlay, no wave divider (killed per audit).
2. **RouteDivider** — thick wandering green dashed line between sections.
3. **PhotoShowcaseV2** — `id="stories"`. "Norwich walking tour" eyebrow + Lora→Caveat H2 *"Local recommendations to help you make the most of Norwich."* + customer quote pull-out *"It's like a walking visitor centre with a local. — what guests say"* + horizontal 4-benefit row (Best places to eat & drink · Photo spots · Stories & history · Corners you'd otherwise miss) + 3 equal-weight cards (Overview / List to come back to / Local to ask) + "Already a Norwich local?" italic aside.
4. **RouteDivider**.
5. **TestimonialsV2** — `id="reviews"`. Lora→Caveat H2 *"What people said after."* + subtitle *"What guests say about the Norwich walking tour and the local tips that come with it."* + **dual rating blocks** (Google G logo + 4.9 from 19 reviews + TripAdvisor owl + 5.0 from 9 reviews — side-by-side desktop, stacked mobile, both clickable). 2×2 grid of all 4 real Google reviews. Centred "Read all on Google / TripAdvisor" links.
6. **RouteDivider**.
7. **ThemedRouteSection** — `id="tour-map"`. "The walk" eyebrow + Lora→Caveat H2 *"Three threads through the medieval city."* + 3 themed pin-drop groups (Medieval heart / Independent Norwich / Bits that aren't on the plaque) with vertical wiggly green dashed thread connecting them + PNG route map on right column. Each group has eyebrow + headline + stop names inline + body. "See every stop, in order…" link below.
8. **RouteDivider**.
9. **AboutSectionV2** — `id="tom"`. Polaroid-style portrait (`/images/tom-portrait.jpg`) with handwritten "that's me, hi" note + ABOUT eyebrow + Caveat→Lora H2 *"Tom, mostly."* + 3-paragraph first-person story + green "Book a morning" CTA + italic "or email me direct" link to /contact + Caveat handwritten signature.
10. **RouteDivider**.
11. **BookingSectionV2** — `id="book-section"`. Bg: light green tint. "Pick a date" eyebrow + Lora→Caveat H2 *"Free to book. Tip what it was worth."* + 3 check bullets (No card needed / £10 to £20 per person / Change or cancel anytime) + merit-based foot quote. Real `BookingFrame` iframe right column.
12. **FAQ** (shared component) — `id="faq"`. Custom Lora→Caveat heading via `customHeading` prop *"Everything you need to know."* — default heading on / unchanged.
13. **Internal-link row** — small centred text row: "More on Norwich: The full tour · What is a free tour? · Free things to do · More articles". Recovers link equity to /explore + /things-to-do/free.
14. **EmailCapture** (shared) — unchanged.
15. **Footer** (shared) — unchanged.

**Plus the right-edge fixed overlay:**
- **ScrollTrail** (`app/home-v2/_components/ScrollTrail.tsx`) — fixed right edge, hidden below 1280px. 7 dots (Hello · Stories · Reviews · The walk · Tom · Book · FAQs), wiggly Q-curve dashed line, animated travelling map-pin that slides down with scroll progress (spring-eased).

---

## V2 component inventory

| File | Purpose |
|---|---|
| `app/home-v2/page.tsx` | Page orchestration, section order, FAQ custom heading, internal-link row, RouteDivider placement |
| `app/home-v2/_components/HeroV2.tsx` | Hero with image bg + booking widget + value-prop H1 (Lora→Caveat) + secondary anchor link. **No `title` prop** (removed when brand H1 dropped) |
| `app/home-v2/_components/PhotoShowcaseV2.tsx` | Local-recs section: H2 + customer quote + 4-benefit row + 3 cards + aside. Pin row dropped (was duplicating ThemedRouteSection). |
| `app/home-v2/_components/TestimonialsV2.tsx` | Dual Google+TripAdvisor rating blocks + 2x2 review grid + dual "Read all on…" links. `tripAdvisorStats` hardcoded inline (promote to lib when shipping) |
| `app/home-v2/_components/ThemedRouteSection.tsx` | 3 themed groups with pin markers + vertical wiggly thread + PNG map |
| `app/home-v2/_components/AboutSectionV2.tsx` | Polaroid portrait + "Tom, mostly." first-person story + signature |
| `app/home-v2/_components/BookingSectionV2.tsx` | Dedicated booking surface with iframe + bullets + merit quote |
| `app/home-v2/_components/ScrollTrail.tsx` | Fixed right-edge nav with travelling pin + wiggly line |
| `app/home-v2/_components/RouteDivider.tsx` | Thick wandering green dashed line between sections. **Replaces WalkingPattern.** |
| `app/home-v2/_components/WalkingPattern.tsx` | **Deprecated** — body-wide pattern competed with text after 4 opacity iterations. Kept on disk with deprecation note. |
| `app/home-v2/_components/PracticalInfoV2.tsx` | **Not imported** — kept on disk in case useful later |

---

## Design language signatures

1. **Lora-bold → Caveat-green inline H2 pattern** — used on every H2: Hero, PhotoShowcase, Testimonials, Themed Route, About, Booking (reverse), FAQ. The signature visual rhythm.
2. **Pin-drop motif** — ScrollTrail travelling pin + ThemedRoute group markers + PhotoShowcase + About card pin labels (Caveat handwritten).
3. **Wiggly dashed green threads** — ScrollTrail vertical line + ThemedRoute connector + RouteDivider between sections. Echoes the hand-drawn map's dashed route.
4. **Polaroid framing** — used in About for Tom's portrait.
5. **Dual platform rating blocks** — Google + TripAdvisor side-by-side. "Verified on two independent platforms" social proof.
6. **Customer quotes as design moments** — "It's like a walking visitor centre with a local" pull-quote in PhotoShowcase. Use customer language wherever possible.

---

## Brand rules in force

| Element | Rule |
|---|---|
| Colours | `#FCFAF8` bg · `#2DA96B` accent · `#E8F8F1` light green · `#FFFFFF` white · `#1A1A1A` text · `#1F8054` darker green for small text contrast (utility class `.text-brand-accent-text` in globals.css) |
| Fonts | Caveat + Lora **only**. No third fonts. |
| Logo | Never on dark backgrounds. |
| Voice | "Local friend, not tour guide". No em-dashes. No AI vocab. Short punchy sentences. |
| "Real" framing | OK in Hero subhead + Footer tagline only. Avoid in headings/eyebrows. |
| Pay framing | "Tip what it was worth at the end" (not "pay what you want"). Range £10-£20 (canonical, now consistent everywhere). |

---

## Decisions made (with rationale)

| Decision | Rationale |
|---|---|
| **Drop brand H1 in Hero** | Originally kept per Tom's call; reversed after Tom reconsidered + all 4 audits had flagged this as #1 conversion lever. Brand still in nav, title, JSON-LD, footer. H1 now sells the offer. |
| **Drop PracticalInfo standalone band** | Hero badge + Booking lede + Footer + FAQ cover all the facts. Was padding. |
| **Tip range £10-£20** | Matches widget + HowItWorks + FAQ + TipAnchor. CLAUDE.md previously said £15-£20 (wrong, corrected; /llms.txt also corrected now). |
| **Hybrid themed route over 12-stop list** | Stop names mean nothing to non-Norwich tourists. 3 themed groups sell the experience while embedding stop names for SEO. |
| **Dual Google + TripAdvisor ratings** | 19 Google at 4.9 + 9 TripAdvisor at 5.0. Stronger together. |
| **No third font** | JetBrains Mono from design rec declined. Caveat + Lora only. |
| **RouteDivider replaces WalkingPattern** | Body-wide pattern competed with text legibility through 4 opacity passes. Between-section dashed dividers preserve atmosphere with zero legibility cost. |
| **PhotoShowcase: 4-benefit horizontal row instead of standalone bullets OR embedded bullets in Card 1** | Standalone bullets made the section heavy. Embedded in Card 1 broke grid symmetry. Horizontal row is a quick visual beat without either problem. |
| **"real Norwich" OK in Hero subhead + Footer only** | Memory rule flexibility. |
| **ScrollTrail uses Lora not JetBrains Mono** | Brand rule. |

---

## Audits completed this session

| Skill | Status |
|---|---|
| `marketing:seo-audit` | ✓ |
| `ai-seo` | ✓ |
| `marketing:brand-review` | ✓ |
| `ui-ux-pro-max` | ✓ |
| `frontend-web` | ✓ (original design refs) |
| `anthropic-skills:humanizer` | ✓ (parallel batch) |
| `design:accessibility-review` | ✓ (parallel batch) |
| `anthropic-skills:web-design-guidelines` | ✓ (parallel batch) |
| `design:design-critique` | ✓ (parallel batch) |

---

## Deferred items

Most previously-deferred items shipped in commit `8e00fb5`:
- ✓ `/llms.txt` £15→£10 fix + missing pages + Tom attribution + review counts
- ✓ `sitemap.ts` add `/what-is-a-free-tour`
- ✓ `layout.tsx` Person schema for Tom Thornhill (founder/guide) linked to LocalBusiness

**Still deferred:**

| Fix | Why held | Scope |
|---|---|---|
| `components/Nav.tsx` section anchors | Shared Nav. Would add wayfinding to top nav globally on all pages. | Add anchor menu items, ~10 min |
| Standardize muted text colour site-wide | Globals.css change | ~5 min |
| Standardize border radii (rounded-md vs xl vs 2xl mixed) | Multiple shared components | ~15 min |

These benefit / too when ready.

---

## Known gotchas

1. **BookingFrame iframe shows broken on localhost** — the booking widget is hosted at norwich-booking.vercel.app and doesn't load over local dev. Works fine on Vercel preview.
2. **`/home-v2` has noindex** — `export const metadata = { robots: { index: false, follow: false } }` in page.tsx. **Remove when promoting to /**.
3. **ESLint config** — `.eslintrc.json` has `"root": true` (added this session) so local lint matches Vercel's strict config. Was previously silently dropping rules due to parent-dir conflict — caused Vercel build failures that local builds didn't catch.
4. **Dev server + `npm run build` contention** — running both simultaneously corrupts `.next` cache (PageNotFoundError for /robots.txt, /explore, etc). Stop dev server before running production build.
5. **TripAdvisor URL hardcoded** in TestimonialsV2 — uses `tripadvisor.com/Attraction_Review-g186342-d34359588-Reviews-Norwich_Free_Walking_Tours-…` from WebSearch. **Verify this is the correct listing** before promoting.
6. **TripAdvisor logo** is an inline SVG owl approximation (green circle + two-eye silhouette). Not official asset. Replace with licensed PNG/SVG if needed.
7. **`tripAdvisorStats` hardcoded** in TestimonialsV2 (rating: 5.0, count: 9, profileUrl). Promote to `lib/testimonials.ts` when shared.
8. **Worktree node_modules** — separate from main repo. Run `npm install` here if not done.

---

## How to ship `/home-v2` → `/` when ready

1. **Final approval pass** — get user testing feedback on the preview URL, iterate as needed.
2. **Promote V2 components** — rename out of `app/home-v2/_components/` into `components/`, drop the `V2` suffix. Update imports.
3. **Promote data** — move `tripAdvisorStats` from TestimonialsV2 inline → `lib/testimonials.ts`.
4. **Swap page** — copy `app/home-v2/page.tsx` content into `app/page.tsx`, adjust imports + drop the `noindex` metadata export. Delete `app/home-v2/` folder.
5. **Verify against deferred fixes** — ship Nav anchors + muted colour standardisation + border radius standardisation as they affect / too.
6. **Update CLAUDE.md** — refresh §4 (Pages), §10 (Pending/TODO) with new state.
7. **Merge branch to main** — production deploys via Vercel.

---

## Outstanding questions for next session

- Has Tom test-shared `/home-v2` with anyone? Feedback?
- Verify TripAdvisor URL is the correct listing.
- Decide "or email me direct" link target on About — currently `/contact`. Could be `mailto:hello@norwichfreewalkingtours.co.uk` for true "direct".
- Decide whether to use official TripAdvisor logo asset vs current inline approximation.
- ScrollTrail mobile behaviour — currently hidden below 1280px. Could add a horizontal scroll-progress bar at top instead, or leave as-is.

---

## Suggested next-session prompt

> Continuing /home-v2 work. Read `docs/home-v2-status.md` for full context. Today I want to: [your specific ask].
