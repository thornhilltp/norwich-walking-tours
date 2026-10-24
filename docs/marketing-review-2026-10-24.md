# Marketing review: Analytics, Search Console, Google Ads (24 Oct 2026)

All read-only. Windows: Search Console 25 Sep to 22 Oct (28 days), GA4 26 Sep to 23 Oct, Google Ads last 30 days plus 17 to 23 Oct, real bookings from Supabase 24 Sep to 23 Oct (not cancelled, not private).

## Headline

1. **Dark History carried the month.** 100 of 158 real bookings. Its ads are the cheapest thing you buy: about £4.40 a booking, £1.70 a guest.
2. **The free tour had a bad first week after the homepage move (19 Oct).** 9 bookings in 6 days against 15 and 20 the two weeks before. Google Ads gave **0** free-tour bookings that week, and Google search gave **0**. One week is not proof (October dip, Dark History pulling attention), but it is the warning sign the move plan told us to watch.
3. **Google hasn't caught up with the move yet.** The new free tour page `/tours/free-walking-tour` got 7 search appearances last week at position 16.6. Google still shows `/` and the old `/tour` for free tour searches. Normal 5 days in; expect 2 to 4 weeks.
4. **Ads spend £227 a month for about 37 bookings / about 100 guests.** At £10 to £20 tips a head, that is clearly worth it.

## Real bookings (Supabase, last 30 days)

| Where from | Dark History | Free tour |
|---|---|---|
| Instagram | 28 (75 guests) | 4 |
| Google Ads | 25 (62) | 12 (37) |
| TikTok | 19 (48) | 0 |
| No tracking tag (direct, FreeTour.com, word of mouth) | 11 | 25 (8 from FreeTour.com) |
| Google search / Maps | 7 | 8 |
| VisitNorwich | 4 | 8 |
| Total | 100 | 58 |

Free tour bookings by week (Mon start): 15, 15, 19, 12, 9, 15, 20, **9 (6 days, week of the move)**.
Free tour from Google Ads by week: 2, 2, 5, 3, 2, 4, 2, **0**. From Google search: 6, 3, 6, 1, 3, 2, 3, **0**.

## Google Ads

| Campaign | Spend (30d) | Clicks | Real bookings | Per booking | Search share | Notes |
|---|---|---|---|---|---|---|
| Free tour ("Search - Norwich Walking Tours Experiment"), £3/day | £112.88 | ~175 | 11 (33 guests) | £10.30 | 83% | CTR 33%, very healthy ad. Last 7 days: £23, 38 clicks, **0** free-tour bookings |
| Dark History - Halloween 2026, £8/day | £113.84 | ~265 | 26 (66 guests) | £4.40 | 23% | Losing 44% of searches to low rank (£1.20 bid cap) and 33% to budget |

Keywords (30 days, Ads-counted conversions):
- Best: "norwich ghost walk halloween" (6 conv, £3.91 each), "ghost tours norwich" (2, £4.15), "norwich history walks" (2, £3.28), "ghost walk norwich" (3, £4.80).
- Free tour: [norwich walking tours] £102, 157 clicks, 9 conv. Carries the whole campaign.
- Dead weight: "things to do in norwich halloween" (low Quality Score, 11 clicks, 0 conv), "things to do in norwich this weekend" (3% CTR, 0 conv, "This weekend" ad rated Poor). About £7 a month, small but pointless.
- Ads counts about 65% of real Dark History bookings and about 90% of free-tour ones. Judge on Supabase, not the Ads conversion column.

**Time-sensitive:**
- **The Dark History campaign ends 6 Nov** (end date set at launch). You're adding dates after 6 Nov. If you want ads for those, the end date and the "16 Oct to 6 Nov" headline both need changing, or the ads stop / go wrong.
- **Halloween keywords die on 1 Nov.** Pause the Halloween ad group then; keep Ghost intent and History.
- **Google's "Confirm it's you" identity check** has to be done before 28 Oct (noted when the campaign launched). The account also shows an "Improve account security" banner.
- Google is pushing "Maximize conversions with target CPA". **Don't accept yet** for the free tour: 10 tracked conversions a month, below the 15 to 20 your rep set.

## Search Console (28 days)

187 clicks, 4,030 appearances, average position 8.8 (baseline 19 Oct was 182 clicks). 95% UK. Phones 71% of clicks.

Brand searches are solid: "norwich free walking tours" 37 clicks (pos 1.2), "free walking tour norwich" 18 (1.3), "norwich free walking tour" 10 (1.0).

Where the room is (lots of appearances, few clicks):

| Search | Appearances | Position | Clicks |
|---|---|---|---|
| norwich walking tour | 117 | 9.5 | 7 |
| free walking tour | 107 | 9.9 | 0 |
| norwich walking tours | 99 | 14.5 | 5 |
| norwich tours | 99 | 8.8 | 0 |
| free things to do in norwich | 88 | 11.0 | 1 |
| where to stay in norwich | 85 | 13.4 | 1 |
| is norwich cathedral free | 49 | 9.6 | 0 |
| norwich walks / walking in norwich / walks in norwich | ~95 | 31 to 38 | 0 |

- "norwich walking tour(s)" is the prize: page 1 to 2 and slipping since early Oct. This is what the new free tour page needs to win.
- Dark History gets almost nothing from Google search ("norwich ghost walk" 4 appearances at position 38). All its demand comes from social and ads. Fine for a short run; if it becomes a permanent tour, it needs search work.
- "is norwich cathedral free" (49) and "norwich walks" (~95) are content gaps: a short answer on the free things page, and a self-guided walk page, would pick these up.
- Google Business Profile link (`/?utm_source=gbp...`) showed 1,274 times but only 2.8% clicked. Since 19 Oct it lands on the brand homepage, one extra tap from booking the free tour.
- Indexing: 15 indexed, 9 not, all expected (redirects, noindex on unfinished pages, a WordPress bot URL).

## Google Analytics (28 days)

1,017 visits, 682 people, 109 `booking_confirmed` (the only key event). Supabase has 158, so GA sees about 69%: normal with the cookie banner.

| Channel | Visits | Bookings seen | Booking rate |
|---|---|---|---|
| Instagram + TikTok | 229 | 50 | ~22% |
| Google Ads | 247 | 21 | 8% |
| Direct | 207 | 12 | 6% (39% engaged: lowest) |
| Google search | 129 | 10 | 8% |
| VisitNorwich | 90 | 10 | 11% |

Landing pages: Dark History page 480 visits / 73 bookings. Homepage 319 / 27. **New free tour page 25 visits / 0 bookings, 14 seconds average.** Small sample, but 0 from 25 with 14 seconds is the second sign (with the ads) that something about the free tour page isn't landing. The booking widget is in the page (checked), so it's not obviously broken.

Data hygiene: 28 visits from `app.contentsquare.com` (a session-recording tool, probably you or a tester) are counted as real referral traffic. Filter them out.

## Phone test of the free tour page (24 Oct, follow-up)

Arrived as a Google ad visitor would (375px phone, ad tracking tags in the address, declined cookies). **Nothing is broken:**
- Page loads in under 0.4s, about 200 KB. No errors.
- First screen has a "Book your spot (free)" button plus the sticky bar. One tap jumps to the calendar.
- Calendar → Sunday 25 → 10:30 walk → name/email form all work. Only the free tour's 10:30 walks show. (Stopped before confirming, so no real booking was made.)
- The ad's tracking tags reach the booking widget, so a booking would be credited to Google Ads.
- Button taps are recorded (`book_cta_click` from the hero button and the sticky bar).

Small rough edges, not enough to explain the drop:
- The sticky "Book your spot (free)" bar stays on screen while you're filling in the form, covering the bottom of the widget.
- The form scrolls inside its own box on phones (a scroll inside a scroll).

**Why last week looked bad, most likely:** timing, not the page. The free walks that week were the fullest of the autumn (55 of 75 places, against 21 to 44 the weeks before), mostly booked earlier for half-term. New bookings made that week were low, but the walks were busy. With about 38 ad clicks a week, the usual 2 to 4 bookings can drop to 0 by chance.

**The number to watch instead is places booked on upcoming walks:** w/c 26 Oct 26 of 75, w/c 2 Nov 4 of 60, w/c 9 Nov 4 of 75. If w/c 2 Nov is still under 20 by 30 Oct, that's a real demand problem worth more ad budget, not a page fix.

## What I'd do, in order

1. **This week:** do the Ads identity check before 28 Oct.
2. **Free tour page:** phone test done, nothing broken (see above). Watch upcoming places booked. If free-tour bookings are down 30% again next week, that meets the rollback rule in the move plan.
3. **Point the Google Business Profile website link at `/tours/free-walking-tour`**, or keep the homepage and accept the extra tap. I'd move it: most Maps searchers want the free tour.
4. **Dark History ads:** decide by 1 Nov: pause the Halloween group, either extend the end date with new headlines for the post-6 Nov dates or let it end. Pause the two dead keywords now.
5. **Dark History bid cap:** it's losing 44% of searches on rank. Only worth raising the £1.20 cap if the dates after 6 Nov have seats to fill; while sold out, leave it.
6. **Content (after the move settles):** a self-guided walk page for "norwich walks" type searches; a cathedral line on the free things page.
7. Filter Contentsquare out of GA4.

Not changed: nothing in Ads, GA4 or Search Console was edited or saved. Only date ranges and table views were switched.
