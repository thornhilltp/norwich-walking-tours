// Prototype of a tourist-first homepage (Tom 2026-10-17). Noindex, not in
// the sitemap, not linked: open /home-next to compare with /. Pick the
// sections that work, then move them onto the real homepage.

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { ScrollTrail } from "@/components/ScrollTrail";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { GuestReels } from "@/components/GuestReels";
import { guestReels, showGuestReels } from "@/lib/guestReels";
import { HeroV2 } from "../_components/HeroV2";
import { Testimonials } from "../_components/Testimonials";
import { BookingSectionV2 } from "../_components/BookingSectionV2";
import { InfoBar, WhatYouGet, ProofVideos, TheWalk, YourGuides, homeNextFaqs } from "./_components/Sections";

export const metadata: Metadata = {
  // Search title + description for when this replaces the homepage. The H1
  // is about the city, so these carry the search words.
  title: "Free Walking Tour Norwich | History, Highlights and Local Tips",
  description:
    "The Norwich Free Walking Tour: two hours of Norwich's best history, stories and local tips with a guide who lives here. Most days at 10:30am from The Forum. Free to book.",
  robots: { index: false, follow: false },
};

export default function HomeNextPage() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "what-you-get", label: "The tour" },
          { id: "reviews", label: "Reviews" },
          { id: "guides", label: "Guides" },
          { id: "the-walk", label: "How it works" },
          { id: "faq", label: "FAQs" },
          { id: "book-section", label: "Book" },
        ]}
      />
      <div>
        <HeroV2
          badge="The Norwich Free Walking Tour"
          showTourLink={false}
          heading={["England's best-kept", "medieval city."]}
          subheading="Two hours of Norwich's best history, stories and local tips, with a guide who lives here."
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
          widget={
            <BookingFrame
              priority
              height={520}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          }
        />
        <InfoBar />
        <WhatYouGet />
        <Testimonials showCta={false} />
        <ProofVideos>
          {showGuestReels && <GuestReels reels={guestReels} trackingLocation="home_next_guest" compact />}
        </ProofVideos>
        <YourGuides />
        <TheWalk />
        <FAQ
          items={homeNextFaqs}
          customHeading={
            <h2 className="leading-[1.0]">
              <span
                className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Before you
              </span>{" "}
              <span
                className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                book.
              </span>
            </h2>
          }
        />
        {/* Close on the deal, after the questions (Dark History pattern). */}
        <BookingSectionV2 phoneCta />
        <EmailCapture />
      </div>
      <Footer />
    </main>
  );
}
