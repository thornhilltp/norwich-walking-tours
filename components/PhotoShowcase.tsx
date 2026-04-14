"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const cityCards = [
  {
    src: "/images/norwich-independant-vibe.png",
    alt: "Norwich independent shops and local businesses in The Lanes",
    label: "Indie",
    caption:
      "Discover Norwich's thriving independent scene. Grassroots music venues, alternative pubs, and shops you won't find anywhere else.",
    color: "from-black/80 via-black/40 to-transparent",
    position: "center 30%",
  },
  {
    src: "/images/norwich-vibey-shop-stock.png",
    alt: "Norwich independent café and street life in the city centre",
    label: "Living",
    caption:
      "Learn what's it like to live in Norwich and why it was ranked as the top place to live in the UK by the Sunday times in March 2026",
    color: "from-black/80 via-black/40 to-transparent",
    position: "center center",
  },
  {
    src: "/images/norwich-castle.png",
    alt: "Norwich Castle, Norman fortress overlooking the city",
    label: "Historical",
    caption:
      "Nine hundred years of history in a city that actually kept it. The stories behind the buildings you'll walk past.",
    color: "from-black/80 via-black/40 to-transparent",
    position: "center 40%",
  },
];

export function PhotoShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-brand-bg">
      <div className="brand-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Your local guide
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold max-w-2xl">
            Norwich through the eyes of someone who lives here.
          </h2>
          <p
            className="mt-4 text-muted-foreground text-lg max-w-2xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            We&apos;ll show you what makes this city special: its medieval
            streets, its independent spirit, and the stories locals take pride
            in.
          </p>
        </motion.div>

        {/* ── Desktop accordion (≥ 768px) ── */}
        <div className="hidden md:flex gap-3 h-[420px]">
          {cityCards.map((card, index) => (
            <motion.button
              key={card.label}
              layout
              onClick={() => setActive(index)}
              aria-expanded={active === index}
              aria-label={`Explore ${card.label}`}
              className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              animate={{ flex: active === index ? 5 : 1 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Image */}
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover"
                style={{ objectPosition: card.position }}
                sizes="(max-width: 768px) 100vw, 60vw"
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${card.color}`}
              />

              {/* Green accent bar — always visible on active */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-brand-accent transition-opacity duration-300 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-accent mb-2"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {card.label}
                </span>

                <AnimatePresence>
                  {active === index && (
                    <motion.p
                      key="caption"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="font-caveat text-xl font-bold text-white leading-tight"
                    >
                      {card.caption}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>

        {/* ── Mobile accordion (< 768px) ── */}
        <div className="flex flex-col gap-3 md:hidden">
          {cityCards.map((card, index) => (
            <div key={card.label} className="rounded-2xl overflow-hidden shadow-md">
              {/* Header button */}
              <button
                onClick={() => setActive(active === index ? -1 : index)}
                aria-expanded={active === index}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-brand-accent/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <span
                  className="text-sm font-semibold tracking-widest uppercase text-brand-accent"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {card.label}
                </span>
                <motion.span
                  animate={{ rotate: active === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-brand-accent text-xl leading-none"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        className="object-cover"
                        style={{ objectPosition: card.position }}
                        sizes="100vw"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${card.color}`}
                      />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="font-caveat text-xl font-bold text-white leading-tight">
                          {card.caption}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <a
            href="/book"
            className="btn-cta inline-flex items-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg"
          >
            Book your spot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
