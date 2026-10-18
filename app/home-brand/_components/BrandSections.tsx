// Brand homepage prototype (/home-brand). The homepage becomes the
// collective's front door, not one tour's page. Order (Tom 2026-10-18):
// pick your tour vibe first, then reviews, what a free tour is, one booking
// box for every bookable tour, the guides, FAQs, email. The free tour's own
// page (today's /) is planned to move to /tours/free-walking-tour.
// Same brand language as the live homepage: taped polaroids, Caveat for the
// key word, a dashed wobbly walking route. Own photos only.

import Image from "next/image";
import { Eater } from "next/font/google";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { guides } from "@/lib/guides";
import { tours } from "@/lib/tours";
import { BookingSection, VibePicker, type BookableKey, type BookingTab, type Vibe } from "./BrandBooking";

// Dark History's Halloween face, for its card and its booking-box theme.
const eater = Eater({ weight: "400", subsets: ["latin"], display: "swap" });

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };

function Wobble({ d, className }: { d: string; className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`}>
      <path
        d={d}
        fill="none"
        stroke="#2DA96B"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeDasharray="7 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

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

/* ── Tour data for this page ───────────────────────────────────────────── */

// Dark History runs until 6 November 2026. After that its vibe card and
// booking tab drop off on the next build.
const DARK_HISTORY_ENDS = new Date("2026-11-07T00:00:00Z");
const darkIsOn = () => Date.now() < DARK_HISTORY_ENDS.getTime();

const bySlug = (slug: string) => tours.find((t) => t.slug === slug)!;

function vibes(): Vibe[] {
  const dark = bySlug("dark-history-of-norwich");
  const priv = bySlug("private-tours");
  const list: Vibe[] = [
    {
      key: "free",
      vibe: "History & stories",
      name: "The Norwich Free Walking Tour",
      meta: "Most days, 10:30am · Free to book",
      action: "Book free",
      href: "/book",
      image: { src: "/images/tour/pottergate-walk.jpg", alt: "A guide leading a tour group down Pottergate in the Norwich Lanes" },
    },
    {
      key: "dark",
      vibe: "Dark and true",
      name: dark.name,
      meta: "Evenings until 6 Nov · Free to book",
      action: "Book free",
      href: `${dark.ctaHref}#book`,
      image: { src: dark.image, alt: dark.imageAlt },
    },
    {
      key: "private",
      vibe: "Just your group",
      name: "Private & Group Tours",
      meta: "Any day · Price on request",
      action: "Ask us",
      href: priv.ctaHref,
      image: { src: priv.image, alt: priv.imageAlt },
    },
    {
      key: "soon",
      vibe: "Something new",
      name: "A new tour, coming soon",
      meta: "Be first to hear",
      action: "Tell me first",
      href: "#updates",
    },
  ];
  return darkIsOn() ? list : list.filter((v) => v.key !== "dark");
}

function bookingTabs(): BookingTab[] {
  const dark = bySlug("dark-history-of-norwich");
  const list: BookingTab[] = [
    { key: "free", label: "Free Walking Tour", when: "Most days, 10:30am" },
    { key: "dark", label: "Dark History", when: "Evenings until 6 Nov", bookingTour: dark.details?.bookingTour },
  ];
  return darkIsOn() ? list : list.filter((t) => t.key !== "dark");
}

/* ── 1. Hero: Norwich, told by locals. Pick your vibe. ─────────────────── */

export function BrandHero() {
  const tabs = bookingTabs();
  return (
    <section id="top" className="relative overflow-hidden bg-brand-bg pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="brand-container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="leading-[0.95]">
            <span className="text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text" style={lora}>
              Norwich, told by
            </span>{" "}
            <span className="text-[clamp(52px,7vw,92px)] font-semibold leading-[0.9] text-brand-accent" style={caveat}>
              locals.
            </span>
          </h1>
          <p className="mt-3 text-[17px] md:text-[19px] leading-relaxed text-brand-text/75" style={lora}>
            Walking tours by guides who live here. What&apos;s your vibe?
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[14px] text-brand-text/75" style={lora}>
            <a href={googleReviewStats.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
              <span aria-hidden="true" className="text-[#F4B400]">★★★★★</span>
              <strong>{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count})
            </a>
            <a href={tripAdvisorStats.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <strong>{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
            </a>
          </p>
        </div>
        <div className="relative mt-9 md:mt-12">
          <Wobble d="M0 50 C 14 10, 30 90, 50 50 S 86 10, 100 50" className="hidden lg:block -left-4 -right-4 top-[38%] h-24 w-[calc(100%+2rem)]" />
          <VibePicker vibes={vibes()} bookable={tabs.map((t) => t.key as BookableKey)} eaterFamily={eater.style.fontFamily} />
        </div>
      </div>
    </section>
  );
}

/* ── 3. What is a free walking tour? ───────────────────────────────────── */

const freeSteps = [
  { n: "1", title: "Book free", text: "Reserve your spot online. £0 to book." },
  { n: "2", title: "Walk with a local", text: "A guide who lives here. Ask them anything." },
  { n: "3", title: "Tip what it was worth", text: "Most guests tip £10 to £20. Card or cash." },
];

export function FreeTourExplainer() {
  return (
    <section id="free-tours" className="py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <Heading a="Never done a" b="free tour?" sub="Popular across Europe, and now in Norwich. No ticket price. The guide earns it." />
        <ol className="relative mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 list-none p-0">
          <Wobble d="M0 50 C 14 20, 30 80, 50 50 S 86 20, 100 50" className="hidden md:block left-[12%] right-[12%] top-[14px] h-10 w-[76%]" />
          <Wobble d="M50 0 C 20 14, 80 30, 50 50 S 20 86, 50 100" className="md:hidden left-[6px] top-6 bottom-6 h-[calc(100%-3rem)] w-10" />
          {freeSteps.map((s) => (
            <li key={s.n} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-3 md:text-center">
              <span
                className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white text-[28px] font-bold shadow-[0_4px_10px_-4px_rgba(45,169,107,0.7)]"
                style={caveat}
                aria-hidden="true"
              >
                {s.n}
              </span>
              <div>
                <h3 className="text-[34px] font-bold leading-none text-brand-text" style={caveat}>
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
          <a
            href="/what-is-a-free-tour"
            className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent"
          >
            What is a free walking tour? →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── 4. One booking box for every bookable tour, themed to the pick ─── */

export function BookAnyTour() {
  return <BookingSection tabs={bookingTabs()} eaterFamily={eater.style.fontFamily} />;
}

/* ── 5. Guides: a short strip of faces ────────────────────────────────── */

export function GuidesStrip() {
  return (
    <section id="guides" className="py-14 md:py-20 bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-4xl">
        <Heading a="Locals who" b="love this city." sub="Every guide has their own favourite stories. Ask them anything." />
        <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-8 list-none p-0 m-0">
          {guides.map((g) => (
            <li key={g.name} className="flex flex-col items-center text-center">
              <div
                className="relative w-full max-w-[200px] bg-[#F5EBDA] p-1.5 pb-8 sm:p-2.5 sm:pb-11 shadow-lg border border-brand-text/5"
                style={{ transform: `rotate(${g.rotate})` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 left-1/2 w-14 h-5 rounded-[3px]"
                  style={{ transform: "translateX(-50%) rotate(-2deg)", backgroundColor: g.accent.ac, boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
                />
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: g.tint }}>
                  <Image
                    src={g.img}
                    alt={`${g.name}, guide with Norwich Free Walking Tours`}
                    fill
                    sizes="(max-width: 640px) 30vw, 200px"
                    className="object-cover"
                    style={{ objectPosition: g.focal }}
                  />
                </div>
                <p className="absolute bottom-1.5 sm:bottom-2.5 left-0 right-0 text-[24px] sm:text-3xl font-bold leading-none text-brand-text" style={caveat}>
                  {g.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center" style={lora}>
          <a
            href="/our-guides"
            className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent"
          >
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
