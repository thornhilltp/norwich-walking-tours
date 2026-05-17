// EXPERIMENTAL HOMEPAGE — /home-v2 (Round 2: lean rewrite)
//
// Sections cut from /:
//   - WhatIsFreeTour → moved to /what-is-a-free-tour
//   - StoriesTeaser → folded into /tour later (kept off home)
//   - HowItWorks → /what-is-a-free-tour + /book (and new FAQ entry)
//   - TipAnchor → /what-is-a-free-tour (and Hero footer line + FAQ)
//   - PracticalInfo → covered by FAQ + Footer meeting-point
//   - LocalGuidesTeaser → linked from Footer ("Articles") + FAQ
//
// Surviving sections (7 total): Hero, PhotoShowcase, Testimonials,
// StopsAndMap (compact), FAQ, EmailCapture, Footer.

import Image from "next/image";
import type { Metadata } from "next";
import { PhotoShowcase } from "@/components/PhotoShowcase";
import { TourStops } from "@/components/TourStops";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { Testimonials } from "@/components/Testimonials";
import { googleReviews, googleReviewStats } from "@/lib/testimonials";
import { HeroV2 } from "./_components/HeroV2";

// Experimental — don't let Google index this as duplicate of /.
// Remove this export when /home-v2 is promoted to / and this folder deleted.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Compact StopsAndMap — drops the centred eyebrow + "12 stops. 1h 45m." heading
// (Hero badge already states 1h 45m and the booking widget says max-15).
// Just the map + stops list. Visual content, no copy filler.
function StopsAndMapCompact() {
  return (
    <section id="tour-map" className="section-padding bg-brand-bg">
      <div className="brand-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <TourStops hideHeader />
          </div>
          <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <p className="font-caveat text-xl font-bold text-brand-text">
                Map of the Route
              </p>
            </div>
            <Image
              src="/images/route-map.png"
              alt="Hand-drawn route map of the Norwich Free Walking Tours showing all 12 stops from The Forum to Norwich Cathedral."
              width={1500}
              height={1155}
              className="w-full h-auto"
            />
            <p
              className="px-4 py-2 text-xs text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Map of Norwich City Centre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeV2Page() {
  return (
    <main className="bg-brand-bg" style={{ paddingTop: 0 }}>
      <HeroV2
        title={<>Norwich Free Walking Tours</>}
        buttonText="Book your spot (free)"
        buttonHref="/book"
        widget={
          <BookingFrame
            height={520}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        }
      />
      <PhotoShowcase />
      <Testimonials
        testimonials={googleReviews}
        subtitle="What guests say about the Norwich walking tour and the local tips that come with it."
        rating={googleReviewStats.rating}
        count={googleReviewStats.count}
        profileUrl={googleReviewStats.profileUrl}
      />
      <StopsAndMapCompact />
      <FAQ />
      {/* Internal-link row — recovers the link equity LocalGuidesTeaser used to
          carry to /explore, /things-to-do/free, etc. Plain text links, low
          visual weight, but Google sees the anchors. */}
      <section className="py-10 bg-brand-bg border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            More on Norwich:{" "}
            <a href="/tour" className="text-brand-accent hover:underline font-semibold">
              The full tour
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
      <EmailCapture />
      <Footer />
    </main>
  );
}
