// Brand homepage prototype (/home-brand). The homepage becomes the
// collective's front door, not one tour's page. Order (Tom 2026-10-18):
// the crew's own header (map, tagline, faces, the deal), then the four tours
// as their own section, each in its tour's look, then reviews and videos,
// what a free tour is, one booking box for every tour, guides, FAQs, email.
//
// Real photos everywhere (Tom 2026-10-18: the drawn map looked AI-made).
// Tour cards share one frame; each tour shows through its own photo
// treatment, title lettering and colour.
// The free tour's own page (today's /) is planned to move to
// /tours/free-walking-tour.

import Image from "next/image";
import { Eater } from "next/font/google";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { tours } from "@/lib/tours";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { BookingSheet, type BookingTab, type TourCardData } from "./BrandBooking";
import { HeroSlideshow, type HeroSlide } from "@/app/_components/HeroSlideshow";
import { TourCards } from "./TourVariants";
import { WalkLink, WalkUnderline } from "./WalkUnderline";
import type { NextWalk } from "@/lib/nextWalks";

// Dark History's Halloween face, for its card and its booking theme.
const eater = Eater({ weight: "400", subsets: ["latin"], display: "swap" });

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };

// Becomes /tours/free-walking-tour when the free tour moves.
const FREE_TOUR_HREF = "/";

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
    {
      key: "soon",
      vibe: "On the way",
      name: "Something new",
      meta: "",
      hook: "A new way to see Norwich is coming. Hear about it first.",
      perfectFor: "being first to hear",
      sub: "A new way to see Norwich is on the way.",
      action: "Tell me first",
      href: "#updates",
      badge: "Coming soon",
      image: { src: "/images/tour/group-cobbled-lane.jpg", alt: "" },
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

/* ── Shared bits ───────────────────────────────────────────────────────── */

/* ── 1. Header: a real photo, who we are, one button ───────────────────── */

// Pattern from Shoebox, Sandemans and Free Tours by Foot: real photos, one
// line, one button, all centred. Tom 2026-10-18: no booking card or faces
// up here (it looked AI-made); the photos cycle; "Featured on" and the
// ratings sit under the button. The tours section below does the choosing.
// Pro shoots only (Tom 2026-10-18), wide Norwich shots mixed with groups.
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
]

function Ratings() {
  return (
    <p className="text-[14px] text-white/85" style={lora}>
      <span aria-hidden="true" className="text-[#F4B400]">★★★★★</span>{" "}
      <strong className="text-white">{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count}) ·{" "}
      <strong className="text-white">{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
    </p>
  );
}

// Tom 2026-10-18: cycling photos, text and button left-aligned.
export function BrandHero() {
  return (
    <section id="top" className="relative isolate overflow-hidden" style={{ backgroundColor: "#121211" }}>
      <HeroSlideshow slides={HERO_SLIDES} />
      <div aria-hidden className="absolute inset-0 -z-[5] lg:hidden" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 100%)" }} />
      <div aria-hidden className="absolute inset-0 -z-[5] hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.12) 80%)" }} />
      <div className="brand-container max-w-6xl flex min-h-[86svh] lg:min-h-[90vh] items-end lg:items-center pt-28 pb-10 lg:pb-16">
        <div className="max-w-2xl text-left" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {/* Mission line as the headline (Tom 2026-10-18). */}
          <h1 className="leading-[1.0]">
            <span className="block text-[clamp(30px,4.2vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white" style={lora}>
              Helping locals and travellers
            </span>
            <span className="block text-[clamp(44px,6vw,88px)] font-semibold leading-[0.95] text-[#7BE0AC]" style={caveat}>
              love and discover Norwich.
            </span>
          </h1>
          <p className="mt-4 text-[17px] md:text-[20px] leading-relaxed text-white/90 max-w-xl" style={lora}>
            Walking tours and experiences, led by guides who live here.
          </p>
          <div className="mt-7">
            <a
              href="#tours"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 min-h-[54px] text-[24px] font-bold text-white shadow-lg hover:opacity-90"
              style={caveat}
            >
              Explore tours &amp; experiences
            </a>
          </div>
          <div className="mt-9 flex flex-col items-start gap-4">
            <PartnerLogosInverted size="sm" label="Featured on" className="[&_p]:!text-left [&_ul]:!justify-start" />
            <Ratings />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. The tours, each in its own look ───────────────────────────────── */

export function OurTours({ next }: { next: { free: NextWalk | null; dark: NextWalk | null } }) {
  return (
    <section id="tours" className="scroll-mt-16 py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-6xl">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              Pick your
            </span>{" "}
            <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
              <WalkUnderline>walk.</WalkUnderline>
            </span>
          </h2>
        </div>
        <TourCards cards={tourCards(next)} eaterFamily={eater.style.fontFamily} />
        <p className="mt-6 text-center" style={lora}>
          <WalkLink href="/tours" className="text-brand-accent-text">
            All tours &amp; experiences →
          </WalkLink>
        </p>
      </div>
    </section>
  );
}

/* ── 3. What's a free walking tour? ─────────────────────────────────────── */

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
// The strip: people on the walk, all from the pro shoots (Tom 2026-10-18:
// Holly at the market stays, the other two should have people too). Three
// sets to compare via ?strip=a|b|c.
const MARKET = { src: "/images/tour/holly-market-stalls.jpg", alt: "Holly pointing something out at Norwich Market while a guest films it" };
type StripPhoto = { src: string; alt: string };
export type StripSet = "a" | "b" | "c";
const STRIPS: Record<StripSet, { name: string; photos: [StripPhoto, StripPhoto, StripPhoto] }> = {
  a: {
    name: "Market, shirt, Britons Arms",
    photos: [
      MARKET,
      { src: "/images/tour/tom-walk-with-a-local-shirt.jpg", alt: "Tom, in a Walk with a Local t-shirt, making a tour group laugh" },
      { src: "/images/tour/group-britons-arms-looking-up.jpg", alt: "A tour group looking up at the Britons Arms on Elm Hill as Tom tells its story" },
    ],
  },
  b: {
    name: "Market, Elm Hill smiles, the Lanes",
    photos: [
      MARKET,
      { src: "/images/tour/holly-elm-hill-group-smiles.jpg", alt: "Holly and a smiling tour group on the cobbles of Elm Hill" },
      { src: "/images/tour/group-lanes-street-art.jpg", alt: "A tour group walking through the Norwich Lanes past street art" },
    ],
  },
  c: {
    name: "Market, pointing up, Elm Hill",
    photos: [
      MARKET,
      { src: "/images/tour/tom-pointing-up-flint.jpg", alt: "Tom pointing up at a medieval flint church wall" },
      { src: "/images/tour/group-elm-hill-listening.jpg", alt: "A tour group listening to Holly on Elm Hill" },
    ],
  },
};

/** The walking route across the strip: a dashed white path with a map pin
    on each photo, footprints where it starts (Tom 2026-10-18). */
function StripRoute() {
  const pins = [
    { left: "16.7%", top: "78%" },
    { left: "50%", top: "70%" },
    { left: "83.3%", top: "78%" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]">
        <path
          d="M-5 86 C 15 96, 35 70, 50 78 S 105 96, 150 70 S 215 96, 250 78 S 290 68, 305 84"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeDasharray="8 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* footprints where the walk starts */}
      <svg viewBox="0 0 40 30" className="absolute left-[2%] top-[83%] h-6 w-8 -translate-y-1/2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        <ellipse cx="10" cy="20" rx="4" ry="6.5" fill="#FFFFFF" transform="rotate(-15 10 20)" />
        <ellipse cx="24" cy="10" rx="4" ry="6.5" fill="#FFFFFF" transform="rotate(-15 24 10)" />
      </svg>
      {pins.map((p, i) => (
        <svg
          key={i}
          viewBox="-14 -38 28 40"
          className="absolute h-10 w-8 -translate-x-1/2 -translate-y-full drop-shadow-[0_3px_4px_rgba(0,0,0,0.5)] md:h-12 md:w-10"
          style={{ left: p.left, top: p.top }}
        >
          <path d="M0 0 C -8 -10 -13 -16 -13 -24 A 13 13 0 1 1 13 -24 C 13 -16 8 -10 0 0 Z" fill="#2DA96B" />
          <circle cx="0" cy="-24" r="5" fill="#FCFAF8" />
        </svg>
      ))}
    </div>
  );
}

/* A film strip of three photos with the route walking across it, words
   centred underneath (Tom 2026-10-18). */
function FilmStrip({ set }: { set: StripSet }) {
  const strip = STRIPS[set].photos;
  return (
    <div className="py-14 md:py-20">
      <div className="relative grid grid-cols-3 gap-1.5 md:gap-2 px-1.5 md:px-2">
        {strip.map((p, i) => (
          <div key={p.src} className={`relative overflow-hidden aspect-[3/4] ${i === 1 ? "" : "md:mt-10"}`}>
            <Image src={p.src} alt={p.alt} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
        <StripRoute />
      </div>
      <div className="brand-container max-w-4xl text-center pt-12">
        <FreeCopy center />
      </div>
    </div>
  );
}

export function WhatIsFree({ set }: { set: StripSet }) {
  return (
    <section id="free-tours" className="relative bg-brand-bg border-t border-brand-accent/10">
      {/* Prototype-only: compare photo sets. */}
      <div className="brand-container pt-6 flex flex-wrap items-center justify-center gap-1.5 text-[12px] sm:text-[13px]" style={lora}>
        <span className="font-semibold text-brand-text/70">Strip photos:</span>
        {(Object.keys(STRIPS) as StripSet[]).map((k) => (
          <a
            key={k}
            href={`?strip=${k}#free-tours`}
            className={`rounded-full px-3 py-1 font-semibold border-2 border-dashed ${k === set ? "bg-brand-text text-white border-brand-text" : "bg-[#FFF8EA] border-[#E8A33A]/70 text-brand-text/80"}`}
          >
            {k.toUpperCase()} · {STRIPS[k].name}
          </a>
        ))}
      </div>
      <FilmStrip set={set} />
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
