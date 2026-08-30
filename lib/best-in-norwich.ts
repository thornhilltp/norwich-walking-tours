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
  image?: { src: string; alt: string };
}

export interface AwardCategory {
  /** Stable slug. Also the DB key. Never rename after voting opens. */
  key: string;
  /** "Best coffee" — used as the card label and the ballot legend. */
  label: string;
  /** Optional one-liner shown under the label on the ballot. */
  blurb?: string;
  icon?: GuideIconKey;
  /** Undefined until Tom supplies the winner — the card renders a
   *  "still counting" state rather than breaking. */
  winner?: Winner;
  /** Optional 2nd/3rd. Also seed the ballot for next year. */
  runnersUp?: Winner[];
  /** True = on next year's ballot but NOT in the winners grid. Used for
   *  categories we did not run this year, so the published list has no
   *  empty cards while the vote still grows the awards. */
  voteOnly?: boolean;
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
    blurb: "The cup itself. Nothing else counts.",
    icon: "coffee",
    winner: {
      name: "Blue Bear Coffee Co.",
      nickname: "on Tombland",
      why: "Small independent bar right on the tour route, and the flat white beats places three times the size. No queue, no fuss, no laptop farm.",
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
    blurb: "Where you stay for the second one.",
    icon: "coffee",
    winner: {
      name: "Alchemista Coffee",
      nickname: "St Gregory's Alley",
      why: "Steampunk fit-out down one of the best alleys in the city, dog friendly, and nobody rushes you. Go for one, leave an hour later.",
      url: "https://www.alchemistacoffee.co.uk/",
      mapsUrl: mapsSearch("Alchemista Coffee St Gregorys Alley Norwich"),
    },
  },
  {
    key: "bakery",
    label: "Best bakery",
    blurb: "Bread, pastry, the lot.",
    icon: "fork",
    winner: {
      name: "DeVecchio Bakery",
      nickname: "Lobster Lane, in the Lanes",
      why: "Tiny warm room in the Norwich Lanes turning out focaccia and savoury croissants that go before lunch. Get there early or get disappointed.",
      url: "https://devecchio.co.uk/",
      mapsUrl: mapsSearch("DeVecchio Bakery Lobster Lane Norwich"),
    },
  },
  {
    key: "market-stall",
    label: "Best market stall",
    blurb: "Two hundred stalls. One favourite.",
    icon: "bag",
    winner: {
      name: "Big Deal's Bodega",
      nickname: "best sandwich on the market",
      why: "Best sandwich in the city and it is not close. Tuesday to Saturday, lunchtime only, so plan your day round it. Ask for the Parmageddon.",
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
    blurb: "The thing you buy on the way past.",
    icon: "sparkle",
    winner: {
      // [CONFIRM] Tom said "churros". Norwich Market lists the stall as
      // "Churros for the People" (row A, stall 24). Check the trading name
      // before this goes public.
      name: "Churros for the People",
      nickname: "on Norwich Market",
      why: "Fried to order, still too hot to eat, gone before you reach the Guildhall. The correct way to end a market lunch.",
      mapsUrl: mapsSearch("Churros for the People Norwich Market"),
    },
  },
  {
    key: "ice-cream",
    label: "Best ice cream",
    blurb: "Norfolk milk, Sicilian standards.",
    icon: "sparkle",
    winner: {
      name: "Café Gelato",
      nickname: "Norwich's first gelato parlour",
      why: "Churned daily with Norfolk milk and Sicilian pistachios. The queue out the door on Opie Street is the local endorsement.",
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
    blurb: "Made that morning, eaten that night.",
    icon: "fork",
    winner: {
      name: "Yard",
      nickname: "fresh pasta on Pottergate",
      why: "Pasta made on the premises, walk-ins only. Cellar bar if the main room is full, churchyard opposite if the sun is out.",
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
    blurb: "Wood fired, Italian run.",
    icon: "fork",
    winner: {
      name: "Donnelli's",
      nickname: "proper pizza, no theatre",
      why: "Italian-run pizzeria doing wood-fired pizza and meatballs with nothing dressed up. Go hungry and order the sides you were not going to order.",
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
    blurb: "In your hand in ten minutes.",
    icon: "fork",
    winner: {
      // [CONFIRM] Official website. The only listing we found is an aggregator
      // page, so we are linking the map instead for now.
      name: "Avo Burrito",
      nickname: "Timber Hill",
      why: "Burritos and bowls built to order, adobo chicken, guac made that day. Fast, generous, and it holds together to the last bite.",
      mapsUrl: mapsSearch("Avo Burrito Timber Hill Norwich"),
    },
  },
  {
    key: "wine-bar",
    label: "Best wine bar",
    blurb: "One glass, one hour, no plan.",
    icon: "beer",
    winner: {
      // [CONFIRM] Jarrolds runs two: the Cheese & Charcuterie Wine Bar and the
      // Patisserie Wine Bar, both in the Food Hall. Which one won?
      name: "Jarrolds Wine Bar",
      nickname: "downstairs in the Food Hall",
      why: "Cheese, charcuterie and a proper glass of wine in the basement of a department store that has been here since 1823. Nowhere else does this.",
      url: "https://www.jarrolds.co.uk/departments/restaurants/the-wine-bars",
      mapsUrl: mapsSearch("Jarrold Department Store London Street Norwich"),
    },
  },

  // ── Vote-only: new for 2027 ───────────────────────────────────────────────
  // These did not run this year, so they never appear in the winners grid.
  // They are on the ballot so the awards widen out next time round.
  {
    key: "pub",
    label: "Best pub",
    blurb: "Not the trendiest. The best.",
    icon: "beer",
    voteOnly: true,
  },
  {
    key: "breakfast",
    label: "Best breakfast",
    blurb: "Full English, pancakes, whatever gets you going.",
    icon: "fork",
    voteOnly: true,
  },
  {
    key: "chippy",
    label: "Best chippy",
    blurb: "Norfolk takes this seriously.",
    icon: "fork",
    voteOnly: true,
  },
  {
    key: "independent-shop",
    label: "Best independent shop",
    blurb: "Norwich has more of these per head than almost anywhere.",
    icon: "bag",
    voteOnly: true,
  },
  {
    key: "free-thing",
    label: "Best free thing to do",
    blurb: "Costs nothing, still beats most things that cost something.",
    icon: "sparkle",
    voteOnly: true,
  },
  {
    key: "view",
    label: "Best view",
    blurb: "Where you take the visitors.",
    icon: "view",
    voteOnly: true,
  },
];

/** Categories with a published winner. Drives the winners grid. */
export const WINNER_CATEGORIES = CATEGORIES.filter((c) => !c.voteOnly);

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

/** Published categories (winners grid). The ballot is longer — it also carries
 *  the vote-only ones. */
export const TOTAL_CATEGORIES = WINNER_CATEGORIES.length;
export const TOTAL_BALLOT_CATEGORIES = CATEGORIES.length;

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