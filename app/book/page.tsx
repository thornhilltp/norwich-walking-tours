import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { CheckCircle, Mail, MapPin, CreditCard, Star, Clock, Users, CloudRain } from "lucide-react";
import { googleReviewStats } from "@/lib/testimonials";
import { TestimonialsV2 } from "@/app/_components/TestimonialsV2";

export const metadata: Metadata = {
  title: "Book | Norwich Free Walking Tours",
  description:
    "Book your spot on the Norwich Free Walking Tours. Free to reserve. Near daily from The Forum. Pay what it was worth at the end by card, Apple Pay, Google Pay or cash.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/book",
  },
};

const afterSteps = [
  {
    icon: Mail,
    title: "Confirmation in your inbox",
    body: "You'll get an email straight away with the meeting point details and your guide's name.",
  },
  {
    icon: MapPin,
    title: "Meet at The Forum",
    body: "We start outside The Forum on Millennium Plain. Your guide will be in a green t-shirt with a green map-pin flag. Hard to miss.",
  },
  {
    icon: CreditCard,
    title: "Pay what it was worth",
    body: "At the end you tip what you think the tour was worth. Card, Apple Pay, Google Pay and cash all work. On a good day guests tip £10 to £20 per person.",
  },
];

const bookFaqs = [
  {
    q: "Is it really free?",
    a: "Risk-free, not just free. Nothing to pay upfront. At the end you pay what you think it was worth. £10 to £20 a person is the going rate. If it wasn't worth it, you don't pay. Cards, Apple Pay, Google Pay and cash all work.",
  },
  {
    q: "What if it rains?",
    a: "We run every day, rain or shine. Norwich was built for weather: the Lanes are covered, the Cathedral Close has cover, and half the pubs on the route have been sheltering people since the 1400s. Bring a coat.",
  },
  {
    q: "Is this suitable for kids?",
    a: "Yes. Mostly flat, mostly paved, easy pace. We've had 6-year-olds and 86-year-olds on the same tour and both had a good time. Families very welcome.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time, no charge. If you can't make it, please cancel so your spot can go to someone else. There's a link in your booking email.",
  },
];

export default function BookPage() {
  return (
    <>
      <main className="min-h-screen bg-brand-bg pt-16">
        {/* Page header */}
        <div className="brand-container pt-14 pb-4 text-center">
          <p className="text-brand-accent text-xs font-semibold tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Reserve your spot
          </p>
          <h1 className="font-caveat text-4xl md:text-5xl font-bold mb-2">
            Book your free Norwich walking tour
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-snug" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Free to book. Pay what it was worth at the end.
          </p>
        </div>

        {/* Trust row — social proof + key practicals above the widget */}
        <div className="brand-container pb-5">
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-brand-text/80"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {googleReviewStats.count > 0 && (
              <>
                <a
                  href={googleReviewStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                  aria-label={`${googleReviewStats.rating.toFixed(1)} stars from ${googleReviewStats.count} Google reviews`}
                >
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold">{googleReviewStats.rating.toFixed(1)}</span>
                  <span>({googleReviewStats.count} Google reviews)</span>
                </a>
                <span aria-hidden="true" className="text-brand-accent/40">&bull;</span>
              </>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-brand-accent" aria-hidden="true" /> 1h 45m
            </span>
            <span aria-hidden="true" className="text-brand-accent/40">&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4 text-brand-accent" aria-hidden="true" /> Max 15
            </span>
            <span aria-hidden="true" className="text-brand-accent/40">&bull;</span>
            <span className="inline-flex items-center gap-1">
              <CloudRain className="h-4 w-4 text-brand-accent" aria-hidden="true" /> Near daily, rain or shine
            </span>
          </div>
        </div>

        {/* Booking widget — full width */}
        <div className="brand-container pb-16">
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-brand-accent/15 bg-white">
            <BookingFrame height={700} />
          </div>
        </div>

        {/* Reviews — same component as homepage (TestimonialsV2). Two-platform
            rating anchor + scroll-snap carousel of all real reviews. */}
        <TestimonialsV2 />

        {/* What happens after you book */}
        <section className="section-padding bg-brand-bg border-t border-brand-accent/10">
          <div className="brand-container max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                What happens next
              </p>
              <h2 className="font-caveat text-4xl md:text-5xl font-bold">
                After you book
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {afterSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="bg-white rounded-2xl p-6 border border-brand-accent/10 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                      </div>
                      <span className="font-caveat text-2xl font-bold text-brand-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-caveat text-2xl font-bold text-brand-text mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mini FAQ */}
        <section className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
          <div className="brand-container max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                Before you book
              </p>
              <h2 className="font-caveat text-4xl md:text-5xl font-bold">
                A few quick answers
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-brand-accent/10 shadow-sm divide-y divide-brand-accent/10">
              {bookFaqs.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <h3 className="font-lora text-base md:text-lg font-semibold text-brand-text group-hover:text-brand-accent transition-colors duration-150">
                      {item.q}
                    </h3>
                    <span className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent text-lg leading-none group-open:rotate-45 transition-transform duration-150" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="font-lora text-muted-foreground leading-relaxed pt-3">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="text-center mt-8 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Got a different question?{" "}
              <a href="/#faq" className="text-brand-accent hover:underline font-semibold">
                See the full FAQ
              </a>
              {" "}or{" "}
              <a href="/contact" className="text-brand-accent hover:underline font-semibold">
                drop us a message
              </a>
              .
            </p>
          </div>
        </section>

        {/* Trust line */}
        <section className="bg-brand-bg py-10 border-t border-brand-accent/10">
          <div className="brand-container max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3 text-brand-accent">
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              <p className="font-caveat text-2xl font-bold">
                No risk. No script. No coach parties.
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              The only near-daily free walking tour in Norwich. Local guides. Group capped at 15. If the tour wasn&apos;t worth it, you don&apos;t pay. That&apos;s the deal.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
