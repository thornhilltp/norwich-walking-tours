"use client";

// Question filter for /guide. Two modes:
//   - No question selected: full 2-col grid of tiles (the landing).
//   - A question selected: tiles collapse into a sticky horizontal chip
//     strip pinned just under the site nav. Picks render below.
//
// Why client? The strip needs (a) a scroll-pin so users land at the top
// of picks after tapping (otherwise browser keeps scrollTop and they land
// mid-list — see the deep-think note in commit history), and (b) to scroll
// the active chip into horizontal view within the strip when selection
// changes from off-screen.
//
// Tap feedback is CSS-only: `active:scale-[0.97]` with motion-safe.

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { List, X } from "lucide-react";

import { findQuestion, PICKS_HEADER_ID, QUESTIONS } from "../_lib/questions";

export default function QuestionFilter() {
  const sp = useSearchParams();
  const activeId = sp.get("q") ?? null;
  const active = findQuestion(activeId ?? undefined);
  const stripRef = useRef<HTMLOListElement>(null);

  // Scroll-pin: on selection change, lock the user to a sensible position
  // (top of picks if selected; top of page if deselected). Without this the
  // browser keeps scrollTop constant after the layout collapse, which can
  // dump users in the middle of the picks list.
  useEffect(() => {
    if (!activeId) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const el = document.getElementById(PICKS_HEADER_ID);
    if (el) el.scrollIntoView({ block: "start", behavior: "auto" });
    // Bring the active chip into the visible part of the strip — otherwise
    // it can be cropped off the right edge on smaller screens.
    const chip = stripRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    if (chip) chip.scrollIntoView({ inline: "center", block: "nearest" });

    // Translate a vertical mouse-wheel gesture into horizontal scroll on the
    // strip — otherwise desktop mouse users can't scroll it (the default
    // wheel only moves vertical containers). Only convert when vertical
    // delta dominates, so trackpad horizontal swipes still pass through
    // natively. Mobile touch swipe is unaffected.
    const strip = stripRef.current;
    if (!strip) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        strip.scrollLeft += e.deltaY;
      }
    };
    strip.addEventListener("wheel", onWheel, { passive: false });
    return () => strip.removeEventListener("wheel", onWheel);
  }, [activeId]);

  // ── Landing: full grid of tiles ─────────────────────────────────────────
  if (!active) {
    return (
      <ol className="grid grid-cols-2 gap-3 mb-6">
        {QUESTIONS.map((q) => {
          const Icon = q.icon;
          const isFav = q.favourite;
          const classes = isFav
            ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
            : "bg-white border-brand-accent/15 text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-light";
          return (
            <li key={q.id}>
              <Link
                href={`/guide?q=${q.id}`}
                scroll={false}
                className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors duration-150 focus-brand touch-manipulation min-h-[72px] motion-safe:transition-transform active:scale-[0.97] ${classes}`}
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isFav ? "fill-current" : ""}`}
                  aria-hidden="true"
                />
                <span className="text-[15px] font-semibold leading-tight">
                  {q.label}
                </span>
              </Link>
            </li>
          );
        })}
        {/* "All picks" tile sits at the end of the grid as an explicit
            escape hatch. Style: neutral, list-icon. */}
        <li>
          <Link
            href="/guide?q=all"
            scroll={false}
            className="flex items-center gap-3 rounded-2xl border bg-white border-brand-accent/15 text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-light p-4 transition-colors duration-150 focus-brand touch-manipulation min-h-[72px] motion-safe:transition-transform active:scale-[0.97]"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            <List className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span className="text-[15px] font-semibold leading-tight">
              Browse all picks
            </span>
          </Link>
        </li>
      </ol>
    );
  }

  // ── Selected: sticky horizontal chip strip ──────────────────────────────
  // Sits below the site nav (top-20 / md:top-24 ≈ 80/96px to clear the
  // sticky site nav). Edge-to-edge with the brand-bg behind a soft blur so
  // picks scrolling underneath don't bleed through.
  return (
    <div className="sticky top-20 md:top-24 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 sm:rounded-2xl bg-brand-bg/95 backdrop-blur-sm border-y sm:border border-brand-accent/15 py-2 mb-6 shadow-sm relative">
      {/* Edge fade gradients — visual cue that the strip continues
          off-screen. pointer-events-none so taps still land on the chips
          underneath. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent z-10 sm:rounded-l-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-brand-bg via-brand-bg/80 to-transparent z-10 sm:rounded-r-2xl"
        aria-hidden="true"
      />
      <ol
        ref={stripRef}
        className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-accent/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-brand-accent/70"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(45,169,107,0.4) transparent" }}
        aria-label="Question filter"
      >
        {QUESTIONS.map((q) => {
          const Icon = q.icon;
          const isActive = active.id === q.id;
          const isFav = q.favourite;
          const classes = isActive
            ? isFav
              ? "bg-amber-400 text-brand-text border-amber-500 shadow"
              : "bg-brand-accent text-white border-brand-accent shadow"
            : isFav
              ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
              : "bg-white border-brand-accent/25 text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-light";
          return (
            <li key={q.id} className="flex-shrink-0">
              <Link
                href={isActive ? "/guide" : `/guide?q=${q.id}`}
                scroll={false}
                data-active={isActive}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] font-semibold whitespace-nowrap min-h-[40px] transition-colors duration-150 focus-brand touch-manipulation motion-safe:transition-transform active:scale-[0.95] ${classes}`}
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${isFav ? "fill-current" : ""}`}
                  aria-hidden="true"
                />
                <span>{q.label}</span>
              </Link>
            </li>
          );
        })}
        {/* "All picks" — meta-filter chip. Distinct neutral-dark colour so it
            doesn't get confused with the topic questions. */}
        <li className="flex-shrink-0">
          <Link
            href={active.id === "all" ? "/guide" : "/guide?q=all"}
            scroll={false}
            data-active={active.id === "all"}
            aria-pressed={active.id === "all"}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] font-semibold whitespace-nowrap min-h-[40px] transition-colors duration-150 focus-brand touch-manipulation motion-safe:transition-transform active:scale-[0.95] ${
              active.id === "all"
                ? "bg-brand-text text-white border-brand-text shadow"
                : "bg-white border-brand-accent/25 text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-light"
            }`}
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            <List className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>All picks</span>
          </Link>
        </li>
        {/* Back-to-grid chip — explicit way out, easier to find than
            "tap the active chip again". */}
        <li className="flex-shrink-0">
          <Link
            href="/guide"
            scroll={false}
            className="inline-flex items-center gap-1.5 rounded-full border bg-transparent border-brand-accent/25 text-muted-foreground px-3 py-2 text-[13px] font-semibold whitespace-nowrap min-h-[40px] hover:bg-brand-accent-light/60 hover:text-brand-text transition-colors duration-150 focus-brand touch-manipulation motion-safe:transition-transform active:scale-[0.95]"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            aria-label="Back to all questions"
          >
            <X className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>All questions</span>
          </Link>
        </li>
      </ol>
    </div>
  );
}
