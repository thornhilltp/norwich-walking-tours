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
import { BookingSheet, TourCards, type BookingTab, type TourCardData } from "./BrandBooking";
import { HeroSlideshow, type HeroSlide } from "@/app/_components/HeroSlideshow";
import { Grain } from "@/app/tours/_components/Spooky";
import { GuideCards } from "./GuideCards";

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
    <section id="free-tours" className="relative bg-brand-bg border-t border-brand-accent/10 lg:min-h-[640px]">
      {/* Photo takes the left half, edge to edge (phones: full width on
          top). Warm film look + grain, handwritten note on the photo. */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 overflow-hidden">
        <Image
          src="/images/tour/group-cathedral-lawn.jpg"
          alt="A tour group with their guides on the lawn in front of Norwich Cathedral"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: "center 45%", filter: "sepia(0.18) saturate(1.12) contrast(1.06) brightness(1.02)" }}
        />
        <Grain />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }} />
        <p className="absolute bottom-4 left-5 text-[34px] font-bold leading-none text-white" style={{ ...caveat, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          Everyone&apos;s welcome
        </p>
      </div>
      <div className="brand-container max-w-6xl">
        <div className="lg:ml-[50%] lg:pl-14 py-12 lg:py-24">
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
