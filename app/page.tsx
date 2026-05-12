import Image from "next/image";
import { MapPin, Clock, Calendar, Footprints, Shirt, Globe } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PhotoShowcase } from "@/components/PhotoShowcase";
import { StoriesTeaser } from "@/components/StoriesTeaser";
import { HowItWorks } from "@/components/HowItWorks";
import { TourStops } from "@/components/TourStops";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { BookingFrame } from "@/components/BookingFrame";
import { Testimonials } from "@/components/Testimonials";
import { googleReviews, googleReviewStats } from "@/lib/testimonials";

// ── Logistics data (shared with tour page) ────────────────────────────────────
const logistics = [
  {
    icon: MapPin,
    label: "Meeting point",
    value: "Outside The Forum, Millennium Plain, Norwich NR2 1TF. Check your email for details of your guide.",
  },
  {
    icon: Clock,
    label: "Duration",
    value: "1 hour 45 minutes, finishing near the Cathedral.",
  },
  {
    icon: Calendar,
    label: "Schedule",
    value: "Near daily, rain or shine. Booking required. Secure your spot on the booking page.",
  },
  {
    icon: Globe,
    label: "Language",
    value: "English.",
  },
  {
    icon: Footprints,
    label: "Pace",
    value: "Relaxed throughout. Mostly flat, easy underfoot. Suitable for all ages.",
  },
  {
    icon: Shirt,
    label: "What to wear",
    value: "Comfortable shoes and a light jacket. There's natural shelter along the route if it rains.",
  },
];

// ── Tour Stops + Map (combined side-by-side) ─────────────────────────────────
function StopsAndMap() {
  return (
    <section id="tour-map" className="section-padding bg-brand-bg">
      <div className="brand-container">
        <div className="text-center mb-10">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            The route
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold">
            12 stops. 1h 45m.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Stops list */}
          <div>
            <TourStops hideHeader />
          </div>
          {/* Route map — framed card */}
          <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <p className="font-caveat text-xl font-bold text-brand-text">Map of the Route</p>
            </div>
            <Image
              src="/images/route-map.png"
              alt="Hand-drawn route map of the Norwich Free Walking Tours showing all 12 stops from The Forum to Norwich Cathedral."
              width={1500}
              height={1155}
              className="w-full h-auto"
            />
            <p className="px-4 py-2 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Map of Norwich City Centre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What's a Free Tour? ───────────────────────────────────────────────────────
function WhatIsFreeTour() {
  return (
    <section className="section-padding bg-brand-accent-light">
      <div className="brand-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              How free tours work
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-5 leading-tight">
              What&apos;s a free tour?
            </h2>
            <div className="space-y-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              <p className="text-lg text-brand-text leading-relaxed" style={{ fontWeight: 700 }}>
                Free tours are a growing accessible way to get a great local introduction to a city.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You join for free, spend 1 hour 45 minutes with a local guide who will show you the best spots and tell their favourite stories, and at the end you pay what you thought it was worth.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                No fixed price.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                No pressure.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Just a fair exchange.
              </p>
            </div>
          </div>
          {/* Photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/tour/what-is-free-tour.jpg"
              alt="Visitors joining the Norwich Free Walking Tour and exploring the city with a local guide."
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Practical Info ────────────────────────────────────────────────────────────
function PracticalInfo() {
  return (
    <section className="section-padding bg-brand-bg border-t border-brand-accent/10">
      <div className="brand-container max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Practical info
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold">
            Everything you need to know
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {logistics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white rounded-xl p-6 border border-brand-accent/12 shadow-sm flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-text mb-1" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <TrackedBookLink
            location="practical_info"
            className="btn-cta inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
          >
            Book your spot (free)
          </TrackedBookLink>
          <p className="text-sm text-muted-foreground mt-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Booking required &bull; Free to book &bull; Near daily from The Forum
          </p>
          <p className="text-sm text-muted-foreground mt-5" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Travelling as a group?{" "}
            <a href="/private-tours" className="text-brand-accent hover:underline font-semibold">
              See private tours &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Local guides teaser ───────────────────────────────────────────────────────
// Surfaces the content hub (/explore + /things-to-do/free) so SEO content pages
// have a discovery path from the homepage. Top nav stays conversion-focused.
function LocalGuidesTeaser() {
  const guides = [
    {
      href: "/things-to-do/free",
      title: "Free things to do in Norwich",
      blurb: "Ten things a local would actually recommend.",
    },
    {
      href: "/explore/where-to-stay-norwich",
      title: "Where to stay in Norwich",
      blurb: "Five neighbourhoods, who each one suits, walking time to The Forum.",
    },
    {
      href: "/explore",
      title: "More Norwich guides",
      blurb: "Walks, weekends, pubs, rainy days. The full hub.",
    },
  ];
  return (
    <section className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
      <div className="brand-container max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Local guides
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
            Norwich, told by someone who walks it for a living.
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {guides.map((g) => (
            <li key={g.href}>
              <a
                href={g.href}
                className="group block bg-white rounded-2xl p-6 border border-brand-accent/10 shadow-sm hover:border-brand-accent/30 hover:shadow-md transition-all duration-200 h-full"
              >
                <h3 className="font-caveat text-2xl font-bold text-brand-text mb-2 group-hover:text-brand-accent transition-colors duration-150">
                  {g.title}
                </h3>
                <p className="font-lora text-sm text-muted-foreground leading-relaxed">
                  {g.blurb}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-accent">
                  Read &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-brand-bg" style={{ paddingTop: 0 }}>
      <Hero
        title={<>Norwich Free Walking Tours</>}
        buttonText="Book your spot (free)"
        buttonHref="/book"
        widget={<BookingFrame height={520} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />}
      />
      <PhotoShowcase />
      <WhatIsFreeTour />
      <Testimonials
        testimonials={googleReviews}
        subtitle="What guests say about the Norwich walking tour and the local tips that come with it."
        rating={googleReviewStats.rating}
        count={googleReviewStats.count}
        profileUrl={googleReviewStats.profileUrl}
      />
      <StoriesTeaser />
      <StopsAndMap />
      <HowItWorks />
      <PracticalInfo />
      <LocalGuidesTeaser />
      <FAQ />
      <EmailCapture />
      <Footer />
    </main>
  );
}
