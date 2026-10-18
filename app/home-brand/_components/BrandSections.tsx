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
import { partners } from "@/lib/partners";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { BookingSheet, type BookingTab, type TourCardData } from "./BrandBooking";
import { HeroSlideshow, type HeroSlide } from "@/app/_components/HeroSlideshow";
import { GuideCards } from "./GuideCards";
import { TourVariants, type TourVariant } from "./TourVariants";

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

function tourCards(): TourCardData[] {
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
      tag: ["Most days, 10:30am", "2 hours, from The Forum", "Free, tip what it was worth"],
      action: "Book free",
      href: "/book",
      details: FREE_TOUR_HREF,
      badge: "By day",
      image: { src: "/images/tour/pottergate-walk.jpg", alt: "A guide leading a tour group down Pottergate in the Norwich Lanes" },
    },
    {
      key: "dark",
      vibe: "Dark and true",
      name: dark.name,
      meta: "Most evenings, 6pm · until 6 Nov · Free to book",
      // Live Dark History wording.
      hook: "Love a ghost story? The true history behind them is even darker.",
      perfectFor: "a night out with a difference",
      tag: ["Most evenings, 6pm, until 6 Nov", "1h 30m, from City Hall steps", "Free, tip what it was worth"],
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
      tag: ["Any day you choose", "2 to 30+ people", "Price on request"],
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
      tag: ["Something new is coming", "Join the list to hear first"],
      action: "Tell me first",
      href: "#updates",
      badge: "Coming soon",
      image: { src: "/images/tour/group-alley-walk.jpg", alt: "" },
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
// Morrie's shoot only (Tom 2026-10-18: good-quality photos only).
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/tour/group-street-laughing.jpg",
    alt: "A guide in a Walk with a Local t-shirt making a tour group laugh on a Norwich street",
    position: "40% 40%",
  },
  { src: "/images/tour/group-cathedral-flag.jpg", alt: "", position: "center 50%" },
  { src: "/images/tour/pottergate-walk.jpg", alt: "", position: "center 55%" },
  { src: "/images/tour/elm-hill-group.jpg", alt: "", position: "60% 40%" },
  { src: "/images/tour/tom-tombland-talk.jpg", alt: "", position: "center 40%" },
  { src: "/images/tour/guide-market-walk.jpg", alt: "", position: "center 45%" },
]

export type HeroVariant = "a" | "b" | "c";
const HERO_NAMES: Record<string, string> = { a: "Cycling photos", b: "Polaroid wall", c: "Split" };

function Headline({ light, left }: { light?: boolean; left?: boolean }) {
  return (
    <>
      {/* Mission line as the headline (Tom 2026-10-18). */}
      <h1 className="leading-[1.0]">
        <span className={`block text-[clamp(30px,4.2vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] ${light ? "text-white" : "text-brand-text"}`} style={lora}>
          Helping locals and travellers
        </span>
        <span className={`block text-[clamp(44px,6vw,88px)] font-semibold leading-[0.95] ${light ? "text-[#7BE0AC]" : "text-brand-accent"}`} style={caveat}>
          love and discover Norwich.
        </span>
      </h1>
      <p className={`mt-4 text-[17px] md:text-[20px] leading-relaxed max-w-xl ${left ? "" : "mx-auto"} ${light ? "text-white/90" : "text-brand-text/75"}`} style={lora}>
        Walking tours and experiences, led by guides who live here.
      </p>
      <div className={`mt-7 flex ${left ? "justify-center lg:justify-start" : "justify-center"}`}>
        <a
          href="#tours"
          className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 min-h-[54px] text-[24px] font-bold text-white shadow-lg hover:opacity-90 w-full sm:w-auto"
          style={caveat}
        >
          Explore tours &amp; experiences
        </a>
      </div>
    </>
  );
}

function Ratings({ light }: { light?: boolean }) {
  return (
    <p className={`text-[14px] ${light ? "text-white/85" : "text-brand-text/75"}`} style={lora}>
      <span aria-hidden="true" className="text-[#F4B400]">★★★★★</span>{" "}
      <strong className={light ? "text-white" : "text-brand-text"}>{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count}) ·{" "}
      <strong className={light ? "text-white" : "text-brand-text"}>{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
    </p>
  );
}

/** "Featured on" for light backgrounds: the real logos, greyed until hover. */
function FeaturedOnLight({ left }: { left?: boolean }) {
  return (
    <div>
      <p className={`text-[11px] font-semibold tracking-widest uppercase text-brand-text/45 mb-3 ${left ? "text-center lg:text-left" : "text-center"}`} style={lora}>
        Featured on
      </p>
      <ul className={`flex flex-wrap items-center gap-x-8 gap-y-3 list-none p-0 m-0 ${left ? "justify-center lg:justify-start" : "justify-center"}`}>
        {partners.map((pt) => (
          <li key={pt.name}>
            <a href={pt.href} target="_blank" rel="noopener noreferrer" aria-label={`Our listing on ${pt.name} (opens in a new tab)`} className="block opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pt.src} alt={`${pt.name} logo`} className={pt.name === "VisitNorwich" ? "h-7 w-auto" : "h-4 w-auto"} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* A: full-bleed cycling photos, words centred on top. */
function HeroA() {
  return (
    <section id="top" className="relative isolate overflow-hidden" style={{ backgroundColor: "#121211" }}>
      <HeroSlideshow slides={HERO_SLIDES} />
      <div aria-hidden className="absolute inset-0 -z-[5] lg:hidden" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.82) 100%)" }} />
      <div aria-hidden className="absolute inset-0 -z-[5] hidden lg:block" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.25) 100%)" }} />
      <div className="brand-container max-w-6xl flex min-h-[86svh] lg:min-h-[90vh] items-end lg:items-center justify-center pt-28 pb-10 lg:pb-16">
        <div className="max-w-3xl text-center mx-auto" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          <Headline light />
          <div className="mt-9 flex flex-col items-center gap-4">
            <PartnerLogosInverted size="sm" label="Featured on" />
            <Ratings light />
          </div>
        </div>
      </div>
    </section>
  );
}

/* B: cream paper, words centred, a loose row of taped polaroids below. */
const WALL = [
  { src: "/images/tour/group-street-laughing.jpg", alt: "A guide making a tour group laugh on a Norwich street", r: -5, y: 10, tape: "#F4C26B" },
  { src: "/images/tour/pottergate-walk.jpg", alt: "A tour group walking down Pottergate in the Norwich Lanes", r: 3, y: -6, tape: "#9FD6B8" },
  { src: "/images/tour/elm-hill-group.jpg", alt: "A Dark History group on the cobbles of Elm Hill", r: -2, y: 14, tape: "#3A3530" },
  { src: "/images/tour/tom-tombland-talk.jpg", alt: "Tom telling a story to a tour group in Tombland", r: 4, y: -2, tape: "#F2A7A0" },
  { src: "/images/tour/group-cathedral-flag.jpg", alt: "A tour group with their guides at Norwich Market in the evening sun", r: -3, y: 8, tape: "#C9B8E8" },
];

function HeroB() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-bg pt-28 md:pt-36 pb-12">
      <div className="brand-container max-w-4xl text-center">
        <Headline />
      </div>
      <ul className="mt-12 md:mt-14 flex gap-3 md:gap-6 justify-start md:justify-center overflow-x-auto md:overflow-visible px-6 pb-6 pt-4 list-none m-0 [scrollbar-width:none]">
        {WALL.map((w, i) => (
          <li
            key={w.src}
            className={`shrink-0 w-[46%] sm:w-[30%] md:w-[19%] max-w-[240px] ${i > 2 ? "hidden sm:block" : ""}`}
            style={{ transform: `rotate(${w.r}deg) translateY(${w.y}px)` }}
          >
            <figure className="relative m-0 bg-white border border-[#EAE0D4] p-2 pb-7 shadow-[2px_12px_26px_-12px_rgba(60,40,20,0.6)]">
              <span aria-hidden className="absolute -top-[10px] left-1/2 w-16 h-5 rounded-[2px] z-10" style={{ transform: "translateX(-50%) rotate(-3deg)", backgroundColor: w.tape, boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }} />
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-accent-light">
                <Image src={w.src} alt={w.alt} fill priority={i < 2} sizes="(max-width: 768px) 46vw, 240px" className="object-cover" />
              </div>
            </figure>
          </li>
        ))}
      </ul>
      <div className="brand-container mt-6 flex flex-col items-center gap-4">
        <FeaturedOnLight />
        <Ratings />
      </div>
    </section>
  );
}

/* C: words left on cream, a big cycling photo right (phones: photo on top). */
function HeroC() {
  return (
    <section id="top" className="relative bg-brand-bg pt-[72px] lg:pt-28 lg:pb-16">
      <div className="lg:brand-container lg:max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-0 lg:gap-12 items-center">
        <div className="relative isolate overflow-hidden aspect-[4/3] lg:aspect-[4/5] lg:order-2 lg:rounded-[3px] lg:shadow-[0_24px_50px_-24px_rgba(26,26,26,0.6)]">
          <HeroSlideshow slides={HERO_SLIDES} />
        </div>
        <div className="brand-container lg:px-0 py-10 lg:py-0 text-center lg:text-left">
          <Headline left />
          <div className="mt-9 flex flex-col items-center lg:items-start gap-4">
            <FeaturedOnLight left />
            <Ratings />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandHero({ variant }: { variant: HeroVariant }) {
  return variant === "b" ? <HeroB /> : variant === "c" ? <HeroC /> : <HeroA />;
}

/** Prototype-only: one bar at the very top to flip the header version. */
export function HeroSwitch({ current, other }: { current: HeroVariant; other: Record<string, string> }) {
  return (
    <div className="absolute left-1/2 top-[74px] z-40 -translate-x-1/2 [&>div]:mb-0">
      <VariantSwitch label="Header" param="hero" current={current} other={other} anchor="top" names={HERO_NAMES} />
    </div>
  );
}

/* ── 2. The tours, each in its own look ───────────────────────────────── */

export function OurTours({ variant, free, hero }: { variant: TourVariant; free: FreeVariant; hero: HeroVariant }) {
  return (
    <section id="tours" className="scroll-mt-16 py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-6xl">
        <VariantSwitch label="Tours section" param="tours" current={variant} other={{ free, hero }} anchor="tours" names={TOUR_NAMES} />
        <div className="text-center mb-4 md:mb-6">
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              Pick your
            </span>{" "}
            <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
              walk.
            </span>
          </h2>
          {/* The ask, said plainly (Tom 2026-10-18: it wasn't obvious). */}
          <p className="mt-3 text-[17px] text-brand-text/70" style={lora}>
            Tap a tour to see dates and book.
          </p>
        </div>
        <TourVariants cards={tourCards()} eaterFamily={eater.style.fontFamily} variant={variant} />
        <p className="mt-6 text-center" style={lora}>
          <a href="/tours" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent">
            All tours &amp; experiences →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── Prototype-only: flip between versions of a section ───────────────── */

export type FreeVariant = "a" | "b" | "c";
const TOUR_NAMES: Record<string, string> = { a: "Polaroid + one line", b: "Luggage tag", c: "List" };
const FREE_NAMES: Record<string, string> = { a: "Half photo", b: "Film strip", c: "Big statement" };

function VariantSwitch({
  label,
  param,
  current,
  other,
  anchor,
  names,
}: {
  label: string;
  param: "tours" | "free" | "hero";
  current: string;
  other: Record<string, string>;
  anchor: string;
  names: Record<string, string>;
}) {
  return (
    <div className="mb-8 flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2 rounded-xl border-2 border-dashed border-[#E8A33A]/70 bg-[#FFF8EA] px-2.5 py-1.5 text-[12px] sm:text-[13px] whitespace-nowrap" style={lora}>
      <span className="font-semibold text-brand-text/70">{label}:</span>
      {(["a", "b", "c"] as const).map((v) => {
        const q = new URLSearchParams({ ...other, [param]: v }).toString();
        const on = v === current;
        return (
          <a
            key={v}
            href={`?${q}#${anchor}`}
            className={`rounded-full px-3 py-1 font-semibold ${on ? "bg-brand-text text-white" : "bg-white text-brand-text/80 border border-brand-text/15 hover:border-brand-text/40"}`}
          >
            {v.toUpperCase()}
            <span className="hidden sm:inline"> · {names[v]}</span>
          </a>
        );
      })}
    </div>
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
          walking tour?
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
        <a href="/what-is-a-free-tour" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent">
          More about free tours →
        </a>
      </p>
    </>
  );
}

// Morrie's photos (2026-10-18): sharper and warmer than the phone shots.
// (group-cathedral-flag.jpg and group-cathedral-close.jpg are Morrie's
// market shots despite their file names.)
const MORRIE = {
  golden: { src: "/images/tour/group-cathedral-flag.jpg", alt: "A tour group with their guides at Norwich Market in the evening sun" },
  walk: { src: "/images/tour/guide-market-walk.jpg", alt: "A guide walking a guest through Norwich Market" },
  alley: { src: "/images/tour/group-alley-walk.jpg", alt: "A tour group walking down a narrow Norwich lane" },
  evening: { src: "/images/tour/group-cathedral-close.jpg", alt: "A tour group with their guide by Norwich Market" },
};

/* A: half the section is the photo, edge to edge; words on the other half. */
function FreeA() {
  return (
    <div className="relative lg:min-h-[640px]">
      <div className="relative aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 overflow-hidden">
        <Image src={MORRIE.golden.src} alt={MORRIE.golden.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "center 55%" }} />
      </div>
      <div className="brand-container max-w-6xl">
        <div className="lg:ml-[50%] lg:pl-14 py-12 lg:py-24">
          <FreeCopy />
        </div>
      </div>
    </div>
  );
}

/* B: a film strip of three photos, words centred underneath. */
function FreeB() {
  const strip = [MORRIE.golden, MORRIE.walk, MORRIE.alley];
  return (
    <div className="py-14 md:py-20">
      <div className="grid grid-cols-3 gap-1.5 md:gap-2 px-1.5 md:px-2">
        {strip.map((p, i) => (
          <div key={p.src} className={`relative overflow-hidden ${i === 1 ? "aspect-[3/4]" : "aspect-[3/4] md:mt-10"}`}>
            <Image src={p.src} alt={p.alt} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="brand-container max-w-4xl text-center pt-12">
        <FreeCopy center />
      </div>
    </div>
  );
}

/* C: the deal as a big handwritten statement, one wide photo below. */
function FreeC() {
  return (
    <div className="pt-16 md:pt-24">
      <div className="brand-container max-w-4xl text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-text/50" style={lora}>
          What&apos;s a free walking tour?
        </p>
        <h2 className="mt-3 text-[clamp(48px,7vw,96px)] font-bold leading-[0.95] text-brand-text" style={caveat}>
          Book for £0. <span className="text-brand-accent">Pay what it was worth.</span>
        </h2>
        <p className="mt-6 text-[18px] md:text-[20px] leading-relaxed text-brand-text/80 max-w-2xl mx-auto" style={lora}>
          Free tours are popular across Europe: an easy, affordable introduction to a new city. Most guests pay £10 to £20
          per person at the end. So anyone can come: students, families, backpackers, and locals who have walked past it
          all for years.
        </p>
        <p className="mt-5" style={lora}>
          <a href="/what-is-a-free-tour" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent">
            More about free tours →
          </a>
        </p>
      </div>
      <div className="relative mt-12 md:mt-16 aspect-[16/9] md:aspect-[21/8] w-full overflow-hidden">
        <Image src={MORRIE.evening.src} alt={MORRIE.evening.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: "center 45%" }} />
      </div>
    </div>
  );
}

export function WhatIsFree({ variant, tours, hero }: { variant: FreeVariant; tours: TourVariant; hero: HeroVariant }) {
  return (
    <section id="free-tours" className="relative bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-6xl pt-6">
        <VariantSwitch label="Free tour section" param="free" current={variant} other={{ tours, hero }} anchor="free-tours" names={FREE_NAMES} />
      </div>
      {variant === "b" ? <FreeB /> : variant === "c" ? <FreeC /> : <FreeA />}
    </section>
  );
}

/* ── 4. Booking: the sheet the sticky bar opens ───────────────────────── */

export function BrandBookingSheet() {
  return <BookingSheet tabs={bookingTabs()} eaterFamily={eater.style.fontFamily} />;
}

/* ── 5. Our locals: the guides ─────────────────────────────────────────── */

// Job: put faces to "led by locals" (Tom 2026-10-18). Taped polaroids;
// hover pops one out, click opens the full guide card (GuideCards).
// The philosophy cards stay on /our-guides.
export function OurLocals() {
  return (
    <section id="guides" className="py-16 md:py-24 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <div className="text-center">
          <h2 className="leading-[1.0]">
            <span className="block text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              A few Norwich locals
            </span>
            <span className="block text-[clamp(44px,5.2vw,68px)] leading-[0.95] text-brand-accent" style={caveat}>
              who love showing it off.
            </span>
          </h2>
        </div>
        <GuideCards />
        <p className="mt-10 text-center" style={lora}>
          <a href="/our-guides" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent">
            Meet our guides →
          </a>
        </p>
      </div>
    </section>
  );
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
