# Visit Norwich — Image Request Email

Drafted 2026-05-24. Send to your Visit Norwich partner contact (you'll have this from your membership account). If you don't, the public contact form on https://www.visitnorwich.co.uk/about-us/contact-us/ goes to the same team.

Replace `[date]` with the year you joined Visit Norwich before sending. Everything else is ready to paste.

---

**Subject:** Image request from a Visit Norwich partner

---

Hi Visit Norwich team,

I'm Tom Thornhill, founder of Norwich Free Walking Tours. We've been a Visit Norwich partner since [date]. Our listing is at https://www.visitnorwich.co.uk/service/norwich-free-walking-tours/.

I'm building a "Tom's Norwich" recommendations page on our site, https://www.norwichfreewalkingtours.co.uk/guide, for tour guests to use after the walk. It covers around 30 city restaurants, pubs, shops, attractions and free things to do — all places I personally send people to. The page is in shell form now and I'm populating it with real content and photos over the next few weeks.

Would I be able to use Visit Norwich imagery on the page? Specifically I'm hoping for shots of:

- Norwich Cathedral (exterior, plus interior / Evensong if you have it)
- Mousehold Heath or a city panorama view
- Plantation Garden
- Cow Tower / Wensum riverside path
- Norwich Market, with stalls visible
- Elm Hill and the cobbled-street character of the Lanes
- Norwich Castle and the Castle grounds
- Jarrolds department store, ideally the food hall
- St Gregory's Church
- Norwich Beer Festival and Norwich Wine Week event shots, if any exist

Happy to credit per your preferred attribution format on each image, and to send you the live URL once it's launched. A Dropbox or shared folder would be ideal if that's how you usually handle these requests.

Thanks,
Tom

Tom Thornhill
Norwich Free Walking Tours
hello@norwichfreewalkingtours.co.uk
www.norwichfreewalkingtours.co.uk

---

## After they reply

When you get the shared folder / image links:

1. Pick the best one per pick. Keep file sizes sensible — `next/image` will optimize but big originals slow upload.
2. Save into `/public/images/guide/` with sensible names, e.g. `norwich-cathedral.jpg`, `elm-hill.jpg`, `plantation-garden.jpg`.
3. Update each pick in `lib/guide-picks.ts`:
   ```ts
   image: "/images/guide/norwich-cathedral.jpg",
   imageAlt: "Norwich Cathedral, the Norman cathedral with the second-tallest spire in England.",
   ```
4. Add the Visit Norwich attribution somewhere on the page — easiest spot is a single line in the footer cross-link block: *"Some images courtesy of Visit Norwich."* with a link back to visitnorwich.co.uk. Lighter than crediting per-image.

## If they say no or take ages

Fall back to your own phone shoots. The icon-block fallback on each card looks intentional in the meantime, so no rush to ship perfect.
