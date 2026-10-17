// The guides, read by both /our-guides and the homepage "Your guides"
// section. Blurbs in the third person, never braggy (Tom 2026-10-17).

import type { GuideReview } from "@/app/our-guides/_components/GuideReviews";

export type Guide = {
  name: string;
  initial: string;
  tint: string;
  img: string;
  focal: string;
  zoom?: string; // background-size; defaults to "cover". Used to crop tighter.
  rotate: string;
  blurb: string;
  handle?: { label: string; href: string };
  accent: { ac: string; ad: string };
  reviews: GuideReview[];
};

export const guides: Guide[] = [
  {
    name: "Tom",
    initial: "T",
    tint: "linear-gradient(150deg,#2DA96B,#1f6d47)",
    img: "/images/tour/tom-portrait-river.jpg",
    focal: "50% 20%",
    rotate: "-2deg",
    blurb:
      "Tom came for a history degree and never left. That was 13 years ago. He picked up the free walking tour habit travelling the world, and brought it home.",
    accent: { ac: "#2DA96B", ad: "#1A6B47" },
    reviews: [
      { quote: "We're always sceptical of historical tours. But **Tom is the real thing**.", author: "Vina", source: "Google" },
      {
        quote: "Our guide Tom offered up lots of information on other places to go, as well as **food and drink recommendations**.",
        author: "Claire",
        source: "Google",
      },
      { quote: "Tom pointed out the **independent shops, restaurants and bars**.", author: "Lisa", source: "TripAdvisor" },
    ],
  },
  {
    name: "Joolz",
    initial: "J",
    tint: "linear-gradient(150deg,#7c6cae,#463a63)",
    img: "/images/guides/joolz.png",
    focal: "34% 38%",
    rotate: "1.5deg",
    blurb: "Norfolk born and proud. Joolz is a paranormal investigator, Reiki master, and every so often a Viking. Or an Abbess.",
    accent: { ac: "#E8734A", ad: "#B44A28" },
    reviews: [
      { quote: "Joolz really **brought it to life**. She was the best thing about our trip.", author: "Andy, from Wales" },
      { quote: "Joolz is an **absolutely superb tour guide**. Can't recommend her enough.", author: "Caroline, from Basingstoke" },
    ],
  },
  {
    name: "Holly",
    initial: "H",
    tint: "linear-gradient(150deg,#c8823f,#8a5220)",
    img: "/images/tour/holly-portrait.jpg",
    focal: "50% 15%",
    rotate: "-1.5deg",
    blurb: "Holly tells the lesser-known Norwich stories. The dark ones, the funny ones, and the where's-the-evidence ones.",
    handle: { label: "@historyhollydays", href: "https://www.instagram.com/historyhollydays" },
    accent: { ac: "#D99A2B", ad: "#8A5E10" },
    reviews: [
      {
        quote:
          "She kept our group totally engaged with **interesting, funny and warm-hearted stories**. Simply the best first-day activity in Norwich.",
        author: "OwlQueen",
        source: "TripAdvisor",
      },
      {
        quote:
          "Holly was an absolutely brilliant guide, **one of the very best, perhaps the best**, on our numerous city walking tours around Europe.",
        author: "Andrew Wright",
      },
      { quote: "Holly's tour is **fabulous**. Very fun and loads of info. What an amazing intro to historic Norwich.", author: "Caroline" },
    ],
  },
];
