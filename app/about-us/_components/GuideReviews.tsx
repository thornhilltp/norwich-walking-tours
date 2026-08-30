"use client";

// Per-guide review carousel. Same paper-card language as the homepage
// Testimonials (white card, masking tape, tilt, Lora quote with a Caveat
// green highlight, Caveat signature). One card at a time with prev/next
// arrows + dots, since each guide's column is narrow.

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type GuideReview = { quote: string; author: string; source?: string };

const KEY_PHRASE_GREEN = "#1A6B47";

// Split on **markers**; render the marked phrase as a handwritten Caveat
// green highlight, the rest as plain serif. Mirrors Testimonials.tsx.
function renderQuote(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span
          key={i}
          style={{
            fontFamily: "var(--font-caveat), cursive",
            fontWeight: 700,
            fontSize: "1.3em",
            lineHeight: 1,
            color: KEY_PHRASE_GREEN,
          }}
        >
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function ReviewCard({
  review,
  rotate,
  accent = { ac: "#2DA96B", ad: "#1A6B47" },
}: {
  review: GuideReview;
  rotate: string;
  accent?: { ac: string; ad: string };
}) {
  return (
    <article
      className="relative w-[300px] bg-white rounded-[4px] border border-[#EAE0D4] px-5 pt-6 pb-4 shadow-[2px_7px_17px_-10px_rgba(90,70,40,0.5)]"
      style={{ rotate }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[10px] left-1/2 w-[64px] h-5 rounded-[3px]"
        style={{
          transform: "translateX(-50%) rotate(-2deg)",
          backgroundColor: accent.ac,
          borderTop: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        }}
      />
      <p
        className="text-[17px] leading-[1.45] mb-4 text-left"
        style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#000" }}
      >
        {renderQuote(review.quote)}
      </p>
      <div className="border-t border-[#F0E9DF] pt-[10px] text-left">
        <div
          className="text-[22px] font-bold leading-none"
          style={{ fontFamily: "var(--font-caveat), cursive", color: accent.ad }}
        >
          {review.author}
        </div>
        {review.source && (
          <div
            className="text-[11px] text-muted-foreground mt-1"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {review.source}
          </div>
        )}
      </div>
    </article>
  );
}

export function GuideReviews({
  reviews,
  accent = { ac: "#2DA96B", ad: "#1A6B47" },
  layout = "carousel",
}: {
  reviews: GuideReview[];
  accent?: { ac: string; ad: string };
  /** "grid" shows every card side by side on lg+ (carousel below lg). */
  layout?: "carousel" | "grid";
}) {
  const [i, setI] = useState(0);
  if (!reviews || reviews.length === 0) return null;

  const many = reviews.length > 1;
  const r = reviews[i];
  const go = (d: 1 | -1) => setI((p) => (p + d + reviews.length) % reviews.length);

  if (layout === "grid" && many) {
    return (
      <div>
        {/* lg+: all cards side by side, alternating tilt */}
        <div className="hidden lg:flex flex-wrap justify-center gap-8">
          {reviews.map((rev, idx) => (
            <ReviewCard
              key={rev.author + idx}
              review={rev}
              rotate={idx % 2 === 0 ? "-1.2deg" : "1.1deg"}
            />
          ))}
        </div>
        {/* below lg: the carousel */}
        <div className="lg:hidden">
          <GuideReviews reviews={reviews} accent={accent} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[260px] mt-6">
      <article
        className="relative bg-white rounded-[4px] border border-[#EAE0D4] px-5 pt-6 pb-4 shadow-[2px_7px_17px_-10px_rgba(90,70,40,0.5)]"
        style={{ rotate: "-1.2deg" }}
      >
        {/* Masking tape — matches the polaroids + homepage cards */}
        <span
          aria-hidden="true"
          className="absolute -top-[10px] left-1/2 w-[64px] h-5 rounded-[3px]"
          style={{
            transform: "translateX(-50%) rotate(-2deg)",
            backgroundColor: accent.ac,
            borderTop: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
          }}
        />
        <p
          className="text-[17px] leading-[1.45] mb-4 min-h-[132px] text-left"
          style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#000" }}
        >
          {renderQuote(r.quote)}
        </p>
        <div className="border-t border-[#F0E9DF] pt-[10px] text-left">
          <div
            className="text-[22px] font-bold leading-none"
            style={{ fontFamily: "var(--font-caveat), cursive", color: accent.ad }}
          >
            {r.author}
          </div>
          {r.source && (
            <div
              className="text-[11px] text-muted-foreground mt-1"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {r.source}
            </div>
          )}
        </div>
      </article>

      {many && (
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="w-11 h-11 rounded-full border border-brand-accent/25 flex items-center justify-center text-brand-accent hover:bg-brand-accent-light transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1" aria-hidden="true">
            {reviews.map((_, d) => (
              <span
                key={d}
                className={`block h-1.5 rounded-full transition-all ${
                  d === i ? "w-4 bg-brand-accent" : "w-1.5 bg-brand-accent/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="w-11 h-11 rounded-full border border-brand-accent/25 flex items-center justify-center text-brand-accent hover:bg-brand-accent-light transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
