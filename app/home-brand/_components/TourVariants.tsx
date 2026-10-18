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
import type { CSSProperties } from "react";
import { StoryLantern } from "@/app/tours/_components/Spooky";
import { trackEvent } from "@/lib/tracking";
import { LetterGirl } from "./LetterGirl";
import { CanarySticker, CupSticker, SpireSticker, StickerLabel } from "./Doodles";
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
function Polaroid({ c, i, eater, small }: { c: TourCardData; i: number; eater: CSSProperties; small?: boolean }) {
  const dark = c.key === "dark";
  const soon = c.key === "soon";
  const free = c.key === "free";
  const caption: CSSProperties = dark
    ? { ...eater, color: GLOW, fontSize: small ? 15 : 21, lineHeight: 1.05, textShadow: "0 0 12px rgba(90,225,158,0.45)" }
    : { ...caveat, fontWeight: 700, fontSize: small ? 20 : 30, lineHeight: 0.95, color: soon ? "#1A1A1A" : free ? "#1A6B47" : GREEN };
  const showTape = !free;
  return (
    <figure
      className={`relative z-10 m-0 ${small ? "p-1.5 pb-2" : "p-2.5 pb-4"} border shadow-[2px_12px_26px_-12px_rgba(60,40,20,0.6)] transition-[transform,box-shadow] duration-500 ease-out [transform:rotate(var(--r))] ${hoverFor(c.key)}`}
      style={{ ["--r" as string]: `${i % 2 === 0 ? -2 : 2}deg`, backgroundColor: dark ? "#1B1A18" : free ? "#F5EBDA" : "#FFFFFF", borderColor: dark ? "#2A2724" : free ? "#E6D7BF" : "#EAE0D4" } as CSSProperties}
    >
      {dark && !small && (
        <span className="absolute -top-12 right-3 z-20 scale-75 origin-top">
          <StoryLantern />
        </span>
      )}
      {free && <AwningTouch small={small} />}
      {free && !small && <Doodles />}
      {showTape && (
        <span
          aria-hidden="true"
          className={`absolute ${small ? "-top-[7px] w-10 h-4" : "-top-[11px] w-20 h-6"} left-1/2 rounded-[2px] z-10`}
          style={{ transform: "translateX(-50%) rotate(-3deg)", backgroundColor: dark ? "#3A3530" : tapes[i % tapes.length], boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
        />
      )}
      <div className="relative aspect-square overflow-hidden bg-brand-accent-light">
        {c.image && (
          <Image
            src={c.image.src}
            alt={c.image.alt}
            fill
            sizes={small ? "120px" : "(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 260px"}
            className={`object-cover transition-[filter] duration-700 ${dark ? "group-hover:brightness-75" : ""} ${soon ? "[filter:grayscale(1)_blur(4px)] group-hover:[filter:grayscale(1)_blur(1.5px)] scale-[1.08]" : ""}`}
            style={dark ? sepia : undefined}
            priority={i === 0 && !small}
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
        <figcaption className="relative pt-3 px-1 min-h-[60px]">
          <span className="block" style={caption}>
            {c.name}
          </span>
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
