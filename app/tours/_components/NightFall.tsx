"use client";

import { useEffect, useRef } from "react";

/**
 * "By the time you get there, night has fallen." Scroll-linked dusk-to-night
 * for the Dare you walk it section (Tom 2026-10-11, scroll-craft review).
 * Drop it as the first child of a `relative` section: it darkens that
 * section's own background and lets a few stars come out as the visitor
 * scrolls through it. Purely decorative, sits under the content (z-0).
 * Scroll-linked, never autonomous, so it holds still when the visitor stops.
 */
export function NightFall() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top reaches the lower part of the screen,
      // 1 once its bottom has risen to the middle of the screen.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      el.style.setProperty("--night", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ ["--night" as string]: 0 }}
    >
      {/* Dusk: a faint violet light along the top, gone by nightfall */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(120, 70, 110, 0.28), transparent 55%)",
          opacity: "calc(1 - var(--night))",
        }}
      />
      {/* Night: the red sinks towards black */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8, 5, 6, 0.72)", opacity: "var(--night)" }}
      />
      {/* Stars come out in the second half */}
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{
          opacity: "calc((var(--night) - 0.45) * 1.8)",
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 12% 18%, #f5ebda, transparent 60%)," +
            "radial-gradient(1px 1px at 28% 8%, #f5ebda, transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 47% 22%, #f5ebda, transparent 60%)," +
            "radial-gradient(1px 1px at 63% 11%, #f5ebda, transparent 60%)," +
            "radial-gradient(2px 2px at 79% 26%, #f5ebda, transparent 60%)," +
            "radial-gradient(1px 1px at 91% 9%, #f5ebda, transparent 60%)," +
            "radial-gradient(1px 1px at 36% 34%, #f5ebda, transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 85% 44%, #f5ebda, transparent 60%)," +
            "radial-gradient(1px 1px at 6% 40%, #f5ebda, transparent 60%)",
        }}
      />
    </div>
  );
}
