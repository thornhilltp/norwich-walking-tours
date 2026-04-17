"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Coins } from "lucide-react";

export function TipAnchor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section-padding bg-brand-bg">
      <div className="brand-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl border border-brand-accent/20 shadow-sm p-8 md:p-12 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-brand-accent/10 flex items-center justify-center mb-5">
            <Coins className="w-6 h-6 text-brand-accent" aria-hidden="true" />
          </div>

          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            How the pay-at-the-end bit works
          </p>

          <h2 className="font-caveat text-5xl md:text-6xl font-bold text-brand-text leading-tight mb-4">
            On a good day, guests tip £15 to £20 per person.
          </h2>

          <p
            className="text-lg md:text-xl text-brand-text/90 leading-relaxed mb-4 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Pay less, pay more, or pay nothing. All of those are fine.
          </p>

          <p
            className="text-base text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Our guides do this full time, and the tip is how they get paid. That&apos;s it. No awkwardness, no pressure, no price list.
          </p>

          <p
            className="text-sm italic text-brand-accent font-semibold"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Card, Apple Pay, Google Pay, or cash.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
