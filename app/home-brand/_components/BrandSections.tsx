// Brand homepage prototype (/home-brand, 2026-10-17). The homepage becomes
// the collective's front door: who we are, what a free tour is, every tour
// as a card, then the shared proof, guides, booking and email. The free
// tour's own page (today's /) is planned to move to /tours/free-walking-tour.
// Same brand language as the live homepage: taped polaroids, Caveat for the
// key word, a dashed wobbly walking route. Own photos only.

import Image from "next/image";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { tours } from "@/lib/tours";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };
const tapes = ["#F4C26B", "#9FD6B8", "#F2A7A0"];

function Tape({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-[11px] left-1/2 w-20 h-6 rounded-[3px] z-10 ${className}`}
      style={{ transform: "translateX(-50%) rotate(-2deg)", backgroundColor: color, boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
    />
  );
}

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

function Stars() {
  return (
    <span aria-hidden="true" className="text-[#F4B400] tracking-[1px]">
      ★★★★★
    </span>
  );
}

/* ── Hero: Norwich, told by locals ─────────────────────────────────────── */

const heroPhotos = [
  { src: "/images/tour/pottergate-walk.jpg", alt: "A guide leading a walking tour group down Pottergate in the Norwich Lanes", rot: "-3deg", pos: "left-0 top-6 w-[62%] z-20" },
  { src: "/images/tour/cathedral-spire-lawn.jpg", alt: "Norwich Cathedral and its spire from the lawn of the Close", rot: "4deg", pos: "right-0 top-0 w-[48%] z-10" },
  { src: "/images/tour/holly-market.jpg", alt: "Holly, one of our guides, at Norwich Market", rot: "-1deg", pos: "right-[6%] bottom-0 w-[46%] z-30" },
];

export function BrandHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-bg pt-28 pb-14 md:pt-36 md:pb-24">
      <div className="brand-container grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="text-center lg:text-left">
          <p className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={lora}>
            Norwich Free Walking Tours
          </p>
          <h1 className="leading-[0.95]">
            <span
              className="block text-[clamp(40px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
              style={lora}
            >
              Norwich, told by
            </span>
            <span className="block text-[clamp(60px,7.5vw,104px)] font-semibold leading-[0.9] text-brand-accent" style={caveat}>
              locals.
            </span>
          </h1>
          <p className="mt-5 text-[18px] md:text-[20px] leading-relaxed text-brand-text/80 max-w-xl mx-auto lg:mx-0" style={lora}>
            A small crew of guides who live here. Free walking tours most days, darker stories after dark, and private
            walks for your group.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center lg:justify-start">
            <TrackedBookLink
              location="brand_hero"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-3.5 text-[26px] font-bold text-white shadow-lg transition hover:opacity-90 min-h-[56px] w-full sm:w-auto"
            >
              <span style={caveat}>Book the free tour</span>
            </TrackedBookLink>
            <a
              href="#tours"
              className="text-[17px] font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent min-h-[44px] inline-flex items-center"
              style={lora}
            >
              See all our tours ↓
            </a>
          </div>
          <p className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-[15px] text-brand-text/80" style={lora}>
            <a href={googleReviewStats.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
              <Stars /> <strong>{googleReviewStats.rating.toFixed(1)}</strong> Google ({googleReviewStats.count})
            </a>
            <a href={tripAdvisorStats.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
              <strong>{tripAdvisorStats.rating.toFixed(1)}</strong> TripAdvisor ({tripAdvisorStats.count})
            </a>
          </p>
        </div>

        {/* Polaroid cluster, the walking route looping behind it. */}
        <div className="relative mx-auto w-full max-w-[460px] aspect-[1/0.95]">
          <Wobble d="M0 70 C 18 40, 40 96, 58 64 S 84 20, 100 34" className="inset-0 h-full w-full" />
          {heroPhotos.map((p, i) => (
            <figure
              key={p.src}
              className={`absolute ${p.pos} bg-white border border-[#EAE0D4] rounded-[4px] p-2.5 pb-8 shadow-[2px_12px_28px_-12px_rgba(90,70,40,0.6)]`}
              style={{ transform: `rotate(${p.rot})` }}
            >
              <Tape color={tapes[i]} />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-brand-accent-light">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 60vw, 290px"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── What is a free walking tour? ──────────────────────────────────────── */

const freeSteps = [
  { n: "1", title: "Book free", text: "Reserve your spot online. £0 to book." },
  { n: "2", title: "Walk with a local", text: "Two hours with a guide who lives here. Ask them anything." },
  { n: "3", title: "Tip what it was worth", text: "Most guests tip £10 to £20. Card or cash." },
];

export function FreeTourExplainer() {
  return (
    <section id="free-tours" className="py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <div className="text-center">
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              Never done a
            </span>{" "}
            <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
              free tour?
            </span>
          </h2>
          <p className="mt-4 text-[17px] md:text-lg text-brand-text/70 leading-relaxed max-w-xl mx-auto" style={lora}>
            Popular across Europe, and now in Norwich. No ticket price. The guide earns it.
          </p>
        </div>
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

/* ── Our tours: one card per tour ──────────────────────────────────────── */

// Images, prices and links come from lib/tours.ts; the words are written for
// this page (history and stories first, "most days", no stop counts).
// FREE_TOUR_HREF becomes /tours/free-walking-tour when the free tour moves.
const FREE_TOUR_HREF = "/";
const bySlug = (slug: string) => tours.find((t) => t.slug === slug)!;

type Card = {
  key: string;
  name: string;
  badge?: string;
  meta: string[];
  hook: string;
  text: string;
  image?: { src: string; alt: string };
  price: string;
  primary: { label: string; href: string; book?: boolean };
  secondary?: { label: string; href: string };
};

function buildCards(): Card[] {
  const free = bySlug("free-walking-tour");
  const dark = bySlug("dark-history-of-norwich");
  const priv = bySlug("private-tours");
  return [
    {
      key: "free",
      name: "The Norwich Free Walking Tour",
      badge: "Our main walk",
      meta: ["Most days, 10:30am", "2 hours", "From The Forum"],
      hook: "Why was Norwich England's second city?",
      text: "Our favourite history and stories, the highlights, and where locals eat and drink.",
      image: { src: free.image, alt: free.imageAlt },
      price: "Free to book, tip what it was worth",
      primary: { label: "Book free", href: "/book", book: true },
      secondary: { label: "See the tour", href: `${FREE_TOUR_HREF}#tour-map` },
    },
    {
      key: "dark",
      name: dark.name,
      badge: "Until 6 November",
      meta: ["Most evenings, 6pm", "1h 30m", "From City Hall"],
      hook: "Ghost stories? The true ones are darker.",
      text: "Riot, rebellion, murder, fire, flood and plague, from City Hall to Tombland Alley.",
      image: { src: dark.image, alt: dark.imageAlt },
      price: "Free to book, tip what it was worth",
      primary: { label: "See the tour", href: dark.ctaHref },
    },
    {
      key: "private",
      name: "Private & Group Tours",
      meta: ["Your date", "Your group", "Your route"],
      hook: "Birthday, work day or family visit?",
      text: "We build the walk around what your group wants to see.",
      image: { src: priv.image, alt: priv.imageAlt },
      price: priv.priceLine,
      primary: { label: "Ask us", href: priv.ctaHref },
    },
    {
      key: "soon",
      name: "A new tour",
      badge: "Coming soon",
      meta: [],
      hook: "Something new is on the way.",
      text: "Join the list and you'll hear before anyone else.",
      price: "",
      primary: { label: "Tell me first", href: "#updates" },
    },
  ];
}

function TourCard({ c, i }: { c: Card; i: number }) {
  const featured = c.key === "free";
  return (
    <li
      className={`relative flex flex-col bg-[#FFFDF9] border border-[#EAE0D4] rounded-[6px] p-3 pb-5 shadow-[2px_12px_28px_-14px_rgba(90,70,40,0.55)] ${
        featured ? "md:col-span-2 md:grid md:grid-cols-[1.1fr_1fr] md:gap-6 md:items-center" : ""
      }`}
      style={{ transform: `rotate(${i % 2 === 0 ? "-0.8deg" : "0.8deg"})` }}
    >
      <Tape color={tapes[i % tapes.length]} />
      <div className={`relative overflow-hidden rounded-[2px] ${featured ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
        {c.image ? (
          <Image src={c.image.src} alt={c.image.alt} fill className="object-cover" sizes={featured ? "(max-width: 768px) 92vw, 560px" : "(max-width: 768px) 92vw, 420px"} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-accent-light border-2 border-dashed border-brand-accent/40">
            <span className="text-[96px] leading-none text-brand-accent/70" style={caveat} aria-hidden="true">
              ?
            </span>
          </div>
        )}
        {c.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[13px] font-semibold ${
              c.key === "dark" ? "bg-[#1A1A1A] text-white" : "bg-brand-accent text-white"
            }`}
            style={lora}
          >
            {c.badge}
          </span>
        )}
      </div>
      <div className="px-1 pt-4 md:pt-0 flex flex-col flex-1">
        <h3 className={`${featured ? "text-[40px] md:text-[46px]" : "text-[34px]"} leading-[1.0] text-brand-text font-bold`} style={caveat}>
          {c.name}
        </h3>
        {c.meta.length > 0 && (
          <p className="mt-1.5 text-[13px] uppercase tracking-[0.12em] font-semibold text-brand-accent-text" style={lora}>
            {c.meta.join(" · ")}
          </p>
        )}
        <p className="mt-3 text-[18px] font-semibold leading-snug text-brand-text" style={lora}>
          {c.hook}
        </p>
        <p className="mt-1.5 text-[16px] leading-relaxed text-brand-text/70" style={lora}>
          {c.text}
        </p>
        <div className="mt-auto pt-5">
          {c.price && (
            <p className="text-[15px] font-semibold text-brand-text mb-3" style={lora}>
              {c.price}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {c.primary.book ? (
              <TrackedBookLink
                location="brand_tour_card"
                href={c.primary.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[22px] font-bold text-white shadow-md hover:opacity-90 min-h-[48px]"
              >
                <span style={caveat}>{c.primary.label}</span>
              </TrackedBookLink>
            ) : (
              <a
                href={c.primary.href}
                className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[22px] font-bold min-h-[48px] border-2 ${
                  c.key === "dark"
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white hover:opacity-90"
                    : "border-brand-accent text-brand-accent-text hover:bg-brand-accent-light"
                }`}
                style={caveat}
              >
                {c.primary.label}
              </a>
            )}
            {c.secondary && (
              <a
                href={c.secondary.href}
                className="text-[16px] font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent min-h-[44px] inline-flex items-center"
                style={lora}
              >
                {c.secondary.label} →
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function OurTours() {
  const cards = buildCards();
  return (
    <section id="tours" className="py-14 md:py-24 bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
              Pick your
            </span>{" "}
            <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
              walk.
            </span>
          </h2>
          <p className="mt-4 text-[17px] md:text-lg text-brand-text/70 leading-relaxed max-w-xl mx-auto" style={lora}>
            Same city, different stories. Every tour is led by a local guide.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 list-none p-0 m-0">
          {cards.map((c, i) => (
            <TourCard key={c.key} c={c} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Who we are: the mission line ─────────────────────────────────────── */

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative overflow-hidden py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
        <figure
          className="relative w-[86%] mx-auto bg-white border border-[#EAE0D4] rounded-[4px] p-3 pb-6 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]"
          style={{ transform: "rotate(-2deg)" }}
        >
          <Tape color={tapes[1]} />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-brand-accent-light">
            <Image
              src="/images/tour/group-cathedral-flag.jpg"
              alt="A tour group smiling together at Norwich Cathedral at the end of the walk"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 420px"
            />
          </div>
        </figure>
        <div className="text-center md:text-left">
          <p className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={lora}>
            Who we are
          </p>
          <p className="text-[clamp(38px,4.6vw,56px)] leading-[1.0] text-brand-accent" style={caveat}>
            Helping locals and travellers love and discover Norwich.
          </p>
          <p className="mt-5 text-[17px] md:text-lg leading-relaxed text-brand-text/75" style={lora}>
            It started with one free walk from The Forum. Now it&apos;s a small crew of local guides, each with their
            own favourite stories, and new tours on the way.
          </p>
        </div>
      </div>
    </section>
  );
}
