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
import { Fragment } from "react";

const cards = [
  {
    label: "An overview",
    // Swapped from group-cathedral-lawn → elm-hill-tour: more
    // iconic Norwich shot, recognisable to visitors even before
    // they've been (cobbled medieval street is the city's
    // most-photographed view).
    src: "/images/tour/elm-hill-tour.jpg",
    alt: "Elm Hill, Norwich's most-photographed cobbled medieval street, on the Norwich Free Walking Tour",
    title: "The whole city in one walk.",
    // Card 1 body is now the customer quote (moved from the heading
    // area above per Tom). Rendered as italic Caveat with attribution.
    quote: "It's like a walking visitor centre with a local.",
    quoteAttribution: "what guests say",
    pin: "best thing first",
  },
  {
    label: "A list to come back to",
    // Swapped from guide-norwich-market → norwich-market-sun-stock:
    // wider market shot without a tour group in it. Says "this is
    // the kind of place you'd come back to" rather than "this is
    // what the tour group looks like" (which is what the other
    // cards' photos cover).
    src: "/images/norwich-market-sun-stock.png",
    alt: "Norwich Market, one of England's oldest open-air markets, with colourful stall awnings in afternoon sun",
    title: "Places to come back to tomorrow.",
    body: "Save the spots that catch your eye on the walk. Eat, drink, browse, return. Norwich rewards a second visit.",
    pin: "save the spots",
  },
  {
    label: "A local to ask",
    // Swapped from group-britons-arms → guide-guildhall: tighter
    // crop, guide explaining something to a small group. Reads as
    // "personal access to a local" not "a tour crowd".
    src: "/images/tour/guide-guildhall.jpg",
    alt: "Tom explaining the chequerboard flintwork on Norwich Guildhall to a small tour group",
    title: "Someone you can actually ask.",
    body: "Got a question about Norwich? Tom's lived here years. Ask about food, kids' stuff, where to drink, what's worth your time.",
    pin: "ask anything",
  },
] as const;

const benefits = [
  "Best places to eat & drink",
  "Photo spots",
  "Stories & history",
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
          {benefits.map((b, i) => (
            <Fragment key={b}>
              {i > 0 && (
                <span
                  className="text-brand-accent/40 hidden sm:inline"
                  aria-hidden="true"
                >
                  &bull;
                </span>
              )}
              <span className="flex items-center gap-2">
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
            </Fragment>
          ))}
        </motion.div>

        {/* Three equal-weight cards. Each image is wrapped in a polaroid
            frame (matches About section's portrait polaroid for visual
            consistency) with a piece of masking tape at the top. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-7 mt-4">
          {cards.map((card, idx) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              {/* Polaroid frame — white card, image + small caption.
                  Slight rotation per card for "stuck on a wall" feel. */}
              <div
                className="relative bg-white p-2.5 pb-10 shadow-lg border border-brand-text/5 mb-6 self-stretch"
                style={{
                  transform: `rotate(${idx === 0 ? "-1.2deg" : idx === 1 ? "0.8deg" : "-0.6deg"})`,
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
                {/* Polaroid caption — short location/topic label */}
                <p
                  className="absolute bottom-3 left-3 text-[9px] tracking-[0.1em] uppercase text-brand-text/55 font-semibold"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
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
                    &mdash; {card.quoteAttribution}
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
