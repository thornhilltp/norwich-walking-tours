import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check, Clock, Star, Users } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { EmailCapture } from "@/components/EmailCapture";
import { GuideReviews } from "@/app/our-guides/_components/GuideReviews";
import { PhotoSwipe } from "@/app/tours/_components/PhotoSwipe";
import { GuideProfileCard } from "@/app/tours/_components/GuideProfileCard";
import { PhilosophyCards } from "@/app/our-guides/_components/PhilosophyCards";
import { HeroWaitlistForm } from "@/app/tours/_components/HeroWaitlistForm";
import { ThemedRouteSection } from "@/app/_components/ThemedRouteSection";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { tours } from "@/lib/tours";

// PROTOTYPE — per-tour landing page in the homepage's own language:
// dark image hero with the Lora-to-Caveat split headline, trust row,
// logistics card in the hero's widget slot (the booking iframe replaces
// it when the tour is real), polaroid story, guide reviews, FAQs.
// Someone googling "ghost walks norwich" lands here and never needs
// the hub. noindex until the tour is real.

// Production shows only live tours; previews also show the examples.
const IS_PROD = process.env.VERCEL_ENV === "production";
const isShown = (t: (typeof tours)[number]) =>
  Boolean(t.details) && (!IS_PROD || t.status === "live");

// A value still waiting on the guides ("[TBC]" etc.) never renders.
const ready = (v?: string): v is string => Boolean(v) && !v!.includes("[");

const BASE = "https://www.norwichfreewalkingtours.co.uk";

export function generateStaticParams() {
  return tours.filter(isShown).map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tour = tours.find((t) => t.slug === params.slug);
  if (!tour?.details || !isShown(tour)) return {};
  const live = tour.status === "live";
  const title = tour.details.seoTitle ?? tour.name;
  const description = tour.details.seoDescription ?? tour.details.promise;
  const url = `${BASE}/tours/${tour.slug}`;
  return {
    // seoTitle already reads as a full title; the layout template adds nothing.
    title: { absolute: live ? title : `${title} (prototype)` },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: tour.image }] },
    ...(live ? {} : { robots: { index: false, follow: false } }),
  };
}

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;
const caveat = { fontFamily: "var(--font-caveat), cursive" } as const;

// **bold** markers -> semibold ink, matching /our-guides renderBold.
function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-brand-text">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

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
  if (!tour?.details || !isShown(tour)) notFound();
  const live = tour.status === "live";
  const d = tour.details;

  return (
    <main className="bg-brand-bg">
      {live && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              name: tour.name,
              description: d.seoDescription ?? d.promise,
              url: `${BASE}/tours/${tour.slug}`,
              touristType: "Walking tour",
              provider: { "@id": `${BASE}/#localbusiness` },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "GBP",
                description: "Free to book. Pay what it was worth at the end.",
              },
              ...(d.route
                ? {
                    itinerary: {
                      "@type": "ItemList",
                      itemListElement: d.route.map((r, i) => ({
                        "@type": "ListItem",
                        position: i + 1,
                        name: r.place,
                        description: r.story,
                      })),
                    },
                  }
                : {}),
            }),
          }}
        />
      )}
      {/* Prototype banner, example tours only. */}
      {!live && (
      <div className="fixed bottom-[72px] md:bottom-0 inset-x-0 z-40 bg-brand-text">
        <div className="brand-container py-2.5">
          <p className="text-[12.5px] text-white/80 leading-snug" style={lora}>
            <span className="font-semibold text-white">Prototype.</span> Not live, hidden from Google. Anything in [square brackets] is waiting on real details from the guide.
          </p>
        </div>
      </div>
      )}

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

        <div className="relative brand-container pt-32 pb-24 lg:pt-36 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            {tour.byline && (
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-accent text-white text-sm font-semibold"
                style={lora}
              >
                {tour.byline}
              </span>
            )}

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

            {ready(d.hook) && (
              <p
                className="mt-4 max-w-md mx-auto lg:mx-0 text-[22px] md:text-[26px] font-bold leading-snug"
                style={{ ...caveat, color: "#5AE19E", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
              >
                {d.hook}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              <a
                href={d.bookingTour ? "#book" : "#notify"}
                className="btn-cta inline-flex items-center justify-center h-12 px-8 text-lg bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
              >
                {d.bookingTour ? "Book your spot (free)" : "Notify me when dates open"}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="/"
                className="italic text-white/85 underline underline-offset-4 decoration-white/30 hover:decoration-white"
                style={{ ...lora, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
              >
                or see our free walking tour
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
              {ready(tour.meta[0]) && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" /> {tour.meta[0]}
                </span>
              )}
              {ready(tour.meta[0]) && ready(tour.meta[1]) && (
                <span aria-hidden="true" className="text-white/40">&middot;</span>
              )}
              {ready(tour.meta[1]) && (
                <span className="inline-flex items-center gap-1">
                  <Users className="h-4 w-4" aria-hidden="true" /> {tour.meta[1]}
                </span>
              )}
            </div>
            <div className="mt-6 flex justify-center lg:justify-start">
              <PartnerLogosInverted size="sm" label="Featured on" />
            </div>
          </div>

          {/* Widget slot - the booking iframe drops in here when the
              tour is bookable. Until then, the waiting-list signup itself. */}
          {d.bookingTour ? (
            <div
              id="book"
              className="scroll-mt-28 w-full max-w-md mx-auto lg:mx-0 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <BookingFrame
                tour={d.bookingTour}
                priority
                height={520}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          ) : (
            <aside id="book" className="scroll-mt-28 w-full max-w-md mx-auto lg:mx-0 bg-white rounded-2xl shadow-xl p-6 text-center">
              {tour.priceLine.startsWith("Free") && (
                <span
                  className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-[13px] font-semibold"
                  style={lora}
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Free to book. Pay what it was worth.
                </span>
              )}
              <p
                className="text-[13px] uppercase tracking-[0.16em] font-semibold text-brand-accent mb-2"
                style={lora}
              >
                Dates open soon
              </p>
              <p className="text-[19px] font-bold text-brand-text mb-1" style={lora}>
                {d.availability ? d.availability.headline : `${tour.name} is nearly ready.`}
              </p>
              <p className="text-[14.5px] text-muted-foreground mb-5" style={lora}>
                {d.availability
                  ? d.availability.sub
                  : "The waiting list gets first pick of the first dates."}
              </p>
              <HeroWaitlistForm tourInterest={tour.slug} tourName={tour.name} />
            </aside>
          )}
        </div>
      </section>

      {/* Logistics bar - bridges the hero and the story, overlapping
          the hero's bottom edge. The at-a-glance answers live here now
          the hero slot is reserved for the booking widget. */}
      <div className="relative z-10 -mt-10 md:-mt-12">
        <div className="brand-container">
          {/* Facts (Tom): Time / How long / Start / Finish / Price.
              Each reads as two lines - small label over a bold value. */}
          <dl className="bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(26,26,26,0.25)] border border-brand-text/[0.05] px-6 py-6 md:px-10 md:py-7 grid grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-x-8 gap-y-5">
            {d.logistics
              .filter((row) =>
                ["When", "Time", "How long", "Route", "Start", "Finish", "Price"].includes(row.label) &&
                ready(row.value)
              )
              .map((row) => (
                <div key={row.label}>
                  <dt
                    className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-accent mb-1"
                    style={lora}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className="text-[17px] md:text-[18px] font-bold text-brand-text m-0 leading-snug"
                    style={lora}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
          </dl>
          {(ready(d.suitableFor) || ready(d.lookFor)) && (
            <p
              className="mt-3 px-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-brand-text/70"
              style={lora}
            >
              {ready(d.suitableFor) && (
                <span>
                  <span className="font-semibold text-brand-text">Suitable for:</span> {d.suitableFor}
                </span>
              )}
              {ready(d.lookFor) && (
                <span>
                  <span className="font-semibold text-brand-text">Look for:</span> {d.lookFor}
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Highlights as tap-to-open photo cards - the Our Guides
          philosophy component, pointed at this tour's waiting list. */}
      {d.highlightCards && d.highlightCards.length > 0 && (
        <section className="pt-20 pb-6 md:pt-24">
          <div className="brand-container text-center">
            <h2 className="leading-[1.0]">
              <span
                className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text"
                style={lora}
              >
                Why come on
              </span>{" "}
              <span
                className="inline text-[clamp(40px,4.8vw,60px)] font-semibold leading-[0.95] text-brand-accent"
                style={caveat}
              >
                this walk.
              </span>
            </h2>
            <PhilosophyCards
              points={d.highlightCards}
              eyebrow={tour.name}
              cta={{ href: "#notify", label: "Join the waiting list" }}
              idPrefix={`hl-${tour.slug}`}
            />
          </div>
        </section>
      )}

      {/* Story — polaroid left, copy right, homepage showcase language. */}
      <section className="section-padding bg-white border-b border-brand-accent/10">
        <div className="brand-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <PhotoSwipe photos={d.gallery ?? []} />

          <div>
            <SplitHeading plain="What this" script="walk is." />
            {d.highlights && d.highlights.length > 0 && (
              <ul className="m-0 mb-6 p-0 list-none flex flex-col gap-2.5">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[16.5px] font-semibold text-brand-text" style={lora}>
                    <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {d.story.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-[16.5px] text-brand-text/75 leading-relaxed mb-4 max-w-[60ch]"
                style={lora}
              >
                {renderBold(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* The walk - the homepage ThemedRouteSection itself: wiggly
          thread, pin drops, mobile accordion, sticky map. Placeholder
          map until the tour has its own. */}
      {d.walk && d.walk.length > 0 && (
        <ThemedRouteSection
          id="walk"
          heading={{ plain: "The walk, and", script: "what you get." }}
          groups={d.walk}
          map={null}
          footerLink={null}
        />
      )}

      {/* Stop-by-stop route from the guides' script. Named places and
          people double as the page's search terms. */}
      {d.route && d.route.length > 0 && (
        <section className="section-padding bg-white border-y border-brand-accent/10">
          <div className="brand-container max-w-3xl">
            <SplitHeading plain="Stop by" script="stop." />
            <ol className="m-0 p-0 list-none">
              {d.route.map((r, i) => (
                <li
                  key={r.place}
                  className="flex gap-4 items-baseline py-3.5 border-b border-brand-text/[0.07] last:border-0"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/10 text-brand-accent text-[13px] font-bold flex items-center justify-center translate-y-1">
                    {i + 1}
                  </span>
                  <span style={lora}>
                    <span className="block text-[16.5px] font-semibold text-brand-text">{r.place}</span>
                    <span className="block text-[15px] text-brand-text/70">{r.story}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Reviews - platform rating chips + the paper-card carousel. */}
      {d.reviews && d.reviews.length > 0 && (
        <section className="section-padding bg-brand-bg">
          <div className="brand-container flex flex-col items-center text-center">
            <SplitHeading plain="What guests" script="say." />
            <div
              className="-mt-2 mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] text-brand-text/80"
              style={lora}
            >
              <a
                href={googleReviewStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-semibold">{googleReviewStats.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({googleReviewStats.count} Google reviews)
                </span>
              </a>
              <a
                href={tripAdvisorStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-semibold">{tripAdvisorStats.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({tripAdvisorStats.count} TripAdvisor reviews)
                </span>
              </a>
            </div>
            <p className="text-[15px] text-muted-foreground -mt-2 mb-2 max-w-md" style={lora}>
              This walk is new, so these are real reviews of {d.guide ? d.guide.name : "the guide"} from our tours.
            </p>
            <GuideReviews reviews={d.reviews} layout="grid" />
          </div>
        </section>
      )}

      {/* Meet your guide - Watermelon-style expandable profile card
          (photo card, tap to open the guide's own words). */}
      {d.guide && (
        <section className="section-padding" style={{ backgroundColor: "#F5EBDA" }}>
          <div className="brand-container grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-center">
            <div className="flex justify-center lg:justify-start">
              <GuideProfileCard
                name={d.guide.name}
                image={d.guide.image}
                focal={d.guide.focal}
                eyebrow="Your guide"
                blurb={d.guide.blurb}
                handle={d.guide.handle}
              />
            </div>
            <div>
              <SplitHeading plain="Your guide," script={d.guide.name + "."} />
              <p className="text-[17px] text-brand-text/80 leading-relaxed max-w-[55ch]" style={lora}>
                &ldquo;{d.guide.blurb}&rdquo;
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQs - same accordion as the homepage, this tour's questions.
          No FAQPage schema here while the page is a noindex prototype. */}
      <FAQ
        items={d.faqs.filter((f) => ready(f.q) && ready(f.a))}
        emitSchema={false}
        customHeading={
          <h2 className="leading-[1.0]">
            <span
              className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text"
              style={lora}
            >
              Asked
            </span>{" "}
            <span
              className="inline text-[clamp(40px,4.8vw,60px)] font-semibold leading-[0.95] text-brand-accent"
              style={caveat}
            >
              every time.
            </span>
          </h2>
        }
      />

      {/* Cross-sell - hand the not-sold browser the next thing
          before the page runs out. Compact cards: the free tour plus
          the next tour that is not this one. */}
      <section className="section-padding bg-white border-t border-brand-accent/10">
        <div className="brand-container">
          <SplitHeading plain="Not your kind of" script="walk?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {[
              tours.find((t) => t.slug === "free-walking-tour"),
              // Live tours only: never cross-sell a placeholder product.
              tours.find(
                (t) =>
                  t.status === "live" &&
                  t.slug !== "free-walking-tour" &&
                  t.slug !== tour.slug
              ),
            ]
              .filter((t): t is NonNullable<typeof t> => Boolean(t))
              .map((t) => (
                <a
                  key={t.slug}
                  href={t.ctaHref === "#notify" ? `/tours#notify` : t.ctaHref}
                  className="group flex gap-4 items-center bg-brand-bg rounded-2xl border border-brand-text/[0.07] p-4 hover:border-brand-accent/40 hover:shadow-md transition-all duration-150"
                >
                  <span
                    className="relative shrink-0 w-24 h-20 rounded-xl overflow-hidden"
                    style={{ backgroundColor: t.tint }}
                  >
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[17px] font-bold text-brand-text leading-snug" style={lora}>
                      {t.name}
                    </span>
                    <span className="block text-[13px] text-muted-foreground mt-0.5" style={lora}>
                      {t.meta.join(" · ")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-brand-accent mt-1.5 group-hover:underline" style={lora}>
                      {t.priceLine}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              ))}
          </div>
        </div>
      </section>

      <div id="notify" className="scroll-mt-28">
        {d.bookingTour ? (
          <EmailCapture tourInterest={tour.slug} />
        ) : (
          <EmailCapture
            eyebrow={tour.name}
            heading="Hear when dates open"
            body="Leave your email and you get first pick of the dates before they go on the site. Plus the odd local tip. No spam."
            tourInterest={tour.slug}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
