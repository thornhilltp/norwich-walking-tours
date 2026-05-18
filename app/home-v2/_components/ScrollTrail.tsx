"use client";

// ScrollTrail — fixed right-edge in-page navigation for /home-v2.
// Per Tom's brief (adapted to use Lora instead of JetBrains Mono):
// vertical dashed line + 7 dots, active dot brightens with scroll
// position, labels are anchor links. Hidden below xl breakpoint.
//
// Visual concept: like a stamped pilgrim's passport running down
// the side of the page. No box, no shadow — floats over content.

import { useEffect, useState } from "react";

interface TrailSection {
  id: string;
  label: string;
}

const sections: TrailSection[] = [
  { id: "top", label: "Hello" },
  { id: "stories", label: "Stories" },
  { id: "reviews", label: "Reviews" },
  { id: "tour-map", label: "The walk" },
  { id: "practical", label: "Practical" },
  { id: "book-section", label: "Book" },
  { id: "faq", label: "FAQs" },
];

const ROW_GAP = 48; // px between dots

export function ScrollTrail() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const updateActive = () => {
      raf = 0;
      const threshold = window.scrollY + window.innerHeight * 0.35;
      let active = 0;
      sections.forEach((sec, i) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= threshold) {
          active = i;
        }
      });
      setActiveIndex(active);
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const totalHeight = (sections.length - 1) * ROW_GAP;

  return (
    <aside
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-label="Page navigation"
    >
      {/* Vertical dashed line connecting the dots */}
      <svg
        width="2"
        height={totalHeight}
        className="absolute right-[7px] top-2 pointer-events-none"
        aria-hidden="true"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2={totalHeight}
          stroke="#2DA96B"
          strokeWidth="2"
          strokeDasharray="1 6"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>

      <ul className="relative flex flex-col gap-9">
        {sections.map((sec, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={`group flex items-center justify-end gap-3 transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-55 hover:opacity-100"
                }`}
              >
                <span
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {sec.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`block w-3 h-3 rounded-full border-2 border-brand-accent transition-transform duration-200 ${
                    isActive ? "bg-brand-accent scale-110" : "bg-white group-hover:scale-110"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
