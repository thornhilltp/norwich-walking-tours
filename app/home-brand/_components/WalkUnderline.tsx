"use client";

// The nav's wavy, dotted walking-path underline (components/Nav.tsx), as a
// brand mark under key words (Tom 2026-10-18). Draws itself in from the
// left when it scrolls into view; already drawn under reduced motion.

import { useEffect, useRef, useState, type ReactNode } from "react";

export function WalkUnderline({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block pb-[0.12em] ${className}`}>
      {children}
      <svg
        viewBox="0 0 60 6"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 h-[0.16em] min-h-[5px] w-full transition-[clip-path] duration-1000 ease-out ${
          shown ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_100%_0_0)]"
        }`}
      >
        <path d="M 1 3 Q 10 0 20 3 T 40 3 T 59 3" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

/** A text link with the nav's hover underline. */
export function WalkLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`group relative inline-block pb-2 font-semibold ${className}`}>
      {children}
      <svg
        viewBox="0 0 60 6"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[6px] w-full transition-[clip-path] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
      >
        <path d="M 1 3 Q 10 0 20 3 T 40 3 T 59 3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 4" strokeLinecap="round" fill="none" />
      </svg>
    </a>
  );
}
