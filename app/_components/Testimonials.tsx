"use client";

// Testimonials — scan-first review block.
//
//   - Quote is the dominant element per card; everything else whispers.
//   - 3 cards visible on desktop, 1 on mobile. Horizontal scroll-snap +
//     prev/next arrows on the right reveal the remaining curated reviews.
//   - Source attribution lives only in the dual-platform rating header.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  visited: string;       // role only — no platform prefix
  pullQuote: string;     // **markers** wrap the phrase to bold
};

const reviews: PullReview[] = [
  {
    id: 1,
    name: "Julie",
    visited: "Norwich local",
    pullQuote: "**Lived here all my life** and still learnt loads",
  },
  {
    id: 2,
    name: "Evangelia",
    visited: "Returning visitor, May 2026",
    pullQuote: "See the city through the **lenses of the locals**",
  },
  {
    id: 3,
    name: "Vina",
    visited: "Visiting historians",
    pullQuote: "Skeptical historians — **Tom is the real thing**",
  },
  {
    id: 4,
    name: "Pat",
    visited: "Couples, June 2026",
    pullQuote: "Learnt so much, including **where to buy the best icecream**",
  },
  {
    id: 5,
    name: "Yara",
    visited: "Solo, May 2026",
    pullQuote: "**1000 fascinating years** of history I'd never have spotted",
  },
  {
    id: 6,
    name: "Jesus",
    visited: "Local Guide",
    pullQuote: "Lots of **QI-worthy little stories** and hidden mentions",
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

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} viewBox="0 0 20 20" className="fill-brand-accent" style={{ width: size, height: size }} aria-hidden="true">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.3 6L10 14.9 4.5 18l1.3-6L1.3 7.8l6.1-.7L10 1.5z"/>
        </svg>
      ))}
    </div>
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

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Track scroll position so arrows enable/disable at the edges.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const advance = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "#FFFFFF" }}
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
                {googleReviewStats.count} reviews
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
                {tripAdvisorStats.count} reviews
              </p>
            </a>
          </div>
        </motion.div>

        {/* Card track + arrows. Arrows sit to the RIGHT of the card row,
            vertically centred. On mobile they hide (native swipe replaces
            them) and cards become a full-width snap track. */}
        <div className="flex items-stretch gap-4">
          <div
            ref={scrollRef}
            className="flex-1 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Customer reviews"
          >
            {reviews.map((review, idx) => (
              <motion.article
                key={review.id}
                data-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex-shrink-0 snap-start basis-full lg:basis-[calc(33.333%-13.333px)] bg-white border border-brand-accent/15 rounded-xl shadow-sm p-7 flex flex-col gap-6"
              >
                <p
                  className="text-[20px] text-brand-text leading-[1.4] font-medium"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  &ldquo;{renderWithBoldMarkers(review.pullQuote)}&hellip;&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-brand-accent/10">
                  <div className="w-9 h-9 rounded-full bg-brand-accent-light flex items-center justify-center text-brand-accent font-semibold text-sm flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
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

          {/* Prev/next stack — hidden on mobile (native swipe takes over). */}
          <div className="hidden lg:flex flex-col justify-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => advance(-1)}
              disabled={!canPrev}
              aria-label="Previous reviews"
              className="w-11 h-11 rounded-full border border-brand-accent/25 flex items-center justify-center text-brand-accent hover:bg-brand-accent-light disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => advance(1)}
              disabled={!canNext}
              aria-label="Next reviews"
              className="w-11 h-11 rounded-full border border-brand-accent/25 flex items-center justify-center text-brand-accent hover:bg-brand-accent-light disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
