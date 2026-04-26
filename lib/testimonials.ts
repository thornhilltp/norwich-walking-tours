// Google reviews — single source of truth.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │  WHEN REAL REVIEWS COME IN:                                             │
// │  1. Update `googleReviewStats.rating` to the live Google average        │
// │  2. Update `googleReviewStats.count` to the live review count           │
// │  3. Paste your real Google Business Profile review URL into             │
// │     `googleReviewStats.profileUrl`                                      │
// │  4. Replace the placeholder entries in `googleReviews` with 4–6 real    │
// │     reviews you want featured (carousel rotates through them)           │
// │                                                                         │
// │  WHILE count === 0 the Hero star badge + JSON-LD aggregateRating stay   │
// │  hidden, so the site never claims a rating it can't back up.            │
// └─────────────────────────────────────────────────────────────────────────┘

import type { Testimonial } from "@/components/Testimonials";

export const googleReviewStats = {
  rating: 0,
  count: 0,
  profileUrl: "https://g.page/r/CWI7BtXPKyyZEAE/review",
};

export const googleReviews: Testimonial[] = [
  {
    id: 1,
    name: "Reviews incoming!",
    role: "Watch this space",
    content:
      "We haven't started yet, but my mother in law says it's five stars!",
    rating: 5,
  },
  {
    id: 2,
    name: "Early verdict",
    role: "From someone who should know",
    content:
      "I walked the route myself before launch and genuinely got lost in the history of Tombland for 20 minutes. If I can do that to myself, imagine what I'll do to you.",
    rating: 5,
  },
  {
    id: 3,
    name: "Actual reviews coming soon",
    role: "Tours launching soon",
    content:
      "Real 5-star reviews from real people are on their way. For now, just know that Norwich Cathedral alone is worth showing up for — and we haven't even got to Elm Hill yet.",
    rating: 5,
  },
];

// Back-compat alias for any older import sites.
export const testimonials = googleReviews;
