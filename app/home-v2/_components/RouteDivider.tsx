// RouteDivider — replaces the body-wide WalkingPattern after Tom's
// feedback that the pattern competed with text legibility.
//
// Concept: a thick wandering green dashed horizontal line that sits
// BETWEEN sections, never behind them. Brand "footpath" atmosphere
// preserved, zero text/image interference.
//
// Use between major sections in page.tsx. Self-contained, full-width.

export function RouteDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full py-3 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 36"
        preserveAspectRatio="none"
        className="block w-full h-8"
      >
        {/* Wandering Q-curve dashed line — thick stroke, brand green.
            Wobbles up/down ~14px across the width so it doesn't read
            as a flat divider but as a "walking route" between sections. */}
        <path
          d="M -10 18 Q 180 4 360 18 T 720 18 T 1080 18 T 1450 18"
          stroke="#2DA96B"
          strokeWidth="4"
          strokeDasharray="2 12"
          strokeLinecap="round"
          opacity="0.55"
          fill="none"
        />
      </svg>
    </div>
  );
}
