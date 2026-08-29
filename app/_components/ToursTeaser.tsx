// Homepage tours band — the upsell shelf, decided 2026-08-29.
//
// Sits AFTER the free-tour story (hero, photos, reviews) and before the
// route deep-dive: the free tour stays the page's primary product; these
// are the "come back for another one" tours. The Essentials card is
// filtered out because this page IS the Essentials tour.
import { TourCarousel } from "@/app/tours/_components/TourCarousel";
import { tours } from "@/lib/tours";
import { ArrowRight } from "lucide-react";

export function ToursTeaser() {
  const otherTours = tours.filter((t) => t.slug !== "norwich-essentials");

  return (
    <section
      id="tours"
      aria-labelledby="tours-heading"
      className="section-padding bg-white border-y border-brand-accent/10"
    >
      <div className="brand-container">
        <p
          className="text-brand-accent text-xs font-semibold tracking-[0.18em] uppercase mb-4"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Norwich Walking Tours
        </p>
        <h2 id="tours-heading" className="leading-[1.0] mb-4">
          <span
            className="inline text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            More ways to
          </span>{" "}
          <span
            className="inline text-[clamp(48px,5.6vw,76px)] font-semibold leading-[0.95] text-brand-accent"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            see Norwich.
          </span>
        </h2>
        <p
          className="text-[17px] md:text-lg text-brand-text/70 leading-relaxed max-w-2xl mb-10"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          The free tour is the overview. These go deeper into one corner of
          the city, each one run by the guide who built it.
        </p>

        <TourCarousel tours={otherTours} />

        <div className="mt-8 text-center">
          <a
            href="/tours"
            className="inline-flex items-center gap-2 font-semibold text-brand-accent hover:text-brand-text transition-colors duration-150 text-[16px]"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            See all our tours
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
