// ── Tom's Norwich — guide picks ──────────────────────────────────────────────
//
// Source of truth for /guide page content.
//
// HOW TO EDIT
// -----------
// Each section has 1-N picks. To add or change a pick, edit the picks array.
// Body text marked `[Replace with 1–2 lines…]` is placeholder — swap in your
// own copy in your voice. Names tagged `[TBD]` need clarification before
// the page goes public (search the file for "TBD" to find them).
//
// MAPS LINKS
// ----------
// Real share.google / maps.app.goo.gl links from Tom: kept verbatim.
// Everything else uses mapsSearch() which generates a Google Maps search URL
// from the pick's name. Replace with a real link if you want it to land
// exactly on the right pin.

export type GuideIconKey =
  | "view"
  | "fork"
  | "coffee"
  | "beer"
  | "sparkle"
  | "bag"
  | "walk"
  | "paddle"
  | "route"
  | "calendar"
  | "ticket";

/** Cross-cutting tags. Drives the filter pills on /guide. Pick from this
 *  list when tagging picks below — add new ones to TAG_FILTERS too if you
 *  introduce a new category. Keep the list short or the filter row becomes
 *  noise.
 *
 *  Meal occasions (brunch/lunch/market-lunch/dinner) replaced the generic
 *  "eat" tag per Tom 2026-05-26 — matches how guests actually ask ("where
 *  for brunch?", "lunch on the market?"). Market picks should carry BOTH
 *  `lunch` AND `market-lunch` so the broader "Lunch" filter still finds them. */
export type GuideTag =
  | "brunch"
  | "lunch"
  | "market-lunch"
  | "dinner"
  | "snacks"
  | "drink"
  | "coffee"
  | "free"
  | "outdoors"
  | "rainy-day"
  | "day-trip"
  | "on-the-tour";

export interface GuidePick {
  /** Official name — used as the card heading. Tag with [TBD] if uncertain. */
  name: string;
  /** Tom's nickname for it — optional. Renders as italic Caveat subtitle. */
  nickname?: string;
  /** 1–2 line "why I send people here". */
  body: string;
  /** Google Maps link. Real share.google link OR a search URL. */
  mapsUrl: string;
  /** Marks the card with a "Tom's pick" gold badge. Reserve for your real
   *  top picks — if everything's a favourite, nothing is. Also drives the
   *  "Tom's picks" filter pill. */
  favourite?: boolean;
  /** Path to an image in /public, e.g. "/images/guide/yard.jpg". Optional.
   *  When absent, the card shows a tinted icon block fallback. Do NOT use
   *  stock photography or venue/Google Maps images (copyright + brand rules
   *  per CLAUDE.md §9). Use your own tour-day photos. */
  image?: string;
  /** Optional alt text for the image. Defaults to pick name if absent. */
  imageAlt?: string;
  /** Cross-cutting tags — drives the filter pills at top of /guide.
   *  Multiple tags fine (e.g. ['outdoors', 'free', 'day-trip']). */
  tags?: GuideTag[];
  /** Venue's own website. Optional — some picks won't have one (a walk, a
   *  viewpoint, an event with no permanent URL). When present, renders as
   *  a second outbound link on the card. UTMs are appended automatically
   *  by the page so the venue sees us as the referrer in their analytics
   *  (`norwichfreewalkingtours / referral / guide`). */
  website?: string;
}

/** The filter pills shown at the top of /guide. Order = display order.
 *  "favourites" is special-cased to read the `favourite` boolean on picks. */
export const TAG_FILTERS: { id: GuideTag | "favourites"; label: string }[] = [
  { id: "favourites", label: "Tom's picks" },
  { id: "on-the-tour", label: "On the tour" },
  { id: "brunch", label: "Brunch" },
  { id: "lunch", label: "Lunch" },
  { id: "market-lunch", label: "Market lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Sweet treats" },
  { id: "drink", label: "Drinks" },
  { id: "coffee", label: "Coffee" },
  { id: "free", label: "Free" },
  { id: "outdoors", label: "Outdoors" },
  { id: "rainy-day", label: "Rainy day" },
  { id: "day-trip", label: "Day trip" },
];

export interface GuideSection {
  /** Anchor id — used for in-page links. Keep short, kebab-case. */
  id: string;
  /** Short label for the sticky anchor nav (8-10 chars max). */
  shortLabel: string;
  /** Small eyebrow above the section heading. */
  eyebrow: string;
  /** First half of the H2 (Lora). */
  headingLora: string;
  /** Second half of the H2 (green Caveat). */
  headingCaveat: string;
  /** Optional 1-2 sentence section intro. */
  intro?: string;
  /** Icon key — resolved to a Lucide icon in the page component. */
  icon: GuideIconKey;
  picks: GuidePick[];
}

// Generates a Google Maps search URL when no real link is available.
// Lands on a results list, not a specific pin — replace with a real
// share.google link when you can.
const mapsSearch = (name: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    name + " Norwich UK"
  )}`;

export const guideSections: GuideSection[] = [
  // ── 01. Viewpoint ──────────────────────────────────────────────────────────
  // Tom confirmed 2026-05-24: Mousehold Heath is the spot.
  {
    id: "view",
    shortLabel: "The view",
    eyebrow: "First, the view",
    headingLora: "The viewpoint over the",
    headingCaveat: "whole city.",
    intro: "Best done before lunch when the light's still soft.",
    icon: "view",
    picks: [
      {
        name: "Mousehold Heath",
        nickname: "the spires lookout",
        body: "Twenty minutes up the hill from the Cathedral. The whole city laid out below you, every spire you’ve just walked past. Free, always open, and most visitors miss it.",
        mapsUrl: "https://share.google/rz2NeEnzUBUPfgZsr",
        // Example "Tom's pick" — Tom: flip favourite to true on YOUR
        // absolute favourites only. Probably 4–6 across the whole page.
        favourite: true,
        // Closest existing image (panorama from Fye Bridge). Swap for an
        // actual Mousehold shot when you take one.
        image: "/images/guide/mousehold.png",
        imageAlt: "View from Mousehold Heath looking back across Norwich, the city's spires and rooftops spread below.",
        tags: ["free", "outdoors"],
      },
    ],
  },

  // ── 02. Where to eat ───────────────────────────────────────────────────────
  // Haggle MOVED HERE from Shops — it's a Middle Eastern restaurant on
  // St Benedicts, not a vintage shop. Tom to confirm or replace.
  {
    id: "eat",
    shortLabel: "Eat",
    eyebrow: "Hungry?",
    headingLora: "Where I'd send you",
    headingCaveat: "to eat.",
    intro: "Sit-down to grab-and-go. All within reach of the city centre unless I've said otherwise.",
    icon: "fork",
    picks: [
      {
        name: "Yard",
        nickname: "fresh pasta on Pottergate",
        body: "Fresh pasta made on the premises, walk-ins only. Grab a table in the cellar bar if the main room’s full, or the churchyard opposite if it’s warm.",
        mapsUrl: "https://share.google/DJJh99gaNiiuf8B2O",
        website: "https://www.yardnorwich.com/",
        image: "/images/pottergate-stock.png",
        imageAlt: "Pottergate, the Norwich Lanes street where Yard sits.",
        tags: ["dinner", "drink", "on-the-tour"],
      },
      {
        name: "Big Deal's Bodega",
        nickname: "best sandwich on the market",
        body: "Best sandwich in the city, no contest. Open Tuesday to Saturday lunchtime only, so plan around it. Ask for the Parmageddon if you’re hungry.",
        mapsUrl: "https://share.google/t1xaXH0ueUUXLMPdD",
        image: "/images/guide/big-deals-bodega.webp",
        imageAlt: "A loaded Big Deal's Bodega sandwich under the deli signage on Norwich Market.",
        tags: ["lunch", "market-lunch", "on-the-tour"],
      },
      {
        name: "Olives",
        nickname: "brunch with the fruit on top",
        body: "[Replace with 1–2 lines on why you send people here.] Brunch spot Tom sends people to — pancake bowls piled with strawberries, banana, blueberries.",
        mapsUrl: mapsSearch("Olives Norwich brunch"),
        image: "/images/guide/olives.jpg",
        imageAlt: "A stack of pancakes at Olives topped with strawberries, banana and blueberries, dusted with sugar.",
        tags: ["brunch", "lunch"],
      },
      {
        name: "Café Thirty-Three",
        nickname: "33 Exchange Street",
        body: "[Replace with 1–2 lines on why you send people here.] Independent café on Exchange Street doing proper brunches and a full English worth showing up hungry for.",
        mapsUrl: mapsSearch("Cafe 33 Exchange Street Norwich"),
        image: "/images/guide/cafe-33.webp",
        imageAlt: "A full English breakfast on a red plate at Café Thirty-Three — sausage, beans, mushrooms, peppers, hash browns, toast.",
        tags: ["brunch", "lunch", "on-the-tour"],
      },
      {
        name: "Stoke Mill",
        nickname: "the old Colman's mustard mill",
        body: "Fine dining in the building where Colman’s first ground their mustard, a few miles outside town. Needs a taxi. Worth it for the special occasion.",
        mapsUrl: mapsSearch("Stoke Mill Restaurant Stoke Holy Cross"),
        website: "https://stokemill.co.uk/",
        tags: ["dinner"],
      },
      {
        name: "Benoli",
        nickname: "Italian on Timber Hill",
        body: "Italian, run by a chef who finished MasterChef Pro. Small room so book ahead. The pasta is the headline.",
        mapsUrl: mapsSearch("Benoli Restaurant Timber Hill Norwich"),
        website: "https://benolirestaurant.com/",
        tags: ["dinner"],
      },
      // Tom dropped the "steak near Benoli" pick 2026-05-24 — wasn't
      // Middletons or Prime. Will name it himself if it comes back.
      {
        name: "The Mediterranean Restaurant & Bar",
        nickname: "Turkish charcoal grill, Magdalen St",
        body: "Turkish charcoal grill on Magdalen Street, the real thing. Kebabs and mezze, no frills. The regulars know.",
        mapsUrl: mapsSearch("The Mediterranean Restaurant Magdalen Street Norwich"),
        tags: ["dinner"],
      },
      {
        name: "Amaretto Delicatessen",
        nickname: "Italian deli on St George's",
        body: "Italian deli where Fabrizio cooks upstairs every morning. Pizza by the slice, pastries, sausage rolls, hot lunch counter. The lunchtime queue is the giveaway.",
        mapsUrl: mapsSearch("Amaretto Delicatessen St George Street Norwich"),
        website: "https://amarettodeli.co.uk/",
        image: "/images/guide/amaretto.png",
        imageAlt: "Inside Amaretto Delicatessen — bowls of olives on the counter, Italian deli shelves stacked behind, Fabrizio working at the back.",
        tags: ["brunch", "lunch", "coffee", "on-the-tour"],
      },
      {
        name: "Café Gelato",
        nickname: "Norwich's first gelato parlour",
        body: "Italian gelato, churned daily with Norfolk milk and Sicilian pistachios. The queue out the door is the local endorsement. Cannoli and a coffee if you want to sit.",
        mapsUrl: mapsSearch("Cafe Gelato Opie Street Norwich"),
        image: "/images/guide/cafe-gelato.webp",
        imageAlt: "Café Gelato storefront on Opie Street, with the cone mascot outside.",
        tags: ["snacks", "coffee"],
      },
      // Tom confirmed 2026-05-24 via @andeatit on Instagram.
      {
        name: "And Eat It",
        nickname: "stuffed brownies on the market",
        body: "Brookies, brownies, blondies, all stuffed with something ridiculous. £3 buys you something deeply unhealthy and worth it. Find them on the market.",
        mapsUrl: mapsSearch("And Eat It Norwich Market"),
        website: "https://www.instagram.com/andeatit/",
        image: "/images/guide/and-eat-it.webp",
        imageAlt: "Stuffed brookies on the And Eat It stall — Choccy, Terry's Orange, Raspberry & Pistachio.",
        tags: ["snacks", "market-lunch", "on-the-tour"],
      },
      {
        name: "Haggle",
        nickname: "Middle Eastern on St Benedicts",
        body: "Middle Eastern small plates on St Benedicts. Order more than you think you need, share everything, take your time.",
        mapsUrl: mapsSearch("Haggle Restaurant St Benedicts Norwich"),
        website: "http://hagglerestaurant.com/",
        tags: ["dinner"],
      },
      // CONFIRM: Tom mentioned "Yum" on the call but didn't specify which
      // — multiple "Yum" venues in Norwich (Yum Yum Asian, etc). Placeholder
      // with the generic name + search URL. Tom to swap with the actual
      // venue's name + website + correct tags.
      {
        name: "[CONFIRM] Yum",
        nickname: "Tom to specify which Yum",
        body: "[Replace with 1–2 lines on why you send people here.]",
        mapsUrl: mapsSearch("Yum restaurant Norwich"),
        tags: ["dinner"],
      },
      // CONFIRM: Tom asked for "the kimchi" — Korean spot in Norwich.
      // Placeholder name + Korean tags. Tom to confirm exact venue name,
      // website, and whether it's lunch, dinner, or both.
      {
        name: "[CONFIRM] Kimchi",
        nickname: "Korean in Norwich",
        body: "[Replace with 1–2 lines on why you send people here.]",
        mapsUrl: mapsSearch("Kimchi Korean Norwich"),
        tags: ["lunch", "dinner"],
      },
    ],
  },

  // ── 03. Coffee + bread ─────────────────────────────────────────────────────
  {
    id: "coffee",
    shortLabel: "Coffee",
    eyebrow: "Caffeine and carbs",
    headingLora: "Where I get my",
    headingCaveat: "coffee and bread.",
    icon: "coffee",
    picks: [
      {
        name: "Strangers Coffee House",
        nickname: "best place to sit in",
        body: "Pottergate cafe roasting their own beans round the corner on Dove Street. Take the back room, grab a sausage roll, stay an hour. Best place in the city to write a postcard.",
        mapsUrl: "https://maps.app.goo.gl/raF7htSnMyaeyv7y6",
        website: "https://strangerscoffee.com/",
        image: "/images/guide/strangers-coffee.webp",
        imageAlt: "A latte at Strangers Coffee House in their branded black cup.",
        tags: ["coffee", "rainy-day", "on-the-tour"],
      },
      {
        name: "Bread Source",
        nickname: "sourdough + viennoiserie",
        body: "Sourdough loaves, almond croissants, sandwiches that disappear by 2pm. The Upper St Giles branch is the easiest hit. The market stalls if you’re already there.",
        mapsUrl: mapsSearch("Bread Source Upper St Giles Norwich"),
        website: "https://www.bread-source.co.uk/",
        image: "/images/guide/bread-source.webp",
        imageAlt: "Bread Source storefront with the #BreadSource signage above the window.",
        tags: ["brunch", "lunch", "coffee"],
      },
    ],
  },

  // ── 04. Pubs + a beer ──────────────────────────────────────────────────────
  // Tom said "Fat Cat brewery" — that's actually two separate venues:
  // the original Fat Cat pub on West End St (1991, multi-time CAMRA Pub of
  // the Year) AND the Fat Cat Brewery Tap on Lawson Rd (the brewery's own
  // taproom). Listed both. Tom to drop one if he only meant one.
  {
    id: "pubs",
    shortLabel: "Pubs",
    eyebrow: "After the tour",
    headingLora: "Where to go",
    headingCaveat: "for a pint.",
    icon: "beer",
    picks: [
      {
        name: "The Fat Cat",
        nickname: "the original on West End St",
        body: "Two-time CAMRA National Pub of the Year, twenty-plus cask ales any day of the week. A Norwich institution: no telly, no music, just beer and people who know it.",
        mapsUrl: mapsSearch("Fat Cat Pub West End Street Norwich"),
        website: "https://www.fatcatpub.co.uk/",
        tags: ["drink", "rainy-day"],
      },
      {
        name: "Fat Cat Brewery Tap",
        nickname: "the taproom on Lawson Rd",
        body: "Same family as The Fat Cat, mile up the road in the building where they make the beer. Smaller and quieter, more of a local crowd than tourists.",
        mapsUrl: mapsSearch("Fat Cat Brewery Tap Lawson Road Norwich"),
        website: "https://fatcattap.co.uk/",
        tags: ["drink"],
      },
      {
        name: "The Belgian Monk",
        nickname: "Belgian beer on Pottergate",
        body: "[Replace with 1–2 lines on why you send people here.] Belgian-beer specialist on Pottergate. 100+ Belgian beers on the menu, moules and frites if you’re hungry.",
        mapsUrl: mapsSearch("Belgian Monk Pottergate Norwich"),
        website: "https://thebelgianmonk.com/",
        tags: ["drink"],
      },
    ],
  },

  // ── 05. Free things still worth doing ──────────────────────────────────────
  {
    id: "free",
    shortLabel: "Free",
    eyebrow: "Costs nothing",
    headingLora: "Free things still",
    headingCaveat: "worth doing.",
    intro: "Things you can do in Norwich without spending a penny. Beyond the obvious.",
    icon: "sparkle",
    picks: [
      {
        name: "Free Cathedral guided walking tour",
        nickname: "Mon–Sat, hourly 10am–3pm",
        body: "Volunteers run a free hour-long tour of the Cathedral, hourly Monday to Saturday. Meet at the font, no booking. The guides know things the signs don’t say.",
        mapsUrl: mapsSearch("Norwich Cathedral"),
        website: "https://cathedral.org.uk/visit/cathedral-tours/",
        image: "/images/tour/group-cathedral-west-front.jpg",
        imageAlt: "Norwich Cathedral's west front, the start of the free guided tour.",
        tags: ["free", "rainy-day", "on-the-tour"],
      },
      {
        name: "Evensong at Norwich Cathedral",
        nickname: "Sun 3.30pm + weekdays 5.30pm",
        body: "Sung service most evenings, 45 minutes, no entry fee, no booking. The choir is genuinely excellent. Even non-religious visitors come for the acoustics.",
        mapsUrl: mapsSearch("Norwich Cathedral"),
        website: "https://cathedral.org.uk/worship/worship-with-us/evensong/",
        image: "/images/norwich-cathedral-stock.png",
        imageAlt: "Norwich Cathedral, the 900-year-old Norman cathedral with the second-tallest spire in England.",
        tags: ["free", "rainy-day", "on-the-tour"],
      },
      {
        name: "Plantation Garden",
        body: "A Victorian sunken garden hidden behind a hotel on Earlham Road. Most locals don’t even know it’s there. Bring a book and lose an hour by the gothic fountain.",
        mapsUrl: mapsSearch("Plantation Garden Norwich"),
        website: "https://plantationgarden.co.uk/",
        tags: ["free", "outdoors"],
      },
      {
        name: "Riverside walk via Cow Tower",
        body: "Pick up the path at Fye Bridge and walk past Cow Tower toward the Cathedral. Half an hour, no traffic, river views you can’t see from the streets.",
        mapsUrl: mapsSearch("Cow Tower Norwich"),
        image: "/images/guide/riverside-walk.jpg",
        imageAlt: "The Wensum riverside path lined with willow trees, looking toward a bridge in the distance.",
        tags: ["free", "outdoors"],
      },
    ],
  },

  // ── 06. Shops worth your time ──────────────────────────────────────────────
  // CHANGES FROM TOM'S DUMP:
  //   - Adnams: NOT on Tombland — current branch is Unthank Road (Westlegate
  //     closed Sept 2024). Tom to confirm whether he still recommends it given
  //     the move (Unthank is a 15-min walk from city centre, not a stroll).
  //   - Haggle: moved to Eat section (it's a restaurant).
  //   - Elm Hill Shop: best guess is Elm Hill Craft Shop (1936, Morris family).
  //     There's also a separate "Elm" store in the Lanes despite the name.
  {
    id: "shops",
    shortLabel: "Shops",
    eyebrow: "Worth your time",
    headingLora: "Shops to",
    headingCaveat: "disappear into.",
    icon: "bag",
    picks: [
      {
        name: "Jarrolds Food Hall",
        nickname: "lower ground floor",
        body: "Skip the upper floors and head to the basement. Food hall with a walk-in cheese room, deli counter, wine bar, charcuterie bar. The department store has been in the family since 1770.",
        mapsUrl: mapsSearch("Jarrold Department Store London Street Norwich"),
        website: "https://www.jarrolds.co.uk/",
        image: "/images/guide/jarrolds-food-hall.webp",
        imageAlt: "Jarrolds Food Hall — sawhorse tables piled with Italian dried pasta in baskets, Italian deli shelves behind.",
        tags: ["rainy-day", "lunch", "on-the-tour"],
      },
      // Tom dropped Adnams 2026-05-24 — Tombland branch closed, current
      // Unthank Road site is too far out of centre for a post-tour rec.
      {
        name: "Thorns",
        nickname: "independent DIY since 1835",
        body: "Independent DIY shop trading since 1835. If your B&B’s hairdryer breaks at 9am, this is where to go. Three generations behind the counter, eight departments, none of them on a screen.",
        mapsUrl: mapsSearch("Thorns DIY Exchange Street Norwich"),
        website: "https://thornsdiy.com/",
        tags: ["rainy-day", "on-the-tour"],
      },
      {
        name: "Looses Emporium",
        nickname: "60 dealers, two floors of stuff",
        body: "Sixty antique and vintage dealers under one roof, two floors of stuff you didn’t know you wanted. Cafe in the middle for when your feet give up.",
        mapsUrl: mapsSearch("Looses Emporium Magdalen Street Norwich"),
        tags: ["rainy-day"],
      },
      {
        name: "St Gregory's Antiques & Collectables",
        nickname: "inside a 14th-century church",
        body: "Antiques shop inside a 14th-century deconsecrated church. The St George and the Dragon wall painting at the back is worth the visit on its own. Walk in free even if you’re not buying.",
        mapsUrl: mapsSearch("St Gregorys Antiques Norwich"),
        image: "/images/tour/pottergate-st-gregorys.jpg",
        imageAlt: "St Gregory's Church on Pottergate, now the antiques centre.",
        tags: ["rainy-day", "free", "on-the-tour"],
      },
      {
        name: "[CONFIRM] Elm Hill Craft Shop",
        nickname: "1936, on the cobbled hill",
        body: "On the cobbled bit, opened in 1936, run by the same family for 35 years. Stationery you actually want to use and kids’ stuff that isn’t plastic. The kind of shop you wish your hometown had.",
        mapsUrl: mapsSearch("Elm Hill Craft Shop Norwich"),
        image: "/images/tour/elm-hill-tour.jpg",
        imageAlt: "Elm Hill, the cobbled medieval street where the craft shop sits.",
        tags: ["rainy-day", "on-the-tour"],
      },
    ],
  },

  // ── 07. Other walking tours ────────────────────────────────────────────────
  // CHANGES FROM TOM'S DUMP:
  //   - "Hidden Streets" + "Shoe Box Experience" = same tour (The Shoebox
  //     Experiences runs the Hidden Street Tour). Consolidated to one pick.
  //   - "Cherry Cade" = misheard name. Actual name: Cheryl Cade Tours
  //     (a.k.a. Adventures in Taste). Beer + sausage roll tour is real
  //     and well-reviewed (£53pp, 4hr, 5 venues).
  {
    id: "tours",
    shortLabel: "More tours",
    eyebrow: "More walks",
    headingLora: "Other walking tours",
    headingCaveat: "worth doing.",
    intro: "If today wasn't enough, these are tours run by other Norwich locals I rate. No commission, no kickbacks.",
    icon: "walk",
    picks: [
      {
        name: "The Shoebox — Hidden Street Tour",
        nickname: "underneath the Castle",
        body: "Only underground tour in the city. They take you down two flights of stairs into a 15th-century street that’s been buried under the modern road for centuries. Booking essential.",
        mapsUrl: mapsSearch("Shoebox Experiences Norwich Castle Meadow"),
        website: "https://www.theshoebox.org.uk/the-shoebox-experiences/experience/norwichs-hidden-street-tour/",
        image: "/images/norwich-castle.png",
        imageAlt: "Norwich Castle on its mound — the tour starts opposite, on Castle Meadow.",
        tags: ["rainy-day"],
      },
      {
        name: "Cheryl Cade Tours",
        nickname: "beer, sausage rolls + a pastry",
        body: "Cheryl runs a beer-and-sausage-roll tour that I genuinely think is the best food tour in the city. £53, four hours, five pubs, more sausage rolls than is sensible.",
        mapsUrl: mapsSearch("Cheryl Cade Tours Norwich"),
        website: "https://cherylcade.com/",
        tags: ["drink"],
      },
      {
        name: "Norwich Ghost Walks",
        nickname: "meets at the Adam & Eve",
        body: "Two hours of stories after dark, told well. Meets at the Adam & Eve at half seven. Pick the Elm Hill route if it’s your first one.",
        mapsUrl: mapsSearch("Adam and Eve Pub Bishopgate Norwich"),
        website: "https://www.ghostwalksnorwich.co.uk/",
        tags: ["outdoors"],
      },
    ],
  },

  // ── 08. Outdoor activities ─────────────────────────────────────────────────
  {
    id: "outdoor",
    shortLabel: "Outdoors",
    eyebrow: "Get on the water",
    headingLora: "Outdoor stuff",
    headingCaveat: "I'd actually do.",
    icon: "paddle",
    picks: [
      {
        name: "Pub and Paddle",
        nickname: "canoe a pub crawl on the Wensum",
        body: "Hire a canoe behind the Ribs of Beef and paddle to a riverside pub for a pint. Four routes from the same launch point. Worth it if it’s actually warm.",
        mapsUrl: mapsSearch("Pub and Paddle Elm Hill Quay Norwich"),
        website: "https://www.pubandpaddle.com/",
        tags: ["outdoors", "drink"],
      },
      {
        name: "Bishy Barney Boats",
        nickname: "ladybird day boats on the Wensum",
        body: "Bright red electric day boats painted to look like ladybirds (a bishy barnabee is Norfolk for ladybird). The only boat hire that goes right into the city centre and up to New Mills. £20 an hour, holds five, book ahead.",
        mapsUrl: mapsSearch("Bishy Barney Boats Norwich"),
        website: "https://bishybarneyboats.co.uk/",
        tags: ["outdoors"],
      },
      {
        name: "The Lions' Den",
        nickname: "river sauna + rooftop sauna",
        body: "Sauna on the river or a rooftop in town, depending which Lions’ Den you book. Ice baths, paddleboarding lessons, and an alcohol-free bar by the saunas. Feels like Helsinki dropped into Norwich.",
        mapsUrl: mapsSearch("Lions Den Norwich"),
        website: "https://www.thelionsdennorwich.com/",
        tags: ["outdoors"],
      },
    ],
  },

  // ── 08.5. When it rains ────────────────────────────────────────────────────
  // New section added 2026-05-26 per Tom — no indoor-cultural pick existed.
  // Currently just Cinema City but designed to expand (theatre, art venues).
  {
    id: "indoors",
    shortLabel: "Indoors",
    eyebrow: "When it rains",
    headingLora: "Cover from",
    headingCaveat: "the weather.",
    icon: "ticket",
    picks: [
      {
        name: "Cinema City",
        nickname: "indie cinema in a medieval house",
        body: "Independent cinema housed inside a 14th-century merchant's house on St Andrews. Picturehouse-run, so the programming is good. Restaurant and bar attached for a full evening out.",
        mapsUrl: mapsSearch("Cinema City St Andrews Norwich"),
        website: "https://www.picturehouses.com/cinema/cinema-city",
        tags: ["rainy-day"],
      },
      {
        name: "Norwich Castle Museum",
        nickname: "Norman keep, just reopened",
        body: "[Replace with 1–2 lines on why you send people here.] The Norman keep on the hill in the middle of town, reopened 2025 after a £15m redevelopment. The new Medieval Gallery is a British Museum partnership.",
        mapsUrl: mapsSearch("Norwich Castle Museum"),
        website: "https://www.norwichcastle.norfolk.gov.uk/",
        image: "/images/norwich-castle.png",
        imageAlt: "Norwich Castle, the Norman fortress overlooking the city.",
        tags: ["rainy-day", "on-the-tour"],
      },
      {
        name: "Strangers' Hall",
        nickname: "merchant's house turned museum",
        body: "[Replace with 1–2 lines on why you send people here.] A 14th-century merchant's house with rooms decorated as they were across the centuries. Tudor, Georgian, Victorian, all under one roof. A short walk from the tour finish.",
        mapsUrl: mapsSearch("Strangers Hall Norwich"),
        website: "https://www.museums.norfolk.gov.uk/strangers-hall",
        tags: ["rainy-day"],
      },
    ],
  },

  // ── 09. Day trips out of the city ──────────────────────────────────────────
  // CONFIRM: Tom said "favourite fish & chips in Cromer (not No.1)". Best
  // guess is Mary Jane's — the other big chippy in Cromer alongside No.1.
  // "Joyful West's" (also briefly considered) doesn't exist as searched.
  {
    id: "day-trips",
    shortLabel: "Day trips",
    eyebrow: "Out of town",
    headingLora: "Day trips when",
    headingCaveat: "Norwich isn't enough.",
    intro: "All within an hour of the city. Pack a coat, the Norfolk wind has opinions.",
    icon: "route",
    picks: [
      {
        name: "Overstrand to Cromer cliff walk",
        nickname: "2 miles on the Norfolk Coast Path",
        body: "Two miles on the cliffs between Overstrand and Cromer, train back to Norwich if you can’t be bothered to walk both ways. Don’t get too close to the edge, the cliffs actually fall.",
        mapsUrl: mapsSearch("Overstrand cliff path Cromer Norfolk"),
        tags: ["day-trip", "outdoors", "free"],
      },
      {
        name: "Cromer to Sheringham coastal walk",
        nickname: "4.5 miles, train back from either end",
        body: "Train out to Cromer, walk four and a half miles along the cliffs to Sheringham, train back. Climb Beeston Bump halfway. Stop for a Mary Jane's chip dinner in Cromer at the end.",
        mapsUrl: mapsSearch("Cromer to Sheringham Norfolk Coast Path"),
        tags: ["day-trip", "outdoors", "free"],
      },
      {
        name: "A day on the Broads from Wroxham",
        nickname: "Norfolk's defining waterway",
        body: "Half an hour out of Norwich and you're in the Broads proper. Hire a day boat in Wroxham, picnic on deck, watch the herons. Plenty of pubs to moor at along the way.",
        mapsUrl: mapsSearch("Wroxham Norfolk Broads day boat hire"),
        tags: ["day-trip", "outdoors"],
      },
      {
        name: "[CONFIRM] Mary Jane's Fish & Chips, Cromer",
        nickname: "the other one (not No.1)",
        body: "Better than No.1, in my opinion, though half of Cromer would fight me on it. Fried in beef dripping. Sit-in or takeaway, both work.",
        mapsUrl: mapsSearch("Mary Janes Fish Chips Cromer"),
        tags: ["day-trip"],
      },
      {
        name: "Winbirri Vineyard",
        nickname: "Bacchus that won the world",
        body: "An English vineyard in Surlingham whose Bacchus once won Best in the World at the Decanter awards. Tours run by the head winemaker. Half an hour out of town.",
        mapsUrl: mapsSearch("Winbirri Vineyard Surlingham"),
        website: "https://www.winbirri.com/",
        image: "/images/guide/winbirri.webp",
        imageAlt: "Three branded Winbirri Vineyard tasting glasses on a wooden table in the sun.",
        tags: ["day-trip", "drink"],
      },
      {
        name: "Flint Vineyard",
        nickname: "Charmat sparkling + cellar door",
        body: "Hour south of the city, vineyard with a kitchen attached. Lunch Wednesday to Sunday, small plates and a glass of their sparkling. Dog-friendly, garden out the back.",
        mapsUrl: mapsSearch("Flint Vineyard Earsham"),
        website: "https://flintvineyard.com/",
        image: "/images/guide/flint-vineyard.jpg",
        imageAlt: "Flint Vineyard winemaker signing the head of an oak barrel.",
        tags: ["day-trip", "drink", "lunch"],
      },
    ],
  },

  // ── 10. Festivals ──────────────────────────────────────────────────────────
  // CONFIRM: There's "Norwich Wine Week" (10-day citywide event, 19–28 June
  // 2026, organised by Norwich BID) AND "Norwich Wine Fest" (3-day headline
  // event in Chapelfield Gardens, 14–16 June 2026). Listed the Week below —
  // swap to Fest if Tom wants the specific weekend.
  {
    id: "festivals",
    shortLabel: "Festivals",
    eyebrow: "Time your visit",
    headingLora: "Festivals worth",
    headingCaveat: "planning around.",
    icon: "calendar",
    picks: [
      {
        name: "Norwich Beer Festival",
        nickname: "300+ cask ales at The Halls",
        body: "Three hundred-plus cask ales in a medieval friary, late October, run by the local CAMRA crew. If you can time your visit, do.",
        mapsUrl: mapsSearch("Norwich Beer Festival The Halls"),
        website: "https://norwich.camra.org.uk/festival/",
        tags: ["drink"],
      },
      {
        name: "[CONFIRM] Norwich Wine Week",
        nickname: "10 days citywide, every June",
        body: "Ten days every June where every wine bar and restaurant in the city does something. The headline event is in Chapelfield Gardens. The fringe stuff in the wine bars is where the value is.",
        mapsUrl: mapsSearch("Norwich Wine Week"),
        website: "https://www.norwichwineweek.co.uk/",
        tags: ["drink"],
      },
    ],
  },
];

// Review CTA links — used by the closing block on /guide.
// Both pulled verbatim from Tom's post-tour email template.
export const reviewLinks = {
  google: "https://g.page/r/CWI7BtXPKyyZEAE/review",
  tripadvisor:
    "https://www.tripadvisor.com/UserReviewEdit-g186342-d34359588-Norwich_Free_Walking_Tours-Norwich_Norfolk_East_Anglia_England.html",
} as const;
