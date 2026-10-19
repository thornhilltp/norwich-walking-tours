"use client";

// Tours and experiences (Tom 2026-10-18: less text, an obvious ask). The
// walking route runs BEHIND the polaroids, properly wobbly; one tap target
// per tour; each tour's hover in its own mood. Dark History's polaroid has
// the pop-up-book pieces from Holly's reel (Cathedral, Castle, grey girl).
// The free tour gets its own touch, built from its promise ("our favourite
// Norwich history, stories and local tips", Tom 2026-10-18): Norwich
// Market's striped awning over a polaroid in the guides' cream (#F5EBDA), and three scrapbook
// stickers (Doodles.tsx): Cathedral spire (history), canary (stories),
// coffee cup (local tips).
// Each card shows the next bookable walk, read live from the booking app.
//   Desktop: polaroid + one line + button.  Phones: a list with arrows.

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { StoryLantern } from "@/app/tours/_components/Spooky";
import { trackEvent } from "@/lib/tracking";
import { LetterGirl } from "./LetterGirl";
import { CanarySticker, CupSticker, SpireSticker, StickerLabel } from "@/components/Doodles";
import type { TourCardData } from "./BrandBooking";
import s from "./tourCards.module.css";


const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const NIGHT = "#121211";
const GLOW = "#5AE19E";
const GREEN = "#2DA96B";
const sepia: CSSProperties = { filter: "sepia(0.55) contrast(1.15) brightness(0.85) saturate(0.8)" };
const tapes = ["#F4C26B", "#9FD6B8", "#F2A7A0", "#C9B8E8"];

/* ── Shared pieces ─────────────────────────────────────────────────────── */

/** A very wobbly dashed route, drawn behind the polaroids. */
function Route({ vertical, className }: { vertical?: boolean; className: string }) {
  const d = vertical
    ? "M50 0 C 10 5, 90 12, 50 20 S 5 33, 50 40 S 95 53, 50 60 S 5 73, 50 80 S 95 93, 50 100"
    : "M0 50 C 5 8, 12 92, 20 50 S 33 6, 40 50 S 53 94, 60 50 S 73 6, 80 50 S 93 94, 100 50";
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className={`pointer-events-none absolute z-0 ${className}`}>
      <path d={d} fill="none" stroke={GREEN} strokeOpacity="0.5" strokeWidth="3.5" strokeDasharray="8 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Dark History's pop-up pieces. Hover devices: folded flat until hover;
    phones: standing all the time. */
function PopUp() {
  const piece = "absolute bottom-0 origin-bottom transition-transform duration-700 ease-out [@media(hover:hover)]:[transform:perspective(500px)_rotateX(88deg)] [@media(hover:hover)]:group-hover:[transform:perspective(500px)_rotateX(0deg)]";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dark-history/cutout-cathedral.svg" alt="" className={`${piece} left-[2%] h-[78%] w-auto`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dark-history/cutout-castle.svg" alt="" className={`${piece} left-[30%] h-[34%] w-auto`} style={{ transitionDelay: "120ms" }} />
      <span className="absolute -bottom-2 right-1 h-[62%] transition-all duration-700 ease-out [@media(hover:hover)]:translate-x-[40%] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100" style={{ transitionDelay: "240ms" }}>
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

/** History, stories, local tips: scrapbook stickers stuck on the free
    tour's polaroid (Tom 2026-10-18), kept inside its edges so they don't
    clash with the cards either side. Pop on hover; always out on touch. */
function Doodles() {
  const sticker = `${s.doodle} absolute z-20 flex flex-col items-center gap-0.5`;
  return (
    <>
      <span className={`${sticker} -left-3 top-12`} style={{ ["--d" as string]: "0ms", ["--r" as string]: "-8deg" } as CSSProperties}>
        <SpireSticker className="h-14 w-8" />
        <StickerLabel className="-rotate-6">history</StickerLabel>
      </span>
      <span className={`${sticker} -right-4 top-[38%]`} style={{ ["--d" as string]: "120ms", ["--r" as string]: "7deg" } as CSSProperties}>
        <CanarySticker className="h-11 w-[52px]" />
        <StickerLabel className="rotate-3">stories</StickerLabel>
      </span>
      <span className={`${sticker} left-[8%] bottom-[96px]`} style={{ ["--d" as string]: "240ms", ["--r" as string]: "-4deg" } as CSSProperties}>
        <CupSticker className="h-10 w-10" />
        <StickerLabel className="-rotate-2">local tips</StickerLabel>
      </span>
    </>
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
}: {
  c: TourCardData;
  i: number;
  eater: CSSProperties;
  small?: boolean;
  mid?: boolean;
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
      {free && !small && !mid && <Doodles />}
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
            priority={(free || i === 0) && !small}
          />
        )}
        {dark && (
          <>
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(10,6,2,0.75) 100%)" }} />
            {!small && <PopUp />}
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

function actionOf(c: TourCardData) {
  if (c.key === "free" || c.key === "dark") return "See dates & book";
  if (c.key === "private") return "Ask about a date";
  return "Tell me first";
}

/** One button per card, in the tour's own style (Dark History: black,
    glowing Eater lettering, as on its own page). */
function CardButton({ c, eater }: { c: TourCardData; eater: CSSProperties }) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 min-h-[46px] transition-all group-hover:gap-3";
  if (c.key === "dark")
    return (
      <span className={`${base} border border-[#5AE19E]/60 shadow-[0_0_14px_rgba(90,225,158,0.3)]`} style={{ ...eater, backgroundColor: NIGHT, color: GLOW, fontSize: 15 }}>
        {actionOf(c)} <span aria-hidden>→</span>
      </span>
    );
  if (c.key === "free")
    return (
      <span className={`${base} bg-brand-accent text-white shadow-md`} style={{ ...caveat, fontSize: 22, fontWeight: 700 }}>
        {actionOf(c)} <span aria-hidden>→</span>
      </span>
    );
  return (
    <span className={`${base} border-2 border-brand-text/70 text-brand-text`} style={{ ...lora, fontSize: 15, fontWeight: 600 }}>
      {actionOf(c)} <span aria-hidden>→</span>
    </span>
  );
}

/** Live "next walk" line from the booking app. */
function NextLine({ c }: { c: TourCardData }) {
  if (!c.next) return null;
  const dark = c.key === "dark";
  const few = c.next.spotsLeft <= 6;
  return (
    <p className="mt-1.5 flex items-center gap-2 text-[14px] font-semibold text-brand-text/80" style={lora}>
      <span aria-hidden className={`${s.dot} inline-block h-2 w-2 rounded-full`} style={{ backgroundColor: dark ? "#3FB97E" : GREEN }} />
      Next: {c.next.label}
      {few && <span className="text-[#B4532A]">· {c.next.spotsLeft === 1 ? "1 spot" : `${c.next.spotsLeft} spots`} left</span>}
    </p>
  );
}

/* ── Desktop: polaroid + one line + button ────────────────────────────── */

function Row({ cards, eater }: { cards: TourCardData[]; eater: CSSProperties }) {
  return (
    <div className="relative -mx-4 lg:mx-0">
      <ol className="relative flex lg:grid lg:grid-cols-4 gap-6 lg:gap-12 overflow-x-auto lg:overflow-visible snap-x snap-mandatory px-6 lg:px-0 pt-16 pb-6 list-none m-0 [scrollbar-width:none]" style={{ ["--n" as string]: cards.length } as CSSProperties}>
        <Route className="left-0 top-[18%] h-40 w-[calc(var(--n)*82%)] sm:w-[calc(var(--n)*48%)] lg:w-full" />
        {cards.map((c, i) => (
          <li key={c.key} className={`relative shrink-0 w-[78%] sm:w-[46%] lg:w-auto snap-center ${c.key === "free" ? "z-20" : ""}`}>
            <a href={hrefOf(c)} onClick={() => trackEvent("tour_card_click", { tour: c.key })} className="group flex h-full flex-col">
              <Polaroid c={c} i={i} eater={eater} />
              <div className="relative z-10 flex flex-1 flex-col pt-4 px-1">
                <p className="text-[16px] leading-snug text-brand-text/85" style={lora}>
                  {c.sub}
                </p>
                <NextLine c={c} />
                <p className="mt-auto pt-3">
                  <CardButton c={c} eater={eater} />
                </p>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Phones: a list, everything visible at once ───────────────────────── */

function List({ cards, eater }: { cards: TourCardData[]; eater: CSSProperties }) {
  return (
    <ol className="relative mx-auto max-w-3xl list-none p-0 m-0 flex flex-col gap-5">
      <Route vertical className="left-[22px] sm:left-[34px] top-6 bottom-6 h-[calc(100%-3rem)] w-20" />
      {cards.map((c, i) => {
        const dark = c.key === "dark";
        return (
          <li key={c.key} className="relative">
            <a
              href={hrefOf(c)}
              onClick={() => trackEvent("tour_card_click", { tour: c.key })}
              className={`group relative z-10 flex items-center gap-4 sm:gap-6 rounded-sm px-2 py-3 transition-colors ${dark ? "hover:bg-[#121211]/[0.04]" : "hover:bg-brand-accent-light/40"}`}
            >
              <div className="w-[104px] sm:w-[132px] shrink-0">
                <Polaroid c={c} i={i} eater={eater} small />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="leading-[1.0]"
                  style={dark ? { ...eater, color: NIGHT, fontSize: 21 } : { ...caveat, fontWeight: 700, fontSize: 30, color: c.key === "soon" ? "#1A1A1A" : GREEN }}
                >
                  {c.name}
                </p>
                <p className="mt-1 text-[15px] leading-snug text-brand-text/75" style={lora}>
                  {c.sub}
                </p>
                <NextLine c={c} />
              </div>
              <span
                aria-hidden
                className={`shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full text-[22px] transition-transform group-hover:translate-x-1 ${dark ? "bg-[#121211] text-[#5AE19E] shadow-[0_0_12px_rgba(90,225,158,0.35)]" : "bg-brand-accent text-white"}`}
              >
                →
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Header: the three walks as polaroids (prototype, /home-hero d and e) ── */

// Tom 2026-10-19: the polaroids move up into the header's empty right-hand
// side and replace the "Pick your walk" section. Photo = the tour's page;
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
      <span className={`block ${tiny ? "mt-1 text-[12px]" : "mt-1.5 text-[13px]"} leading-snug ${muted}`} style={lora}>
        {c.key === "private" ? "Any day you choose" : c.key === "dark" ? "Most evenings, 6pm" : "Most days, 10:30am"}
      </span>
    );
  const dot = onDark ? GLOW : GREEN;
  const few = c.next.spotsLeft <= 6;
  return (
    <span className={`block ${tiny ? "mt-1" : "mt-2"}`} style={lora}>
      <span className={`flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] ${tiny ? "text-[9.5px]" : "text-[10.5px]"}`} style={{ color: dot }}>
        <span aria-hidden className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 motion-reduce:animate-none" style={{ backgroundColor: dot }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: dot }} />
        </span>
        Next walk
      </span>
      <span className={`mt-0.5 block font-bold leading-snug ${tiny ? "text-[12.5px]" : "text-[15px]"} ${onDark ? "text-white" : "text-brand-text"}`}>
        {c.next.label}
      </span>
      {few && (
        <span className={`block font-semibold leading-snug ${tiny ? "text-[11.5px]" : "text-[13px]"} ${onDark ? "text-[#F4B860]" : "text-[#B4532A]"}`}>
          {c.next.spotsLeft === 1 ? "1 spot left" : `${c.next.spotsLeft} spots left`}
        </span>
      )}
    </span>
  );
}

// Desktop pile (Tom 2026-10-19: spread out and busy). Bigger polaroids,
// overlapping like prints dropped on a table; no route line on the photos;
// the name, next walk and the ask all sit in the frame's bottom strip.
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

export function HeroPolaroids({ cards, eaterFamily, onPhoto }: { cards: TourCardData[]; eaterFamily: string; onPhoto: boolean }) {
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  return (
    <div id="tours" className="scroll-mt-20">
      {/* Phones and tablets */}
      <ol className="lg:hidden m-0 grid list-none grid-cols-3 gap-3 p-0 pt-2">
        {cards.map((c, i) => (
          <li key={c.key} className={c.key === "free" ? "relative z-20" : "relative"}>
            <a href={hrefOf(c)} onClick={() => trackEvent("tour_card_click", { tour: c.key, location: "hero" })} className="group block">
              <Polaroid c={c} i={i} eater={eater} small hero={onPhoto} />
              <p className="mt-2.5" style={heroName(c, eater, onPhoto, 21)}>
                {SHORT_NAME[c.key]}
              </p>
              <HeroNext c={c} onDark={onPhoto} tiny />
            </a>
          </li>
        ))}
      </ol>
      {/* Desktop: a loose pile of prints */}
      <ol className="relative hidden lg:block m-0 list-none p-0 h-[470px] w-[676px]">
        {cards.map((c, i) => {
          const p = PILE[i % PILE.length];
          return (
            <li
              key={c.key}
              className="absolute w-[236px] z-[var(--z)] hover:z-40"
              style={{ left: p.left, top: p.top, ["--z" as string]: c.key === "free" ? 30 : 20 - i, transform: `rotate(${p.rot}deg)` } as CSSProperties}
            >
              <a href={hrefOf(c)} onClick={() => trackEvent("tour_card_click", { tour: c.key, location: "hero" })} className="group block">
                <Polaroid c={c} i={i} eater={eater} mid hero={onPhoto} extra={<FrameLines c={c} onDark={c.key === "dark"} />} />
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// Tom 2026-10-18: phones get the list (all four at a glance, each row
// obviously tappable); desktop gets the polaroids along the route.
export function TourCards({ cards, eaterFamily }: { cards: TourCardData[]; eaterFamily: string }) {
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  return (
    <>
      <div className="lg:hidden">
        <List cards={cards} eater={eater} />
      </div>
      <div className="hidden lg:block">
        <Row cards={cards} eater={eater} />
      </div>
    </>
  );
}
