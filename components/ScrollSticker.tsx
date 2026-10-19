"use client";

// A scrapbook sticker that pops onto the page as it scrolls into view
// (free tour page, sticker option C). Static under reduced motion.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function ScrollSticker({ children, className = "", rotate = 0 }: { children: ReactNode; className?: string; rotate?: number }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style: CSSProperties = {
    transform: shown ? `scale(1) rotate(${rotate}deg)` : "scale(0.3) rotate(0deg)",
    opacity: shown ? 1 : 0,
    transition: "transform 0.5s cubic-bezier(0.3, 1.7, 0.5, 1), opacity 0.25s ease",
  };
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute z-20 ${className}`} style={style}>
      {children}
    </div>
  );
}
