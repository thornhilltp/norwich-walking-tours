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
import type { CSSProperties } from "react";
import { Eater } from "next/font/google";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { guides } from "@/lib/guides";
import { tours } from "@/lib/tours";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { BookingSheet, TourCards, type BookingTab, type TourCardData } from "./BrandBooking";
import { HeroSlideshow, type HeroSlide } from "@/app/_components/HeroSlideshow";

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
      meta: "Most days, 10:30am · 2 hours",
      hook: "Why was Norwich England's second city?",
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
      meta: "Most evenings, 6pm · until 6 Nov",
      // Live Dark History wording.
      hook: "Not ghost stories. The real thing.",
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
      hook: "Birthday, work day or family visit? We build the walk around you.",
      action: "Ask us",
      href: priv.ctaHref,
      badge: "Your group",
      image: { src: priv.image, alt: priv.imageAlt },
    },
    {
      key: "soon",
      vibe: "On the way",
      name: "Something new",
      meta: "",
      hook: "A new way to see Norwich is coming. Hear about it first.",
      action: "Tell me first",
      href: "#updates",
      badge: "Coming soon",
      image: { src: "/images/tour/elm-hill-tour.jpg", alt: "" },
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
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/tour/group-street-laughing.jpg",
    alt: "A guide in a Walk with a Local t-shirt making a tour group laugh on a Norwich street",
    position: "40% 40%",
  },
  { src: "/images/tour/group-cathedral-flag.jpg", alt: "", position: "center 45%" },
  { src: "/images/tour/elm-hill-group.jpg", alt: "", position: "60% 40%" },
  { src: "/images/tour/tom-tombland-talk.jpg", alt: "", position: "center 40%" },
  { src: "/images/tour/group-portrait-bridge.jpg", alt: "", position: "center 45%" },
];

export function BrandHero() {
  return (
    <section id="top" className="relative isolate overflow-hidden" style={{ backgroundColor: "#121211" }}>
      <HeroSlideshow slides={HERO_SLIDES} />
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] lg:hidden"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.82) 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] hidden lg:block"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.25) 100%)" }}
      />
      <div className="brand-container max-w-6xl flex min-h-[86svh] lg:min-h-[90vh] items-end lg:items-center justify-center pt-28 pb-10 lg:pb-16">
        <div className="max-w-3xl text-center mx-auto" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {/* Mission line as the headline (Tom 2026-10-18). */}
          <h1 className="leading-[1.0]">
            <span className="block text-[clamp(30px,4.2vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white" style={lora}>
              Helping locals and travellers
            </span>
            <span className="block text-[clamp(44px,6vw,88px)] font-semibold leading-[0.95] text-[#7BE0AC]" style={caveat}>
              love and discover Norwich.
            </span>
          </h1>
          <p className="mt-4 text-[17px] md:text-[20px] leading-relaxed text-white/90 max-w-xl mx-auto" style={lora}>
            Walking tours and experiences, led by guides who live here.
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href="#tours"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 min-h-[54px] text-[24px] font-bold text-white shadow-lg hover:opacity-90 w-full sm:w-auto"
              style={caveat}
            >
              Explore tours &amp; experiences
            </a>
          </div>
          {/* Credibility, under the buttons: listings + review scores. */}
          <div className="mt-9 flex flex-col items-center gap-4">
            <PartnerLogosInverted size="sm" label="Featured on" />
            <p className="text-[14px] text-white/85" style={lora}>
              <span aria-hidden="true" className="text-[#F4B400]">★★★★★</span>{" "}
              <strong className="text-white">{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count}) ·{" "}
              <strong className="text-white">{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. The tours, each in its own look ───────────────────────────────── */

export function OurTours() {
  return (
    <section id="tours" className="scroll-mt-16 py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10 text-center md:text-left">
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              Tours and
            </span>{" "}
            <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
              experiences.
            </span>
          </h2>
          <a
            href="/tours"
            className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent"
            style={lora}
          >
            View all →
          </a>
        </div>
        <TourCards cards={tourCards()} eaterFamily={eater.style.fontFamily} />
      </div>
    </section>
  );
}

/* ── 3. What's a free walking tour? ─────────────────────────────────────── */

// Job: answer "what's the catch?" (Tom 2026-10-18). The format first, in
// his words, then why we do it: so anyone can come. One link, no steps.
export function WhatIsFree() {
  return (
    <section id="free-tours" className="py-16 md:py-24 bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-center">
        <figure
          className="relative m-0 mx-auto w-[86%] md:w-full bg-white border border-[#EAE0D4] p-3 pb-10 shadow-[2px_12px_26px_-12px_rgba(60,40,20,0.6)]"
          style={{ transform: "rotate(-2deg)" }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-[11px] left-1/2 w-24 h-6 rounded-[2px] z-10"
            style={{ transform: "translateX(-50%) rotate(-3deg)", backgroundColor: "#9FD6B8", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
          />
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-accent-light">
            <Image
              src="/images/tour/group-cathedral-lawn.jpg"
              alt="A tour group with their guides on the lawn in front of Norwich Cathedral"
              fill
              sizes="(max-width: 768px) 80vw, 440px"
              className="object-cover"
            />
          </div>
          <figcaption className="absolute bottom-2 left-0 right-0 text-center text-[24px] font-bold text-brand-text/80" style={caveat}>
            Everyone&apos;s welcome
          </figcaption>
        </figure>
        <div>
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              What&apos;s a free
            </span>{" "}
            <span className="inline text-[clamp(44px,5.2vw,68px)] leading-[0.95] text-brand-accent" style={caveat}>
              walking tour?
            </span>
          </h2>
          <p className="mt-5 text-[18px] md:text-[20px] leading-relaxed text-brand-text" style={lora}>
            Free tours are popular across Europe: an easy, affordable introduction to a new city. You book for £0, and at
            the end you pay what you think it was worth, usually £10 to £20 per person.
          </p>
          <p className="mt-6 text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.0] text-brand-accent" style={caveat}>
            So anyone can come.
          </p>
          <p className="mt-2 text-[17px] leading-relaxed text-brand-text/70" style={lora}>
            No ticket price means nobody is priced out: students, families, backpackers, and locals who have walked past
            it all for years.
          </p>
          <p className="mt-5" style={lora}>
            <a href="/what-is-a-free-tour" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent">
              More about free tours →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Booking: the sheet the sticky bar opens ───────────────────────── */

export function BrandBookingSheet() {
  return <BookingSheet tabs={bookingTabs()} eaterFamily={eater.style.fontFamily} />;
}

/* ── 5. Our locals: the guides ─────────────────────────────────────────── */

// Job: put faces to "led by locals" (Tom 2026-10-18). Taped polaroids;
// hover pops one out and shows the bio (phones: the bio is just there).
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
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 list-none p-0 m-0">
          {guides.map((g) => (
            <li key={g.name} className="group flex flex-col items-center text-center">
              <div
                className="relative w-full max-w-[280px] bg-[#F5EBDA] p-2.5 pb-12 shadow-lg border border-brand-text/5 transition-transform duration-300 ease-out [transform:rotate(var(--r))] group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.06)] group-hover:shadow-2xl"
                style={{ ["--r" as string]: g.rotate } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 w-20 h-6 rounded-[2px]"
                  style={{ transform: "translateX(-50%) rotate(-2deg)", backgroundColor: g.accent.ac, boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
                />
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: g.tint }}>
                  <Image src={g.img} alt={`${g.name}, guide with Norwich Free Walking Tours`} fill sizes="(max-width: 640px) 80vw, 280px" className="object-cover" style={{ objectPosition: g.focal }} />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-[32px] font-bold leading-none text-brand-text" style={caveat}>
                  {g.name}
                </p>
              </div>
              <p className="mt-5 max-w-[280px] text-[15px] leading-snug text-brand-text/75 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition duration-300" style={lora}>
                {g.blurb}
              </p>
            </li>
          ))}
        </ul>
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
