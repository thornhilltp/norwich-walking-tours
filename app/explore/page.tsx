import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Norwich | A Local's Guides",
  description:
    "Norwich guides written by a local who walks it for a living. Where to stay, what to skip, when to visit, where to drink.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/explore",
  },
};

interface ExplorePost {
  slug: string;
  title: string;
  blurb: string;
  image?: string;
  imageAlt?: string;
  comingSoon?: boolean;
}

const posts: ExplorePost[] = [
  {
    slug: "where-to-stay-norwich",
    title: "Where to stay in Norwich",
    blurb:
      "Five neighbourhoods, who they suit, and which ones are within walking distance of The Forum. Honest opinions, no hotel-affiliate fluff.",
    image: "/images/tour/group-cathedral-lawn.jpg",
    imageAlt: "Norwich Cathedral lawn, near the centre of the city.",
  },
  {
    slug: "norwich-in-a-weekend",
    title: "Norwich in a weekend",
    blurb:
      "A two-day plan a local would actually follow. Coming soon.",
    comingSoon: true,
  },
  {
    slug: "norwich-rainy-day",
    title: "Norwich on a rainy day",
    blurb:
      "Where to go when the weather turns. Coming soon.",
    comingSoon: true,
  },
  {
    slug: "norwich-pubs",
    title: "The pubs locals actually go to",
    blurb:
      "The good ones, the old ones, the ones nobody tells visitors about. Coming soon.",
    comingSoon: true,
  },
];

export default function ExplorePage() {
  const live = posts.filter((p) => !p.comingSoon);
  const soon = posts.filter((p) => p.comingSoon);

  return (
    <>
      <main className="bg-brand-bg pt-20 pb-16">
        {/* Header */}
        <section className="brand-container max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Explore Norwich
          </p>
          <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            Norwich guides, from someone who walks it for a living.
          </h1>
          <p className="font-lora text-lg text-muted-foreground leading-relaxed">
            Where to stay. What to skip. When to visit. Where to drink. Real local opinions, no hotel-affiliate fluff and no AI-generated listicles.
          </p>
        </section>

        {/* Live posts */}
        <section className="brand-container max-w-4xl mx-auto px-4 sm:px-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {live.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/explore/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-brand-accent/10 shadow-sm overflow-hidden hover:shadow-md hover:border-brand-accent/30 transition-all duration-200"
                >
                  {post.image && post.imageAlt && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-caveat text-2xl md:text-3xl font-bold text-brand-text leading-tight mb-2 group-hover:text-brand-accent transition-colors duration-150">
                      {post.title}
                    </h2>
                    <p className="font-lora text-sm text-muted-foreground leading-relaxed mb-3">
                      {post.blurb}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent">
                      Read the guide
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Coming soon */}
        {soon.length > 0 && (
          <section className="brand-container max-w-4xl mx-auto px-4 sm:px-6 mt-14">
            <h2 className="font-caveat text-2xl font-bold text-brand-text mb-5 text-center">
              Coming soon
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {soon.map((post) => (
                <li
                  key={post.slug}
                  className="bg-brand-accent-light rounded-2xl border border-brand-accent/15 p-5 opacity-80"
                >
                  <h3 className="font-caveat text-xl font-bold text-brand-text leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="font-lora text-sm text-muted-foreground leading-relaxed">
                    {post.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Soft CTA */}
        <section className="brand-container max-w-2xl mx-auto px-4 sm:px-6 mt-14 text-center">
          <p className="font-lora text-base text-muted-foreground leading-relaxed">
            Or skip the reading and just{" "}
            <Link href="/book" className="text-brand-accent hover:underline font-semibold">
              come on the tour
            </Link>
            . Mon to Sat from The Forum, free to book.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
