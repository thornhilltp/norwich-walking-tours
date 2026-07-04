"use client";

// Testimonials — scan-first review block (redesign 2026-07).
//
//   - Paper-note cards on a warm ground: coloured masking tape (matches
//     the polaroid tape in PhotoShowcaseV2 in shape, per-card colour for
//     variety), black serif quote as the hero, key phrase handwritten in
//     Caveat green, signature in Caveat.
//   - Horizontal scroll-snap track; prev/next arrows on the RIGHT
//     (desktop only — mobile uses native swipe), disabled at the edges.
//   - Dual Google + TripAdvisor rating line with gold stars + "read all"
//     links (proof, not decoration). All data from lib/testimonials.ts.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  googleReviewStats,
  tripAdvisorStats,
  featuredReviews,
} from "@/lib/testimonials";
import { trackEvent } from "@/lib/tracking";

// Per-card colour: mid tone (tape + signature accent) + a darker,
// readable tone for the name. Cycles green → coral → amber → brick
// (all warm, all Norwich). Key phrases stay one green for consistency.
const cardAccents = [
  { ac: "#2DA96B", ad: "#1A6B47" }, // green
  { ac: "#E8734A", ad: "#B44A28" }, // coral
  { ac: "#D99A2B", ad: "#8A5E10" }, // amber
  { ac: "#C4614C", ad: "#8E4335" }, // brick
];

const KEY_PHRASE_GREEN = "#1A6B47";

// Varied tilt (degrees) so the notes read as casually posted, not a tidy
// grid. Applied via Framer's `rotate` style so it composes with the
// mount animation's transform instead of being overridden by it.
const cardAngles = [-2, 1.5, -1.4, 2, -1.1, 1.7];

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58z" />
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

// Gold stars — matches the hero trust row; gold reads as a "real rating"
// signal in a way brand-green does not.
function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" style={{ width: size, height: size, fill: "#FACC15" }} aria-hidden="true">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.3 6L10 14.9 4.5 18l1.3-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

// Split a pullQuote on **markers**; render the marked phrase as a
// handwritten Caveat green highlight, the rest as plain black serif.
function renderPullQuote(text: string) {
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

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Enable/disable the arrows at the track edges.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      const card = el.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + 22 : el.clientWidth || 1;
      setActiveIndex(Math.max(0, Math.round(el.scrollLeft / step)));
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
    const step = card ? card.offsetWidth + 22 : el.clientWidth;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 22 : el.clientWidth;
    el.scrollTo({ left: step * i, behavior: "smooth" });
  };

  return (
    <section
      id="reviews"
      className="section-padding"
      style={{ backgroundColor: "#FCFAF8" }}
      aria-label="Customer reviews"
    >
      <div className="brand-container">
        {/* Heading + dual-platform rating line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p
            className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Reviews
          </p>
          <h2 className="leading-[1.0] mb-5">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              What people said
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              after.
            </span>
          </h2>

          <div
            className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 sm:gap-x-3 text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <GoogleLogo className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-semibold text-brand-text">{googleReviewStats.rating.toFixed(1)}</span>
              <Stars />
              <span className="text-brand-text">Google</span>
              <a
                href={googleReviewStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent-text text-xs underline underline-offset-2 decoration-brand-accent/40 hover:decoration-brand-accent ml-0.5"
              >
                read all {googleReviewStats.count} &rarr;
              </a>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-brand-accent/30">&middot;</span>
            <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <TripAdvisorLogo className="w-4 h-4 flex-shrink-0" />
              <span className="font-semibold text-brand-text">{tripAdvisorStats.rating.toFixed(1)}</span>
              <Stars />
              <span className="text-brand-text">Tripadvisor</span>
              <a
                href={tripAdvisorStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent-text text-xs underline underline-offset-2 decoration-brand-accent/40 hover:decoration-brand-accent ml-0.5"
              >
                read all {tripAdvisorStats.count} &rarr;
              </a>
            </span>
          </div>
        </motion.div>

        {/* Card track + right-side arrows (arrows desktop-only; mobile swipes). */}
        <div className="flex items-stretch gap-4">
          <div
            ref={scrollRef}
            className="flex-1 flex gap-[22px] overflow-x-auto snap-x snap-mandatory pt-9 pb-8 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredReviews.map((review, idx) => {
              const { ac, ad } = cardAccents[idx % cardAccents.length];
              const rotate = cardAngles[idx % cardAngles.length];
              return (
                <motion.article
                  key={review.id}
                  data-card
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  // Width: exactly 3 across on desktop (no peeking 4th card),
                  // one full card on mobile. gap is 22px so 2 gaps = 44px.
                  className="relative flex-none snap-start w-full lg:w-[calc((100%_-_44px)/3)] bg-white rounded-[4px] border border-[#EAE0D4] px-5 pt-6 pb-[18px] shadow-[2px_7px_17px_-10px_rgba(90,70,40,0.5)]"
                  style={{ rotate }}
                >
                  {/* Masking tape — same shape as PhotoShowcaseV2, per-card colour. */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-[10px] left-1/2 w-[66px] h-5 rounded-[3px]"
                    style={{
                      transform: "translateX(-50%) rotate(-2deg)",
                      backgroundColor: ac,
                      borderTop: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                    }}
                  />
                  <p
                    className="text-[20px] leading-[1.42] mb-4 min-h-[92px]"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#000" }}
                  >
                    {renderPullQuote(review.pullQuote)}
                  </p>
                  <div className="border-t border-[#F0E9DF] pt-[10px]">
                    <div
                      className="text-[25px] font-bold leading-none"
                      style={{ fontFamily: "var(--font-caveat), cursive", color: ad }}
                    >
                      {review.name}
                    </div>
                    <div
                      className="text-[11px] text-muted-foreground mt-0.5"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      {review.role}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Prev/next — right edge, vertically centred, desktop only. */}
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

        {/* Mobile-only pagination dots — the "there's more, swipe" cue where
            the arrows are hidden. Active dot widens; tap to jump to a review. */}
        <div className="flex lg:hidden justify-center gap-1 mt-5" aria-label="Choose a review">
          {featuredReviews.map((review, i) => (
            <button
              key={review.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to review ${i + 1} of ${featuredReviews.length}`}
              aria-current={i === activeIndex}
              className="px-1 py-2"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-5 bg-brand-accent" : "w-2 bg-brand-accent/30"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Quiet post-proof CTA — catches readers at their warmest moment.
            Points at /book (works on every viewport, unlike #book-section
            whose widget is desktop-only). */}
        <div className="text-center mt-6 lg:mt-3">
          <a
            href="/book"
            onClick={() => trackEvent("book_cta_click", { location: "reviews" })}
            className="inline-block italic text-lg text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 hover:decoration-brand-accent"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Fancy joining them? Book your spot (free) &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
