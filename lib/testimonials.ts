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
// │                                                                         │
// │  TRIP-TYPE SIGNAL: The `role` field on each review is the small line    │
// │  beneath the reviewer name. Currently generic ("Tour guest, April       │
// │  2026"). When you know the trip type, enrich it to one of:              │
// │     - "Couple visiting from <city>"                                     │
// │     - "Family of four"                                                  │
// │     - "Friends weekend"                                                 │
// │     - "Solo traveller"                                                  │
// │     - "Norwich local"                                                   │
// │  Aim for a mix across visible reviews — TripAdvisor data shows Friends  │
// │  30% / Couples 30% / Family 25% / Solo 7%. Surfaces matter.             │
// └─────────────────────────────────────────────────────────────────────────┘

import type { Testimonial } from "@/components/Testimonials";

export const googleReviewStats = {
  rating: 5.0,
  count: 55,
  profileUrl: "https://www.google.com/search?q=Norwich+Free+Walking+Tours#lrd=0x8bf78e00ceee4e5:0x992c2bcfd5063b62,1,,,,",
};

// TripAdvisor stats — kept here so the reviews section reads both platforms
// from one source of truth (was previously hardcoded inside the component).
export const tripAdvisorStats = {
  rating: 5.0,
  count: 26,
  profileUrl:
    "https://www.tripadvisor.com/Attraction_Review-g186342-d34359588-Reviews-Norwich_Free_Walking_Tours-Norwich_Norfolk_East_Anglia_England.html",
};

// Featured pull-quotes for the homepage reviews carousel.
//
//   - ORDER IS DELIBERATE: best-first. Cards 1-2 do most of the persuading
//     (most visitors read those, then scroll on). Re-rank by reordering.
//   - Each pullQuote is an excerpt of a REAL review in `googleReviews` below
//     (sourced field names the reviewer). Wrap the phrase to emphasise in
//     **double asterisks** — the component renders it as a handwritten
//     (Caveat) green highlight. Keep excerpts faithful to the real words.
export type FeaturedReview = {
  id: number;
  name: string;
  role: string; // small line beneath the name
  pullQuote: string; // **wrap** the key phrase for handwritten emphasis
  sourced: string; // which real reviewer this excerpts (provenance, not shown)
};

export const featuredReviews: FeaturedReview[] = [
  {
    id: 1,
    name: "Dennis",
    role: "Visited with friends",
    pullQuote: "I didn't expect much from a free tour. It was **genuinely brilliant**.",
    sourced: "Dennis M (TripAdvisor, 5★)",
  },
  {
    id: 2,
    name: "Julie",
    role: "Norwich local",
    pullQuote: "Lived in Norwich most of my life, but **still learnt lots**.",
    sourced: "Julie Hume (Google, 5★)",
  },
  {
    id: 3,
    name: "Evangelia",
    role: "Family visit",
    pullQuote: "Our first time seeing Norwich through **the lenses of the locals**.",
    sourced: "Evangelia A (TripAdvisor, 5★)",
  },
  {
    id: 4,
    name: "Rosie",
    role: "Grew up near Norwich",
    pullQuote: "Tom really captured **the spirit of the place**.",
    sourced: "Rosie U (TripAdvisor, 5★)",
  },
  {
    id: 5,
    name: "Paulette",
    role: "Solo traveller",
    pullQuote: "Tom **clearly loves Norwich**, and it shows.",
    sourced: "Paulette (TripAdvisor, 5★)",
  },
  {
    id: 6,
    name: "Blathnaid",
    role: "Visited as a couple",
    pullQuote: "Small group, **dog friendly**, and just the right length.",
    sourced: "Blathnaid C (TripAdvisor, 5★)",
  },
];

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
