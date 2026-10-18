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
import { guides } from "@/lib/guides";
import { tours } from "@/lib/tours";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { BookingSection, BookingSheet, TourCards, type BookingTab, type TourCardData } from "./BrandBooking";
import { BrandHeroClient, type HeroOption } from "./BrandHeroClient";

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
      badge: "Most popular",
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
      badge: "Until 6 November",
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
      badge: "Your date",
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

/* ── 1. Header: a real photo, who we are, one button ───────────────────── */

// Pattern from Shoebox, Sandemans and Free Tours by Foot: one real photo,
// one line, trust, then straight to booking. "Featured on" sits at the very
// top for instant credibility (Tom 2026-10-18). No uppercase label above
// the headline.

function Trust({ light }: { light?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${light ? "text-white/90" : "text-brand-text/80 justify-center"}`}>
      <div className="flex items-center">
        <div className="flex -space-x-3">
          {guides.map((g) => (
            <span key={g.name} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow" style={{ background: g.tint }}>
              <Image src={g.img} alt="" fill sizes="40px" className="object-cover" style={{ objectPosition: g.focal }} />
            </span>
          ))}
        </div>
        <span className="ml-3 text-[15px]" style={lora}>
          {guides.map((g) => g.name).join(", ").replace(/, ([^,]*)$/, " and $1")}
        </span>
      </div>
      <span className="text-[14px]" style={lora}>
        <span aria-hidden="true" className="text-[#F4B400]">★★★★★</span> <strong>{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count}) ·{" "}
        <strong>{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
      </span>
    </div>
  );
}

function HeroWords({ light, trust = true }: { light?: boolean; trust?: boolean }) {
  return (
    <>
      {/* Mission line as the headline (Tom 2026-10-18). */}
      <h1 className="leading-[1.0]">
        <span className={`block text-[clamp(28px,4.2vw,54px)] font-semibold leading-[1.08] tracking-[-0.02em] ${light ? "text-white" : "text-brand-text"}`} style={lora}>
          Helping locals and travellers
        </span>
        <span className={`block text-[clamp(40px,6vw,84px)] font-semibold leading-[0.95] ${light ? "text-[#7BE0AC]" : "text-brand-accent"}`} style={caveat}>
          love and discover Norwich.
        </span>
      </h1>
      <p className={`mt-3 text-[16px] md:text-[20px] leading-relaxed max-w-xl ${light ? "text-white/90" : "text-brand-text/80 mx-auto"}`} style={lora}>
        Walking tours and experiences, led by guides who live here.
      </p>
      {trust && (
        <div className="mt-5">
          <Trust light={light} />
        </div>
      )}
    </>
  );
}

function heroOptions(): HeroOption[] {
  const dark = bySlug("dark-history-of-norwich");
  const list: HeroOption[] = [
    { key: "free", when: "By day", name: "The Norwich Free Walking Tour", times: "Most days, 10:30am · 2 hours", href: "/book" },
    { key: "dark", when: "After dark", name: "The Dark History of Norwich", times: "Most evenings, 6pm · until 6 Nov", href: `${dark.ctaHref}#book` },
  ];
  return darkIsOn() ? list : list.filter((o) => o.key !== "dark");
}

export function BrandHero() {
  return (
    <BrandHeroClient
      options={heroOptions()}
      eaterFamily={eater.style.fontFamily}
      wordsLight={<HeroWords light />}
      wordsDark={<HeroWords trust={false} />}
      trust={<Trust />}
      featured={<PartnerLogosInverted size="sm" label="Featured on" />}
    />
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

/* ── 3. What is a free walking tour? Real photos, like Meet / Walk / Tip. */

const freeSteps = [
  { n: "1", title: "Book free", text: "Reserve your spot online. £0 to book.", img: "/images/tour/group-the-forum.jpg", alt: "A tour group gathering outside The Forum" },
  { n: "2", title: "Walk with a local", text: "A guide who lives here. Ask them anything.", img: "/images/tour/tom-tombland-talk.jpg", alt: "Tom telling a story to a tour group in Tombland" },
  { n: "3", title: "Tip what it was worth", text: "Most guests tip £10 to £20. Card or cash.", img: "/images/tour/group-cathedral-flag.jpg", alt: "Guides and guests smiling together at Norwich Cathedral" },
];

function StepPhoto({ s }: { s: (typeof freeSteps)[number] }) {
  return (
    <div className="relative shrink-0">
      <div className="relative h-[96px] w-[96px] md:h-[140px] md:w-[140px] overflow-hidden rounded-full border-4 border-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] bg-brand-accent-light">
        <Image src={s.img} alt={s.alt} fill sizes="140px" className="object-cover" />
      </div>
      <span className="absolute -top-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-white text-[20px] font-bold shadow" style={caveat}>
        {s.n}
      </span>
    </div>
  );
}

export function FreeTourExplainer() {
  return (
    <section id="free-tours" className="py-14 md:py-20 bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <Heading a="Never done a" b="free tour?" sub="Popular across Europe, and now in Norwich. No ticket price. The guide earns it." />
        <ol className="relative mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-6 list-none p-0">
          <svg aria-hidden viewBox="0 0 100 20" preserveAspectRatio="none" className="hidden md:block pointer-events-none absolute left-[14%] right-[14%] top-[62px] h-5 w-[72%]">
            <path d="M0 10 C 16 0, 34 20, 50 10 S 84 0, 100 10" fill="none" stroke={GREEN} strokeOpacity="0.5" strokeWidth="3" strokeDasharray="7 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {freeSteps.map((s) => (
            <li key={s.n} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-2 md:text-center">
              <StepPhoto s={s} />
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
