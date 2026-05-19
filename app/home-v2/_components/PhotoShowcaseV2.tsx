"use client";

// PhotoShowcaseV2 — iteration 5 (Tom's design review).
//
// Changes from iteration 4:
// - Dropped the pin row + dashed thread connector above the cards
//   (duplicated ThemedRouteSection's pin language — diluted both
//   instances). Pin motif now lives only on ThemedRouteSection +
//   ScrollTrail where it's earned by literal route content.
// - Dropped the embedded bullet list from Card 01 (made it visually
//   heavier than Cards 02/03 — asymmetric grid).
// - NEW: 4-benefit horizontal row between the customer quote and
//   the cards. Centred, small green dot separators, single line on
//   desktop / wraps on mobile. Acts as a quick visual beat
//   conveying the "you'll come away with" outcomes without
//   competing with the cards for content weight.
// - All 3 cards now equal weight: image + title + body + pin label.

import Image from "next/image";
import { motion } from "framer-motion";

// Card 2 ('A list to come back to / Places to come back to tomorrow')
// dropped per Tom — it was the weakest card, partly duplicated the
// 4-benefit row above, and didn't earn its column. Now 2 cards
// centred. Polaroid paper tones varied per Tom (white + cream).
const cards = [
  {
    label: "An overview",
    src: "/images/tour/what-is-free-tour.jpg",
    alt: "Norwich Free Walking Tour group walking together with their guide, mid-tour",
    title: "The whole city in one walk.",
    quote: "It's like a walking visitor centre with a local.",
    quoteAttribution: "what guests say",
    pin: "best thing first",
    polaroidBg: "#E8F0E4",
  },
  {
    label: "A local to ask",
    src: "/images/tour/guide-guildhall.jpg",
    alt: "Tom explaining the chequerboard flintwork on Norwich Guildhall to a small tour group",
    title: "Someone you can actually ask.",
    body: "Got a question about Norwich? Tom's lived here years. Ask about food, kids' stuff, where to drink, what's worth your time.",
    pin: "ask anything",
    polaroidBg: "#F5EBDA",
  },
] as const;

// Reordered + combined per Tom 2026-05-19. Stories leads (the highest-
// value differentiator), then a combined eat/drink/photo line, then the
// 'hidden corners' line. Down from 4 to 3 items — tighter visual beat.
const benefits = [
  "Stories & history",
  "Best places to eat, drink & photograph",
  "Corners you'd otherwise miss",
];

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// QuoteIcon removed — was used in the heading-area quote block,
// which moved into Card 1 with its own border-l accent (no icon).

export function PhotoShowcaseV2() {
  return (
    <section id="stories" className="section-padding">
      <div className="brand-container">
        {/* Heading + customer quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <p
            className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Norwich walking tour
          </p>
          <h2 className="leading-[1.0] mb-6">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Local recommendations to help you
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              make the most of Norwich.
            </span>
          </h2>

          {/* Customer quote moved into Card 1 body per Tom's feedback —
              gives the "overview" card its own anchor without needing
              extra page chrome here. */}
        </motion.div>

        {/* 4-benefit horizontal row — replaces the standalone bullet list
            AND the embedded bullets in Card 01. Sits between the customer
            quote and the cards as a quick visual beat. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-12"
        >
          {benefits.map((b) => (
            <span key={b} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0"
                aria-hidden="true"
              />
              <span
                className="text-[15px] font-medium text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {b}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Two cards now (was 3). Centred max-w-4xl grid keeps them
            visually anchored rather than left-aligned with empty 3rd col. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-4 max-w-4xl mx-auto">
          {cards.map((card, idx) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              {/* Polaroid frame — paper tone varies per card (Tom's
                  pick). Slight rotation for "stuck on a wall" feel. */}
              <div
                className="relative p-2.5 pb-10 shadow-lg border border-brand-text/5 mb-6 self-stretch"
                style={{
                  backgroundColor: card.polaroidBg,
                  transform: `rotate(${idx === 0 ? "-1.2deg" : "0.8deg"})`,
                }}
              >
                {/* Masking tape on top — yellowy translucent */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm shadow-sm"
                  style={{
                    backgroundColor: "rgba(241, 225, 161, 0.75)",
                    borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                  }}
                />
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 33vw"
                  />
                </div>
                {/* Polaroid caption — Caveat handwritten (Tom's pick).
                    Reads as a marker-pen note on a real photo, not a
                    formal Lora label. */}
                <p
                  className="absolute bottom-2 left-3 text-[20px] italic font-bold text-brand-text"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {card.label}
                </p>
              </div>

              {/* Labels dropped entirely. Title already conveys what the
                  label was trying to label ('An overview' → 'The whole
                  city in one walk'). The label was meta-narration of
                  content the title already carries. */}
              <h3
                className="font-bold text-[22px] leading-[1.2] text-brand-text mb-2.5"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {card.title}
              </h3>
              {/* Card body — either prose paragraph OR a customer quote
                  block (Card 1 uses the quote per Tom's reframe). */}
              {"quote" in card && card.quote ? (
                <div className="border-l-2 border-brand-accent/40 pl-3 mb-4">
                  <p
                    className="italic text-[20px] text-brand-text leading-snug"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    &ldquo;{card.quote}&rdquo;
                  </p>
                  <p
                    className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-1"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {card.quoteAttribution}
                  </p>
                </div>
              ) : (
                <p
                  className="text-[15px] text-muted-foreground leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {("body" in card ? card.body : "") as string}
                </p>
              )}
              <span
                className="inline-flex items-center gap-1.5 italic text-brand-accent-text text-lg font-medium mt-auto"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                <MapPinIcon />
                {card.pin}
              </span>
            </motion.article>
          ))}
        </div>

        {/* "Already a Norwich local?" — small aside below the cards. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center italic text-base text-muted-foreground"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Already a Norwich local? Many residents join too and still pick up something new.
        </motion.p>
      </div>
    </section>
  );
}
