"use client";

// The grey girl from Holly's Dark History reel (marketing/video/holly-dark-history,
// lib/figures.js): a storybook figure made of typewriter letters on cream
// paper. Peeks out of the corner of the Dark History polaroid on the brand
// homepage (Tom 2026-10-18). Fades and drifts in; still under reduced motion.

import { useId } from "react";
import s from "./letterGirl.module.css";

const GIRL = "M150 30 C166 28 178 36 182 50 C184 56 186 60 190 68 C192 72 190 75 185 77 C186 80 188 83 186 86 C184 88 184 90 185 93 C186 98 183 103 176 105 C171 106 168 110 167 118 C167 126 170 134 176 142 C186 152 192 168 190 186 C188 204 176 220 172 238 C178 290 196 360 212 440 C222 500 232 550 238 590 L62 590 C70 540 84 470 100 400 C110 340 124 280 130 240 C122 214 118 186 122 160 C124 146 132 132 138 120 C134 112 126 104 120 92 C114 78 114 62 120 50 C126 38 138 30 150 30 Z M118 40 C130 40 136 50 134 62 C132 72 122 76 112 72 C104 68 102 56 106 48 C109 43 113 40 118 40 Z";
const GIRL_CUTS = "M142 152 C136 200 140 250 154 294 M172 154 C178 200 180 250 170 294 M154 294 C158 300 166 300 170 294 M150 360 C156 440 160 520 158 590 M190 420 C200 480 210 540 214 590";
const PHRASE = "the grey girl of tombland alley ";

export function LetterGirl({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const rows = [];
  for (let y = 12, i = 0; y <= 600; y += 9.5, i++) {
    rows.push(
      <text key={i} x="0" y={y.toFixed(1)} style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: 10, letterSpacing: 0.5, fill: "#2b2622" }}>
        {PHRASE.slice(i % PHRASE.length) + PHRASE.repeat(4)}
      </text>,
    );
  }
  return (
    <svg viewBox="40 20 220 580" className={`${s.girl} ${className}`} aria-hidden="true">
      <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="340" height="640">
        <path d={GIRL} fill="#fff" />
        <path d={GIRL_CUTS} stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      </mask>
      <g mask={`url(#m${id})`}>
        <rect x="-10" y="-10" width="320" height="620" fill="#ece3d0" />
        {rows}
      </g>
    </svg>
  );
}
