// Hidden preview (noindex, unlinked): ways to pick a tour right in the
// homepage header, for Tom to compare (2026-10-19). ?hero=a|b|c|d|e.
//   a-c  tour buttons in the header; the live tours section stays below
//   d-e  the tour polaroids move into the header and replace that section
// Delete once one is chosen.

import type { Metadata } from "next";
import { BrandBookingSheet, BrandHero, BrandHeroPolaroids, OurTours } from "../_components/BrandSections";
import { BrandStickyBar } from "../_components/BrandBooking";
import { Testimonials } from "../_components/Testimonials";
import type { HeroChoiceVariant } from "../_components/HeroTourChoices";
import { tours } from "@/lib/tours";
import { getNextWalks } from "@/lib/nextWalks";

export const metadata: Metadata = {
  title: "Header options (preview)",
  robots: { index: false, follow: false },
};

type Option = HeroChoiceVariant | "d" | "e";

const OPTIONS: { key: Option; label: string }[] = [
  { key: "d", label: "D: polaroids on photos" },
  { key: "e", label: "E: polaroids on cream" },
  { key: "a", label: "A" },
  { key: "b", label: "B" },
  { key: "c", label: "C" },
];

export default async function HomeHeroPreview({ searchParams }: { searchParams: { hero?: string } }) {
  const option: Option = OPTIONS.find((o) => o.key === searchParams.hero)?.key ?? "d";
  const darkSlug = tours.find((t) => t.slug === "dark-history-of-norwich")?.details?.bookingTour;
  const next = await getNextWalks(darkSlug);
  const polaroids = option === "d" || option === "e";
  return (
    <main className="relative" style={{ paddingTop: 0 }} data-brand-home="">
      <style dangerouslySetInnerHTML={{ __html: "body:has([data-brand-home]) .sticky-book-bar{display:none}" }} />
      <nav aria-label="Header options" className="fixed left-1/2 top-[72px] z-50 flex max-w-[calc(100vw-16px)] -translate-x-1/2 gap-1 overflow-x-auto rounded-full bg-white/95 p-1 shadow-lg">
        {OPTIONS.map((o) => (
          <a
            key={o.key}
            href={`/home-hero?hero=${o.key}`}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold ${o.key === option ? "bg-brand-accent text-white" : "text-brand-text"}`}
          >
            {o.label}
          </a>
        ))}
      </nav>
      {polaroids ? (
        <BrandHeroPolaroids next={next} look={option === "d" ? "photo" : "cream"} />
      ) : (
        <>
          <BrandHero choice={option as HeroChoiceVariant} next={next} />
          <OurTours next={next} />
        </>
      )}
      <Testimonials showCta={false} />
      <BrandBookingSheet />
      <BrandStickyBar revealAfter={polaroids ? "tours" : undefined} />
    </main>
  );
}
