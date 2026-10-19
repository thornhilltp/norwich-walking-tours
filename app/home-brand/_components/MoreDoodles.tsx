// More scrapbook stickers for the free tour (Tom 2026-10-19 asked for ~20
// to choose from). Same hand-drawn, white die-cut style as Doodles.tsx.

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

export function PintSticker({ className = "h-12 w-9" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 40 56" className={className}>
      <path d="M8 12 H32 L29 52 H11 Z" fill="#E9A23B" stroke={INK} strokeWidth="2.4" />
      <path d="M6 12 Q8 4 14 6 Q18 1 24 5 Q30 2 34 8 Q36 12 32 12 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.2" />
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

export function FlintSticker({ className = "h-11 w-12" }: { className?: string }) {
  // Knapped flint, the glassy black stone of Norwich's medieval churches.
  return (
    <Sticker viewBox="0 0 56 48" className={className}>
      <path d="M6 30 L14 10 L32 4 L50 14 L52 32 L38 44 L16 44 Z" fill="#3B3F45" stroke={INK} strokeWidth="2.2" />
      <path d="M14 10 L24 24 L32 4 M24 24 L38 44 M24 24 L52 32" fill="none" stroke="#8C949C" strokeWidth="1.5" />
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
    <Sticker viewBox="0 0 96 64" className={className}>
      {/* nave and choir */}
      <path d="M6 60 V34 L14 28 H82 L90 34 V60 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* west front */}
      <path d="M6 60 V30 H18 V60" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      <path d="M10 30 V26 H14 V30" fill="none" stroke={GREEN} strokeWidth="2" />
      {/* tower and spire */}
      <path d="M44 34 V22 H56 V34" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      <path d="M44 22 L50 2 L56 22 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* windows and buttresses */}
      <path d="M24 50 V42 Q26 39 28 42 V50 M34 50 V42 Q36 39 38 42 V50 M62 50 V42 Q64 39 66 42 V50 M72 50 V42 Q74 39 76 42 V50" fill="none" stroke={GREEN} strokeWidth="1.8" />
      <path d="M10 60 V48 Q12 44 14 48 V60" fill="none" stroke={GREEN} strokeWidth="1.8" />
    </Sticker>
  );
}

export function ChurchFullSticker({ className = "h-12 w-16" }: { className?: string }) {
  // A whole medieval parish church: west tower, nave, porch.
  return (
    <Sticker viewBox="0 0 76 58" className={className}>
      {/* tower */}
      <path d="M6 54 V14 H9 V9 H13 V14 H17 V9 H21 V14 H24 V54 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* nave with pitched roof */}
      <path d="M24 54 V30 L46 18 L70 30 V54 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.4" />
      {/* porch */}
      <path d="M38 54 V42 L44 37 L50 42 V54" fill="#FFFDF7" stroke={GREEN} strokeWidth="2" />
      <path d="M12 30 V25 Q15 21 18 25 V30 Z M56 44 V38 Q59 34 62 38 V44 Z" fill="none" stroke={GREEN} strokeWidth="1.8" />
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

export function SheepSticker({ className = "h-11 w-14" }: { className?: string }) {
  // Wool: where Norwich's medieval money came from.
  return (
    <Sticker viewBox="0 0 64 48" className={className}>
      <path d="M14 20 Q12 10 22 10 Q26 4 34 8 Q42 4 46 12 Q56 12 54 22 Q58 30 50 34 Q46 40 36 38 Q28 42 20 38 Q10 38 12 30 Q6 26 14 20 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.3" />
      <ellipse cx="54" cy="22" rx="7" ry="6" fill="#3B3F45" stroke={INK} strokeWidth="2" />
      <path d="M22 38 V46 M30 39 V46 M40 38 V46 M47 36 V44" fill="none" stroke={INK} strokeWidth="2.4" />
    </Sticker>
  );
}

export function ChurchSticker({ className = "h-14 w-10" }: { className?: string }) {
  // A medieval church tower, one of the many inside the old city walls.
  return (
    <Sticker viewBox="0 0 40 60" className={className}>
      <path d="M10 56 V14 H13 V9 H17 V14 H23 V9 H27 V14 H30 V56 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <path d="M17 30 V24 Q20 20 23 24 V30 Z" fill="none" stroke={GREEN} strokeWidth="2" />
      <path d="M16 56 V46 Q20 41 24 46 V56" fill="none" stroke={GREEN} strokeWidth="2" />
      <circle cx="20" cy="38" r="3" fill="none" stroke={GREEN} strokeWidth="2" />
    </Sticker>
  );
}

export function CameraSticker({ className = "h-10 w-12" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 56 44" className={className}>
      <rect x="4" y="10" width="48" height="30" rx="5" fill="#FFFDF7" stroke={INK} strokeWidth="2.4" />
      <path d="M18 10 L22 4 H34 L38 10" fill="#FFFDF7" stroke={INK} strokeWidth="2.2" />
      <circle cx="28" cy="25" r="9" fill={GREEN} stroke={INK} strokeWidth="2.2" />
      <circle cx="28" cy="25" r="4" fill="#FFFDF7" stroke="none" />
      <rect x="42" y="14" width="6" height="4" rx="1" fill="#F4C26B" stroke="none" />
    </Sticker>
  );
}

export function TicketSticker({ className = "h-9 w-16" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 80 40" className={className}>
      <path d="M4 6 H76 V15 A5 5 0 0 0 76 25 V34 H4 V25 A5 5 0 0 0 4 15 Z" fill="#F4C26B" stroke={INK} strokeWidth="2.2" />
      <path d="M58 8 V32" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="31" y="19" textAnchor="middle" fontSize="7" fontWeight={700} fill={INK} stroke="none" style={{ ...serif, letterSpacing: 0.5 }}>
        ADMIT ONE
      </text>
      <text x="31" y="30" textAnchor="middle" fontSize="11" fontWeight={700} fill={INK} stroke="none" style={caveat}>
        £0
      </text>
    </Sticker>
  );
}

export function BubbleSticker({ className = "h-12 w-[86px]" }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 96 60" className={className}>
      <path d="M8 6 H88 Q92 6 92 10 V38 Q92 42 88 42 H34 L20 56 L22 42 H8 Q4 42 4 38 V10 Q4 6 8 6 Z" fill="#FFFDF7" stroke={GREEN} strokeWidth="2.5" />
      <text x="48" y="30" textAnchor="middle" fontSize="15" fontWeight={700} fill={GREEN} stroke="none" style={caveat}>
        Did you know?
      </text>
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

export function TeeSticker({ className = "h-12 w-14" }: { className?: string }) {
  // The guides' green "Walk with a Local" t-shirt.
  return (
    <Sticker viewBox="0 0 64 54" className={className}>
      <path d="M20 4 Q32 12 44 4 L60 14 L52 26 L46 22 V50 H18 V22 L12 26 L4 14 Z" fill={GREEN} stroke={INK} strokeWidth="2.3" />
      <text x="32" y="32" textAnchor="middle" fontSize="8.5" fontWeight={700} fill="#FFFDF7" stroke="none" style={caveat}>
        Walk with
      </text>
      <text x="32" y="41" textAnchor="middle" fontSize="8.5" fontWeight={700} fill="#FFFDF7" stroke="none" style={caveat}>
        a Local
      </text>
    </Sticker>
  );
}

export function RiverSticker({ className = "h-10 w-14" }: { className?: string }) {
  // The Wensum, with a little boat.
  return (
    <Sticker viewBox="0 0 64 44" className={className}>
      <path d="M4 30 Q12 24 20 30 T36 30 T52 30 T64 30 V42 H4 Z" fill="#A9D3E0" stroke={INK} strokeWidth="2" />
      <path d="M18 24 H44 L40 30 H22 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2" />
      <path d="M31 24 V8 L42 20 H31" fill="#F4C26B" stroke={INK} strokeWidth="2" />
    </Sticker>
  );
}
