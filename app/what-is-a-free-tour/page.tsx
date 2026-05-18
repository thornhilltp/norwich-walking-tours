import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { WhatIsFreeTour } from "@/components/WhatIsFreeTour";
import { HowItWorks } from "@/components/HowItWorks";
import { TipAnchor } from "@/components/TipAnchor";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";

const CANONICAL = "https://www.norwichfreewalkingtours.co.uk/what-is-a-free-tour";

export const metadata: Metadata = {
  title: "What is a free walking tour? | Norwich Free Walking Tours",
  description:
    "Free walking tours explained: you join for free, walk for 1h 45m with a local guide, and tip £10-£20 at the end if you enjoyed it. No fixed price, no pressure.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "What is a free walking tour?",
    description:
      "How free walking tours work, what guests usually tip, and what to expect on the Norwich Free Walking Tour.",
    url: CANONICAL,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a free walking tour?",
    description:
      "Free walking tours explained: join for free, tip what it was worth at the end.",
    images: ["/og-image.jpg"],
  },
};

const PUBLISHED = "2026-05-15";
// Bump dateModified when the substantive content of this page changes.
const MODIFIED = "2026-05-18";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is a free walking tour?",
  description:
    "How free walking tours work, what guests usually tip, and what to expect on the Norwich Free Walking Tour.",
  mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: {
    "@type": "Person",
    name: "Tom Thornhill",
    url: "https://www.norwichfreewalkingtours.co.uk/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Norwich Free Walking Tours",
    logo: {
      "@type": "ImageObject",
      url: "https://www.norwichfreewalkingtours.co.uk/logo.png",
    },
  },
};

// FAQPage schema — gives Google rich-result eligibility for the
// 'what is a free walking tour' informational query cluster.
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a free walking tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A free walking tour is a guided city walk you can book without paying upfront. The guide leads the route, tells the stories, and at the end you tip what you thought it was worth. There is no fixed price. If the tour wasn't worth it, you don't pay.",
      },
    },
    {
      "@type": "Question",
      name: "Is a free walking tour really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. There is nothing to pay to reserve a spot and no card needed at booking. At the end of the tour you decide what to tip. Most guests on the Norwich Free Walking Tour tip £10 to £20 per person, but anywhere from £0 upwards is accepted.",
      },
    },
    {
      "@type": "Question",
      name: "How much should I tip a free walking tour guide in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No fixed amount. On a good day, guests tip £10 to £20 per person. Some pay less, some pay more, some pay nothing. All are accepted. Guides who run free walking tours full time rely on tips as their income, so a fair tip if you enjoyed the walk goes a long way.",
      },
    },
    {
      "@type": "Question",
      name: "What happens on a free walking tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the Norwich Free Walking Tour: you book a spot online (free, no card needed), meet your guide outside The Forum at the booked time, walk for 1 hour 45 minutes at a relaxed pace through 12 stops finishing near Norwich Cathedral, and tip what you thought it was worth at the end. Card, Apple Pay, Google Pay or cash all work.",
      },
    },
    {
      "@type": "Question",
      name: "Who runs free walking tours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Local guides who live in the city. The Norwich Free Walking Tour is run by Tom Thornhill, a Norwich resident who walks the route most days. The model lets visitors see a city the way someone who lives there sees it, without committing to a fixed price up front.",
      },
    },
  ],
};

export default function WhatIsAFreeTourPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <main className="bg-brand-bg">
        {/* Page intro */}
        <section className="section-padding bg-brand-bg">
          <div className="brand-container max-w-3xl mx-auto text-center">
            <p
              className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              The free-tour model
            </p>
            <h1 className="font-caveat text-5xl md:text-6xl font-bold text-brand-text mb-5 leading-tight">
              What is a free walking tour?
            </h1>
            <p
              className="text-lg text-muted-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              You join for free. You walk for 1 hour 45 minutes with a local guide. At the end, you tip what you thought it was worth. That&apos;s the whole model.
            </p>
          </div>
        </section>

        <WhatIsFreeTour />
        <HowItWorks />
        <TipAnchor />

        {/* CTA + FAQ link */}
        <section className="section-padding bg-brand-bg border-t border-brand-accent/10">
          <div className="brand-container max-w-2xl mx-auto text-center">
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-5">
              Ready to book?
            </h2>
            <p
              className="text-lg text-muted-foreground leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              £0 to reserve. No card needed. Free to cancel if your plans change.
            </p>
            <TrackedBookLink
              location="what_is_a_free_tour"
              className="btn-cta inline-flex items-center justify-center gap-2 px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
            >
              Book your spot (free)
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </TrackedBookLink>
            <p
              className="mt-8 text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Got more questions?{" "}
              <a
                href="/#faq"
                className="text-brand-accent hover:underline font-semibold"
              >
                See the full FAQ &rarr;
              </a>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
