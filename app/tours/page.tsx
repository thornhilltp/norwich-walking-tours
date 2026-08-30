import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
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

const howItWorks = [
  {
    step: "01",
    title: "Book your spot",
    body: "The Essentials Tour costs nothing to book and nothing to cancel. Paid tours are booked and paid up front.",
  },
  {
    step: "02",
    title: "Meet your guide",
    body: "Every tour starts somewhere obvious in the city centre. You get the meeting point and a photo of your guide by email.",
  },
  {
    step: "03",
    title: "Pay what it was worth",
    body: "On the Essentials Tour there is no set price. Most people give £10 to £20 per person at the end. Card, Apple Pay or cash.",
  },
];

export default function ToursPage() {
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

      {/* How it works */}
      <section className="section-padding bg-white border-y border-brand-accent/10">
        <div className="brand-container">
          <h2
            className="text-[clamp(28px,3vw,38px)] font-semibold tracking-[-0.01em] text-brand-text mb-10"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            How booking works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {howItWorks.map((item) => (
              <div key={item.step}>
                <p
                  className="text-brand-accent text-[13px] font-semibold tracking-[0.16em] mb-3"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {item.step}
                </p>
                <h3
                  className="font-semibold text-[19px] text-brand-text mb-2"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[15px] text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify me — target of the 'Notify me' pills on example cards.
          scroll-mt clears the fixed nav so the heading isn't hidden. */}
      <div id="notify" className="scroll-mt-28">
        <EmailCapture
          eyebrow="New tours"
          heading="Know before anyone else"
          body="We'll email you when a new Norwich tour opens for booking, plus the odd local tip. No spam, unsubscribe any time."
        />
      </div>

      <Footer />
    </main>
  );
}
