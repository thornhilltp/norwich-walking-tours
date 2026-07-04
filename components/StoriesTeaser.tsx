"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const chips = [
  "Julian of Norwich",
  "The Strangers",
  "Colman's mustard",
  "Norwich Union",
  "Boudicca",
  "Kett's Rebellion",
  "WW2 Baedeker raids",
  "Edith Cavell",
  "Sir Thomas Browne",
  "Stephen Fry",
  "Cathedral cloisters",
  "The Fat Cat",
  "Jarrolds",
  "Grosvenor Fish & Chips",
];

interface StoriesTeaserProps {
  /** Hide the bottom "See the full route" CTA. Used when the component sits on /tour itself. */
  hideCta?: boolean;
}

export function StoriesTeaser({ hideCta = false }: StoriesTeaserProps = {}) {
  return (
    <section className="section-padding bg-brand-bg">
      <div className="brand-container max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Stories on the route
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-4 leading-tight">
            More than a list of stops.
          </h2>
          <p
            className="text-lg text-muted-foreground leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Here&apos;s what your guide actually tells stories about as you walk.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
          aria-label="Topics your guide covers on the tour"
        >
          {chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-accent-light text-brand-text text-sm font-medium border border-brand-accent/15"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {chip}
            </li>
          ))}
        </motion.ul>

        {!hideCta && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <a
              href="/tour"
              onClick={() =>
                trackEvent("view_route_click", { location: "stories_teaser" })
              }
              className="btn-cta inline-flex items-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg shadow-md"
            >
              See the full route
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <p
              className="mt-3 text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              All covered on the 2-hour walk.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
