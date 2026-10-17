// Brand homepage prototype (2026-10-17). Hidden: noindex, unlinked, not in
// the sitemap. If Tom approves, this replaces / and today's homepage (the
// free tour's page) moves to /tours/free-walking-tour. Until then nothing
// live changes.

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ScrollTrail } from "@/components/ScrollTrail";
import { EmailCapture } from "@/components/EmailCapture";
import { GuestReels } from "@/components/GuestReels";
import { guestReels, showGuestReels } from "@/lib/guestReels";
import { Testimonials } from "../_components/Testimonials";
import { BookingSectionV2 } from "../_components/BookingSectionV2";
import { ProofVideos, YourGuides } from "../_components/HomeSections";
import { BrandHero, FreeTourExplainer, OurTours, WhoWeAre } from "./_components/BrandSections";

export const metadata: Metadata = {
  title: "Norwich Free Walking Tours | Local Guides, Free and Private Tours",
  description:
    "Norwich, told by locals. Free walking tours most days, the Dark History of Norwich by night, and private walks for your group. Free to book.",
  robots: { index: false, follow: false },
};

export default function BrandHomePrototype() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "free-tours", label: "Free tours" },
          { id: "tours", label: "Our tours" },
          { id: "reviews", label: "Reviews" },
          { id: "guides", label: "Guides" },
          { id: "book-section", label: "Book" },
          { id: "updates", label: "New tours" },
        ]}
      />
      <BrandHero />
      <FreeTourExplainer />
      <OurTours />
      <Testimonials showCta={false} />
      <ProofVideos>
        {showGuestReels && <GuestReels reels={guestReels} trackingLocation="brand_guest" compact />}
      </ProofVideos>
      <YourGuides />
      <WhoWeAre />
      <BookingSectionV2 phoneCta />
      <div id="updates">
        <EmailCapture />
      </div>
      <Footer />
    </main>
  );
}
