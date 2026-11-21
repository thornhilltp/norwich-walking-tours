// A Very Norwich Christmas: scrapbook stickers in the free tour's style
// (white die-cut edge, components/Doodles.tsx), one per story on the walk
// (Tom 2026-11-05):
//   cracker   Caley's crackers, made where Chantry Place stands
//   bell      St Peter Mancroft's bells
//   mincepie  what was really in a mince pie
//   mug       mulled wine and wassail
//   jester    the Lord of Misrule, Elm Hill
//   crown     Henry I's royal Christmas at the Castle, 1121
//   mustard   pig's head for the poor, made bearable with mustard
//             (no Colman's name or logo: Unilever trademarks)
//   turkey    Norfolk turkeys walked to London
//   candle    the Cathedral monks' Christmas
//   holly     trim
// No candy canes or reindeer: the fact-check found those stories false.

import type { ReactNode } from "react";

const RED = "#B92B2B";
const GREEN = "#1E5B3A";
const GOLD = "#EDB92E";
const CREAM = "#FFFDF7";
const INK = "#3A1A12";
const serif = { fontFamily: "Georgia, serif" } as const;

type P = { className?: string };

function Holly({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 q6 -7 13 -3 q-1 4 3 6 q-7 5 -16 -3Z" fill={GREEN} stroke={INK} strokeWidth="1.6" />
      <path d="M0 0 q-6 -7 -13 -3 q1 4 -3 6 q7 5 16 -3Z" fill={GREEN} stroke={INK} strokeWidth="1.6" />
      <circle cx="-2" cy="1" r="2.6" fill={RED} stroke={INK} strokeWidth="1.2" />
      <circle cx="2.6" cy="2" r="2.6" fill={RED} stroke={INK} strokeWidth="1.2" />
    </g>
  );
}

/** Draws the art twice: a fat white copy first (the die-cut edge, forced
    white by XMAS_STICKER_CSS, since each shape sets its own colours), then
    the art on top. */
function S({ viewBox, className, children }: { viewBox: string; className: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} className={`select-none overflow-visible drop-shadow-[0_3px_4px_rgba(60,40,20,0.35)] ${className}`} aria-hidden>
      <g className="xmas-sticker-edge">{children}</g>
      <g strokeLinejoin="round" strokeLinecap="round">{children}</g>
    </svg>
  );
}

/** Add once on any page that uses these stickers. */
export const XMAS_STICKER_CSS =
  ".xmas-sticker-edge *{fill:#fff!important;stroke:#fff!important;stroke-width:9px!important;stroke-linejoin:round;stroke-linecap:round}";

export function CrackerSticker({ className = "h-12 w-20" }: P) {
  return (
    <S viewBox="0 0 76 40" className={className}>
      <path d="M20 12 L6 4 Q3 20 6 36 L20 28Z" fill={GOLD} stroke={INK} strokeWidth="2.2" />
      <path d="M56 12 L70 4 Q73 20 70 36 L56 28Z" fill={GOLD} stroke={INK} strokeWidth="2.2" />
      <rect x="18" y="10" width="40" height="20" rx="4" fill={RED} stroke={INK} strokeWidth="2.4" />
      <path d="M22 20 l4 -5 l4 10 l4 -10 l4 10 l4 -10 l4 10 l4 -10 l4 5" fill="none" stroke={CREAM} strokeWidth="2" />
      <path d="M20 10 V30 M56 10 V30" fill="none" stroke={INK} strokeWidth="2" />
    </S>
  );
}

export function BellSticker({ className = "h-16 w-14" }: P) {
  return (
    <S viewBox="0 0 52 58" className={className}>
      <path d="M26 10 Q40 10 40 30 Q40 42 47 46 H5 Q12 42 12 30 Q12 10 26 10Z" fill={GOLD} stroke={INK} strokeWidth="2.4" />
      <circle cx="26" cy="50" r="4.5" fill={GOLD} stroke={INK} strokeWidth="2.2" />
      <path d="M17 28 Q18 18 24 16" fill="none" stroke={CREAM} strokeWidth="2.4" />
      <Holly x={26} y={10} />
      <path d="M50 20 q4 6 0 12 M2 20 q-4 6 0 12" fill="none" stroke={RED} strokeWidth="2" />
    </S>
  );
}

export function MincePieSticker({ className = "h-14 w-16" }: P) {
  return (
    <S viewBox="0 0 62 54" className={className}>
      <path d="M14 18 q-4 -5 0 -10 M31 15 q-4 -5 0 -10 M48 18 q-4 -5 0 -10" fill="none" stroke={RED} strokeWidth="2" />
      <path d="M6 30 L13 47 H49 L56 30Z" fill="#C98A3E" stroke={INK} strokeWidth="2.4" />
      <path d="M18 33 L21 46 M27 33 L28 46 M35 33 L34 46 M44 33 L41 46" fill="none" stroke={INK} strokeWidth="1.6" />
      <ellipse cx="31" cy="29" rx="26" ry="8" fill="#F2C27A" stroke={INK} strokeWidth="2.4" />
      <path
        d="M31 23 l1.8 3.8 4.2 .4 -3.2 2.8 1 4.1 -3.8 -2.2 -3.8 2.2 1 -4.1 -3.2 -2.8 4.2 -.4Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="1.3"
      />
    </S>
  );
}

export function MugSticker({ className = "h-14 w-14" }: P) {
  return (
    <S viewBox="0 0 60 56" className={className}>
      <path d="M18 12 q-4 -5 0 -10 M28 12 q-4 -5 0 -10" fill="none" stroke={RED} strokeWidth="2" />
      <path d="M42 24 Q54 24 54 33 Q54 42 42 42" fill="none" stroke={INK} strokeWidth="5" />
      <path d="M42 24 Q54 24 54 33 Q54 42 42 42" fill="none" stroke={RED} strokeWidth="2.4" />
      <path d="M8 18 H44 V44 Q44 52 36 52 H16 Q8 52 8 44Z" fill={RED} stroke={INK} strokeWidth="2.4" />
      <path d="M8 26 H44" fill="none" stroke={CREAM} strokeWidth="2" />
      <circle cx="36" cy="17" r="7" fill="#F29A2E" stroke={INK} strokeWidth="2" />
      <path d="M36 10 V24 M29 17 H43 M31 12 L41 22 M41 12 L31 22" fill="none" stroke="#FFD08A" strokeWidth="1" />
      <path d="M14 16 L24 4" fill="none" stroke="#7A4A26" strokeWidth="3.2" />
    </S>
  );
}

export function JesterSticker({ className = "h-14 w-16" }: P) {
  return (
    <S viewBox="0 0 66 56" className={className}>
      <path d="M12 42 Q8 24 3 15 Q22 18 27 40Z" fill={RED} stroke={INK} strokeWidth="2.3" />
      <path d="M54 42 Q58 24 63 15 Q44 18 39 40Z" fill={RED} stroke={INK} strokeWidth="2.3" />
      <path d="M24 40 Q30 16 33 5 Q36 16 42 40Z" fill={GREEN} stroke={INK} strokeWidth="2.3" />
      <path d="M10 41 Q33 49 56 41 L56 48 Q33 56 10 48Z" fill={GOLD} stroke={INK} strokeWidth="2.3" />
      <circle cx="3" cy="14" r="4" fill={GOLD} stroke={INK} strokeWidth="2" />
      <circle cx="33" cy="5" r="4" fill={GOLD} stroke={INK} strokeWidth="2" />
      <circle cx="63" cy="14" r="4" fill={GOLD} stroke={INK} strokeWidth="2" />
    </S>
  );
}

export function CrownSticker({ className = "h-12 w-14" }: P) {
  return (
    <S viewBox="0 0 60 50" className={className}>
      <path d="M8 38 L5 12 L19 24 L30 5 L41 24 L55 12 L52 38Z" fill={GOLD} stroke={INK} strokeWidth="2.4" />
      <path d="M8 38 H52 V46 H8Z" fill={RED} stroke={INK} strokeWidth="2.4" />
      <circle cx="30" cy="5" r="3" fill={RED} stroke={INK} strokeWidth="1.6" />
      <circle cx="5" cy="12" r="2.6" fill={GREEN} stroke={INK} strokeWidth="1.6" />
      <circle cx="55" cy="12" r="2.6" fill={GREEN} stroke={INK} strokeWidth="1.6" />
      <text x="30" y="44.6" textAnchor="middle" fontSize="7" fontWeight={700} fill={CREAM} stroke="none" style={serif}>
        1121
      </text>
    </S>
  );
}

export function MustardHollySticker({ className = "h-14 w-11" }: P) {
  return (
    <S viewBox="0 0 48 62" className={className}>
      <rect x="10" y="16" width="28" height="42" rx="3" fill="#F4C21B" stroke={INK} strokeWidth="2.4" />
      <rect x="8" y="11" width="32" height="8" rx="2" fill={RED} stroke={INK} strokeWidth="2.2" />
      <rect x="10" y="28" width="28" height="18" fill={RED} stroke="none" />
      <text x="24" y="36" textAnchor="middle" fontSize="5.4" fontWeight={700} fill="#F4C21B" stroke="none" style={serif}>
        MUSTARD
      </text>
      <text x="24" y="43" textAnchor="middle" fontSize="6" fill={CREAM} stroke="none" style={serif}>
        Norwich
      </text>
      <Holly x={24} y={11} />
    </S>
  );
}

export function TurkeySticker({ className = "h-16 w-16" }: P) {
  return (
    <S viewBox="0 0 66 60" className={className}>
      <path d="M7 36 A25 25 0 0 1 59 36Z" fill="#B5652E" stroke={INK} strokeWidth="2.2" />
      <path d="M15 36 A17 17 0 0 1 51 36Z" fill={GOLD} stroke={INK} strokeWidth="1.8" />
      <path d="M33 36 L14 20 M33 36 L24 13 M33 36 L42 13 M33 36 L52 20" fill="none" stroke={INK} strokeWidth="1.4" />
      <ellipse cx="33" cy="40" rx="13" ry="13" fill="#8B4A2B" stroke={INK} strokeWidth="2.3" />
      <path d="M24 31 Q33 37 42 31 L42 35 Q33 41 24 35Z" fill={RED} stroke={INK} strokeWidth="1.6" />
      <path d="M36 34 L40 44 L34 42Z" fill={GREEN} stroke={INK} strokeWidth="1.4" />
      <circle cx="33" cy="22" r="7" fill="#8B4A2B" stroke={INK} strokeWidth="2.2" />
      <path d="M39 21 L45 23 L39 25Z" fill={GOLD} stroke={INK} strokeWidth="1.4" />
      <path d="M38 25 q2 6 -1 7" fill={RED} stroke={INK} strokeWidth="1.4" />
      <circle cx="35" cy="20" r="1.4" fill={INK} stroke="none" />
      <path d="M29 52 V58 L26 59 M37 52 V58 L40 59" fill="none" stroke="#C98A3E" strokeWidth="2.4" />
    </S>
  );
}

export function CandleSticker({ className = "h-16 w-10" }: P) {
  return (
    <S viewBox="0 0 40 64" className={className}>
      <path d="M20 4 Q27 13 20 20 Q13 13 20 4Z" fill="#F7B733" stroke={INK} strokeWidth="2" />
      <path d="M20 10 Q23 14 20 17 Q17 14 20 10Z" fill={CREAM} stroke="none" />
      <path d="M20 20 V24" fill="none" stroke={INK} strokeWidth="1.8" />
      <path d="M12 24 H28 V52 H12Z" fill={CREAM} stroke={INK} strokeWidth="2.4" />
      <path d="M12 28 Q15 34 17 28" fill={CREAM} stroke={INK} strokeWidth="1.6" />
      <path d="M3 54 Q20 60 37 54 L35 50 H5Z" fill={GOLD} stroke={INK} strokeWidth="2.2" />
      <Holly x={9} y={52} />
    </S>
  );
}

export function HollySticker({ className = "h-8 w-12" }: P) {
  return (
    <S viewBox="-18 -12 36 22" className={className}>
      <Holly x={0} y={0} />
    </S>
  );
}
