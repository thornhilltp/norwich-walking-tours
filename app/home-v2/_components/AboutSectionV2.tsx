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
    // Warm sandstone cream bg — Tom's reference. Lighter than the
    // earlier #C9B083 attempt (that was too dark brown). Hardcoded
    // inline (outside current 5-colour brand palette). If kept,
    // promote to a brand token in globals.css and add to CLAUDE.md §3.
    <section
      id="tom"
      className="section-padding"
      style={{ backgroundColor: "#ECE0C8" }}
    >
      <div className="brand-container">
        {/* Grid flipped — polaroid column now gets MORE space than
            text column (was 1fr / 1.2fr, polaroid felt visually
            weak against the dense text). */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14 items-start">
          {/* Left: polaroid portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[580px] md:mx-auto"
          >
            {/* Polaroid frame — white bg, image fills MORE of the
                frame (smaller side/top padding, longer bottom for
                caption). Real-polaroid proportions. */}
            <div className="bg-white p-3 pb-12 shadow-2xl border border-brand-text/5">
              {/* Masking tape at top — yellowy translucent like real
                  tape, more visible than the previous near-invisible
                  brown/grey version. */}
              <span
                aria-hidden="true"
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 rounded-sm shadow-sm"
                style={{
                  backgroundColor: "rgba(241, 225, 161, 0.75)",
                  borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                }}
              />
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/tom-portrait.jpg"
                  alt="Tom Thornhill, founder and guide of Norwich Free Walking Tours"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 30%" }}
                  sizes="(max-width: 768px) 90vw, 580px"
                />
              </div>
              <p
                className="absolute bottom-4 left-4 text-[10px] tracking-[0.08em] uppercase text-brand-text/55 font-semibold"
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
                className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Tom,
              </span>{" "}
              <span
                className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
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
                Book your spot (free)
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="italic text-brand-text/70 underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                or contact me direct
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
