// More scrapbook stickers for the free tour: the ones Tom picked from the
// sticker sheet (2026-10-19). Same hand-drawn, white die-cut style as
// Doodles.tsx.

import type { CSSProperties } from "react";
import { Sticker } from "./Doodles";

const GREEN = "#2DA96B";
const INK = "#1A6B47";
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const serif: CSSProperties = { fontFamily: "Georgia, serif" };

export function AwningSticker({ className = "h-11 w-14" }: { className?: string }) {
  // A Norwich Market stall: striped roof over a counter.
  const stripes = ["#2DA96B", "#FFFDF7", "#F4C26B", "#FFFDF7", "#2DA96B", "#FFFDF7"];
  return (
    <Sticker viewBox="0 0 60 50" className={className}>
      {stripes.map((c, k) => (
        <path key={k} d={`M${6 + k * 8} 8 H${14 + k * 8} V22 A4 4 0 0 1 ${6 + k * 8} 22 Z`} fill={c} stroke={INK} strokeWidth="1.5" />
      ))}
      <path d="M8 26 V46 H52 V26" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <path d="M8 36 H52" fill="none" stroke={GREEN} strokeWidth="2" />
    </Sticker>
  );
}

export function StreetSignSticker({ className = "h-9 w-16" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 80 40" className={className}>
      <rect x="4" y="6" width="72" height="28" rx="3" fill="#FFFDF7" stroke="#1A1A1A" strokeWidth="2.5" />
      <rect x="8" y="10" width="64" height="20" rx="1.5" fill="none" stroke="#1A1A1A" strokeWidth="1" />
      <text x="40" y="24.5" textAnchor="middle" fontSize="10" fontWeight={700} fill="#1A1A1A" stroke="none" style={{ ...serif, letterSpacing: 0.5 }}>
        ELM HILL
      </text>
    </Sticker>
  );
}

export function DragonSticker({ className = "h-12 w-14" }: { className?: string }) {
  // Snap, the Norwich dragon from the old guild processions.
  return (
    <Sticker viewBox="0 0 64 52" className={className}>
      <path d="M6 40 Q4 24 18 18 L30 10 Q40 6 46 12 L58 10 L54 18 L60 22 L48 26 Q44 34 34 34 L26 36 Q18 46 6 40 Z" fill="#E3523B" stroke={INK} strokeWidth="2.4" />
      <path d="M30 10 L28 2 L36 8 M38 7 L40 0 L44 9" fill="#E3523B" stroke={INK} strokeWidth="2" />
      <circle cx="42" cy="15" r="2.2" fill={INK} stroke="none" />
      <path d="M14 30 Q20 26 26 30" fill="none" stroke={INK} strokeWidth="1.8" />
    </Sticker>
  );
}

export function MustardSticker({ className = "h-12 w-10" }: { className?: string }) {
  // A mustard tin in mustard yellow and red: a nod to Norwich's mustard
  // without Colman's name, design or bull's-head logo (Unilever trademarks).
  return (
    <Sticker viewBox="0 0 44 56" className={className}>
      <rect x="8" y="10" width="28" height="42" rx="3" fill="#F4C21B" stroke={INK} strokeWidth="2.4" />
      <rect x="6" y="5" width="32" height="8" rx="2" fill="#C8102E" stroke={INK} strokeWidth="2.2" />
      <rect x="8" y="22" width="28" height="18" fill="#C8102E" stroke="none" />
      <text x="22" y="30" textAnchor="middle" fontSize="5.4" fontWeight={700} fill="#F4C21B" stroke="none" style={{ ...serif, letterSpacing: 0.2 }}>
        MUSTARD
      </text>
      <text x="22" y="37" textAnchor="middle" fontSize="6" fill="#FFFDF7" stroke="none" style={serif}>
        Norwich
      </text>
    </Sticker>
  );
}

export function CathedralSticker({ className = "h-14 w-20" }: { className?: string }) {
  // The whole Cathedral: long nave, central tower and spire, west front.
  return (
    <Sticker viewBox="0 0 96 96" className={className}>
      {/* nave and choir */}
      <path d="M6 92 V70 L12 64 H84 L90 70 V92 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* west front */}
      <path d="M6 92 V66 H18 V92" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* central tower and its tall spire, the city's landmark */}
      <path d="M42 70 V50 H54 V70" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      <path d="M42 50 L48 2 L54 50 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      <path d="M42 50 V45 M54 50 V45 M45 58 V54 Q48 51 51 54 V58" fill="none" stroke={GREEN} strokeWidth="1.8" />
      {/* windows */}
      <path d="M24 84 V77 L26 74 L28 77 V84 M33 84 V77 L35 74 L37 77 V84 M60 84 V77 L62 74 L64 77 V84 M69 84 V77 L71 74 L73 77 V84" fill="none" stroke={GREEN} strokeWidth="1.8" />
      <path d="M10 92 V82 L12 79 L14 82 V92" fill="none" stroke={GREEN} strokeWidth="1.8" />
    </Sticker>
  );
}

export function ChurchFullSticker({ className = "h-12 w-16" }: { className?: string }) {
  // A medieval parish church, Norwich style: battlemented west tower and a
  // flat, parapeted nave with tall pointed windows (no pitched roof, so it
  // doesn't read as a house).
  return (
    <Sticker viewBox="0 0 76 58" className={className}>
      {/* tower */}
      <path d="M6 54 V9 H10 V13 H14 V9 H18 V13 H22 V9 H26 V54 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* nave, flat parapet */}
      <path d="M26 54 V24 H70 V54 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      <path d="M26 28 H70" fill="none" stroke={GREEN} strokeWidth="1.6" />
      {/* tall pointed windows */}
      <path d="M33 48 V38 L36 33 L39 38 V48 Z M46 48 V38 L49 33 L52 38 V48 Z M59 48 V38 L62 33 L65 38 V48 Z" fill="none" stroke={GREEN} strokeWidth="1.8" />
      {/* tower window and door */}
      <path d="M13 30 V24 L16 20 L19 24 V30 Z M12 54 V46 L16 41 L20 46 V54" fill="none" stroke={GREEN} strokeWidth="1.8" />
    </Sticker>
  );
}

export function ShopSticker({ className = "h-14 w-14" }: { className?: string }) {
  // An independent shop in the Lanes: bay window, door, hanging sign.
  return (
    <Sticker viewBox="0 0 64 64" className={className}>
      <path d="M8 60 V14 H52 V60 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.3" />
      <rect x="8" y="14" width="44" height="8" fill="#1A6B47" stroke={INK} strokeWidth="2" />
      {/* bay window */}
      <path d="M12 52 V30 H32 V52 Z" fill="#CFE8DC" stroke={INK} strokeWidth="2" />
      <path d="M22 30 V52 M12 41 H32" fill="none" stroke={INK} strokeWidth="1.5" />
      {/* door */}
      <path d="M38 60 V32 H48 V60" fill="#F2A7A0" stroke={INK} strokeWidth="2" />
      <circle cx="45" cy="47" r="1.2" fill={INK} stroke="none" />
      {/* hanging sign */}
      <path d="M52 26 H62 M58 26 V30" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="53" y="30" width="10" height="9" rx="1.5" fill="#F4C26B" stroke={INK} strokeWidth="1.8" />
    </Sticker>
  );
}

export function FineCitySticker({ className = "h-12 w-16" }: { className?: string }) {
  // The welcome signs on the roads in: "Norwich, a fine city".
  return (
    <Sticker viewBox="0 0 80 52" className={className}>
      <rect x="4" y="4" width="72" height="34" rx="3" fill="#FFFDF7" stroke={INK} strokeWidth="2.4" />
      <text x="40" y="20" textAnchor="middle" fontSize="12" fontWeight={700} fill={INK} stroke="none" style={serif}>
        Norwich
      </text>
      <text x="40" y="32" textAnchor="middle" fontSize="11" fill={INK} stroke="none" style={caveat}>
        a fine city
      </text>
      <path d="M22 38 V50 M58 38 V50" fill="none" stroke={INK} strokeWidth="2.4" />
    </Sticker>
  );
}

export function BookSticker({ className = "h-12 w-16" }: { className?: string }) {
  // An open book: Norwich, England's first UNESCO City of Literature (2012).
  return (
    <Sticker viewBox="0 0 72 52" className={className}>
      <path d="M36 12 Q22 4 6 8 V46 Q22 42 36 50 Q50 42 66 46 V8 Q50 4 36 12 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.3" />
      <path d="M36 12 V50" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M12 18 Q22 15 30 19 M12 25 Q22 22 30 26 M12 32 Q22 29 30 33 M42 19 Q50 15 60 18 M42 26 Q50 22 60 25 M42 33 Q50 29 60 32" fill="none" stroke={GREEN} strokeWidth="1.6" />
    </Sticker>
  );
}
