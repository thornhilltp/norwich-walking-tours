"use client";

// PhotoShowcaseV2 — iteration 4 (Tom feedback this round).
//
// Changes from iteration 3:
// - Dropped the standalone 4-bullet list. The bullets are now woven
//   into Card 01 ("The whole city in one walk") which becomes the
//   featured card with embedded outcomes.
// - Added a visual route motif across the 3 cards: numbered green
//   pin markers (01, 02, 03) at the top of each card, connected by
//   a horizontal dashed green thread on desktop. Extends the
//   pin-drop language from ThemedRouteSection + ScrollTrail into
//   PhotoShowcase — site-wide design system.
// - "Already a Norwich local?" note now sits below the cards as a
//   small italic aside.

import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    number: "01",
    label: "An overview",
    src: "/images/tour/group-cathedral-lawn.jpg",
    alt: "Norwich Free Walking Tour group on the Cathedral lawn at the end of the tour",
    title: "The whole city in one walk.",
    body: "1h 45m that makes sense of the medieval centre. Most guests say it's the best thing they did first.",
    // Bullets embedded — the "what you'll come away with" list that
    // used to sit standalone above the cards now belongs here.
    bullets: [
      "The best places to eat and drink",
      "The photo spots",
      "The stories and history",
      "The corners tourists miss",
    ],
    pin: "best thing first",
  },
  {
    number: "02",
    label: "A list to come back to",
    src: "/images/tour/guide-norwich-market.jpg",
    alt: "Guide at Norwich Market pointing out an independent food stall",
    title: "Places to come back to tomorrow.",
    body: "Save the spots that catch your eye on the walk. Eat, drink, browse, return. Norwich rewards a second visit.",
    pin: "save the spots",
  },
  {
    number: "03",
    label: "A local to ask",
    src: "/images/tour/group-britons-arms.jpg",
    alt: "Tom guiding a tour group outside the Britons Arms on Elm Hill",
    title: "Someone you can actually ask.",
    body: "Got a question about Norwich? Tom's lived here years. Ask about food, kids' stuff, where to drink, what's worth your time.",
    pin: "ask anything",
  },
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

// Numbered green pin marker — same shape as ThemedRouteSection's,
// site-wide pin-drop visual language.
function NumberPin({ value }: { value: string }) {
  return (
    <span className="relative inline-flex items-center justify-center w-10 h-12">
      <svg viewBox="0 0 32 40" className="w-10 h-12 drop-shadow-sm" aria-hidden="true">
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
        {value}
      </span>
    </span>
  );
}

export function PhotoShowcaseV2() {
  return (
    <section id="stories" className="section-padding">
      <div className="brand-container">
        {/* Heading + customer quote — drives the "walking visitor centre"
            framing. Bullets removed (now embedded in Card 01). */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p
            className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Norwich walking tour
          </p>
          <h2 className="leading-[1.0] mb-6">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-bold leading-[1.05] tracking-tight text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Local recommendations to help you
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
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

        {/* Pin row + dashed connector — only visible on desktop where
            the cards sit in a row. On mobile (stacked) we skip the
            connector to avoid a meaningless vertical line. */}
        <div className="relative hidden md:block mb-3">
          {/* Horizontal dashed thread, sits behind the pins */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-[15%]" aria-hidden="true">
            <svg width="100%" height="6" preserveAspectRatio="none" className="overflow-visible">
              <line
                x1="0"
                y1="3"
                x2="100%"
                y2="3"
                stroke="#2DA96B"
                strokeWidth="2"
                strokeDasharray="1 7"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>
          {/* The 3 pins, positioned where their cards will sit */}
          <div className="relative grid grid-cols-3 gap-7">
            {cards.map((card, idx) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: -22, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                }}
                className="flex justify-center"
              >
                <NumberPin value={card.number} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Three cards */}
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
              {/* Mobile-only pin (desktop has the pin row above) */}
              <div className="md:hidden flex justify-center mb-3">
                <NumberPin value={card.number} />
              </div>

              <div className="relative rounded-md overflow-hidden aspect-square mb-5">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute top-3.5 left-3.5 bg-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {card.label}
                </div>
              </div>

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

              {/* Embedded bullets — only on Card 01 (the "overview" card),
                  carrying the outcome list that used to sit standalone
                  above the cards. */}
              {card.bullets && (
                <ul
                  className="space-y-1.5 mb-4 text-[14px] text-brand-text/85"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-brand-accent font-bold mt-0.5" aria-hidden="true">&bull;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
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

        {/* "Already a Norwich local?" — moved below the cards as a
            small italic aside. Validates locals, doesn't dominate. */}
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
