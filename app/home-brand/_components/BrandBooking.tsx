"use client";

// Tour cards, the booking box and the booking sheet for the brand homepage.
// Each tour card wears its own tour's look (Tom 2026-10-18): the free tour
// is the taped polaroid, Dark History is black, sepia and Eater lettering
// with fog. "Book free" on a card slides the booking box up from the bottom
// (no long scroll), already in that tour's look. The same box also sits
// further down the page with a tab per tour. Without JavaScript the buttons
// are plain links (/book, the Dark History page).

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { BookingFrame } from "@/components/BookingFrame";
import { Fog } from "@/app/tours/_components/Spooky";
import { trackEvent } from "@/lib/tracking";

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const OPEN = "brand:open-booking";

// Dark History palette, from its own page.
const NIGHT = "#121211";
const GLOW = "#5AE19E";

export type BookableKey = "free" | "dark";

export type BookingTab = {
  key: BookableKey;
  label: string;
  when: string;
  /** Booking-app slug; undefined = the free tour. */
  bookingTour?: string;
};

export type TourCardData = {
  key: BookableKey | "private" | "soon";
  vibe: string;
  name: string;
  meta: string;
  hook: string;
  action: string;
  /** No-JS fallback for bookable tours; the real link for the others. */
  href: string;
  details?: string;
  /** Card subheading, three wordings to compare (a / b / c). */
  subs: { a: string; b: string; c: string };
  /** Next bookable walk, live from the booking app. */
  next?: { label: string; spotsLeft: number } | null;
  /** Who it suits, the card's subheading: "Perfect for …". */
  perfectFor?: string;
  /** Stop name on the route: "By day", "After dark", "Coming soon". */
  badge?: string;
  image?: { src: string; alt: string };
};

/** Open the booking sheet on a tour (used by cards, hero and sticky bar). */
export function openBooking(key: BookableKey, location: string) {
  trackEvent("book_cta_click", { location });
  window.dispatchEvent(new CustomEvent(OPEN, { detail: key }));
}

/* ── Booking panel: tabs + widget, themed to the tour picked ──────────── */

function BookingPanel({
  tabs,
  active,
  onPick,
  eater,
}: {
  tabs: BookingTab[];
  active: BookableKey;
  onPick: (k: BookableKey) => void;
  eater: CSSProperties;
}) {
  const tab = tabs.find((t) => t.key === active) ?? tabs[0];
  const dark = tab.key === "dark";
  return (
    <>
      <div role="tablist" aria-label="Choose your tour" className="grid gap-2 mb-3" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((t) => {
          const on = t.key === active;
          const isDark = t.key === "dark";
          const cls = on
            ? isDark
              ? "bg-black border-[#5AE19E]/70 text-white shadow-[0_0_16px_rgba(90,225,158,0.3)]"
              : "bg-brand-accent border-brand-accent text-white"
            : dark
              ? "bg-white/5 border-white/15 text-white/80 hover:border-white/40"
              : "bg-white border-brand-accent/25 text-brand-text hover:border-brand-accent/60";
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => onPick(t.key)}
              className={`rounded-xl border-2 px-3 py-2 text-left min-h-[56px] transition-colors ${cls}`}
            >
              <span className="block text-[17px] leading-tight" style={isDark ? { ...eater, color: on ? GLOW : undefined } : { ...caveat, fontSize: 22, fontWeight: 700 }}>
                {t.label}
              </span>
              <span className={`block text-[13px] leading-snug ${on || dark ? "text-white/70" : "text-brand-text/60"}`} style={lora}>
                {t.when}
              </span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className={`rounded-2xl shadow-xl overflow-hidden border ${dark ? "border-[#5AE19E]/30 bg-black" : "border-brand-accent/15 bg-white"}`}>
        <BookingFrame key={tab.key} tour={tab.bookingTour} height={540} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
      </div>
    </>
  );
}

function BookingHeading({ dark, eater, small }: { dark: boolean; eater: CSSProperties; small?: boolean }) {
  return (
    <h2 className="leading-[1.0]">
      <span
        className={`inline font-semibold leading-[1.05] tracking-[-0.01em] ${small ? "text-[26px]" : "text-[clamp(30px,3.6vw,44px)]"} ${dark ? "text-white" : "text-brand-text"}`}
        style={lora}
      >
        {dark ? "Dare you" : "Book your"}
      </span>{" "}
      {dark ? (
        <span className={`inline leading-[0.95] ${small ? "text-[30px]" : "text-[clamp(36px,4.4vw,56px)]"}`} style={{ ...eater, color: GLOW, textShadow: "0 0 18px rgba(90,225,158,0.45)" }}>
          walk it?
        </span>
      ) : (
        <span className={`inline leading-[0.95] text-brand-accent ${small ? "text-[38px]" : "text-[clamp(42px,5vw,64px)]"}`} style={caveat}>
          walk.
        </span>
      )}
    </h2>
  );
}

/** The booking box as a sheet: slides up from the bottom on phones, a
    centred panel on desktop. Opened by openBooking(). */
export function BookingSheet({ tabs, eaterFamily }: { tabs: BookingTab[]; eaterFamily: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<BookableKey>(tabs[0].key);
  const closeRef = useRef<HTMLButtonElement>(null);
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const key = (e as CustomEvent<BookableKey>).detail;
      if (tabs.some((t) => t.key === key)) setActive(key);
      setOpen(true);
    };
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, [tabs]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const dark = active === "dark";

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/55 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={close} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a tour"
        className={`absolute inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:bottom-auto md:top-1/2 w-full md:w-[560px] max-h-[94dvh] overflow-y-auto rounded-t-3xl md:rounded-3xl px-4 pt-3 pb-6 md:p-7 shadow-2xl transition-all duration-300 ${
          open ? "translate-y-0 opacity-100 md:-translate-x-1/2 md:-translate-y-1/2" : "translate-y-full opacity-0 md:-translate-x-1/2 md:-translate-y-[45%]"
        } ${dark ? "" : "bg-brand-bg"}`}
        style={dark ? { backgroundColor: NIGHT } : undefined}
      >
        {open && dark && <Fog />}
        <div className="relative">
          <div aria-hidden className={`md:hidden mx-auto mb-3 h-1.5 w-12 rounded-full ${dark ? "bg-white/25" : "bg-brand-text/20"}`} />
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <BookingHeading dark={dark} eater={eater} small />
              <p className={`mt-1 text-[14px] ${dark ? "text-white/65" : "text-brand-text/65"}`} style={lora}>
                Free to book. Tip what it was worth.
              </p>
            </div>
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close"
              className={`shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full ${dark ? "bg-white/10 text-white" : "bg-brand-text/5 text-brand-text"}`}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {open && <BookingPanel tabs={tabs} active={active} onPick={setActive} eater={eater} />}
        </div>
      </div>
    </div>
  );
}

/** Phones: this page's own sticky bar, "Book a tour", which opens the sheet.
    The site-wide free-tour bar is hidden on this page. */
export function BrandStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-bg/95 backdrop-blur-sm border-t border-brand-accent/15 px-4 py-3">
      <a
        href="#book-section"
        onClick={(e) => {
          e.preventDefault();
          openBooking("free", "brand_sticky");
        }}
        className="flex items-center justify-center w-full h-12 bg-brand-accent text-white rounded-xl text-[22px] font-bold"
        style={caveat}
      >
        Book a tour (free)
      </a>
    </div>
  );
}
