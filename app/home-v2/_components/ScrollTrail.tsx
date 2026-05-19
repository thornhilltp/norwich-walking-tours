"use client";

// ScrollTrail — fixed right-edge in-page navigation for /home-v2.
// Iteration 3 per Tom's feedback:
//   - HIDDEN on Hero (fades in after user scrolls past Hero) — was
//     unreadable against the dark hero image bg.
//   - Pin SYNCED to active section (with smooth fractional movement
//     within the current section) — was using raw scroll progress
//     which desynced from where the user actually was.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrailSection {
  id: string;
  label: string;
}

const sections: TrailSection[] = [
  { id: "top", label: "Hello" },
  { id: "stories", label: "Stories" },
  { id: "reviews", label: "Reviews" },
  { id: "tour-map", label: "The walk" },
  { id: "tom", label: "Tom" },
  { id: "book-section", label: "Book" },
  { id: "faq", label: "FAQs" },
];

// Layout constants
const ROW_GAP = 56; // px from one dot to the next
const DOT_OFFSET = 12; // px from top of trail to first dot centre

export function ScrollTrail() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Fractional position through the trail (e.g. 2.4 = 40% past dot 2,
  // heading toward dot 3). Used for smooth pin animation that's
  // always near the active dot, not raw scroll-percent through page.
  const [pinFractional, setPinFractional] = useState(0);
  // Hide until user has scrolled past the Hero (Hero has dark image
  // bg, ScrollTrail labels are unreadable against it).
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;

      // Threshold = 35% from top of viewport. The section whose
      // offsetTop is most recently above this threshold is "active".
      const threshold = window.scrollY + window.innerHeight * 0.35;

      let active = 0;
      sections.forEach((sec, i) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= threshold) active = i;
      });
      setActiveIndex(active);

      // Calculate fractional position within current section so the pin
      // moves smoothly between dots instead of snapping.
      const currentEl = document.getElementById(sections[active].id);
      const nextSec = sections[active + 1];
      const nextEl = nextSec ? document.getElementById(nextSec.id) : null;

      let fractional = 0;
      if (currentEl && nextEl) {
        const sectionStart = currentEl.offsetTop;
        const sectionEnd = nextEl.offsetTop;
        const span = sectionEnd - sectionStart;
        if (span > 0) {
          fractional = (threshold - sectionStart) / span;
          fractional = Math.max(0, Math.min(1, fractional));
        }
      }
      setPinFractional(active + fractional);

      // Show trail only after user scrolls 60% of the viewport
      // (Hero is ~90vh, so this is roughly Hero leaving viewport).
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const lastDotY = (sections.length - 1) * ROW_GAP + DOT_OFFSET;
  const pinY = DOT_OFFSET + pinFractional * ROW_GAP;

  // Build the wiggly Q-curve path through the dot column.
  const pathSegments: string[] = [`M 10 ${DOT_OFFSET}`];
  sections.forEach((_, i) => {
    if (i === 0) return;
    const prevY = (i - 1) * ROW_GAP + DOT_OFFSET;
    const currY = i * ROW_GAP + DOT_OFFSET;
    const midY = (prevY + currY) / 2;
    const wobbleX = i % 2 === 0 ? -6 : 16;
    pathSegments.push(`Q ${wobbleX} ${midY} 10 ${currY}`);
  });
  const wigglyPath = pathSegments.join(" ");

  return (
    <aside
      className={`fixed right-3 lg:right-8 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500 block md:hidden lg:block ${
        pastHero ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Page navigation"
      aria-hidden={!pastHero}
    >
      <div className="relative flex items-start gap-4">
        {/* Labels column — hidden below 2xl (1536px) because at 1280-1535px
            viewports it overlaps the brand-container content. At 2xl+ the
            right gutter opens up enough to show labels cleanly. */}
        <ol className="hidden 2xl:flex flex-col text-right" style={{ gap: ROW_GAP - 20 }}>
          {sections.map((sec, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={sec.id} className="h-5 flex items-center justify-end">
                <a
                  href={`#${sec.id}`}
                  className={`text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-brand-text"
                      : "text-muted-foreground/55 hover:text-brand-text"
                  }`}
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {sec.label}
                </a>
              </li>
            );
          })}
        </ol>

        {/* Track column — wiggly path + dots + pin */}
        <div
          className="relative"
          style={{ width: 24, height: lastDotY + DOT_OFFSET + 4 }}
        >
          {/* Wiggly dashed path */}
          <svg
            width="24"
            height={lastDotY + DOT_OFFSET + 4}
            className="absolute inset-0 pointer-events-none overflow-visible"
            aria-hidden="true"
          >
            <path
              d={wigglyPath}
              stroke="#2DA96B"
              strokeWidth="2"
              strokeDasharray="1 6"
              strokeLinecap="round"
              opacity="0.5"
              fill="none"
            />
          </svg>

          {/* Dots */}
          <ol
            className="absolute inset-0 flex flex-col items-center"
            style={{ gap: ROW_GAP - 20, paddingTop: DOT_OFFSET - 10 }}
          >
            {sections.map((sec, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={sec.id} className="h-5 w-5 flex items-center justify-center">
                  <a
                    href={`#${sec.id}`}
                    aria-label={`Jump to ${sec.label}`}
                    className="block"
                  >
                    <span
                      aria-hidden="true"
                      className={`block rounded-full border-2 border-brand-accent transition-all duration-200 ${
                        isActive
                          ? "w-4 h-4 bg-brand-accent scale-110"
                          : "w-3 h-3 bg-brand-bg hover:scale-125"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ol>

          {/* Travelling map-pin — slides to fractional position within
              the currently-active section. Snaps cleanly between dots
              via framer-motion spring instead of jumping. */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ left: -2 }}
            initial={false}
            animate={{ top: pinY - 10 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            aria-hidden="true"
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path
                d="M 10 0 C 4.5 0 0 4.3 0 9.6 C 0 16.6 10 22 10 22 S 20 16.6 20 9.6 C 20 4.3 15.5 0 10 0 Z"
                fill="#2DA96B"
                stroke="#FCFAF8"
                strokeWidth="1.5"
              />
              <circle cx="10" cy="9.5" r="3" fill="#FCFAF8" />
            </svg>
          </motion.div>
        </div>
      </div>
    </aside>
  );
}
