import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowRight, Star } from "lucide-react";
import { googleReviews, googleReviewStats } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "About Tom | Norwich Free Walking Tours",
  description:
    "Meet Tom, the Norwich local who runs the city's only daily free walking tour. 4.9★ on Google, 5.0★ on TripAdvisor, 100% 5-star reviews.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/about",
  },
  openGraph: {
    title: "About Tom | Norwich Free Walking Tours",
    description:
      "Meet Tom, the Norwich local who runs the city's only daily free walking tour.",
    url: "https://www.norwichfreewalkingtours.co.uk/about",
    type: "profile",
    images: [
      {
        url: "/images/tom-portrait.jpg",
        alt: "Tom Thornhill, founder of Norwich Free Walking Tours.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tom | Norwich Free Walking Tours",
    description:
      "Meet Tom, the Norwich local who runs the city's only daily free walking tour.",
    images: ["/images/tom-portrait.jpg"],
  },
};

const SITE_URL = "https://www.norwichfreewalkingtours.co.uk";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#tom`,
  name: "Tom Thornhill",
  jobTitle: "Founder and tour guide",
  description:
    "Norwich-based history graduate and founder of Norwich Free Walking Tours. 4.9 stars on Google, 5.0 on TripAdvisor.",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/tom-portrait.jpg`,
  worksFor: {
    "@id": `${SITE_URL}/#localbusiness`,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of East Anglia",
  },
};

// Tom-specific review excerpts pulled from lib/testimonials.ts. These are
// the reviews where guests mention Tom by name — the most direct
// reassurance for visitors trying to assess 'is Tom legit'.
const tomReviews = googleReviews
  .filter((r) => r.content.toLowerCase().includes("tom"))
  .slice(0, 3);

// Quick stats — 'reassurance metrics' per Crawford's About-page principle.
// Show data that proves competence rather than telling a chronological
// life story.
const stats = [
  { value: "13 yrs", label: "in Norwich" },
  { value: googleReviewStats.rating.toFixed(1) + "★", label: `Google · ${googleReviewStats.count} reviews` },
  { value: "5.0★", label: "TripAdvisor · 9 reviews" },
  { value: "100%", label: "5-star reviews" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="bg-brand-bg pt-16">
        {/* Hero — matches /private-tours pattern: image bg + dark overlay
            + white Caveat H1 + single CTA. */}
        <section
          className="relative section-padding"
          style={{
            backgroundImage: "url('/images/tom-portrait.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative brand-container max-w-3xl mx-auto text-center">
            <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Meet Tom
            </p>
            <h1 className="font-caveat text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Hi, I&apos;m Tom. I run the tour.
            </h1>
            <p className="font-lora text-lg text-white/85 leading-relaxed mb-8">
              Norwich resident, thirteen years and counting. Founder of the city&apos;s only daily free walking tour.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center h-12 px-8 bg-brand-accent text-white font-lora font-semibold text-base rounded-xl hover:bg-brand-accent/90 transition-colors duration-150"
            >
              Book your spot (free)
            </Link>
          </div>
        </section>

        {/* Reassurance metrics — leads with proof rather than story per
            Crawford's About-page principle. Visitor's actual question is
            'is Tom legit' / 'will this be worth my time' — answer that
            first, narrative second. */}
        <section className="section-padding bg-brand-bg">
          <div className="brand-container max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center border border-brand-accent/15 rounded-xl px-4 py-6 bg-white"
                >
                  <p className="font-lora text-3xl md:text-4xl font-bold text-brand-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="font-lora text-xs md:text-sm text-muted-foreground tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What guests say about Tom — Tom-specific review excerpts as
            reassurance. */}
        {tomReviews.length > 0 && (
          <section className="section-padding bg-brand-accent-light/40">
            <div className="brand-container max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
                  What guests say
                </p>
                <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
                  About Tom, in their words.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {tomReviews.map((review) => (
                  <article
                    key={review.id}
                    className="bg-white border border-brand-accent/15 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-brand-accent text-brand-accent"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="font-lora text-[15px] text-brand-text leading-relaxed mb-4">
                      &ldquo;{review.content.split("\n").join(" ")}&rdquo;
                    </p>
                    <p className="font-lora text-sm text-muted-foreground">
                      &mdash; {review.name}, {review.role}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The short story — cut from ~500 words to ~120 per design-
            principles brief. Resume-style chronology dropped; this is now
            the 'why this exists' arc in three paragraphs. */}
        <section className="section-padding bg-brand-bg">
          <article className="brand-container max-w-2xl mx-auto font-lora text-base md:text-lg text-brand-text leading-relaxed space-y-5">
            <p>
              I came to Norwich for the history degree at UEA, thirteen years ago. Never left. My partner is Norwich-born and she&apos;s taught me how the city actually lives. I&apos;ve ended up telling her parts of its history she&apos;d never heard. That gap is part of why I started this.
            </p>
            <p>
              In 2025 we travelled. Free walking tours in every city we visited, every one led by a local who actually loved their place. Coming home, I realised Norwich was the only major UK city without a daily one.
            </p>
            <p>
              So now we have one. Whether you&apos;re visiting for a day or you&apos;ve lived here forty years, I think you&apos;ll hear something about this city you didn&apos;t know.
            </p>
          </article>
        </section>

        {/* Closing CTA */}
        <section className="section-padding bg-brand-bg pt-0">
          <div className="brand-container max-w-2xl mx-auto">
            <div className="bg-brand-accent-light rounded-2xl p-8 md:p-10 border border-brand-accent/15 text-center">
              <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text mb-3">
                Come on the tour
              </h2>
              <p className="font-lora text-base text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
                Free to book. 1h 45m, mostly flat. Daily from The Forum. Pay what it was worth at the end.
              </p>
              <Link
                href="/book"
                className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg shadow-md"
              >
                Book your spot (free)
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <p className="font-lora text-sm text-muted-foreground mt-4">
                Or{" "}
                <Link
                  href="/tour"
                  className="text-brand-accent hover:underline font-semibold"
                >
                  see the route first
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
