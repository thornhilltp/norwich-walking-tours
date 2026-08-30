# Spec — /best-in-norwich

Status: **LIVE at a hidden URL, rebuilt as two pages 2026-08-30.** Branch:
`claude/best-in-norwich-page-05e937`. See §9 for what is still open and §10 for what
shipped.

The page is live in the codebase but `CONTENT_READY = false` in
`lib/best-in-norwich.ts`, which keeps it `noindex` and out of the sitemap until the
real winners land. Nothing links to it from the nav yet.

One-off campaign page in the same mould as `/roys-plaza`: standalone, video-driven,
publicly indexable, funnels to the tour at the bottom. Two jobs on one page:

1. **Show the 2026 winners** — browsable award list, each winner links out to their site.
2. **Run the 2027 vote** — visitors vote on existing nominees and submit new ones.
   Sits at the top so people arriving from a video can vote without scrolling.

---

## 0. Where the content came from

Nothing named "Best in Norwich" existed in the repo before this build. Tom supplied ten
winners on 2026-08-23; categories were derived from them (see §9). Five of the ten were
already in `lib/guide-picks.ts` with photography, so those winner cards reuse the
existing images in `public/images/guide/`.

Still missing: runners-up, and a true account of how the winners were picked.

Nearest existing content is `lib/guide-picks.ts` (`/guide`, "Tom's Norwich"), which is
**noindex and unlisted**. Overlap is fine and expected, but keep the framings separate:
`/best-in-norwich` is a public awards page voted by other people, `/guide` is Tom's
private post-tour list. Because `/guide` is noindex, link one way only — `/guide` gets
a line pointing at the winners page, not the reverse.

---

## 1. Route, metadata, indexing

| Item | Value |
|---|---|
| Route | `app/best-in-norwich/page.tsx` (server component) |
| Canonical | `https://www.norwichfreewalkingtours.co.uk/best-in-norwich` |
| Title | `Best in Norwich 2026 \| The Winners, Picked By Locals` |
| Description | The best coffee, pasta, pizza, bakery and market stall in Norwich for 2026, picked by 25 locals. No fees, no sponsors. |
| OG image | new 1200x630 winners card — needs design |
| Sitemap | add, `priority: 0.8`, `changeFrequency: "weekly"` while voting is open |
| Robots | indexable once `CONTENT_READY = true`; `noindex, nofollow` until then |

"best in norwich", "best coffee in norwich", "best pub in norwich" are real queries with
real volume. This is the only one-off campaign page on the site with genuine SEO value.
Treat it as an evergreen asset that gets a yearly refresh, not a throwaway like
`/roys-plaza`.

---

## 2. Page structure (top to bottom)

Mirrors the `/roys-plaza` skeleton: hero + sticky widget in the right column,
alternating `bg-brand-bg` / `bg-brand-accent-light` bands, `section-padding` +
`brand-container`, Lora→Caveat split headings, `<Footer />` last.

### 2.1 Hero + vote widget — `bg-brand-bg`
Grid `lg:grid-cols-[1.1fr_0.9fr]`, widget `lg:sticky lg:top-24` (same as PetitionWidget).

- Badge pill: `Best in Norwich 2026` (brand-accent-light)
- H1: Lora block `The best of Norwich,` / Caveat block `argued over by locals.`
- 3 short paragraphs in Tom's voice: nobody paid, who actually picked it (25 locals),
  and what happens next year. Phase-aware: the third paragraph changes with `PHASE`.
- Trust row, same visual language as the homepage hero row:
  `X votes cast · N categories · 2027 voting open until <date>`
- Right column: **`<VoteWidget />`** (see §4).
- Mobile: widget renders directly under the intro paragraphs, above the winners grid.
  This is the "survey at the top" requirement — do not let winners push it down.

### 2.2 Winners grid — `bg-brand-accent-light`
Heading: Lora `The 2026 winners.` / Caveat `Every category.`

One card per category:

- Category label (small, uppercase, tracking-widest, brand-accent) + optional icon
- Winner name — Lora bold, ~text-2xl
- Optional Caveat nickname line (matches the `/guide` card pattern)
- 1–2 lines in Tom's voice on why it won
- Photo optional (`aspect-[4/3]`, `next/image`) — page must look finished with none
- Links row: **Website** (`ArrowUpRight`) + **Map** (`MapPin`), `target="_blank"`,
  `rel="noopener noreferrer"`. Dofollow — editorial, not paid. If a winner ever pays
  for anything, that link becomes `rel="sponsored"`.
- Runners-up: `2nd — Name · 3rd — Name` as small muted text, names linked too
- Vote CTA: `Vote in this category for 2027 →` — jumps back to the widget with that
  category preselected (see §4)

Layout `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`, `gap-6`. These cards are the page's
main content — scannable, not essays.

### 2.3 How this was decided — `bg-brand-bg`
Headed "Twenty-five locals. That was the whole panel." States plainly that this was not
a public vote, that things will have been missed, that no money changed hands, and that
next year is handed to the city. Load-bearing for credibility — the same role the
disclaimer band plays on `/roys-plaza`. Alongside it, a "The rules" card.

**Do not quietly upgrade this to "voted for by Norwich" in a later edit.**

### 2.3b Timeline — `bg-brand-accent-light`
Three-step band built from `TIMELINE` in the lib file, with the current stage badged
"Happening now": vote and nominate (one window) → counting → winners announced.

### 2.4 2027 rules / FAQ — `bg-brand-accent-light`
4–6 Q&A reusing the `components/FAQ.tsx` accordion (or a lighter static `<dl>` if the
accordion feels heavy here):

- How do I vote?
- Can I nominate somewhere that isn't listed?
- Can businesses vote for themselves?
- When do the 2027 winners get announced?
- Do you charge businesses anything? (Answer: no. Say it plainly.)

Emit FAQPage JSON-LD from this block, same pattern as `components/FAQ.tsx:79-90`.

### 2.5 Tour CTA band — `bg-brand-bg`
The commercial job of the page. Caveat headline, one line of copy, `TrackedBookLink`
with `location: "best_in_norwich"`. Winners share award pages — every share should land
on a booking prompt.

### 2.6 Footer
Standard `<Footer />`.

---

## 3. Data model

### 3.1 Static content — `lib/best-in-norwich.ts`
Same discipline as `lib/petition.ts` + `lib/guide-picks.ts`: one heavily commented file,
single source of truth shared by the server page and the client widget.

```ts
export type AwardPhase =
  | "nominations-open" | "voting-open" | "voting-closed" | "results-live";

export const CONTENT_READY = false;          // noindex + out of sitemap while false
export const PHASE: AwardPhase = "voting-open";

export const VOTING_CLOSES = "2027-01-31";
export const RESULTS_DATE  = "2027-03-02";

/** Winner badge art. Set it and the "If you won" band appears. */
export const BADGE_IMAGE: { src: string; alt: string } | null = null;

export interface Winner {
  name: string;
  nickname?: string;
  why: string;
  url?: string;        // their website
  mapsUrl?: string;
  image?: { src: string; alt: string };
}

export interface AwardCategory {
  key: string;          // stable slug — also the DB key. Never rename.
  label: string;        // "Best coffee"
  blurb?: string;
  icon?: GuideIconKey;  // reuse the /guide icon union
  winner?: Winner;      // undefined → card renders "Still counting."
  runnersUp?: Winner[];
  voteOnly?: boolean;   // on the ballot, out of the winners grid
}

export const CATEGORIES: AwardCategory[] = [ /* Tom's list */ ];
```

`PHASE` is the one flag that switches the page between "vote now", "voting closed,
results soon", and "winners live". One-line edit per transition.

### 3.2 Supabase tables

**Applied to the live project on 2026-08-30** as migration `best_in_norwich_awards`.
The source of truth stays at `supabase/best-in-norwich.sql`.

Two tables, `bin_nominees` (public write-ins, moderated) and `bin_votes`, both anon
INSERT-only with reads via `SECURITY DEFINER` RPCs, exactly as
`roys_plaza_signatures` does it.

One change from the first draft: **votes reference the nominee by NAME, not by
foreign key.** The ballot is a union of the static seed in the repo (last year's
winner + runners-up) and approved write-ins in the DB, and a name is the only
identifier both halves share. It also means the ballot still works before a single
DB row exists, and `/api/best-in-norwich` degrades to seed-only if Supabase is
unreachable rather than showing an empty page.

Uniqueness that matters:

- `bin_nominees (year, category_key, lower(name))` — one entry per name per category
- `bin_votes (year, category_key, lower(email))` — one vote per person per category.
  The API turns the resulting `23505` into "you already voted in that one" rather
  than an error.

RPCs: `bin_approved_nominees(year)` and `bin_total_votes(year)` are granted to anon;
`bin_vote_totals(year)` — the actual tally — is `service_role` only, so the running
leaderboard cannot be scraped off the public key.

**Moderation is deliberate.** Write-ins land as `pending` and do not appear on the
ballot until Tom flips them to `approved` in the Supabase table editor. No admin UI
in v1 — a table filter and a dropdown is enough at this volume, and it stops the page
publishing whatever a bored teenager types into a free-text box. Moderation queries
are at the bottom of the SQL file.

**Live vote counts stay hidden** while voting is open. Only the total ("X votes cast")
is public. Counts create a bandwagon and invite a business to screenshot and rally.

---

## 4. `components/VoteWidget.tsx` (client)

Modelled on `components/PetitionWidget.tsx` — reuse the count-roll animation,
`prefersReducedMotion` guard, honeypot `_trap`, `Status` union, and the visually
separated GDPR consent checkbox.

Flow — stepper, one category per screen. A 12-category ballot as one long form will not
get finished on a phone.

1. Header: `Vote — Best in Norwich 2027`, progress `3 / 12`, total votes counter
2. Current category + radio list of approved nominees (alphabetical, no counts shown)
3. Last option `Something else` → reveals name + optional website input → nomination
4. `Skip` and `Next` — skipping categories is fine and expected
5. Final step: email + marketing-consent checkbox + `Submit my votes`
6. Success: `Counted. See you in January.` + share prompt + book-the-tour link

Deep link: winners-card CTAs set `?c=<category_key>`; the widget reads it on mount,
starts the stepper there, and scrolls to `#vote`.

States to design: idle, submitting (`Loader2`), success, `already` (email already voted
in some categories — merge the new ones, ignore duplicates), error.

Accessibility: `fieldset`/`legend` per category, keyboard-navigable radios, 44px targets,
live region announcing step changes.

---

## 5. `app/api/best-in-norwich/route.ts`

Copies the `app/api/petition/route.ts` shape wholesale: `force-dynamic`, in-memory
per-IP rate limiter (5 / 10 min), `sanitizeText`, `EMAIL_RE`, honeypot short-circuit,
`23505` treated as soft success.

- `GET` → `{ phase, totalVotes, categories: [{ key, nominees: [{ id, name, url }] }] }`
- `POST` body:
  ```ts
  {
    email: string,
    marketingOptIn: boolean,
    votes: { [categoryKey: string]: string },   // nominee id
    nominations: { categoryKey: string, name: string, url?: string }[],
    _trap?: string
  }
  ```
  Validate every `categoryKey` against `CATEGORIES` and every `nominee_id` against
  approved rows before insert. Nominations insert as `pending`; per UK GDPR the
  submitter's email is stored against the vote and never published with the nomination.

Returns `{ success, alreadyVoted: string[], counted: number, totalVotes }`.

Ballot stuffing: the unique `(year, category_key, email)` constraint plus the IP rate
limiter is the v1 answer. Disposable addresses get through. Acceptable for a local award
with no prize; if it ever matters, add email confirmation before a vote counts.

---

## 6. Tracking (`lib/tracking.ts`)

| Event | Params |
|---|---|
| `bin_vote_submitted` | `categories_voted`, `nominations_added`, `is_new` |
| `bin_nomination_added` | `category` |
| `bin_winner_link_click` | `category`, `winner`, `link_type: website\|map` |
| `book_cta_click` | `location: "best_in_norwich"` |

New GA4 event tags needed in GTM before any of this reports — same outstanding container
work noted in CLAUDE.md §10 M16.

---

## 7. Schema / GEO

- `ItemList` of categories, each `ListItem` naming the winning business with its `url`.
  Accurate and safe.
- `FAQPage` from the §2.4 block.
- **No `Review` or `aggregateRating` markup on third-party businesses.** We are not a
  review platform, and rating markup about other people's businesses is a policy risk —
  same restraint applied during the 2026-04-15 schema cleanup.

---

## 8. Build order

1. `lib/best-in-norwich.ts` with real categories + 2026 winners (**blocked on Tom**)
2. Static page: hero, winners grid, transparency band, FAQ, tour CTA — widget stubbed
3. Supabase tables + RPCs + seed nominees from `CATEGORIES`
4. `/api/best-in-norwich`
5. `VoteWidget` stepper + deep links
6. Tracking, schema, sitemap entry, OG image
7. `npm run build` locally, then ship

Steps 2 and 3 are independent. Step 1 gates everything.

---

## 9. Decisions made 2026-08-23

- **Framing:** broad title "Best in Norwich 2026", but only the ten food-and-drink
  categories appear this year. No empty cards.
- **Ballot is wider than the winners grid.** Six vote-only categories (pub, breakfast,
  chippy, independent shop, free thing to do, view) carry `voteOnly: true`, so they are
  on the 2027 ballot but out of the winners grid. Sixteen ballot categories, ten
  published winners.
- **Coffee split:** Blue Bear takes Best coffee (the cup), Alchemista takes Best coffee
  to sit in.
- **The 2026 list was picked by ~25 locals Tom knows, not a public vote.** The page now
  says exactly that, in the hero and again in a band headed "Twenty-five locals. That
  was the whole panel." It states plainly that things will have been missed, that no
  money changed hands, and that 2027 is handed over to the city. This is the honest
  version and it is also the better story — do not quietly upgrade it to "voted for by
  Norwich" in a later edit.
- **One combined window — Tom's call, 2026-08-24.** Nominating and voting happen on the
  same form at the same time. I had built a separate nominations phase first; Tom
  overruled it for simplicity of promotion, which is reasonable. The `nominations-open`
  phase is still in the code and works, just unused. Consequence to remember at count
  time: a name added in January has had less time to gather votes than one on the ballot
  from day one, so eyeball close results before publishing.

### Timeline (published on the page, `TIMELINE` in the lib file)

| Stage | Date | PHASE value |
|---|---|---|
| Vote and nominate, one window | now → 31 Jan 2027 | `voting-open` |
| Counting | Feb 2027 | `voting-closed` |
| Winners announced | 2 Mar 2027 | `results-live` |

March was picked so winners have the badge up before the visitor season. Each
transition is a one-line `PHASE` edit — there is no cron on this site.

### Winner badge

Tom has the artwork and will supply it. Drop the file in `/public/images/` and set
`BADGE_IMAGE` in `lib/best-in-norwich.ts`; a "Put it in the window. It's yours, free."
band appears on the page automatically and stays hidden while the constant is `null`.
The band points winners at `hello@` for the print-quality file.

### Added 2026-08-24 (Tom's decisions)

- **Linked from the footer and the homepage internal-link row**, both gated on
  `CONTENT_READY` so nothing points at the page while it is noindex.
- **Moderation screen at `/admin/best-in-norwich`** instead of raw Supabase. Lists
  pending nominations with Approve / Reject, plus counts.

  **No new environment variables, and no service-role key.** First cut used one; Tom
  pushed back on the setup burden and picked the alternative, which is also the safer
  design: a key that bypasses RLS sitting in Vercel would put the whole database
  (bookings included) one leak away from exposure, to run a screen that only needs to
  flip a status column.

  Instead the shared password lives as a SHA-256 hash in `public.bin_admin_secret`, and
  every admin action goes through a `SECURITY DEFINER` function that takes the token as
  an argument and re-checks it. The app keeps using the ordinary write-only anon key.
  Sign-in exchanges the token for an httpOnly cookie so it never appears in a URL or
  browser history, and the cookie is a convenience rather than the security boundary —
  the database checks the token on every call. A wrong token returns an empty set, never
  an error that would confirm a row exists.

  Set the password once from the Supabase SQL editor:
  `select public.bin_admin_set_secret('a-long-random-string');`
  Until that runs, the screen locks everyone out. **Use 40+ random characters** — these
  functions are reachable from the public internet, so the token is the whole defence.
  `/api/best-in-norwich/admin` also rate-limits sign-in at 8 attempts per IP per 10
  minutes.
- **Runners-up: not published.** Winners only. The `runnersUp` field stays in the type
  for a future year.

### Fixed in the 2026-08-24 review pass

- **Marketing consent was being dropped during the nominations phase.** Opt-in was only
  written to `bin_votes.marketing_opt_in`, and the nominations phase creates no vote
  rows — so anyone ticking "email me the results" before 3 November was silently lost.
  Now the API writes the opt-in to `bin_nominees.marketing_opt_in` *and* inserts the
  address into the existing `public.subscribers` table (`source: "best_in_norwich"`),
  so award opt-ins reach the list Tom actually mails. Note this is a behaviour change
  vs `/api/petition`, which still keeps its opt-ins siloed in its own table.
- **Timeline dates were duplicated as prose.** `TIMELINE[].detail` hard-coded "31
  October", "3 November" etc. alongside the ISO constants, so changing a date would
  have left the page contradicting itself. Details are now built with `formatDate()`.
- **Privacy policy had nothing about the awards.** The petition has three dedicated
  paragraphs there (collection, use, retention); the awards had none. Added to all
  three sections of `/privacy`, including a 12-month retention line.

### Known limitation, accepted for v1

At count time, write-in votes tally by `lower(name)`, so "The Fat Cat" and "Fat Cat"
count as two nominees. Merge variants by hand in the SQL editor before publishing
winners — `bin_vote_totals(2027)` gives the raw list to eyeball.

### Still open

1. **Three `[CONFIRM]` details** in `lib/best-in-norwich.ts`: the churros stall's real
   trading name (we used "Churros for the People" from the council's market listing),
   Avo Burrito's official website, and which Jarrolds wine bar won (Cheese &
   Charcuterie or Patisserie).
2. **Runners-up** — none supplied. Optional, but they widen the 2027 ballot seed.
3. **Winner badge PNG** — still recommended, and the timeline now gives it a job:
   winners display it from March, ahead of the season.

---

## 10. Build status — 2026-08-21

**Shipped. Real winners in, `npm run build` clean, verified in the dev server.**

| File | What it is |
|---|---|
| `lib/best-in-norwich.ts` | Categories, phase flags, dates, types, ballot seed helper |
| `app/best-in-norwich/page.tsx` | Full page: hero, winners grid, method band, FAQ, tour CTA |
| `components/VoteWidget.tsx` | Stepper ballot, deep links, write-ins, GDPR consent |
| `components/BestInNorwichLinks.tsx` | Tracked outbound winner links + per-category vote link |
| `app/api/best-in-norwich/route.ts` | GET ballot, POST votes + write-ins, rate limit, honeypot |
| `supabase/best-in-norwich.sql` | Schema + RPCs. **Written, not applied** |
| `app/sitemap.ts` | Entry gated on `CONTENT_READY` |

Verified in the browser: page renders, ballot loads, deep link from a winner card jumps
the stepper to that category, write-in inputs appear, the final step collects email +
consent, and a failed submit shows the error state rather than breaking. The POST
returns 500 locally only because this worktree has no Supabase env vars and the tables
do not exist yet.

**Deliberately not done:**

- **SQL not applied.** It touches the live Supabase project shared with bookings, and
  the category keys it stores should not be locked in until Tom confirms the category
  list. One paste into the SQL editor when ready.
- **No nav or footer link.** Campaign page, and it is `noindex` until the content is
  real.
- **No GTM tags.** The four `bin_*` events fire into the dataLayer already but will not
  report until the GA4 tags are created in the container (same outstanding work as
  CLAUDE.md §10 M16).
- **OG image** still points at the generic `/og-image.jpg`.

**Go-live checklist:**

1. ~~Run `supabase/best-in-norwich.sql`~~ — done 2026-08-30
2. Set the moderation password:
   `select public.bin_admin_set_secret('a-long-random-string');`
3. Ship it. No environment variables to add, so no redeploy dance.
4. Check `/admin/best-in-norwich` signs in, and submit a test vote
5. Resolve the three `[CONFIRM]` names in `lib/best-in-norwich.ts`
6. Set `BADGE_IMAGE` once the badge art is in `/public/images/`
7. Flip `CONTENT_READY = true` — this is the moment it becomes indexable and gets its
   footer and homepage links. Everything before it can ship safely: the page is live at
   its real URL but noindex and unlinked, which is the "hidden URL" stage.

The "How this was decided" copy is written and accurate as of 2026-08-23 (25 locals,
no fees). The dates in `TIMELINE` are set; change them there, not in the page.

**2026 winners as built:** Blue Bear Coffee Co. (best coffee) · Alchemista Coffee
(best coffee to sit in) · DeVecchio Bakery (best bakery) · Big Deal's Bodega (best
market stall) · Churros for the People (best sweet treat) · Café Gelato (best ice
cream) · Yard (best pasta) · Donnelli's (best pizza) · Avo Burrito (best lunch on the
go) · Jarrolds Wine Bar (best wine bar).

---

## 11. Rebuild — 2026-08-30

Tom's review of the shipped version, and what changed.

**"It's too much writing, and the page is way too long."** Guide page is now ~350 words,
down from roughly 1,100. Winners are one line each. The timeline band, the rules card
and the six-question FAQ came off the guide entirely.

**"Maybe this should be more of a guide page, and then a separate page of voting."**
Done. `/best-in-norwich` is the guide; `/best-in-norwich/vote` is the ballot, with its
own metadata and a three-question FAQ. The guide links to it twice.

**"I don't like your vote thing… it's a bit leading against Blue Bear."** He is right and
this was the important note. Pre-listing last year's winner as the only option in each
category would have re-elected the 2026 list by construction. Every box is now blank
free text. A `<datalist>` offers already-entered names once you start typing, which
keeps the tally from splitting across spellings without putting a name in front of
anyone.

**"You can see a bar chart of what people are voting for."** Built, shown after
submitting rather than before — same reasoning as above: a chart on arrival is a
leaderboard announcing the popular answer. Held back, it is the reward for voting and
the reason to send the page on. This reverses the earlier "hide counts entirely" call;
the competitive element is the distribution channel here.

**Bug found while testing the new flow.** Every answer is now a write-in, so a ballot
usually contains at least one name that already exists. Nominations were inserted as one
multi-row statement, which fails as a whole on the first unique violation — so a vote
containing a known name silently dropped the genuinely new names alongside it. Verified
against the live database: three write-ins, none reached moderation. Now inserted one
row at a time, ignoring per-row duplicates. Retested: known name skipped, new names
queued as pending.

Test votes and nominations were deleted from the live tables afterwards; the ten seeded
winner names remain, which is intended.

### Still open

1. Three `[CONFIRM]` names in `lib/best-in-norwich.ts`
2. Badge art → drop in `/public/images/` and set `BADGE_IMAGE`
3. Set the moderation password (`bin_admin_set_secret`)
4. Flip `CONTENT_READY = true` to index both pages and add the site-wide links

---

## 12. Vote back on the guide page — 2026-08-30 (later same day)

Tom: *"the vote for 2027 should be a form right then and there not behind a button…
should articulate our mission for best in norwich… then the categories below. what do
other pages do?"*

Checked, and he is right on the convention. Across the site the real interactive thing
is embedded rather than linked: the homepage carries the booking iframe instead of
pointing at `/book`, `/what-is-a-free-tour` has an `id="book"` section, `/tour` runs
anchored sections with the CTA repeated. A button to a separate ballot page was the
odd one out.

**Now on `/best-in-norwich`:** hero → winners → `id="vote"` section holding the mission
and the live form → tour CTA. The hero button is an in-page anchor to `#vote`, not a
link away. `/best-in-norwich/vote` still renders the same component for sharing.

**Mission copy** (three short paragraphs above the form): the places worth sending
people to have no marketing budget, which is the whole point; this year came from 25
locals so we have missed things; 2027 is not our call, no shortlist, no fees, nobody can
buy a category.

**Form is two columns from `md` up.** Sixteen stacked inputs made the page about seven
screens on a laptop; two columns roughly halve the form. Phones stay single column.

Verified structurally (17 inputs server-rendered in the HTML, `#vote` anchor present,
mission copy in the markup). The preview pane in that session was rescaling itself and
producing nonsense geometry, so visual sign-off is on the live URL.

---

## 13. Homepage promo block — 2026-08-30

Tom asked for the vote on "the main page". Built as a compact section on `/` rather
than the full ballot: sixteen inputs between the FAQ and the footer would be a wall,
and a vote CTA higher up would compete with the booking widget, which is the page that
pays for the tour. So it is a heading, one line, and a button through to
`/best-in-norwich#vote`, placed after the FAQ.

Gated on `CONTENT_READY` like everything else, so the public homepage never points at a
noindexed page.

**Flag dry run** (flipped to true, built, inspected the prerendered output, flipped
back):

| With `CONTENT_READY = true` | Result |
|---|---|
| Homepage promo block | renders |
| Footer link | renders |
| `noindex` on the guide | gone |
| Sitemap | both `/best-in-norwich` and `/best-in-norwich/vote` present |

So the go-live flip is genuinely one line.

---

## 14. The board — 2026-08-30, third vote design

Tom on the sixteen-box form: *"not a nice form and too overwhelming… how do other
websites do this?"*

**What other sites do.** Muddy Stilettos, who run a Norfolk edition, take one nomination
per category and then run a second round on a named shortlist with email-verified
voting. US alt-weekly "Best Of" polls (Phoenix New Times, Tucson) run 90+ categories as
one long ballot with a submit button at the bottom — which is exactly what had been
built, and the pattern people abandon. Typeform-style one-question-per-screen is the
third option.

**Tom's answer, which beat all three:** *"like click to vote like a bar chart selector
and then if you don't see it, type your suggestion which asks for their website + what
category."* The chart is the ballot. `components/VoteBoard.tsx`:

- Each category renders its approved names as bars with live counts. Clicking a bar
  casts the vote. No form to fill in.
- "Not on the list? Add it" opens name + website + category, and that submission is both
  a nomination and a vote for it.
- Email asked once on the first vote, stored in localStorage, so the second vote is a
  single click. The server still dedupes on `(year, category, email)`, so clearing the
  browser does not buy a second vote.
- Optimistic increment on click, corrected by a refetch.

**This reverses the earlier "hide the counts" decision.** Showing counts before voting
does nudge people toward whoever is ahead. Tom's call, and the right one: the
competitive board is what makes this worth sharing, and the alternative was an empty
form nobody filled in.

**Server-rendered.** `lib/binBoard.ts` fetches the board in the page (kept out of
`lib/best-in-norwich.ts` so the Supabase SDK does not reach the client bundle), with
`revalidate = 60`. Bars exist in the HTML; VoteBoard refreshes on mount for live counts.

**Verified end to end against the live database:** clicked a bar → email prompt → vote
recorded, bar moved, total incremented; second vote in another category did not re-ask
for email; "Add it" in an empty category queued The Fat Cat as pending with its URL
normalised and counted the vote without showing the bar. Test rows deleted afterwards.

---

## 15. The hero widget — 2026-08-30, fourth and final vote design

Tom: *"its the voting we need to nail... have a singular widget at the top of the page
in the hero."* Plus, on the design options: *"hybrid but we should also include the
images of each place on the form too."*

**Shape.** One widget, hero right column, same placement as the booking widget on the
homepage. On a phone it lands directly under the headline. The winners grid moves below
the hero: the vote is the top of the page, the guide is what you scroll to.

**Behaviour — the hybrid.** Category chips across the top so anyone can jump to the one
they care about, and after each vote the widget advances to the next category they have
not answered. Choice for people who want it, momentum for people who do not. Voted
categories keep a tick on their chip. Only the top three names show, with "All N →" to
expand, so the widget stays hero-sized as the field grows.

**Photos.** `bin_nominees.image_url`, added in migration
`best_in_norwich_nominee_images_v2`. Five seeded winners were backfilled with the
existing `/images/guide/` photography; anything without a photo renders an initial in a
tinted square, so a public suggestion still looks deliberate.

**Per-category questions.** `question` on `AwardCategory` — "Best place to sit with a
coffee?" reads better than the label alone. Falls back to "<label> in Norwich?".

**Verified against the live database:** first tap opened the email prompt, the vote
recorded, the widget advanced to the next question, the chip ticked and the header
counted "you have voted in 1". A second visit with the email already in localStorage
voted in one tap with no prompt. Test rows deleted; the ten seeded names and their five
photos remain.

---

## 16. Six categories, and hide the counts — 2026-08-30

Two more calls from Tom, both after seeing the hero widget live.

**"Don't show the current votes until all are filled in."** Implemented per category:
a category shows its names alphabetically with no bars and no numbers until you vote in
it, under the line "pick one to see how Norwich has voted". Your vote reveals that
category's standings, and the header total stays hidden until you have voted somewhere.
Standard poll behaviour — nobody is steered by the leader, and there is a payoff on
every single vote rather than only at the end of sixteen.

**Sixteen categories cut to six.** `VOTE_CATEGORIES` in `lib/best-in-norwich.ts`:
coffee, pub or drinks, breakfast, meal out, the market, independent shop. This is now a
separate list from the 2026 awards, which keep their own ten categories on the guide —
that is history and does not move. `WINNER_CATEGORIES` drives the grid,
`VOTE_CATEGORIES` drives the ballot, the API and the moderation screen. The `voteOnly`
flag is gone.

The seeded names were remapped in migration `best_in_norwich_six_categories`: coffee
(Blue Bear, Alchemista), pub or drinks (Jarrolds Wine Bar), breakfast (DeVecchio),
meal out (Yard, Donnelli's, Avo Burrito), the market (Big Deal's Bodega, Churros for the
People). Independent shop starts empty on purpose. Café Gelato has no natural home in
six categories and is not on the ballot; it remains a 2026 winner on the guide.

**Also this round:** the 2026 winners moved into their own light-green band with a
heading, so the hero has room instead of the cards running straight on from it.

Verified against the live database: fresh browser saw no counts, voting revealed that
category and advanced to the next, the header switched to "1 vote so far · you have
voted in 1 of 6". Test rows removed.

---

## 17. Nominee photography

Photos live in two places and both need setting when a new one arrives:

1. `lib/best-in-norwich.ts` → the winner's `image` (the guide card). Add
   `position` when a portrait photo needs a specific crop in the landscape card.
2. `bin_nominees.image_url` in Supabase → the ballot row in the widget.

```sql
update public.bin_nominees set image_url = '/images/best-in-norwich/<file>'
where year = 2027 and category_key = '<key>' and lower(name) = '<name in lower case>';
```

Files go in `public/images/best-in-norwich/`. Five of the seeded names reuse the
existing `/images/guide/` photography.

**Have photos:** Blue Bear, Big Deal's Bodega, Donnelli's, Yard, DeVecchio Bakery
(supplied by Tom 2026-08-30 — 287x510, small; a higher-resolution original would render
better on the guide card, where it is cropped to landscape).

**Still want photos:** Alchemista, Churros for the People, Avo Burrito, Jarrolds Wine
Bar. Anything without one falls back to an initial, which is deliberate rather than
broken.
