"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global Framer Motion configuration. `reducedMotion="user"` makes every
 * motion component in the tree respect the OS-level `prefers-reduced-motion`
 * setting — animations collapse to duration 0 for users who've opted out
 * (accessibility + WCAG AA requirement).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
