"use client";

// The vibe picker (top of the page) and the one booking box for every tour
// (further down) talk through a window event: tapping a bookable vibe card
// picks that tour's tab and scrolls to the box. Without JavaScript the cards
// are plain links (/book, the Dark History page).

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookingFrame } from "@/components/BookingFrame";
import { trackEvent } from "@/lib/tracking";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };
const PICK = "brand:pick-tour";

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

const tapes = ["#F4C26B", "#1A1A1A", "#9FD6B8", "#F2A7A0"];

export function VibePicker({ vibes, bookable }: { vibes: Vibe[]; bookable: BookableKey[] }) {
  const pick = (e: React.MouseEvent, v: Vibe) => {
    trackEvent("book_cta_click", { location: `brand_vibe_${v.key}` });
    if (!bookable.includes(v.key as BookableKey)) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(PICK, { detail: v.key }));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-6 list-none p-0 m-0">
      {vibes.map((v, i) => (
        <li key={v.key}>
          <a
            href={v.href}
            onClick={(e) => pick(e, v)}
            className="group relative block h-full bg-white border border-[#EAE0D4] rounded-[4px] p-2 pb-3 sm:p-2.5 sm:pb-4 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)] transition-transform duration-200 hover:-translate-y-1"
            style={{ transform: `rotate(${i % 2 === 0 ? "-1.5deg" : "1.5deg"})` }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-[9px] left-1/2 w-14 h-5 rounded-[3px] z-10"
              style={{
                transform: "translateX(-50%) rotate(-3deg)",
                backgroundColor: tapes[i % tapes.length],
                boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
              }}
            />
            <div className="relative aspect-square overflow-hidden rounded-[2px] bg-brand-accent-light">
              {v.image ? (
                <>
                  <Image
                    src={v.image.src}
                    alt={v.image.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 260px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    priority={i < 2}
                  />
                  {v.key === "dark" && <div aria-hidden className="absolute inset-0 bg-[#1A1A1A]/35" />}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-brand-accent/40">
                  <span className="text-[80px] leading-none text-brand-accent/70" style={caveat} aria-hidden="true">
                    ?
                  </span>
                </div>
              )}
            </div>
            <div className="px-1 pt-2.5 text-left">
              <p
                className={`text-[27px] sm:text-[32px] font-bold leading-[0.95] ${v.key === "dark" ? "text-[#1A1A1A]" : "text-brand-accent"}`}
                style={caveat}
              >
                {v.vibe}
              </p>
              <p className="mt-1.5 text-[13.5px] sm:text-[15px] font-semibold leading-snug text-brand-text" style={lora}>
                {v.name}
              </p>
              <p className="mt-1 text-[12.5px] sm:text-[13.5px] leading-snug text-brand-text/65" style={lora}>
                {v.meta}
              </p>
              <p className="mt-2 text-[14px] sm:text-[15px] font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 group-hover:decoration-brand-accent" style={lora}>
                {v.action} →
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BookingTabs({ tabs }: { tabs: BookingTab[] }) {
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

  return (
    <div className="w-full max-w-xl mx-auto">
      <div role="tablist" aria-label="Choose your tour" className={`grid gap-2 mb-3`} style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.key)}
              className={`rounded-xl border-2 px-3 py-2.5 text-left min-h-[56px] transition-colors ${
                on
                  ? t.key === "dark"
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                    : "bg-brand-accent border-brand-accent text-white"
                  : "bg-white border-brand-accent/25 text-brand-text hover:border-brand-accent/60"
              }`}
            >
              <span className="block text-[15px] font-bold leading-tight" style={lora}>
                {t.label}
              </span>
              <span className={`block text-[12.5px] leading-snug ${on ? "text-white/80" : "text-brand-text/60"}`} style={lora}>
                {t.when}
              </span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-accent/15">
        <BookingFrame
          key={tab.key}
          tour={tab.bookingTour}
          height={560}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
