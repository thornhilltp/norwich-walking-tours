// Question vocabulary for /guide. Lives here so both the server page and the
// client-side QuestionFilter component can import without crossing the use-
// client boundary awkwardly.
//
// Wording is deliberately conversational — these are the questions guests
// actually ask Tom on tour ("Where should I eat tonight?") not category
// labels ("Dinner"). Order = display priority on the grid.

import {
  Beer,
  CloudRain,
  Coffee,
  Croissant,
  Footprints,
  IceCream,
  List,
  Route,
  Sparkles,
  Star,
  TreePine,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import type { GuidePick, GuideTag } from "@/lib/guide-picks";

export interface Question {
  id: string;
  label: string;
  icon: LucideIcon;
  tags?: GuideTag[];
  favourite?: boolean;
  /** "feature" question gets the gold full-width treatment at top. */
  feature?: boolean;
  /** "all" is the escape hatch — matches every pick. */
  all?: boolean;
}

export const QUESTIONS: Question[] = [
  // "Tom's favourites" sits with the others as a regular tile, just amber
  // instead of green. When highlighted as the active question it goes
  // solid amber. Favourite picks WITHIN any other question's results
  // already get the gold border + badge per the pick card render below.
  {
    id: "fav",
    label: "Tom’s favourites",
    icon: Star,
    favourite: true,
  },
  { id: "tour", label: "Places on the tour", icon: Footprints, tags: ["on-the-tour"] },
  { id: "brunch", label: "Where for brunch?", icon: Croissant, tags: ["brunch"] },
  { id: "lunch", label: "Lunch, properly", icon: UtensilsCrossed, tags: ["lunch"] },
  { id: "dinner", label: "Where for dinner?", icon: UtensilsCrossed, tags: ["dinner"] },
  { id: "snacks", label: "Sweet treats", icon: IceCream, tags: ["snacks"] },
  { id: "pub", label: "Pub after the tour", icon: Beer, tags: ["drink"] },
  { id: "coffee", label: "Coffee and cake", icon: Coffee, tags: ["coffee"] },
  { id: "free", label: "Free things to do", icon: Sparkles, tags: ["free"] },
  { id: "rainy", label: "When it rains", icon: CloudRain, tags: ["rainy-day"] },
  { id: "outdoors", label: "Outdoors today", icon: TreePine, tags: ["outdoors"] },
  { id: "daytrip", label: "Day trip out of town", icon: Route, tags: ["day-trip"] },
];

export function findQuestion(id: string | undefined): Question | undefined {
  if (!id) return undefined;
  if (id === "all") return { id: "all", label: "All picks", icon: List, all: true };
  return QUESTIONS.find((q) => q.id === id);
}

export function pickMatchesQuestion(pick: GuidePick, q: Question): boolean {
  if (q.all) return true;
  if (q.favourite) return pick.tier === "gold";
  if (!q.tags || q.tags.length === 0) return true;
  return q.tags.some((tag) => pick.tags?.includes(tag) ?? false);
}

/** DOM id of the picks-section header. Used by QuestionFilter to scroll the
 *  results into view on selection, and by the page to render the anchor. */
export const PICKS_HEADER_ID = "picks-header";
