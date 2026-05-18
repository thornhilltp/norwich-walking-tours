"use client";

// AboutSectionV2 — first-person "meet the guide" section for /home-v2.
// Per Tom's reference image: polaroid-style portrait left, Lora→Caveat
// headline + first-person story + dual CTAs + handwritten signature
// right.
//
// Why: people book free tours from strangers. A face + first-person
// voice closes the "is this a corporation?" gap before the booking
// decision. Builds the "local friend, not tour guide" promise visually.
//
// Copy adapted from Tom's reference image. Substitute as needed.

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutSectionV2() {
  return (
    // Tom feedback: needs visual break from the cream sections around
    // it. Pure white bg gives the "fresh sheet of paper" feel that
    // matches the polaroid + handwritten-note treatment without
    // introducing a non-brand colour.
    <section id="tom" className="section-padding bg-white">
      <div className="brand-container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 items-start">
          {/* Left: polaroid portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-[500px] md:mx-auto"
          >
            {/* Polaroid frame — bg-brand-bg (cream) so it sits on
                the white section bg with contrast, like a real
                printed photo on a desk. */}
            <div className="bg-brand-bg p-4 pb-14 shadow-xl border border-brand-accent/10">
              {/* "Sellotape" tab on top */}
              <span
                aria-hidden="true"
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-brand-text/8 backdrop-blur-sm rounded-sm"
              />
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/tom-portrait.jpg"
                  alt="Tom Thornhill, founder and guide of Norwich Free Walking Tours"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 30%" }}
                  sizes="(max-width: 768px) 90vw, 500px"
                />
              </div>
              {/* Caption — tighter tracking + shorter text so it
                  fits on one line. Was wrapping awkwardly across
                  3 lines with tracking-[0.18em] + full name + dash
                  + "self portrait". */}
              <p
                className="absolute bottom-5 left-4 text-[10px] tracking-[0.08em] uppercase text-brand-text/55 font-semibold"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Tom Thornhill, Norwich
              </p>
            </div>
            {/* Handwritten note below the polaroid */}
            <p
              className="mt-5 ml-6 italic text-brand-text/70 text-lg"
              style={{ fontFamily: "var(--font-caveat), cursive", transform: "rotate(-2deg)" }}
            >
              that&apos;s me, hi
            </p>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              About
            </p>
            <h2 className="leading-[1.0] mb-7">
              <span
                className="inline text-[clamp(48px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Tom,
              </span>{" "}
              <span
                className="inline text-[clamp(36px,4.4vw,56px)] font-bold leading-[1.05] tracking-tight text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                mostly.
              </span>
            </h2>

            <div
              className="space-y-4 text-brand-text/85 text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              <p>
                I&apos;ve lived in Norwich for over a decade. Before that, London &mdash; just long enough to know I&apos;d rather not.
              </p>
              <p>
                I started running these walks because friends kept visiting and asking me the same thing: <em>where do you actually go?</em> So I drew the route, wrote down the stories I&apos;d end up telling them anyway, and started letting other people come along too.
              </p>
              <p>
                It&apos;s daily now. One group, fifteen people, free to book. If you reckon it was worth a tenner, that&apos;s the rate. If you reckon it was worth twenty, that&apos;s also the rate. If you reckon it wasn&apos;t worth anything, walk off. No drama.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#book-section"
                className="btn-cta inline-flex items-center gap-2 px-7 py-3 bg-brand-accent text-white rounded-full hover:bg-brand-accent/90 transition-colors duration-150"
              >
                Book a morning
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="italic text-brand-text/70 underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                or email me direct
              </a>
            </div>

            {/* Handwritten signature */}
            <p
              className="mt-10 text-4xl text-brand-text/70"
              style={{ fontFamily: "var(--font-caveat), cursive", transform: "rotate(-2deg)", display: "inline-block" }}
            >
              &mdash; Tom
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
