// Brand homepage prototype (/home-brand). The homepage becomes the
// collective's front door, not one tour's page. Order (Tom 2026-10-18):
// the crew's own header (map, tagline, faces, the deal), then the four tours
// as their own section, each in its tour's look, then reviews and videos,
// what a free tour is, one booking box for every tour, guides, FAQs, email.
//
// House style for the crew (not any one tour): the map. A hand-drawn Norwich
// street sketch, the dashed walking route and map pins, like the logo.
// Polaroids belong to the free tour; Eater and fog to Dark History.
// The free tour's own page (today's /) is planned to move to
// /tours/free-walking-tour.

import Image from "next/image";
import { Eater } from "next/font/google";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { guides } from "@/lib/guides";
import { partners } from "@/lib/partners";
import { tours } from "@/lib/tours";
import { BookingSection, BookingSheet, HeroBookFree, TourCards, type BookingTab, type TourCardData } from "./BrandBooking";

// Dark History's Halloween face, for its card and its booking theme.
const eater = Eater({ weight: "400", subsets: ["latin"], display: "swap" });

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };
const GREEN = "#2DA96B";

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
      image: { src: priv.image, alt: priv.imageAlt },
    },
    {
      key: "soon",
      vibe: "Something new",
      name: "A new tour",
      meta: "",
      hook: "Something new is on the way. Hear about it first.",
      action: "Tell me first",
      href: "#updates",
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

function Heading({ a, b, sub }: { a: string; b: string; sub?: string }) {
  return (
    <div className="text-center">
      <h2 className="leading-[1.0]">
        <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
          {a}
        </span>{" "}
        <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
          {b}
        </span>
      </h2>
      {sub && (
        <p className="mt-4 text-[17px] md:text-lg text-brand-text/70 leading-relaxed max-w-xl mx-auto" style={lora}>
          {sub}
        </p>
      )}
    </div>
  );
}

/** Map pin, the logo's shape. Tip at (0,0). */
function Pin({ x, y, fill = GREEN, label }: { x: number; y: number; fill?: string; label?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 C -6 -8 -10 -13 -10 -19 A 10 10 0 1 1 10 -19 C 10 -13 6 -8 0 0 Z" fill={fill} />
      <circle cx="0" cy="-19" r="4" fill="#FCFAF8" />
      {label && (
        <text x="14" y="-14" fontSize="20" fill="#1A1A1A" style={caveat} fontWeight={700}>
          {label}
        </text>
      )}
    </g>
  );
}

/** Hand-drawn sketch of central Norwich. Not to scale: the river loop, a
    few streets, and where each tour starts. Decorative. */
function NorwichMap() {
  const street = { fill: "none", stroke: "#1A1A1A", strokeOpacity: 0.12, strokeWidth: 2, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 400 320" className="w-full h-auto" aria-hidden="true">
      {/* River Wensum, looping round the north and east of the centre. */}
      <path d="M-10 62 C 70 30, 150 26, 222 44 S 336 70, 352 132 S 356 250, 296 330" fill="none" stroke="#A9D3E0" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
      <path d="M-10 62 C 70 30, 150 26, 222 44 S 336 70, 352 132 S 356 250, 296 330" fill="none" stroke="#FCFAF8" strokeWidth="2" strokeDasharray="3 10" opacity="0.8" />
      {/* Streets, wobbly on purpose. */}
      <path d="M20 150 C 90 140, 170 152, 250 138 S 330 150, 390 146" {...street} />
      <path d="M30 250 C 100 236, 180 252, 260 240 S 330 252, 380 246" {...street} />
      <path d="M90 300 C 96 230, 84 150, 100 70" {...street} />
      <path d="M170 310 C 176 240, 164 170, 178 60" {...street} />
      <path d="M250 300 C 240 240, 262 170, 246 70" {...street} />
      <path d="M40 200 C 120 196, 200 208, 300 194" {...street} />
      {/* Cathedral spire and castle keep, sketched. */}
      <g transform="translate(290 128)" fill="none" stroke="#1A1A1A" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round">
        <path d="M-16 22 V4 H16 V22 M-6 4 V-6 H6 V4 M0 -6 L0 -30" />
        <path d="M-3 -6 L0 -30 L3 -6" />
      </g>
      <text x="270" y="170" fontSize="18" fill="#1A1A1A" fillOpacity="0.65" style={caveat}>
        Cathedral
      </text>
      <g transform="translate(212 236)" fill="none" stroke="#1A1A1A" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round">
        <path d="M-16 14 V-8 H-10 V-14 H-4 V-8 H4 V-14 H10 V-8 H16 V14 Z" />
      </g>
      <text x="234" y="246" fontSize="18" fill="#1A1A1A" fillOpacity="0.65" style={caveat}>
        Castle
      </text>
      <text x="196" y="92" fontSize="18" fill="#1A1A1A" fillOpacity="0.65" style={caveat}>
        Elm Hill
      </text>
      {/* The free tour's route, roughly: Forum, Lanes, Elm Hill, Cathedral, Castle, Market. */}
      <path
        d="M110 196 C 130 150, 160 112, 200 104 S 268 104, 286 150 S 254 222, 214 232 S 186 236, 170 220"
        fill="none"
        stroke={GREEN}
        strokeWidth="3"
        strokeDasharray="7 8"
        strokeLinecap="round"
      />
      {/* Dark History, roughly: City Hall into the dark, to Tombland Alley. */}
      <path d="M86 248 C 120 290, 196 290, 236 206 S 262 150, 300 176" fill="none" stroke="#121211" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="3 7" strokeLinecap="round" />
      <Pin x={110} y={196} label="The Forum" />
      <Pin x={86} y={248} fill="#121211" label="City Hall" />
      <Pin x={170} y={220} fill="#F4C26B" />
      <text x="150" y="258" fontSize="18" fill="#1A1A1A" fillOpacity="0.65" style={caveat}>
        Market
      </text>
    </svg>
  );
}

/* ── 1. Header: who we are ─────────────────────────────────────────────── */

export function BrandHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-bg pt-24 pb-10 md:pt-32 md:pb-16">
      <div className="brand-container max-w-6xl grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <p className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={lora}>
            Norwich Free Walking Tours
          </p>
          <h1 className="leading-[0.95]">
            <span className="text-[clamp(38px,5vw,62px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text" style={lora}>
              Norwich, told by
            </span>{" "}
            <span className="text-[clamp(56px,7vw,96px)] font-semibold leading-[0.9] text-brand-accent" style={caveat}>
              locals.
            </span>
          </h1>
          <p className="mt-4 text-[17px] md:text-[19px] leading-relaxed text-brand-text/80 max-w-lg mx-auto lg:mx-0" style={lora}>
            A small crew of guides who live here. Our favourite history, stories and corners of the city, on foot.
          </p>
          {/* The deal, up front: the first thing tourists wonder. */}
          <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-2 rounded-full bg-brand-accent-light px-4 py-2 text-[15px] text-brand-text" style={lora}>
            <strong>Free to book. Tip what it was worth.</strong>
            <a href="#free-tours" className="text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40">
              How?
            </a>
          </p>
          {/* Faces up top: "told by locals" lands when you see the locals. */}
          <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {guides.map((g) => (
                  <span key={g.name} className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow" style={{ background: g.tint }}>
                    <Image src={g.img} alt="" fill sizes="44px" className="object-cover" style={{ objectPosition: g.focal }} />
                  </span>
                ))}
              </div>
              <span className="ml-3 text-[15px] text-brand-text/80" style={lora}>
                {guides.map((g) => g.name).join(", ").replace(/, ([^,]*)$/, " and $1")}
              </span>
            </div>
            <span className="text-[14px] text-brand-text/75" style={lora}>
              <span aria-hidden="true" className="text-[#F4B400]">★</span> <strong>{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count}) ·{" "}
              <strong>{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
            </span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5">
            <a
              href="#tours"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 min-h-[54px] text-[25px] font-bold text-white shadow-lg hover:opacity-90 w-full sm:w-auto"
              style={caveat}
            >
              Pick your tour ↓
            </a>
            <HeroBookFree className="text-[19px] font-bold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent min-h-[44px] inline-flex items-center">
              or book the free tour
            </HeroBookFree>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[460px] lg:max-w-none -mt-2 lg:mt-0">
          <NorwichMap />
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
        <Heading a="Which Norwich do you" b="want to see?" />
        <div className="mt-10 md:mt-12">
          <TourCards cards={tourCards()} eaterFamily={eater.style.fontFamily} />
        </div>
      </div>
    </section>
  );
}

/* ── Featured on: the listings we're on ───────────────────────────────── */

export function FeaturedOn() {
  return (
    <div className="pt-2 pb-10">
      <p className="text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-text/50 mb-4" style={lora}>
        Find us on
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 list-none p-0 m-0">
        {partners.map((p) => (
          <li key={p.name}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Our listing on ${p.name} (opens in a new tab)`} className="block opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition">
              <Image src={p.src} alt={`${p.name} logo`} width={p.width} height={p.height} className={p.name === "VisitNorwich" ? "h-7 w-auto" : "h-4 w-auto"} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 3. What is a free walking tour? Map pins for numbers. ────────────── */

const freeSteps = [
  { n: "1", title: "Book free", text: "Reserve your spot online. £0 to book." },
  { n: "2", title: "Walk with a local", text: "A guide who lives here. Ask them anything." },
  { n: "3", title: "Tip what it was worth", text: "Most guests tip £10 to £20. Card or cash." },
];

function NumberPin({ n }: { n: string }) {
  return (
    <svg viewBox="-14 -38 28 40" className="relative z-10 h-14 w-12 shrink-0" aria-hidden="true">
      <path d="M0 0 C -8 -10 -13 -16 -13 -24 A 13 13 0 1 1 13 -24 C 13 -16 8 -10 0 0 Z" fill={GREEN} />
      <text x="0" y="-17" textAnchor="middle" fontSize="18" fontWeight={700} fill="#fff" style={caveat}>
        {n}
      </text>
    </svg>
  );
}

export function FreeTourExplainer() {
  return (
    <section id="free-tours" className="py-14 md:py-20 bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <Heading a="Never done a" b="free tour?" sub="Popular across Europe, and now in Norwich. No ticket price. The guide earns it." />
        <ol className="relative mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-6 list-none p-0">
          <svg aria-hidden viewBox="0 0 100 20" preserveAspectRatio="none" className="hidden md:block pointer-events-none absolute left-[14%] right-[14%] top-[22px] h-5 w-[72%]">
            <path d="M0 10 C 16 0, 34 20, 50 10 S 84 0, 100 10" fill="none" stroke={GREEN} strokeOpacity="0.5" strokeWidth="3" strokeDasharray="7 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {freeSteps.map((s) => (
            <li key={s.n} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-2 md:text-center">
              <NumberPin n={s.n} />
              <div>
                <h3 className="text-[32px] font-bold leading-none text-brand-text" style={caveat}>
                  {s.title}
                </h3>
                <p className="mt-1.5 text-base text-brand-text/70 leading-relaxed md:max-w-[240px] md:mx-auto" style={lora}>
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center" style={lora}>
          <a href="/what-is-a-free-tour" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent">
            What is a free walking tour? →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── 4. Booking: in-page box + the sheet the cards open ───────────────── */

export function BookAnyTour() {
  return <BookingSection tabs={bookingTabs()} eaterFamily={eater.style.fontFamily} />;
}

export function BrandBookingSheet() {
  return <BookingSheet tabs={bookingTabs()} eaterFamily={eater.style.fontFamily} />;
}

/* ── 5. Guides: round faces, the crew's own look (not polaroids) ──────── */

export function GuidesStrip() {
  return (
    <section id="guides" className="py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-4xl">
        <Heading a="Locals who" b="love this city." sub="Every guide has their own favourite stories. Ask them anything." />
        <ul className="mt-10 grid grid-cols-3 gap-4 sm:gap-10 list-none p-0 m-0">
          {guides.map((g) => (
            <li key={g.name} className="flex flex-col items-center text-center">
              <span className="relative block aspect-square w-full max-w-[150px] overflow-hidden rounded-full border-4 border-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]" style={{ background: g.tint, outline: `3px dashed ${GREEN}66`, outlineOffset: 4 }}>
                <Image src={g.img} alt={`${g.name}, guide with Norwich Free Walking Tours`} fill sizes="(max-width: 640px) 30vw, 150px" className="object-cover" style={{ objectPosition: g.focal }} />
              </span>
              <p className="mt-3 text-[30px] font-bold leading-none text-brand-text" style={caveat}>
                {g.name}
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
