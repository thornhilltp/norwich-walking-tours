// Tour catalogue — PROTOTYPE DATA.
//
// Only `norwich-essentials` and `private-tours` describe tours that
// actually run today. Everything with status: "example" is placeholder
// copy so Tom can see the /tours layout populated. Real names, prices,
// schedules and photos land once Joolz and Holly scope their tours.
//
// When these become real: drop `status`, move the prices into the
// booking widget, and give each one a /tours/[slug] page.

export type TourStatus = "live" | "example";

/** Everything a tour's own landing page needs beyond the card. */
export interface TourDetails {
  /** Hero headline in the site's signature split: [Lora white, Caveat green]. */
  heroTitle: [string, string];
  /** One-line answer to the search query that lands here. */
  promise: string;
  /** The one named story/place that makes this walk unmissable. */
  hook?: string;
  /** 3-4 scannable bullets shown above the story. */
  highlights?: string[];
  /** Highlights as tap-to-open photo cards (Our Guides philosophy style).
      h = headline on the photo, teaser = one line, p = the opened
      paragraph (**bold** allowed). */
  highlightCards?: { h: string; teaser: string; p: string; img: string; alt: string; focal?: string }[];
  /** Stop-by-stop route: place + the story told there (from the guides' script). */
  route?: { place: string; story: string }[];
  /** Nightly run, mirrored from the booking system. Drives the Event
      structured data (one Google event per date). Keep in sync. */
  schedule?: {
    first: string; // YYYY-MM-DD
    last: string; // YYYY-MM-DD
    time: string; // HH:MM, UK local
    durationMin: number;
    place: { name: string; street: string; postcode: string };
  };
  /** Search title + description overrides (page <title> / meta). */
  seoTitle?: string;
  seoDescription?: string;
  /** Who it suits, e.g. "Ages 8+". Shown under the facts bar. */
  suitableFor?: string;
  /** How to spot the guide at the start point. */
  lookFor?: string;
  /** The story sold in 2-3 short paragraphs. **bold** = semibold ink. */
  story: string[];
  /** The-walk groups, homepage ThemedRouteSection language:
      what you'll see / where you'll go / what you leave with. */
  walk?: { eyebrow: string; headline: string; stops: string; body: string }[];
  /** What actually happens, in order. Logistics for planners. */
  /** Retired from the page (Tom 2026-08-31); kept optional for old data. */
  runOfShow?: string[];
  logistics: { label: string; value: string }[];
  /** Booking-app tour slug. When set, the hero slot shows the booking
      widget for this tour instead of the waiting-list form. */
  bookingTour?: string;
  /** Always-visible dark story teasers. When set, replaces the highlight
      cards, story and walk sections (Tom 2026-10-10: say it once). */
  darkStories?: { title: string; text: string; img: string; alt: string }[];
  /** Display face for the green script words. Default Caveat. */
  scriptFont?: "eater";
  /** Hero card: the scarcity/dates line that replaces a duplicate CTA. */
  availability?: { headline: string; sub: string };
  /** Real quotes about the guide (until the tour has its own). **bold** = Caveat highlight. */
  reviews?: { quote: string; author: string; source?: string }[];
  /** Scrollable photo strip. Swap for real tour shots as they arrive. */
  gallery?: { src: string; alt: string; caption: string }[];
  /** The guide, presented /our-guides style: polaroid + first person. */
  guide?: {
    name: string;
    image: string;
    focal?: string;
    zoom?: string;
    blurb: string;
    handle?: { label: string; href: string };
  };
  faqs: { q: string; a: string }[];
}

export interface Tour {
  slug: string;
  /** Card title. Keep short — it sets the card's visual weight. */
  name: string;
  /** Small line under the title. Who leads it. */
  byline: string;
  image: string;
  imageAlt: string;
  /** Thin meta line under the image: duration, group cap, when it runs. */
  meta: string[];
  blurb: string;
  /** Bold bottom-left line — the money answer. */
  priceLine: string;
  /** Muted second line under the price. */
  priceSub: string;
  ctaLabel: string;
  ctaHref: string;
  /** Tint behind the card image. Rotates through the brand paper tones. */
  tint: string;
  status: TourStatus;
  /** Present = this tour has its own /tours/[slug] page. */
  details?: TourDetails;
}

export const tours: Tour[] = [
  {
    slug: "free-walking-tour",
    name: "The Free Walking Tour",
    byline: "Led by Tom, Joolz or Holly",
    image: "/images/tour/tom-tombland-talk.jpg",
    imageAlt:
      "Tom telling a story to a tour group in Tombland",
    meta: ["2 hours", "Max 15", "Daily"],
    blurb:
      "The whole city centre in one walk. Castle, Market, the Lanes, Elm Hill, Tombland and the Cathedral, with the stories that tie them together.",
    priceLine: "Free to book",
    priceSub: "Pay what it was worth at the end",
    ctaLabel: "Book",
    ctaHref: "/",
    tint: "#E8F8F1",
    status: "live",
  },
  {
    slug: "norwich-after-dark",
    name: "Norwich After Dark",
    byline: "Led by Holly",
    image: "/images/tour/elm-hill-tour.jpg",
    imageAlt: "Elm Hill in Norwich at dusk, cobbles and timber-framed houses",
    meta: ["1h 30m", "Max 12", "Fri & Sat"],
    blurb:
      "Plague pits, witch trials and the Norwich that the daylight tour skips. Starts at sunset and finishes in a pub.",
    priceLine: "From £15 per person",
    priceSub: "Booked and paid in advance",
    ctaLabel: "See the tour",
    ctaHref: "/tours/norwich-after-dark",
    tint: "#F5EBDA",
    status: "example",
    details: {
      heroTitle: ["Norwich,", "after dark."],
      availability: {
        headline: "First dates: Halloween week.",
        sub: "Two evenings only, 12 places each. The waiting list books first.",
      },
      promise:
        "A 90-minute walk through the Norwich that only comes out after sunset. Plague pits, witch trials, and a pub at the end.",
      story: [
        "Norwich by day is fine cathedrals and coffee. **Norwich by night is a different city.** This is the walk through that one.",
        "Holly leads it. She spends her days in the archives and her evenings telling you what she found there: **the plague pits under the car parks**, the women tried as **witches on the Castle hill**, the streets people still cross the road to avoid.",
        "It ends in **one of the oldest pubs in the city**, where you can decide over a pint which stories you believe.",
      ],
      walk: [
        {
          eyebrow: "What you'll see",
          headline: "Norwich by lamplight.",
          stops: "Tombland · Elm Hill · the Lanes · the Castle hill",
          body: "The prettiest streets in the city, after the crowds have gone. Cobbles, crooked timber, and the corners the daylight tour walks straight past.",
        },
        {
          eyebrow: "What you'll hear",
          headline: "The city's dark ledger.",
          stops: "Plague pits · witch trials · the ducking stool",
          body: "Real history from the archives, not jump scares. The bits of Norwich's story that don't make the postcards, told by someone who has read the records.",
        },
        {
          eyebrow: "What you leave with",
          headline: "A darker map of Norwich.",
          stops: "One good pub · stories you'll retell",
          body: "You will never walk these streets the same way again. And you'll know exactly which pub to take people to when they visit.",
        },
      ],
      runOfShow: [
        "Meet at sunset by the Erpingham Gate, Tombland",
        "Tombland, Elm Hill and the lanes as the lights come on",
        "The Castle hill and the trial stories",
        "Finish at a medieval pub, first round on your own conscience",
      ],
      logistics: [
        { label: "When", value: "Fri & Sat evenings, from sunset" },
        { label: "How long", value: "1h 30m" },
        { label: "Group", value: "Max 12" },
        { label: "Start", value: "Erpingham Gate, Tombland" },
        { label: "Finish", value: "A pub. A good one." },
        { label: "Price", value: "From £15 per person, paid at booking" },
      ],
      reviews: [
        {
          quote:
            "She kept our group totally engaged with **interesting, funny and warm-hearted stories**. Simply the best first-day activity in Norwich.",
          author: "OwlQueen",
          source: "TripAdvisor",
        },
        {
          quote:
            "Holly's tour is **fabulous**. Very fun and loads of info. What an amazing intro to historic Norwich.",
          author: "Caroline",
        },
      ],
      gallery: [
        { src: "/images/tour/elm-hill-group.jpg", alt: "A tour group on the cobbles of Elm Hill", caption: "Elm Hill, once the lights come on" },
        { src: "/images/tour/group-fye-bridge.jpg", alt: "The tour group crossing Fye Bridge", caption: "Fye Bridge, where the ducking stool stood" },
        { src: "/images/tour/group-cathedral-west-front.jpg", alt: "Norwich Cathedral west front at dusk", caption: "The Cathedral, quieter after hours" },
        { src: "/images/tour/pottergate-walk.jpg", alt: "Walking down Pottergate", caption: "Pottergate, where the lanes go dark" },
        { src: "/images/tour/walking-ethelbert-gate.jpg", alt: "Walking under St Ethelbert's Gate", caption: "Through St Ethelbert's Gate" },
      ],
      guide: {
        name: "Holly",
        image: "/images/tour/holly-portrait.jpg",
        focal: "50% 15%",
        zoom: "165%",
        blurb:
          "I tell the lesser-known Norwich stories. The dark ones, the funny ones, and the where's-the-evidence ones. This walk is the dark ones, saved up.",
        handle: { label: "@historyhollydays", href: "https://www.instagram.com/historyhollydays" },
      },
      faqs: [
        {
          q: "Is it scary?",
          a: "It is dark history told well, not a haunted house. Nobody jumps out at you. Bring anyone who likes a story; maybe not the under 10s.",
        },
        {
          q: "Is it the same route as the free tour?",
          a: "It crosses it in a couple of places, but the stops and the stories are completely different. Plenty of people do both.",
        },
        {
          q: "What if it rains?",
          a: "It runs. Rain improves a ghost walk enormously. Bring a coat.",
        },
      ],
    },
  },
  {
    // REAL TOUR (Tom 2026-10-04). Source: "The Dark History of Norwich"
    // route script written by Holly and Joolz. Confirmed: name, writers,
    // free to book / pay what it was worth, start (City Hall steps),
    // finish (Tombland Alley), and the stops with the story told at each.
    // Everything in [square brackets] is still a prompt for the guides:
    // do NOT fill it with anything they have not confirmed, and do not add
    // history beyond the names in their script.
    slug: "dark-history-of-norwich",
    name: "The Dark History of Norwich",
    // No byline badge (Tom 2026-10-05).
    byline: "",
    image: "/images/tour/elm-hill-group.jpg",
    imageAlt: "A tour group on the cobbles of Elm Hill",
    meta: ["1h 30m", "[Group size TBC]", "[Days TBC]"],
    blurb:
      "Not ghost stories. The real thing. Riot, rebellion, murder, fire, flood and plague, from City Hall to Tombland Alley.",
    priceLine: "Free to book",
    priceSub: "Pay what it was worth at the end",
    ctaLabel: "See the tour",
    ctaHref: "/tours/dark-history-of-norwich",
    tint: "#F5EBDA",
    status: "live",
    details: {
      seoTitle: "Dark History Tour Norwich | Halloween Ghost Walk Alternative, Free",
      seoDescription:
        "Looking for a ghost walk in Norwich this Halloween? The true stories are darker. Murder, riot, fire, flood and plague, every evening at 6pm until 6 November. Free to book.",
      heroTitle: ["Norwich has a", "dark side."],
      bookingTour: "the-dark-history-of-norwich",
      scriptFont: "eater", // Tom 2026-10-10: Halloween splatter face
      // Teasers built ONLY from Holly and Joolz's route script (Tom
      // 2026-10-10): names and topics as the script gives them, mood
      // words around them, no added history. Allude, don't give it away.
      darkStories: [
        {
          title: "Names Norwich would rather forget",
          text: "Martha Sheward. Martha Alden. Robert Goodale. Jane Sellers. Each one stands where something terrible happened. You'll hear why on the night.",
          img: "/images/tour/elm-hill-group.jpg",
          alt: "A tour group on the cobbles of Elm Hill",
        },
        {
          title: "The missing body",
          text: "Somewhere off Elm Hill, a body went missing. Where it went is a story for after dark.",
          img: "/images/tour/walking-ethelbert-gate.jpg",
          alt: "Walking under St Ethelbert's Gate",
        },
        {
          title: "The plague girl",
          text: "The walk ends in Tombland Alley, with the plague girl. Her story is the last thing you'll hear.",
          img: "/images/tour/tom-tombland.jpg",
          alt: "A guide with a tour group in Tombland",
        },
      ],
      // Booking system 2026-10-09: every evening 16 Oct to 6 Nov, 18:00, 90 min.
      schedule: {
        first: "2026-10-16",
        last: "2026-11-06",
        time: "18:00",
        durationMin: 90,
        place: { name: "City Hall steps", street: "St Peter's Street", postcode: "NR2 1NH" },
      },
      promise:
        "Forget the ghost stories this Halloween, Norwich's true history is much darker and scarier. Murder, death, fire, flood and plague, told as night falls, right where it happened.",
      // Hook removed (Tom 2026-10-10).
      // VOICE (Tom 2026-09-28): atmospheric and sensory, led by verbs of
      // movement; name the real meeting place; say what this is NOT and
      // what it IS. Fresh words from Holly and Joolz, never another
      // operator's copy.
      highlightCards: [
        {
          h: "Riot and rebellion",
          teaser: "1272, John Gladman and Robert Kett.",
          p: "It starts on the **City Hall steps**, with the days Norwich turned on itself: the riot of 1272, John Gladman's insurrection and Robert Kett. Then round to the Guildhall for Martha Sheward, Cecily Ormes and Thomas Bilney.",
          img: "/images/tour/guide-guildhall.jpg",
          alt: "A guide talking to a tour group outside Norwich Guildhall",
        },
        {
          h: "Murder and the gallows",
          teaser: "Martha Alden, Robert Goodale, Jane Sellers.",
          p: "Up the Davey Place steps to the Whiffler Theatre for Martha Alden. Through the **castle ditches** to the Shirehall for Robert Goodale. Down to a flint wall by the Bridewell for Jane Sellers. On the way, Opie Street: a street of several names, none of them polite.",
          img: "/images/tour/elm-hill-group.jpg",
          alt: "A tour group on the cobbles of Elm Hill",
        },
        {
          h: "Fire, flood and plague",
          teaser: "Elm Hill to Tombland Alley.",
          p: "Over the cobbles of **Elm Hill** for fire and flood, and a body that went missing at Wrights Court. Past the Cathedral for Thomas Erpingham and Thomas Tunstall. And last, Tombland Alley: Walter Eghe, and the plague girl.",
          img: "/images/tour/tom-tombland.jpg",
          alt: "A guide with a tour group in Tombland",
        },
      ],
      suitableFor: "[TBC, e.g. ages 12+]",
      lookFor: "[TBC, how to spot your guide on the City Hall steps]",
      story: [
        "Meet on the **City Hall steps** as night falls and follow us into the Norwich the postcards leave out. Down the Davey Place steps, through the old castle ditches, along a lane by the Bridewell and over the cobbles of Elm Hill, stopping where the city's darkest days actually happened.",
        "Riots that turned the city on itself. Rebellion. Murder. A street with several names, a body that went missing, fire and flood on Elm Hill. **This is real Norwich history**, the side most visitors never hear.",
        "Came looking for a ghost walk? Nobody in a cape jumps out at you here, because nothing we could invent beats what really happened. The walk ends in **Tombland Alley**, with the plague girl.",
      ],
      walk: [
        {
          eyebrow: "Riot and rebellion",
          headline: "Norwich in revolt.",
          stops: "City Hall steps \u00b7 the Guildhall",
          body: "The 1272 riot, John Gladman's insurrection and Robert Kett. Then Martha Sheward, Cecily Ormes and Thomas Bilney at the Guildhall.",
        },
        {
          eyebrow: "Murder and the gallows",
          headline: "The crimes behind the Castle.",
          stops: "Whiffler Theatre \u00b7 Shirehall \u00b7 Opie Street \u00b7 the Bridewell",
          body: "Martha Alden, Robert Goodale and Jane Sellers, plus Opie Street, a street of several names.",
        },
        {
          eyebrow: "Fire, flood and plague",
          headline: "Elm Hill to Tombland Alley.",
          stops: "Elm Hill \u00b7 Wrights Court \u00b7 the Cathedral \u00b7 Tombland Alley",
          body: "Fire and flood on Elm Hill, the missing body, Thomas Erpingham and Thomas Tunstall, Walter Eghe, and finally the plague girl.",
        },
      ],
      logistics: [
        // Tom 2026-10-08: time + length on one line, start + finish on
        // one line. Booking system: every date 18:00, 90 minutes.
        { label: "When", value: "Every evening, 6pm (1h 30m)" },
        { label: "Route", value: "City Hall steps to Tombland Alley" },
        { label: "Price", value: "Free to book, pay what it was worth" },
      ],
      // Photos of places on the route, captioned by place only. Swap for
      // dusk shots of the actual stops when they exist.
      gallery: [
        { src: "/images/tour/guide-guildhall.jpg", alt: "A guide talking to a tour group outside Norwich Guildhall", caption: "The Guildhall" },
        { src: "/images/tour/elm-hill-group.jpg", alt: "A tour group on the cobbles of Elm Hill", caption: "Elm Hill" },
        { src: "/images/tour/group-cathedral-west-front.jpg", alt: "A tour group at the west front of Norwich Cathedral", caption: "Norwich Cathedral" },
        { src: "/images/tour/tom-tombland.jpg", alt: "A guide with a tour group in Tombland", caption: "Tombland" },
      ],
      faqs: [
        {
          q: "Is this a ghost walk?",
          a: "Not quite. If you were searching for a ghost walk in Norwich, this is the true-history version: the real murders, riots, fire, flood and plague most ghost walks only hint at, told where they happened.",
        },
        {
          q: "Is it scary?",
          a: "It's dark history, not jump scares. The stories are grim because they're true, but nobody leaps out of a doorway.",
        },
        {
          q: "How much does it cost?",
          a: "Nothing to book. At the end you pay what you think it was worth.",
        },
        {
          q: "When and where is it?",
          a: "Every evening at 6pm until 6 November, including Halloween night. It starts on the City Hall steps on St Peter's Street and finishes in Tombland Alley, about 90 minutes later.",
        },
        {
          q: "Do I need to book?",
          a: "Yes, book a free spot so we know how many are coming. You can cancel any time before it starts.",
        },
        {
          q: "[More questions TBC]",
          a: "[Holly and Joolz to add: is it suitable for children, accessibility, dogs, what if it rains.]",
        },
      ],
    },
  },
  {
    slug: "medieval-norwich",
    name: "Medieval Norwich",
    byline: "Led by Joolz Bailey",
    image: "/images/tour/group-cathedral-west-front.jpg",
    imageAlt: "Tour group at the west front of Norwich Cathedral",
    meta: ["2h", "Max 12", "Weekends"],
    blurb:
      "England's second city in 1350. Thirty churches, a cathedral built by a man buying his way out of trouble, and a street plan that never quite recovered.",
    priceLine: "From £18 per person",
    priceSub: "Booked and paid in advance",
    ctaLabel: "Notify me",
    ctaHref: "#notify",
    tint: "#E8F0E4",
    status: "example",
  },
  {
    slug: "market-to-table",
    name: "Market to Table",
    byline: "Led by Tom",
    image: "/images/tour/guide-norwich-market.jpg",
    imageAlt: "Guide talking to a tour group at the coloured stalls of Norwich Market",
    meta: ["2h 30m", "Max 10", "Saturdays"],
    blurb:
      "Six hundred years of market, four tastings, and the traders who will tell you more in five minutes than any guidebook.",
    priceLine: "From £30 per person",
    priceSub: "Tastings included",
    ctaLabel: "Notify me",
    ctaHref: "#notify",
    tint: "#F5EBDA",
    status: "example",
  },
  {
    slug: "pubs-and-breweries",
    name: "Pubs & Breweries",
    byline: "Led by Tom",
    image: "/images/tour/group-britons-arms.jpg",
    imageAlt: "Tour group outside the Britons Arms, a medieval building in Norwich",
    meta: ["2h", "Max 12", "Thursdays"],
    blurb:
      "Norwich once had a pub for every day of the year. We visit four of the ones still standing and explain what happened to the rest.",
    priceLine: "From £20 per person",
    priceSub: "First drink included",
    ctaLabel: "Notify me",
    ctaHref: "#notify",
    tint: "#E8F0E4",
    status: "example",
  },
  {
    slug: "private-tours",
    name: "Private & Group Tours",
    byline: "Your group, your date",
    image: "/images/tour/group-portrait-bridge.jpg",
    imageAlt: "A private tour group photographed together on a Norwich bridge",
    meta: ["Flexible", "2 to 30+", "Any day"],
    blurb:
      "Corporate days, birthdays, family visits and school groups. We build the route around what your group actually wants to see.",
    priceLine: "Price on request",
    priceSub: "We'll match your budget where we can",
    ctaLabel: "Enquire",
    ctaHref: "/private-tours",
    tint: "#E8F8F1",
    status: "live",
  },
];
