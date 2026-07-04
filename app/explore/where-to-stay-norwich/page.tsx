import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Where to Stay in Norwich | A Local's Guide",
  description:
    "Five Norwich neighbourhoods, who they suit, and how close they are to the city centre. Honest local picks, no affiliate fluff.",
  alternates: {
    canonical:
      "https://www.norwichfreewalkingtours.co.uk/explore/where-to-stay-norwich",
  },
  openGraph: {
    title: "Where to Stay in Norwich | A Local's Guide",
    description:
      "Five Norwich neighbourhoods, who they suit, and how close they are to the city centre.",
    url: "https://www.norwichfreewalkingtours.co.uk/explore/where-to-stay-norwich",
    type: "article",
    images: [
      {
        url: "/images/pottergate-stock.png",
        alt: "Pottergate, a quiet street in Norwich city centre.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where to Stay in Norwich | A Local's Guide",
    description:
      "Five Norwich neighbourhoods, who they suit, and how close they are to the city centre.",
    images: ["/images/pottergate-stock.png"],
  },
};

const SITE_URL = "https://www.norwichfreewalkingtours.co.uk";
const PAGE_URL = `${SITE_URL}/explore/where-to-stay-norwich`;
const PUBLISHED = "2026-05-01";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Where to stay in Norwich (from someone who lives here)",
  description:
    "Five Norwich neighbourhoods, who they suit, and how close they are to the city centre. Honest local picks, no affiliate fluff.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: "en-GB",
  author: { "@id": `${SITE_URL}/about#tom` },
  publisher: { "@id": `${SITE_URL}/#localbusiness` },
  image: `${SITE_URL}/og-image.jpg`,
  about: { "@type": "Place", name: "Norwich" },
};

interface Area {
  n: string;
  name: string;
  suits: string;
  vibe: React.ReactNode;
  picks: React.ReactNode;
  walk: string;
}

const areas: Area[] = [
  {
    n: "01",
    name: "Cathedral Quarter and Tombland",
    suits: "First-time visitors. Couples. Anyone whose priority is being able to walk everywhere.",
    vibe: (
      <p>
        Right next to the Cathedral, the Close, and Elm Hill. Step out the front door and you&apos;re already in the most photogenic part of the city. Quiet at night, busy by mid-morning, and you&apos;ll hear the cathedral bells.
      </p>
    ),
    picks: (
      <p>
        <strong>The Maids Head Hotel</strong> on Tombland is the obvious pick. The hotel claims it&apos;s the oldest in the UK still trading and the building has the medieval pedigree to back it up. Full of character, pricier. <strong>All Hallows Guesthouse</strong> at the Julian Shrine is the literary alternative: the small guesthouse sits on the spot where Julian of Norwich, the medieval anchorite and author, lived and wrote in the 1300s.
      </p>
    ),
    walk: "5 min to The Forum",
  },
  {
    n: "02",
    name: "The Lanes and city centre",
    suits: "Friends weekending. Anyone who wants pubs, food and shops on the doorstep.",
    vibe: (
      <p>
        The independent quarter. Tight medieval streets, courtyards behind courtyards, the market a minute away. You&apos;ll be walking past Jarrolds, Grosvenor Fish &amp; Chips, and a dozen indie cafes before you&apos;ve had breakfast.
      </p>
    ),
    picks: (
      <p>
        <strong>The Assembly House</strong> off Theatre Street is a Georgian Grade I-listed building with eleven rooms, well-known for its afternoon tea and British restaurant. <strong>38 St Giles</strong> is a small boutique B&amp;B with eight rooms in a converted Georgian townhouse, quietly central. <strong>Premier Inn Norwich Nelson City Centre</strong> on Prince of Wales Road covers the predictable end.
      </p>
    ),
    walk: "Same street as The Forum",
  },
  {
    n: "03",
    name: "NR2: The Golden Triangle",
    suits: "Friends weekend. Pub people. Longer stays. Anyone wanting a residential feel close to UEA.",
    vibe: (
      <p>
        Just west of the centre. Tree-lined Victorian terraces, plenty of UEA students, the kind of streets locals actually live on. Some of the best pubs in the city are here: the <strong>Hop Rocket</strong> and the <strong>Warwick Arms</strong> are favourites. Independent cafes, delis, second-hand bookshops. Not for you if you want hotel pools and chain restaurants.
      </p>
    ),
    picks: (
      <p>
        <strong>The Georgian Townhouse</strong> on Unthank Road is the obvious base, with a lively restaurant and bar on site. Otherwise mostly Airbnbs and short-lets around Park Lane, Christchurch Road and the Unthank end of Earlham Road.
      </p>
    ),
    walk: "15-20 min to The Forum",
  },
  {
    n: "04",
    name: "NR3: North of the river",
    suits: "Charity-shop hunters. Pub people. Anyone wanting character over polish.",
    vibe: (
      <p>
        Cross Fye Bridge and you&apos;re in NR3. Magdalen Street, St Augustine&apos;s, the back streets of the Cathedral Close. The kind of area where you can fill an afternoon in second-hand shops, end the night in a back-street pub, and never see a chain. Less polished than the Lanes. More interesting if you have time.
      </p>
    ),
    picks: (
      <p>
        Mostly Airbnbs and short-lets here, no major hotels. Look around Magdalen Street, St Crispin&apos;s, and the streets up towards Bishop Bridge. A short walk back over the river puts you in the centre.
      </p>
    ),
    walk: "10-15 min to The Forum",
  },
  {
    n: "05",
    name: "NR1: Riverside and the station",
    suits: "Day-trippers. Football weekends. People prioritising arrival logistics.",
    vibe: (
      <p>
        South of the Wensum, near the train station and Carrow Road. Newer apartments, a cinema, riverside food, and an easy walk into the centre along the water. Functional rather than pretty, but sensible if you&apos;re catching an early London-bound train or coming for a Canaries home game.
      </p>
    ),
    picks: (
      <p>
        <strong>Holiday Inn Norwich City</strong> sits next to Carrow Road, useful on a match day. <strong>Premier Inn Norwich Nelson City Centre</strong> on Prince of Wales Road is a short walk from both the station and the centre.
      </p>
    ),
    walk: "10-15 min to The Forum",
  },
];

export default function WhereToStayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="bg-brand-bg pt-20 pb-16">
        <article className="brand-container max-w-2xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <header className="mb-10 text-center">
            <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
              A local&apos;s guide
            </p>
            <h1 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-4">
              Where to stay in Norwich (from someone who lives here)
            </h1>
            <p className="font-lora text-lg text-muted-foreground leading-relaxed">
              Five neighbourhoods, who each one suits, and how long it takes to walk into the centre. No affiliate links, no fluff.
            </p>
          </header>

          {/* Intro */}
          <section className="font-lora text-base text-muted-foreground leading-relaxed space-y-4 mb-10">
            <p>
              Norwich is small. Most of what you came for is inside a 15-minute radius of The Forum. So picking where to stay is less about &quot;which side of town&quot; and more about what you want to walk out of your door into. Cathedral and old streets? Cobbled lanes and shops? A quieter river view? A leafy residential pocket?
            </p>
            <p>
              Below is the way I&apos;d describe each option to a friend. If you&apos;re joining the free walking tour on day one, anywhere in the first three areas puts you a short walk from the meeting point.
            </p>
          </section>

          {/* Areas */}
          <section className="flex flex-col gap-7 mb-12">
            {areas.map((a) => (
              <div
                key={a.n}
                className="bg-white rounded-2xl p-6 md:p-7 border border-brand-accent/10 shadow-sm"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-caveat text-3xl font-bold text-brand-accent">
                    {a.n}
                  </span>
                  <h2 className="font-caveat text-2xl md:text-3xl font-bold text-brand-text leading-tight">
                    {a.name}
                  </h2>
                </div>
                <p className="font-lora text-sm font-semibold text-brand-text mb-3">
                  Suits: <span className="font-normal text-muted-foreground">{a.suits}</span>
                </p>
                <div className="font-lora text-base text-muted-foreground leading-relaxed space-y-3">
                  {a.vibe}
                  {a.picks}
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold bg-brand-accent/10 text-brand-accent px-3 py-1.5 rounded-full">
                  {a.walk}
                </p>
              </div>
            ))}
          </section>

          {/* Practical bits */}
          <section className="font-lora text-base text-muted-foreground leading-relaxed space-y-4 mb-12">
            <h2 className="font-caveat text-3xl font-bold text-brand-text mb-2">
              A few honest tips
            </h2>
            <p>
              Everywhere central books out fast for graduation week (mid-July), Lord Mayor&apos;s Procession (early July), and Norwich City home games. If you&apos;re visiting then, book early or stay in the Golden Triangle and walk in.
            </p>
            <p>
              You don&apos;t need a car. Parking in the centre is expensive and the streets weren&apos;t built for it. The train station, Castle Quarter and a couple of the Park &amp; Ride sites all have decent overflow if you must drive.
            </p>
            <p>
              For things to actually do once you&apos;ve checked in, see{" "}
              <a
                href="https://www.visitnorwich.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:underline"
              >
                Visit Norwich
              </a>{" "}
              for the broad listings, or our own{" "}
              <Link
                href="/things-to-do/free"
                className="text-brand-accent hover:underline"
              >
                free things to do in Norwich
              </Link>
              {" "}page for the local picks.
            </p>
          </section>

          {/* Closing CTA */}
          <section className="bg-brand-accent-light rounded-2xl p-8 md:p-10 border border-brand-accent/15 text-center">
            <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text mb-3">
              Get your bearings on day one
            </h2>
            <p className="font-lora text-base text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
              The free walking tour leaves The Forum daily. 1 hour 45 minutes, mostly flat, one local guide and a group of 15 max. It&apos;s the fastest way to learn the city you&apos;re staying in.
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
          </section>

          {/* Cross-links */}
          <nav aria-label="Related" className="mt-10 text-center font-lora text-sm text-muted-foreground">
            <Link href="/explore" className="text-brand-accent hover:underline">
              More Norwich guides
            </Link>
            <span className="mx-2 text-brand-accent/40">&bull;</span>
            <Link href="/" className="text-brand-accent hover:underline">
              Home
            </Link>
            <span className="mx-2 text-brand-accent/40">&bull;</span>
            <Link href="/about" className="text-brand-accent hover:underline">
              About Tom
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
