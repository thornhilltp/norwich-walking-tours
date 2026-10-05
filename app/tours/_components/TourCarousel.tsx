"use client";

// Tour carousel — card layout adapted from the product-card reference
// Tom shared (Peloton). The point of that reference is the alignment:
// everything reads from the left edge, nothing is centred. Title top-left,
// image below it, price bottom-left, action pill bottom-right.
//
// Brand adaptation: white card on cream page, brand-green pill instead of
// red, Lora title instead of a grotesk, paper-tone tint behind each image.
//
// Scrolling is native scroll-snap so it behaves correctly on touch without
// a library. Arrows and dots drive the same scroll container.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Tour } from "@/lib/tours";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TourCarousel({ tours }: { tours: Tour[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Derive the active card from scroll position rather than tracking it in
  // the click handler — keeps dots correct when the user swipes or drags.
  //
  // "Active" is the card snapped to the LEFT edge, matching snap-start.
  // Measuring against the track's centre instead would report card 2 as
  // active at scroll position zero, because two and a bit cards fit on a
  // desktop screen.
  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const trackLeft = track.getBoundingClientRect().left;
    let nearest = 0;
    let nearestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setActive(nearest);
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    syncFromScroll();
    const track = trackRef.current;
    if (!track) return;
    window.addEventListener("resize", syncFromScroll);
    return () => window.removeEventListener("resize", syncFromScroll);
  }, [syncFromScroll]);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const target = cards[Math.max(0, Math.min(i, cards.length - 1))];
    if (!target) return;
    // Scroll by the measured gap between the card and the track's left
    // edge. offsetLeft would be relative to the nearest positioned
    // ancestor, which is not this scroll container, so it lands short.
    const delta =
      target.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollBy({
      left: delta,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  // Soft edge on the side that still has cards behind it. `transparent` at
  // the very edge, opaque by 6%, so only the cut-off card is feathered.
  const stops = [
    atStart ? "black 0" : "transparent 0, black 6%",
    atEnd ? "black 100%" : "black 94%, transparent 100%",
  ].join(", ");
  const edgeMask =
    atStart && atEnd ? undefined : `linear-gradient(to right, ${stops})`;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Norwich walking tours"
    >
      {/* Arrows sit outside the cards on large screens so they never cover
          card content. Hidden below lg — touch users swipe. */}
      <button
        type="button"
        onClick={() => scrollToIndex(active - 1)}
        disabled={atStart}
        aria-label="Previous tour"
        className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white shadow-md border border-brand-text/10 text-brand-text transition-opacity duration-150 hover:bg-brand-accent hover:text-white disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollToIndex(active + 1)}
        disabled={atEnd}
        aria-label="Next tour"
        className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white shadow-md border border-brand-text/10 text-brand-text transition-opacity duration-150 hover:bg-brand-accent hover:text-white disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>

      <ul
        ref={trackRef}
        onScroll={syncFromScroll}
        // pb-2 leaves room for the card shadow inside the scroll box.
        className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        // Fade whichever edge has more cards behind it. Without this the
        // half-visible card is cut by a hard vertical line mid-page, which
        // reads as a broken image rather than "keep scrolling".
        style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
      >
        {tours.map((tour, i) => (
          <li
            key={tour.slug}
            className="snap-start shrink-0 w-[84vw] sm:w-[380px] lg:w-[404px]"
          >
            <article className="h-full flex flex-col bg-white rounded-[28px] border border-brand-text/[0.07] shadow-[0_2px_24px_rgba(26,26,26,0.06)] p-5 sm:p-6">
              {/* Title block — left aligned, title then who leads it. */}
              <h3
                className="font-semibold text-[25px] sm:text-[27px] leading-[1.15] tracking-[-0.01em] text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {tour.name}
              </h3>
              {tour.byline && (
                <p
                  className="mt-1 text-[15px] text-muted-foreground"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {tour.byline}
                </p>
              )}

              <div
                className="relative mt-5 rounded-2xl overflow-hidden aspect-[4/3]"
                style={{ backgroundColor: tour.tint }}
              >
                <Image
                  src={tour.image}
                  alt={tour.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 84vw, 404px"
                  priority={i === 0}
                  // Cards 2+ sit off to the right, so native lazy loading
                  // doesn't fire until they are swiped into view and the
                  // image pops in blank. Six images is cheap — load them.
                  loading={i === 0 ? undefined : "eager"}
                />
                {tour.status === "example" && (
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-text/75 text-white text-[11px] font-semibold tracking-[0.1em] uppercase backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    Example
                  </span>
                )}
              </div>

              {/* Meta line: duration, cap, when it runs. */}
              <p
                className="mt-4 text-[13px] text-muted-foreground"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {tour.meta.join("  ·  ")}
              </p>

              <p
                className="mt-3 text-[15px] leading-relaxed text-brand-text/75"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {tour.blurb}
              </p>

              {/* Bottom row — price left, pill right. mt-auto pins it to the
                  card floor so cards of differing blurb length still align. */}
              <div className="mt-auto pt-6 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="text-[15px] font-semibold text-brand-text leading-snug"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {tour.priceLine}
                  </p>
                  <p
                    className="text-[13px] text-muted-foreground leading-snug"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {tour.priceSub}
                  </p>
                </div>
                <a
                  href={tour.ctaHref}
                  className="shrink-0 inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand-accent text-white font-semibold text-[15px] hover:bg-brand-accent/90 transition-colors duration-150"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {tour.ctaLabel}
                  <span className="sr-only"> {tour.name}</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* Dots — also the mobile affordance that more cards exist. */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {tours.map((tour, i) => (
          <button
            key={tour.slug}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${tour.name}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all duration-200 ${
              i === active
                ? "w-6 bg-brand-accent"
                : "w-2 bg-brand-text/20 hover:bg-brand-text/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
