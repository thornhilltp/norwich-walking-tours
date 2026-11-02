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
    zoom: "170%",
    rotate: "-2deg",
    blurb: "Tom came for a history degree and never left. He found free walking tours on his travels and brought one home.",
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
  {
    name: "Clara",
    initial: "C",
    tint: "linear-gradient(150deg,#3f7fb5,#24486b)",
    img: "/images/tour/clara-portrait.jpg",
    focal: "50% 30%",
    rotate: "1deg",
    blurb: "Clara is our medievalist, currently doing her PhD. If it happened in Norwich before 1700, she knows. Loves a myth to bust and a messy drama.",
    handle: { label: "@clarabchamberlain", href: "https://www.instagram.com/clarabchamberlain" },
    accent: { ac: "#C4476A", ad: "#8A2742" },
    // An empty list is fine: the "What guests say" toggle hides itself.
    reviews: [
      {
        quote:
          "Clara was **massively knowledgeable about Norwich** and its history and presented it in such an accessible and interesting way. The time just flew by.",
        author: "HelenaSharp",
        source: "TripAdvisor",
      },
      {
        quote: "Clara's tour was incredibly informative, especially about the **medieval history of Norwich**, which was fascinating.",
        author: "Laura",
        source: "Google",
      },
    ],
  },
];
