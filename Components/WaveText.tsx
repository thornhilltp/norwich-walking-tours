"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface WaveTextProps {
  text?: string;
  className?: string;
}

/**
 * WaveText — adapted from Components/wave text.txt (Text_03 pattern).
 * Letters bounce up with spring physics on hover.
 * Use on nav links, CTA labels, or section headings.
 */
export function WaveText({ text = "Book your spot", className = "" }: WaveTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-block cursor-pointer",
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            initial: { y: 0, scale: 1 },
            hover: {
              y: -4,
              scale: 1.15,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: index * 0.03,
              },
            },
          }}
        >
          {/* Preserve spaces */}
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
