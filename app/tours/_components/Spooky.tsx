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
