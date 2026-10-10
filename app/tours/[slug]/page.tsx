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
import { MurderBoard, bandFrame } from "@/app/tours/_components/MurderBoard";
import { NightSkyline, Fog, MoonDivider, Lantern, TornEdge } from "@/app/tours/_components/Spooky";
import { googleReviewStats, tripAdvisorStats } from "@/lib/testimonials";
import { tours } from "@/lib/tours";
import { Eater } from "next/font/google";

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

// Rebuild daily so past dates drop out of the Event data.
export const revalidate = 86400;

// UK offset for a date: BST (+01:00) from the last Sunday of March to the
// last Sunday of October, otherwise GMT. Good enough for event times.
function ukOffset(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const lastSunday = (month: number) => {
    const end = new Date(Date.UTC(y, month, 0));
    return end.getUTCDate() - end.getUTCDay();
  };
  if (m > 3 && m < 10) return "+01:00";
  if (m === 3) return d >= lastSunday(3) ? "+01:00" : "+00:00";
  if (m === 10) return d < lastSunday(10) ? "+01:00" : "+00:00";
  return "+00:00";
}

function eventDates(first: string, last: string): string[] {
  const out: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  for (let t = Date.parse(first + "T12:00:00Z"); t <= Date.parse(last + "T12:00:00Z"); t += 86400000) {
    const ymd = new Date(t).toISOString().slice(0, 10);
    if (ymd >= today) out.push(ymd);
  }
  return out;
}

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

// Halloween display face for tours that opt in (scriptFont: "eater").
// Only the green script words in headings; body copy stays Lora.
const eater = Eater({ weight: "400", subsets: ["latin"], display: "swap" });
const eaterStyle = { fontFamily: eater.style.fontFamily, fontWeight: 400 } as const;

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

function SplitHeading({
  plain,
  script,
  scriptStyle = caveat,
}: {
  plain: string;
  script: string;
  scriptStyle?: React.CSSProperties;
}) {
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
        style={scriptStyle}
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
  const script = d.scriptFont === "eater" ? eaterStyle : caveat;

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
      {live && d.schedule && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              (d.schedule.dates
                ? d.schedule.dates.filter((x) => x >= new Date().toISOString().slice(0, 10))
                : eventDates(d.schedule.first, d.schedule.last)
              ).map((ymd) => {
                const s = d.schedule!;
                const off = ukOffset(ymd);
                const [hh, mm] = s.time.split(":").map(Number);
                const endMin = hh * 60 + mm + s.durationMin;
                const end = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;
                return {
                  "@context": "https://schema.org",
                  "@type": "Event",
                  name: tour.name,
                  description: d.seoDescription ?? d.promise,
                  startDate: `${ymd}T${s.time}:00${off}`,
                  endDate: `${ymd}T${end}:00${off}`,
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                  location: {
                    "@type": "Place",
                    name: s.place.name,
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: s.place.street,
                      addressLocality: "Norwich",
                      postalCode: s.place.postcode,
                      addressCountry: "GB",
                    },
                  },
                  image: [`${BASE}${tour.image}`],
                  organizer: {
                    "@type": "Organization",
                    name: "Norwich Free Walking Tours",
                    url: BASE,
                  },
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                    url: `${BASE}/tours/${tour.slug}`,
                    validFrom: "2026-10-01",
                  },
                };
              })
            ),
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
        <div className="absolute inset-0 bg-black/50" />
        {d.murderBoard && <NightSkyline />}

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
                style={{ ...script, color: "#5AE19E" }}
              >
                {d.heroTitle[1]}
              </span>
            </h1>

            <p
              className="mt-5 max-w-md mx-auto lg:mx-0 text-lg md:text-xl text-white leading-snug"
              style={{ ...lora, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {d.promise}
            </p>
            {d.promiseSub && (
              <p
                className="mt-3 max-w-md mx-auto lg:mx-0 text-[15px] md:text-base italic text-white leading-snug"
                style={{ ...lora, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
              >
                {d.promiseSub}
              </p>
            )}

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
                className="italic text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                style={{ ...lora, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
              >
                or see our free walking tour
              </a>
            </div>

            <div
              className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm text-white"
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
                    <span className="text-white">({googleReviewStats.count} reviews)</span>
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
            {/* Same price note as the homepage hero, free tours only. */}
            {tour.priceLine.startsWith("Free") && (
              <p
                className="mt-2 text-xs text-white leading-relaxed text-center lg:text-left"
                style={lora}
              >
                £0 to book &bull;{" "}
                <a
                  href="/what-is-a-free-tour"
                  className="underline underline-offset-2 decoration-white/50 hover:decoration-white"
                >
                  Tip cash or card
                </a>{" "}
                at the end, usually £10 to £20
              </p>
            )}
          </div>

          {/* Widget slot - the booking iframe drops in here when the
              tour is bookable. Until then, the waiting-list signup itself. */}
          {d.bookingTour ? (
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div
                id="book"
                className="scroll-mt-28 bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <BookingFrame
                  tour={d.bookingTour}
                  priority
                  height={520}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <PartnerLogosInverted size="sm" label="Featured on" />
              </div>
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
      <div
        className="relative z-10 -mt-10 md:-mt-12"
        style={
          d.framedBand
            ? { background: "linear-gradient(to bottom, transparent 0, transparent 3rem, #121211 3rem)" }
            : undefined
        }
      >
        <div className="brand-container">
          {/* Facts (Tom): Time / How long / Start / Finish / Price.
              Each reads as two lines - small label over a bold value. */}
          <dl
            className={`${
              d.framedBand
                ? bandFrame.band
                : "bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(26,26,26,0.25)] border border-brand-text/[0.05]"
            } px-6 py-6 md:px-10 md:py-7 grid grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-x-8 gap-y-5`}
          >

            {d.logistics
              .filter((row) =>
                ["When", "Time", "How long", "Route", "Start", "Finish", "Price"].includes(row.label) &&
                ready(row.value)
              )
              .map((row) => (
                <div key={row.label}>
                  <dt
                    className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-accent mb-1"
                    style={d.framedBand ? { ...lora, color: "#5AE19E" } : lora}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className={`text-[17px] md:text-[18px] font-bold m-0 leading-snug ${d.framedBand ? "text-white" : "text-brand-text"}`}
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
      {!d.darkStories && d.highlightCards && d.highlightCards.length > 0 && (
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
                style={script}
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

      {/* Dark-tour sections. darkVariant picks where black appears:
          (none) all cream | a: black "Dare you walk it" + guides |
          b: black stories | c: black story cards + black Dare + guides. */}
      {(() => {
        const v = d.darkVariant;
        const storiesDark = v === "b";
        const cardsDark = v === "c";
        const dareDark = v === "a" || v === "c" || Boolean(d.murderBoard);
        const guidesDark = v === "a" || v === "c" || Boolean(d.murderBoard);
        const BLACK = "#121211";
        // Tom 2026-10-11: "Dare you walk it" goes blood red with torn edges.
        const BLOOD = "#2A0C0C";
        const RED = "#FF8F8F";
        const blood = Boolean(d.murderBoard) && dareDark;
        const ink = (dark: boolean) => (dark ? "text-white" : "text-brand-text");
        const body = (dark: boolean) => (dark ? "text-white" : "text-brand-text/80");
        const accent = (dark: boolean) => (dark ? { color: "#5AE19E" } : undefined);
        return (
          <>
            {d.darkStories && d.darkStories.length > 0 && (
              <section
                className={`relative overflow-hidden py-20 md:py-28 ${storiesDark ? "" : "bg-brand-bg"}`}
                style={storiesDark ? { backgroundColor: BLACK } : undefined}
              >
                {d.murderBoard && storiesDark && <Lantern word="MURDER" fontFamily={script.fontFamily} />}
                <div className="relative brand-container">
                  <h2 className="text-center leading-[1.0] mb-14 md:mb-16">
                    <span
                      className={`inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] ${ink(storiesDark)}`}
                      style={lora}
                    >
                      Norwich&apos;s darkest
                    </span>{" "}
                    <span
                      className="inline text-[clamp(40px,4.8vw,60px)] leading-[0.95] text-brand-accent"
                      style={{ ...script, ...accent(storiesDark) }}
                    >
                      secrets.
                    </span>
                  </h2>
                  {cardsDark ? (
                    <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {d.darkStories.map((st) => (
                        <li
                          key={st.title}
                          className="overflow-hidden rounded-2xl shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]"
                          style={{ backgroundColor: BLACK }}
                        >
                          <div className="relative aspect-[4/3]">
                            <Image src={st.img} alt={st.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-[28px] leading-[1.05] mb-3" style={{ ...script, color: "#5AE19E" }}>
                              {st.title}
                            </h3>
                            <p className="text-[16.5px] text-white leading-relaxed m-0" style={lora}>
                              {st.text}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ol className="m-0 p-0 list-none flex flex-col gap-10 md:gap-14 max-w-5xl mx-auto">
                      {d.darkStories.map((st, i) => (
                        <li
                          key={st.title}
                          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center ${
                            i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                          }`}
                        >
                          <div
                            className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                              storiesDark
                                ? "ring-1 ring-white/10"
                                : "shadow-[0_14px_30px_-16px_rgba(26,26,26,0.55)]"
                            }`}
                          >
                            <Image src={st.img} alt={st.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                          </div>
                          <div>
                            <h3
                              className="text-[clamp(30px,3.4vw,44px)] leading-[1.05] mb-4 text-brand-accent"
                              style={{ ...script, ...accent(storiesDark) }}
                            >
                              {st.title}
                            </h3>
                            <p className={`text-[18px] md:text-[19px] leading-relaxed m-0 ${body(storiesDark)}`} style={lora}>
                              {st.text}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </section>
            )}

            {d.murderBoard && !blood && <MoonDivider />}
            {d.nightBeats && d.nightBeats.length > 0 && (
              <section
                className={`relative py-20 md:py-24 ${dareDark ? "" : "bg-white border-y border-brand-accent/10"}`}
                style={dareDark ? { backgroundColor: blood ? BLOOD : BLACK } : undefined}
              >
                {blood && <TornEdge fill={BLACK} at="top" />}
                {blood && <TornEdge fill={BLACK} at="bottom" />}
                <div className="relative z-[2] brand-container max-w-5xl">
                  <h2 className="text-center leading-[1.0] mb-12 md:mb-14">
                    <span
                      className={`inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] ${ink(dareDark)}`}
                      style={lora}
                    >
                      Dare you
                    </span>{" "}
                    <span
                      className="inline text-[clamp(40px,4.8vw,60px)] leading-[0.95] text-brand-accent"
                      style={{ ...script, ...(blood ? { color: RED } : accent(dareDark)) }}
                    >
                      walk it?
                    </span>
                  </h2>
                  <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {d.nightBeats.map((b) => (
                      <li
                        key={b.title}
                        className="border-t-2 border-brand-accent pt-5"
                        style={blood ? { borderColor: RED } : undefined}
                      >
                        <p
                          className="text-[13px] uppercase tracking-[0.18em] font-semibold text-brand-accent mb-2"
                          style={{ ...lora, ...(blood ? { color: RED } : accent(dareDark)) }}
                        >
                          {b.when}
                        </p>
                        <h3 className={`text-[24px] leading-tight mb-3 ${ink(dareDark)}`} style={script}>
                          {b.title}
                        </h3>
                        <p className={`text-[17px] leading-relaxed m-0 ${body(dareDark)}`} style={lora}>
                          {b.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-14 flex flex-col items-center gap-4 text-center">
                    <p
                      className={`inline-flex flex-wrap justify-center gap-x-3 px-5 py-2 rounded-full text-[15px] font-semibold ${
                        dareDark ? "bg-white text-brand-text" : "bg-brand-text text-white"
                      }`}
                      style={lora}
                    >
                      <span>Most evenings, 16 Oct to 6 Nov</span>
                    </p>
                    <a
                      href={d.bookingTour ? "#book" : "#notify"}
                      className="btn-cta inline-flex items-center justify-center h-12 px-8 text-lg bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
                    >
                      {d.bookingTour ? "Book your free spot" : "Join the waiting list"}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </section>
            )}

            {d.murderBoard && !blood && <MoonDivider />}
            {d.storytellers && d.storytellers.length > 0 && (
              <section
                className={`relative overflow-hidden py-20 md:py-24 ${guidesDark ? "" : "bg-brand-bg"}`}
                style={guidesDark ? { backgroundColor: BLACK, borderTop: "1px solid rgba(255,255,255,0.08)" } : undefined}
              >
                {d.murderBoard && <Fog />}
                <div className="relative brand-container max-w-4xl text-center">
                  <h2 className="leading-[1.0] mb-4">
                    <span
                      className={`inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] ${ink(guidesDark)}`}
                      style={lora}
                    >
                      Your
                    </span>{" "}
                    <span
                      className="inline text-[clamp(40px,4.8vw,60px)] leading-[0.95] text-brand-accent"
                      style={{ ...script, ...accent(guidesDark) }}
                    >
                      storytellers.
                    </span>
                  </h2>
                  {d.storytellersLine ? (
                    <p className={`text-[17px] leading-relaxed max-w-xl mx-auto mb-12 ${body(guidesDark)}`} style={lora}>
                      {d.storytellersLine}
                    </p>
                  ) : (
                    <div className="mb-12" />
                  )}
                  {d.murderBoard ? (
                    <MurderBoard guides={d.storytellers} scriptStyle={script} />
                  ) : (
                  <ul className="m-0 p-0 list-none flex flex-wrap justify-center gap-10">
                    {d.storytellers.map((g) => (
                      <li key={g.name} className="flex flex-col items-center">
                        <div
                          className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ${
                            guidesDark ? "ring-2 ring-[#5AE19E]" : "ring-4 ring-white shadow-lg"
                          }`}
                        >
                          <Image
                            src={g.img}
                            alt={`Portrait of ${g.name}`}
                            fill
                            className="object-cover"
                            style={{ objectPosition: g.focal ?? "50% 25%" }}
                            sizes="192px"
                          />
                        </div>
                        <p className="mt-4 text-[34px] leading-none text-brand-accent" style={{ ...script, ...accent(guidesDark) }}>
                          {g.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                  )}
                  <a
                    href="/our-guides"
                    className={`inline-block mt-10 italic underline underline-offset-4 ${
                      guidesDark ? "text-white decoration-white/40 hover:decoration-white" : "text-brand-text/80 decoration-brand-text/30 hover:decoration-brand-text"
                    }`}
                    style={lora}
                  >
                    Meet all our guides
                  </a>
                </div>
              </section>
            )}
          </>
        );
      })()}

      {/* Story — polaroid left, copy right, homepage showcase language. */}
      {!d.darkStories && (
      <section className="section-padding bg-white border-b border-brand-accent/10">
        <div className="brand-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <PhotoSwipe photos={d.gallery ?? []} />

          <div>
            <SplitHeading plain="What this" script="walk is." scriptStyle={script} />
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
      )}

      {/* The walk - the homepage ThemedRouteSection itself: wiggly
          thread, pin drops, mobile accordion, sticky map. Placeholder
          map until the tour has its own. */}
      {!d.darkStories && d.walk && d.walk.length > 0 && (
        <ThemedRouteSection
          id="walk"
          heading={{ plain: "The walk, and", script: "what you get." }}
          scriptStyle={d.scriptFont === "eater" ? eaterStyle : undefined}
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
            <SplitHeading plain="Stop by" script="stop." scriptStyle={script} />
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
            <SplitHeading plain="What guests" script="say." scriptStyle={script} />
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
              <SplitHeading plain="Your guide," script={d.guide.name + "."} scriptStyle={script} />
              <p className="text-[17px] text-brand-text/80 leading-relaxed max-w-[55ch]" style={lora}>
                &ldquo;{d.guide.blurb}&rdquo;
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQs - same accordion as the homepage, this tour's questions.
          No FAQPage schema here while the page is a noindex prototype. */}
      {d.murderBoard && <MoonDivider />}
      <FAQ
        dark={Boolean(d.murderBoard)}
        items={d.faqs.filter((f) => ready(f.q) && ready(f.a))}
        emitSchema={false}
        customHeading={
          d.murderBoard ? (
            <h2 className="leading-[1.0]">
              <span
                className="inline text-[clamp(40px,4.8vw,60px)] leading-[0.95] text-brand-accent"
                style={{ ...script, color: "#5AE19E" }}
              >
                Questions?
              </span>
            </h2>
          ) : (
          <h2 className="leading-[1.0]">
            <span
              className={`inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] ${d.murderBoard ? "text-white" : "text-brand-text"}`}
              style={lora}
            >
              Asked
            </span>{" "}
            <span
              className="inline text-[clamp(40px,4.8vw,60px)] font-semibold leading-[0.95] text-brand-accent"
              style={script}
            >
              every time.
            </span>
          </h2>
          )
        }
      />

      {/* Cross-sell - hand the not-sold browser the next thing
          before the page runs out. Compact cards: the free tour plus
          the next tour that is not this one. */}
      {!d.darkStories && (
      <section className="section-padding bg-white border-t border-brand-accent/10">
        <div className="brand-container">
          <SplitHeading plain="Not your kind of" script="walk?" scriptStyle={script} />
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
      )}

      <div id="notify" className="scroll-mt-28">
        {d.bookingTour ? (
          <EmailCapture tourInterest={tour.slug} darkSection={Boolean(d.murderBoard)} />
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
