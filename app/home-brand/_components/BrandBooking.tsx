"use client";

// The vibe picker (top of the page) and the one booking box for every tour
// (further down). Each tour card wears its own tour's branding (Tom
// 2026-10-18): the free tour is the taped polaroid, Dark History is black,
// sepia and Eater lettering with fog. Picking a tour re-themes the booking
// box to match. The two talk through a window event; without JavaScript the
// cards are plain links (/book, the Dark History page).

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { BookingFrame } from "@/components/BookingFrame";
import { Fog } from "@/app/tours/_components/Spooky";
import { trackEvent } from "@/lib/tracking";

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const PICK = "brand:pick-tour";

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

export type Vibe = {
  key: BookableKey | "private" | "soon";
  vibe: string;
  name: string;
  meta: string;
  action: string;
  href: string;
  image?: { src: string; alt: string };
};

/* ── Cards, one look per tour ─────────────────────────────────────────── */

function Photo({ v, style, priority }: { v: Vibe; style?: CSSProperties; priority?: boolean }) {
  if (!v.image) return null;
  return (
    <Image
      src={v.image.src}
      alt={v.image.alt}
      fill
      sizes="(max-width: 1024px) 45vw, 260px"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      style={style}
      priority={priority}
    />
  );
}

/** The free tour: taped polaroid, Caveat, green. */
function FreeCard({ v }: { v: Vibe }) {
  return (
    <div
      className="relative h-full bg-white border border-[#EAE0D4] rounded-[4px] p-2 pb-3 sm:p-2.5 sm:pb-4 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]"
      style={{ transform: "rotate(-1.5deg)" }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[9px] left-1/2 w-14 h-5 rounded-[3px] z-10"
        style={{ transform: "translateX(-50%) rotate(-3deg)", backgroundColor: "#F4C26B", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
      />
      <div className="relative aspect-square overflow-hidden rounded-[2px] bg-brand-accent-light">
        <Photo v={v} priority />
      </div>
      <div className="px-1 pt-2.5">
        <p className="text-[27px] sm:text-[32px] font-bold leading-[0.95] text-brand-accent" style={caveat}>
          {v.vibe}
        </p>
        <CardWords v={v} />
        <p className="mt-2 text-[22px] font-bold text-brand-accent-text" style={caveat}>
          {v.action} →
        </p>
      </div>
    </div>
  );
}

/** Dark History: black, sepia photo with vignette, Eater lettering, fog. */
function DarkCard({ v, eater }: { v: Vibe; eater: CSSProperties }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[4px] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)]" style={{ backgroundColor: NIGHT }}>
      <div className="relative aspect-square overflow-hidden">
        <Photo v={v} style={sepia} priority />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center, transparent 40%, rgba(10,6,2,0.8) 100%), linear-gradient(to bottom, transparent 55%, ${NIGHT} 100%)` }}
        />
      </div>
      <Fog />
      <div className="relative px-3 pb-3 -mt-6 sm:pb-4">
        <p className="text-[25px] sm:text-[30px] leading-[1.0]" style={{ ...eater, color: GLOW, textShadow: "0 0 14px rgba(90,225,158,0.45)" }}>
          {v.vibe}
        </p>
        <CardWords v={v} dark />
        <p className="mt-2 text-[17px]" style={{ ...eater, color: GLOW }}>
          {v.action} →
        </p>
      </div>
    </div>
  );
}

/** Private tours: an invitation. Cream card, fine green border, serif italic.
    (Private tours have no look of their own yet; this is a first idea.) */
function PrivateCard({ v }: { v: Vibe }) {
  return (
    <div className="relative h-full rounded-[4px] bg-[#FFFDF7] p-2 sm:p-2.5 shadow-[0_10px_24px_-14px_rgba(26,26,26,0.45)] border border-brand-text/10">
      <div className="h-full border border-brand-accent/50 rounded-[2px] p-2 sm:p-2.5 flex flex-col">
        <p className="text-center text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.22em] text-brand-accent-text font-semibold" style={lora}>
          You&apos;re invited
        </p>
        <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-t-[999px] bg-brand-accent-light">
          <Photo v={v} />
        </div>
        <p className="mt-2.5 text-center text-[21px] sm:text-[25px] italic leading-[1.05] text-brand-text" style={lora}>
          {v.vibe}
        </p>
        <div className="text-center">
          <CardWords v={v} />
          <p className="mt-2 text-[14px] sm:text-[15px] font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40" style={lora}>
            {v.action} →
          </p>
        </div>
      </div>
    </div>
  );
}

/** Coming soon: kraft paper, a stamped question mark, still under wraps. */
function SoonCard({ v }: { v: Vibe }) {
  const mono: CSSProperties = { fontFamily: "ui-monospace, 'Courier New', monospace" };
  return (
    <div
      className="relative h-full rounded-[3px] p-3 sm:p-4 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)] flex flex-col"
      style={{ backgroundColor: "#D9C29C", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px)", transform: "rotate(1.5deg)" }}
    >
      <div className="relative aspect-square flex items-center justify-center rounded-[2px] border-2 border-dashed border-[#7A5C33]/50">
        <span className="text-[84px] leading-none text-[#7A5C33]/70" style={mono} aria-hidden="true">
          ?
        </span>
        <span
          className="absolute bottom-3 right-1 rounded-[3px] border-[3px] border-[#B3392F] px-2 py-0.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#B3392F]"
          style={{ ...mono, transform: "rotate(-12deg)", opacity: 0.85 }}
        >
          Coming soon
        </span>
      </div>
      <p className="mt-2.5 text-[19px] sm:text-[22px] font-bold leading-[1.05] text-[#3B2A14]" style={mono}>
        {v.vibe}
      </p>
      <p className="mt-1 text-[12.5px] sm:text-[13.5px] leading-snug text-[#3B2A14]/75" style={mono}>
        {v.meta}
      </p>
      <p className="mt-2 text-[14px] font-bold text-[#3B2A14] underline underline-offset-4" style={mono}>
        {v.action} →
      </p>
    </div>
  );
}

function CardWords({ v, dark }: { v: Vibe; dark?: boolean }) {
  return (
    <>
      <p className={`mt-1.5 text-[13.5px] sm:text-[15px] font-semibold leading-snug ${dark ? "text-white" : "text-brand-text"}`} style={lora}>
        {v.name}
      </p>
      <p className={`mt-1 text-[12.5px] sm:text-[13.5px] leading-snug ${dark ? "text-white/60" : "text-brand-text/65"}`} style={lora}>
        {v.meta}
      </p>
    </>
  );
}

export function VibePicker({ vibes, bookable, eaterFamily }: { vibes: Vibe[]; bookable: BookableKey[]; eaterFamily: string }) {
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  const pick = (e: MouseEvent, v: Vibe) => {
    trackEvent("book_cta_click", { location: `brand_vibe_${v.key}` });
    if (!bookable.includes(v.key as BookableKey)) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(PICK, { detail: v.key }));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const card = (v: Vibe): ReactNode => {
    switch (v.key) {
      case "free":
        return <FreeCard v={v} />;
      case "dark":
        return <DarkCard v={v} eater={eater} />;
      case "private":
        return <PrivateCard v={v} />;
      default:
        return <SoonCard v={v} />;
    }
  };

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-6 list-none p-0 m-0">
      {vibes.map((v) => (
        <li key={v.key}>
          <a href={v.href} onClick={(e) => pick(e, v)} className="group block h-full transition-transform duration-200 hover:-translate-y-1">
            {card(v)}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ── Booking box: re-themes to the tour you picked ────────────────────── */

export function BookingSection({ tabs, eaterFamily }: { tabs: BookingTab[]; eaterFamily: string }) {
  const [active, setActive] = useState<BookableKey>(tabs[0].key);

  useEffect(() => {
    const onPick = (e: Event) => {
      const key = (e as CustomEvent<BookableKey>).detail;
      if (tabs.some((t) => t.key === key)) setActive(key);
    };
    window.addEventListener(PICK, onPick);
    return () => window.removeEventListener(PICK, onPick);
  }, [tabs]);

  const tab = tabs.find((t) => t.key === active) ?? tabs[0];
  const dark = tab.key === "dark";
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };

  return (
    <section
      id="book-section"
      className={`relative overflow-hidden py-14 md:py-20 border-t transition-colors duration-500 ${
        dark ? "border-transparent" : "bg-brand-accent-light/40 border-brand-accent/10"
      }`}
      style={dark ? { backgroundColor: NIGHT } : undefined}
    >
      {dark && <Fog />}
      <div className="relative brand-container max-w-5xl">
        <div className="text-center">
          <h2 className="leading-[1.0]">
            <span
              className={`inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] ${dark ? "text-white" : "text-brand-text"}`}
              style={lora}
            >
              {dark ? "Dare you" : "Book your"}
            </span>{" "}
            {dark ? (
              <span className="inline text-[clamp(36px,4.4vw,56px)] leading-[0.95]" style={{ ...eater, color: GLOW, textShadow: "0 0 18px rgba(90,225,158,0.45)" }}>
                walk it?
              </span>
            ) : (
              <span className="inline text-[clamp(42px,5vw,64px)] leading-[0.95] text-brand-accent" style={caveat}>
                walk.
              </span>
            )}
          </h2>
          <p className={`mt-4 text-[17px] md:text-lg leading-relaxed max-w-xl mx-auto ${dark ? "text-white/70" : "text-brand-text/70"}`} style={lora}>
            Free to book. Tip what it was worth at the end, by card or cash.
          </p>
        </div>

        <div id="book" className="scroll-mt-24 mt-8 md:mt-10 w-full max-w-xl mx-auto">
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
                  onClick={() => setActive(t.key)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-left min-h-[56px] transition-colors ${cls}`}
                >
                  <span className="block text-[17px] leading-tight" style={isDark ? { ...eater, color: on ? GLOW : undefined } : { ...caveat, fontSize: 22, fontWeight: 700 }}>
                    {t.label}
                  </span>
                  <span className={`block text-[12.5px] leading-snug ${on || dark ? "text-white/70" : "text-brand-text/60"}`} style={lora}>
                    {t.when}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            className={`rounded-2xl shadow-xl overflow-hidden border ${dark ? "border-[#5AE19E]/30 bg-black" : "border-brand-accent/15 bg-white"}`}
          >
            <BookingFrame key={tab.key} tour={tab.bookingTour} height={560} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          </div>
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
