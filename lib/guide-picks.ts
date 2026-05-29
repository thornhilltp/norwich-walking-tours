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
  /** Recommendation tier — drives the visual emphasis on the card.
   *    "gold"   = "Tom's pick", the absolute best. Amber star + border.
   *               Also what the "Tom's favourites" question filters to.
   *               Keep scarce: 4-6 across the whole guide.
   *    "silver" = "Strong rec", really good. Green star + label, no border.
   *    undefined = on the list (still recommended), no special treatment.
   *  Replaced the old `favourite: boolean` 2026-05-27. */
  tier?: "gold" | "silver";
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
        // Example gold "Tom's pick" — Tom: set tier: "gold" on YOUR
        // absolute best (4-6 across the page), tier: "silver" on the
        // strong-but-not-top recommendations.
        tier: "gold",
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
        tier: "silver",
        nickname: "fresh pasta on Pottergate",
        body: "Fresh pasta made on the premises, walk-ins only. Grab a table in the cellar bar if the main room’s full, or the churchyard opposite if it’s warm.",
        mapsUrl: "https://share.google/DJJh99gaNiiuf8B2O",
        website: "https://www.yardnorwich.com/",
        image: "/images/guide/yard.webp",
        imageAlt: "A fig, prosciutto and walnut toast on sourdough at Yard, drizzled with honey.",
        tags: ["dinner", "drink", "on-the-tour"],
      },
      {
        name: "Big Deal's Bodega",
        tier: "gold",
        nickname: "best sandwich on the market",
        body: "Best sandwich in the city, no contest. Open Tuesday to Saturday lunchtime only, so plan around it. Ask for the Parmageddon if you’re hungry.",
        mapsUrl: "https://share.google/t1xaXH0ueUUXLMPdD",
        image: "/images/guide/big-deals-bodega.webp",
        imageAlt: "A loaded Big Deal's Bodega sandwich under the deli signage on Norwich Market.",
        tags: ["lunch", "market-lunch", "on-the-tour"],
      },
      {
        name: "Olives",
        nickname: "the full English to beat",
        body: "Brunch done properly. A full English that turns up loaded, proper coffee, and a room that's all regulars by ten. Go hungry.",
        mapsUrl: mapsSearch("Olives Norwich brunch"),
        image: "/images/guide/olives.webp",
        imageAlt: "A full English breakfast on a red plate at Olives: sausage, scrambled egg, beans, mushrooms, grilled tomato, peppers, hash browns and toast, with a coffee alongside.",
        tags: ["brunch", "lunch"],
      },
      {
        name: "Café Thirty-Three",
        nickname: "pancakes on Exchange Street",
        body: "Independent spot on Exchange Street. The stack of pancakes piled with strawberries, banana and blueberries is the order. Get there before the late-morning rush.",
        mapsUrl: mapsSearch("Cafe 33 Exchange Street Norwich"),
        image: "/images/guide/cafe-33.jpg",
        imageAlt: "A stack of pancakes at Café Thirty-Three topped with strawberries, banana and blueberries, dusted with icing sugar.",
        tags: ["brunch", "lunch", "on-the-tour"],
      },
      {
        name: "Stoke Mill",
        tier: "silver",
        nickname: "the old Colman's mustard mill",
        body: "Fine dining in the building where Colman’s first ground their mustard, a few miles outside town. Needs a taxi. Worth it for the special occasion.",
        mapsUrl: mapsSearch("Stoke Mill Restaurant Stoke Holy Cross"),
        website: "https://stokemill.co.uk/",
        image: "/images/guide/stoke-mill.jpg",
        imageAlt: "A fine-dining plate at Stoke Mill: fish, greens and a rich sauce, plated small.",
        tags: ["dinner"],
      },
      {
        name: "Benoli",
        tier: "silver",
        nickname: "Italian on Timber Hill",
        body: "Italian, run by a chef who finished MasterChef Pro. Small room so book ahead. The pasta is the headline.",
        mapsUrl: mapsSearch("Benoli Restaurant Timber Hill Norwich"),
        website: "https://benolirestaurant.com/",
        image: "/images/guide/benoli.jpg",
        imageAlt: "Benoli, the Italian restaurant on Timber Hill.",
        tags: ["dinner"],
      },
      // Tom dropped the "steak near Benoli" pick 2026-05-24 — wasn't
      // Middletons or Prime. Will name it himself if it comes back.
      {
        name: "The Mediterranean Restaurant & Bar",
        nickname: "Turkish charcoal grill, Magdalen St",
        body: "Turkish charcoal grill on Magdalen Street, the real thing. Kebabs and mezze, no frills. The regulars know.",
        mapsUrl: mapsSearch("The Mediterranean Restaurant Magdalen Street Norwich"),
        image: "/images/guide/mediterranean.jpg",
        imageAlt: "The Mediterranean Restaurant and Bar, the Turkish charcoal grill on Magdalen Street.",
        tags: ["dinner"],
      },
      {
        name: "Amaretto Delicatessen",
        tier: "silver",
        nickname: "Italian deli on St George's",
        body: "Italian deli where Fabrizio cooks upstairs every morning. Pizza by the slice, pastries, sausage rolls, hot lunch counter. The lunchtime queue is the giveaway.",
        mapsUrl: mapsSearch("Amaretto Delicatessen St George Street Norwich"),
        website: "https://amarettodeli.co.uk/",
        image: "/images/guide/amaretto.png",
        imageAlt: "Inside Amaretto Delicatessen: bowls of olives on the counter, Italian deli shelves stacked behind, Fabrizio working at the back.",
        tags: ["brunch", "lunch", "coffee", "on-the-tour"],
      },
      {
        name: "Café Gelato",
        tier: "silver",
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
        imageAlt: "Stuffed brookies on the And Eat It stall: Choccy, Terry's Orange, Raspberry and Pistachio.",
        tags: ["snacks", "market-lunch", "on-the-tour"],
      },
      {
        name: "Haggle",
        nickname: "Middle Eastern on St Benedicts",
        body: "Middle Eastern small plates on St Benedicts. Order more than you think you need, share everything, take your time.",
        mapsUrl: mapsSearch("Haggle Restaurant St Benedicts Norwich"),
        website: "http://hagglerestaurant.com/",
        image: "/images/guide/haggle.png",
        imageAlt: "Haggle, the Middle Eastern small-plates restaurant on St Benedicts Street.",
        tags: ["dinner"],
      },
      {
        name: "Yalm",
        nickname: "food hall in the Royal Arcade",
        body: "Food hall tucked in the Royal Arcade, the art nouveau one you walked through today. A handful of independent kitchens, one bar, shared tables. Where to go when nobody can agree on dinner.",
        mapsUrl: mapsSearch("Yalm Royal Arcade Norwich"),
        website: "https://www.yalm.co.uk/",
        image: "/images/guide/yalm.webp",
        imageAlt: "A chef carrying a tray of fresh sushi from one of the kitchens at Yalm food hall.",
        tags: ["lunch", "dinner", "drink", "on-the-tour"],
      },
      {
        name: "Kimchi",
        nickname: "Korean comfort food",
        body: "Korean comfort food, the kind you order too much of. Fried chicken, tteokbokki, dumplings, bibimbap. Go with people and share the lot. Small place, so book ahead.",
        mapsUrl: mapsSearch("Kimchi Korean Norwich"),
        website: "https://www.thekimchi.co.uk/",
        image: "/images/guide/kimchi.jpg",
        imageAlt: "A spread of Korean dishes on a wooden table: fried chicken, dumplings, tteokbokki, bibimbap bowls, kimchi and rice.",
        tags: ["lunch", "dinner"],
      },
      {
        name: "The Tipsy Vegan",
        nickname: "plant-based on St Benedicts",
        body: "Vegan food that wins over people who swore they hated vegan food. Small plates, comfort-food mains, proper cocktails. On St Benedicts with the rest of the good stuff.",
        mapsUrl: mapsSearch("The Tipsy Vegan St Benedicts Norwich"),
        image: "/images/guide/tipsy-vegan.jpg",
        imageAlt: "Plant-based small plates at The Tipsy Vegan: a creamy mac, greens and dumplings.",
        tags: ["dinner", "lunch"],
      },
      {
        name: "Ber Street Kitchen",
        nickname: "all-day brunch on Ber Street",
        body: "Brunch and all-day plates done generously, just up from the centre on Ber Street. Big breakfasts, loaded sandwiches, the kind of feed you need after a late one.",
        mapsUrl: mapsSearch("Ber Street Kitchen Norwich"),
        image: "/images/guide/ber-street-kitchen.jpg",
        imageAlt: "An overhead spread of brunch dishes at Ber Street Kitchen: full breakfasts, eggs, sandwiches and salads.",
        tags: ["brunch", "lunch"],
      },
      {
        name: "Donnelli's",
        nickname: "proper pizza, Italian run",
        body: "Italian-run pizzeria doing proper wood-fired pizza and meatballs. Nothing fancy, just the real thing done well. Go hungry and order the sides.",
        mapsUrl: mapsSearch("Donnellis pizza Norwich"),
        image: "/images/guide/donnellis.jpg",
        imageAlt: "A wood-fired pizza with a side of meatballs at Donnelli's.",
        tags: ["dinner", "lunch"],
      },
      {
        name: "Brick Pizza",
        nickname: "wood-fired, by the slice",
        body: "Proper wood-fired pizza, whole or by the slice. Quick, cheap and better than it has any right to be. Grab one and eat it on the move.",
        mapsUrl: mapsSearch("Brick Pizza Norwich"),
        image: "/images/guide/brick-pizza.png",
        imageAlt: "The Brick pizza logo.",
        tags: ["lunch", "dinner"],
      },
      {
        name: "Grosvenor Fish Bar",
        nickname: "chippy with a cellar to eat in",
        body: "The city's cult chip shop on Lower Goat Lane. Order at the counter, then take it down to the Dive, their cellar seating room. Beer-battered everything, mushy peas a must.",
        mapsUrl: mapsSearch("Grosvenor Fish Bar Norwich"),
        image: "/images/guide/grosvenor-fish-bar.jpg",
        imageAlt: "Beer-battered fish and chips with mushy peas in a basket at Grosvenor Fish Bar.",
        tags: ["lunch"],
      },
      {
        name: "Lucy's Chips",
        nickname: "market chips since 1971",
        body: "A market institution since 1971. A cone of chips, plenty of salt and vinegar, eaten wandering the stalls. Cheap and exactly what you want mid-afternoon.",
        mapsUrl: mapsSearch("Lucys Chips Norwich Market"),
        image: "/images/guide/lucys.jpg",
        imageAlt: "The Lucy's Chips logo, serving Norwich Market since 1971.",
        tags: ["lunch", "market-lunch", "on-the-tour"],
      },
      {
        name: "Seoul Born",
        nickname: "Korean, fresh and fast",
        body: "Korean rice bowls and fried chicken, bright and fresh. Counter service, generous portions. The kind of lunch you think about again the next day.",
        mapsUrl: mapsSearch("Seoul Born Norwich"),
        image: "/images/guide/seoul-born.jpg",
        imageAlt: "A Korean rice bowl with saucy fried chicken, sesame and pickled radish at Seoul Born.",
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
        tier: "gold",
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
        tier: "silver",
        nickname: "sourdough + viennoiserie",
        body: "Sourdough loaves, almond croissants, sandwiches that disappear by 2pm. The Upper St Giles branch is the easiest hit. The market stalls if you’re already there.",
        mapsUrl: mapsSearch("Bread Source Upper St Giles Norwich"),
        website: "https://www.bread-source.co.uk/",
        image: "/images/guide/bread-source.webp",
        imageAlt: "Bread Source storefront with the #BreadSource signage above the window.",
        tags: ["brunch", "lunch", "coffee"],
      },
      {
        name: "Blue Bear Coffee Co.",
        nickname: "on Tombland",
        body: "Small independent coffee bar on Tombland, right where the tour passes. Good beans, friendly, and a quick flat white without the queue at the bigger places.",
        mapsUrl: mapsSearch("Blue Bear Coffee Tombland Norwich"),
        image: "/images/guide/bear-coffee.jpg",
        imageAlt: "The Blue Bear Coffee Co. hanging sign on Tombland, Norwich.",
        tags: ["coffee", "on-the-tour"],
      },
      {
        name: "Wright's Café",
        nickname: "a good one to work in",
        body: "Corner café with proper coffee and tables you can actually sit and work at for an hour. Wifi, plug sockets, no one rushing you. Bring your laptop.",
        mapsUrl: mapsSearch("Wrights Cafe Norwich"),
        image: "/images/guide/wrights-cafe.jpg",
        imageAlt: "Wright's Café on a Norwich street corner, with outdoor seating and customers.",
        tags: ["coffee"],
      },
      {
        name: "The Merchant's House",
        nickname: "coffee and ale, one stop",
        body: "Café by day that does ale too, so it works whatever the hour. Sunny spot out front, friendly inside. Good for a coffee that turns into a pint without moving.",
        mapsUrl: mapsSearch("The Merchant's House cafe Norwich"),
        image: "/images/guide/merchant-house-cafe.jpg",
        imageAlt: "The Merchant's House, a green-fronted coffee and ale house in Norwich with pavement seating.",
        tags: ["coffee", "drink"],
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
        tier: "gold",
        nickname: "the original on West End St",
        body: "Two-time CAMRA National Pub of the Year, twenty-plus cask ales any day of the week. A Norwich institution: no telly, no music, just beer and people who know it.",
        mapsUrl: mapsSearch("Fat Cat Pub West End Street Norwich"),
        website: "https://www.fatcatpub.co.uk/",
        image: "/images/guide/fat-cat.jpg",
        imageAlt: "The Fat Cat, the multi-award-winning real-ale pub on West End Street.",
        tags: ["drink", "rainy-day"],
      },
      {
        name: "Fat Cat Brewery Tap",
        nickname: "the taproom on Lawson Rd",
        body: "Same family as The Fat Cat, mile up the road in the building where they make the beer. Smaller and quieter, more of a local crowd than tourists.",
        mapsUrl: mapsSearch("Fat Cat Brewery Tap Lawson Road Norwich"),
        website: "https://fatcattap.co.uk/",
        image: "/images/guide/fat-cat-brewery-tap.jpg",
        imageAlt: "The Fat Cat Brewery Tap, the taproom on Lawson Road.",
        tags: ["drink"],
      },
      {
        name: "The Belgian Monk",
        nickname: "Belgian beer on Pottergate",
        body: "Belgian-beer specialist on Pottergate. A hundred-plus Belgian beers on the menu, moules and frites if you're hungry.",
        mapsUrl: mapsSearch("Belgian Monk Pottergate Norwich"),
        website: "https://thebelgianmonk.com/",
        image: "/images/guide/belgian-monk.jpg",
        imageAlt: "The Belgian Monk, the Belgian beer and moules-frites bar on Pottergate.",
        tags: ["drink"],
      },
      {
        name: "Redwell Brewery",
        nickname: "Norwich beer, gluten-free too",
        body: "Norwich brewery turning out bright, hoppy cans, a lot of it gluten-free without making a fuss about it. Find the taproom for the freshest pour, or grab the cans across the city.",
        mapsUrl: mapsSearch("Redwell Brewery Norwich"),
        image: "/images/guide/redwell-brewery.jpg",
        imageAlt: "A stack of colourful Redwell Brewery beer cans.",
        tags: ["drink"],
      },
      {
        name: "Gyre & Gimble",
        nickname: "Norfolk gin in the Royal Arcade",
        body: "Norfolk gin bar tucked in the Royal Arcade, the art nouveau one you walked through today. Local spirits, a proper gin and tonic, and bottles to take home.",
        mapsUrl: mapsSearch("Gyre and Gimble Royal Arcade Norwich"),
        image: "/images/guide/gyre-and-gimble.png",
        imageAlt: "The Gyre & Gimble logo, a Norfolk gin maker.",
        tags: ["drink", "on-the-tour"],
      },
      {
        name: "Gonzo's",
        nickname: "cocktails, a rooftop and a burger",
        body: "Bar with a rooftop terrace and a kitchen that does a seriously good burger. Cocktails downstairs, sun upstairs. Gets lively later on.",
        mapsUrl: mapsSearch("Gonzos Tea Room Norwich"),
        image: "/images/guide/gonzos.jpg",
        imageAlt: "A loaded burger at Gonzo's, Norwich.",
        tags: ["drink", "dinner"],
      },
      {
        name: "Malt and Mardle",
        nickname: "micropub, proper ale",
        body: "Tiny micropub doing cask ale and conversation, no fruit machines, no telly. A mardle is a Norfolk natter, which tells you exactly what it's for.",
        mapsUrl: mapsSearch("Malt and Mardle Norwich"),
        image: "/images/guide/malt-and-mardle.jpg",
        imageAlt: "The Malt and Mardle micropub shopfront with its dark blue frontage.",
        tags: ["drink"],
      },
      {
        name: "The Artichoke",
        nickname: "real ale on Magdalen Road",
        body: "Proper real-ale pub on Magdalen Road, garden out the back, plenty of cask lines. The kind of local that knows its beer and its regulars.",
        mapsUrl: mapsSearch("The Artichoke Magdalen Road Norwich"),
        image: "/images/guide/artichoke.jpg",
        imageAlt: "The Artichoke pub logo, a green artichoke on a purple background.",
        tags: ["drink"],
      },
      {
        name: "The Playhouse",
        nickname: "theatre bar with the best courtyard",
        body: "Norwich Playhouse's bar has one of the best courtyards in the city, all colour and plants and sun-trap seating. Go for a drink even if you're not seeing a show.",
        mapsUrl: mapsSearch("Norwich Playhouse Theatre"),
        image: "/images/guide/playhouse.jpg",
        imageAlt: "The covered courtyard bar at Norwich Playhouse, a red-framed canopy with people at tables among plants.",
        tags: ["drink", "rainy-day"],
      },
      {
        name: "Hawthorn",
        nickname: "cocktails, low-lit and late",
        body: "Low-lit cocktail bar for when the pubs feel too bright. Proper drinks, made slowly, no rush to leave. Good for a quiet one or the start of a big night.",
        mapsUrl: mapsSearch("Hawthorn bar Norwich"),
        image: "/images/guide/hawthorns-bar.png",
        imageAlt: "The Hawthorn cocktail bar logo, a white blossom on black.",
        tags: ["drink"],
      },
      {
        name: "The Red Lion",
        nickname: "pasta and wine deal, Tue and Wed",
        body: "Pub doing a proper pasta and wine deal on Tuesdays and Wednesdays. Big bowls, a glass of red, not much change needed. Go midweek and make an evening of it.",
        mapsUrl: mapsSearch("Red Lion pub Norwich"),
        image: "/images/guide/red-lion.jpg",
        imageAlt: "Two bowls of spaghetti at The Red Lion.",
        tags: ["drink", "dinner"],
      },
      {
        name: "The Compleat Angler",
        nickname: "riverside terrace by the station",
        body: "Down by the river near the station, the reason to go is the terrace over the Wensum. Grab a pint, find a spot in the sun, watch the boats go by.",
        mapsUrl: mapsSearch("Compleat Angler pub Norwich"),
        image: "/images/guide/compleat-angler.jpg",
        imageAlt: "The riverside terrace of The Compleat Angler overlooking the River Wensum.",
        tags: ["drink", "outdoors"],
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
        tier: "silver",
        nickname: "Mon–Sat, hourly 10am–3pm",
        body: "Volunteers run a free hour-long tour of the Cathedral, hourly Monday to Saturday. Meet at the font, no booking. The guides know things the signs don’t say.",
        mapsUrl: mapsSearch("Norwich Cathedral"),
        website: "https://cathedral.org.uk/visit/cathedral-tours/",
        image: "/images/guide/cathedral.png",
        imageAlt: "Norwich Cathedral's west front framed by the stone arch of the Erpingham Gate.",
        tags: ["free", "rainy-day", "on-the-tour"],
      },
      {
        name: "Evensong at Norwich Cathedral",
        nickname: "Sun 3.30pm + weekdays 5.30pm",
        body: "Sung service most evenings, 45 minutes, no entry fee, no booking. The choir is genuinely excellent. Even non-religious visitors come for the acoustics.",
        mapsUrl: mapsSearch("Norwich Cathedral"),
        website: "https://cathedral.org.uk/worship/worship-with-us/evensong/",
        image: "/images/guide/evensong.png",
        imageAlt: "The vaulted interior of Norwich Cathedral looking up at a tall stained-glass window.",
        tags: ["free", "rainy-day", "on-the-tour"],
      },
      {
        name: "Plantation Garden",
        tier: "silver",
        body: "A Victorian sunken garden hidden behind a hotel on Earlham Road. Most locals don’t even know it’s there. Bring a book and lose an hour by the gothic fountain.",
        mapsUrl: mapsSearch("Plantation Garden Norwich"),
        website: "https://plantationgarden.co.uk/",
        image: "/images/guide/plantation-garden.jpg",
        imageAlt: "The Plantation Garden, the restored Victorian sunken garden off Earlham Road.",
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
      {
        name: "Marriott's Way",
        nickname: "26 miles of old railway",
        body: "A disused railway line turned green path, running 26 miles from Norwich out to Aylsham. Walk a stretch or hire a bike. Flat, traffic-free, and quiet once you're out of the city.",
        mapsUrl: mapsSearch("Marriotts Way Norwich"),
        image: "/images/guide/marriotts-way.jpg",
        imageAlt: "A cyclist on the wooded Marriott's Way trail outside Norwich.",
        tags: ["free", "outdoors"],
      },
      {
        name: "Sainsbury Centre",
        nickname: "free art at the UEA",
        body: "Norman Foster's first big building, out at the UEA, holding a serious art collection. Free to get in, rarely busy, and worth the bus ride for the building alone.",
        mapsUrl: mapsSearch("Sainsbury Centre UEA Norwich"),
        image: "/images/guide/sainsbury-centre.jpg",
        imageAlt: "The Sainsbury Centre at the University of East Anglia, Norman Foster's glass and steel gallery building.",
        tags: ["free", "rainy-day"],
      },
      {
        name: "St Julian's Church & the Julian Centre",
        nickname: "Julian of Norwich's cell",
        body: "The rebuilt cell of Julian of Norwich, the first woman to write a book in English. A tiny, quiet shrine tucked off the main streets. Free to step into, calm in a way the city centre isn't.",
        mapsUrl: mapsSearch("St Julians Church Norwich Julian Centre"),
        image: "/images/guide/st-julians.jpg",
        imageAlt: "St Julian's Church in Norwich, a flint church with an arched porch, home to the Julian of Norwich shrine.",
        tags: ["free", "rainy-day"],
      },
    ],
  },

  // ── 06. Shops worth your time ──────────────────────────────────────────────
  // CHANGES FROM TOM'S DUMP:
  //   - Adnams: NOT on Tombland — current branch is Unthank Road (Westlegate
  //     closed Sept 2024). Tom to confirm whether he still recommends it given
  //     the move (Unthank is a 15-min walk from city centre, not a stroll).
  //   - Haggle: moved to Eat section (it's a restaurant).
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
        imageAlt: "Jarrolds Food Hall: sawhorse tables piled with Italian dried pasta in baskets, Italian deli shelves behind.",
        tags: ["rainy-day", "lunch", "on-the-tour"],
      },
      // Tom dropped Adnams 2026-05-24 — Tombland branch closed, current
      // Unthank Road site is too far out of centre for a post-tour rec.
      {
        name: "Thorns",
        tier: "silver",
        nickname: "independent DIY since 1835",
        body: "Independent DIY shop trading since 1835. If your B&B’s hairdryer breaks at 9am, this is where to go. Three generations behind the counter, eight departments, none of them on a screen.",
        mapsUrl: mapsSearch("Thorns DIY Exchange Street Norwich"),
        website: "https://thornsdiy.com/",
        image: "/images/guide/thorns.jpg",
        imageAlt: "The bright red Thorns storefront on Exchange Street, the independent ironmongers and tool merchants.",
        tags: ["rainy-day", "on-the-tour"],
      },
      {
        name: "Looses Emporium",
        nickname: "60 dealers, two floors of stuff",
        body: "Sixty antique and vintage dealers under one roof, two floors of stuff you didn’t know you wanted. Cafe in the middle for when your feet give up.",
        mapsUrl: mapsSearch("Looses Emporium Magdalen Street Norwich"),
        image: "/images/guide/looses.jpg",
        imageAlt: "Looses Emporium, the antiques and vintage centre on Magdalen Street.",
        tags: ["rainy-day"],
      },
      {
        name: "St Gregory's Antiques & Collectables",
        nickname: "inside a 14th-century church",
        body: "Antiques shop inside a 14th-century deconsecrated church. The St George and the Dragon wall painting at the back is worth the visit on its own. Walk in free even if you’re not buying.",
        mapsUrl: mapsSearch("St Gregorys Antiques Norwich"),
        image: "/images/guide/st-gregorys.jpg",
        imageAlt: "The entrance to St Gregory's Antiques & Collectables, set in the arched doorway of the old church with bunting and signboards outside.",
        tags: ["rainy-day", "free", "on-the-tour"],
      },
      {
        name: "Elm",
        nickname: "lifestyle shop in the Lanes",
        body: "Independent lifestyle and homeware shop in the Lanes, full of books, prints and things you didn't plan to buy. Easy to lose twenty minutes in.",
        mapsUrl: mapsSearch("Elm shop Norwich Lanes"),
        image: "/images/guide/elm-lanes.jpg",
        imageAlt: "A shelf of illustrated children's books inside Elm, the lifestyle shop in the Norwich Lanes.",
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
        name: "The Shoebox Hidden Street Tour",
        tier: "silver",
        nickname: "underneath the Castle",
        body: "Only underground tour in the city. They take you down two flights of stairs into a 15th-century street that’s been buried under the modern road for centuries. Booking essential.",
        mapsUrl: mapsSearch("Shoebox Experiences Norwich Castle Meadow"),
        website: "https://www.theshoebox.org.uk/the-shoebox-experiences/experience/norwichs-hidden-street-tour/",
        image: "/images/guide/shoebox.jpg",
        imageAlt: "The Hidden Street Tour run by The Shoebox Experiences, which descends to a buried medieval street near Norwich Castle.",
        tags: ["rainy-day"],
      },
      {
        name: "Cheryl Cade Tours",
        tier: "gold",
        nickname: "beer, sausage rolls + a pastry",
        body: "Cheryl runs a beer-and-sausage-roll tour that I genuinely think is the best food tour in the city. £53, four hours, five pubs, more sausage rolls than is sensible.",
        mapsUrl: mapsSearch("Cheryl Cade Tours Norwich"),
        website: "https://cherylcade.com/",
        image: "/images/guide/cheryl-cade.jpg",
        imageAlt: "Cheryl Cade's beer and sausage-roll walking tour of Norwich.",
        tags: ["drink"],
      },
      {
        name: "Norwich Story Walks",
        nickname: "history with a quirky streak",
        body: "Norwich's hidden histories with an eccentric streak, told by a local. About 90 minutes, a tenner a head. Book ahead, the line-up changes with the season.",
        mapsUrl: mapsSearch("Norwich Story Walks"),
        website: "https://norwichstorywalks.co.uk/",
        image: "/images/guide/norwich-story-walks.jpg",
        imageAlt: "A Norwich Story Walks guided walking tour through the old city of Norwich.",
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
        tier: "silver",
        nickname: "canoe a pub crawl on the Wensum",
        body: "Hire a canoe behind the Ribs of Beef and paddle to a riverside pub for a pint. Four routes from the same launch point. Worth it if it’s actually warm.",
        mapsUrl: mapsSearch("Pub and Paddle Elm Hill Quay Norwich"),
        website: "https://www.pubandpaddle.com/",
        image: "/images/guide/pub-and-paddle.jpg",
        imageAlt: "Pub and Paddle canoe hire on the River Wensum in Norwich.",
        tags: ["outdoors", "drink"],
      },
      {
        name: "Bishy Barney Boats",
        nickname: "ladybird day boats on the Wensum",
        body: "Bright red electric day boats painted to look like ladybirds (a bishy barnabee is Norfolk for ladybird). The only boat hire that goes right into the city centre and up to New Mills. £20 an hour, holds five, book ahead.",
        mapsUrl: mapsSearch("Bishy Barney Boats Norwich"),
        website: "https://bishybarneyboats.co.uk/",
        image: "/images/guide/bishy-barney.jpg",
        imageAlt: "A Bishy Barney ladybird day boat on the River Wensum.",
        tags: ["outdoors"],
      },
      {
        name: "The Lions' Den",
        tier: "silver",
        nickname: "river sauna + rooftop sauna",
        body: "Sauna on the river or a rooftop in town, depending which Lions’ Den you book. Ice baths, paddleboarding lessons, and an alcohol-free bar by the saunas. Feels like Helsinki dropped into Norwich.",
        mapsUrl: mapsSearch("Lions Den Norwich"),
        website: "https://www.thelionsdennorwich.com/",
        image: "/images/guide/lions-den.png",
        imageAlt: "The Lions' Den riverside sauna in Norwich.",
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
        image: "/images/guide/cinema-city.jpg",
        imageAlt: "Cinema City, the independent cinema in a medieval merchant's house on St Andrews.",
        tags: ["rainy-day"],
      },
      {
        name: "Norwich Castle Museum",
        tier: "silver",
        nickname: "Norman keep, just reopened",
        body: "The Norman keep on the hill in the middle of town, reopened 2025 after a £15m redevelopment. The new Medieval Gallery is a British Museum partnership. Climb up for the views.",
        mapsUrl: mapsSearch("Norwich Castle Museum"),
        website: "https://www.norwichcastle.norfolk.gov.uk/",
        image: "/images/guide/castle-museum.jpg",
        imageAlt: "Norwich Castle Museum, the Norman keep on the hill in the centre of the city.",
        tags: ["rainy-day", "on-the-tour"],
      },
      {
        name: "Strangers' Hall",
        nickname: "merchant's house turned museum",
        body: "A 14th-century merchant's house with rooms decorated as they were across the centuries. Tudor, Georgian, Victorian, all under one roof. A short walk from the tour finish.",
        mapsUrl: mapsSearch("Strangers Hall Norwich"),
        website: "https://www.museums.norfolk.gov.uk/strangers-hall",
        image: "/images/guide/strangers-hall.jpg",
        imageAlt: "Strangers' Hall, the medieval merchant's house museum in Norwich.",
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
        image: "/images/guide/overstrand-cromer.jpg",
        imageAlt: "The clifftop Norfolk Coast Path between Overstrand and Cromer.",
        tags: ["day-trip", "outdoors", "free"],
      },
      {
        name: "Cromer to Sheringham coastal walk",
        nickname: "4.5 miles, train back from either end",
        body: "Train out to Cromer, walk four and a half miles along the cliffs to Sheringham, train back. Climb Beeston Bump halfway. Stop for a Mary Jane's chip dinner in Cromer at the end.",
        mapsUrl: mapsSearch("Cromer to Sheringham Norfolk Coast Path"),
        image: "/images/guide/cromer-sheringham.jpg",
        imageAlt: "The clifftop coastal walk from Cromer to Sheringham, past Beeston Bump.",
        tags: ["day-trip", "outdoors", "free"],
      },
      {
        name: "A day on the Broads from Wroxham",
        nickname: "Norfolk's defining waterway",
        body: "Half an hour out of Norwich and you're in the Broads proper. Hire a day boat in Wroxham, picnic on deck, watch the herons. Plenty of pubs to moor at along the way.",
        mapsUrl: mapsSearch("Wroxham Norfolk Broads day boat hire"),
        image: "/images/guide/wroxham-broads.jpg",
        imageAlt: "Day boats on the water at Wroxham on the Norfolk Broads.",
        tags: ["day-trip", "outdoors"],
      },
      {
        name: "Mary Jane's Fish & Chips, Cromer",
        nickname: "the other one (not No.1)",
        body: "Better than No.1, in my opinion, though half of Cromer would fight me on it. Fried in beef dripping. Sit-in or takeaway, both work.",
        mapsUrl: mapsSearch("Mary Janes Fish Chips Cromer"),
        image: "/images/guide/mary-janes.jpg",
        imageAlt: "Mary Jane's Fish & Chips in Cromer.",
        tags: ["day-trip"],
      },
      {
        name: "Winbirri Vineyard",
        tier: "silver",
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
        tier: "silver",
        nickname: "Charmat sparkling + cellar door",
        body: "Hour south of the city, vineyard with a kitchen attached. Lunch Wednesday to Sunday, small plates and a glass of their sparkling. Dog-friendly, garden out the back.",
        mapsUrl: mapsSearch("Flint Vineyard Earsham"),
        website: "https://flintvineyard.com/",
        image: "/images/guide/flint-vineyard.jpg",
        imageAlt: "Flint Vineyard winemaker signing the head of an oak barrel.",
        tags: ["day-trip", "drink", "lunch"],
      },
      {
        name: "Holkham Beach",
        nickname: "the big golden one",
        body: "Miles of golden sand backed by pine woods, about an hour up the coast. Bring a windbreak and walk until the crowds vanish. The one the films use.",
        mapsUrl: mapsSearch("Holkham Beach Norfolk"),
        image: "/images/guide/holkham-beach.jpg",
        imageAlt: "The boardwalk through pine woods down to the sand at Holkham beach.",
        tags: ["day-trip", "outdoors", "free"],
      },
      {
        name: "Southwold",
        nickname: "beach huts, pier and Adnams",
        body: "Proper seaside town over the Suffolk border. Pastel beach huts, a Victorian pier, and Adnams brewed in the town. The Anchor does a good lunch with a sea view.",
        mapsUrl: mapsSearch("Southwold Suffolk"),
        image: "/images/guide/southwold.jpg",
        imageAlt: "Pastel beach huts above the sand at Southwold, the pier in the distance.",
        tags: ["day-trip"],
      },
      {
        name: "Walcott beach + Poachers Pocket",
        nickname: "a pub right on the sand",
        body: "Quiet north Norfolk beach where the Poachers Pocket sits right on the seafront. Park up, walk the sand, then a pint looking at the sea. No frills, all the better for it.",
        mapsUrl: mapsSearch("Poachers Pocket Walcott Norfolk"),
        image: "/images/guide/walcott-beach.jpg",
        imageAlt: "The beach at Walcott on the north Norfolk coast, blue railings along the seafront.",
        tags: ["day-trip"],
      },
      {
        name: "Thetford Forest",
        nickname: "bike trails and big pines",
        body: "England's largest lowland pine forest, about 40 minutes south. Hire a bike, climb at Go Ape, or just walk the trails from High Lodge. A good day out with kids.",
        mapsUrl: mapsSearch("Thetford Forest High Lodge"),
        image: "/images/guide/thetford-forest.jpg",
        imageAlt: "A sunlit path through the pines at Thetford Forest, the High Lodge centre beyond.",
        tags: ["day-trip", "outdoors"],
      },
      {
        name: "Blickling Hall",
        nickname: "Jacobean pile, Boleyn country",
        body: "A grand Jacobean mansion with gardens and parkland, said to be where Anne Boleyn was born. National Trust, about 40 minutes north. Worth a slow afternoon.",
        mapsUrl: mapsSearch("Blickling Hall Norfolk"),
        image: "/images/guide/blickling-hall.jpg",
        imageAlt: "The red-brick Jacobean facade of Blickling Hall, its clock tower and chimneys against the sky.",
        tags: ["day-trip", "outdoors"],
      },
    ],
  },

  // ── 10. Festivals ──────────────────────────────────────────────────────────
  // NOTE: "Norwich Wine Week" (10-day citywide, every June, organised by
  // Norwich BID). There's also a separate 3-day "Norwich Wine Fest" in
  // Chapelfield Gardens. Listed the Week; swap to Fest if you meant that.
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
        image: "/images/guide/beer-festival.jpg",
        imageAlt: "The Norwich Beer Festival, held in the medieval St Andrew's and Blackfriars Halls.",
        tags: ["drink"],
      },
      {
        name: "Norwich Wine Week",
        nickname: "10 days citywide, every June",
        body: "Ten days every June where every wine bar and restaurant in the city does something. The headline event is in Chapelfield Gardens. The fringe stuff in the wine bars is where the value is.",
        mapsUrl: mapsSearch("Norwich Wine Week"),
        website: "https://www.norwichwineweek.co.uk/",
        image: "/images/guide/wine-week.png",
        imageAlt: "Norwich Wine Week, the 10-day citywide wine festival held every June.",
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
