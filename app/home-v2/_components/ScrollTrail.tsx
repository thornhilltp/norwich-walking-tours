"use client";

// ScrollTrail — fixed right-edge in-page navigation for /home-v2.
// Iteration 2 per Tom's feedback:
//   - wiggly Q-curve dashed line (was straight)
//   - bigger, brighter dots
//   - traveling map-pin that slides down as user scrolls
//   - labels go muted by default, dark+brighter on active

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
      setScrollProgress(progress);

      const threshold = window.scrollY + window.innerHeight * 0.35;
      let active = 0;
      sections.forEach((sec, i) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= threshold) active = i;
      });
      setActiveIndex(active);
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
  // Pin position interpolates smoothly with scroll progress, from
  // first dot to last dot. Spring-eased via framer-motion `animate`.
  const pinY = DOT_OFFSET + scrollProgress * (lastDotY - DOT_OFFSET);

  // Build the wiggly Q-curve path through the dot column.
  // Centre of dot column is at x=10 (visually inside the 20px-wide track).
  // Path wobbles ±6px around that line at each gap.
  const pathSegments: string[] = [`M 10 ${DOT_OFFSET}`];
  sections.forEach((_, i) => {
    if (i === 0) return;
    const prevY = (i - 1) * ROW_GAP + DOT_OFFSET;
    const currY = i * ROW_GAP + DOT_OFFSET;
    const midY = (prevY + currY) / 2;
    const wobbleX = i % 2 === 0 ? -6 : 16; // alternate left / right
    pathSegments.push(`Q ${wobbleX} ${midY} 10 ${currY}`);
  });
  const wigglyPath = pathSegments.join(" ");

  return (
    <aside
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-label="Page navigation"
    >
      <div className="relative flex items-start gap-4">
        {/* Labels column — right-aligned */}
        <ol className="flex flex-col text-right" style={{ gap: ROW_GAP - 20 }}>
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

          {/* Traveling map-pin — slides down as user scrolls */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ left: -2 }}
            initial={false}
            animate={{ top: pinY - 10 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
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
