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
const mono: CSSProperties = { fontFamily: "ui-monospace, 'Courier New', monospace" };
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

/* ── Tour cards, one look per tour ────────────────────────────────────── */

function Photo({ c, style, priority }: { c: TourCardData; style?: CSSProperties; priority?: boolean }) {
  if (!c.image) return null;
  return (
    <Image
      src={c.image.src}
      alt={c.image.alt}
      fill
      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 45vw, 280px"
      className="object-cover"
      style={style}
      priority={priority}
    />
  );
}

// Phones: photo left, words right, so all four fit in about one screen.
// Desktop: four equal columns.
const shell = "grid grid-cols-[38%_1fr] lg:grid-cols-1 lg:grid-rows-[auto_1fr] h-full";

function FreeCard({ c }: { c: TourCardData }) {
  return (
    <article
      className={`relative ${shell} gap-3 lg:gap-0 bg-white border border-[#EAE0D4] rounded-[4px] p-2.5 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]`}
      style={{ transform: "rotate(-1deg)" }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[9px] left-[19%] lg:left-1/2 w-14 h-5 rounded-[3px] z-10"
        style={{ transform: "translateX(-50%) rotate(-3deg)", backgroundColor: "#F4C26B", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
      />
      <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-[2px] bg-brand-accent-light self-start">
        <Photo c={c} priority />
      </div>
      <div className="flex flex-col lg:px-1 lg:pt-3">
        <p className="text-[30px] lg:text-[34px] font-bold leading-[0.95] text-brand-accent" style={caveat}>
          {c.vibe}
        </p>
        <Words c={c} />
        <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <BookButton
            tour="free"
            location="brand_card_free"
            href={c.href}
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-5 min-h-[44px] text-[22px] font-bold text-white shadow-md hover:opacity-90"
            style={caveat}
          >
            {c.action}
          </BookButton>
          {c.details && <DetailsLink href={c.details} className="text-brand-accent-text decoration-brand-accent/40" />}
        </div>
      </div>
    </article>
  );
}

function DarkCard({ c, eater }: { c: TourCardData; eater: CSSProperties }) {
  return (
    <article
      className={`relative ${shell} gap-3 lg:gap-0 overflow-hidden rounded-[4px] p-2.5 lg:p-0 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)]`}
      style={{ backgroundColor: NIGHT }}
    >
      <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-[2px] lg:rounded-none self-start">
        <Photo c={c} style={sepia} priority />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center, transparent 40%, rgba(10,6,2,0.8) 100%), linear-gradient(to bottom, transparent 60%, ${NIGHT} 100%)` }}
        />
      </div>
      <Fog />
      <div className="relative flex flex-col lg:px-3.5 lg:pb-3.5 lg:-mt-4">
        <p className="text-[24px] lg:text-[28px] leading-[1.0]" style={{ ...eater, color: GLOW, textShadow: "0 0 14px rgba(90,225,158,0.45)" }}>
          {c.vibe}
        </p>
        <Words c={c} dark />
        <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <BookButton
            tour="dark"
            location="brand_card_dark"
            href={c.href}
            className="inline-flex items-center justify-center rounded-full border-2 px-5 min-h-[44px] text-[17px] shadow-[0_0_14px_rgba(90,225,158,0.3)] hover:bg-white/5"
            style={{ ...eater, color: GLOW, borderColor: "rgba(90,225,158,0.7)" }}
          >
            {c.action}
          </BookButton>
          {c.details && <DetailsLink href={c.details} className="text-white/85 decoration-white/40" />}
        </div>
      </div>
    </article>
  );
}

/** Private tours: an invitation. (No look of their own yet; a first idea.) */
function PrivateCard({ c }: { c: TourCardData }) {
  return (
    <article className="relative h-full rounded-[4px] bg-[#FFFDF7] p-2 shadow-[0_10px_24px_-14px_rgba(26,26,26,0.45)] border border-brand-text/10">
      <div className={`${shell} gap-3 lg:gap-0 border border-brand-accent/50 rounded-[2px] p-2`}>
        <div className="relative aspect-[4/5] lg:aspect-[4/3] overflow-hidden rounded-t-[999px] bg-brand-accent-light self-start">
          <Photo c={c} />
        </div>
        <div className="flex flex-col lg:pt-3 lg:text-center">
          <p className="text-[11.5px] uppercase tracking-[0.22em] text-brand-accent-text font-semibold" style={lora}>
            You&apos;re invited
          </p>
          <p className="mt-1 text-[24px] lg:text-[26px] italic leading-[1.05] text-brand-text" style={lora}>
            {c.vibe}
          </p>
          <Words c={c} />
          <div className="mt-auto pt-3">
            <a
              href={c.href}
              onClick={() => trackEvent("book_cta_click", { location: "brand_card_private" })}
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-accent px-5 min-h-[44px] text-[16px] font-semibold italic text-brand-accent-text hover:bg-brand-accent-light"
              style={lora}
            >
              {c.action}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Coming soon: kraft paper, a stamped question mark, still under wraps. */
function SoonCard({ c }: { c: TourCardData }) {
  return (
    <article
      className={`relative ${shell} gap-3 lg:gap-0 rounded-[3px] p-2.5 lg:p-3 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]`}
      style={{
        backgroundColor: "#D9C29C",
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px)",
        transform: "rotate(1deg)",
      }}
    >
      <div className="relative aspect-[4/5] lg:aspect-square flex items-center justify-center rounded-[2px] border-2 border-dashed border-[#7A5C33]/50 self-start">
        <span className="text-[72px] lg:text-[84px] leading-none text-[#7A5C33]/70" style={mono} aria-hidden="true">
          ?
        </span>
        <span
          className="absolute bottom-3 left-1/2 rounded-[3px] border-[3px] border-[#B3392F] px-1.5 py-0.5 text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.1em] text-[#B3392F] whitespace-nowrap"
          style={{ ...mono, transform: "translateX(-50%) rotate(-12deg)", opacity: 0.85 }}
        >
          Coming soon
        </span>
      </div>
      <div className="flex flex-col lg:pt-3">
        <p className="text-[21px] lg:text-[23px] font-bold leading-[1.05] text-[#3B2A14]" style={mono}>
          {c.vibe}
        </p>
        <p className="mt-2 text-[15px] leading-snug text-[#3B2A14]/85" style={mono}>
          {c.hook}
        </p>
        <div className="mt-auto pt-3">
          <a
            href={c.href}
            className="inline-flex items-center justify-center rounded-[3px] border-2 border-[#3B2A14] px-4 min-h-[44px] text-[15px] font-bold text-[#3B2A14] hover:bg-[#3B2A14]/10"
            style={mono}
          >
            {c.action}
          </a>
        </div>
      </div>
    </article>
  );
}

function Words({ c, dark }: { c: TourCardData; dark?: boolean }) {
  return (
    <>
      <p className={`mt-1.5 text-[16px] font-bold leading-snug ${dark ? "text-white" : "text-brand-text"}`} style={lora}>
        {c.name}
      </p>
      <p className={`mt-0.5 text-[14px] leading-snug ${dark ? "text-white/65" : "text-brand-text/65"}`} style={lora}>
        {c.meta}
      </p>
      <p className={`mt-2 text-[15px] font-semibold leading-snug ${dark ? "text-white/90" : "text-brand-text"}`} style={lora}>
        {c.hook}
      </p>
    </>
  );
}

function DetailsLink({ href, className }: { href: string; className: string }) {
  return (
    <a href={href} className={`text-[15px] font-semibold underline underline-offset-4 min-h-[44px] inline-flex items-center ${className}`} style={lora}>
      What&apos;s it like?
    </a>
  );
}

export function TourCards({ cards, eaterFamily }: { cards: TourCardData[]; eaterFamily: string }) {
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  const card = (c: TourCardData) => {
    switch (c.key) {
      case "free":
        return <FreeCard c={c} />;
      case "dark":
        return <DarkCard c={c} eater={eater} />;
      case "private":
        return <PrivateCard c={c} />;
      default:
        return <SoonCard c={c} />;
    }
  };
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 list-none p-0 m-0">
      {cards.map((c) => (
        <li key={c.key}>{card(c)}</li>
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

/** Hero button for the free tour: one tap to its booking sheet. */
export function HeroBookFree({ className, children }: { className: string; children: ReactNode }) {
  return (
    <BookButton tour="free" location="brand_hero" href="/book" className={className} style={caveat}>
      {children}
    </BookButton>
  );
}
