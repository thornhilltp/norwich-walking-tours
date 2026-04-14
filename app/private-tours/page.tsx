import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Users, Clock, MapPin, Star, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Private Tours | Norwich Free Walking Tours",
  description:
    "Book a private walking tour of Norwich for your group. Bespoke routes, flexible timings, and a dedicated guide. Perfect for corporate visits, families, and special occasions.",
};

const included = [
  "Dedicated private guide throughout",
  "Bespoke route tailored to your group",
  "Flexible start time to suit you",
  "Any group size from 2 to 30+",
  "Indoor shelter options if it rains",
  "Post-tour recommendations for food and drink",
];

const occasions = [
  {
    icon: Users,
    title: "Corporate & Team Days",
    body: "An engaging way to welcome new colleagues or entertain clients. We tailor the stories to your industry where it fits.",
  },
  {
    icon: Star,
    title: "Celebrations",
    body: "Birthdays, hen and stag parties, anniversaries. We know the best spots for a group photo and the best pubs to finish in.",
  },
  {
    icon: MapPin,
    title: "Family Visits",
    body: "Travelling with children or older relatives? We set the pace to suit your group and pick stories that land with all ages.",
  },
  {
    icon: Clock,
    title: "School & Education",
    body: "Curriculum-linked tours for school groups. Norwich has 900 years of history to draw from. We make it stick.",
  },
];

const options = [
  {
    duration: "1 Hour",
    stops: "5 key stops",
    ideal: "Corporate lunch breaks, short visits",
  },
  {
    duration: "2 Hours",
    stops: "8 stops + deeper stories",
    ideal: "Most groups, the sweet spot",
  },
  {
    duration: "Half Day",
    stops: "Full route + hidden extras",
    ideal: "Special occasions, enthusiasts",
  },
];

export default function PrivateToursPage() {
  return (
    <main className="bg-brand-bg pt-16">
      {/* Hero */}
      <section
        className="relative section-padding"
        style={{
          backgroundImage: "url('/images/the-arcade-stock.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative brand-container max-w-3xl mx-auto text-center">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Private tours
          </p>
          <h1 className="font-caveat text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Your own private guide to Norwich.
          </h1>
          <p className="font-lora text-lg text-white/80 leading-relaxed mb-8">
            The same local knowledge. The same hidden city. Built entirely around your group, your pace, and your interests.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 bg-brand-accent text-white font-lora font-semibold text-base rounded-xl hover:bg-brand-accent/90 transition-colors duration-150"
          >
            Enquire about a private tour
          </a>
        </div>
      </section>

      {/* What's included */}
      <section className="section-padding bg-brand-bg">
        <div className="brand-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
                What&apos;s included
              </p>
              <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-6">
                Everything handled. Nothing left to chance.
              </h2>
              <p className="font-lora text-muted-foreground text-lg leading-relaxed">
                A private tour isn&apos;t just the free tour with fewer people. It&apos;s a completely different experience, built around you from the start.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-lora text-brand-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="section-padding bg-brand-accent-light">
        <div className="brand-container">
          <div className="text-center mb-12">
            <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Who it&apos;s for
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
              Any group. Any occasion.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {occasions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-brand-accent/10 shadow-sm flex gap-4"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-caveat text-2xl font-bold text-brand-text mb-2">
                      {item.title}
                    </h3>
                    <p className="font-lora text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tour options */}
      <section className="section-padding bg-brand-bg">
        <div className="brand-container">
          <div className="text-center mb-12">
            <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Tour options
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
              Pick your duration.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {options.map((opt, i) => (
              <div
                key={opt.duration}
                className={`rounded-2xl p-7 border text-center ${
                  i === 1
                    ? "bg-brand-accent text-white border-brand-accent shadow-lg"
                    : "bg-white border-brand-accent/10 shadow-sm"
                }`}
              >
                <p
                  className={`font-caveat text-3xl font-bold mb-2 ${
                    i === 1 ? "text-white" : "text-brand-text"
                  }`}
                >
                  {opt.duration}
                </p>
                <p
                  className={`font-lora text-sm font-semibold mb-3 ${
                    i === 1 ? "text-white/90" : "text-brand-accent"
                  }`}
                >
                  {opt.stops}
                </p>
                <p
                  className={`font-lora text-sm ${
                    i === 1 ? "text-white/75" : "text-muted-foreground"
                  }`}
                >
                  {opt.ideal}
                </p>
                {i === 1 && (
                  <p className="mt-3 text-xs font-lora font-semibold text-white/90 bg-white/20 rounded-full px-3 py-1 inline-block">
                    Most popular
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-6 font-lora text-sm text-muted-foreground">
            Pricing on enquiry. We&apos;ll match your budget where we can.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-text">
        <div className="brand-container text-center max-w-2xl mx-auto">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-white mb-5">
            Ready to get in touch?
          </h2>
          <p className="font-lora text-white/70 text-lg leading-relaxed mb-8">
            Drop us a message with your group size, preferred date, and any special requirements. We&apos;ll come back to you within 24 hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 bg-brand-accent text-white font-lora font-semibold text-base rounded-xl hover:bg-brand-accent/90 transition-colors duration-150"
          >
            Send us a message
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
