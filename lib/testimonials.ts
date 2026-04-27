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
  rating: 5,
  count: 6,
  profileUrl: "https://g.page/r/CWI7BtXPKyyZEAE/review",
};

export const googleReviews: Testimonial[] = [
  {
    id: 1,
    name: "Claire",
    role: "Tour guest, April 2026",
    avatar: "/images/reviews/claire.png",
    content:
      "The tour was an excellent overview of the small but beautiful city of Norwich.\nOur guide Tom offered up lots of information on other places to go, as well as food and drink recommendations.\nOverall, this tour is the perfect introduction to the city — I highly recommend it.",
    rating: 5,
  },
  {
    id: 2,
    name: "Matt",
    role: "Tour guest, April 2026",
    avatar: "/images/reviews/matt.png",
    content:
      "Tom is a really great guide — very informative and friendly, with a great insight into the city and its history.\nWe stopped at key city landmarks and Tom gave detailed information with wit and charm.\nA great way to spend a couple of hours around Norwich. Highly recommend 😊",
    rating: 5,
  },
  {
    id: 3,
    name: "Julie Hume",
    role: "Tour guest, April 2026",
    avatar: "/images/reviews/julie.png",
    content:
      "Brilliant way to find out things about Norwich City.\nI've lived in Norwich for most of my life but still learnt lots of things I didn't know.\nTom is very knowledgeable and engaging. Would definitely recommend this City Walk.",
    rating: 5,
  },
  {
    id: 4,
    name: "Steve Thacker",
    role: "Tour guest, April 2026",
    content:
      "Nice relaxed informative stroll.\nPlenty of information and some helpful tips to venues if you want to explore in more depth.\nVery enjoyable two hours.",
    rating: 5,
  },
];

// Back-compat alias for any older import sites.
export const testimonials = googleReviews;
