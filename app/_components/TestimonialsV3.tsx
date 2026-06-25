"use client";

// TestimonialsV3 — Ellie-Planner-inspired skim layout.
// Pattern: 4 small cards across desktop, single column on phone + tablet.
// Each card shows a bolded pull-quote phrase + avatar + first name + visit context.

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { googleReviewStats } from "@/lib/testimonials";

const tripAdvisorStats = {
  rating: 5.0,
  count: 26,
  profileUrl:
    "https://www.tripadvisor.com/Attraction_Review-g186342-d34359588-Reviews-Norwich_Free_Walking_Tours-Norwich_Norfolk_East_Anglia_England.html",
};

type PullReview = {
  id: number;
  name: string;
  visited: string;
  avatar?: string;
  pullQuote: string;       // short headline; phrase to bold marked with **markers**
};

// Curated 4-card mix. Picks span 4 distinct trip types (Local, Returning visitor,
// Visiting historians, Couples) and four distinct objections/angles:
//   1. "I already know Norwich"             → Julie, local for life, still learnt loads
//   2. "Is this on-brand for visitors?"      → Evangelia, repeat visitor, 'lenses of the locals'
//   3. "Tour guides probably make stuff up"  → Vina, skeptical historian, 'real thing'
//   4. "What practical value do I get?"      → Pat, "best ice-cream" specifics
// 2 Google + 2 TripAdvisor reinforces the dual-platform rating header.
const reviews: PullReview[] = [
  {
    id: 1,
    name: "Julie",
    visited: "Google · Norwich local",
    avatar: "/images/reviews/julie.png",
    pullQuote: "**Lived here all my life** and still learnt loads",
  },
  {
    id: 2,
    name: "Evangelia",
    visited: "Tripadvisor · Returning visitor, May 2026",
    pullQuote: "See the city through the **lenses of the locals**",
  },
  {
    id: 3,
    name: "Vina",
    visited: "Google · Visiting historians",
    pullQuote: "Skeptical historians — **Tom is the real thing**",
  },
  {
    id: 4,
    name: "Pat",
    visited: "Tripadvisor · Couples, June 2026",
    pullQuote: "Learnt so much, including **where to buy the best ice-cream**",
  },
];

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

function TripAdvisorLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#34E0A1" />
      <circle cx="8" cy="12" r="3.2" fill="#000" />
      <circle cx="9" cy="11" r="0.9" fill="#FFF" />
      <circle cx="16" cy="12" r="3.2" fill="#000" />
      <circle cx="17" cy="11" r="0.9" fill="#FFF" />
    </svg>
  );
}

function renderWithBoldMarkers(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-brand-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Avatar({ review }: { review: PullReview }) {
  if (review.avatar) {
    return (
      <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-accent-light flex-shrink-0">
        <Image
          src={review.avatar}
          alt={review.name}
          width={36}
          height={36}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-brand-accent-light flex items-center justify-center text-brand-accent font-semibold text-sm flex-shrink-0">
      {review.name.charAt(0)}
    </div>
  );
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className="fill-brand-accent text-brand-accent"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

export function TestimonialsV3() {
  return (
    <section
      id="reviews"
      className="section-padding"
      style={{ backgroundColor: "#FAF4E8" }}
    >
      <div className="brand-container">
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
                className="inline text-[clamp(40px,4.4vw,60px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                What people said
              </span>{" "}
              <span
                className="inline text-[clamp(52px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                after.
              </span>
            </h2>
          </div>

          {/* Dual-platform rating anchor */}
          <div className="flex flex-row items-start md:items-end gap-6 sm:gap-8 shrink-0">
            <a
              href={googleReviewStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start md:items-end group"
              aria-label={`${googleReviewStats.rating.toFixed(1)} stars from ${googleReviewStats.count} Google reviews`}
            >
              <div className="flex items-center gap-2 mb-1">
                <GoogleLogo className="w-4 h-4 flex-shrink-0" />
                <span
                  className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  Google
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[34px] font-bold leading-none text-brand-text group-hover:text-brand-accent transition-colors"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {googleReviewStats.rating.toFixed(1)}
                </span>
                <Stars size={16} />
              </div>
              <p
                className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {googleReviewStats.count} reviews &nbsp;·&nbsp; rated {googleReviewStats.rating.toFixed(1)} of 5
              </p>
            </a>

            <a
              href={tripAdvisorStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start md:items-end group"
              aria-label={`${tripAdvisorStats.rating.toFixed(1)} stars from ${tripAdvisorStats.count} TripAdvisor reviews`}
            >
              <div className="flex items-center gap-2 mb-1">
                <TripAdvisorLogo className="w-4 h-4 flex-shrink-0" />
                <span
                  className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  Tripadvisor
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[34px] font-bold leading-none text-brand-text group-hover:text-brand-accent transition-colors"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {tripAdvisorStats.rating.toFixed(1)}
                </span>
                <Stars size={16} />
              </div>
              <p
                className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {tripAdvisorStats.count} reviews &nbsp;·&nbsp; 100% 5-star
              </p>
            </a>
          </div>
        </motion.div>

        {/* 4 cards across desktop; single-column on phone + tablet (Ellie's pattern). */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {reviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-brand-accent/15 rounded-xl p-5 flex flex-col gap-4"
            >
              <Stars />
              <p
                className="text-[18px] text-brand-text/80 leading-[1.35]"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                &ldquo;{renderWithBoldMarkers(review.pullQuote)}&hellip;&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-brand-accent/10">
                <Avatar review={review} />
                <div className="text-sm leading-tight">
                  <div
                    className="font-bold text-brand-text"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {review.name}
                  </div>
                  <div
                    className="text-muted-foreground text-xs"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {review.visited}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Read all links — two platforms */}
        <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
          <a
            href={googleReviewStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-accent-text hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Read all {googleReviewStats.count} on Google &rarr;
          </a>
          <a
            href={tripAdvisorStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-accent-text hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Read all {tripAdvisorStats.count} on TripAdvisor &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
