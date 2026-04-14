"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { tourStops } from "@/lib/tourStops";

export function TourStops({ hideHeader = false }: { hideHeader?: boolean }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div ref={sectionRef}>
      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            What you&apos;ll see
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
            11 places. Most visitors miss half.
          </h2>
        </motion.div>
      )}

      {/* Stop grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tourStops.map((stop, index) => (
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 border border-brand-accent/10 shadow-sm hover:border-brand-accent/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            {/* Number badge */}
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent text-white text-xs font-bold font-lora flex items-center justify-center mt-0.5">
              {stop.id}
            </span>

            {/* Text */}
            <div className="min-w-0">
              <p className="font-caveat text-xl font-bold text-brand-text leading-snug group-hover:text-brand-accent transition-colors duration-150">
                {stop.name}
              </p>
              <p className="font-lora text-sm text-muted-foreground leading-relaxed mt-0.5">
                {stop.teaser}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6"
      >
        <a
          href="/tour"
          className="inline-flex items-center gap-1.5 font-lora text-sm font-semibold text-brand-accent hover:underline underline-offset-2"
        >
          Read the full story for each stop
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </motion.div>
    </div>
  );
}
