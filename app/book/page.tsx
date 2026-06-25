import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { CheckCircle, Star, Clock, Users, CloudRain } from "lucide-react";
import { googleReviewStats } from "@/lib/testimonials";
import { Testimonials } from "@/app/_components/Testimonials";

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

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
    src: "/images/tour/meet-at-the-forum.jpg",
    alt: "Tour group gathering at The Forum on Millennium Plain at the start of the Norwich Free Walking Tour",
    caption: "meet here",
    polaroidBg: "#E8F0E4",
    tilt: "-1.2deg",
    title: "Meet at The Forum",
    body: "We start outside The Forum on Millennium Plain. Your guide will be in a green t-shirt with a green map-pin flag. Hard to miss.",
    pin: "10 mins early",
  },
  {
    src: "/images/tour/group-portrait-bridge.jpg",
    alt: "Norwich Free Walking Tour group together at the end of the tour by the river",
    caption: "the happy bit",
    polaroidBg: "#F5EBDA",
    tilt: "0.8deg",
    title: "Pay what it was worth",
    body: "At the end you tip what you think the tour was worth. Card, Apple Pay, Google Pay and cash all work. On a good day guests tip £10 to £20 per person.",
    pin: "no awkward pitch",
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
      <main className="min-h-screen bg-brand-bg" style={{ paddingTop: 0 }}>
        {/* Hero — full-bleed image with overlay, mirrors HeroV2 on /.
            Gives the cold lander (visitnorwich.co.uk, Google) the same
            emotional anchor + brand promise the homepage Hero would. */}
        <section className="relative isolate w-full overflow-hidden">
          <Image
            src="/images/tour/group-cathedral-lawn.jpg"
            alt="Norwich Free Walking Tour group with their guide in front of Norwich Cathedral"
            fill
            priority
            sizes="100vw"
            className="object-cover -z-10"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative brand-container pt-28 pb-12 md:pt-32 md:pb-14 text-center">
            <p
              className="text-white/85 text-xs font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Reserve your spot
            </p>
            <h1 className="leading-[1.0] mb-4" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}>
              <span
                className="block text-[clamp(28px,4.4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                1h 45m of Norwich,
              </span>
              <span
                className="block text-[clamp(40px,5.6vw,68px)] font-semibold leading-[0.95]"
                style={{ fontFamily: "var(--font-caveat), cursive", color: "#5AE19E" }}
              >
                with someone who lives here.
              </span>
            </h1>
            <p
              className="text-white/85 text-base md:text-lg max-w-xl mx-auto leading-snug mb-6"
              style={{ fontFamily: "var(--font-lora), Georgia, serif", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              Free to book. Pay what it was worth at the end.
            </p>

            {/* Trust row — adapted for the dark hero (white text) */}
            <div
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/90"
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
                  <span aria-hidden="true" className="text-white/40">&bull;</span>
                </>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" /> 1h 45m
              </span>
              <span aria-hidden="true" className="text-white/40">&bull;</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" aria-hidden="true" /> Max 15
              </span>
              <span aria-hidden="true" className="text-white/40">&bull;</span>
              <span className="inline-flex items-center gap-1">
                <CloudRain className="h-4 w-4" aria-hidden="true" /> Near daily, rain or shine
              </span>
            </div>

            {/* Booking widget — embedded INSIDE the hero so the image bg +
                overlay continue behind it. Single column, centered, max-w-3xl.
                Mirrors HeroV2's "hero contains widget" pattern but single-column. */}
            <div className="mt-10 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-white text-left">
              <BookingFrame height={700} />
            </div>

            {/* Meeting-point reassurance — added for direct landers
                (visitnorwich.co.uk) who'd otherwise scroll past the widget
                wondering where they're meeting. */}
            <p
              className="mt-6 text-center text-sm text-white/90"
              style={{ fontFamily: "var(--font-lora), Georgia, serif", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon />
                Meets outside The Forum, Millennium Plain. Look for the green flag.
              </span>
            </p>
          </div>
        </section>

        {/* Reviews — same component as homepage. Dual-platform rating anchor +
            4-card skim grid of curated highlight quotes. */}
        <Testimonials />

        {/* What happens on the day — PhotoShowcaseV2-style polaroid duo */}
        <section className="section-padding bg-brand-bg border-t border-brand-accent/10">
          <div className="brand-container max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-14">
              <p className="text-brand-accent text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                On the day
              </p>
              <h2 className="leading-[1.0]">
                <span className="inline text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  Here&apos;s
                </span>{" "}
                <span className="inline text-[clamp(44px,5.6vw,72px)] font-semibold leading-[0.95] text-brand-accent" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                  what happens.
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 max-w-3xl mx-auto">
              {afterSteps.map((step, idx) => (
                <article key={step.title} className="flex flex-col">
                  {/* Polaroid frame — paper tone + slight tilt, masking tape on top */}
                  <div
                    className="relative p-2.5 pb-10 shadow-lg border border-brand-text/5 mb-6 self-stretch"
                    style={{ backgroundColor: step.polaroidBg, transform: `rotate(${step.tilt})` }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm shadow-sm"
                      style={{
                        backgroundColor: "rgba(241, 225, 161, 0.75)",
                        borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                      }}
                    />
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={step.src}
                        alt={step.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 85vw, 40vw"
                      />
                    </div>
                    <p
                      className="absolute bottom-2 left-3 text-[20px] italic font-bold text-brand-text"
                      style={{ fontFamily: "var(--font-caveat), cursive" }}
                    >
                      {step.caption}
                    </p>
                  </div>
                  {/* Step number + title + body */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-caveat text-2xl font-bold text-brand-accent leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-brand-accent/40" aria-hidden="true" />
                  </div>
                  <h3
                    className="font-bold text-[22px] leading-[1.2] text-brand-text mb-2.5"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[15px] text-muted-foreground leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {step.body}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 italic text-brand-accent-text text-lg font-medium mt-auto"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    <MapPinIcon />
                    {step.pin}
                  </span>
                </article>
              ))}
            </div>
            <p className="text-center mt-12 text-sm text-muted-foreground italic" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Confirmation lands in your inbox the moment you book. Bring a coat if it&apos;s grey.
            </p>
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
