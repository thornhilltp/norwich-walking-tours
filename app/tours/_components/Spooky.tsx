// Atmosphere layers for the Dark History page (Tom 2026-10-11): a Norwich
// night skyline with moon and crows for the hero, slow drifting fog for
// black sections, and a moon divider between black sections. Pure SVG/CSS,
// no image assets. Fog drift stops under prefers-reduced-motion.

import s from "./spooky.module.css";

/** Cathedral spire, castle keep, rooftops and church towers in silhouette. */
export function NightSkyline() {
  return (
    <div className={s.skyline} aria-hidden="true">
      <div className={s.moon} />
      <svg className={s.crows} viewBox="0 0 220 80">
        <path d="M10 40 q8 -9 16 0 q8 -9 16 0" />
        <path d="M70 18 q6 -7 12 0 q6 -7 12 0" />
        <path d="M120 50 q5 -6 10 0 q5 -6 10 0" />
        <path d="M165 26 q7 -8 14 0 q7 -8 14 0" />
      </svg>
      <svg className={s.city} viewBox="0 0 1440 220" preserveAspectRatio="none">
        <path
          fill="#0b0b0a"
          d="M0 220 V160 H40 V140 H70 V160 H95 V130 L110 118 L125 130 V165 H150 V150 H180 V120 H195 V105 H205 V120 H220 V160
             H260 V138 H300 V160 H330 V112 L345 98 L360 112 V160 H390
             V96 H404 V84 H416 V96 H430 V70 H446 V96 H460 V84 H472 V96 H486 V160
             H520 V148 H560 V160 H600 V140 L615 128 L630 140 V160
             H660 V150 H690 V120 L700 108 L710 120 V150
             H740 V128 H760 L800 20 L840 128 H860 V150 H890 V160
             H930 V136 H960 V122 H975 V136 H1000 V160 H1040 V144 H1080 V160
             H1110 V118 L1126 104 L1142 118 V160 H1180 V150 H1220 V160
             H1250 V132 H1262 V116 H1274 V132 H1290 V160 H1330 V146 H1370 V160 H1400 V150 H1440 V220 Z"
        />
      </svg>
      <div className={s.fog} />
    </div>
  );
}

/** Slow drifting mist for the bottom of a black section. */
export function Fog() {
  return <div className={s.fogBand} aria-hidden="true" />;
}

/** Thin fading line with a small crescent moon, between black sections. */
export function MoonDivider() {
  return (
    <div className={s.divider} aria-hidden="true">
      <span className={s.line} />
      <svg viewBox="0 0 24 24" className={s.crescent}>
        <path d="M15.5 3.5a8.5 8.5 0 1 0 5 15.4A7 7 0 0 1 15.5 3.5z" />
      </svg>
      <span className={s.line} />
    </div>
  );
}

/** Lantern glow and paper grain behind a black section. */
export function Lantern() {
  return (
    <>
      <div className={s.lantern} aria-hidden="true" />
      <div className={s.grain} aria-hidden="true" />
    </>
  );
}

/** Small brass lantern above a story title: sways, flickers, warm glow
    over the words (Tom 2026-10-11, lantern option 1). */
export function StoryLantern() {
  return (
    <>
      <div className={s.storyGlow} aria-hidden="true" />
      <svg className={s.storyLantern} viewBox="0 0 46 72" aria-hidden="true">
        <path className={s.lFrame} d="M23 0v8M17 8h12" />
        <path className={s.lCap} d="M12 18 L23 9 L34 18Z" />
        <rect className={s.lGlass} x="12" y="18" width="22" height="34" rx="3" />
        <path className={s.lFrame} d="M12 18v34M34 18v34M23 18v34" />
        <path className={s.lFlame} d="M23 30c4 5 5 9 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" />
        <rect className={s.lCap} x="9" y="52" width="28" height="6" rx="2" />
      </svg>
    </>
  );
}

/** Ragged edge, filled with the neighbouring section's colour. */
export function TornEdge({ fill, at }: { fill: string; at: "top" | "bottom" }) {
  return (
    <svg
      className={`${s.torn} ${at === "top" ? s.tornTop : s.tornBottom}`}
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill={fill}
        d="M0 0H1200V10L1150 22 1090 8 1020 20 950 6 880 24 800 10 720 22 640 6 560 20 480 8 400 24 320 10 240 22 160 6 80 20 0 8Z"
      />
    </svg>
  );
}
