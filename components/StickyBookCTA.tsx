"use client";

import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

/**
 * Fixed bottom bar visible on mobile while scrolling.
 * Hidden on /book (user is already booking) and on desktop (nav CTA handles it).
 */
export function StickyBookCTA() {
  const pathname = usePathname();

  // Don't render on the booking page
  if (pathname === "/book") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-bg/95 backdrop-blur-sm border-t border-brand-accent/15 px-4 py-3 safe-area-inset-bottom">
      <a
        href="/book"
        onClick={() => trackEvent("book_cta_click", { location: "sticky_mobile" })}
        className="btn-cta flex items-center justify-center gap-2 w-full h-12 bg-brand-accent text-white rounded-xl text-base font-semibold hover:bg-brand-accent/90 transition-colors duration-150 focus-brand"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        Book your free spot
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
}
