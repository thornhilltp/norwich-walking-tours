import Image from "next/image";
import { MapPin, Clock, Calendar, Footprints, Shirt, Globe } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PhotoShowcase } from "@/components/PhotoShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { TipAnchor } from "@/components/TipAnchor";
import { TourStops } from "@/components/TourStops";
import { WhyNorwich } from "@/components/WhyNorwich";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { BookingFrame } from "@/components/BookingFrame";

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
            11 stops. 1h 45m.
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
              alt="Norwich Free Walking Tour route map showing all 11 stops"
              width={1200}
              height={900}
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Free tours are a growing accessible way to get a great local introduction to a city. You join for free, spend 1h 45m with a local guide who will show you the best spots and tell their favourite stories, and at the end you pay what you thought it was worth.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              No fixed price. No pressure. Just a fair exchange.
            </p>
          </div>
          {/* Photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/norwich-lane-stock.png"
              alt="The Norwich Lanes — independent shops, cafés and hidden courtyards in Norwich city centre"
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
            Book your spot
          </TrackedBookLink>
          <p className="text-sm text-muted-foreground mt-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Booking required &bull; Free to book &bull; Near daily from The Forum
          </p>
        </div>
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
        buttonText="Book your spot"
        buttonHref="/book"
        widget={<BookingFrame height={520} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />}
      />
      <PhotoShowcase />
      <WhatIsFreeTour />
      <StopsAndMap />
      <HowItWorks />
      <TipAnchor />
      <PracticalInfo />
      <FAQ />
      <WhyNorwich />
      <EmailCapture />
      <Footer />
    </main>
  );
}
