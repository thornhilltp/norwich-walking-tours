// The free tour's scrapbook stickers (Tom 2026-10-18): hand-drawn doodles
// with a white die-cut edge, one per part of its promise.
//   history     the Cathedral spire
//   stories     a canary: Norwich's Flemish "Strangers" bred canaries, which
//               is why Norwich City are the Canaries
//   local tips  a coffee cup
// Shared so the free tour's own page can use them as its section marks.

import type { CSSProperties, ReactNode } from "react";

const GREEN = "#2DA96B";
const INK = "#1A6B47";
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };

/** Draws the art twice: a fat white outline first (the sticker's die-cut
    edge), then the ink on top. */
function Sticker({ viewBox, className, children }: { viewBox: string; className: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} className={`overflow-visible drop-shadow-[0_3px_4px_rgba(60,40,20,0.35)] ${className}`} aria-hidden>
      <g stroke="#FFFFFF" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="#FFFFFF">
        {children}
      </g>
      <g strokeLinejoin="round" strokeLinecap="round">{children}</g>
    </svg>
  );
}

export function SpireSticker({ className = "h-16 w-9" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 40 70" className={className}>
      <path d="M20 3 L27 40 L13 40 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <path d="M10 40 H30 V66 H10 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <path d="M17 66 V55 Q20 50 23 55 V66" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <path d="M14 47 H17 M23 47 H26" fill="none" stroke={GREEN} strokeWidth="2" />
    </Sticker>
  );
}

export function CanarySticker({ className = "h-12 w-14" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 64 52" className={className}>
      {/* tail */}
      <path d="M8 30 L2 40 L14 36 Z" fill="#F4C842" stroke={INK} strokeWidth="2.2" />
      {/* body + head */}
      <path d="M10 30 Q12 16 30 16 Q34 6 44 7 Q54 8 54 18 Q54 26 46 30 Q44 44 28 44 Q12 44 10 30 Z" fill="#F7D046" stroke={INK} strokeWidth="2.4" />
      {/* wing */}
      <path d="M20 28 Q30 22 38 30 Q30 36 20 28 Z" fill="#E9B92C" stroke={INK} strokeWidth="2" />
      {/* beak + eye */}
      <path d="M54 15 L62 18 L54 21 Z" fill="#F08A3C" stroke={INK} strokeWidth="2" />
      <circle cx="46" cy="15" r="2.2" fill={INK} stroke="none" />
      {/* legs */}
      <path d="M26 44 V50 M34 44 V50" fill="none" stroke={INK} strokeWidth="2" />
    </Sticker>
  );
}

export function CupSticker({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 56 56" className={className}>
      <path d="M8 20 H40 V40 Q40 50 30 50 H18 Q8 50 8 40 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <path d="M40 25 Q50 25 50 32 Q50 39 40 39" fill="none" stroke={GREEN} strokeWidth="2.5" />
      <path d="M18 14 Q15 9 18 5 M26 14 Q23 9 26 5 M34 14 Q31 9 34 5" fill="none" stroke={GREEN} strokeWidth="2" />
    </Sticker>
  );
}

/** A handwritten scrapbook label on a scrap of paper. */
export function StickerLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-md bg-[#FFFDF7] px-2 py-0.5 text-[17px] font-bold leading-none text-[#1A6B47] shadow-[0_2px_4px_rgba(60,40,20,0.25)] ${className}`}
      style={caveat}
    >
      {children}
    </span>
  );
}
