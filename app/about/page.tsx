import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
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

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-10 max-w-xl mx-auto border border-brand-accent/15">
            <Image
              src="/images/tom-portrait.jpg"
              alt="Tom Thornhill, founder of Norwich Free Walking Tours."
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
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
              Free to book. 1 hour 45 minutes, mostly flat. Mon-Sat from The Forum. Pay what you think it was worth at the end.
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
