"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const usps = [
  {
    icon: "🍜",
    title: "Food & bars",
    body: "The restaurants locals actually go to. The pubs hidden down alleys. The coffee spot that has no sign on the door.",
  },
  {
    icon: "📸",
    title: "Photo spots",
    body: "Elm Hill at the right time of day. The Wensum from Fye Bridge. The cathedral nave from the far end. You'll know them when you see them.",
  },
  {
    icon: "📖",
    title: "The real history",
    body: "Our favourite stories. The ones that connect you to this place. Not dates and kings. The stuff that makes you think 'I had no idea.'",
  },
];

export function InvisibleCity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-brand-bg overflow-hidden relative">
      {/* River Wensum background accent — right side, subtle */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-8 hidden lg:block overflow-hidden" aria-hidden="true">
        <Image
          src="/images/river-wensum-stock.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/60 to-brand-bg/10" />
      </div>

      <div className="brand-container relative z-10">
        <div className="max-w-3xl">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Why this tour
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Norwich&apos;s best bits are hidden behind flint walls.
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Most people walk straight past the good stuff. The medieval lanes tucked behind the market.
            The cathedral close you only reach through a gap in a wall. The pub where every detail is
            700 years old.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            This isn&apos;t a script for coach parties. It&apos;s the version of Norwich that locals
            actually care about. The best food, the photo spots, the rebellious history, the stories
            that make you feel connected.
          </motion.p>

          {/* USP cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {usps.map((usp, index) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                className="bg-brand-accent-light rounded-xl p-5 border border-brand-accent/12"
              >
                <div className="text-2xl mb-3" aria-hidden="true">{usp.icon}</div>
                <h3 className="font-caveat text-xl font-bold mb-2" style={{ color: "var(--color-brand-accent)" }}>{usp.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  {usp.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Accent rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 w-16 bg-brand-accent rounded-full origin-left mb-8"
            aria-hidden="true"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="/book"
              className="btn-cta inline-flex items-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg"
            >
              Book your free spot
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
