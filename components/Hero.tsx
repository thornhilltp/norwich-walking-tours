"use client";

import React from "react";
import { motion, type Variants, type Easing } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface HeroProps {
  title: React.ReactNode;
  buttonText: string;
  buttonHref: string;
  widget?: React.ReactNode;
  className?: string;
}

// ── Animation variants ────────────────────────────────────────────────────────
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

export function Hero({
  title,
  buttonText,
  buttonHref,
  widget,
  className,
}: HeroProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        backgroundImage: "url('/images/pottergate-stock.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 75%",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Subtle green grid overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,169,107,0.18) 1px, transparent 1px), linear-gradient(to right, rgba(45,169,107,0.18) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      <motion.div
        className="relative brand-container flex min-h-[90dvh] items-center justify-between py-24 flex-col lg:flex-row gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left: Text */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">

          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-accent text-white" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Book your free spot &bull; Near Daily &bull; English
            </span>
          </motion.div>

          <motion.h1
            className="font-caveat text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-white"
            variants={itemVariants}
            style={{ color: "#FFFFFF", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            {title}
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-3 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-white/15 text-white/90 border border-white/25" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Coming May 2026
            </span>
          </motion.div>

          <motion.p
            className="mt-4 text-xl text-white/85 leading-snug"
            style={{ fontFamily: "var(--font-lora), Georgia, serif", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            variants={itemVariants}
          >
            See the real Norwich with a local.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={buttonHref}
              className="btn-cta inline-flex items-center justify-center h-12 px-8 text-lg bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#tour-map"
              className="inline-flex items-center justify-center h-12 px-6 text-base bg-white/15 hover:bg-white/25 text-white rounded-xl border border-white/30 transition-colors duration-150"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              See the route
            </a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-xs text-white/65 leading-relaxed"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            1h 45m &bull; £0 to book &bull; Pay at the end by card, Apple Pay or cash
          </motion.p>
        </div>

        {/* Right: booking widget */}
        <motion.div
          className="relative lg:w-1/2 w-full flex items-center justify-center"
          variants={cardVariants}
        >
          {widget ? (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-white">
              {widget}
            </div>
          ) : null}
        </motion.div>
      </motion.div>

      {/* Smooth wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "56px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
          <path
            d="M0,56 L0,30 C240,56 480,8 720,28 C960,48 1200,12 1440,32 L1440,56 Z"
            fill="#FCFAF8"
          />
        </svg>
      </div>
    </section>
  );
}
