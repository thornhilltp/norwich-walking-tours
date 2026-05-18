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
import { ArrowRight } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { tourStops } from "@/lib/tourStops";
import { HeroV2 } from "./_components/HeroV2";
import { PhotoShowcaseV2 } from "./_components/PhotoShowcaseV2";
import { BookingSectionV2 } from "./_components/BookingSectionV2";
import { TestimonialsV2 } from "./_components/TestimonialsV2";

// Experimental — don't let Google index this as duplicate of /.
// Remove this export when /home-v2 is promoted to / and this folder deleted.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// StopsAndMapCompact — Sandemans-style scannable list + map.
// No per-stop descriptions on home (those live on /tour). Just numbers + names
// + the map as the visual centrepiece. One quiet link to /tour at the bottom.
function StopsAndMapCompact() {
  return (
    <section id="tour-map" className="section-padding bg-brand-bg">
      <div className="brand-container">
        <div className="text-center mb-10">
          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            The route
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-3">
            12 stops. The Forum to Norwich Cathedral.
          </h2>
          <p
            className="text-base text-muted-foreground"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            1h 45m at a relaxed pace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Numbered stops list — typographic, no card chrome */}
          <ol className="space-y-3">
            {tourStops.map((stop) => (
              <li
                key={stop.id}
                className="flex items-baseline gap-4 border-b border-brand-accent/10 pb-3 last:border-b-0"
              >
                <span
                  className="text-sm font-bold text-brand-accent w-8 shrink-0 tabular-nums"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {String(stop.id).padStart(2, "0")}
                </span>
                <span className="font-caveat text-2xl md:text-3xl text-brand-text leading-tight">
                  {stop.name}
                </span>
              </li>
            ))}
          </ol>

          {/* Map — sticky on desktop so it stays visible as the list reads */}
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

        {/* Quiet link to the dedicated tour page (where the per-stop stories live) */}
        <div className="mt-10 text-center">
          <a
            href="/tour"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-accent hover:underline underline-offset-2"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Read the story behind each stop
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
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
      <PhotoShowcaseV2 />
      <TestimonialsV2 />
      <StopsAndMapCompact />
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
    </main>
  );
}
