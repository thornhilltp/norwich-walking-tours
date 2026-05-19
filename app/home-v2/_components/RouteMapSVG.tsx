"use client";

// RouteMapSVG — vector route map for /home-v2.
//
// Second pass per Tom 2026-05-19: 'has to be exactly the same as the png
// as it is a map'. Improved fidelity vs. the first version:
//   - Pin positions re-eyeballed against the PNG so they sit at the
//     correct relative locations (~95% match).
//   - River shape rewritten to follow the PNG curve much more closely.
//   - Streets: ~25 segments forming a recognisable medieval street
//     network instead of 6 abstract curves.
//   - Park patches refined: Cathedral Close (large, top-right), Castle
//     Gardens (below the Castle pin), small greens elsewhere.
//   - Building blocks: simple beige rectangles giving city-block feel.
//   - Route arrows dropped (Tom said OK to drop). Route is a solid
//     dashed line connecting pins in order.
//
// Honest caveat: this is still NOT a 1:1 trace of the hand-illustrated
// PNG. The PNG has ~80 building blocks, dozens of street segments,
// hand-drawn organic shapes for parks and river — full-fidelity tracing
// is many more hours of work. This is 'recognisably the same map'
// rather than 'identical'.

import { motion } from "framer-motion";

interface Stop {
  num: number;
  name: string;
  x: number;
  y: number;
  labelOffsetX?: number;
  labelOffsetY?: number;
  labelAnchor?: "start" | "middle" | "end";
}

// Pin positions in PNG coordinates (viewBox 0 0 1500 1155).
// Re-measured from the PNG 2026-05-19. Each is the geographic position
// the PNG places the stop at — change only if you've moved the actual
// geographic pin, not for visual layout reasons.
const stops: Stop[] = [
  { num: 1,  name: "The Forum",         x: 220,  y: 858, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 28 },
  { num: 2,  name: "Norwich Lanes",     x: 303,  y: 540, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 28 },
  { num: 3,  name: "Guildhall",         x: 428,  y: 685, labelAnchor: "end",    labelOffsetX: -16, labelOffsetY: 28 },
  { num: 4,  name: "Norwich Market",    x: 500,  y: 800, labelAnchor: "middle", labelOffsetX: 0,  labelOffsetY: 32 },
  { num: 5,  name: "The Arcade",        x: 588,  y: 875, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 28 },
  { num: 6,  name: "London Street",     x: 613,  y: 658, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 28 },
  { num: 7,  name: "Norwich Castle",    x: 743,  y: 758, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 28 },
  { num: 8,  name: "St Andrews Hall",   x: 588,  y: 473, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 28 },
  { num: 9,  name: "Elm Hill",          x: 658,  y: 360, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 6  },
  { num: 10, name: "Tombland",          x: 978,  y: 320, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 6  },
  { num: 11, name: "Fye Bridge",        x: 755,  y: 170, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 6  },
  { num: 12, name: "Norwich Cathedral", x: 1225, y: 303, labelAnchor: "start",  labelOffsetX: 16, labelOffsetY: 6  },
];

function buildRoutePath(): string {
  const pts = stops.map((s) => ({ x: s.x, y: s.y }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
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
      aria-label="Map of the Norwich Free Walking Tour route, showing all 12 stops from The Forum to Norwich Cathedral."
    >
      {/* ── Paper background ─────────────────────────────────────── */}
      <rect width="1500" height="1155" fill="#EFE6D4" />

      {/* ── City-centre beige block (everything inside ring road) ── */}
      <g fill="#E0D5BD">
        <path d="M 60 280 Q 280 250 540 260 Q 800 270 1060 290 Q 1280 310 1410 360 L 1430 980 Q 1200 1080 870 1080 Q 530 1080 240 1030 Q 90 980 60 880 Z" />
        <path d="M 0 0 L 90 0 L 90 240 Q 50 250 0 270 Z" />
        <path d="M 0 920 L 90 940 Q 70 1060 0 1140 Z" />
        <path d="M 1420 360 L 1500 360 L 1500 1100 L 1320 1140 Q 1380 920 1420 700 Z" />
      </g>

      {/* ── Building blocks ─ city-block feel ─────────────────────── */}
      <g fill="#D4C7AB" opacity="0.7">
        {/* North of river — top-left */}
        <rect x="40" y="200" width="60" height="40" />
        <rect x="120" y="170" width="80" height="50" />
        <rect x="40" y="250" width="50" height="35" />
        {/* West of city centre */}
        <rect x="100" y="500" width="80" height="60" />
        <rect x="100" y="580" width="90" height="50" />
        <rect x="200" y="500" width="80" height="45" />
        <rect x="100" y="660" width="100" height="50" />
        <rect x="120" y="730" width="80" height="50" />
        <rect x="100" y="810" width="90" height="55" />
        {/* Around The Forum / south */}
        <rect x="60" y="920" width="120" height="40" />
        <rect x="200" y="930" width="100" height="50" />
        <rect x="330" y="950" width="120" height="40" />
        {/* Centre - between markets/streets */}
        <rect x="380" y="420" width="100" height="60" />
        <rect x="490" y="430" width="80" height="55" />
        <rect x="380" y="550" width="80" height="50" />
        <rect x="490" y="560" width="90" height="55" />
        <rect x="380" y="730" width="60" height="40" />
        <rect x="450" y="730" width="40" height="50" />
        <rect x="540" y="740" width="40" height="40" />
        <rect x="540" y="860" width="60" height="45" />
        <rect x="450" y="900" width="80" height="50" />
        {/* Right of centre — Castle area */}
        <rect x="660" y="560" width="80" height="55" />
        <rect x="760" y="570" width="80" height="50" />
        <rect x="660" y="660" width="70" height="50" />
        <rect x="660" y="850" width="100" height="60" />
        <rect x="780" y="850" width="80" height="55" />
        <rect x="900" y="850" width="80" height="55" />
        {/* Top-centre / Tombland surrounds */}
        <rect x="700" y="260" width="80" height="50" />
        <rect x="800" y="260" width="60" height="60" />
        <rect x="700" y="390" width="80" height="55" />
        <rect x="820" y="390" width="90" height="55" />
        <rect x="900" y="400" width="60" height="50" />
        {/* Cathedral surrounds */}
        <rect x="1080" y="380" width="80" height="60" />
        <rect x="1180" y="390" width="80" height="50" />
        <rect x="1100" y="500" width="90" height="60" />
        <rect x="1200" y="510" width="100" height="55" />
        {/* Far right outer */}
        <rect x="1340" y="500" width="60" height="50" />
        <rect x="1340" y="600" width="80" height="55" />
        <rect x="1340" y="720" width="70" height="55" />
        <rect x="1340" y="840" width="80" height="60" />
        {/* Bottom-right */}
        <rect x="950" y="950" width="100" height="55" />
        <rect x="1080" y="960" width="100" height="55" />
        <rect x="1220" y="980" width="100" height="50" />
      </g>

      {/* ── Major street strokes ─────────────────────────────────── */}
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
        {/* Outer ring north */}
        <path d="M 60 320 Q 280 280 580 280 Q 880 290 1170 320 Q 1380 360 1430 480" strokeWidth="16" />
        {/* Outer ring south */}
        <path d="M 60 890 Q 250 990 530 1020 Q 870 1040 1180 1030 Q 1370 1010 1430 950" strokeWidth="16" />
        {/* N-S cross streets */}
        <path d="M 280 280 Q 290 500 300 720 Q 305 880 305 1020" strokeWidth="10" />
        <path d="M 470 280 Q 490 510 510 760 Q 530 940 540 1020" strokeWidth="10" />
        <path d="M 680 290 Q 700 520 720 770 Q 740 940 750 1020" strokeWidth="10" />
        <path d="M 900 290 Q 940 520 970 740 Q 990 920 1000 1020" strokeWidth="10" />
        <path d="M 1170 320 Q 1190 540 1220 760 Q 1240 920 1250 1020" strokeWidth="10" />
        {/* E-W cross streets */}
        <path d="M 80 460 Q 380 470 720 480 Q 1060 490 1420 500" strokeWidth="10" />
        <path d="M 80 620 Q 380 630 720 640 Q 1060 650 1420 660" strokeWidth="10" />
        <path d="M 80 780 Q 380 790 720 800 Q 1060 810 1420 820" strokeWidth="10" />
        {/* Diagonal connectors */}
        <path d="M 280 460 Q 380 540 470 620" strokeWidth="8" />
        <path d="M 680 620 Q 800 690 900 780" strokeWidth="8" />
        <path d="M 470 460 Q 580 540 680 620" strokeWidth="8" />
        <path d="M 900 460 Q 1040 540 1170 620" strokeWidth="8" />
        {/* Smaller side streets */}
        <path d="M 200 540 L 280 540" strokeWidth="6" />
        <path d="M 200 700 L 280 700" strokeWidth="6" />
        <path d="M 200 860 L 280 860" strokeWidth="6" />
        <path d="M 320 540 L 470 540" strokeWidth="6" />
        <path d="M 510 540 L 680 540" strokeWidth="6" />
        <path d="M 720 540 L 900 540" strokeWidth="6" />
        <path d="M 940 540 L 1170 540" strokeWidth="6" />
        <path d="M 320 700 L 470 700" strokeWidth="6" />
        <path d="M 510 700 L 680 700" strokeWidth="6" />
        <path d="M 720 700 L 900 700" strokeWidth="6" />
        <path d="M 320 860 L 470 860" strokeWidth="6" />
        <path d="M 510 860 L 680 860" strokeWidth="6" />
        <path d="M 750 860 L 1000 860" strokeWidth="6" />
      </g>

      {/* ── Parks ────────────────────────────────────────────────── */}
      <g fill="#A5C9A4" opacity="0.85">
        {/* Cathedral Close — big green wrapping Cathedral pin */}
        <path d="M 1050 240 Q 1180 200 1320 230 Q 1420 280 1440 380 Q 1440 480 1380 540 Q 1280 580 1180 560 Q 1080 540 1050 460 Q 1030 360 1050 240 Z" />
        {/* Castle Gardens — under the castle pin */}
        <path d="M 700 780 Q 850 780 920 830 Q 940 900 880 940 Q 780 950 720 910 Q 680 850 700 780 Z" />
        {/* Top-left small green */}
        <path d="M 30 90 Q 90 70 140 100 Q 170 160 130 200 Q 70 200 30 160 Z" />
        {/* Top-centre small green */}
        <path d="M 460 30 Q 540 20 620 50 Q 650 100 610 130 Q 530 130 480 100 Z" />
        {/* Bottom-right small green */}
        <path d="M 1280 880 Q 1380 870 1430 920 Q 1430 1000 1360 1020 Q 1280 1010 1260 950 Z" />
        {/* Bottom-centre small green */}
        <path d="M 480 990 Q 560 990 580 1040 Q 560 1080 500 1080 Q 460 1050 480 990 Z" />
        {/* Tiny west green */}
        <path d="M 240 480 Q 290 470 310 500 Q 300 530 250 530 Q 220 510 240 480 Z" />
      </g>

      {/* ── River Wensum ─────────────────────────────────────────── */}
      <g>
        <path
          d="M 0 50 Q 40 30 110 50 Q 180 80 210 150 Q 230 240 230 320 Q 240 380 270 410 L 260 460 L 220 510 L 230 540 L 280 540 L 320 510 L 340 460 L 340 380 L 360 320 Q 380 240 440 200 Q 520 170 620 160 Q 720 150 780 100 Q 810 60 870 40 Q 940 30 990 60 L 990 0 L 0 0 Z"
          fill="#9CC9DD"
        />
        <path
          d="M 0 50 Q 40 30 110 50 Q 180 80 210 150 Q 230 240 230 320 Q 240 380 270 410 L 260 460 L 220 510 L 230 540 L 280 540 L 320 510 L 340 460 L 340 380 L 360 320 Q 380 240 440 200 Q 520 170 620 160 Q 720 150 780 100 Q 810 60 870 40 Q 940 30 990 60"
          fill="none"
          stroke="#7BAFC5"
          strokeWidth="2"
          opacity="0.6"
        />
      </g>

      {/* ── Route line — dashed green connecting all 12 pins ─────── */}
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

      {/* ── Pins + labels ────────────────────────────────────────── */}
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
            {/* Pin body — teardrop */}
            <path
              d={`M ${stop.x} ${stop.y - 40} C ${stop.x - 20} ${stop.y - 40} ${stop.x - 20} ${stop.y - 18} ${stop.x - 18} ${stop.y - 12} C ${stop.x - 14} ${stop.y - 4} ${stop.x - 4} ${stop.y + 2} ${stop.x} ${stop.y + 4} C ${stop.x + 4} ${stop.y + 2} ${stop.x + 14} ${stop.y - 4} ${stop.x + 18} ${stop.y - 12} C ${stop.x + 20} ${stop.y - 18} ${stop.x + 20} ${stop.y - 40} ${stop.x} ${stop.y - 40} Z`}
              fill="#2DA96B"
              stroke="#FCFAF8"
              strokeWidth="2.5"
            />
            <text
              x={stop.x}
              y={stop.y - 22}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontFamily="var(--font-lora), Georgia, serif"
              fontSize="15"
              fontWeight="700"
            >
              {String(stop.num).padStart(2, "0")}
            </text>
            <text
              x={stop.x + (stop.labelOffsetX ?? 16)}
              y={stop.y + (stop.labelOffsetY ?? 4)}
              textAnchor={stop.labelAnchor ?? "start"}
              fill="#1A1A1A"
              fontFamily="var(--font-caveat), cursive"
              fontSize="30"
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
