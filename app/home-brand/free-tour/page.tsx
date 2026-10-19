// Free tour page with scrapbook stickers: a hidden test copy of today's
// homepage (the free tour's page, planned to move to
// /tours/free-walking-tour). Round 3 (Tom 2026-10-19, after a UX review):
// one small sticker per photo, matched to what the photo shows, a one or
// two word label (the section copy already asks the questions), none in the
// hero (it sat beside the booking button).
//   Story by the river   Snap the dragon   "stories"
//   Highlights collage   the Cathedral     "history"
//   Life in Norwich      Fine City sign    "best place to live"
//   Tip                  £ coin            "tip"
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
import { CoinSticker, StickerLabel } from "../_components/Doodles";
import { CathedralSticker, DragonSticker, FineCitySticker } from "../_components/MoreDoodles";
import { ScrollSticker } from "../_components/ScrollSticker";

export const metadata: Metadata = {
  title: "Free tour page with stickers (prototype)",
  robots: { index: false, follow: false },
};

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };

/** A small sticker stuck on a photo's corner, with a short label. */
function OnPhoto({ art, label, className, rotate }: { art: ReactNode; label: string; className: string; rotate: number }) {
  return (
    <ScrollSticker rotate={rotate} className={`flex flex-col items-center gap-0.5 ${className}`}>
      {art}
      <StickerLabel>{label}</StickerLabel>
    </ScrollSticker>
  );
}

const pointStickers = [
  <OnPhoto key="d" art={<DragonSticker className="h-10 w-12" />} label="stories" className="-right-5 -bottom-7" rotate={6} />,
  <OnPhoto key="c" art={<CathedralSticker className="h-14 w-14" />} label="history" className="-left-6 -top-10" rotate={-6} />,
  <OnPhoto key="f" art={<FineCitySticker className="h-10 w-14" />} label="best place to live" className="-right-6 -top-9" rotate={5} />,
];

const beatStickers = [
  null,
  null,
  <OnPhoto key="t" art={<CoinSticker className="h-9 w-9" />} label="tip" className="-left-6 -bottom-5" rotate={-6} />,
];

// Header photos cycle like the brand homepage (Tom 2026-10-19), slower, as
// the booking widget sits on top. Pottergate first (it survives the tall
// phone crop); every photo has its people near the middle; none repeat the
// brand homepage's header.
const HERO_SLIDES = [
  { src: "/images/tour/pottergate-walk.jpg", alt: "Tour group walking down Pottergate in the Norwich Lanes with their guide on the Norwich Free Walking Tour", position: "center 55%" },
  { src: "/images/tour/group-cobbled-lane.jpg", alt: "", position: "55% center" },
  { src: "/images/tour/holly-elm-hill-group-smiles.jpg", alt: "", position: "62% center" },
  { src: "/images/tour/holly-flag-group-lane.jpg", alt: "", position: "38% center" },
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
        slides={HERO_SLIDES}
        slideMs={8000}
        widget={<BookingFrame priority height={520} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />}
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
