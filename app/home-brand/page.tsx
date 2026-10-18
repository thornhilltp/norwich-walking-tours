// Brand homepage prototype. Hidden: noindex, unlinked, not in the sitemap.
// If Tom approves, this replaces / and today's homepage (the free tour's
// page) moves to /tours/free-walking-tour. Until then nothing live changes.

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ScrollTrail } from "@/components/ScrollTrail";
import { EmailCapture } from "@/components/EmailCapture";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "../_components/Testimonials";
import { YourGuides } from "../_components/HomeSections";
import {
  BrandBookingSheet,
  BrandHero,
  WhatIsFree,
  OurTours,
  brandFaqs,
} from "./_components/BrandSections";
import { BrandStickyBar } from "./_components/BrandBooking";
import { tours } from "@/lib/tours";
import { getNextWalks } from "@/lib/nextWalks";

export const metadata: Metadata = {
  title: "Norwich Free Walking Tours | Local Guides, Free and Private Tours",
  description:
    "Norwich, told by locals. The Norwich Free Walking Tour most days, the Dark History of Norwich by night, and private walks for your group. Free to book.",
  robots: { index: false, follow: false },
};

export const revalidate = 300;

export default async function BrandHomePrototype() {
  // Next walks, read live from the booking app (refreshed every 5 minutes).
  const darkSlug = tours.find((t) => t.slug === "dark-history-of-norwich")?.details?.bookingTour;
  const next = await getNextWalks(darkSlug);
  return (
    <main className="relative" style={{ paddingTop: 0 }} data-brand-home="">
      {/* This page has its own "Book a tour" bar; hide the site-wide
          free-tour one. */}
      <style dangerouslySetInnerHTML={{ __html: "body:has([data-brand-home]) .sticky-book-bar{display:none}" }} />
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "tours", label: "Our tours" },
          { id: "reviews", label: "Reviews" },
          { id: "free-tours", label: "Free tours" },
          { id: "guides", label: "Guides" },
          { id: "faq", label: "FAQs" },
        ]}
      />
      <BrandHero />
      <OurTours next={next} />
      <Testimonials showCta={false} />
      {/* Guest videos live on each tour's own page (Tom 2026-10-18). */}
      <WhatIsFree />
      {/* The live homepage's guides section, as is (Tom 2026-10-18). */}
      <YourGuides />
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
      <Footer
        meetingPoints={[
          { name: "Free Walking Tour: outside The Forum", lines: ["Millennium Plain", "Norwich, NR2 1TF"] },
          { name: "Dark History: City Hall steps", lines: ["St Peter's Street", "Norwich, NR2 1NH"] },
        ]}
      />
      <BrandBookingSheet />
      <BrandStickyBar />
    </main>
  );
}
