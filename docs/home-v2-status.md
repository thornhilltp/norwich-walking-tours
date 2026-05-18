# /home-v2 Status — Handoff Notes

> Experimental homepage rebuild. Lives on branch `claude/suspicious-poitras-e6b805`, deployed only to Vercel preview, `noindex`'d so Google won't crawl it. Production `/` is untouched until explicit merge to `main`.

**Latest commit:** `ec9fc9e` (WalkingPattern visibility bump). Working state.
**Preview:** https://norwich-walking-tours-git-cl-6e7397-tomthornhill-7302s-projects.vercel.app/home-v2
**Local:** `http://localhost:3000/home-v2` (run `npm install && npm run dev` in this worktree first)

---

## Section order (top → bottom)

1. **HeroV2** — brand H1, Lora→Caveat subhead, booking widget right, partner logos, secondary "or see where we go" anchor link. Grid overlay + wave divider killed per audit.
2. **PhotoShowcaseV2** — "Norwich walking tour" eyebrow + Lora→Caveat H2 + 3 image-pill-title cards with green pin labels. Replaces the old interactive accordion.
3. **TestimonialsV2** — Lora→Caveat H2 + **dual rating blocks** (Google G logo + 4.9 from 19 + TripAdvisor owl + 5.0 from 9). 2x2 review grid below. Both platforms link out.
4. **ThemedRouteSection** — 3 themed pin-drop groups with wiggly green dashed thread connecting them, PNG route map on right. Replaces the 12-stop numbered list — names appear inline within each group so SEO entity signals stay on the page.
5. **AboutSectionV2** — polaroid-style Tom portrait (uses `/images/tom-portrait.jpg`) with "that's me, hi" handwritten note + "Tom, mostly." Caveat→Lora heading + first-person 3-paragraph story + green Book a morning CTA + italic "or email me direct" + Caveat signature.
6. **BookingSectionV2** — "Pick a date" eyebrow + "Free to book. / Tip what it was worth." Lora→Caveat heading + 3 check bullets + merit-based foot quote + real `BookingFrame` iframe right. Logistics line ("Tours leave The Forum daily…") dropped — redundant with Hero badge.
7. **FAQ** (shared component) — with custom Lora→Caveat heading via new `customHeading` prop. Default heading unchanged so `/` stays bit-identical.
8. **Internal-link row** — inline in page.tsx — `More on Norwich: The full tour · What is a free tour? · Free things to do · More articles`. Recovers link equity to /explore + /things-to-do/free that the old LocalGuidesTeaser carried.
9. **EmailCapture** (shared) — unchanged.
10. **Footer** (shared) — unchanged.

**Plus fixed overlays:**
- **WalkingPattern** (`app/home-v2/_components/WalkingPattern.tsx`) — fixed body bg with SVG tile of wandering dashed green footpaths + scattered pace dots. Currently at opacity 0.14/0.18 (pass 3 after over/under-shooting).
- **ScrollTrail** (`app/home-v2/_components/ScrollTrail.tsx`) — fixed right-edge nav, hidden below 1280px. 7 dots (Hello · Stories · Reviews · The walk · Tom · Book · FAQs), wiggly Q-curve dashed line connecting them, animated travelling map-pin that slides down with scroll progress (spring-eased via framer-motion).

---

## V2 component inventory

| File | Purpose |
|---|---|
| `app/home-v2/page.tsx` | Page orchestration, section order, FAQ custom heading, internal-link row |
| `app/home-v2/_components/HeroV2.tsx` | Hero with image bg + booking widget + brand H1 + Lora→Caveat subhead + secondary anchor link |
| `app/home-v2/_components/PhotoShowcaseV2.tsx` | 3 local-recs cards (image + pill label + Lora title + body + Caveat pin label) |
| `app/home-v2/_components/TestimonialsV2.tsx` | Dual Google+TripAdvisor rating anchors + 2x2 review grid |
| `app/home-v2/_components/ThemedRouteSection.tsx` | 3 themed groups with pin markers + wiggly thread + PNG map |
| `app/home-v2/_components/AboutSectionV2.tsx` | Polaroid portrait + "Tom, mostly." first-person story + signature |
| `app/home-v2/_components/BookingSectionV2.tsx` | Dedicated booking surface with iframe + bullets + merit quote |
| `app/home-v2/_components/ScrollTrail.tsx` | Fixed right-edge nav with pin marker + wiggly line |
| `app/home-v2/_components/WalkingPattern.tsx` | Fixed body bg footpaths SVG tile |
| `app/home-v2/_components/PracticalInfoV2.tsx` | **Not imported** — kept on disk in case we want it back. Was redundant with Hero badge + Booking lede + Footer + FAQ |

---

## Design language signatures

1. **Lora-bold → Caveat-green inline H2 pattern** — used on every H2: Hero subhead, PhotoShowcase, Testimonials, About, Booking (reverse: Caveat→Lora for "Free to book." / "Tip what it was worth."), FAQ. Distinctive brand rhythm.
2. **Pin-drop motif** — ScrollTrail pin + ThemedRoute group markers + Caveat handwritten labels. Brand language of "walking through Norwich".
3. **Wiggly dashed green threads** — ScrollTrail line + ThemedRoute connector + WalkingPattern bg footpaths. Echoes the hand-drawn map's dashed route line.
4. **Polaroid framing** — used in About for Tom's portrait. Could extend if needed (was in earlier explorations).
5. **Dual platform rating blocks** — Google + TripAdvisor side-by-side. "Verified on two independent platforms" social proof.

---

## Brand rules in force

| Element | Rule |
|---|---|
| Colours | `#FCFAF8` bg only · `#2DA96B` accent · `#E8F8F1` light green · `#FFFFFF` white · `#1A1A1A` text · `#1F8054` darker green for small text contrast (new `text-brand-accent-text` utility in globals.css) |
| Fonts | Caveat + Lora **only**. No exceptions. |
| Logo | Never on dark backgrounds. |
| Voice | "Local friend, not tour guide". No em-dashes. No AI vocab ("delve", "tapestry", "vibrant"). Short punchy sentences. |
| "Real" framing | OK in Hero subhead + Footer tagline only. Avoid in headings/eyebrows. |
| Pay framing | "Tip what it was worth at the end" (not "pay what you want"). Range £10-£20 (canonical). |

---

## Decisions made (with rationale)

| Decision | Rationale |
|---|---|
| **Keep brand H1 in Hero** | Tom's call — wanted brand recognition above the value prop |
| **Drop PracticalInfo standalone band** | Hero badge + Booking lede + Footer + FAQ already cover all the facts. Was padding, not earning. |
| **Tip range £10-£20** | Matches booking widget + HowItWorks + FAQ. CLAUDE.md previously said £15-£20 (wrong, corrected). |
| **Hybrid themed route over 12-stop list** | Stop names mean nothing to non-Norwich tourists. 3 themed groups (medieval / independent / hidden stories) sell the experience while embedding the stop names for SEO. |
| **Dual Google + TripAdvisor ratings** | Tom has 19 Google reviews at 4.9 + 9 TripAdvisor reviews at 5.0. Both platforms = stronger social proof. |
| **No third font** | JetBrains Mono recommended for ScrollTrail labels was declined — Caveat+Lora only per brand rule. ScrollTrail uses Lora caps tracked. |
| **WalkingPattern + ScrollTrail** | Adapted from "claude design" recommendation. Visual extension of the hand-drawn map's footpath motif. |

---

## Audits completed (this session)

| Skill | Status | Key findings status |
|---|---|---|
| `marketing:seo-audit` | ✓ Run | All P0 + P1 shipped |
| `ai-seo` | ✓ Run | FAQPage on /what-is-a-free-tour shipped; llms.txt + sitemap + Person schema deferred (affects /) |
| `marketing:brand-review` | ✓ Run | Used for original copy review |
| `ui-ux-pro-max` | ✓ Run | Hierarchy fixes shipped |
| `frontend-web` | ✓ Run | Original design explorations (4 directions) |
| `anthropic-skills:humanizer` | ✓ Run (parallel batch) | Meta line cut, copy cleaned, cliche replaced |
| `design:accessibility-review` | ✓ Run (parallel batch) | Eyebrow contrast fix via `text-brand-accent-text`, Hero overlay bumped to /75, BookingFrame title already present |
| `anthropic-skills:web-design-guidelines` | ✓ Run (parallel batch) | Killed Hero grid + wave divider, swapped BookingSection heading order |
| `design:design-critique` | ✓ Run (parallel batch) | Confirmed brand H1 weakness (Tom overruled), structural recs |

---

## Deferred — would affect main `/`

These are shipped-ready fixes that were held back because they'd change shared files / production behaviour:

| Fix | Why held | Scope |
|---|---|---|
| `/llms.txt` £15→£10 figure | Shared file. Affects AI agent summaries on /. | Edit `public/llms.txt`, ~2 min |
| `sitemap.ts` add `/what-is-a-free-tour` | Shared sitemap. Currently page exists but isn't in canonical discovery. | Edit `app/sitemap.ts`, ~1 min |
| `layout.tsx` Person schema for Tom | Shared layout. Affects JSON-LD on every page. | Add Person entity linked to LocalBusiness, ~5 min |
| `components/Nav.tsx` section anchors | Shared Nav. Would add wayfinding to top nav globally. | Add anchor menu items, ~10 min |
| Standardize muted text colour site-wide | Globals.css change | ~5 min |
| Standardize border radii (rounded-md vs xl vs 2xl mixed) | Multiple shared components | ~15 min |

Ship these when ready to promote /home-v2 to / — they benefit the whole site.

---

## Known gotchas

1. **BookingFrame iframe shows broken on localhost** — the booking widget is hosted at norwich-booking.vercel.app and doesn't load over local dev. Works fine on Vercel preview.
2. **`/home-v2` has noindex** — `export const metadata = { robots: { index: false, follow: false } }` in page.tsx. Remove when promoting to /.
3. **ESLint config** — `.eslintrc.json` now has `"root": true` (added this session) so local lint matches Vercel's strict config. Was previously silently dropping rules due to parent-dir conflict.
4. **TripAdvisor URL hardcoded** in TestimonialsV2 — uses `tripadvisor.com/Attraction_Review-g186342-d34359588-Reviews-Norwich_Free_Walking_Tours-…` from WebSearch. **Verify this is the correct listing** before promoting.
5. **TripAdvisor logo** is an inline SVG owl approximation (green circle + two-eye silhouette). Not official asset. Replace with licensed PNG/SVG if needed.
6. **`tripAdvisorStats` hardcoded** in TestimonialsV2 (rating, count, profileUrl). Promote to `lib/testimonials.ts` when shared (currently scoped to V2 per "no main page changes" rule).
7. **Dev server / `npm run build` contention** — running both simultaneously corrupts `.next` cache. Stop dev server before running production build.
8. **Worktree node_modules** — separate from main repo. Run `npm install` here if not done.

---

## How to ship `/home-v2` → `/` when ready

1. **Final approval pass** — get user testing feedback on the preview URL, iterate as needed.
2. **Promote V2 components** — rename out of `app/home-v2/_components/` into `components/`, drop the `V2` suffix. Update imports.
3. **Promote data** — move `tripAdvisorStats` from TestimonialsV2 inline → `lib/testimonials.ts`.
4. **Swap page** — copy `app/home-v2/page.tsx` content into `app/page.tsx`, adjust imports. Delete `app/home-v2/` folder.
5. **Remove noindex** — drop the `robots: { index: false }` metadata export.
6. **Ship the deferred items** — see "Deferred" table above. Especially `/llms.txt`, `sitemap.ts`, Person schema.
7. **Update CLAUDE.md** — refresh §4 (Pages), §10 (Pending/TODO) with new state.
8. **Merge branch to main** — production deploys via Vercel.

---

## Outstanding questions for next session

- Has Tom test-shared `/home-v2` with anyone? Feedback?
- Verify TripAdvisor URL is the correct listing
- Decide on "or email me direct" link target on About — currently `/contact`. Could be `mailto:hello@norwichfreewalkingtours.co.uk` for true "direct".
- Decide whether to use official TripAdvisor logo asset vs current inline approximation
- ScrollTrail mobile behaviour — currently hidden below 1280px. Could add a horizontal scroll-progress bar at top instead, or leave as-is.

---

## Suggested next-session prompt

> Continuing /home-v2 work. Read `docs/home-v2-status.md` for full context. Today I want to: [your specific ask].
