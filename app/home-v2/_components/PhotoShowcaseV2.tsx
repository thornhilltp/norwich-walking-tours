"use client";

// PhotoShowcaseV2 — local-recs section.
// Iteration 3 per Tom's feedback: the previous Tom-voice headline +
// 3 "specific outcome" cards were stylistically distinctive but lost
// the directness of the live / version. This iteration:
//   - restores live /'s "Local recommendations to help you make the
//     most of Norwich" H2 (Lora→Caveat split)
//   - adds the customer-quote pull-out "It's like a walking visitor
//     centre with a local" — gold customer language
//   - restores the 4 outcome bullets + "Already a Norwich local?" line
//   - reframes 3 cards from specific outcomes to "It's like…"
//     conversion-driven framings (overview / list to come back to /
//     local to ask) — addresses what visitors fear or want, not what
//     the tour contains (the bullets handle that).

import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    label: "An overview",
    src: "/images/tour/group-cathedral-lawn.jpg",
    alt: "Norwich Free Walking Tour group on the Cathedral lawn",
    title: "The whole city in one walk.",
    body: "1h 45m that makes sense of the medieval centre. Most guests say it's the best thing they did first.",
    pin: "best thing to do first",
  },
  {
    label: "A list to come back to",
    src: "/images/tour/guide-norwich-market.jpg",
    alt: "Tour guide at Norwich Market explaining the independent food stalls",
    title: "Places to come back to tomorrow.",
    body: "Save the spots that catch your eye on the walk. Eat, drink, browse, return. Norwich rewards a second visit.",
    pin: "save the spots",
  },
  {
    label: "A local to ask",
    src: "/images/tour/group-britons-arms.jpg",
    alt: "Tom guiding a tour group outside the Britons Arms on Elm Hill",
    title: "Someone you can actually ask.",
    body: "Got a question about Norwich? Tom's lived here for years. Ask about food, kids' stuff, where to drink, what's worth your time.",
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

const bullets = [
  "The best places to eat and drink",
  "The photo spots",
  "The stories and history that bring the city to life",
  "The corners you'd otherwise walk past",
];

export function PhotoShowcaseV2() {
  return (
    <section id="stories" className="section-padding">
      <div className="brand-container">
        {/* Heading + lede + customer quote + bullets — restored from live /
            for direct outcome language. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          {/* SEO: 'Norwich walking tour' is an exact-match target phrase —
              kept in the most prominent typographic slot. */}
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

          {/* Customer quote pull-out — actual guest language used to describe
              the experience. Gold for conversion. */}
          <div className="flex items-start gap-3 border-l-2 border-brand-accent/40 pl-4 py-1 mb-7 max-w-xl">
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

          <p
            className="text-lg text-brand-text/85 leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Every tour comes with local recommendations from people who live here:
          </p>
          <ul
            className="space-y-2 text-lg text-brand-text/85 mb-5"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-brand-accent font-bold mt-1" aria-hidden="true">&bull;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p
            className="italic text-base text-muted-foreground"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Already a Norwich local? Many residents join too and still pick up something new.
          </p>
        </motion.div>

        {/* Three text-led cards — reframed from "what's in the tour"
            (the bullets cover that) to "what it feels like to have
            booked it" (overview / list to come back to / local to ask). */}
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
              {/* Image with top-left pill label */}
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
              <span
                className="inline-flex items-center gap-1.5 italic text-brand-accent-text text-lg font-medium"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                <MapPinIcon />
                {card.pin}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
