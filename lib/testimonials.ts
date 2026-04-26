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
  count: 3,
  profileUrl: "https://g.page/r/CWI7BtXPKyyZEAE/review",
};

export const googleReviews: Testimonial[] = [
  {
    id: 1,
    name: "Claire",
    role: "Tour guest, April 2026",
    avatar: "/images/reviews/claire.png",
    content:
      "The tour was an excellent overview of the small but beautiful city of Norwich. We took in some of the key sites and were told all about their history, plus some fun facts! There was plenty to see and our guide Tom offered up lots of information on other places to go to not included on the tour, as well as some food and drink recommendations. The pacing was good, with opportunity to stop and take pictures and have comfort breaks. Overall, Norwich is a city rich with history and culture and this tour is the perfect introduction, I highly recommend it.",
    rating: 5,
  },
  {
    id: 2,
    name: "Matt",
    role: "Tour guest, April 2026",
    avatar: "/images/reviews/matt.png",
    content:
      "Tom is a really great guide, very informative and friendly and gave us a great insight into the city and its history. Went on a beautiful Sunday morning with around 15 other people and never once felt like we were moving too fast or slow during the tour. We stopped at key city landmarks and areas and Tom gave detailed information with wit and charm. A great way to spend a couple of hours around Norwich. Highly recommend 😊",
    rating: 5,
  },
  {
    id: 3,
    name: "Julie Hume",
    role: "Tour guest, April 2026",
    avatar: "/images/reviews/julie.png",
    content:
      "Brilliant way to find out things about Norwich City. I've lived in Norwich for most of my life but still found this so interesting and learnt lots of things I didn't know. Tom is very knowledgeable and engaging. Would definitely recommend this City Walk.",
    rating: 5,
  },
];

// Back-compat alias for any older import sites.
export const testimonials = googleReviews;
