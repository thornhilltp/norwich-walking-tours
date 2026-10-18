"use client";

// Tour cards, the booking box and the booking sheet for the brand homepage.
// Each tour card wears its own tour's look (Tom 2026-10-18): the free tour
// is the taped polaroid, Dark History is black, sepia and Eater lettering
// with fog. "Book free" on a card slides the booking box up from the bottom
// (no long scroll), already in that tour's look. The same box also sits
// further down the page with a tab per tour. Without JavaScript the buttons
// are plain links (/book, the Dark History page).

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
  /** Small label on the photo: "Most days", "Until 6 Nov", "Coming soon". */
  badge?: string;
  image?: { src: string; alt: string };
};

/** Open the booking sheet on a tour (used by cards, hero and sticky bar). */
export function openBooking(key: BookableKey, location: string) {
  trackEvent("book_cta_click", { location });
  window.dispatchEvent(new CustomEvent(OPEN, { detail: key }));
}

function BookButton({
  tour,
  location,
  className,
  style,
  href,
  children,
}: {
  tour: BookableKey;
  location: string;
  className: string;
  style?: CSSProperties;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        openBooking(tour, location);
      }}
    >
      {children}
    </a>
  );
}

/* ── Tour cards: one shared frame, each tour's own flavour ─────────────── */

// Same card for every tour, like Shoebox / Sandemans: real photo on top (or
// left on phones), name, facts, one question, Book. Each tour shows through
// its photo treatment, its title lettering and its colour, not the card shape.
type Look = {
  bg: string;
  text: string;
  sub: string;
  title: CSSProperties;
  photo?: CSSProperties;
  overlay?: string;
  chip: string;
  button: string;
  buttonStyle?: CSSProperties;
  link: string;
};

function looks(eater: CSSProperties): Record<TourCardData["key"], Look> {
  return {
    free: {
      bg: "bg-white",
      text: "text-brand-text",
      sub: "text-brand-text/65",
      title: { ...caveat, fontWeight: 700, color: "#2DA96B", fontSize: 32, lineHeight: 0.95 },
      chip: "bg-brand-accent text-white",
      button: "bg-brand-accent text-white hover:opacity-90",
      buttonStyle: { ...caveat, fontSize: 22, fontWeight: 700 },
      link: "text-brand-accent-text decoration-brand-accent/40",
    },
    dark: {
      bg: "",
      text: "text-white",
      sub: "text-white/60",
      title: { ...eater, color: GLOW, fontSize: 25, lineHeight: 1.05, textShadow: "0 0 14px rgba(90,225,158,0.4)" },
      photo: sepia,
      overlay: "radial-gradient(ellipse at center, transparent 45%, rgba(10,6,2,0.75) 100%)",
      chip: "bg-black/80 text-[#5AE19E] border border-[#5AE19E]/50",
      button: "border-2 border-[#5AE19E]/70 text-[#5AE19E] shadow-[0_0_14px_rgba(90,225,158,0.3)] hover:bg-white/5",
      buttonStyle: { ...eater, fontSize: 17 },
      link: "text-white/85 decoration-white/40",
    },
    private: {
      bg: "bg-white",
      text: "text-brand-text",
      sub: "text-brand-text/65",
      title: { ...lora, fontStyle: "italic", fontWeight: 600, color: "#1A1A1A", fontSize: 26, lineHeight: 1.05 },
      chip: "bg-white/90 text-brand-text",
      button: "border-2 border-brand-text/80 text-brand-text hover:bg-brand-text/5",
      buttonStyle: { ...lora, fontSize: 16, fontWeight: 600 },
      link: "text-brand-text/80 decoration-brand-text/30",
    },
    soon: {
      bg: "bg-[#F4EFE6]",
      text: "text-brand-text",
      sub: "text-brand-text/65",
      title: { ...lora, fontWeight: 700, color: "#1A1A1A", fontSize: 24, lineHeight: 1.05 },
      photo: { filter: "grayscale(1) blur(3px) brightness(1.05)", transform: "scale(1.08)" },
      overlay: "linear-gradient(rgba(244,239,230,0.35), rgba(244,239,230,0.35))",
      chip: "bg-brand-text text-white",
      button: "border-2 border-brand-text/80 text-brand-text hover:bg-brand-text/5",
      buttonStyle: { ...lora, fontSize: 16, fontWeight: 600 },
      link: "text-brand-text/80 decoration-brand-text/30",
    },
  };
}

function TourCard({ c, look }: { c: TourCardData; look: Look }) {
  const bookable = c.key === "free" || c.key === "dark";
  const btnClass = `inline-flex items-center justify-center rounded-full px-5 min-h-[44px] transition ${look.button}`;
  return (
    <article
      className={`relative h-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_12px_30px_-16px_rgba(26,26,26,0.45)] grid grid-cols-[40%_1fr] lg:grid-cols-1 lg:grid-rows-[auto_1fr] ${look.bg}`}
      style={c.key === "dark" ? { backgroundColor: NIGHT } : undefined}
    >
      <div className="relative min-h-[200px] lg:min-h-0 lg:aspect-[4/3] overflow-hidden bg-brand-accent-light">
        {c.image && (
          <Image
            src={c.image.src}
            alt={c.image.alt}
            fill
            sizes="(max-width: 1024px) 40vw, 300px"
            className="object-cover"
            style={look.photo}
            priority={c.key === "free"}
          />
        )}
        {look.overlay && <div aria-hidden className="absolute inset-0" style={{ background: look.overlay }} />}
        {c.badge && (
          <span className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${look.chip}`} style={lora}>
            {c.badge}
          </span>
        )}
      </div>
      {c.key === "dark" && <Fog />}
      <div className="relative flex flex-col p-3.5 lg:p-5">
        <p className={`text-[11.5px] uppercase tracking-[0.16em] font-semibold ${look.sub}`} style={lora}>
          {c.vibe}
        </p>
        <h3 className="mt-1" style={look.title}>
          {c.name}
        </h3>
        {c.meta && (
          <p className={`mt-1.5 text-[14px] leading-snug ${look.sub}`} style={lora}>
            {c.meta}
          </p>
        )}
        <p className={`mt-2 text-[15px] font-semibold leading-snug ${look.text}`} style={lora}>
          {c.hook}
        </p>
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          {bookable ? (
            <BookButton tour={c.key as BookableKey} location={`brand_card_${c.key}`} href={c.href} className={btnClass} style={look.buttonStyle}>
              {c.action}
            </BookButton>
          ) : (
            <a
              href={c.href}
              onClick={() => trackEvent("book_cta_click", { location: `brand_card_${c.key}` })}
              className={btnClass}
              style={look.buttonStyle}
            >
              {c.action}
            </a>
          )}
          {c.details && (
            <a href={c.details} className={`text-[15px] font-semibold underline underline-offset-4 min-h-[44px] inline-flex items-center ${look.link}`} style={lora}>
              What&apos;s it like?
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function TourCards({ cards, eaterFamily }: { cards: TourCardData[]; eaterFamily: string }) {
  const l = looks({ fontFamily: eaterFamily, fontWeight: 400 });
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
      {cards.map((c) => (
        <li key={c.key}>
          <TourCard c={c} look={l[c.key]} />
        </li>
      ))}
    </ul>
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

/** The in-page booking box, further down the page. */
export function BookingSection({ tabs, eaterFamily }: { tabs: BookingTab[]; eaterFamily: string }) {
  const [active, setActive] = useState<BookableKey>(tabs[0].key);
  const dark = active === "dark";
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };

  return (
    <section
      id="book-section"
      className={`relative overflow-hidden py-14 md:py-20 border-t transition-colors duration-500 ${dark ? "border-transparent" : "bg-brand-accent-light/40 border-brand-accent/10"}`}
      style={dark ? { backgroundColor: NIGHT } : undefined}
    >
      {dark && <Fog />}
      <div className="relative brand-container max-w-5xl">
        <div className="text-center">
          <BookingHeading dark={dark} eater={eater} />
          <p className={`mt-4 text-[17px] md:text-lg leading-relaxed max-w-xl mx-auto ${dark ? "text-white/70" : "text-brand-text/70"}`} style={lora}>
            Free to book. Tip what it was worth at the end, by card or cash.
          </p>
        </div>
        <div id="book" className="scroll-mt-24 mt-8 md:mt-10 w-full max-w-xl mx-auto">
          <BookingPanel tabs={tabs} active={active} onPick={setActive} eater={eater} />
        </div>
        <p className={`mt-6 text-center text-[16px] ${dark ? "text-white/60" : "text-brand-text/75"}`} style={lora}>
          Private group?{" "}
          <a
            href="/private-tours"
            className={`font-semibold underline underline-offset-4 ${dark ? "text-white decoration-white/40" : "text-brand-accent-text decoration-brand-accent/40 hover:decoration-brand-accent"}`}
          >
            Ask us about a date →
          </a>
        </p>
      </div>
    </section>
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
