"use client";

// HeroSlideshow — crossfading photo background for HeroV2.
// Slide 1 renders in server HTML with `priority` so LCP is unchanged.
// The rest only mount after hydration, so first paint downloads one photo.
// Auto-advance stops for users with prefers-reduced-motion (they see slide 1).

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type HeroSlide = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center 55%". */
  position?: string;
};

const SLIDE_MS = 6000;
const FADE_S = 1.6;

// `slideMs` (optional): time per photo. Defaults to SLIDE_MS.
export function HeroSlideshow({ slides, slideMs = SLIDE_MS }: { slides: HeroSlide[]; slideMs?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      slideMs
    );
    return () => window.clearInterval(id);
  }, [reduce, slides.length, slideMs]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {slides.map((slide, i) => {
        const active = i === index;
        if (i > 0 && !mounted) return null;
        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1.06 : 1 }}
            transition={{
              opacity: { duration: FADE_S, ease: "easeInOut" },
              scale: { duration: slideMs / 1000 + FADE_S, ease: "linear" },
            }}
          >
            <Image
              src={slide.src}
              alt={i === 0 ? slide.alt : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.position ?? "center" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
