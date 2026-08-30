import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Clock, Star, Users } from "lucide-react";
import { Footer } from "@/components/Footer";
import { EmailCapture } from "@/components/EmailCapture";
import { GuideReviews } from "@/app/about-us/_components/GuideReviews";
import { googleReviewStats } from "@/lib/testimonials";
import { tours } from "@/lib/tours";

// PROTOTYPE — per-tour landing page in the homepage's own language:
// dark image hero with the Lora-to-Caveat split headline, trust row,
// logistics card in the hero's widget slot (the booking iframe replaces
// it when the tour is real), polaroid story, guide reviews, FAQs.
// Someone googling "ghost walks norwich" lands here and never needs
// the hub. noindex until the tour is real.

export function generateStaticParams() {
  return tours.filter((t) => t.details).map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tour = tours.find((t) => t.slug === params.slug);
  if (!tour?.details) return {};
  return {
    title: `${tour.name} (prototype) | Norwich Free Walking Tours`,
    description: tour.details.promise,
    robots: { index: false, follow: false },
  };
}

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;
const caveat = { fontFamily: "var(--font-caveat), cursive" } as const;

function SplitHeading({ plain, script }: { plain: string; script: string }) {
  return (
    <h2 className="leading-[1.0] mb-7">
      <span
        className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text"
        style={lora}
      >
        {plain}
      </span>{" "}
      <span
        className="inline text-[clamp(40px,4.8vw,60px)] font-semibold leading-[0.95] text-brand-accent"
        style={caveat}
      >
        {script}
      </span>
    </h2>
  );
}

export default function TourPage({ params }: { params: { slug: string } }) {
  const tour = tours.find((t) => t.slug === params.slug);
  if (!tour?.details) notFound();
  const d = tour.details;

  return (
    <main className="bg-brand-bg">
      {/* Prototype banner — remove when this tour is real. */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-brand-text">
        <div className="brand-container py-2.5">
          <p className="text-[12.5px] text-white/80 leading-snug" style={lora}>
            <span className="font-semibold text-white">Prototype.</span> Example
            tour page with invented names, dates and prices, to judge the template.
          </p>
        </div>
      </div>

      {/* Hero — same grammar as the homepage: image bg, dark overlay,
          badge, split H1, promise, CTA row, trust row. Right column is
          the widget slot, holding logistics + waiting list until the
          tour is bookable. */}
      <section className="relative isolate w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative brand-container pt-32 pb-16 lg:pt-36 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-accent text-white text-sm font-semibold"
              style={lora}
            >
              {tour.byline}
            </span>

            <h1 className="mt-4 leading-[0.95]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}>
              <span
                className="block text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
                style={lora}
              >
                {d.heroTitle[0]}
              </span>
              <span
                className="block text-[clamp(54px,7.2vw,88px)] font-semibold leading-[0.95]"
                style={{ ...caveat, color: "#5AE19E" }}
              >
                {d.heroTitle[1]}
              </span>
            </h1>

            <p
              className="mt-5 max-w-md mx-auto lg:mx-0 text-lg md:text-xl text-white/90 leading-snug"
              style={{ ...lora, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {d.promise}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              <a
                href="#notify"
                className="btn-cta inline-flex items-center justify-center h-12 px-8 text-lg bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
              >
                Notify me when dates open
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="/tours"
                className="italic text-white/85 underline underline-offset-4 decoration-white/30 hover:decoration-white"
                style={{ ...lora, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
              >
                or see all our tours
              </a>
            </div>

            <div
              className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm text-white/85"
              style={lora}
            >
              {googleReviewStats.count > 0 && (
                <>
                  <a
                    href={googleReviewStats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                    aria-label={
                      googleReviewStats.rating.toFixed(1) +
                      " stars from " +
                      googleReviewStats.count +
                      " Google reviews of our tours"
                    }
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    <span className="font-semibold">{googleReviewStats.rating.toFixed(1)}</span>
                    <span className="text-white/90">({googleReviewStats.count} reviews)</span>
                  </a>
                  <span aria-hidden="true" className="text-white/40">&middot;</span>
                </>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" /> {tour.meta[0]}
              </span>
              <span aria-hidden="true" className="text-white/40">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" aria-hidden="true" /> {tour.meta[1]}
              </span>
            </div>
          </div>

          {/* Widget slot — logistics + waiting list for now, booking
              iframe when the tour is real. Mirrors the homepage hero's
              right-column widget card. */}
          <aside className="w-full max-w-md mx-auto lg:mx-0 bg-white rounded-2xl shadow-xl p-6">
            <dl className="grid grid-cols-1 gap-3">
              {d.logistics.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-brand-text/[0.06] pb-2.5 last:border-0 last:pb-0"
                >
                  <dt
                    className="text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground shrink-0"
                    style={lora}
                  >
                    {row.label}
                  </dt>
                  <dd className="text-[15px] font-semibold text-brand-text text-right m-0" style={lora}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href="#notify"
              className="mt-5 inline-flex w-full items-center justify-center h-12 px-6 rounded-xl bg-brand-accent text-white font-semibold text-[16px] hover:bg-brand-accent/90 transition-colors duration-150"
              style={lora}
            >
              Join the waiting list
            </a>
            <p className="mt-3 text-[13px] text-muted-foreground text-center" style={lora}>
              No dates on sale yet. The list hears first.
            </p>
          </aside>
        </div>
      </section>

      {/* Story — polaroid left, copy right, homepage showcase language. */}
      <section className="section-padding bg-white border-b border-brand-accent/10">
        <div className="brand-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative max-w-md mx-auto lg:mx-0 w-full">
            <div
              className="relative bg-white rounded-[4px] border border-[#EAE0D4] p-3 pb-14 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]"
              style={{ rotate: "-1.6deg" }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#F5EBDA]/90 rotate-[-2deg] shadow-sm"
              />
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-[2px]"
                style={{ backgroundColor: tour.tint }}
              >
                <Image
                  src={tour.image}
                  alt={tour.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p
                className="absolute bottom-4 left-0 right-0 text-center text-[26px] font-bold text-brand-text/80"
                style={caveat}
              >
                {tour.name}
              </p>
            </div>
          </div>

          <div>
            <SplitHeading plain="What this" script="walk is." />
            {d.story.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-[16.5px] text-brand-text/75 leading-relaxed mb-4 max-w-[60ch]"
                style={lora}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Run of show + guide reviews */}
      <section className="section-padding bg-brand-bg">
        <div className="brand-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SplitHeading plain="How the evening" script="runs." />
            <ol className="m-0 p-0 list-none max-w-xl">
              {d.runOfShow.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 items-baseline py-3.5 border-b border-brand-text/[0.07] last:border-0"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/10 text-brand-accent text-[13px] font-bold flex items-center justify-center translate-y-1">
                    {i + 1}
                  </span>
                  <span className="text-[16.5px] text-brand-text/80" style={lora}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {d.reviews && d.reviews.length > 0 && (
            <div className="flex flex-col items-center lg:items-start">
              <SplitHeading
                plain="Walking with"
                script={tour.byline.replace(/^Led by /, "") + "."}
              />
              <p
                className="text-[15px] text-muted-foreground -mt-3 mb-2 max-w-sm text-center lg:text-left"
                style={lora}
              >
                Real reviews from guests who have walked with her on our tours.
              </p>
              <GuideReviews reviews={d.reviews} />
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl">
          <SplitHeading plain="Asked" script="every time." />
          <div className="flex flex-col gap-6">
            {d.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-[17.5px] font-bold text-brand-text mb-1.5" style={lora}>
                  {f.q}
                </h3>
                <p className="text-[16px] text-brand-text/75 leading-relaxed m-0" style={lora}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-muted-foreground" style={lora}>
            Different question?{" "}
            <a href="/contact" className="text-brand-accent font-semibold hover:underline">
              Ask us direct
            </a>{" "}
            or see{" "}
            <a href="/tours" className="text-brand-accent font-semibold hover:underline">
              all our tours
            </a>
            .
          </p>
        </div>
      </section>

      <div id="notify" className="scroll-mt-28">
        <EmailCapture
          eyebrow={tour.name}
          heading="Hear when dates open"
          body="Leave your email and you get first pick of the dates before they go on the site. Plus the odd local tip. No spam."
        />
      </div>

      <Footer />
    </main>
  );
}
