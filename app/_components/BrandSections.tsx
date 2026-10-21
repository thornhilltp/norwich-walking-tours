// Homepage sections (built as the /home-brand prototype). The homepage is the
// collective's front door, not one tour's page. Order (Tom 2026-10-19): the
// header, which carries the tours as polaroids, then reviews, what a free
// tour is, guides, FAQs, email.
//
// Real photos everywhere (Tom 2026-10-18: the drawn map looked AI-made).
// Each tour shows through its own polaroid treatment, lettering and colour.
// The free tour has its own page at /tours/free-walking-tour.

import Image from "next/image";
import { Eater } from "next/font/google";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { tours } from "@/lib/tours";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { GoogleLogo, TripAdvisorLogo } from "./Testimonials";
import { BookingSheet, type BookingTab, type TourCardData } from "./BrandBooking";
import { HeroSlideshow, type HeroSlide } from "@/app/_components/HeroSlideshow";
import { HeroPolaroids } from "./TourVariants";
import { WalkLink, WalkUnderline } from "./WalkUnderline";
import type { NextWalk } from "@/lib/nextWalks";

// Dark History's Halloween face, for its card and its booking theme.
const eater = Eater({ weight: "400", subsets: ["latin"], display: "swap" });

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };

const FREE_TOUR_HREF = "/tours/free-walking-tour";

/* ── Tour data for this page ───────────────────────────────────────────── */

// Dark History runs until 6 November 2026. After that its card and booking
// tab drop off on the next build.
const DARK_HISTORY_ENDS = new Date("2026-11-07T00:00:00Z");
const darkIsOn = () => Date.now() < DARK_HISTORY_ENDS.getTime();
const bySlug = (slug: string) => tours.find((t) => t.slug === slug)!;

function tourCards(next: { free: NextWalk | null; dark: NextWalk | null }): TourCardData[] {
  const dark = bySlug("dark-history-of-norwich");
  const priv = bySlug("private-tours");
  const list: TourCardData[] = [
    {
      key: "free",
      vibe: "History & stories",
      name: "The Norwich Free Walking Tour",
      meta: "Most days, 10:30am · 2 hours · Free to book",
      // Approved homepage sub (CLAUDE.md messaging playbook).
      hook: "Two hours of our favourite Norwich history, stories and local tips.",
      perfectFor: "first-time visitors",
      sub: "Two hours of our favourite Norwich history, stories and local tips.",
      next: next.free,
      action: "Book free",
      href: "/book",
      details: FREE_TOUR_HREF,
      badge: "By day",
      // Tom's pick (2026-10-18): a story in Tombland Alley.
      image: { src: "/images/tour/tom-tombland-story.jpg", alt: "Tom telling a tour group a story in Tombland Alley, beside the Augustine Steward House" },
    },
    {
      key: "dark",
      vibe: "Dark and true",
      name: dark.name,
      meta: "Most evenings, 6pm · until 6 Nov · Free to book",
      // Live Dark History wording.
      hook: "Love a ghost story? The true history behind them is even darker.",
      perfectFor: "a night out with a difference",
      sub: "Love a ghost story? The true history behind them is even darker.",
      next: next.dark,
      action: "Book free",
      href: `${dark.ctaHref}#book`,
      details: dark.ctaHref,
      badge: "After dark",
      image: { src: dark.image, alt: dark.imageAlt },
    },
    {
      key: "private",
      vibe: "Just your group",
      name: "Private & Group Tours",
      meta: "Any day · Price on request",
      hook: "Your date, your route. We build the walk around what your group wants to see.",
      perfectFor: "birthdays, work days and family visits",
      sub: "Your date, your route, built around your group.",
      action: "Ask us",
      href: priv.ctaHref,
      // Morrie's photo, not the phone shot in lib/tours.ts.
      image: { src: "/images/tour/group-cathedral-close.jpg", alt: "A tour group standing together with their guide by Norwich Market" },
      badge: "Your group",
    },
  ];
  return darkIsOn() ? list : list.filter((c) => c.key !== "dark");
}

function bookingTabs(): BookingTab[] {
  const dark = bySlug("dark-history-of-norwich");
  const list: BookingTab[] = [
    { key: "free", label: "Free Walking Tour", when: "Most days, 10:30am" },
    { key: "dark", label: "Dark History", when: "Evenings until 6 Nov", bookingTour: dark.details?.bookingTour },
  ];
  return darkIsOn() ? list : list.filter((t) => t.key !== "dark");
}

/* ── 1. Header: who we are, and the tours as polaroids ─────────────────── */

// Tom 2026-10-19 (picked from five header options he previewed): the
// cycling pro photos stay behind; the mission line sits left; the tours are
// taped polaroids on the right (a row on phones) and replace the old
// "Pick your walk" section. Photo = the tour's page; button = booking pop-up.
// Dark History on the left with a neon glow, the free tour straight in the
// middle, Private with a "Reserved" luggage tag. No sub line (the polaroids
// say what the tours are). Rating badges and "Featured on" under the
// headline. Pro shoots only, wide Norwich shots mixed with groups.
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/tour/group-city-hall-walk.jpg",
    alt: "A tour group walking across the square below Norwich City Hall in the evening sun",
    position: "center 55%",
  },
  { src: "/images/tour/cathedral-west-front-wide.jpg", alt: "", position: "center 55%" },
  { src: "/images/tour/group-street-laughing.jpg", alt: "", position: "40% 40%" },
  { src: "/images/tour/tom-erpingham-gate.jpg", alt: "", position: "center 45%" },
  { src: "/images/tour/elm-hill-lane.jpg", alt: "", position: "center 60%" },
];

const HERO_ORDER: TourCardData["key"][] = ["dark", "free", "private"];

export function BrandHero({ next }: { next: { free: NextWalk | null; dark: NextWalk | null } }) {
  const cards = tourCards(next).sort((a, b) => HERO_ORDER.indexOf(a.key) - HERO_ORDER.indexOf(b.key));
  return (
    <section id="top" className="relative isolate overflow-hidden" style={{ backgroundColor: "#121211" }}>
      <HeroSlideshow slides={HERO_SLIDES} />
      <div aria-hidden className="absolute inset-0 -z-[5] lg:hidden" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.88) 100%)" }} />
      <div aria-hidden className="absolute inset-0 -z-[5] hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.5) 100%)" }} />
      <div className="brand-container max-w-6xl flex min-h-[86svh] flex-col justify-end gap-7 pt-28 pb-10 lg:grid lg:min-h-[90vh] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:pb-16">
        <div className="max-w-xl mx-auto text-center lg:mx-0 lg:text-left" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {/* Mission line as the headline (Tom 2026-10-18). */}
          <h1 className="leading-[1.0]">
            <span className="block text-[clamp(30px,3.8vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white" style={lora}>
              Helping locals and travellers
            </span>
            <span className="block text-[clamp(44px,4.5vw,68px)] font-semibold leading-[0.95] text-[#7BE0AC]" style={caveat}>
              love and discover Norwich.
            </span>
          </h1>
          <div className="mt-9 hidden lg:flex flex-col items-start gap-5">
            <HeroProof />
          </div>
        </div>
        <HeroPolaroids cards={cards} eaterFamily={eater.style.fontFamily} onPhoto />
        {/* Phones: centred under the centred headline (Tom 2026-10-21). */}
        <div className="flex flex-col items-center gap-5 pt-2 lg:hidden">
          <HeroProof center />
        </div>
      </div>
    </section>
  );
}

function HeroProof({ center = false }: { center?: boolean }) {
  return (
    <>
      <RatingBadges />
      <PartnerLogosInverted
        size="sm"
        label="Featured on"
        className={center ? "mt-2 [&_p]:!text-center [&_ul]:!justify-center" : "mt-2 [&_p]:!text-left [&_ul]:!justify-start"}
      />
    </>
  );
}

// Tom 2026-10-19: the plain ratings line was boring. Two badges taped on
// like scrapbook cuttings, each linking to its reviews.
function RatingBadges() {
  const badges = [
    { name: "Google", stats: googleReviewStats, logo: <GoogleLogo className="h-5 w-5 sm:h-6 sm:w-6" />, rot: -3, tape: "#F4C26B" },
    { name: "Tripadvisor", stats: tripAdvisorStats, logo: <TripAdvisorLogo className="h-6 w-6 sm:h-7 sm:w-7" />, rot: 2.5, tape: "#9FD6B8" },
  ];
  return (
    <ul className="m-0 flex w-max max-w-full list-none flex-nowrap gap-3 sm:gap-4 p-0" style={{ textShadow: "none" }}>
      {badges.map((b) => (
        <li key={b.name}>
          <a
            href={b.stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${b.stats.rating.toFixed(1)} out of 5 from ${b.stats.count} ${b.name} reviews (opens in a new tab)`}
            className="relative flex items-center gap-2 sm:gap-2.5 rounded-md bg-[#FCFAF8] py-1.5 pl-2 pr-2.5 sm:pl-2.5 sm:pr-3 text-brand-text shadow-[2px_10px_22px_-10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:[transform:rotate(0deg)_translateY(-3px)]"
            style={{ transform: `rotate(${b.rot}deg)` }}
          >
            <span aria-hidden className="absolute -top-2 left-1/2 h-3 w-10 -translate-x-1/2 -rotate-3 rounded-[2px] opacity-90" style={{ backgroundColor: b.tape }} />
            {b.logo}
            <span className="flex flex-col">
              <span className="flex items-center gap-1.5">
                <span className="text-[24px] font-bold leading-none" style={caveat}>
                  {b.stats.rating.toFixed(1)}
                </span>
                <span aria-hidden className="text-[12px] tracking-[1px] text-[#F4B400]">★★★★★</span>
              </span>
              <span className="whitespace-nowrap text-[10.5px] sm:text-[11px] leading-tight text-brand-text/70" style={lora}>
                {b.stats.count} {b.name} reviews
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ── 2. What's a free walking tour? ─────────────────────────────────────── */

// Job: answer "what's the catch?" (Tom 2026-10-18). The format first, in
// his words, then why we do it: so anyone can come. One link, no steps.
function FreeCopy({ center }: { center?: boolean }) {
  return (
    <>
      <h2 className="leading-[1.0]">
        <span className="inline text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
          What&apos;s a free
        </span>{" "}
        <span className="inline text-[clamp(44px,5.2vw,68px)] leading-[0.95] text-brand-accent" style={caveat}>
          <WalkUnderline>walking tour?</WalkUnderline>
        </span>
      </h2>
      <p className={`mt-5 text-[18px] md:text-[20px] leading-relaxed text-brand-text ${center ? "max-w-2xl mx-auto" : ""}`} style={lora}>
        Free tours are popular across Europe: an easy, affordable introduction to a new city. You book for £0, and at the
        end you pay what you think it was worth, usually £10 to £20 per person.
      </p>
      <p className="mt-6 text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.0] text-brand-accent" style={caveat}>
        So anyone can come.
      </p>
      <p className={`mt-2 text-[17px] leading-relaxed text-brand-text/70 ${center ? "max-w-xl mx-auto" : ""}`} style={lora}>
        No ticket price means nobody is priced out: students, families, backpackers, and locals who have walked past it
        all for years.
      </p>
      <p className="mt-5" style={lora}>
        <WalkLink href="/what-is-a-free-tour" className="text-brand-accent-text">
          More about free tours →
        </WalkLink>
      </p>
    </>
  );
}

// Morrie's photos (2026-10-18): sharper and warmer than the phone shots.
// (group-cathedral-flag.jpg and group-cathedral-close.jpg are Morrie's
// market shots despite their file names.)
// The strip: people on the walk, all from the pro shoots (Tom 2026-10-18).
const STRIP = [
  { src: "/images/tour/holly-market-stalls.jpg", alt: "Holly pointing something out at Norwich Market while a guest films it" },
  { src: "/images/tour/tom-ducking-stool-drawing.jpg", alt: "Tom, by the river, holding up a drawing of Norwich's ducking stool" },
  { src: "/images/tour/group-market-sunset.jpg", alt: "A tour group gathered round Holly at Norwich Market as the sun sets behind City Hall", position: "30% center" },
];

/* A film strip of three photos, words centred underneath. */
function FilmStrip() {
  return (
    <div className="py-14 md:py-20">
      <div className="grid grid-cols-3 gap-1.5 md:gap-2 px-1.5 md:px-2">
        {STRIP.map((p, i) => (
          <div key={p.src} className={`relative overflow-hidden aspect-[3/4] ${i === 1 ? "" : "md:mt-10"}`}>
            <Image src={p.src} alt={p.alt} fill sizes="33vw" className="object-cover" style={{ objectPosition: "position" in p ? p.position : undefined }} />
          </div>
        ))}
      </div>
      <div className="brand-container max-w-4xl text-center pt-12">
        <FreeCopy center />
      </div>
    </div>
  );
}

export function WhatIsFree() {
  return (
    <section id="free-tours" className="relative bg-brand-bg border-t border-brand-accent/10">
      <FilmStrip />
    </section>
  );
}

/* ── 4. Booking: the sheet the sticky bar opens ───────────────────────── */

export function BrandBookingSheet() {
  return <BookingSheet tabs={bookingTabs()} eaterFamily={eater.style.fontFamily} />;
}

/* ── 6. FAQs across every tour ────────────────────────────────────────── */

export const brandFaqs = [
  {
    q: "How does a free walking tour work, and how much should I tip?",
    a: "Book free, walk with a local guide, and at the end you pay what you think it was worth. Most guests tip £10 to £20 a person. If it wasn't worth it, you don't pay. Card, Apple Pay, Google Pay and cash all work.",
  },
  {
    q: "Which tour should I pick?",
    a: "First time in Norwich? The Norwich Free Walking Tour: two hours of our favourite history and stories, the highlights and local tips, most days at 10:30am. Want the darker side? The Dark History of Norwich runs most evenings at 6pm until 6 November. Bringing a group? Ask us about a private tour.",
  },
  {
    q: "Where do the tours meet?",
    a: "The Norwich Free Walking Tour meets outside The Forum on Millennium Plain. The Dark History of Norwich meets on the City Hall steps, St Peter's Street. Your booking email has the details.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Yes, it's free to reserve. Groups are kept small so the guide can talk to everyone, and booking means we can message you if anything changes. You can cancel any time from your booking email.",
  },
  {
    q: "Can I book a private tour?",
    a: "Yes. Birthdays, work days, family visits and school groups. Tell us what your group wants to see and we'll build the walk around it. Price on request.",
  },
  {
    q: "What if it rains?",
    a: "We still go. Bring a coat. If the weather turns properly dangerous, we'll message you before the tour.",
  },
  {
    q: "Can I bring kids, a pushchair or my dog?",
    a: "Yes to kids, and to well-behaved dogs on a lead. The routes are mostly flat and paved, with a few cobbles on Elm Hill. Tell your guide when you arrive and they'll work around the trickiest bits.",
  },
  {
    q: "Is Norwich worth visiting for a day?",
    a: "Absolutely. Norwich Cathedral, Norwich Castle, the Lanes and Elm Hill are all within 15 minutes' walk of each other. Start with the free tour, finish at Norwich Market for lunch, and you'll know exactly where to spend the afternoon.",
  },
];
