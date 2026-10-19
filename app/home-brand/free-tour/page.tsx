// Free tour page with scrapbook stickers: a hidden test copy of today's
// homepage (the free tour's page, planned to move to
// /tours/free-walking-tour). Tom 2026-10-19 chose "scrapbook margins" and
// all 12 stickers from the sheet (/home-brand/stickers): each sits in the
// page margin beside the section it belongs to, with a handwritten
// question, popping in as you scroll. Large screens: sticker + question.
// Smaller screens: the sticker alone, tucked at the section edge.
// Noindex, unlinked.

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
import { CanarySticker, CastleSticker, CoinSticker } from "../_components/Doodles";
import {
  AwningSticker,
  BookSticker,
  CathedralSticker,
  ChurchFullSticker,
  DragonSticker,
  FineCitySticker,
  MustardSticker,
  ShopSticker,
  StreetSignSticker,
} from "../_components/MoreDoodles";
import { ScrollSticker } from "../_components/ScrollSticker";

export const metadata: Metadata = {
  title: "Free tour page with stickers (prototype)",
  robots: { index: false, follow: false },
};

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };

/** A sticker in the margin with its handwritten question. */
function Note({ sticker, text, side, top, rotate }: { sticker: ReactNode; text: string; side: "left" | "right"; top: string; rotate: number }) {
  return (
    <ScrollSticker
      rotate={rotate}
      className={`${side === "left" ? "-left-1 lg:left-3 2xl:left-10" : "-right-1 lg:right-3 2xl:right-24"} ${top} flex w-14 lg:w-16 xl:w-[150px] flex-col items-center gap-1 text-center`}
    >
      <span className="block origin-center scale-[0.7] lg:scale-[0.8] xl:scale-100">{sticker}</span>
      <span
        className="hidden xl:block rounded-md bg-[#FFFDF7] px-2 py-1 text-[18px] font-bold leading-[1.05] text-[#1A6B47] shadow-[0_2px_4px_rgba(60,40,20,0.25)]"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        {text}
      </span>
    </ScrollSticker>
  );
}

function Wrap({ children, notes }: { children: ReactNode; notes: ReactNode }) {
  return (
    <div className="relative overflow-x-clip">
      {children}
      {notes}
    </div>
  );
}

export default function FreeTourStickerPrototype() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
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

      {/* What's on the tour: history and stories, highlights, life today. */}
      <Wrap
        notes={
          <>
            <Note side="right" top="top-6" rotate={5} sticker={<FineCitySticker className="h-16 w-24" />} text="Why is Norwich one of the best places to live?" />
            <Note side="left" top="top-[16%]" rotate={-6} sticker={<CathedralSticker className="h-24 w-24" />} text="Why did the Normans build a cathedral this big?" />
            <Note side="right" top="top-[30%]" rotate={6} sticker={<CanarySticker className="h-14 w-16" />} text="Why are Norwich City the Canaries?" />
            <Note side="left" top="top-[46%]" rotate={-5} sticker={<CastleSticker className="h-14 w-16" />} text="What was the Castle really for?" />
            <Note side="right" top="top-[58%]" rotate={4} sticker={<StreetSignSticker className="h-10 w-24" />} text="How did Elm Hill survive?" />
            <Note side="left" top="top-[74%]" rotate={-4} sticker={<ShopSticker className="h-14 w-14" />} text="Why are there so many independent shops in Norwich?" />
            <Note side="right" top="top-[86%]" rotate={5} sticker={<AwningSticker className="h-14 w-16" />} text="How long has there been a market here?" />
          </>
        }
      >
        <WhatYouGet />
      </Wrap>

      <Wrap notes={<Note side="right" top="top-16" rotate={6} sticker={<DragonSticker className="h-14 w-16" />} text="Who was Snap the dragon?" />}>
        <Testimonials showCta={false} />
      </Wrap>
      <ProofVideos>{showGuestReels && <GuestReels reels={guestReels} trackingLocation="home_guest" compact />}</ProofVideos>

      <Wrap notes={<Note side="left" top="top-16" rotate={-5} sticker={<BookSticker className="h-14 w-18" />} text="Why is Norwich a UNESCO City of Literature?" />}>
        <YourGuides />
      </Wrap>

      <Wrap notes={<Note side="right" top="top-10" rotate={5} sticker={<ChurchFullSticker className="h-14 w-18" />} text="Why so many medieval churches?" />}>
        <TheWalk />
      </Wrap>

      <Wrap notes={<Note side="left" top="top-20" rotate={-4} sticker={<MustardSticker className="h-16 w-12" />} text="What's Norwich got to do with mustard?" />}>
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

      <Wrap notes={<Note side="right" top="top-10" rotate={6} sticker={<CoinSticker className="h-14 w-14" />} text="How much should you tip?" />}>
        <BookingSectionV2 phoneCta />
      </Wrap>
      <EmailCapture />
      <Footer />
    </main>
  );
}
