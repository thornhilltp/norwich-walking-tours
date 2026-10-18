// Free tour page with scrapbook stickers: a hidden test copy of today's
// homepage (the free tour's page, planned to move to
// /tours/free-walking-tour) with three ways to use the stickers, to review
// with Tom (2026-10-18). ?stickers=a|b|c. Noindex, unlinked.
//   A  Section stamps: one sticker beside each section's handwritten word
//   B  On the photos: stuck on the "What's on the tour?" polaroids and the
//      Meet / Walk / Tip circles, each with its label
//   C  Scrapbook margins: stickers with handwritten notes down the page
//      edges, popping in as you scroll

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { GuestReels } from "@/components/GuestReels";
import { guestReels, showGuestReels } from "@/lib/guestReels";
import { HeroV2 } from "../../_components/HeroV2";
import { Testimonials } from "../../_components/Testimonials";
import { BookingSectionV2 } from "../../_components/BookingSectionV2";
import { InfoBar, WhatYouGet, ProofVideos, TheWalk, YourGuides, homeFaqs } from "../../_components/HomeSections";
import {
  CanarySticker,
  CastleSticker,
  CoinSticker,
  CupSticker,
  FootstepsSticker,
  PinSticker,
  SpireSticker,
  StickerLabel,
} from "../_components/Doodles";
import { ScrollSticker } from "../_components/ScrollSticker";

export const metadata: Metadata = {
  title: "Free tour page with stickers (prototype)",
  robots: { index: false, follow: false },
};

type Option = "a" | "b" | "c";
const NAMES: Record<Option, string> = { a: "Section stamps", b: "On the photos", c: "Scrapbook margins" };

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };

/* ── A: one stamp per section, beside its heading ─────────────────────── */

function Stamp({ children, className, rotate }: { children: ReactNode; className: string; rotate: number }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-20 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

/* ── B: stuck on the photos, with labels ──────────────────────────────── */

function OnPhoto({ children, label, className, rotate }: { children: ReactNode; label: string; className: string; rotate: number }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-20 flex flex-col items-center gap-0.5 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
      <StickerLabel>{label}</StickerLabel>
    </span>
  );
}

const pointStickers = [
  <>
    <OnPhoto key="h" label="history" className="-left-4 -top-6" rotate={-8}>
      <SpireSticker className="h-16 w-9" />
    </OnPhoto>
    <OnPhoto key="s" label="stories" className="-right-5 bottom-6" rotate={7}>
      <CanarySticker className="h-12 w-14" />
    </OnPhoto>
  </>,
  <OnPhoto key="c" label="highlights" className="-left-5 bottom-8" rotate={-6}>
    <CastleSticker className="h-12 w-14" />
  </OnPhoto>,
  <OnPhoto key="t" label="local tips" className="-right-5 -top-6" rotate={6}>
    <CupSticker className="h-12 w-12" />
  </OnPhoto>,
];

const beatStickers = [
  <OnPhoto key="m" label="meet" className="-left-5 -bottom-4" rotate={-8}>
    <PinSticker className="h-10 w-8" />
  </OnPhoto>,
  <OnPhoto key="w" label="walk" className="-left-6 -bottom-4" rotate={6}>
    <FootstepsSticker className="h-9 w-10" />
  </OnPhoto>,
  <OnPhoto key="t" label="tip" className="-left-5 -bottom-4" rotate={-5}>
    <CoinSticker className="h-10 w-10" />
  </OnPhoto>,
];

/* ── C: scrapbook notes in the margins ────────────────────────────────── */

function Note({ sticker, text, side, top, rotate }: { sticker: ReactNode; text: string; side: "left" | "right"; top: string; rotate: number }) {
  return (
    <ScrollSticker
      rotate={rotate}
      className={`${side === "left" ? "left-2 xl:left-6" : "right-2 xl:right-14"} ${top} flex w-[118px] xl:w-[150px] flex-col items-center gap-1 text-center scale-[0.8] xl:scale-100`}
    >
      {sticker}
      <span
        className="rounded-md bg-[#FFFDF7] px-2 py-1 text-[17px] xl:text-[19px] font-bold leading-[1.05] text-[#1A6B47] shadow-[0_2px_4px_rgba(60,40,20,0.25)]"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        {text}
      </span>
    </ScrollSticker>
  );
}

function Wrap({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="relative">
      {children}
      {extra}
    </div>
  );
}

export default function FreeTourStickerPrototype({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const opt: Option = (["a", "b", "c"] as const).find((k) => k === searchParams.stickers) ?? "a";
  const A = opt === "a";
  const C = opt === "c";

  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      {/* Prototype switcher */}
      <div className="absolute left-1/2 top-[74px] z-40 -translate-x-1/2 flex flex-wrap items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#E8A33A]/70 bg-[#FFF8EA] px-2.5 py-1.5 text-[12px] sm:text-[13px] whitespace-nowrap" style={lora}>
        <span className="font-semibold text-brand-text/70">Stickers:</span>
        {(Object.keys(NAMES) as Option[]).map((k) => (
          <a key={k} href={`?stickers=${k}`} className={`rounded-full px-3 py-1 font-semibold ${k === opt ? "bg-brand-text text-white" : "bg-white text-brand-text/80 border border-brand-text/15"}`}>
            {k.toUpperCase()}
            <span className="hidden sm:inline"> · {NAMES[k]}</span>
          </a>
        ))}
      </div>

      <HeroV2
        badge="The Norwich Free Walking Tour"
        heading={["England's best-kept", "medieval city."]}
        subheading="Two hours of our favourite Norwich history, stories and local tips, with a guide who lives here."
        subsubheading={
          <>
            Popular across Europe.{" "}
            <a href="/what-is-a-free-tour" className="underline underline-offset-4 decoration-white/40 hover:decoration-white">
              What is a free walking tour?
            </a>
          </>
        }
        buttonText="Book your spot (free)"
        buttonHref="#book-section"
        widget={<BookingFrame priority height={520} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />}
      />
      <InfoBar />

      <Wrap
        extra={
          <>
            {A && (
              <Stamp className="right-[6%] md:right-[22%] top-10 md:top-20" rotate={-8}>
                <SpireSticker className="h-16 w-9 md:h-20 md:w-11" />
              </Stamp>
            )}
            {C && <Note side="left" top="top-[14%]" rotate={-6} sticker={<SpireSticker className="h-16 w-9" />} text="Norwich Cathedral was begun in 1096" />}
            {C && <Note side="right" top="top-[52%]" rotate={5} sticker={<CastleSticker className="h-12 w-14" />} text="Ask what the Castle was for" />}
          </>
        }
      >
        <WhatYouGet stickers={opt === "b" ? pointStickers : undefined} />
      </Wrap>

      <Wrap
        extra={
          <>
            {A && (
              <Stamp className="right-[6%] md:right-[18%] top-12 md:top-24" rotate={7}>
                <CanarySticker className="h-12 w-14 md:h-14 md:w-16" />
              </Stamp>
            )}
            {C && <Note side="right" top="top-24" rotate={6} sticker={<CanarySticker className="h-12 w-14" />} text="Why are Norwich City the Canaries?" />}
          </>
        }
      >
        <Testimonials showCta={false} />
      </Wrap>
      <ProofVideos>{showGuestReels && <GuestReels reels={guestReels} trackingLocation="home_guest" compact />}</ProofVideos>

      <Wrap
        extra={
          <>
            {A && (
              <Stamp className="left-[6%] md:left-[20%] top-10 md:top-16" rotate={-6}>
                <PinSticker className="h-12 w-10 md:h-14 md:w-12" />
              </Stamp>
            )}
            {C && <Note side="left" top="top-20" rotate={-5} sticker={<PinSticker className="h-12 w-10" />} text="Ask them their favourite pub" />}
          </>
        }
      >
        <YourGuides />
      </Wrap>

      <Wrap
        extra={
          <>
            {A && (
              <Stamp className="right-[6%] md:right-[26%] top-8 md:top-12" rotate={8}>
                <FootstepsSticker className="h-11 w-12 md:h-12 md:w-14" />
              </Stamp>
            )}
            {C && <Note side="right" top="top-12" rotate={5} sticker={<FootstepsSticker className="h-11 w-12" />} text="Two easy hours on foot" />}
          </>
        }
      >
        <TheWalk stickers={opt === "b" ? beatStickers : undefined} />
      </Wrap>

      <Wrap
        extra={
          <>
            {A && (
              <Stamp className="left-[6%] md:left-[24%] top-12 md:top-20" rotate={-7}>
                <CupSticker className="h-12 w-12 md:h-14 md:w-14" />
              </Stamp>
            )}
            {C && <Note side="left" top="top-24" rotate={-4} sticker={<CupSticker className="h-12 w-12" />} text="Ask us where to get coffee" />}
          </>
        }
      >
        <FAQ
          items={homeFaqs}
          emitSchema={false}
          customHeading={
            <h2 className="leading-[1.0]">
              <span className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text" style={lora}>
                Before you
              </span>{" "}
              <span className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                book.
              </span>
            </h2>
          }
        />
      </Wrap>

      <Wrap
        extra={
          <>
            {A && (
              <Stamp className="right-[6%] md:right-[10%] top-10" rotate={8}>
                <CoinSticker className="h-12 w-12 md:h-14 md:w-14" />
              </Stamp>
            )}
            {C && <Note side="right" top="top-10" rotate={6} sticker={<CoinSticker className="h-11 w-11" />} text="Tip what it was worth" />}
          </>
        }
      >
        <BookingSectionV2 phoneCta />
      </Wrap>
      <EmailCapture />
      <Footer />
    </main>
  );
}
