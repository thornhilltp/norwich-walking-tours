import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { EmailCapture } from "@/components/EmailCapture";
import { TourCarousel } from "./_components/TourCarousel";
import { tours } from "@/lib/tours";

// PROTOTYPE ROUTE — noindex until the real tour line-up is decided.
// Nothing links to it from the nav yet and it is not in sitemap.ts, so
// the only way in is by typing the URL.
export const metadata: Metadata = {
  title: "More Tours (prototype) | Norwich Free Walking Tours",
  description:
    "Prototype tours hub. Not published.",
  robots: { index: false, follow: false },
};

export default function ToursPage() {
  // Hub still carries example tours: preview deployments only.
  if (process.env.VERCEL_ENV === "production") notFound();
  return (
    <main className="bg-brand-bg">
      {/* Prototype banner — remove before this route ever goes public. */}
      <div className="pt-24 bg-brand-text">
        <div className="brand-container py-3">
          <p
            className="text-[13px] text-white/80 leading-relaxed"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            <span className="font-semibold text-white">Prototype.</span> Not
            linked from the site and hidden from Google. Cards marked{" "}
            <span className="font-semibold text-white">Example</span> are
            placeholder tours with invented names, prices and photos.
          </p>
        </div>
      </div>

      {/* Header */}
      <section className="pt-14 md:pt-20 pb-10 md:pb-12">
        <div className="brand-container">
          <p
            className="text-brand-accent text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Norwich Free Walking Tours
          </p>
          <h1 className="leading-[1.0] mb-6 max-w-4xl">
            <span
              className="inline text-[clamp(36px,4.6vw,58px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Walking tours of Norwich,
            </span>{" "}
            <span
              className="inline text-[clamp(48px,6vw,80px)] font-semibold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              led by people who live here.
            </span>
          </h1>
          <p
            className="text-[17px] md:text-lg text-brand-text/70 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Start with the free Essentials Tour. It covers the whole city
            centre and costs whatever you decide it was worth. The rest go
            deeper into one corner of Norwich, and each one is run by the
            guide who built it.
          </p>
        </div>
      </section>

      {/* Carousel */}
      <section className="pb-16 md:pb-20">
        <div className="brand-container">
          <TourCarousel tours={tours} />
        </div>
      </section>

      {/* What's on - upcoming dates. Currently the booking widget
          (free tour only); the booking app will grow a dedicated
          "upcoming tours" view listing every tour's dates, and that
          embeds here in place of this one. */}
      <section className="section-padding bg-white border-y border-brand-accent/10">
        <div className="brand-container">
          <h2 className="leading-[1.0] mb-3">
            <span
              className="inline text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              What&apos;s
            </span>{" "}
            <span
              className="inline text-[clamp(38px,4.6vw,58px)] font-semibold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              on.
            </span>
          </h2>
          <p
            className="text-[16px] text-brand-text/70 leading-relaxed max-w-xl mb-8"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Upcoming dates you can book right now. New tours appear here as
            their dates open.
          </p>
          <div className="max-w-2xl">
            <BookingFrame height={560} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          </div>
        </div>
      </section>

      {/* Notify me — target of the 'Notify me' pills on example cards.
          scroll-mt clears the fixed nav so the heading isn't hidden. */}
      <div id="notify" className="scroll-mt-28">
        {/* Same form as /updates (same source tag, same guides visual),
            kept inline so a visitor browsing tours never leaves the page
            to sign up. Only the eyebrow differs: /updates speaks to people
            who have just walked with us. */}
        <EmailCapture source="updates" visual={{ kind: "guides" }} eyebrow="New tours" />
      </div>

      <Footer />
    </main>
  );
}
