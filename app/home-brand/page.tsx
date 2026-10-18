// Brand homepage prototype. Hidden: noindex, unlinked, not in the sitemap.
// If Tom approves, this replaces / and today's homepage (the free tour's
// page) moves to /tours/free-walking-tour. Until then nothing live changes.

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ScrollTrail } from "@/components/ScrollTrail";
import { EmailCapture } from "@/components/EmailCapture";
import { FAQ } from "@/components/FAQ";
import { GuestReels } from "@/components/GuestReels";
import { guestReels, showGuestReels } from "@/lib/guestReels";
import { Testimonials } from "../_components/Testimonials";
import { ProofVideos } from "../_components/HomeSections";
import { BookAnyTour, BrandHero, FreeTourExplainer, GuidesStrip, brandFaqs } from "./_components/BrandSections";

export const metadata: Metadata = {
  title: "Norwich Free Walking Tours | Local Guides, Free and Private Tours",
  description:
    "Norwich, told by locals. The Norwich Free Walking Tour most days, the Dark History of Norwich by night, and private walks for your group. Free to book.",
  robots: { index: false, follow: false },
};

export default function BrandHomePrototype() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      <ScrollTrail
        sections={[
          { id: "top", label: "Pick a tour" },
          { id: "reviews", label: "Reviews" },
          { id: "free-tours", label: "Free tours" },
          { id: "book-section", label: "Book" },
          { id: "guides", label: "Guides" },
          { id: "faq", label: "FAQs" },
          { id: "updates", label: "New tours" },
        ]}
      />
      <BrandHero />
      <Testimonials showCta={false} />
      <ProofVideos>
        {showGuestReels && <GuestReels reels={guestReels} trackingLocation="brand_guest" compact />}
      </ProofVideos>
      <FreeTourExplainer />
      <BookAnyTour />
      <GuidesStrip />
      <FAQ
        items={brandFaqs}
        emitSchema={false}
        customHeading={
          <h2 className="leading-[1.0]">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Good
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              questions.
            </span>
          </h2>
        }
      />
      <div id="updates">
        <EmailCapture />
      </div>
      <Footer />
    </main>
  );
}
