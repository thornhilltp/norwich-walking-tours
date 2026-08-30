// ── Best in Norwich ──────────────────────────────────────────────────────────
//
// Source of truth for /best-in-norwich. Shared by the server-rendered page,
// the client vote widget and /api/best-in-norwich, so the three can never
// disagree about categories or phase.
//
// HOW TO EDIT
// -----------
// 1. CATEGORIES below is the whole page. Add, remove, reorder freely BUT never
//    change an existing `key` once voting has opened — vote rows in Supabase
//    are stored against the key, so renaming it orphans the votes.
// 2. Everything tagged [TBD] is placeholder content waiting on Tom. Search the
//    file for "TBD" to find them all.
// 3. CONTENT_READY stays false until the winners are real. While false the page
//    is noindex and stays out of the sitemap, so nothing half-written gets
//    crawled. One-line flip when the content lands.
// 4. PHASE switches the widget between taking votes, "voting closed" and
//    "results live". Also a one-line flip.

import type { GuideIconKey } from "./guide-picks";

// ── Phase / dates ────────────────────────────────────────────────────────────

export type AwardPhase =
  /** Ballot is being built. Write-ins only, no votes taken yet.
   *  UNUSED — Tom chose a single combined window on 2026-08-24. Kept because
   *  the widget and API still support it if a future year wants two phases. */
  | "nominations-open"
  /** Ballot is fixed. Votes taken, write-ins still accepted for moderation. */
  | "voting-open"
  /** Vote shut, counting. */
  | "voting-closed"
  /** Winners published. */
  | "results-live";

/** Flip to true once the real winners are in CATEGORIES below. Drives the
 *  robots meta tag on the page and inclusion in app/sitemap.ts. */
export const CONTENT_READY = false;

export const PHASE: AwardPhase = "voting-open";

/** The year the published winners belong to. */
export const WINNERS_YEAR = 2026;
/** The year currently being voted on. */
export const VOTE_YEAR = 2027;

// ── Timeline ────────────────────────────────────────────────────────────────
// One combined window: nominate and vote at the same time, Tom's call on
// 2026-08-24. Simpler to explain and to promote. The trade-off is that a name
// added in January has had less time to collect votes than one that was on the
// ballot from day one, so sanity-check close results before publishing.
//
// Flip PHASE by hand at each date — there is no cron on this site.
export const VOTING_CLOSES = "2027-01-31";
export const RESULTS_DATE = "2027-03-02";

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface Winner {
  /** Business name. Renders as the card heading. */
  name: string;
  /** Optional Caveat subtitle, same pattern as /guide picks. */
  nickname?: string;
  /** One or two lines on why it won, in Tom's voice. */
  why?: string;
  /** Their own website. Rendered as an outbound editorial link (dofollow). */
  url?: string;
  /** Google Maps link. Falls back to a maps search on the name. */
  mapsUrl?: string;
  /** `position` is an object-position value, for photos whose subject is not
   *  centred once cropped to the card's landscape ratio. */
  image?: { src: string; alt: string; position?: string };
}

export interface AwardCategory {
  /** Stable slug. Also the DB key. Never rename after voting opens. */
  key: string;
  /** "Best coffee" — used as the card label and the ballot legend. */
  label: string;
  /** Optional one-liner shown under the label on the ballot. */
  blurb?: string;
  /** The question the vote widget asks. Falls back to "<label> in Norwich?"
   *  which reads badly for some labels, so most categories set it. */
  question?: string;
  icon?: GuideIconKey;
  /** Undefined until Tom supplies the winner — the card renders a
   *  "still counting" state rather than breaking. */
  winner?: Winner;
  /** Optional 2nd/3rd. Also seed the ballot for next year. */
  runnersUp?: Winner[];
}

export const mapsSearch = (name: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, Norwich`
  )}`;

// ── Categories ───────────────────────────────────────────────────────────────
//
// Winners supplied by Tom 2026-08-23. Ten categories, all food and drink this
// year, which is what the votes covered. Broader categories (pub, view, free
// thing to do, independent shop) go on the 2027 ballot rather than sitting here
// as empty cards.
//
// Anything tagged [CONFIRM] is a detail we pieced together and Tom should check
// before CONTENT_READY flips to true.

export const CATEGORIES: AwardCategory[] = [
  {
    key: "coffee",
    label: "Best coffee",
    question: "Best coffee in Norwich?",
    blurb: "The cup itself. Nothing else counts.",
    icon: "coffee",
    winner: {
      name: "Blue Bear Coffee Co.",
      nickname: "on Tombland",
      why: "Right on the tour route, and the flat white beats places three times the size.",
      mapsUrl: mapsSearch("Blue Bear Coffee Tombland Norwich"),
      image: {
        src: "/images/guide/bear-coffee.jpg",
        alt: "The Blue Bear Coffee Co. hanging sign on Tombland, Norwich.",
      },
    },
  },
  {
    key: "coffee-sit-in",
    label: "Best coffee to sit in",
    question: "Best place to sit with a coffee?",
    blurb: "Where you stay for the second one.",
    icon: "coffee",
    winner: {
      name: "Alchemista Coffee",
      nickname: "St Gregory's Alley",
      why: "Steampunk room down the best alley in the city, and nobody rushes you out of it.",
      url: "https://www.alchemistacoffee.co.uk/",
      mapsUrl: mapsSearch("Alchemista Coffee St Gregorys Alley Norwich"),
    },
  },
  {
    key: "bakery",
    label: "Best bakery",
    question: "Best bakery in Norwich?",
    blurb: "Bread, pastry, the lot.",
    icon: "fork",
    winner: {
      name: "DeVecchio Bakery",
      nickname: "Lobster Lane, in the Lanes",
      why: "Focaccia and savoury croissants that are gone before lunch. Get there early.",
      url: "https://devecchio.co.uk/",
      mapsUrl: mapsSearch("DeVecchio Bakery Lobster Lane Norwich"),
      image: {
        src: "/images/best-in-norwich/devecchio-bakery.webp",
        alt: "A cruffin at DeVecchio Bakery, dusted in sugar and topped with cream and a prune, on a wooden stand in the window.",
        // Portrait photo cropped to a landscape card: hold the top so the
        // cream and the prune stay in frame.
        position: "50% 22%",
      },
    },
  },
  {
    key: "market-stall",
    label: "Best market stall",
    question: "Best stall on Norwich Market?",
    blurb: "Two hundred stalls. One favourite.",
    icon: "bag",
    winner: {
      name: "Big Deal's Bodega",
      nickname: "best sandwich on the market",
      why: "Best sandwich in the city, no contest. Tuesday to Saturday, lunchtime only.",
      mapsUrl: "https://share.google/t1xaXH0ueUUXLMPdD",
      image: {
        src: "/images/guide/big-deals-bodega.webp",
        alt: "A loaded Big Deal's Bodega sandwich under the deli signage on Norwich Market.",
      },
    },
  },
  {
    key: "sweet-treat",
    label: "Best sweet treat",
    question: "Best sweet thing in Norwich?",
    blurb: "The thing you buy on the way past.",
    icon: "sparkle",
    winner: {
      // [CONFIRM] Tom said "churros". Norwich Market lists the stall as
      // "Churros for the People" (row A, stall 24). Check the trading name
      // before this goes public.
      name: "Churros for the People",
      nickname: "on Norwich Market",
      why: "Fried to order, too hot to eat, gone before you reach the Guildhall.",
      mapsUrl: mapsSearch("Churros for the People Norwich Market"),
    },
  },
  {
    key: "ice-cream",
    label: "Best ice cream",
    question: "Best ice cream in Norwich?",
    blurb: "Norfolk milk, Sicilian standards.",
    icon: "sparkle",
    winner: {
      name: "Café Gelato",
      nickname: "Norwich's first gelato parlour",
      why: "Norfolk milk, Sicilian pistachios, churned daily. The queue is the endorsement.",
      mapsUrl: mapsSearch("Cafe Gelato Opie Street Norwich"),
      image: {
        src: "/images/guide/cafe-gelato.webp",
        alt: "Café Gelato storefront on Opie Street, with the cone mascot outside.",
      },
    },
  },
  {
    key: "pasta",
    label: "Best pasta",
    question: "Best pasta in Norwich?",
    blurb: "Made that morning, eaten that night.",
    icon: "fork",
    winner: {
      name: "Yard",
      nickname: "fresh pasta on Pottergate",
      why: "Pasta made on the premises, walk-ins only. Cellar bar if the main room is full.",
      url: "https://www.yardnorwich.com/",
      mapsUrl: "https://share.google/DJJh99gaNiiuf8B2O",
      image: {
        src: "/images/guide/yard.webp",
        alt: "A fig, prosciutto and walnut toast on sourdough at Yard, drizzled with honey.",
      },
    },
  },
  {
    key: "pizza",
    label: "Best pizza",
    question: "Best pizza in Norwich?",
    blurb: "Wood fired, Italian run.",
    icon: "fork",
    winner: {
      name: "Donnelli's",
      nickname: "proper pizza, no theatre",
      why: "Wood-fired, Italian run, nothing dressed up. Order the sides.",
      mapsUrl: mapsSearch("Donnellis pizza Norwich"),
      image: {
        src: "/images/guide/donnellis.jpg",
        alt: "A wood-fired pizza with a side of meatballs at Donnelli's.",
      },
    },
  },
  {
    key: "lunch-on-the-go",
    label: "Best lunch on the go",
    question: "Best lunch on the go?",
    blurb: "In your hand in ten minutes.",
    icon: "fork",
    winner: {
      // [CONFIRM] Official website. The only listing we found is an aggregator
      // page, so we are linking the map instead for now.
      name: "Avo Burrito",
      nickname: "Timber Hill",
      why: "Built to order, guac made that day, holds together to the last bite.",
      mapsUrl: mapsSearch("Avo Burrito Timber Hill Norwich"),
    },
  },
  {
    key: "wine-bar",
    label: "Best wine bar",
    question: "Best wine bar in Norwich?",
    blurb: "One glass, one hour, no plan.",
    icon: "beer",
    winner: {
      // [CONFIRM] Jarrolds runs two: the Cheese & Charcuterie Wine Bar and the
      // Patisserie Wine Bar, both in the Food Hall. Which one won?
      name: "Jarrolds Wine Bar",
      nickname: "downstairs in the Food Hall",
      why: "Cheese, charcuterie and a proper glass, in the basement of a shop from 1823.",
      url: "https://www.jarrolds.co.uk/departments/restaurants/the-wine-bars",
      mapsUrl: mapsSearch("Jarrold Department Store London Street Norwich"),
    },
  }
];

/** The 2026 awards, as they were given. Drives the winners grid and nothing
 *  else — the ballot below is deliberately a different, shorter list. */
export const WINNER_CATEGORIES = CATEGORIES;

// ── The 2027 ballot ─────────────────────────────────────────────────────────
//
// Six categories, Tom's call on 2026-08-30, cut from sixteen. Sixteen chips
// was a lot of scrolling and most would have sat empty; six broad ones each
// start with names on the board and are quick to fill.
//
// These keys are stored in bin_votes and bin_nominees. Never rename one after
// voting opens — the rows are keyed on it.
export const VOTE_CATEGORIES: AwardCategory[] = [
  {
    key: "coffee",
    label: "Coffee",
    question: "Best coffee in Norwich?",
    blurb: "The cup, and the room you drink it in.",
    icon: "coffee",
  },
  {
    key: "pub-drinks",
    label: "Pub or drinks",
    question: "Best pub or bar in Norwich?",
    blurb: "Pub, bar, wine, whatever you call a good one.",
    icon: "beer",
  },
  {
    key: "breakfast",
    label: "Breakfast",
    question: "Best breakfast in Norwich?",
    blurb: "Full English, pastry, whatever starts the day.",
    icon: "fork",
  },
  {
    key: "meal-out",
    label: "Meal out",
    question: "Best meal out in Norwich?",
    blurb: "The one you book a table for.",
    icon: "fork",
  },
  {
    key: "market",
    label: "The market",
    question: "Best thing on Norwich Market?",
    blurb: "Two hundred stalls. One favourite.",
    icon: "bag",
  },
  {
    key: "shops",
    label: "Independent shop",
    question: "Best independent shop in Norwich?",
    blurb: "Norwich has more of these per head than almost anywhere.",
    icon: "bag",
  },
];

export function findVoteCategory(key: string): AwardCategory | undefined {
  return VOTE_CATEGORIES.find((c) => c.key === key);
}

export function findCategory(key: string): AwardCategory | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

/** Ballot seed: last year's winner and runners-up in each category are
 *  automatically options for the next vote. Public write-ins get added on top
 *  once approved in Supabase. */
export function seedNominees(category: AwardCategory): string[] {
  const names = [
    category.winner?.name,
    ...(category.runnersUp ?? []).map((r) => r.name),
  ].filter((n): n is string => Boolean(n) && !n!.includes("TBD"));
  return Array.from(new Set(names));
}

/** Published 2026 categories (winners grid) and the shorter 2027 ballot. */
export const TOTAL_CATEGORIES = WINNER_CATEGORIES.length;
export const TOTAL_BALLOT_CATEGORIES = VOTE_CATEGORIES.length;

/** Where the 2027 vote lives. Its own page since 2026-08-30: the guide and the
 *  vote were fighting each other for attention on one screen. */
export const VOTE_PATH = "/best-in-norwich/vote";

/** The published timeline. Rendered on the page and used in the FAQ copy, so
 *  the dates can never drift between the two. */
export const TIMELINE: { phase: AwardPhase; date: string; label: string; detail: string }[] = [
  {
    phase: "voting-open",
    date: VOTING_CLOSES,
    label: "Vote and nominate",
    detail: `Open now until ${formatDate(
      VOTING_CLOSES
    )}. Vote in any category, and add anyone who is missing. New names join the ballot once a human has checked them.`,
  },
  {
    phase: "voting-closed",
    date: VOTING_CLOSES,
    label: "Counting",
    detail:
      "Through February. No running totals are published while voting is open, so nobody can rally against a leaderboard.",
  },
  {
    phase: "results-live",
    date: RESULTS_DATE,
    label: "Winners announced",
    detail: `${formatDate(
      RESULTS_DATE
    )}, ahead of the season, so winners have the badge up before the visitors arrive.`,
  },
];

/** Winner badge artwork, supplied by Tom. Drop the file in /public/images/ and
 *  set the path here — the "For winners" band on the page appears when it is
 *  set, and stays hidden while it is null. */
export const BADGE_IMAGE: { src: string; alt: string } | null = null;