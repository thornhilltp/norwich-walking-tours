// Homepage — promoted from /home-v2 to / on 2026-05-19 after experimental
// rebuild stabilised. Old homepage lives in git history; significant
// sections removed in this promotion:
//   - WhatIsFreeTour → moved to /what-is-a-free-tour
//   - StoriesTeaser → folded into /tour
//   - HowItWorks → /what-is-a-free-tour + /book
//   - TipAnchor → /what-is-a-free-tour (and Hero footer line + FAQ)
//   - PracticalInfo → covered by FAQ + Footer meeting-point + Hero trust row
//   - LocalGuidesTeaser → replaced by the smaller internal-link row below
//
// Surviving sections in order: Hero, WhatHowWho (SEO insurance block),
// PhotoShowcase, Testimonials, ThemedRoute, About, Booking, FAQ,
// internal-link row, EmailCapture, Footer.

import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { ScrollTrail } from "@/components/ScrollTrail";
import { HeroV2 } from "./_components/HeroV2";
import { ThemedRouteSection } from "./_components/ThemedRouteSection";
import { PhotoShowcaseV2 } from "./_components/PhotoShowcaseV2";
import { BookingSectionV2 } from "./_components/BookingSectionV2";
import { Testimonials } from "./_components/Testimonials";

export default function HomePage() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "reviews", label: "Reviews" },
          { id: "stories", label: "Stories" },
          { id: "tour-map", label: "The walk" },
          { id: "book-section", label: "Book" },
          { id: "faq", label: "FAQs" },
        ]}
      />
      <div>
        <HeroV2
          buttonText="Book your spot (free)"
          buttonHref="#book-section"
          widget={
            <BookingFrame
              height={520}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          }
        />
        <Testimonials />
        <PhotoShowcaseV2 />
        <ThemedRouteSection />
        <BookingSectionV2 />
        <FAQ
          customHeading={
            <h2 className="leading-[1.0]">
              <span
                className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Everything you
              </span>{" "}
              <span
                className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                need to know.
              </span>
            </h2>
          }
        />
        {/* Internal-link row — surfaces /tour, /what-is-a-free-tour, the
            content hub, and explore articles. Plain text, low visual
            weight; Google sees the anchors. Replaces the larger
            LocalGuidesTeaser card grid from the previous homepage. */}
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
