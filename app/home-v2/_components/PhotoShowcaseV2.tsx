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
    src: "/images/tour/group-cathedral-lawn.jpg",
    alt: "Norwich Free Walking Tour group on the Cathedral lawn at the end of the tour",
    title: "The whole city in one walk.",
    body: "1h 45m that makes sense of the medieval centre. Most guests say it's the best thing they did first.",
    pin: "best thing first",
  },
  {
    label: "A list to come back to",
    src: "/images/tour/guide-norwich-market.jpg",
    alt: "Guide at Norwich Market pointing out an independent food stall",
    title: "Places to come back to tomorrow.",
    body: "Save the spots that catch your eye on the walk. Eat, drink, browse, return. Norwich rewards a second visit.",
    pin: "save the spots",
  },
  {
    label: "A local to ask",
    src: "/images/tour/group-britons-arms.jpg",
    alt: "Tom guiding a tour group outside the Britons Arms on Elm Hill",
    title: "Someone you can actually ask.",
    body: "Got a question about Norwich? Tom's lived here years. Ask about food, kids' stuff, where to drink, what's worth your time.",
    pin: "ask anything",
  },
];

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

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 text-brand-accent" aria-hidden="true">
    <path d="M7 6h4v8H7c-2 0-3-1-3-3v-1c0-2 1-4 3-4zm6 0h4v8h-4c-2 0-3-1-3-3v-1c0-2 1-4 3-4z"/>
  </svg>
);

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

          <div className="flex items-start gap-3 border-l-2 border-brand-accent/40 pl-4 py-1 max-w-xl">
            <QuoteIcon />
            <div>
              <p
                className="italic text-lg text-brand-text leading-snug"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                It&apos;s like a walking visitor centre with a local.
              </p>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground mt-1"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                &mdash; what guests say
              </p>
            </div>
          </div>
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

        {/* Three equal-weight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cards.map((card, idx) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              {/* Image — clean, no floating chrome */}
              <div className="relative rounded-md overflow-hidden aspect-square mb-5">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
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
              <p
                className="text-[15px] text-muted-foreground leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {card.body}
              </p>
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
