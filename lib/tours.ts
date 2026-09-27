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
  /** The story sold in 2-3 short paragraphs. **bold** = semibold ink. */
  story: string[];
  /** The-walk groups, homepage ThemedRouteSection language:
      what you'll see / where you'll go / what you leave with. */
  walk?: { eyebrow: string; headline: string; stops: string; body: string }[];
  /** What actually happens, in order. Logistics for planners. */
  runOfShow: string[];
  logistics: { label: string; value: string }[];
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
