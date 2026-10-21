"use client";

// The tours as taped polaroids in the homepage header (Tom 2026-10-19).
// Each in its own look: Dark History night-black with a neon glow, the
// pop-up-book pieces from Holly's reel (Cathedral, Castle, grey girl) and a
// lantern; the free tour in the guides' cream (#F5EBDA) under Norwich
// Market's striped awning; Private with a "Reserved" luggage tag.
// Each shows the next bookable walk, read live from the booking app.
//   Desktop: a loose pile of prints.  Phones: a row of three with buttons.

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { StoryLantern } from "@/app/tours/_components/Spooky";
import { trackEvent } from "@/lib/tracking";
import { LetterGirl } from "./LetterGirl";
import { openBooking, type TourCardData } from "./BrandBooking";
import s from "./tourCards.module.css";

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const NIGHT = "#121211";
const GLOW = "#5AE19E";
const GREEN = "#2DA96B";
const sepia: CSSProperties = { filter: "sepia(0.55) contrast(1.15) brightness(0.85) saturate(0.8)" };
const tapes = ["#F4C26B", "#9FD6B8", "#F2A7A0", "#C9B8E8"];

/* ── Shared pieces ─────────────────────────────────────────────────────── */

/** Dark History's pop-up pieces. Hover devices: folded flat until hover;
    phones: standing all the time, unless `hoverOnly` (Pick your walk, Tom
    2026-10-21: on phones they covered the photo), then they stay folded. */
function PopUp({ hoverOnly = false }: { hoverOnly?: boolean }) {
  const folded = hoverOnly
    ? "[transform:perspective(500px)_rotateX(88deg)] [@media(hover:hover)]:group-hover:[transform:perspective(500px)_rotateX(0deg)]"
    : "[@media(hover:hover)]:[transform:perspective(500px)_rotateX(88deg)] [@media(hover:hover)]:group-hover:[transform:perspective(500px)_rotateX(0deg)]";
  const hidden = hoverOnly
    ? "translate-x-[40%] opacity-0 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100"
    : "[@media(hover:hover)]:translate-x-[40%] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100";
  const piece = `absolute bottom-0 origin-bottom transition-transform duration-700 ease-out ${folded}`;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dark-history/cutout-cathedral.svg" alt="" loading="lazy" className={`${piece} left-[2%] h-[78%] w-auto`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dark-history/cutout-castle.svg" alt="" loading="lazy" className={`${piece} left-[30%] h-[34%] w-auto`} style={{ transitionDelay: "120ms" }} />
      <span className={`absolute -bottom-2 right-1 h-[62%] transition-all duration-700 ease-out ${hidden}`} style={{ transitionDelay: "240ms" }}>
        <LetterGirl className="h-full w-auto" />
      </span>
    </>
  );
}

/* Free tour touches. */

function AwningTouch({ small }: { small?: boolean }) {
  // Market-roof stripes: green, white, yellow, as on Norwich Market.
  const stripes = ["#2DA96B", "#FFFFFF", "#F4C26B", "#FFFFFF"];
  const n = 12;
  return (
    <svg aria-hidden viewBox="0 0 120 22" className={`${s.awning} absolute -top-1 left-0 right-0 z-20 w-full ${small ? "h-4" : "h-8"} drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]`}>
      {Array.from({ length: n }).map((_, k) => {
        const w = 120 / n;
        const x = k * w;
        return <path key={k} d={`M${x} 0 H${x + w} V14 A${w / 2} ${w / 2} 0 0 1 ${x} 14 Z`} fill={stripes[k % stripes.length]} />;
      })}
    </svg>
  );
}

function hoverFor(key: TourCardData["key"]) {
  if (key === "dark") return "group-hover:shadow-[0_0_40px_rgba(90,225,158,0.45)]";
  if (key === "soon") return "group-hover:[transform:rotate(0deg)]";
  if (key === "private") return "group-hover:[transform:rotate(0deg)_translateY(-6px)]";
  return "group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.05)] group-hover:shadow-[4px_22px_36px_-14px_rgba(60,40,20,0.7)]";
}

/** The polaroid itself: same shape for every tour, each in its own light. */
/** Private tours' touch (Tom 2026-10-19: the plain polaroid was boring): a
    brown-paper luggage tag on a string, "Reserved for your group". */
function ReservedTag({ small }: { small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute z-30 origin-top-left transition-transform duration-500 ease-out group-hover:rotate-[4deg] ${small ? "-right-3 top-[30%] w-[58px]" : "-right-10 top-[26%] w-[104px]"}`}
      style={{ transform: "rotate(14deg)" }}
    >
      <svg viewBox="0 0 104 54" className="block w-full drop-shadow-[0_3px_4px_rgba(0,0,0,0.35)]">
        <path d="M14 2 H100 a2 2 0 0 1 2 2 V50 a2 2 0 0 1 -2 2 H14 L2 40 V14 Z" fill="#C9A06A" />
        <path d="M14 2 H100 a2 2 0 0 1 2 2 V50 a2 2 0 0 1 -2 2 H14 L2 40 V14 Z" fill="none" stroke="#A97E46" strokeWidth="1.2" strokeDasharray="3 3" transform="translate(3 3) scale(0.94)" />
        <circle cx="14" cy="27" r="4.5" fill="#FCFAF8" stroke="#8C6634" strokeWidth="1.5" />
        <path d="M14 27 C 6 22, -2 18, -10 8" fill="none" stroke="#5B4630" strokeWidth="1.2" />
        <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-caveat), cursive" fontWeight="700" fontSize="17" fill="#3B2A16">
          Reserved
        </text>
        <text x="60" y="42" textAnchor="middle" fontFamily="var(--font-caveat), cursive" fontWeight="700" fontSize="13" fill="#3B2A16">
          {small ? "" : "for your group"}
        </text>
      </svg>
    </span>
  );
}

function Polaroid({
  c,
  i,
  eater,
  small,
  mid,
  hero,
  extra,
  quietPopUp,
  eager = true,
}: {
  c: TourCardData;
  i: number;
  eater: CSSProperties;
  small?: boolean;
  mid?: boolean;
  /** Dark History's pop-ups only on hover (folded on phones). */
  quietPopUp?: boolean;
  /** Preload the photo (header use). Off below the fold, so the film's
      still frame loads first. */
  eager?: boolean;
  /** In the header, on photos: Dark History glows, Private gets its tag. */
  hero?: boolean;
  /** More lines under the name, inside the frame. */
  extra?: ReactNode;
}) {
  const dark = c.key === "dark";
  const soon = c.key === "soon";
  const free = c.key === "free";
  const caption: CSSProperties = dark
    ? { ...eater, color: GLOW, fontSize: small ? 15 : mid ? 16 : 21, lineHeight: 1.05, textShadow: "0 0 12px rgba(90,225,158,0.45)" }
    : { ...caveat, fontWeight: 700, fontSize: small ? 20 : mid ? 24 : 30, lineHeight: 0.95, color: soon ? "#1A1A1A" : free ? "#1A6B47" : GREEN };
  const showTape = !free;
  return (
    <figure
      className={`relative z-10 m-0 ${small ? "p-1.5 pb-2" : mid ? "p-2 pb-2" : "p-2.5 pb-4"} border shadow-[2px_12px_26px_-12px_rgba(60,40,20,0.6)] transition-[transform,box-shadow] duration-500 ease-out [transform:rotate(var(--r))] ${hoverFor(c.key)}`}
      style={{
        // Header: the free tour sits straight (Tom 2026-10-19).
        ["--r" as string]: hero && free ? "0deg" : `${i % 2 === 0 ? -2 : 2}deg`,
        backgroundColor: dark ? "#1B1A18" : free ? "#F5EBDA" : "#FFFFFF",
        borderColor: dark ? (hero ? "rgba(90,225,158,0.55)" : "#2A2724") : free ? "#E6D7BF" : "#EAE0D4",
        // Lantern light round Dark History, so it lifts off a dark photo.
        ...(hero && dark ? { boxShadow: "0 0 0 1px rgba(90,225,158,0.25), 0 0 34px 4px rgba(90,225,158,0.38), 2px 14px 28px -12px rgba(0,0,0,0.8)" } : {}),
      } as CSSProperties}
    >
      {hero && c.key === "private" && <ReservedTag small={small} />}
      {dark && !small && (
        <span className={`absolute z-20 origin-top ${mid ? "-top-9 right-2 scale-[0.6]" : "-top-12 right-3 scale-75"}`}>
          <StoryLantern />
        </span>
      )}
      {free && <AwningTouch small={small} />}
      {showTape && (
        <span
          aria-hidden="true"
          className={`absolute ${small ? "-top-[7px] w-10 h-4" : "-top-[11px] w-20 h-6"} left-1/2 rounded-[2px] z-10`}
          style={{
            transform: "translateX(-50%) rotate(-3deg)",
            // Header: Dark History's tape in its neon green (Tom 2026-10-19).
            backgroundColor: dark ? (hero ? GLOW : "#3A3530") : tapes[i % tapes.length],
            boxShadow: hero && dark ? "0 0 14px rgba(90,225,158,0.7)" : "0 1px 3px rgba(0,0,0,0.18)",
          }}
        />
      )}
      <div className="relative aspect-square overflow-hidden bg-brand-accent-light">
        {c.image && (
          <Image
            src={c.image.src}
            alt={c.image.alt}
            fill
            sizes={small ? "120px" : mid ? "210px" : "(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 260px"}
            className={`object-cover transition-[filter] duration-700 ${dark ? "group-hover:brightness-75" : ""} ${soon ? "[filter:grayscale(1)_blur(4px)] group-hover:[filter:grayscale(1)_blur(1.5px)] scale-[1.08]" : ""}`}
            style={dark ? sepia : undefined}
            priority={eager && (free || i === 0) && !small}
          />
        )}
        {dark && (
          <>
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(10,6,2,0.75) 100%)" }} />
            {!small && <PopUp hoverOnly={quietPopUp} />}
          </>
        )}
        {soon && (
          <span className={`absolute inset-0 flex items-center justify-center ${small ? "text-[56px]" : "text-[110px]"} leading-none text-white/90 transition-transform duration-500 group-hover:scale-75 group-hover:rotate-12`} style={caveat} aria-hidden>
            ?
          </span>
        )}
      </div>
      {!small && (
        <figcaption className={`relative px-1 ${mid ? "pt-2" : "pt-3 min-h-[60px]"}`}>
          <span className="block" style={caption}>
            {c.name}
          </span>
          {extra}
        </figcaption>
      )}
    </figure>
  );
}

function hrefOf(c: TourCardData) {
  return c.details ?? c.href;
}

/* ── Header: the three walks as polaroids ────────────────────────────── */

// Tom 2026-10-19: the polaroids sit in the header's right-hand side and
// replace the old "Pick your walk" section. Photo = the tour's page;
// the button under it opens booking on that tour. Phones: three small
// polaroids in a row under the headline.
const SHORT_NAME: Record<TourCardData["key"], string> = {
  free: "Free walking tour",
  dark: "Dark History",
  private: "Private tours",
  soon: "Something new",
};

function heroName(c: TourCardData, eater: CSSProperties, onPhoto: boolean, size: number): CSSProperties {
  if (c.key === "dark") return { ...eater, color: onPhoto ? GLOW : NIGHT, fontSize: size * 0.72, lineHeight: 1.05 };
  const color = c.key === "free" ? (onPhoto ? "#7BE0AC" : GREEN) : onPhoto ? "#FFFFFF" : "#1A1A1A";
  return { ...caveat, fontWeight: 700, fontSize: size, lineHeight: 0.95, color };
}

/** The next walk, read live from the booking app (Tom 2026-10-19: make it
    obvious it's live). A pulsing "Next walk" dot only when there is real
    data; without it, the plain schedule line and no dot. */
function HeroNext({ c, onDark, tiny }: { c: TourCardData; onDark: boolean; tiny?: boolean }) {
  const muted = onDark ? "text-white/75" : "text-brand-text/70";
  if (c.key === "private" || !c.next)
    return (
      <span className={`block ${tiny ? "mt-1 text-[13px]" : "mt-1.5 text-[13px]"} leading-snug ${muted}`} style={lora}>
        {c.key === "private" ? "Any day you choose" : c.key === "dark" ? "Most evenings, 6pm" : "Most days, 10:30am"}
      </span>
    );
  const dot = onDark ? GLOW : GREEN;
  const few = c.next.spotsLeft <= 6;
  const pulse = (
    <span aria-hidden className="relative inline-flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 motion-reduce:animate-none" style={{ backgroundColor: dot }} />
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: dot }} />
    </span>
  );
  // Phones (Tom 2026-10-21): no "Next walk" words, just the live dot beside
  // the date. Desktop keeps the label.
  if (tiny)
    return (
      <span className="mt-1 block" style={lora}>
        <span className={`block font-bold leading-snug text-[14px] ${onDark ? "text-white" : "text-brand-text"}`}>
          {/* Inline so the dot sits beside the first word when the date wraps. */}
          <span className="mr-1.5 inline-flex align-middle -mt-0.5">{pulse}</span>
          <span className="sr-only">Next walk: </span>
          {c.next.label}
        </span>
        {few && (
          <span className={`block font-semibold leading-snug text-[13px] ${onDark ? "text-[#F4B860]" : "text-[#B4532A]"}`}>
            {c.next.spotsLeft === 1 ? "1 spot left" : `${c.next.spotsLeft} spots left`}
          </span>
        )}
      </span>
    );
  return (
    <span className="mt-2 block" style={lora}>
      <span className="flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] text-[10.5px]" style={{ color: dot }}>
        {pulse}
        Next walk
      </span>
      <span className={`mt-0.5 block font-bold leading-snug text-[15px] ${onDark ? "text-white" : "text-brand-text"}`}>
        {c.next.label}
      </span>
      {few && (
        <span className={`block font-semibold leading-snug text-[13px] ${onDark ? "text-[#F4B860]" : "text-[#B4532A]"}`}>
          {c.next.spotsLeft === 1 ? "1 spot left" : `${c.next.spotsLeft} spots left`}
        </span>
      )}
    </span>
  );
}

// Desktop pile (Tom 2026-10-19: spread out and busy). Bigger polaroids,
// overlapping like prints dropped on a table; no route line on the photos;
// the name, next walk and the ask all sit in the frame's bottom strip.
/** Pick your walk (Tom 2026-10-21, "quite static"): the prints are dealt
    onto the table one by one as the section scrolls in, then drift gently,
    each on its own beat. Never hidden (no opacity), so they show without
    JavaScript. Reduced motion: no movement (MotionProvider). */
function DealtPrint({ i, children }: { i: number; children: ReactNode }) {
  const from = [
    { x: -60, y: 90, rotate: -14 },
    { x: 0, y: 120, rotate: 8 },
    { x: 60, y: 90, rotate: 14 },
  ][i % 3];
  return (
    <motion.div
      initial={{ scale: 0.92, ...from }}
      whileInView={{ scale: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.15 + i * 0.18 }}
    >
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, i % 2 ? 0.8 : -0.8, 0] }}
        transition={{ duration: 5 + i * 0.7, delay: 1.4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const PILE_W = 676;
const PILE_H = 470;
const PILE = [
  { left: 0, top: 46, rot: -4 },
  { left: 220, top: 0, rot: 0 },
  { left: 440, top: 58, rot: 3 },
];

function FrameLines({ c, onDark }: { c: TourCardData; onDark: boolean }) {
  const ask = c.key === "private" ? "Ask about a date" : "See dates & book";
  return (
    <>
      <HeroNext c={c} onDark={onDark} />
      <span
        className={`mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-all group-hover:gap-2.5 ${onDark ? "text-[#5AE19E]" : c.key === "free" ? "text-[#1A6B47]" : "text-brand-text"}`}
        style={lora}
      >
        {ask} <span aria-hidden>→</span>
      </span>
    </>
  );
}

/** Phones (Tom 2026-10-19): a button under each tour. Photo = the tour's
    page; button = booking pop-up on that tour (private: its page). */
// Phones (Tom 2026-10-21): a small link under each card, not a row of three
// chunky buttons. The card itself is tappable and the sticky bar carries the
// big "Book a tour" button once you scroll.
function PhoneCta({ c }: { c: TourCardData; eater: CSSProperties }) {
  const base =
    "mt-1.5 inline-flex min-h-[44px] items-center justify-center self-center px-1 text-[14px] font-semibold underline underline-offset-4 decoration-2 transition active:scale-95";
  if (c.key === "private")
    return (
      <a href={c.href} onClick={() => trackEvent("book_cta_click", { location: "hero_phone_private" })} className={`${base} text-white decoration-white/40`} style={lora}>
        Ask us &rarr;
      </a>
    );
  const dark = c.key === "dark";
  return (
    <a
      href={c.href}
      onClick={(e) => {
        e.preventDefault();
        trackEvent("book_cta_click", { location: `hero_phone_${c.key}` });
        openBooking(dark ? "dark" : "free", `hero_phone_${c.key}`);
      }}
      className={base}
      style={{ ...lora, color: dark ? GLOW : "#7BE0AC", textDecorationColor: dark ? "rgba(90,225,158,0.45)" : "rgba(123,224,172,0.45)" }}
    >
      Book free &rarr;
    </a>
  );
}

// `prints` (default: onPhoto): the header's print look (glow, straight free
// tour, luggage tag), kept when the cards sit on the light page colour.
// `full`: full prints everywhere (Tom 2026-10-21, "Pick your walk"): the pile
// on every screen, shrunk to fit on phones, no buttons.
export function HeroPolaroids({
  cards,
  eaterFamily,
  onPhoto,
  prints = onPhoto,
  full = false,
}: {
  cards: TourCardData[];
  eaterFamily: string;
  onPhoto: boolean;
  prints?: boolean;
  full?: boolean;
}) {
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  // Full mode: the desktop pile on every screen, shrunk to fit the width so
  // all three prints are always whole. The height is reserved in CSS from
  // the server HTML on (cqw of the section), so the page below never jumps
  // when the pile shrinks; only the transform waits for JavaScript.
  const fit = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useEffect(() => {
    const el = fit.current;
    if (!full || !el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / PILE_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [full]);
  return (
    <div id="tours" className="scroll-mt-20">
      {/* Phones and tablets (header use only; full mode is the pile everywhere) */}
      {!full && (
      <ol className="lg:hidden m-0 grid list-none grid-cols-3 gap-3 p-0 pt-2">
        {cards.map((c, i) => (
          <li key={c.key} className={`relative flex flex-col text-center ${c.key === "free" ? "z-20" : ""}`}>
            <a href={hrefOf(c)} onClick={() => trackEvent("tour_card_click", { tour: c.key, location: "hero" })} className="group block flex-1">
              <Polaroid c={c} i={i} eater={eater} small hero={prints} />
              <p className="mt-2.5" style={heroName(c, eater, onPhoto, 21)}>
                {SHORT_NAME[c.key]}
              </p>
              <HeroNext c={c} onDark={onPhoto} tiny />
            </a>
            <PhoneCta c={c} eater={eater} />
          </li>
        ))}
      </ol>
      )}
      {/* Desktop: a loose pile of prints */}
      <div
        ref={fit}
        className={full ? "w-full h-[min(470px,calc(100cqw*0.6953))]" : "contents"}
        style={full && scale !== null ? { height: PILE_H * scale } : undefined}
      >
      <ol
        className={`relative hidden ${full ? "!block left-1/2" : "lg:block"} m-0 list-none p-0 h-[470px] w-[676px]`}
        style={full ? { transform: `translateX(-50%) scale(${scale ?? 1})`, transformOrigin: "top center" } : undefined}
      >
        {cards.map((c, i) => {
          const p = PILE[i % PILE.length];
          return (
            <li
              key={c.key}
              className="absolute w-[236px] z-[var(--z)] hover:z-40"
              style={{ left: p.left, top: p.top, ["--z" as string]: c.key === "free" ? 30 : 20 - i, transform: `rotate(${p.rot}deg)` } as CSSProperties}
            >
{full ? (
                <DealtPrint i={i}>
                  {/* "See dates & book" means it (Tom 2026-10-21): free and Dark
                      History open booking on that tour; Private goes to its
                      page to ask. The pop-up links to the tour's page. */}
                  <a
                    href={c.key === "private" ? c.href : hrefOf(c)}
                    onClick={(e) => {
                      trackEvent("tour_card_click", { tour: c.key, location: "pick_your_walk" });
                      if (c.key === "free" || c.key === "dark") {
                        e.preventDefault();
                        openBooking(c.key, `pick_your_walk_${c.key}`);
                      }
                    }}
                    className="group block"
                  >
                    <Polaroid c={c} i={i} eater={eater} mid hero={prints} quietPopUp eager={false} extra={<FrameLines c={c} onDark={c.key === "dark"} />} />
                  </a>
                </DealtPrint>
              ) : (
                <a href={hrefOf(c)} onClick={() => trackEvent("tour_card_click", { tour: c.key, location: "hero" })} className="group block">
                  <Polaroid c={c} i={i} eater={eater} mid hero={prints} extra={<FrameLines c={c} onDark={c.key === "dark"} />} />
                </a>
              )}
            </li>
          );
        })}
      </ol>
      </div>
    </div>
  );
}
