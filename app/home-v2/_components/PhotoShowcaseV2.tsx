"use client";

// PhotoShowcaseV2 — local-recs section restyled per Tom's reference image #1.
// Keeps the spirit of the original PhotoShowcase (local recs as the
// differentiator) but ditches the interactive accordion in favour of three
// scannable text-led cards: image with corner pill label → Lora bold title →
// Lora body → small Caveat green map-pin label. Lora→Caveat heading pattern
// applied to the H2.

import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    label: "Where to eat",
    src: "/images/tour/guide-norwich-market.jpg",
    alt: "Tour guide at Norwich Market explaining independent food stalls",
    title: "The food spots locals actually queue for.",
    body: "Independent traders we visit or point at, and what to order from each. The market stall every Norwich student knows. The Tudor coffee house behind the cathedral.",
    pin: "where to eat",
  },
  {
    label: "Photo spots",
    src: "/images/tour/elm-hill-tour.jpg",
    alt: "Elm Hill, Norwich's famous cobbled medieval street",
    title: "The corners with the better light.",
    body: "Where to stand on Elm Hill. The bridge view nobody knows about. The angle of the Cathedral that makes it look impossible.",
    pin: "best photo",
  },
  {
    label: "Not in the guidebook",
    src: "/images/tour/group-britons-arms.jpg",
    alt: "The Britons Arms, the thatched-roof Tudor coffee house on Elm Hill",
    title: "The bits that aren't on the plaque.",
    body: "Where the parish records contradict the official record. The vote that saved Elm Hill. The reason Norwich still has more medieval churches per square mile than anywhere in Europe.",
    pin: "the story",
  },
];

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export function PhotoShowcaseV2() {
  return (
    <section id="stories" className="section-padding">
      <div className="brand-container">
        {/* Heading — Lora→Caveat pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          {/* SEO: 'Norwich walking tour' is an exact-match target phrase —
              kept in the most prominent typographic slot. */}
          <p
            className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Norwich walking tour
          </p>
          <h2 className="leading-[1.0] mb-5">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-bold leading-[1.05] tracking-tight text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Norwich, told by
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              someone who walks it for a living.
            </span>
          </h2>
          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Every place on the route has the version you&apos;d read on a plaque. Tom doesn&apos;t tell those. He tells you where his neighbour drinks, the photo spots before the cafes open, and the story behind the things you&apos;d otherwise walk past.
          </p>
        </motion.div>

        {/* Three text-led cards */}
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

              {/* Title — Lora bold serif */}
              <h3
                className="font-bold text-[22px] leading-[1.2] text-brand-text mb-2.5"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                className="text-[15px] text-muted-foreground leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {card.body}
              </p>

              {/* Caveat green pin label */}
              <span
                className="inline-flex items-center gap-1.5 italic text-brand-accent text-lg font-medium"
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
