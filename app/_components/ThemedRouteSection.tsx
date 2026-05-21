"use client";

// ThemedRouteSection — replaces the 12-stop numbered list with 3
// thematic groupings on /home-v2.
//
// Why: Tom's feedback — a list of 12 unfamiliar Norwich place names
// (Tombland, Fye Bridge, St Andrews Hall…) means nothing to a
// first-time visitor. Outcomes + groupings sell the value of the
// route. Stop names still appear inline within each group, so the
// SEO entity signals (Norwich Cathedral, Elm Hill, etc) stay on
// the page; Google still sees them.
//
// Visual motif: a wiggly green dashed thread on the left connects
// 3 pin-drop markers (one per group). Markers drop in sequentially
// as the section enters viewport — the "pin drop" brand language
// Tom asked for.

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";

interface Group {
  eyebrow: string;
  headline: string;
  stops: string;
  body: string;
}

// Restructured per Tom's review — back to the original three
// PhotoShowcase categories (Indie / Living / Historical) reframed
// as route threads. Each thread groups 4 of the 12 stops. The
// previous Card 3 body had invented specifics (Witch trials /
// Paddington / etc.) — rewritten with only documented facts.
const groups: Group[] = [
  {
    eyebrow: "What you'll see",
    headline: "The medieval heart.",
    stops: "Cathedral · Castle · Guildhall · St Andrews Hall",
    body: "Nearly a thousand years of stories, all within ten minutes of each other on foot. Norman fortress, England's largest provincial medieval guildhall, the cathedral that's been the city's compass since 1096.",
  },
  {
    eyebrow: "Where you'll go",
    headline: "The independent Norwich.",
    stops: "The Lanes · Norwich Market · The Arcade · London Street",
    body: "Where locals actually queue. Independent shops you won't find on any high street, the oldest open-air market in the country, the first pedestrianised street in the UK.",
  },
  {
    eyebrow: "Why people stay",
    headline: "The best city to live in the UK in 2026.",
    stops: "The Forum · Elm Hill · Tombland · Fye Bridge",
    body: "That's the Sunday Times verdict. Modern arts hub. Film-set cobbles. A river that runs through it all. Walk it and you see why people stay.",
  },
];

// Pin marker SVG — green map-pin with the group number inside.
function PinMarker({ index }: { index: number }) {
  return (
    <span className="relative inline-flex items-center justify-center w-9 h-11">
      <svg viewBox="0 0 32 40" className="w-9 h-11 drop-shadow-sm" aria-hidden="true">
        <path
          d="M 16 1 C 7.7 1 1 7.7 1 16 c 0 12 15 23 15 23 s 15 -11 15 -23 C 31 7.7 24.3 1 16 1 z"
          fill="#2DA96B"
          stroke="#FCFAF8"
          strokeWidth="2"
        />
      </svg>
      <span
        className="absolute text-white font-bold text-sm"
        style={{ fontFamily: "var(--font-lora), Georgia, serif", top: "8px" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </span>
  );
}

export function ThemedRouteSection() {
  // Mobile-only: which group is expanded. -1 = all collapsed by default.
  // On lg+ all three groups stay open (existing behaviour) — the
  // collapse logic only renders below the lg breakpoint via CSS.
  const [expandedIndex, setExpandedIndex] = useState(-1);

  return (
    <section id="tour-map" className="section-padding">
      <div className="brand-container">
        {/* Heading — Lora→Caveat pattern */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p
            className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            The walk
          </p>
          <h2 className="leading-[1.0]">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Three threads through
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              the medieval city.
            </span>
          </h2>
          {/* Meta line dropped per Tom — length and end location both
              vary by tour. Not safe to state as fact on the homepage. */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-start">
          {/* Left: 3 thematic groups with wiggly thread + pin markers */}
          <div className="relative">
            {/* Wiggly dashed thread — connects the 3 pin markers vertically */}
            <svg
              width="38"
              height="100%"
              viewBox="0 0 38 480"
              preserveAspectRatio="none"
              className="absolute left-0 top-0 h-full pointer-events-none"
              aria-hidden="true"
            >
              <path
                d="M 19 30 Q 4 130 19 230 Q 34 330 19 450"
                stroke="#2DA96B"
                strokeWidth="2"
                strokeDasharray="1 7"
                strokeLinecap="round"
                opacity="0.45"
                fill="none"
              />
            </svg>

            <ol className="flex flex-col gap-10 relative">
              {groups.map((group, i) => {
                const isExpanded = expandedIndex === i;
                return (
                  <li key={i} className="flex gap-6 items-start">
                    {/* Animated pin marker — drops in sequentially */}
                    <motion.div
                      initial={{ opacity: 0, y: -28, scale: 0.85 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.18,
                        type: "spring",
                        stiffness: 220,
                        damping: 16,
                      }}
                      className="shrink-0 z-10"
                    >
                      <PinMarker index={i} />
                    </motion.div>

                    {/* Content. On mobile (< lg) only the expanded group
                        shows its stops + body; headers act as accordion
                        triggers with a +/- chevron. On lg+ everything is
                        always expanded. */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: i * 0.18 + 0.15 }}
                      className="flex-1 min-w-0"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedIndex(isExpanded ? -1 : i)
                        }
                        aria-expanded={isExpanded}
                        className="w-full text-left lg:cursor-default lg:pointer-events-none group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-brand-accent-text text-[11px] font-semibold tracking-[0.18em] uppercase mb-2"
                              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                            >
                              {group.eyebrow}
                            </p>
                            <h3
                              className="text-2xl md:text-[28px] font-bold text-brand-text leading-tight mb-2"
                              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                            >
                              {group.headline}
                            </h3>
                          </div>
                          {/* Chevron — mobile only, hidden on lg+ */}
                          <span
                            aria-hidden="true"
                            className="lg:hidden flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-150"
                          >
                            {isExpanded ? (
                              <Minus className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </div>
                      </button>

                      {/* Stops + body — animated collapse on mobile,
                          always shown on lg+. */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden lg:!h-auto lg:!opacity-100"
                          >
                            <p
                              className="text-sm text-brand-accent-text font-semibold tracking-wide mb-3"
                              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                            >
                              {group.stops}
                            </p>
                            <p
                              className="text-[15px] text-muted-foreground leading-relaxed"
                              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                            >
                              {group.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {/* On lg+ always render the content even when
                          collapsed-on-mobile state would have hidden it. */}
                      {!isExpanded && (
                        <div className="hidden lg:block">
                          <p
                            className="text-sm text-brand-accent-text font-semibold tracking-wide mb-3"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            {group.stops}
                          </p>
                          <p
                            className="text-[15px] text-muted-foreground leading-relaxed"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            {group.body}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: map */}
          <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden">
            <div className="px-4 pt-4 pb-2 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="#2DA96B" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                <path d="M 12 1 C 6 1 1 6 1 12 c 0 8 11 17 11 17 s 11 -9 11 -17 C 23 6 18 1 12 1 z" />
              </svg>
              <p className="font-caveat text-xl font-bold text-brand-text">
                Map of the Route
              </p>
            </div>
            <Image
              src="/images/route-map.png"
              alt="Hand-drawn route map of the Norwich Free Walking Tours showing all 12 stops from The Forum to Norwich Cathedral."
              width={1500}
              height={1155}
              className="w-full h-auto"
            />
            <p
              className="px-4 py-2 text-xs text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Map of Norwich City Centre
            </p>
          </div>
        </div>

        {/* Quiet link to /tour where every stop has photo + paragraph */}
        <div className="mt-12 text-center">
          <a
            href="/tour"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-accent-text hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            See every stop, in order, with the full story
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
