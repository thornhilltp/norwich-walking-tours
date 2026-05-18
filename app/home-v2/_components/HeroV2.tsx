"use client";

// HeroV2 — experimental Hero for /home-v2.
// Changes vs components/Hero.tsx:
//  - H1 is now the value prop ("See Norwich with someone who walks it for a living.")
//    rather than the brand name. Brand name lives in the nav logo.
//  - Removed third paragraph (was duplicating the subhead's offer).
//  - Removed "See the route" secondary CTA (route is 4 scrolls down).
//  - Standardised tip phrasing: "Tip what it was worth at the end."

import React from "react";
import Image from "next/image";
import { motion, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";
import { googleReviewStats } from "@/lib/testimonials";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";

interface HeroV2Props {
  title: React.ReactNode;
  buttonText: string;
  buttonHref: string;
  widget?: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: "easeOut" as Easing,
    },
  },
};

export function HeroV2({
  title,
  buttonText,
  buttonHref,
  widget,
  className,
}: HeroV2Props) {
  return (
    <section
      id="top"
      className={cn("relative isolate w-full overflow-hidden", className)}
    >
      <Image
        src="/images/tour/group-cathedral-lawn.jpg"
        alt="Tour group walking through Norwich city centre on the Norwich Free Walking Tour"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
        style={{ objectPosition: "center 40%" }}
      />

      {/* Darkened overlay — bumped from /65 to /75 for AA contrast on
          the green Caveat text + the white-opacity supporting lines. */}
      <div className="absolute inset-0 bg-black/75" />

      <motion.div
        className="relative brand-container flex min-h-[90dvh] items-center justify-between py-24 flex-col lg:flex-row gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left: Text */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">

          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-accent text-white" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Tours run daily &bull; 1h 45m
            </span>
          </motion.div>

          <motion.h1
            className="font-caveat text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-white"
            variants={itemVariants}
            style={{ color: "#FFFFFF", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            {title}
          </motion.h1>

          {/* Subhead — Lora bold → Caveat green inline pattern */}
          <motion.p
            className="mt-4 leading-tight"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            variants={itemVariants}
          >
            <span
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              See Norwich with
            </span>{" "}
            <span
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-caveat), cursive", color: "#5AE19E" }}
            >
              someone who lives here.
            </span>
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={buttonHref}
              onClick={() => trackEvent("book_cta_click", { location: "hero_v2" })}
              className="btn-cta inline-flex items-center justify-center h-12 px-8 text-lg bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
            {/* Secondary navigation hint — anchors to the in-page route section.
                Surfaces page structure without a separate nav strip. */}
            <a
              href="#tour-map"
              className="italic text-white/85 underline underline-offset-4 decoration-white/30 hover:decoration-white"
              style={{ fontFamily: "var(--font-lora), Georgia, serif", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              or see where we go
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm text-white/85"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {googleReviewStats.count > 0 && (
              <>
                <a
                  href={googleReviewStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                  aria-label={`${googleReviewStats.rating.toFixed(1)} stars from ${googleReviewStats.count} Google reviews`}
                >
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold">{googleReviewStats.rating.toFixed(1)}</span>
                  <span className="text-white/90">({googleReviewStats.count} review{googleReviewStats.count === 1 ? "" : "s"})</span>
                </a>
                <span aria-hidden="true" className="text-white/40">·</span>
              </>
            )}
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4" aria-hidden="true" /> Max 15
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-2 text-xs text-white/85 leading-relaxed"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            £0 to book &bull; Pay at the end by card or cash &bull; usually £10 to £20
          </motion.p>
        </div>

        <motion.div
          className="relative lg:w-1/2 w-full flex flex-col items-center justify-center gap-5"
          variants={cardVariants}
        >
          {widget ? (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-white">
              {widget}
            </div>
          ) : null}
          <PartnerLogosInverted size="sm" label="Featured on" className="w-full" />
        </motion.div>
      </motion.div>

      {/* Wave divider removed (anti-slop, per web-design-guidelines audit).
          Hero now terminates with a clean horizontal edge into the next
          section. */}
    </section>
  );
}
