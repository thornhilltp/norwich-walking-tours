"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { whyNorwichQuotes, type WhyNorwichQuote } from "@/lib/whyNorwich";

interface WhyNorwichProps {
  quotes?: WhyNorwichQuote[];
  title?: string;
  subtitle?: string;
}

export function WhyNorwich({
  quotes = whyNorwichQuotes,
  title = "Why Norwich",
  subtitle = "The city others are writing about.",
}: WhyNorwichProps) {
  return (
    <section className="section-padding bg-brand-bg">
      <div className="brand-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            In the press
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold">
            {title}
          </h2>
          <p
            className="mt-3 text-muted-foreground text-lg"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.publication}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-white rounded-2xl border border-brand-accent/15 shadow-sm p-6 md:p-7 flex flex-col"
            >
              <div className="absolute top-0 left-0 h-1 w-16 bg-brand-accent rounded-tl-2xl" />

              <blockquote
                className="text-brand-text text-base md:text-lg leading-relaxed flex-grow"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                &ldquo;{q.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 pt-4 border-t border-brand-accent/10">
                <p className="font-caveat text-xl font-bold text-brand-accent">
                  {q.publication}
                </p>
                <p
                  className="text-sm text-muted-foreground mt-0.5"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {q.context}
                </p>
                <a
                  href={q.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-brand-accent hover:underline"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {q.sourceLabel}
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
