"use client";

// RouteMapSVG — experimental vector version of the Norwich route map.
//
// Why exists: Tom wanted to see what an SVG version of /images/route-map.png
// would look like. Honest framing: this is NOT a 1:1 trace of the PNG.
// Faithfully tracing a hand-illustrated cartographic map (dozens of city
// blocks, intricate street network, hand-drawn detail) would take many
// hours and the result would look worse than the PNG it replaces.
//
// What this IS: a SIMPLIFIED but recognisable vector map that hits the
// same cartographic notes:
//   - River Wensum as a flowing curve (top-left → top-right → down)
//   - Park patches as organic blobs (Cathedral Close, Castle Mound, etc.)
//   - A few major street strokes (no full grid — too much to trace)
//   - 12 numbered pins in their correct relative positions
//   - Dashed route line connecting them
//   - Caveat labels for each stop
//
// Use it (or not) in ThemedRouteSection in place of the PNG. The advantage:
// crisper at any size, animatable, smaller file size, themable via CSS.
// The disadvantage: stylised vs. the hand-drawn cartographic charm of the
// PNG. Designer's call.
//
// viewBox = 0 0 1500 1155 to match the PNG's aspect ratio so coordinates
// from the original image roughly translate.

import { motion } from "framer-motion";

interface Stop {
  num: number;
  name: string;
  x: number;
  y: number;
  labelOffsetX?: number; // px to nudge the label horizontally
  labelOffsetY?: number; // px to nudge the label vertically
  labelAnchor?: "start" | "middle" | "end";
}

// Pin positions are eyeballed from the PNG. Adjust if Tom wants any pin
// re-anchored.
const stops: Stop[] = [
  { num: 1,  name: "The Forum",        x: 215,  y: 855, labelAnchor: "start",  labelOffsetX: 15, labelOffsetY: -2 },
  { num: 2,  name: "Norwich Lanes",    x: 285,  y: 555, labelAnchor: "start",  labelOffsetX: 18, labelOffsetY: -2 },
  { num: 3,  name: "Guildhall",        x: 380,  y: 665, labelAnchor: "end",    labelOffsetX: -16, labelOffsetY: 6 },
  { num: 4,  name: "Norwich Market",   x: 470,  y: 765, labelAnchor: "end",    labelOffsetX: -16, labelOffsetY: 4 },
  { num: 5,  name: "The Arcade",       x: 540,  y: 855, labelAnchor: "start",  labelOffsetX: 15, labelOffsetY: 4 },
  { num: 6,  name: "London Street",    x: 585,  y: 625, labelAnchor: "start",  labelOffsetX: 18, labelOffsetY: 4 },
  { num: 7,  name: "Norwich Castle",   x: 770,  y: 730, labelAnchor: "start",  labelOffsetX: 18, labelOffsetY: 4 },
  { num: 8,  name: "St Andrews Hall",  x: 580,  y: 510, labelAnchor: "start",  labelOffsetX: 18, labelOffsetY: 4 },
  { num: 9,  name: "Elm Hill",         x: 625,  y: 395, labelAnchor: "start",  labelOffsetX: 18, labelOffsetY: 0 },
  { num: 10, name: "Tombland",         x: 920,  y: 325, labelAnchor: "start",  labelOffsetX: 18, labelOffsetY: 0 },
  { num: 11, name: "Fye Bridge",       x: 760,  y: 155, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 4 },
  { num: 12, name: "Norwich Cathedral", x: 1200, y: 285, labelAnchor: "start", labelOffsetX: 18, labelOffsetY: 4 },
];

// Build the dashed route path from stop to stop with gentle Q-curve
// segments so the line "wobbles" like the hand-drawn original.
function buildRoutePath(): string {
  const pts = stops.map((s) => ({ x: s.x, y: s.y }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    // Control point — midway plus a small perpendicular offset.
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    // Perpendicular nudge, alternating side per segment for a wobble.
    const sign = i % 2 === 0 ? 1 : -1;
    const norm = Math.sqrt(dx * dx + dy * dy);
    const offset = 14 * sign;
    const cpX = midX + (-dy / norm) * offset;
    const cpY = midY + (dx / norm) * offset;
    d += ` Q ${cpX.toFixed(0)} ${cpY.toFixed(0)} ${curr.x} ${curr.y}`;
  }
  return d;
}

export function RouteMapSVG({ className }: { className?: string }) {
  const routePath = buildRoutePath();

  return (
    <svg
      viewBox="0 0 1500 1155"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Hand-drawn route map of the Norwich Free Walking Tour showing all 12 stops from The Forum to Norwich Cathedral."
    >
      {/* ── Base layer: cream paper background ─────────────────────── */}
      <rect width="1500" height="1155" fill="#EFE6D4" />

      {/* ── Street grid hint ───────────────────────────────────────────
          A few major curves + diagonals — not a full city grid. Reads
          as 'there are streets here' without trying to be cartographic.
          Light beige fill, very subtle. */}
      <g fill="#E0D5BD" opacity="0.65">
        {/* Big city-centre block of beige (everything inside the river loop) */}
        <path d="M 60 280 Q 220 220 480 240 Q 740 260 980 290 Q 1230 330 1410 380 L 1430 980 Q 1200 1080 870 1080 Q 530 1080 240 1030 Q 90 990 60 880 Z" />
        {/* Outer suburban pockets — top-left, bottom-right */}
        <path d="M 0 0 L 100 0 L 100 230 Q 60 240 0 270 Z" />
        <path d="M 1420 380 L 1500 380 L 1500 1155 L 1300 1155 Q 1380 900 1420 720 Z" />
        <path d="M 0 920 L 100 940 Q 80 1080 0 1155 Z" />
      </g>

      {/* ── Street strokes ────────────────────────────────────────────
          Pale grey lines suggesting major arteries. Not a literal map. */}
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
        {/* Ring road suggestion — wraps the city centre */}
        <path d="M 60 320 Q 280 260 580 270 Q 880 280 1170 320 Q 1380 360 1420 480" strokeWidth="14" />
        <path d="M 80 880 Q 250 990 530 1020 Q 870 1040 1180 1030 Q 1370 1010 1430 950" strokeWidth="14" />
        {/* A couple of cross-streets through centre */}
        <path d="M 480 260 Q 510 510 540 760 Q 560 940 580 1020" strokeWidth="9" />
        <path d="M 80 540 Q 380 560 720 580 Q 1060 600 1420 620" strokeWidth="9" />
        <path d="M 280 280 Q 420 540 540 760 Q 660 920 800 1020" strokeWidth="7" />
        <path d="M 900 280 Q 940 520 970 740 Q 990 920 1000 1020" strokeWidth="7" />
        <path d="M 1170 320 Q 1190 540 1220 760 Q 1240 920 1240 1020" strokeWidth="7" />
      </g>

      {/* ── Parks ────────────────────────────────────────────────────
          Organic green blobs. Cathedral Close (upper-right), Castle
          mound area (right of centre), small bits scattered. */}
      <g fill="#A5C9A4" opacity="0.85">
        {/* Cathedral Close — large green to the right of Cathedral pin */}
        <path d="M 1080 240 Q 1220 200 1380 260 Q 1450 360 1410 480 Q 1330 540 1200 510 Q 1080 470 1060 380 Q 1050 300 1080 240 Z" />
        {/* Castle Mound / Gardens — right of centre */}
        <path d="M 780 700 Q 920 680 980 760 Q 990 850 900 880 Q 800 880 770 800 Q 760 740 780 700 Z" />
        {/* Small green pockets */}
        <path d="M 80 80 Q 140 60 200 90 Q 220 150 180 180 Q 110 180 80 140 Z" />
        <path d="M 1280 880 Q 1380 870 1430 920 Q 1430 1000 1360 1020 Q 1280 1010 1260 950 Z" />
        <path d="M 480 980 Q 560 980 580 1030 Q 560 1080 500 1080 Q 460 1050 480 980 Z" />
      </g>

      {/* ── River Wensum ──────────────────────────────────────────────
          Flowing curve: enters top-left, wraps across the top, sweeps
          down through Fye Bridge area, then curves right past Tombland
          and out beyond Cathedral Close.  Hand-traced eyeballing of the
          PNG. */}
      <g>
        {/* River fill — pale blue */}
        <path
          d="M 0 80 Q 80 60 140 90 Q 200 120 220 200 Q 230 280 280 340 Q 350 420 440 380 Q 540 340 600 240 Q 660 150 740 130 Q 820 120 870 200 Q 910 280 940 350 Q 970 400 1020 410 Q 1080 420 1130 380 Q 1180 350 1230 360 Q 1280 380 1300 440 Q 1310 510 1280 560 L 1280 620 Q 1280 660 1300 690 L 1310 740 L 1340 760 L 1500 760 L 1500 600 Q 1480 540 1430 480 Q 1380 420 1310 360 Q 1240 300 1140 260 Q 1000 220 880 180 Q 760 140 700 80 Q 660 40 580 30 Q 460 20 350 35 Q 220 50 140 40 Q 80 30 0 30 Z"
          fill="#9CC9DD"
        />
        {/* River edge — subtle darker stroke to give it crispness */}
        <path
          d="M 0 80 Q 80 60 140 90 Q 200 120 220 200 Q 230 280 280 340 Q 350 420 440 380 Q 540 340 600 240 Q 660 150 740 130 Q 820 120 870 200 Q 910 280 940 350 Q 970 400 1020 410 Q 1080 420 1130 380 Q 1180 350 1230 360 Q 1280 380 1300 440 Q 1310 510 1280 560"
          fill="none"
          stroke="#7BAFC5"
          strokeWidth="2"
          opacity="0.6"
        />
      </g>

      {/* ── Route line — dashed green, connecting all 12 pins ─────── */}
      <motion.path
        d={routePath}
        fill="none"
        stroke="#2DA96B"
        strokeWidth="3"
        strokeDasharray="2 9"
        strokeLinecap="round"
        opacity="0.85"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      {/* ── Pins + labels ─────────────────────────────────────────── */}
      <g>
        {stops.map((stop, i) => (
          <motion.g
            key={stop.num}
            initial={{ opacity: 0, y: -16, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + i * 0.08,
              type: "spring",
              stiffness: 240,
              damping: 18,
            }}
          >
            {/* Pin body */}
            <path
              d={`M ${stop.x} ${stop.y - 36} C ${stop.x - 18} ${stop.y - 36} ${stop.x - 18} ${stop.y - 18} ${stop.x - 18} ${stop.y - 12} C ${stop.x - 18} ${stop.y + 4} ${stop.x} ${stop.y + 4} ${stop.x} ${stop.y + 4} S ${stop.x + 18} ${stop.y + 4} ${stop.x + 18} ${stop.y - 12} C ${stop.x + 18} ${stop.y - 18} ${stop.x + 18} ${stop.y - 36} ${stop.x} ${stop.y - 36} Z`}
              fill="#2DA96B"
              stroke="#FCFAF8"
              strokeWidth="2"
            />
            {/* Number inside pin */}
            <text
              x={stop.x}
              y={stop.y - 18}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontFamily="var(--font-lora), Georgia, serif"
              fontSize="14"
              fontWeight="700"
            >
              {String(stop.num).padStart(2, "0")}
            </text>
            {/* Label — Caveat handwritten */}
            <text
              x={stop.x + (stop.labelOffsetX ?? 16)}
              y={stop.y - 18 + (stop.labelOffsetY ?? 0)}
              textAnchor={stop.labelAnchor ?? "start"}
              fill="#1A1A1A"
              fontFamily="var(--font-caveat), cursive"
              fontSize="28"
              fontWeight="600"
            >
              {stop.name}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
