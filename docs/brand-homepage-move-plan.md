# Move plan: brand homepage live, free tour to its own page

Written 2026-10-19 (move + full SEO plan). Nothing in this plan has been done yet. The prototypes are
hidden on branch `claude/interesting-kepler-6d0367`:

- `/home-brand`: the new brand homepage (becomes `/`)
- `/home-brand/free-tour`: today's homepage with the stickers and phone photo
  band (becomes `/tours/free-walking-tour`)

## What changes for visitors

| Today | After the move |
|---|---|
| `/` is the Norwich Free Walking Tour page | `/` is the brand homepage: every tour and experience |
| The free tour has no page of its own | `/tours/free-walking-tour` is the free tour page (today's homepage, with the stickers) |
| `/tour` redirects to `/` | `/tour` redirects to `/tours/free-walking-tour` |

## The risk, in one paragraph

Google ranks the homepage for "free walking tour norwich" today. After the move,
that search should go to `/tours/free-walking-tour` instead. Google has to learn
that, which usually takes 2 to 6 weeks, and rankings can dip while it does. We
soften it by: keeping the words "Norwich Free Walking Tour" prominent on the
homepage, linking to the tour page from the homepage, nav and footer with those
exact words, redirecting `/tour` straight to the new page, listing it in the
sitemap, and telling Google about it the same day (Search Console steps below).
Google Ads traffic is not affected by rankings, so bookings from ads keep coming.

**Timing.** Don't move during a busy booking week. Best is a quiet weekday
morning, with Tom free for an hour to do his steps straight after.

## Part 0: SEO baseline, before anything moves (Tom, 30 minutes, a week before)

You can't tell if the move hurt anything without a "before" picture. In Google
Search Console, last 3 months:

1. **Performance → Queries:** export to Google Sheets. Note position, clicks and
   impressions for these searches:
   - free walking tour norwich
   - norwich walking tour
   - walking tours norwich
   - free tour norwich
   - things to do in norwich
   - norwich free walking tours (the brand)
   - dark history norwich / ghost walk norwich
2. **Performance → Pages:** export. Note the homepage's clicks and impressions.
3. **Links → Top linked pages:** note which outside sites link to the homepage.
   Those links stay valid (the homepage stays), but any that are really about
   the free tour are worth updating later (see "Elsewhere").
4. **GA4:** note organic sessions and `booking_confirmed` events from organic
   traffic, per week, for the last 6 weeks.

Claude also saves a crawl before the move: every URL in the sitemap with its
title, H1, canonical and status code, so the "after" crawl can be compared line
by line.

## Which page targets which searches

Each search should have one page that clearly answers it. If two pages compete,
Google can't pick, and both rank worse.

| Page | Main searches | Supporting searches |
|---|---|---|
| `/` homepage | norwich free walking tours (the brand), walking tours norwich, tours in norwich | things to do in norwich, norwich tours |
| `/tours/free-walking-tour` | free walking tour norwich, norwich walking tour, free tour norwich | what to do in norwich for a day, elm hill walking tour, best walking tour norwich |
| `/tours/dark-history-of-norwich` | ghost walk norwich, dark history norwich, halloween norwich | (no change) |
| `/what-is-a-free-tour` | what is a free walking tour, how much to tip a free tour | (no change) |

Rule that follows from this: the homepage talks about all tours and links to the
free tour page for detail. It must not copy the free tour page's text, FAQs or
title, or the two pages compete for the same search.

## Part 1: code changes (done by Claude, one commit, one deploy)

### 1. Pages
1. Create `app/tours/free-walking-tour/page.tsx` from `app/home-brand/free-tour/page.tsx`:
   - Take its metadata from today's `app/page.tsx`: title "Free Walking Tour
     Norwich | History, Highlights and Local Tips", same description. Remove
     `noindex`.
   - Add a self canonical: `https://www.norwichfreewalkingtours.co.uk/tours/free-walking-tour`.
   - Turn the FAQ schema back on (`emitSchema`), so the free tour's FAQs show in
     Google from this page.
   - Keep the ids `#tour-map`, `#reviews`, `#faq`, `#book-section` (Ads
     sitelinks and links point at them).
   - Static folder beats the `[slug]` route, so no clash with the Dark History
     page system.
2. Replace `app/page.tsx` with `app/home-brand/page.tsx`:
   - Remove `noindex`. New title: "Norwich Free Walking Tours | Free Walking
     Tour, Dark History and Private Tours". Description leads with the free
     tour: "The Norwich Free Walking Tour most days, the Dark History of Norwich
     by night, and private walks for your group. Led by locals. Free to book."
   - Keep its FAQs with schema on (different questions from the tour page, so
     no duplicate FAQ markup).
3. Delete `/home-brand`, `/home-brand/free-tour` and `/home-brand/stickers`
   (move the sticker art files to `components/` first).

### 2. Redirects (`next.config.mjs`)
- Change `/tour` → `/` to `/tour` → `/tours/free-walking-tour` (301).
- Add `/free-walking-tour` → `/tours/free-walking-tour` (301), in case anyone
  types it.

### 3. Links that mean "the free tour" and now point at `/`
| File | Today | Change to |
|---|---|---|
| `components/Nav.tsx` | "Free Walking Tour" → `/` | `/tours/free-walking-tour` |
| `lib/tours.ts` (free tour) | `ctaHref: "/"` | `/tours/free-walking-tour` |
| `app/home-brand/_components/BrandSections.tsx` | `FREE_TOUR_HREF = "/"` | `/tours/free-walking-tour` |
| `app/things-to-do/free/page.tsx:321` | link to `/` | check wording; if it means the tour, point at the tour page |
| `app/explore/where-to-stay-norwich/page.tsx:266` | link to `/` | same check |
| `app/guide/page.tsx:388` | link to `/` | same check |
| `app/tours/[slug]/page.tsx:356` | link to `/` | same check |
| `app/book/page.tsx:287`, `app/what-is-a-free-tour/page.tsx:196`, `components/Footer.tsx` "FAQs" | `/#faq` | `/tours/free-walking-tour#faq` (the free tour FAQs) |

Leave as `/`: the logo, footer "Home" and the 404 page's "home" link.

### 4. Buttons that say "Book your spot (free)"
- Nav button and the phone sticky bar both go to `/book` (the free tour). On the
  free tour page the sticky bar already jumps to its own widget (`#book`). On
  the homepage, use the homepage's own "Book a tour (free)" bar, which opens the
  booking pop-up with a tab per tour (already built). Nav button label:
  "Book a tour".

### 5. Sitemap (`app/sitemap.ts`)
- Add `/tours/free-walking-tour`, priority 0.9, weekly.
- Keep `/` at 1.0.

### 6. Google labels (JSON-LD, `app/layout.tsx`)
- Keep sitewide: `WebSite` and `LocalBusiness` (the business), with ratings.
- Move the `TouristAttraction` + `Offer` block (today on every page, `url: /`)
  to the free tour page, as a `TouristTrip` like the Dark History page has, with
  `url: /tours/free-walking-tour`.
- Homepage: add an `ItemList` of the tours (free tour, Dark History, private
  tours) with their URLs.

### 7. Other text that describes the homepage as the free tour
- `public/llms.txt` (what AI assistants read): line "Home: the Norwich Free
  Walking Tour…" becomes "Home: all our tours and experiences", and add a line
  for the free tour page.
- `CLAUDE.md` §4 Pages: `/` and the new `/tours/free-walking-tour` section.

### 8. Not ready yet (decide before launch)
- **`/tours` ("All tours & experiences")** is still a hidden prototype page, and the
  homepage links to it twice. Either build it out first, or point those links at
  `#tours` on the homepage until it's ready. Recommend: point at `#tours` for now.
- **Live "Next walk"** reads the booking app's tables with the public key Vercel
  already has. No new settings needed.

### 9. SEO optimisation of both pages (same commit)

**Free tour page (`/tours/free-walking-tour`): keep everything Google already likes.**
- Every word, heading, photo description and FAQ on today's homepage moves
  across unchanged. Same title, description, H1 ("England's best-kept medieval
  city"), "What's on the tour?" copy and FAQs. Google ranks what's on the page;
  if the text stays, the ranking follows it.
- Add breadcrumbs (Home › Tours › Norwich Free Walking Tour), visible and in
  `BreadcrumbList` schema, so Google sees where the page sits.
- First paragraph keeps the phrase "Norwich Free Walking Tour" (the hero pill
  already does).
- Its own social share image and title (Open Graph), so links shared to
  WhatsApp and Facebook preview the tour, not the homepage.

**Homepage (`/`): say clearly what the business is.**
- Title: "Norwich Free Walking Tours | Free Walking Tour, Dark History and
  Private Tours" (brand first, then the tours).
- H1 stays the mission line ("Helping locals and travellers love and discover
  Norwich"). It already contains "Norwich". The sub line under it gets the
  search words: "Free walking tours, dark history and private walks, led by
  guides who live here."
- The free tour card links to `/tours/free-walking-tour` with the link text
  "The Norwich Free Walking Tour". Exact words in the link text tell Google
  what the target page is about.
- Homepage FAQs stay business-wide ("Which tour should I pick?", "Where do the
  tours meet?") and must not repeat the free tour page's FAQs word for word.
- Every photo keeps a real description (alt text) naming the place.

**Internal links: tell Google the new page matters.**
- Nav "Free Walking Tour", footer, the "What is a free tour?", "Free things to
  do" and "Where to stay" articles all link to `/tours/free-walking-tour` with
  the words "Norwich Free Walking Tour" (or "free walking tour") in the link.
- The Dark History page's "other tours" section links to it too.
- No link anywhere should go through a redirect (`/tour`), only straight to the
  final URL.

**Redirects: one hop only.** `/tour` → `/tours/free-walking-tour` directly
(today it goes to `/`, which would become a wrong-page redirect). Check no
redirect chains with a crawl after deploy.

**Speed (Core Web Vitals).** Both pages now have cycling header photos.
- Only the first photo loads up front; the rest load after the page is usable
  (the slideshow already does this).
- On the free tour page the phone photo band and the desktop background both
  hold the slideshow. Make sure the phone only downloads the phone-size photos
  (check the Network tab), or the page gets slower on mobile.
- Run PageSpeed Insights on mobile for both pages before and after. Target: no
  worse than today's homepage score; LCP under 2.5 seconds.

**AI search (ChatGPT, Perplexity, Google AI answers).**
- `llms.txt` updated as above, with the free tour page as its own entry and
  the homepage described as "all our tours".
- The free tour page keeps its FAQs in plain text and in FAQ schema. Those are
  what AI answers quote.

### 10. Checks before pushing
- `npm run build` passes, `npm run photos:check` passes.
- `/`, `/tours/free-walking-tour`, `/tour` (redirects), `/book`, Dark History
  page all load on a phone.
- View source on both pages: one `FAQPage` each, correct canonical, no
  `noindex`.

## Part 2: your steps (Tom), same day

### Google Search Console (15 minutes)
1. Sitemaps → resubmit `sitemap.xml`.
2. URL inspection → `https://www.norwichfreewalkingtours.co.uk/tours/free-walking-tour`
   → Request indexing.
3. URL inspection → the homepage `/` → Request indexing.
4. Set a reminder to check Performance → Queries → "free walking tour norwich"
   weekly for 6 weeks: which page is shown, and its position.

### Google Ads (10 minutes)
1. Free tour ad: change the final URL from `/` to
   `https://www.norwichfreewalkingtours.co.uk/tours/free-walking-tour`.
2. Sitelinks: change `/#tour-map`, `/#faq`, `/#reviews` to the same anchors on
   `/tours/free-walking-tour` (`…/tours/free-walking-tour#tour-map` and so on).
3. Dark History ad: no change (its page doesn't move).
4. Conversion tracking doesn't change (it's on the booking widget), so nothing
   to touch in Google Tag Manager.

### Google Business Profile (5 minutes)
- Website: leave as the homepage (it's now the business's front door).
- If you've set a separate "Booking" or "Products" link for the free tour, point
  it at `/tours/free-walking-tour`.

### VisitNorwich listing (same day, 5 minutes)
- Change the website link on our VisitNorwich listing to
  `https://www.norwichfreewalkingtours.co.uk/tours/free-walking-tour`. It's the
  most trusted outside link we have (the official city tourism site), so it
  should point straight at the tour page, not via the homepage.

### Elsewhere (that week)
- GuruWalk and FreeTour.com listings: change the link for the free tour to
  `/tours/free-walking-tour`.
- Instagram, TikTok and Facebook bios can stay on the homepage.
- Printed QR codes keep working (they go to `/updates` or `/book`).

## Part 3: watch it for 8 weeks

Check once a week (Monday, 10 minutes), against the Part 0 baseline:

| What | Where | Healthy | Worry |
|---|---|---|---|
| "free walking tour norwich": which page shows | Search Console → Queries → click the search → Pages | `/tours/free-walking-tour` takes over from `/` within 2 to 4 weeks | still only `/` after 4 weeks |
| Its position | same | dips, then back within 2 positions of the baseline by week 6 | more than 5 positions down for 3 weeks running |
| Organic clicks, whole site | Search Console → Performance | within 20% of baseline | down more than 30% for 2 weeks running |
| Organic bookings | GA4 → `booking_confirmed`, source organic | within 20% of baseline | down more than 30% for 2 weeks running |
| Errors | Search Console → Pages (indexing) | no new "Not found" or "Redirect error" | any new 404 or redirect error |
| Speed | PageSpeed Insights, mobile | no worse than before | LCP over 2.5s |

**Automated Monday check (set up 2026-10-19).** A scheduled task runs every
Monday at 9am while the Claude app is open (if the app is closed, it runs next
time it opens). It checks the live site and writes a short report to
`C:\Users\Tom\Desktop\NFWT SEO reports\YYYY-MM-DD.md` (outside the code, so it
never ships):
- every sitemap page loads (no 404s), redirects are one hop, each page has the
  right title, canonical and no stray `noindex`;
- `/tour` lands on the free tour page; the free tour page carries the
  `TouristTrip` and `FAQPage` labels;
- PageSpeed (mobile) for the homepage and the free tour page, compared with
  last week;
- links from VisitNorwich, GuruWalk and FreeTour.com: do they point at the free
  tour page yet?

What it can't see: Search Console rankings and clicks, and GA4 bookings. Those
need your login. Either paste the Search Console Performance export into the
chat on Monday, or connect Search Console to Claude so the check can read it
itself.

**Rollback triggers.** If any "Worry" column holds for the time shown, undo
the move (below) and we look at why before trying again. A dip in weeks 1 to 3
on its own is normal and not a reason to undo.

## If it goes wrong

Everything is in one commit, so undoing it is one revert and one deploy. Google
re-learns within days. Ads keep working either way, because their final URLs
just need to match whichever page is live.
