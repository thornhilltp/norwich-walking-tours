// Homepage: the collective's front door, every tour and experience. Built as
// the /home-brand prototype with Tom and promoted to / (move plan,
// docs/brand-homepage-move-plan.md). The free tour's own page, which was the
// homepage until this move, now lives at /tours/free-walking-tour.

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ScrollTrail } from "@/components/ScrollTrail";
import { EmailCapture } from "@/components/EmailCapture";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "./_components/Testimonials";
import { YourGuides, homeFaqs } from "./_components/HomeSections";
import {
  FilmHero,
  TourPolaroids,
  WhatIsFree,
  brandFaqs,
} from "./_components/BrandSections";
import { BrandStickyBar } from "./_components/BrandBooking";
import { tours } from "@/lib/tours";
import { getNextWalks } from "@/lib/nextWalks";

const BASE = "https://www.norwichfreewalkingtours.co.uk";

export const metadata: Metadata = {
  // Brand first, then the tours (move plan §9).
  title: "Norwich Free Walking Tours | Free Walking Tour, Dark History and Private Tours",
  description:
    "The Norwich Free Walking Tour most days, the Dark History of Norwich by night, and private walks for your group. Led by locals. Free to book.",
  alternates: { canonical: BASE },
};

export const revalidate = 300;

// Some homepage questions are also asked on the free tour page. Only the
// business-wide ones go in this page's FAQPage markup, so the same question
// is never marked up on two URLs.
const homeSchemaFaqs = brandFaqs.filter((f) => !homeFaqs.some((h) => h.q === f.q));

// The tours, for Google: one list, each pointing at its own page.
const toursList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tours by Norwich Free Walking Tours",
  itemListElement: [
    { name: "The Norwich Free Walking Tour", url: `${BASE}/tours/free-walking-tour` },
    { name: "The Dark History of Norwich", url: `${BASE}/tours/dark-history-of-norwich` },
    { name: "Private & Group Tours", url: `${BASE}/private-tours` },
  ].map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: t.url })),
};

export default async function HomePage() {
  // Next walks, read live from the booking app (refreshed every 5 minutes).
  const darkSlug = tours.find((t) => t.slug === "dark-history-of-norwich")?.details?.bookingTour;
  const next = await getNextWalks(darkSlug);
  return (
    <main className="relative" style={{ paddingTop: 0 }} data-brand-home="">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toursList) }} />
      {/* This page has its own "Book a tour" bar; hide the site-wide
          free-tour one. */}
      <style dangerouslySetInnerHTML={{ __html: "body:has([data-brand-home]) .sticky-book-bar{display:none}" }} />
      <ScrollTrail
        sections={[
          { id: "top", label: "Hello" },
          { id: "pick-your-walk", label: "Tours" },
          { id: "reviews", label: "Reviews" },
          { id: "free-tours", label: "Free tours" },
          { id: "guides", label: "Guides" },
          { id: "faq", label: "FAQs" },
        ]}
      />
      {/* Tom 2026-10-21: our free tour on film in the header (from
          VisitNorwich's summer film), then the tours as polaroids in their
          own section. The header's button glides down to them. */}
      <FilmHero />
      <TourPolaroids next={next} />
      <Testimonials showCta={false} />
      {/* Guest videos live on each tour's own page (Tom 2026-10-18). */}
      <WhatIsFree />
      {/* The free tour page's guides section, with the About us line (Tom 2026-10-18). */}
      <YourGuides intro="We show people round the city we actually live in. It started with one free tour, and it's grown from there." />
      <FAQ
        items={brandFaqs}
        schemaItems={homeSchemaFaqs}
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
      {/* No booking pop-up here since 2026-10-22: every homepage button leads
          to Pick your walk, and the prints open each tour's own page. */}
      {/* Hidden until the tours scroll away (Tom 2026-10-19); glides back up
          to Pick your walk (Tom 2026-10-21). */}
      <BrandStickyBar revealAfter="tours" glideTo="pick-your-walk" />
    </main>
  );
}
