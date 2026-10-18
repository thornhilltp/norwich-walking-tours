"use client";

// Tour cards, the booking box and the booking sheet for the brand homepage.
// Each tour card wears its own tour's look (Tom 2026-10-18): the free tour
// is the taped polaroid, Dark History is black, sepia and Eater lettering
// with fog. "Book free" on a card slides the booking box up from the bottom
// (no long scroll), already in that tour's look. The same box also sits
// further down the page with a tab per tour. Without JavaScript the buttons
// are plain links (/book, the Dark History page).

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { BookingFrame } from "@/components/BookingFrame";
import { Fog, StoryLantern } from "@/app/tours/_components/Spooky";
import { LetterGirl } from "./LetterGirl";
import { trackEvent } from "@/lib/tracking";

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const OPEN = "brand:open-booking";

// Dark History palette, from its own page.
const NIGHT = "#121211";
const GLOW = "#5AE19E";
const sepia: CSSProperties = { filter: "sepia(0.55) contrast(1.15) brightness(0.85) saturate(0.8)" };

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

/* ── Tours as stops on a walking route ─────────────────────────────────── */

// Tom 2026-10-18: the brand is the walk. The free tour's language (cream
// paper, taped polaroids, Caveat, the green dashed route) is the crew's
// language; each tour keeps its own touch inside it. Dark History gets a
// night polaroid: sepia photo, Eater caption, a hanging lantern. No glass,
// no glossy cards, no pill chips. Phones swipe along the route; desktop
// shows every stop in a row.

const tapes = ["#F4C26B", "#9FD6B8", "#F2A7A0", "#C9B8E8"];

function Stop({ c, i, last, eater }: { c: TourCardData; i: number; last: boolean; eater: CSSProperties }) {
  const dark = c.key === "dark";
  const soon = c.key === "soon";
  const rot = i % 2 === 0 ? -2 : 2;
  const caption: CSSProperties = dark
    ? { ...eater, color: GLOW, fontSize: 22, lineHeight: 1.05, textShadow: "0 0 12px rgba(90,225,158,0.45)" }
    : { ...caveat, fontWeight: 700, fontSize: 30, lineHeight: 0.95, color: soon ? "#1A1A1A" : "#2DA96B" };
  // One tap target per tour (Tom 2026-10-18: too many buttons): the whole
  // stop opens that tour's page. Booking straight from the homepage is the
  // sticky bar (phones) and the menu button (desktop).
  const href = c.details ?? c.href;
  // Hover in each tour's own mood (Tom 2026-10-18): the free tour's
  // polaroid lifts off the page; Dark History doesn't move, it glows and the
  // grey girl steps in; the invitation straightens; the mystery sharpens.
  const hover = dark
    ? "[transform:rotate(var(--r))] group-hover:shadow-[0_0_38px_rgba(90,225,158,0.45)]"
    : soon
      ? "[transform:rotate(var(--r))] group-hover:[transform:rotate(0deg)]"
      : c.key === "private"
        ? "[transform:rotate(var(--r))] group-hover:[transform:rotate(0deg)_translateY(-6px)]"
        : "[transform:rotate(var(--r))] group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.05)] group-hover:shadow-[4px_22px_36px_-14px_rgba(60,40,20,0.7)]";
  return (
    <li className="relative shrink-0 w-[78%] sm:w-[46%] lg:w-auto snap-center">
      {/* Route to the next stop: starts and ends on the pins. */}
      {!last && (
        <svg
          aria-hidden
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-[26px] top-[14px] h-5 w-[calc(100%+1.5rem)] lg:w-[calc(100%+2rem)]"
        >
          <path
            d="M0 10 C 12 2, 22 18, 34 10 S 56 2, 67 10 S 88 18, 100 10"
            fill="none"
            stroke="#2DA96B"
            strokeOpacity="0.6"
            strokeWidth="3"
            strokeDasharray="7 8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      <a
        href={href}
        onClick={() => trackEvent("tour_card_click", { tour: c.key })}
        className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
      >
        {/* Map pin + stop name, on the route line. */}
        <div className="relative z-10 flex items-center gap-2 mb-3 pl-2.5">
          <svg viewBox="-14 -38 28 40" className="h-10 w-8 shrink-0" aria-hidden="true">
            <path d="M0 0 C -8 -10 -13 -16 -13 -24 A 13 13 0 1 1 13 -24 C 13 -16 8 -10 0 0 Z" fill={dark ? NIGHT : "#2DA96B"} />
            <circle cx="0" cy="-24" r="5" fill="#FCFAF8" />
          </svg>
          <span className="text-[24px] font-bold leading-none text-brand-text/80" style={caveat}>
            {c.badge}
          </span>
        </div>
        {/* The polaroid pops out on hover. */}
        <figure
          className={`relative m-0 p-2.5 pb-4 border shadow-[2px_12px_26px_-12px_rgba(60,40,20,0.6)] transition-[transform,box-shadow] duration-500 ease-out ${hover}`}
          style={{
            ["--r" as string]: `${rot}deg`,
            backgroundColor: dark ? "#1B1A18" : "#FFFFFF",
            borderColor: dark ? "#2A2724" : "#EAE0D4",
          } as CSSProperties}
        >
          {dark && (
            <span className="absolute -top-12 right-3 z-20 scale-75 origin-top">
              <StoryLantern />
            </span>
          )}
          <span
            aria-hidden="true"
            className="absolute -top-[11px] left-1/2 w-20 h-6 rounded-[2px] z-10"
            style={{
              transform: "translateX(-50%) rotate(-3deg)",
              backgroundColor: dark ? "#3A3530" : tapes[i % tapes.length],
              boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
            }}
          />
          <div className="relative aspect-square overflow-hidden bg-brand-accent-light">
            {c.image && (
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 260px"
                className={`object-cover transition-[filter] duration-700 ${dark ? "group-hover:brightness-75" : ""} ${soon ? "[filter:grayscale(1)_blur(4px)] group-hover:[filter:grayscale(1)_blur(1.5px)] scale-[1.08]" : ""}`}
                style={dark ? sepia : undefined}
                priority={i === 0}
              />
            )}
            {dark && (
              <>
                <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(10,6,2,0.75) 100%)" }} />
                {/* The grey girl from Holly's reel, peeking in. */}
                <span className="absolute -bottom-2 right-1 h-[62%] transition-all duration-700 ease-out translate-x-[35%] opacity-50 group-hover:translate-x-0 group-hover:opacity-100">
                  <LetterGirl className="h-full w-auto" />
                </span>
              </>
            )}
            {soon && (
              <span className="absolute inset-0 flex items-center justify-center text-[110px] leading-none text-white/90 transition-transform duration-500 group-hover:scale-75 group-hover:rotate-12" style={caveat} aria-hidden>
                ?
              </span>
            )}
          </div>
          <figcaption className="relative pt-3 px-1 min-h-[64px]">
            <span className="block" style={caption}>
              {c.name}
            </span>
          </figcaption>
        </figure>
        <div className="pt-4 px-1">
          {c.perfectFor && (
            <p className="text-[22px] font-bold leading-tight text-brand-accent" style={caveat}>
              Perfect for {c.perfectFor}
            </p>
          )}
          {c.meta && (
            <p className="mt-1 text-[14px] font-semibold text-brand-text/60" style={lora}>
              {c.meta}
            </p>
          )}
          <p className="mt-1.5 text-[16px] leading-snug text-brand-text/85" style={lora}>
            {c.hook}
          </p>
        </div>
      </a>
    </li>
  );
}

export function TourCards({ cards, eaterFamily }: { cards: TourCardData[]; eaterFamily: string }) {
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  return (
    <div className="relative -mx-4 lg:mx-0">
      <ol className="relative flex lg:grid lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory px-6 lg:px-0 pt-14 pb-6 list-none m-0 [scrollbar-width:none]">
        {cards.map((c, i) => (
          <Stop key={c.key} c={c} i={i} last={i === cards.length - 1} eater={eater} />
        ))}
      </ol>
    </div>
  );
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
