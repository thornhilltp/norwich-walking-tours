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
// internal-link row, Footer.

import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { ScrollTrail } from "@/components/ScrollTrail";
import { HeroV2 } from "./_components/HeroV2";
import { ThemedRouteSection } from "./_components/ThemedRouteSection";
import { PhotoShowcaseV2 } from "./_components/PhotoShowcaseV2";
import { BookingSectionV2 } from "./_components/BookingSectionV2";
import { Testimonials } from "./_components/Testimonials";
import { CONTENT_READY as BIN_READY } from "@/lib/best-in-norwich";

export default function HomePage() {
  return (
    <main className="relative" style={{ paddingTop: 0 }}>
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "stories", label: "Stories" },
          { id: "reviews", label: "Reviews" },
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
              priority
              height={520}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          }
        />
        <PhotoShowcaseV2 />
        <Testimonials />
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
        {/* Best in Norwich promo. Sits after the FAQ on purpose: the booking
            widget above it is what pays for the tour, and a vote CTA higher up
            would compete with it. Deliberately a link, not the ballot itself —
            sixteen inputs here would be a wall between the FAQ and the footer.
            Hidden entirely until CONTENT_READY, so the homepage never points at
            a noindexed page. */}
        {BIN_READY && (
          <section className="py-14 bg-brand-accent-light border-t border-brand-accent/10">
            <div className="brand-container max-w-3xl mx-auto text-center">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Best in Norwich
              </p>
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  Best coffee, best pub, best chippy.
                </span>
                <span
                  className="block text-4xl md:text-5xl font-semibold text-brand-accent"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  You decide the 2027 list.
                </span>
              </h2>
              <p
                className="text-lg text-muted-foreground leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Ten winners for 2026, picked by 25 locals. Next year is an open vote with
                no shortlist, no fees and nobody able to buy a category.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/best-in-norwich#vote"
                  className="inline-flex items-center justify-center rounded-full bg-brand-accent px-7 py-3.5 text-2xl font-bold text-brand-white shadow-lg transition hover:opacity-90 min-h-[52px]"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  Vote for 2027
                </a>
                <a
                  href="/best-in-norwich"
                  className="text-lg font-semibold text-brand-accent underline-offset-4 hover:underline"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  See the 2026 winners
                </a>
              </div>
            </div>
          </section>
        )}

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
              {BIN_READY && (
                <>
                  {" · "}
                  <a
                    href="/best-in-norwich"
                    className="text-brand-accent hover:underline font-semibold"
                  >
                    Best in Norwich
                  </a>
                </>
              )}
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
