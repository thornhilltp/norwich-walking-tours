"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  /** One image URL per letter. Wraps around if fewer images than letters. */
  letterImages?: string[];
}

/**
 * RevealText — adapted from Components/Reveal Text.txt.
 * Letters spring in on load; hover reveals a background Norwich image per letter.
 * Default text: "NORWICH" — ready to use in hero or section breaks.
 */
export function RevealText({
  text = "NORWICH",
  textColor = "text-brand-text",
  overlayColor = "text-brand-accent",
  fontSize = "text-[80px] md:text-[140px] lg:text-[180px]",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = [
    // Default: Norwich Unsplash images (use ?auto=format&fit=crop&w=1200&q=80)
    "/images/st-georges-stock.png",
    "/images/norwich-market-stock.png",
    "/images/pottergate-stock.png",
    "/images/st-georges-stock.png",
    "/images/norwich-market-stock.png",
    "/images/pottergate-stock.png",
    "/images/st-georges-stock.png",
  ],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = lastLetterDelay * 1000 + springDuration;
    const timer = setTimeout(() => setShowOverlay(true), totalDelay);
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  return (
    <div className="flex items-center justify-center relative" aria-label={text}>
      <div className="flex flex-wrap justify-center" aria-hidden="true">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${fontSize} font-caveat font-black tracking-tight cursor-pointer relative overflow-hidden`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 8,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            {/* Base text */}
            <motion.span
              className={`absolute inset-0 ${textColor}`}
              animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {letter}
            </motion.span>

            {/* Image reveal on hover */}
            <motion.span
              className="text-transparent bg-clip-text bg-cover bg-no-repeat"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                backgroundPosition: hoveredIndex === index ? "10% center" : "0% center",
              }}
              transition={{
                opacity: { duration: 0.1 },
                backgroundPosition: { duration: 3, ease: "easeInOut" },
              }}
              style={{
                backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </motion.span>

            {/* Green sweep overlay on mount */}
            {showOverlay && (
              <motion.span
                className={`absolute inset-0 ${overlayColor} pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
