import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { ArrowRight, MessageCircle, UserRound, MapPin } from "lucide-react";
import { GuideReviews, type GuideReview } from "./_components/GuideReviews";
import { GuideExpand } from "./_components/GuideExpand";

// About Us — the collective page. Image-led, matches the site's polaroid
// language (cream paper, tape, tilt, Caveat captions). Short scannable
// copy, no role labels, no badges. Live at /about-us; replaces the old
// solo-Tom /about (301 redirect in next.config.mjs).

export const metadata: Metadata = {
  title: "About Us | Norwich Free Walking Tours",
  description:
    "A few Norwich locals who show people round the city we live in. Meet Tom, Joolz and Holly, the guides behind the Norwich free walking tour.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/about-us",
  },
  openGraph: {
    title: "About Us | Norwich Free Walking Tours",
    description:
      "Meet the Norwich locals who show you round: Tom, Joolz and Holly.",
    url: "https://www.norwichfreewalkingtours.co.uk/about-us",
    type: "website",
    images: [{ url: "/og-image.jpg", alt: "The Norwich Free Walking Tours guides." }],
  },
};

type Guide = {
  name: string;
  initial: string;
  tint: string;
  img: string;
  focal: string;
  zoom?: string; // background-size; defaults to "cover". Used to crop tighter.
  rotate: string;
  blurb: string;
  handle?: { label: string; href: string };
  accent?: { ac: string; ad: string };
  reviews?: GuideReview[];
};

const guides: Guide[] = [
  {
    name: "Tom",
    initial: "T",
    tint: "linear-gradient(150deg,#2DA96B,#1f6d47)",
    img: "/images/tour/tom-portrait-river.jpg",
    focal: "50% 20%",
    rotate: "-2deg",
    blurb:
      "I came for a history degree and never left, that was 13 years ago. I started the tour because Norwich didn't have one and every other city did.",
    accent: { ac: "#2DA96B", ad: "#1A6B47" },
    reviews: [
      {
        quote: "We're always sceptical of historical tours. But **Tom is the real thing**.",
        author: "Vina",
        source: "Google",
      },
      {
        quote:
          "Our guide Tom offered up lots of information on other places to go, as well as **food and drink recommendations**.",
        author: "Claire",
        source: "Google",
      },
      {
        quote: "Tom pointed out the **independent shops, restaurants and bars**.",
        author: "Lisa",
        source: "TripAdvisor",
      },
    ],
  },
  {
    name: "Joolz",
    initial: "J",
    tint: "linear-gradient(150deg,#7c6cae,#463a63)",
    img: "/images/guides/joolz.png",
    focal: "34% 38%",
    zoom: "125%",
    rotate: "1.5deg",
    blurb:
      "Norfolk born and proud. Paranormal investigator, Reiki master, and every so often a Viking. Or an Abbess.",
    accent: { ac: "#E8734A", ad: "#B44A28" },
    reviews: [
      {
        quote: "Joolz really **brought it to life**. She was the best thing about our trip.",
        author: "Andy, from Wales",
      },
      {
        quote: "Joolz is an **absolutely superb tour guide**. Can't recommend her enough.",
        author: "Caroline, from Basingstoke",
      },
    ],
  },
  {
    name: "Holly",
    initial: "H",
    tint: "linear-gradient(150deg,#c8823f,#8a5220)",
    img: "/images/tour/holly-portrait.jpg",
    focal: "50% 15%",
    rotate: "-1.5deg",
    blurb:
      "I tell the lesser-known Norwich stories. The dark ones, the funny ones, and the where's-the-evidence ones.",
    handle: { label: "@historyhollydays", href: "https://www.instagram.com/historyhollydays" },
    accent: { ac: "#D99A2B", ad: "#8A5E10" },
    reviews: [
      {
        quote:
          "She kept our group totally engaged with **interesting, funny and warm-hearted stories**. Simply the best first-day activity in Norwich.",
        author: "OwlQueen",
        source: "TripAdvisor",
      },
      {
        quote: "Holly's tour is **fabulous**. Very fun and loads of info. What an amazing intro to historic Norwich.",
        author: "Caroline",
      },
    ],
  },
];

// Philosophy points — icon + heading + short line with a bolded key phrase.
// Bold via **markers** rendered as semibold ink for emphasis on the sand band.
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

const philosophy = [
  {
    Icon: MessageCircle,
    h: "A conversation, not a lecture",
    p: "We tell stories and ask questions, we don't reel off dates. **You'll talk to us, and to each other.** That's the bit people remember.",
    img: "/images/tour/tom-tombland-talk.jpg",
    alt: "Tom mid-story in Tombland with a tour group listening",
    tape: "#2DA96B",
    tilt: "-1.2deg",
  },
  {
    Icon: UserRound,
    h: "Built around you",
    p: "We read the group. Where you're from, what you're into, how much history you actually want. **Nobody gets quite the same walk.**",
    img: "/images/tour/group-street-laughing.jpg",
    alt: "Guests laughing with their guide on a Norwich street",
    tape: "#E8734A",
    tilt: "0.8deg",
  },
  {
    Icon: MapPin,
    h: "More than history",
    p: "Where to eat, what to see next, what locals actually do. We want you making the most of **the whole trip**, not just the two hours with us.",
    img: "/images/tour/holly-market.jpg",
    alt: "Guide at Norwich Market, where the tour finishes and lunch starts",
    tape: "#D99A2B",
    tilt: "-0.6deg",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <main className="bg-brand-bg pt-24 md:pt-28 pb-4">
        {/* Intro */}
        <section className="brand-container max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-[0.18em] uppercase mb-3">
            About us
          </p>
          <h1 className="leading-[0.95] mb-5">
            <span className="block font-lora text-3xl md:text-4xl font-semibold text-brand-text">
              A few Norwich locals
            </span>
            <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
              who love showing it off.
            </span>
          </h1>
          <p className="font-lora text-lg text-brand-text/80 leading-relaxed max-w-xl mx-auto">
            We show people round the city we actually live in. It started with one free tour, and it&apos;s grown from there.
          </p>
        </section>

        {/* The locals — polaroid grid. Leads the page (faces first) per
            Tom; the values/creed band sits below it. */}
        <section className="brand-container max-w-6xl mx-auto px-4 sm:px-6 mt-16 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
            {guides.map((g) => (
              <div key={g.name} className="flex flex-col items-center">
                {/* Cream polaroid — matches PhotoShowcaseV2 / About */}
                <div
                  className="p-3 pb-12 shadow-xl border border-brand-text/5 relative w-full max-w-[320px]"
                  style={{ backgroundColor: "#F5EBDA", transform: `rotate(${g.rotate})` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 w-24 h-6 rounded-[3px]"
                    style={{
                      transform: "translateX(-50%) rotate(-2deg)",
                      backgroundColor: g.accent?.ac ?? "#2DA96B",
                      borderTop: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                    }}
                  />
                  {/* Coloured initial behind, photo as CSS background on top;
                      a missing file just reveals the initial (no broken icon). */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: g.tint }}>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center font-caveat font-bold text-white/90 select-none"
                      style={{ fontSize: "clamp(3rem,12vw,4.5rem)" }}
                    >
                      {g.initial}
                    </span>
                    <div
                      role="img"
                      aria-label={`${g.name}, Norwich Walking Tours guide`}
                      className="absolute inset-0 bg-no-repeat"
                      style={{
                        backgroundImage: `url(${g.img})`,
                        backgroundPosition: g.focal,
                        backgroundSize: g.zoom ?? "cover",
                      }}
                    />
                  </div>
                  <p className="absolute bottom-3 left-0 right-0 text-center font-caveat font-bold text-brand-text text-3xl leading-none">
                    {g.name}
                  </p>
                </div>

                {/* Short blurb */}
                <p className="font-lora text-brand-text/80 leading-relaxed mt-6 max-w-[300px]">
                  {g.blurb}
                </p>
                {g.handle && (
                  <a
                    href={g.handle.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-lora text-sm font-semibold text-brand-accent-text hover:underline mt-3"
                  >
                    {g.handle.label}
                  </a>
                )}

                {g.reviews && (
                  <GuideExpand name={g.name} count={g.reviews.length} accent={g.accent}>
                    <GuideReviews reviews={g.reviews} accent={g.accent} />
                  </GuideExpand>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Creed — the promise is the outcome: make the most of Norwich,
            whether visiting or living here. Sits below the guides. */}
        <section className="mt-16 py-16 border-y border-brand-accent/10" style={{ backgroundColor: "#F5EBDA" }}>
          <div className="brand-container max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="mb-4">
              <span className="font-lora text-3xl md:text-4xl font-semibold text-brand-text">Our </span>
              <span className="font-caveat text-5xl md:text-6xl font-bold text-brand-accent">philosophy.</span>
            </h2>
            <p className="font-lora text-brand-text/80 leading-relaxed max-w-xl mx-auto text-base md:text-lg">
              However you find us, the goal&apos;s the same: you leave loving Norwich, and knowing what to do with it.
            </p>

            {/* Three taped note cards with a photo each, matching the
                polaroid / review-note language used across the site. */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto mt-14 text-left">
              {philosophy.map(({ Icon, h, p, img, alt, tape, tilt }, i) => (
                <article
                  key={h}
                  className="relative bg-white p-3 pb-6 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.45)] border border-[#EAE0D4]"
                  style={{ transform: `rotate(${tilt})` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 w-20 h-5 rounded-[3px]"
                    style={{ transform: "translateX(-50%) rotate(-2deg)", backgroundColor: tape, boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
                  />
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={img} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 320px" />
                  </div>
                  <div className="px-2 pt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex-none w-8 h-8 rounded-full bg-brand-accent-light flex items-center justify-center text-brand-accent-text">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="font-lora text-xs font-semibold tracking-[0.18em] text-brand-text/50">0{i + 1}</span>
                    </div>
                    <h3 className="font-caveat text-3xl font-bold text-brand-accent leading-none mb-3">{h}</h3>
                    <p className="font-lora text-brand-text/80 leading-relaxed">{renderBold(p)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Book CTA — the visitor "join a tour" action. */}
        <section className="brand-container max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="mb-3">
            <span className="font-lora text-2xl md:text-3xl font-semibold text-brand-text">Come and </span>
            <span className="font-caveat text-4xl md:text-5xl font-bold text-brand-accent">meet us.</span>
          </h2>
          <p className="font-lora text-base text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
            The free walking tour runs daily from The Forum. Free to book. Pay what it was worth at the end.
          </p>
          <TrackedBookLink
            location="about_us"
            className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg shadow-md"
          >
            Book your spot (free)
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </TrackedBookLink>
        </section>

      </main>
      <Footer />
    </>
  );
}
