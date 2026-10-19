// Hidden preview (noindex, unlinked): three ways to pick a tour right in the
// homepage header, for Tom to compare (2026-10-19). ?hero=a|b|c. The tours
// section below is the live one, unchanged. Delete once one is chosen.

import type { Metadata } from "next";
import { BrandBookingSheet, BrandHero, OurTours } from "../_components/BrandSections";
import { BrandStickyBar } from "../_components/BrandBooking";
import type { HeroChoiceVariant } from "../_components/HeroTourChoices";
import { tours } from "@/lib/tours";
import { getNextWalks } from "@/lib/nextWalks";

export const metadata: Metadata = {
  title: "Header options (preview)",
  robots: { index: false, follow: false },
};

const OPTIONS: { key: HeroChoiceVariant; label: string }[] = [
  { key: "a", label: "A: three buttons" },
  { key: "b", label: "B: tickets" },
  { key: "c", label: "C: one switch" },
];

export default async function HomeHeroPreview({ searchParams }: { searchParams: { hero?: string } }) {
  const choice: HeroChoiceVariant = searchParams.hero === "b" || searchParams.hero === "c" ? searchParams.hero : "a";
  const darkSlug = tours.find((t) => t.slug === "dark-history-of-norwich")?.details?.bookingTour;
  const next = await getNextWalks(darkSlug);
  return (
    <main className="relative" style={{ paddingTop: 0 }} data-brand-home="">
      <style dangerouslySetInnerHTML={{ __html: "body:has([data-brand-home]) .sticky-book-bar{display:none}" }} />
      <nav aria-label="Header options" className="fixed left-1/2 top-[72px] z-50 flex -translate-x-1/2 gap-1 rounded-full bg-white/95 p-1 shadow-lg">
        {OPTIONS.map((o) => (
          <a
            key={o.key}
            href={`/home-hero?hero=${o.key}`}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold ${o.key === choice ? "bg-brand-accent text-white" : "text-brand-text"}`}
          >
            {o.label}
          </a>
        ))}
      </nav>
      <BrandHero choice={choice} next={next} />
      <OurTours next={next} />
      <BrandBookingSheet />
      <BrandStickyBar />
    </main>
  );
}
