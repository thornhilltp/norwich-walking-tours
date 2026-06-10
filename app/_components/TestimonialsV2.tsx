"use client";

// TestimonialsV2 — restructured per Tom's reference image #3.
// Layout: H2 (Lora→Caveat pattern) on left + big rating anchor on right
// (big rating number + star row + "<count> reviews · rated <avg> of 5" caption,
// all driven from googleReviewStats in lib/testimonials.ts).
// Below: 2×2 grid of all 4 real Google reviews. Centered "Read all" link.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { googleReviews, googleReviewStats } from "@/lib/testimonials";

// TripAdvisor data — hardcoded here (not added to shared lib/testimonials.ts
// per Tom's "no main page changes" rule). Promote to lib when this V2
// design ships and / can use it too.
const tripAdvisorStats = {
  rating: 5.0,
  count: 17,
  profileUrl:
    "https://www.tripadvisor.com/Attraction_Review-g186342-d34359588-Reviews-Norwich_Free_Walking_Tours-Norwich_Norfolk_East_Anglia_England.html",
};

// Inline brand logos. Public attribution use for review aggregation.
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
  // Simplified owl mark — two eyes inside the TripAdvisor green circle.
  // Full-fidelity TripAdvisor branding would require licensed assets;
  // this is a recognisable abstraction (same brand green, same two-eye
  // silhouette) for credibility use.
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

export function TestimonialsV2() {
  // Carousel: native scroll-snap inside an overflow-x-auto track. Mobile
  // shows one review per page (4 dots); desktop shows two per page
  // (2 dots, 2 'rows' user paginates through). Per Tom 2026-05-19 to
  // save vertical space on the homepage.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const handle = () => {
      raf = 0;
      const cardWidth = el.scrollWidth / googleReviews.length;
      if (cardWidth > 0) {
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(idx);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(handle);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToReview = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / googleReviews.length;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  // Page size: 1 review per page on mobile, 2 on desktop.
  const pageSize = isDesktop ? 2 : 1;
  const totalPages = Math.ceil(googleReviews.length / pageSize);
  const currentPage = Math.floor(activeIndex / pageSize);

  return (
    <section
      id="reviews"
      className="section-padding"
      style={{ backgroundColor: "#FAF4E8" }}
    >
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
            {/* SEO: weaves 'Norwich walking tour' exact phrase + the
                local-tips differentiator. Same line that was on live /. */}
            <p
              className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              What guests say about the Norwich walking tour and the local tips that come with it.
            </p>
          </div>

          {/* Two-platform rating anchor — Google + TripAdvisor side-by-side.
              Each is clickable, has its own logo, rating, stars + count.
              Together they read as "verified across two independent
              review platforms". */}
          <div className="flex flex-row items-start md:items-end gap-6 sm:gap-8 shrink-0">
            <a
              href={googleReviewStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start md:items-end group"
              aria-label={`${googleReviewStats.rating.toFixed(1)} stars from ${googleReviewStats.count} Google reviews — opens Google reviews in new tab`}
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
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" aria-hidden="true" />
                  ))}
                </span>
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
              aria-label={`${tripAdvisorStats.rating.toFixed(1)} stars from ${tripAdvisorStats.count} TripAdvisor reviews — opens TripAdvisor in new tab`}
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
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" aria-hidden="true" />
                  ))}
                </span>
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

        {/* Carousel — scroll-snap track. Mobile: one review per page,
            swipe to advance. Desktop: two per page (basis 50% minus
            half gap), paginates between two 'rows'. scrollbar-hide
            class isn't standard Tailwind so falls back to a small
            margin. */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Customer reviews carousel"
        >
          {googleReviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex-shrink-0 snap-start basis-full md:basis-[calc(50%-10px)] bg-white border border-brand-accent/15 rounded-xl p-6 md:p-7"
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

        {/* Dot indicators — count varies with viewport (4 dots mobile,
            2 dots desktop). Active dot tracks current scroll position. */}
        <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isActive = i === currentPage;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToReview(i * pageSize)}
                aria-label={`Show review ${i * pageSize + 1}${pageSize === 2 ? `-${(i + 1) * pageSize}` : ""}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  isActive ? "w-6 bg-brand-accent" : "w-2 bg-brand-accent/30 hover:bg-brand-accent/60"
                }`}
              />
            );
          })}
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
