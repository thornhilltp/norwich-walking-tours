// The Norwich Free Walking Tour's own page. Until the brand homepage went
// live this was the homepage (/); its words, headings, photo descriptions and
// FAQs moved here unchanged so the rankings follow them (move plan,
// docs/brand-homepage-move-plan.md). /tour and /free-walking-tour 301 here.
// Keep the ids #tour-map, #reviews, #faq and #book-section: Google Ads
// sitelinks and other pages link to them.
//
// Scrapbook stickers (Tom 2026-10-19, after a UX review): one small sticker
// per photo, matched to what the photo shows, a one or two word label (the
// section copy already asks the questions), none in the hero (it sat beside
// the booking button).
//   Story by the river   Snap the dragon   "stories"
//   Highlights collage   the Cathedral     "history"
//   Life in Norwich      Fine City sign    "best place to live"
//   Tip                  £ coin            "tip"
// A static folder beats app/tours/[slug], so no clash with the Dark History
// page system.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollTrail } from "@/components/ScrollTrail";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { GuestReels } from "@/components/GuestReels";
import { CoinSticker, StickerLabel } from "@/components/Doodles";
import { CathedralSticker, DragonSticker, FineCitySticker } from "@/components/MoreDoodles";
import { ScrollSticker } from "@/components/ScrollSticker";
import { guestReels, showGuestReels } from "@/lib/guestReels";
import { HeroV2 } from "../../_components/HeroV2";
import { Testimonials } from "../../_components/Testimonials";
import { BookingSectionV2 } from "../../_components/BookingSectionV2";
import { InfoBar, WhatYouGet, ProofVideos, TheWalk, YourGuides, homeFaqs } from "../../_components/HomeSections";

const BASE = "https://www.norwichfreewalkingtours.co.uk";
const PAGE_URL = `${BASE}/tours/free-walking-tour`;

// Title and description moved unchanged from the old homepage. The H1 is
// about the city, so these carry the search words.
const TITLE = "Free Walking Tour Norwich | History, Highlights and Local Tips";
const DESCRIPTION =
  "The Norwich Free Walking Tour: two hours of our favourite Norwich history, stories and local tips, with a guide who lives here. Most days at 10:30am from The Forum. Free to book.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  // Its own share card, so links to this page preview the tour.
  openGraph: {
    title: "The Norwich Free Walking Tour",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Norwich Free Walking Tours",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A guide telling a story to a tour group in Tombland on the Norwich Free Walking Tour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Norwich Free Walking Tour",
    description: "Two hours of our favourite Norwich history, stories and local tips. Free to book.",
    images: ["/og-image.jpg"],
  },
};

// Moved here from app/layout.tsx (it used to say the whole site was this tour).
const tourSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "The Norwich Free Walking Tour",
  description:
    "A pay what you want walking tour of Norwich city centre, running most days. 2 hours, about 2.5 km. English language. Starts at The Forum, finishes at Norwich Market.",
  url: PAGE_URL,
  touristType: ["Culture Seekers", "History Buffs", "Independent Travellers"],
  inLanguage: "en",
  provider: { "@id": `${BASE}/#localbusiness` },
  location: {
    "@type": "Place",
    name: "The Forum, Norwich",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Millennium Plain",
      addressLocality: "Norwich",
      postalCode: "NR2 1TF",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.6278, longitude: 1.2983 },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    url: `${BASE}/book`,
    description:
      "Book free. Pay what it was worth at the end. Most guests tip £10 to £20 per person. Cards, Apple Pay, Google Pay, and cash accepted.",
  },
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
  <OnPhoto key="t" art={<CoinSticker className="h-9 w-9" />} label="tip" className="-right-7 -bottom-6" rotate={6} />,
];

// Header photos cycle like the homepage (Tom 2026-10-19), slower, as the
// booking widget sits on top. Pottergate first (it survives the tall phone
// crop); every photo has its people near the middle; none repeat the
// homepage's header.
const HERO_SLIDES = [
  { src: "/images/tour/pottergate-walk.jpg", alt: "Tour group walking down Pottergate in the Norwich Lanes with their guide on the Norwich Free Walking Tour", position: "center 55%" },
  { src: "/images/tour/group-cobbled-lane.jpg", alt: "", position: "55% center" },
  { src: "/images/tour/holly-elm-hill-group-smiles.jpg", alt: "", position: "62% center" },
  { src: "/images/tour/holly-flag-group-lane.jpg", alt: "", position: "38% center" },
];

export default function FreeWalkingTourPage() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }} />
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "tour-map", label: "The tour" },
          { id: "reviews", label: "Reviews" },
          { id: "guides", label: "Guides" },
          { id: "the-walk", label: "How it works" },
          { id: "faq", label: "FAQs" },
          { id: "book-section", label: "Book" },
        ]}
      />
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
        phonePhotoBand
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
      {/* Close on the deal, after the questions (Dark History pattern). */}
      <BookingSectionV2 phoneCta />
      <EmailCapture />

      {/* Internal-link row, moved from the old homepage. Plain text, low
          visual weight; Google sees the anchors. */}
      <section className="py-10 bg-brand-bg border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground" style={lora}>
            More on Norwich:{" "}
            <a href="/tours/dark-history-of-norwich" className="text-brand-accent hover:underline font-semibold">
              The Dark History of Norwich
            </a>
            {" · "}
            <a href="/what-is-a-free-tour" className="text-brand-accent hover:underline font-semibold">
              What is a free tour?
            </a>
            {" · "}
            <a href="/things-to-do/free" className="text-brand-accent hover:underline font-semibold">
              Free things to do
            </a>
            {" · "}
            <a href="/explore" className="text-brand-accent hover:underline font-semibold">
              More articles
            </a>
          </p>
        </div>
      </section>

      {/* Breadcrumbs sit at the foot: the hero runs under the nav, so there
          is no room up top. "Tours" joins the trail once /tours is built. */}
      <div className="bg-brand-bg pb-4">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Norwich Free Walking Tour", url: "/tours/free-walking-tour" },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}
