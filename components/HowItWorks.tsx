"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/tracking";

const steps = [
  {
    number: "01",
    title: "Book your spot",
    sub: "Reserve your place online. It's free.",
    detail: "Free to book",
    image: "/images/clock-tower-stock.png",
    imageAlt: "The Forum and Norwich Market clock tower meeting point",
  },
  {
    number: "02",
    title: "Meet your guide at The Forum",
    sub: "1 hour 45 minutes, relaxed pace through Norwich's best bits.",
    detail: "1h 45m, easy underfoot",
    image: "/images/st-georges-stock.png",
    imageAlt: "St George's Street, Norwich medieval cobbled street",
  },
  {
    number: "03",
    title: "Pay what it was worth",
    sub: "Tip what it was worth. Our guides do this full time.",
    detail: "Pay at the end",
    image: "/images/norwich-cathedral-stock.png",
    imageAlt: "Norwich Cathedral, end point of the walking tour",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-brand-accent-light">
      <div className="brand-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            How it works
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold">
            Three steps. No faff.
          </h2>
        </motion.div>

        {/* Steps — photo-led with connectors */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-accent/12 group md:flex-1"
              >
                {/* Photo */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Step number overlay */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-brand-accent text-white font-bold text-sm flex items-center justify-center shadow-lg" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {index + 1}
                  </div>
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="font-caveat text-2xl font-bold mb-1 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {step.sub}
                  </p>
                  <span className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {step.detail}
                  </span>
                </div>
              </motion.div>

              {/* Connector arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * index + 0.3 }}
                  className="flex items-center justify-center py-3 md:py-0 md:px-2 shrink-0"
                  aria-hidden="true"
                >
                  {/* Wavy arrow — horizontal on desktop, vertical on mobile */}
                  <svg
                    className="hidden md:block"
                    width="44" height="24" viewBox="0 0 44 24" fill="none"
                  >
                    <path
                      d="M2,12 C8,6 14,18 20,12 C26,6 32,18 38,12"
                      stroke="#2DA96B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"
                    />
                    <path
                      d="M34,7 L40,12 L34,17"
                      stroke="#2DA96B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    />
                  </svg>
                  {/* Vertical version for mobile */}
                  <svg
                    className="md:hidden"
                    width="24" height="44" viewBox="0 0 24 44" fill="none"
                  >
                    <path
                      d="M12,2 C6,8 18,14 12,20 C6,26 18,32 12,38"
                      stroke="#2DA96B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"
                    />
                    <path
                      d="M7,34 L12,40 L17,34"
                      stroke="#2DA96B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/book"
            onClick={() => trackEvent("book_cta_click", { location: "how_it_works" })}
            className="btn-cta inline-flex items-center justify-center px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg"
          >
            Book your spot
          </a>
          <p className="mt-3 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Booking required &bull; Free to book &bull; Pay at the end
          </p>
        </motion.div>
      </div>
    </section>
  );
}
