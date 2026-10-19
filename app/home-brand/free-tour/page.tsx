// Free tour page with scrapbook stickers: a hidden test copy of today's
// homepage (the free tour's page, planned to move to
// /tours/free-walking-tour). Tom 2026-10-19: stickers stuck ON the photos,
// only the best ones, plus one in the hero for "voted the best place to
// live in the UK". Each pops on as it scrolls into view, with its
// handwritten question. Noindex, unlinked.
//   Hero               Fine City sign: best place to live
//   History & stories  Cathedral + Snap the dragon
//   Highlights         Castle
//   Life today         Lanes shopfront
//   Tip                £ coin
// (Elm Hill and the churches are left out: the section copy already asks
// those questions.)

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
import { CastleSticker, CoinSticker } from "../_components/Doodles";
import { CathedralSticker, DragonSticker, FineCitySticker, ShopSticker } from "../_components/MoreDoodles";
import { ScrollSticker } from "../_components/ScrollSticker";

export const metadata: Metadata = {
  title: "Free tour page with stickers (prototype)",
  robots: { index: false, follow: false },
};

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };

/** A sticker stuck on a photo, with its handwritten question. */
function OnPhoto({ art, question, className, rotate }: { art: ReactNode; question: string; className: string; rotate: number }) {
  return (
    <ScrollSticker rotate={rotate} className={`flex w-[136px] md:w-[160px] flex-col items-center gap-1 text-center ${className}`}>
      {art}
      <span
        className="rounded-md bg-[#FFFDF7] px-2 py-1 text-[16px] md:text-[18px] font-bold leading-[1.05] text-[#1A6B47] shadow-[0_2px_4px_rgba(60,40,20,0.3)]"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        {question}
      </span>
    </ScrollSticker>
  );
}

const pointStickers = [
  <>
    <OnPhoto key="c" art={<CathedralSticker className="h-20 w-20" />} question="Why did the Normans build a cathedral this big?" className="-left-6 -top-14" rotate={-6} />
    <OnPhoto key="d" art={<DragonSticker className="h-16 w-20" />} question="Who was Snap the dragon?" className="-right-12 -bottom-16" rotate={6} />
  </>,
  <OnPhoto key="k" art={<CastleSticker className="h-12 w-14" />} question="What was the Castle really for?" className="-left-8 -bottom-10" rotate={-5} />,
  <OnPhoto key="s" art={<ShopSticker className="h-14 w-14" />} question="Why are there so many independent shops in Norwich?" className="-right-8 -top-12" rotate={5} />,
];

const beatStickers = [
  null,
  null,
  <OnPhoto key="t" art={<CoinSticker className="h-12 w-12" />} question="How much should you tip?" className="-left-28 md:-left-24 -bottom-8" rotate={-6} />,
];

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
        sticker={
          <OnPhoto
            art={<FineCitySticker className="h-14 w-20 md:h-16 md:w-24" />}
            question="Why was Norwich voted the best place to live in the UK?"
            className="hidden lg:flex lg:right-0 lg:bottom-2"
            rotate={6}
          />
        }
      />
      <InfoBar />
      <WhatYouGet stickers={pointStickers} />
      <Testimonials showCta={false} />
      <ProofVideos>{showGuestReels && <GuestReels reels={guestReels} trackingLocation="home_guest" compact />}</ProofVideos>
      <YourGuides />
      <TheWalk stickers={beatStickers} />
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
      <BookingSectionV2 phoneCta />
      <EmailCapture />
      <Footer />
    </main>
  );
}
