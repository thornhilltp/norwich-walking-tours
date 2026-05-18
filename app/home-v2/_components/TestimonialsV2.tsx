"use client";

// TestimonialsV2 — restructured per Tom's reference image #3.
// Layout: H2 (Lora→Caveat pattern) on left + big rating anchor on right
// (big "4.9 ★★★★★" + "16 GOOGLE REVIEWS · 100% 5-STAR" caption).
// Below: 2×2 grid of all 4 real Google reviews. Centered "Read all" link.

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { googleReviews, googleReviewStats } from "@/lib/testimonials";

export function TestimonialsV2() {
  return (
    <section id="reviews" className="section-padding">
      <div className="brand-container">
        {/* Header row — heading left, big rating right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12"
        >
          <div>
            <p
              className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Reviews
            </p>
            <h2 className="leading-[1.0]">
              <span
                className="inline text-[clamp(40px,4.4vw,60px)] font-bold leading-[1.05] tracking-tight text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                What people said
              </span>{" "}
              <span
                className="inline text-[clamp(52px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                after.
              </span>
            </h2>
            {/* SEO: weaves 'Norwich walking tour' exact phrase + the
                local-tips differentiator. Same line that was on live /. */}
            <p
              className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              What guests say about the Norwich walking tour and the local tips that come with it.
            </p>
          </div>

          {/* Big rating anchor */}
          <div className="flex flex-col items-start md:items-end shrink-0">
            <div className="flex items-center gap-4 mb-1">
              <span
                className="text-[44px] font-bold leading-none text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {googleReviewStats.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-brand-accent text-brand-accent" aria-hidden="true" />
                ))}
              </span>
            </div>
            <p
              className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {googleReviewStats.count} Google reviews &nbsp;·&nbsp; 100% 5-star
            </p>
          </div>
        </motion.div>

        {/* 2×2 grid of all 4 reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {googleReviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-brand-accent/15 rounded-xl p-6 md:p-7"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" aria-hidden="true" />
                ))}
              </div>
              <p
                className="text-[17px] text-brand-text leading-relaxed mb-5"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                &ldquo;{review.content.split("\n").join(" ")}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-accent/10">
                {review.avatar ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-accent-light flex-shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-accent-light flex items-center justify-center text-brand-accent font-semibold flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div className="text-sm">
                  <span
                    className="font-bold text-brand-text"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {review.name}
                  </span>
                  <span
                    className="text-muted-foreground ml-2"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    &middot; {review.role}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Read all link */}
        <div className="mt-10 text-center">
          <a
            href={googleReviewStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-accent hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Read all {googleReviewStats.count} on Google &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
