import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Tom | Norwich Free Walking Tours",
  description:
    "Meet Tom, the Norwich local who runs the city's only daily free walking tour. Real stories, no scripts, tip what it was worth.",
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

// Person schema, linked to the existing LocalBusiness @id in app/layout.tsx
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#tom`,
  name: "Tom Thornhill",
  jobTitle: "Founder and tour guide",
  description:
    "Norwich-based history graduate and founder of Norwich Free Walking Tours.",
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

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="bg-brand-bg pt-20 pb-16">
        {/* Hero */}
        <section className="brand-container max-w-3xl mx-auto px-4 sm:px-6">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3 text-center">
            Meet Tom
          </p>
          <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-8 text-center">
            Hi, I&apos;m Tom. I run the tour.
          </h1>

          {/* Landscape polaroid — matches the polaroid aesthetic used on
              /home-v2 (PhotoShowcase + About). White paper frame, p-3
              with extended pb-12 for the caption strip, masking tape
              at top, subtle rotation, caption in Caveat at the bottom. */}
          <div
            className="relative mb-12 max-w-2xl mx-auto"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {/* Warm-cream polaroid paper (#F5EBDA) — Tom 2026-05-19: white
                polaroid disappears against the cream page background, so
                using a more saturated paper tone for visible contrast.
                Matches the cream paper used on PhotoShowcaseV2 Card 2. */}
            <div
              className="p-3 pb-12 shadow-2xl border border-brand-text/5"
              style={{ backgroundColor: "#F5EBDA" }}
            >
              {/* Masking tape — yellowy translucent */}
              <span
                aria-hidden="true"
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 rounded-sm shadow-sm"
                style={{
                  backgroundColor: "rgba(241, 225, 161, 0.75)",
                  borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                }}
              />
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/tom-portrait.jpg"
                  alt="Tom Thornhill, founder of Norwich Free Walking Tours."
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>
              {/* Caption — single Caveat handwritten note. The 'Tom Thornhill,
                  Norwich' Lora label was removed per Tom — feels redundant
                  with the H1 'Hi, I'm Tom' right above. */}
              <p
                className="absolute bottom-2 left-5 italic text-brand-text/75 text-[22px] leading-none"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                that&apos;s me, hi
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="brand-container max-w-2xl mx-auto px-4 sm:px-6 font-lora text-base md:text-lg text-brand-text leading-relaxed space-y-5">
          <p>
            I came to Norwich for the history degree at UEA, and I never left. That was 13 years ago. My partner is Norwich-born-and-bred. She&apos;s taught me how the city actually lives. I&apos;ve ended up telling her parts of its history she was never told. That gap, locals walking past their own history, was part of why I started doing this.
          </p>
          <p>
            Norwich punches above its weight. For centuries it was the second city of England, behind only London. Wool, weaving and banking built it. Dutch and Flemish weavers fleeing persecution (the &ldquo;Strangers&rdquo;) doubled its population in the 1500s and turned it into a multilingual, prosperous, slightly weird place for two hundred years. You can still see all of it walking around. The flint, the medieval lanes, the cathedral spire, the guildhall on the market.
          </p>
          <p>
            That&apos;s part of why I love it, and part of why it keeps getting noticed. The Sunday Times named Norwich the top place to live in the UK in March 2026. Lonely Planet&apos;s Best in Travel 2025 named East Anglia (featuring Norwich) one of its top global destinations, calling it a cultured, walkable &ldquo;City of Stories&rdquo; packed with history and medieval charm. People who live here aren&apos;t surprised. People who don&apos;t, mostly haven&apos;t been yet.
          </p>
          <p>
            In 2025, my partner and I spent nine months travelling Europe, Southeast Asia, Japan, China, Australia and New Zealand. We took free walking tours in most of the cities we visited. Some were brilliant. Some weren&apos;t. They all worked the same way: a local meets you somewhere, walks you round for a couple of hours, and at the end you pay what you think it was worth.
          </p>
          <p>
            Coming home, I realised every other major UK city already had one. Edinburgh, Manchester, Bristol, plenty of smaller towns. Norwich didn&apos;t. There were paid tours and occasional themed walks here, but nothing proper, nothing daily, nothing you could book at your own convenience. So I started Norwich Free Walking Tours.
          </p>

          <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text pt-4">
            Why no upfront charge?
          </h2>
          <p>
            It&apos;s how the tours I went on abroad worked, and the model just makes sense. You can&apos;t be wrong about the price if the customer is the one setting it. Show up curious, see what you think, pay what it was worth. £10 to £20 per person is the going rate. If it wasn&apos;t worth it, you don&apos;t pay. Simple.
          </p>

          <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text pt-4">
            The point
          </h2>
          <p>
            I want to show people Norwich the way locals abroad showed me their cities. With pride, with stories, with the things you&apos;d never find on a tourist map. Whether you&apos;re visiting for a day or you&apos;ve lived here forty years, I think there&apos;s a strong chance you&apos;ll hear something about this city you didn&apos;t know.
          </p>
          <p>
            If you fancy it, come along.
          </p>
        </article>

        {/* CTA */}
        <section className="brand-container max-w-2xl mx-auto px-4 sm:px-6 mt-12">
          <div className="bg-brand-accent-light rounded-2xl p-8 md:p-10 border border-brand-accent/15 text-center">
            <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text mb-3">
              Come on the tour
            </h2>
            <p className="font-lora text-base text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
              Free to book. 2 hours, about 2.5 km, mostly flat. Daily from The Forum, finishing at Norwich Market. Pay what you think it was worth at the end.
            </p>
            <TrackedBookLink
              location="about"
              className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg shadow-md"
            >
              Book your spot (free)
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </TrackedBookLink>
            <p className="font-lora text-sm text-muted-foreground mt-4">
              Or{" "}
              <Link href="/tour" className="text-brand-accent hover:underline font-semibold">
                see the route first
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
