"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

/**
 * True while any booking widget iframe is on screen. The bar slides away
 * then, so it doesn't cover the booking form people are filling in
 * (Tom 2026-10-24). Widgets mount a tick after the page (BookingFrame
 * computes its src client side), so new iframes are picked up as they appear.
 */
function useBookingWidgetInView(pathname: string | null) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setInView(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    const watched = new Set<Element>();
    const scan = () => {
      document.querySelectorAll('iframe[src*="norwich-booking"]').forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
    return () => {
      io.disconnect();
      mo.disconnect();
      setInView(false);
    };
  }, [pathname]);

  return inView;
}

/**
 * Fixed bottom bar visible on mobile while scrolling.
 * Hidden on /book (user is already booking) and on desktop (nav CTA handles it).
 * On /tours/[slug] pages the action becomes that tour's waiting list —
 * a "book the free tour" bar on another tour's page sells the wrong
 * thing. Swaps to the booking widget slot when tours go bookable.
 */
export function StickyBookCTA() {
  const pathname = usePathname();
  const widgetInView = useBookingWidgetInView(pathname);

  // Don't render on the booking page
  if (pathname === "/book") return null;

  const isTourPage = /^\/tours\/.+/.test(pathname ?? "");
  const href = isTourPage ? "#book" : "/book";
  const label = "Book your spot (free)";
  // Tours are bookable now, so name the tour rather than "waitlist" (Tom 2026-10-11)
  const tourSlug = isTourPage ? pathname!.split("/")[2] : "";
  const location = isTourPage ? `sticky_tour_${tourSlug}` : "sticky_mobile";

  return (
    <div
      aria-hidden={widgetInView || undefined}
      className={`sticky-book-bar fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-bg/95 backdrop-blur-sm border-t border-brand-accent/15 px-4 py-3 safe-area-inset-bottom transition-transform duration-200 ${widgetInView ? "translate-y-full" : ""}`}
    >
      <a
        href={href}
        tabIndex={widgetInView ? -1 : undefined}
        onClick={() => trackEvent("book_cta_click", { location })}
        className="btn-cta flex items-center justify-center gap-2 w-full h-12 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 focus-brand"
      >
        {label}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
}
