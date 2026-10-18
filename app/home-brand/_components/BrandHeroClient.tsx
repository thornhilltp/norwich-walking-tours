"use client";

// The header's job (Tom 2026-10-18): book, choose, trust. A real photo,
// "Featured on" up top, the mission line, and a booking card that plays on
// the day / night split: "By day" is the free tour, "After dark" is Dark
// History. Pointing at a row fades the photo to that tour's world; tapping
// it slides up the booking sheet.

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { openBooking, type BookableKey } from "./BrandBooking";

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const NIGHT = "#121211";
const GLOW = "#5AE19E";

export type HeroOption = {
  key: BookableKey;
  when: string;
  name: string;
  times: string;
  /** No-JS fallback. */
  href: string;
};

const PHOTOS: Record<BookableKey, { src: string; alt: string; style?: CSSProperties }> = {
  free: {
    src: "/images/tour/group-street-laughing.jpg",
    alt: "A guide in a Walk with a Local t-shirt making a tour group laugh on a Norwich street",
  },
  dark: {
    src: "/images/tour/elm-hill-group.jpg",
    alt: "A Dark History tour group on the cobbles of Elm Hill",
    style: { filter: "sepia(0.55) contrast(1.15) brightness(0.6) saturate(0.8)" },
  },
};

function Photos({ mode, sizes }: { mode: BookableKey; sizes: string }) {
  return (
    <>
      {(Object.keys(PHOTOS) as BookableKey[]).map((k) => (
        <Image
          key={k}
          src={PHOTOS[k].src}
          alt={k === mode ? PHOTOS[k].alt : ""}
          fill
          priority={k === "free"}
          sizes={sizes}
          className={`object-cover transition-opacity duration-700 ${k === mode ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: "55% 40%", ...PHOTOS[k].style }}
        />
      ))}
    </>
  );
}

function BookCard({
  options,
  eater,
  onMode,
}: {
  options: HeroOption[];
  eater: CSSProperties;
  onMode: (k: BookableKey) => void;
}) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] border border-black/[0.06]">
      <p className="text-[30px] font-bold leading-none text-brand-text" style={caveat}>
        Book a walk
      </p>
      <p className="mt-1 text-[14px] text-brand-text/65" style={lora}>
        Free to book. Tip what it was worth at the end.
      </p>
      <ul className="mt-4 flex flex-col gap-2.5 list-none p-0 m-0" onMouseLeave={() => onMode("free")}>
        {options.map((o) => {
          const dark = o.key === "dark";
          const Icon = dark ? Moon : Sun;
          return (
            <li key={o.key}>
              <a
                href={o.href}
                onMouseEnter={() => onMode(o.key)}
                onFocus={() => onMode(o.key)}
                onClick={(e) => {
                  e.preventDefault();
                  onMode(o.key);
                  openBooking(o.key, `brand_hero_${o.key}`);
                }}
                className={`group flex items-center gap-3 rounded-xl border-2 px-3 py-3 min-h-[64px] transition ${
                  dark
                    ? "border-transparent text-white hover:shadow-[0_0_18px_rgba(90,225,158,0.35)]"
                    : "border-brand-accent/25 bg-brand-accent-light/50 text-brand-text hover:border-brand-accent"
                }`}
                style={dark ? { backgroundColor: NIGHT } : undefined}
              >
                <Icon className={`h-6 w-6 shrink-0 ${dark ? "text-[#5AE19E]" : "text-[#E8A33A]"}`} aria-hidden />
                <span className="flex-1 min-w-0">
                  <span className={`block text-[11px] uppercase tracking-[0.16em] font-semibold ${dark ? "text-white/60" : "text-brand-text/55"}`} style={lora}>
                    {o.when}
                  </span>
                  <span
                    className="block leading-tight"
                    style={dark ? { ...eater, color: GLOW, fontSize: 17 } : { ...lora, fontWeight: 700, fontSize: 16 }}
                  >
                    {o.name}
                  </span>
                  <span className={`block text-[13px] leading-snug ${dark ? "text-white/60" : "text-brand-text/65"}`} style={lora}>
                    {o.times}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-3.5 py-1.5 ${dark ? "border-2 border-[#5AE19E]/70 text-[#5AE19E]" : "bg-brand-accent text-white"}`}
                  style={dark ? { ...eater, fontSize: 14 } : { ...caveat, fontSize: 19, fontWeight: 700 }}
                >
                  Book free
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-3.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[14px]" style={lora}>
        <a href="/private-tours" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 min-h-[36px] inline-flex items-center">
          Private group? Ask us
        </a>
        <a href="/tours" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40 min-h-[36px] inline-flex items-center">
          All tours &amp; experiences →
        </a>
      </p>
    </div>
  );
}

export function BrandHeroClient({
  options,
  eaterFamily,
  wordsLight,
  wordsDark,
  featured,
  trust,
}: {
  options: HeroOption[];
  eaterFamily: string;
  /** Headline block for the desktop photo (white text). */
  wordsLight: ReactNode;
  /** Headline block for phones (on cream). */
  wordsDark: ReactNode;
  /** "Featured on" logos, white, for over the photo. */
  featured: ReactNode;
  /** Faces + ratings, under the card on phones (the card comes first). */
  trust: ReactNode;
}) {
  const [mode, setMode] = useState<BookableKey>("free");
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };

  return (
    <section id="top" className="relative bg-brand-bg">
      {/* Phones: photo with "Featured on" across its foot, words, the card. */}
      <div className="lg:hidden pt-[72px]">
        <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: NIGHT }}>
          <Photos mode={mode} sizes="100vw" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }} />
          <div className="absolute inset-x-0 bottom-3">{featured}</div>
        </div>
        <div className="brand-container pt-5 text-center">{wordsDark}</div>
        <div className="brand-container pt-4 pb-8">
          <BookCard options={options} eater={eater} onMode={setMode} />
          <div className="mt-5">{trust}</div>
        </div>
      </div>

      {/* Desktop: full-bleed photo, words left, booking card right. */}
      <div className="hidden lg:block relative min-h-[90vh] overflow-hidden" style={{ backgroundColor: NIGHT }}>
        <Photos mode={mode} sizes="100vw" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 80%)" }} />
        <div className="relative brand-container max-w-6xl grid grid-cols-[1.15fr_0.85fr] gap-12 items-center min-h-[90vh] pt-28 pb-16">
          <div style={{ textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}>
            <div className="mb-8 [&_ul]:justify-start [&_p]:text-left">{featured}</div>
            {wordsLight}
          </div>
          <BookCard options={options} eater={eater} onMode={setMode} />
        </div>
      </div>
    </section>
  );
}
