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

import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { HeroV2 } from "./_components/HeroV2";
import { ThemedRouteSection } from "./_components/ThemedRouteSection";
import { AboutSectionV2 } from "./_components/AboutSectionV2";
import { PhotoShowcaseV2 } from "./_components/PhotoShowcaseV2";
import { BookingSectionV2 } from "./_components/BookingSectionV2";
import { TestimonialsV2 } from "./_components/TestimonialsV2";
import { ScrollTrail } from "./_components/ScrollTrail";
import { RouteDivider } from "./_components/RouteDivider";
// WalkingPattern dropped — body-wide pattern competed with text
// legibility. Replaced with RouteDivider between sections.
// PracticalInfoV2 intentionally not imported — Tom's feedback was it
// felt redundant. Hero badge has duration + daily, Booking lede has
// meeting point, Footer has address, FAQ covers what-to-wear / pace /
// language. The band added page weight without earning it.

// Experimental — don't let Google index this as duplicate of /.
// Remove this export when /home-v2 is promoted to / and this folder deleted.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Sections that should let the WalkingPattern body background show
// through — set bg-transparent on these. Sections with their own
// opaque bg (BookingSection's light-green, Hero's image, the dark
// footer) naturally cover the pattern and create rhythm.

// Note: StopsAndMapCompact replaced with ThemedRouteSection — Tom's
// feedback was that a 12-name list means nothing to a first-time
// visitor (he won't know what "Tombland" or "Fye Bridge" are).
// Reframed as 3 thematic groupings with embedded stop names, animated
// pin-drops on the group markers, wiggly-line motif connecting them.

export default function HomeV2Page() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      {/* Fixed right-edge in-page navigation (hidden below xl). */}
      <ScrollTrail />
      <div>
      <HeroV2
        buttonText="Book your spot (free)"
        // In-page anchor to the BookingSectionV2 below. Keeps users on
        // /home-v2 when they hit the hero CTA instead of context-switching
        // to /book. Wayfinding fix.
        buttonHref="#book-section"
        widget={
          <BookingFrame
            height={520}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        }
      />
      <RouteDivider />
      <PhotoShowcaseV2 />
      <RouteDivider />
      <TestimonialsV2 />
      <RouteDivider />
      <ThemedRouteSection />
      <RouteDivider />
      <AboutSectionV2 />
      <RouteDivider />
      <BookingSectionV2 />
      <FAQ
        customHeading={
          <h2 className="leading-[1.0]">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-bold leading-[1.05] tracking-tight text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Everything you
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              need to know.
            </span>
          </h2>
        }
      />
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
      </div>
    </main>
  );
}
