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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is a free walking tour?",
  description:
    "How free walking tours work, what guests usually tip, and what to expect on the Norwich Free Walking Tour.",
  mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
  publisher: {
    "@type": "Organization",
    name: "Norwich Free Walking Tours",
    logo: {
      "@type": "ImageObject",
      url: "https://www.norwichfreewalkingtours.co.uk/logo.png",
    },
  },
};

export default function WhatIsAFreeTourPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
