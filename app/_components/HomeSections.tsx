// Homepage sections (built as /home-next, live on / since 2026-10-17): a
// tourist-first homepage built the same way as the Dark History page: hero,
// info card, three points with photos, proof, meet/walk/tip, guides, FAQs,
// then book. Phone first. Guides come from lib/guides.ts, shared with
// /our-guides.

import Image from "next/image";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import type { ReactNode } from "react";
import { GuideExpand } from "@/app/our-guides/_components/GuideExpand";
import { GuideReviews } from "@/app/our-guides/_components/GuideReviews";
import { guides } from "@/lib/guides";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };

function Heading({ eyebrow, a, b, center }: { eyebrow?: string; a: string; b: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : undefined}>
      {eyebrow && (
        <p className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={lora}>
          {eyebrow}
        </p>
      )}
      <h2 className="leading-[1.0]">
        <span
          className="inline text-[clamp(32px,3.8vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
          style={lora}
        >
          {a}
        </span>{" "}
        <span className="inline text-[clamp(42px,5vw,64px)] font-semibold leading-[0.95] text-brand-accent" style={caveat}>
          {b}
        </span>
      </h2>
    </div>
  );
}

/* ── Info bar: same card as the Dark History page, tucked under the hero ── */

const facts = [
  { label: "When", value: "Most days, 10:30am (2 hours)" },
  { label: "Route", value: "The Forum to Norwich Market" },
  { label: "Price", value: "Free to book, pay what it was worth" },
];

export function InfoBar() {
  return (
    <div className="relative z-10 -mt-10 md:-mt-12">
      <div className="brand-container">
        <dl className="bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(26,26,26,0.25)] border border-brand-text/[0.05] px-6 py-6 md:px-10 md:py-7 grid grid-cols-1 text-center md:grid-cols-3 md:text-left gap-x-8 gap-y-5">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-accent mb-1" style={lora}>
                {f.label}
              </dt>
              <dd className="text-[17px] md:text-[18px] font-bold m-0 leading-snug text-brand-text" style={lora}>
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ── "What's on the tour?" Three points, photo then words (Dark History layout) */

// Order (Tom 2026-10-17): history and stories, then the highlights, then
// local life. Each point: title, the questions it answers, one short line.
// Never quote a stop count: the route varies by guide and day.
type Photo = { src: string; alt: string };
const secrets: { title: string; questions: string; text: string; photos: Photo[] }[] = [
  {
    title: "Our favourite history and stories",
    questions: "Why was Norwich England's second city? Where did all the wool money come from, and where did it go?",
    text: "Our pick of 900 years, told on the streets where it happened.",
    photos: [{ src: "/images/tour/tom-river.jpg", alt: "Tom telling a story to the group by the river" }],
  },
  {
    title: "All of Norwich's highlights",
    questions: "Why does one small city have so many medieval churches? How did Elm Hill survive?",
    text: "Norwich Cathedral, the Castle, Elm Hill, Tombland, the Lanes and the Market, in one easy walk.",
    // Collage of the highlights, the Cathedral first and biggest. Tom's own tour
    // photos only (2026-10-17): the *-stock.png images were pulled, source unknown.
    photos: [
      { src: "/images/tour/cathedral-spire-lawn.jpg", alt: "Norwich Cathedral and its spire from the lawn of the Close" },
      { src: "/images/tour/guide-guildhall.jpg", alt: "A guide talking to a tour group outside Norwich Guildhall" },
      { src: "/images/tour/group-britons-arms.jpg", alt: "Tom with a tour group outside the Britons Arms coffee house on Elm Hill" },
    ],
  },
  {
    title: "Life in Norwich today",
    // Sunday Times Best Places to Live 2026 (verified). No "best in Europe" claim: no source found.
    questions: "Why was Norwich voted the best place to live in the UK? And why do so few visitors know about it?",
    text: "Our guides live here, so ask them anything. Make the most of your trip.",
    photos: [{ src: "/images/tour/elm-hill-group.jpg", alt: "Guide with an engaged group on Elm Hill" }],
  },
];

const tapes = ["#F4C26B", "#9FD6B8", "#F2A7A0"];

function PointPhotos({ photos }: { photos: Photo[] }) {
  if (photos.length === 1) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-brand-accent-light">
        <Image src={photos[0].src} alt={photos[0].alt} fill className="object-cover" sizes="(max-width: 768px) 92vw, 480px" />
      </div>
    );
  }
  // Collage: the first photo tall on the left, the rest stacked on the right.
  const [first, ...rest] = photos;
  return (
    <div className="grid grid-cols-[1.25fr_1fr] grid-rows-[100%] gap-1.5 aspect-[4/3]">
      <div className="relative h-full overflow-hidden rounded-[2px] bg-brand-accent-light">
        <Image src={first.src} alt={first.alt} fill className="object-cover" sizes="(max-width: 768px) 52vw, 270px" />
      </div>
      <div className="grid h-full gap-1.5" style={{ gridTemplateRows: `repeat(${rest.length}, 1fr)` }}>
        {rest.map((p) => (
          <div key={p.src} className="relative overflow-hidden rounded-[2px] bg-brand-accent-light">
            <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 220px" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Phone route: past photo 1 on the right, across to the left for photo 2,
// back to the right for photo 3, wobbling as it goes.
const phoneSnake =
  "M50 0 C 80 2, 94 10, 92 24 S 88 42, 94 52 S 30 80, 10 104 S 4 128, 9 140 S 12 152, 7 160 S 70 180, 90 205 S 96 230, 91 245 S 85 262, 70 280 S 54 296, 50 300";

// `stickers` (optional): scrapbook stickers stuck on each point's polaroid,
// one slot per point (free tour page). The live homepage passes none.
export function WhatYouGet({ stickers }: { stickers?: ReactNode[] } = {}) {
  return (
    <section id="tour-map" className="relative overflow-hidden py-16 md:py-28 bg-brand-bg">
      <div className="relative brand-container">
        <h2 className="text-center leading-[1.0] mb-12 md:mb-16">
          <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text" style={lora}>
            What&apos;s on
          </span>{" "}
          <span className="inline text-[clamp(40px,4.8vw,60px)] leading-[0.95] text-brand-accent" style={caveat}>
            the tour?
          </span>
        </h2>
        <ol className="relative m-0 p-0 list-none flex flex-col gap-14 md:gap-16 max-w-5xl mx-auto">
          {/* Brand touch (Tom 2026-10-17): a wobbly walking route snakes
              behind the points, 1 to 2 to 3. The polaroids sit on top, so
              the route seems to pass between them. */}
          <svg
            aria-hidden
            viewBox="0 0 100 300"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -top-6 -bottom-6 h-[calc(100%+3rem)] w-full hidden md:block"
          >
            <path
              d="M50 0 C 64 6, 88 18, 86 40 S 70 62, 80 78 S 30 96, 22 112 S 12 140, 30 156 S 74 170, 82 188 S 60 214, 72 232 S 34 258, 46 276 S 54 292, 50 300"
              fill="none"
              stroke="#2DA96B"
              strokeOpacity="0.4"
              strokeWidth="3"
              strokeDasharray="8 9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Phones: the photos sit off to alternate sides, so the route can
              snake past each one in the open space. */}
          <svg
            aria-hidden
            viewBox="0 0 100 300"
            preserveAspectRatio="none"
            className="md:hidden pointer-events-none absolute inset-x-0 -top-4 bottom-0 h-[calc(100%+1rem)] w-full"
          >
            <path
              d={phoneSnake}
              fill="none"
              stroke="#2DA96B"
              strokeOpacity="0.5"
              strokeWidth="3"
              strokeDasharray="7 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {secrets.map((st, i) => (
            <li
              key={st.title}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Brand touch: taped polaroid. */}
              <figure
                className={`relative w-[84%] md:w-full md:mx-auto ${i % 2 === 0 ? "mr-auto" : "ml-auto"} bg-white border border-[#EAE0D4] rounded-[4px] p-3 pb-6 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]`}
                style={{ transform: `rotate(${i % 2 === 0 ? "-1.5deg" : "1.5deg"})` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[11px] left-1/2 w-20 h-6 rounded-[3px] z-10"
                  style={{
                    transform: "translateX(-50%) rotate(-2deg)",
                    backgroundColor: tapes[i % tapes.length],
                    boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                  }}
                />
                <PointPhotos photos={st.photos} />
                {stickers?.[i]}
              </figure>
              {/* Hierarchy: number + title, then the questions, then one line. */}
              <div className="relative text-left rounded-2xl bg-brand-bg/90 px-1 py-1 md:px-4 md:py-3">
                <div className="flex items-center justify-start gap-3 mb-3">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white text-[22px] font-bold shadow-[0_4px_10px_-4px_rgba(45,169,107,0.7)]"
                    style={caveat}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[clamp(32px,3.6vw,46px)] leading-[1.0] text-brand-accent text-left" style={caveat}>
                    {st.title}
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] font-semibold leading-snug text-brand-text m-0" style={lora}>
                  {st.questions}
                </p>
                <p className="mt-2.5 text-[16px] md:text-[17px] leading-relaxed m-0 text-brand-text/70" style={lora}>
                  {st.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Proof wrapper: reviews and guest videos as one section ───────────── */

export function ProofVideos({ children }: { children: ReactNode }) {
  return (
    <section id="guest-videos" className="pb-14 md:pb-20 -mt-10 md:-mt-14" style={{ backgroundColor: "#FAF4E8" }}>
      <div className="brand-container max-w-3xl">
        {children}
        {/* One CTA for the whole proof block, after the videos. */}
        <p className="text-center mt-2">
          <TrackedBookLink
            location="home_proof"
            className="inline-block italic text-lg text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent"
          >
            Fancy joining them? Book your spot (free) &rarr;
          </TrackedBookLink>
        </p>
      </div>
    </section>
  );
}

/* ── How it works: meet, walk, tip, joined by a wiggly walking route ──── */

const beats = [
  {
    n: "1",
    title: "Meet",
    text: "Outside The Forum at 10:30am.",
    img: "/images/tour/group-st-andrews.jpg",
    alt: "Guide with the group gathered at the start of the walk",
  },
  {
    n: "2",
    title: "Walk",
    text: "Two easy hours. The Castle, Elm Hill, Tombland, the Cathedral.",
    img: "/images/tour/tom-tombland.jpg",
    alt: "Tom leading the group through Tombland",
  },
  {
    n: "3",
    title: "Tip",
    text: "Finish at the Market for lunch. Pay what it was worth.",
    img: "/images/tour/group-cathedral-flag.jpg",
    alt: "The group smiling together at the end of the walk",
  },
];

// Dashed, wiggly path like the ScrollTrail thread: a walking route, not a ruler.
function Route({ vertical }: { vertical?: boolean }) {
  const d = vertical
    ? "M10 0 C 22 40, -2 80, 10 120 S 22 200, 10 240 S -2 320, 10 360 S 22 440, 10 480"
    : "M0 10 C 40 -2, 80 22, 120 10 S 200 -2, 240 10 S 320 22, 360 10 S 440 -2, 480 10";
  return (
    <svg
      aria-hidden
      viewBox={vertical ? "0 0 20 480" : "0 0 480 20"}
      preserveAspectRatio="none"
      className={
        vertical
          ? "md:hidden absolute left-[45px] top-8 bottom-8 h-[calc(100%-4rem)] w-5"
          : "hidden md:block absolute left-[16%] right-[16%] top-[60px] h-5 w-[68%]"
      }
    >
      <path
        d={d}
        fill="none"
        stroke="#2DA96B"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeDasharray="7 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// `stickers` (optional): one per beat, stuck on its photo circle.
export function TheWalk({ stickers }: { stickers?: ReactNode[] } = {}) {
  return (
    <section id="the-walk" className="py-14 md:py-20 bg-white border-t border-brand-accent/10">
      <div className="brand-container max-w-5xl">
        <Heading eyebrow="How it works" a="Meet. Walk." b="Tip." center />
        <ol className="relative mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          <Route />
          <Route vertical />
          {beats.map((b, bi) => (
            <li key={b.n} className="relative flex md:flex-col items-center gap-5 md:gap-4 md:text-center">
              <div className="relative shrink-0">
                <div className="relative h-[110px] w-[110px] md:h-[140px] md:w-[140px] overflow-hidden rounded-full border-4 border-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] bg-brand-accent-light">
                  <Image src={b.img} alt={b.alt} fill sizes="140px" className="object-cover" />
                </div>
                <span
                  className="absolute -top-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-white text-[20px] font-bold shadow"
                  style={caveat}
                >
                  {b.n}
                </span>
                {stickers?.[bi]}
              </div>
              <div>
                <h3 className="text-[38px] font-bold leading-none text-brand-text" style={caveat}>
                  {b.title}
                </h3>
                <p className="mt-1.5 text-base text-muted-foreground leading-relaxed max-w-[260px] md:mx-auto" style={lora}>
                  {b.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Your guides: the Our Guides cards, reviews behind a toggle ───────── */

// `intro` (optional): a line under the heading (brand homepage).
export function YourGuides({ intro }: { intro?: ReactNode } = {}) {
  return (
    <section id="guides" className="py-14 md:py-20 bg-brand-accent-light/50 border-t border-brand-accent/10">
      <div className="brand-container max-w-6xl">
        <Heading a="Locals who" b="love this city." center />
        {intro && (
          <p className="mt-4 text-center text-[17px] md:text-lg leading-relaxed text-brand-text/75 max-w-xl mx-auto" style={lora}>
            {intro}
          </p>
        )}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
          {guides.map((g) => (
            <div key={g.name} className="flex flex-col items-center">
              <div
                className="p-3 pb-12 shadow-xl border border-brand-text/5 relative w-full max-w-[300px]"
                style={{ backgroundColor: "#F5EBDA", transform: `rotate(${g.rotate})` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 w-24 h-6 rounded-[3px]"
                  style={{
                    transform: "translateX(-50%) rotate(-2deg)",
                    backgroundColor: g.accent.ac,
                    borderTop: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                  }}
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: g.tint }}>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center font-caveat font-bold text-white/90 select-none"
                    style={{ fontSize: "clamp(3rem,12vw,4.5rem)" }}
                  >
                    {g.initial}
                  </span>
                  <Image
                    src={g.img}
                    alt={`${g.name}, guide with Norwich Free Walking Tours`}
                    fill
                    sizes="(max-width: 640px) 90vw, 300px"
                    className="object-cover"
                    style={{ objectPosition: g.focal }}
                  />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center font-caveat font-bold text-brand-text text-3xl leading-none">
                  {g.name}
                </p>
              </div>
              <p className="font-lora text-brand-text/80 leading-relaxed mt-6 max-w-[300px]">{g.blurb}</p>
              <GuideExpand name={g.name} count={g.reviews.length} accent={g.accent}>
                <GuideReviews reviews={g.reviews} accent={g.accent} />
              </GuideExpand>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center" style={lora}>
          <a
            href="/our-guides"
            className="font-semibold text-brand-accent underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent"
          >
            Meet our guides →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── FAQs: eight, aimed at visitors ───────────────────────────────────── */

export const homeFaqs = [
  {
    q: "What's the best walking tour in Norwich?",
    a: "We're biased, but it's the one led by locals who live here. In two hours you see Elm Hill, Norwich Cathedral, the Lanes, Norwich Market and Norwich Castle, with the stories behind them. If it wasn't worth £10 to £20, you don't pay £10 to £20.",
  },
  {
    q: "How does a free walking tour work, and how much should I tip?",
    a: "Book free, walk two hours with a local guide, and at the end you pay what you think it was worth. Most guests tip £10 to £20 a person. If it wasn't worth it, you don't pay. Card, Apple Pay, Google Pay and cash all work.",
  },
  {
    q: "Where do we meet, and how long is it?",
    a: "Outside The Forum on Millennium Plain, in the city centre. Look for the guide in the green t-shirt. The walk takes two hours, about 2.5 km at a relaxed pace, and finishes at Norwich Market, handy for lunch.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Yes, it's free to reserve. Groups are capped at 15 so the guide can talk to everyone, and booking means we can message you if anything changes. You can cancel any time from your booking email.",
  },
  {
    q: "What if it rains?",
    a: "We still go. The Lanes and the Cathedral Close have cover, and half the pubs on the route have been sheltering people since the 1400s. Bring a coat. If the weather turns properly dangerous, we'll message you before the tour.",
  },
  {
    q: "Is it OK for kids, pushchairs and wheelchairs?",
    a: "Yes. It's mostly flat and paved, and we've had 6-year-olds and 86-year-olds on the same walk. A couple of stops are cobbled (Elm Hill), so we can go around the trickiest bits. Tell your guide on arrival and we'll shape the walk around you.",
  },
  {
    q: "Can I bring my dog?",
    a: "Yes, well-behaved dogs on a lead are welcome. Just flag it when you arrive so the guide knows.",
  },
  {
    q: "Is Norwich worth visiting for a day?",
    a: "Absolutely. One day gets you Norwich Cathedral, Norwich Castle, the Lanes and Elm Hill, all within 15 minutes' walk of each other. Start with the tour, finish at Norwich Market for lunch, and you'll know exactly where to spend the afternoon.",
  },
];
