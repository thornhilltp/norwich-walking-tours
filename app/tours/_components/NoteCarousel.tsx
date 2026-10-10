"use client";

// One pinned parchment review at a time with prev/next arrows and dots,
// the same control pattern as the GuideReviews carousel on Our Guides.

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./murder-board.module.css";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

function renderQuote(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function NoteCarousel({
  name,
  reviews,
}: {
  name: string;
  reviews: { quote: string; author: string }[];
}) {
  const [i, setI] = useState(0);
  const many = reviews.length > 1;
  const r = reviews[i];
  const go = (d: 1 | -1) => setI((p) => (p + d + reviews.length) % reviews.length);

  return (
    <div className={s.notes}>
      <figure className={s.note} style={{ transform: `rotate(${i % 2 ? 1.2 : -1.6}deg)` }}>
        <span className={s.pin} aria-hidden="true" />
        <blockquote className={s.quote} style={lora} aria-live="polite">
          &ldquo;{renderQuote(r.quote)}&rdquo;
        </blockquote>
        <figcaption className={s.sig}>{r.author}</figcaption>
      </figure>
      {many && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Previous review of ${name}`}
            className="w-11 h-11 rounded-full border border-[#5AE19E]/50 text-[#5AE19E] flex items-center justify-center hover:bg-[#5AE19E]/10 transition"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {reviews.map((_, d) => (
              <span
                key={d}
                className={`block h-1.5 rounded-full transition-all ${
                  d === i ? "w-4 bg-[#5AE19E]" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next review of ${name}`}
            className="w-11 h-11 rounded-full border border-[#5AE19E]/50 text-[#5AE19E] flex items-center justify-center hover:bg-[#5AE19E]/10 transition"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
