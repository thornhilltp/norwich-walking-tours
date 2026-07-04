import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Things to Do in Norwich | A Local's Guide",
  description:
    "The free things in Norwich a local would actually recommend. Free walking tour, museums, gardens, and hidden corners. No price tag, no rubbish.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/things-to-do/free",
  },
  openGraph: {
    title: "Free Things to Do in Norwich | A Local's Guide",
    description:
      "Ten free things in Norwich a local would actually recommend.",
    url: "https://www.norwichfreewalkingtours.co.uk/things-to-do/free",
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
    title: "Free Things to Do in Norwich | A Local's Guide",
    description:
      "Ten free things in Norwich a local would actually recommend.",
    images: ["/images/pottergate-stock.png"],
  },
};

const SITE_URL = "https://www.norwichfreewalkingtours.co.uk";
const PAGE_URL = `${SITE_URL}/things-to-do/free`;
const PUBLISHED = "2026-04-30";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free things to do in Norwich",
  description:
    "The free things in Norwich a local would actually recommend. Free walking tour, museums, gardens, and hidden corners. No price tag, no rubbish.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: "en-GB",
  author: {
    "@type": "Organization",
    name: "Norwich Free Walking Tours",
    url: SITE_URL,
  },
  publisher: {
    "@id": `${SITE_URL}/#localbusiness`,
  },
  image: `${SITE_URL}/og-image.jpg`,
  about: { "@type": "Place", name: "Norwich" },
};

interface FreeThingItem {
  n: string;
  title: string;
  image?: string;
  imageAlt?: string;
  body: React.ReactNode;
}

const items: FreeThingItem[] = [
  {
    n: "01",
    title: "Take the free walking tour",
    image: "/images/tour/group-cathedral-lawn.jpg",
    imageAlt: "Walking tour group on the Cathedral lawn, Norwich.",
    body: (
      <>
        <p>
          Yes, this is our list, and yes, our tour is on it. We&apos;d still put it here even if it weren&apos;t. It&apos;s the only daily free walking tour in Norwich. 1 hour 45 minutes, a local guide, and the stories that didn&apos;t make it onto any blue plaque. Free to book, tip what you think it was worth at the end. Most guests pay £10 to £20 per person. If it wasn&apos;t worth it, you don&apos;t pay.
        </p>
        <p>
          We start at The Forum and finish near the Cathedral, taking in Elm Hill, the Lanes, the Market and Norwich Castle along the way. Group capped at 15 so you can actually hear the guide.
        </p>
        <p>
          <TrackedBookLink location="things_to_do_intro" className="text-brand-accent hover:underline font-semibold">
            Book your spot (free) &rarr;
          </TrackedBookLink>
        </p>
      </>
    ),
  },
  {
    n: "02",
    title: "Walk into Norwich Cathedral",
    image: "/images/norwich-cathedral-stock.png",
    imageAlt: "Norwich Cathedral, the 900-year-old Norman cathedral with England's second-tallest spire.",
    body: (
      <>
        <p>
          Free entry, no queues. Most people don&apos;t realise. The cathedral is 900 years old and the spire is the second tallest in England. The Cloisters are the largest medieval cloisters in the country. Walk around them once for the architecture, again for the silence.
        </p>
        <p>
          The grounds are also free and the Close is one of the prettiest patches of Norwich. Look for the statue of Edith Cavell beside Erpingham Gate.{" "}
          <a
            href="https://cathedral.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent hover:underline"
          >
            Cathedral opening times here.
          </a>
        </p>
      </>
    ),
  },
  {
    n: "03",
    title: "Wander Elm Hill",
    image: "/images/elm-hill-stock.png",
    imageAlt: "Elm Hill, Norwich's most photographed cobbled medieval street.",
    body: (
      <>
        <p>
          The most photographed cobbled street in the city. Largely unchanged since the 16th century. Used as a Netflix filming location for Jingle Jangle. Five minutes is enough to see it. Twenty minutes is enough to actually feel it. Either way, costs nothing.
        </p>
        <p>
          Pop your head into the Britons Arms at the top of the hill. The thatched-roof Tudor coffee house is one of the oldest buildings in Norwich. Coffee isn&apos;t free, but looking at it is.
        </p>
      </>
    ),
  },
  {
    n: "04",
    title: "Browse Norwich Market",
    image: "/images/norwich-market-sun-stock.png",
    imageAlt: "Norwich Market in the sun, one of the oldest and largest open-air markets in Britain.",
    body: (
      <p>
        One of the oldest open-air markets in Britain. 900 years of trading on the same patch. Wander the stalls under the colourful roof. Talk to the people who&apos;ve been there for decades. You don&apos;t have to buy anything. Lunch from a stall is one of the best-value meals in the city if you do.
      </p>
    ),
  },
  {
    n: "05",
    title: "The Plantation Garden",
    body: (
      <>
        <p>
          A Victorian sunken garden hidden behind a hotel. Free to enter (donations welcome and worth it). Most locals don&apos;t even know it exists. Quiet, weird, beautiful.
        </p>
        <p>
          Bring a book. Sit on the steps of the gothic fountain. It&apos;s 200 yards from the city centre and feels like a different decade.{" "}
          <a
            href="https://plantationgarden.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent hover:underline"
          >
            Garden details and opening hours.
          </a>
        </p>
      </>
    ),
  },
  {
    n: "06",
    title: "Climb up to Mousehold Heath",
    body: (
      <p>
        A 15-minute walk from Tombland gets you to one of the best views of the city. Open heathland, woodland paths, and a long view across all the spires and towers. It&apos;s where Robert Kett camped 16,000 rebel peasants in 1549 before marching on the city. Now mostly used by dog walkers and runners. Free, always open, and one of the few places in Norwich where you can actually see the shape of the city.
      </p>
    ),
  },
  {
    n: "07",
    title: "Walk the riverside path along the Wensum",
    image: "/images/vamous-view-norwich.png",
    imageAlt: "View of Norwich from Fye Bridge over the River Wensum.",
    body: (
      <p>
        Pick up the path at Fye Bridge or Pulls Ferry and walk in either direction. Past Cow Tower, under Bishop Bridge, around the Cathedral. Half an hour gets you views you won&apos;t see from any street. The river bends through the city like it forgot it was a city. No entry fee, no queue, no rush.
      </p>
    ),
  },
  {
    n: "08",
    title: "Norwich Castle grounds",
    image: "/images/norwich-castle.png",
    imageAlt: "Norwich Castle, the Norman fortress overlooking the city.",
    body: (
      <p>
        The museum costs money. The grounds and the view from the mound are free. Walk up, sit on a bench, look at the city. The castle has been standing on that mound since 1067 and was a county prison until 1887. From the top you can pick out the Cathedral, City Hall and the Forum in one glance.
      </p>
    ),
  },
  {
    n: "09",
    title: "Get lost in the Norwich Lanes",
    image: "/images/norwich-lane-stock.png",
    imageAlt: "The Norwich Lanes, independent shops and cafes in Norwich city centre.",
    body: (
      <p>
        Independent shops, hidden coffee spots, courtyards behind courtyards. No chain coffee, no brand names you&apos;d recognise. Walking here is free and accidental window-shopping is the whole point. Pop into Jarrolds for the rooftop view, then disappear into the back streets behind it.
      </p>
    ),
  },
  {
    n: "10",
    title: "Sit in The Cathedral Close at sunset",
    body: (
      <p>
        Saving the best for last. After the cathedral closes, the Close itself stays open and quiet. Catch the cathedral&apos;s west front in low light. There are benches. There&apos;s usually nobody around. It&apos;s one of those small, free things that locals do and visitors mostly miss.
      </p>
    ),
  },
];

export default function FreeThingsToDoNorwichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="bg-brand-bg pt-20 pb-16">
        <article className="brand-container max-w-2xl mx-auto">
          {/* Header */}
          <header className="mb-8 text-center">
            <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
              A local&apos;s guide
            </p>
            <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-3">
              Free things to do in Norwich
            </h1>
            <p className="font-caveat text-2xl md:text-3xl text-brand-accent mb-4 leading-tight">
              Ten things a local would actually recommend.
            </p>
            <p className="font-lora text-lg text-muted-foreground leading-relaxed">
              No price tag, no rubbish. Most of them are within a 15-minute walk of each other.
            </p>
          </header>

          {/* Hero image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md mb-10 border border-brand-accent/15">
            <Image
              src="/images/pottergate-stock.png"
              alt="Pottergate, a quiet street in Norwich city centre, lined with independent shops and old buildings."
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>

          {/* Intro */}
          <section className="mb-10">
            <p className="font-lora text-base text-muted-foreground leading-relaxed mb-4">
              Norwich rewards anyone willing to walk five minutes off the obvious path. The city kept most of its medieval bones, the river loops the centre, and the streets between the Castle and the Cathedral are dense with stuff that&apos;s been there for 700 years.
            </p>
            <p className="font-lora text-base text-muted-foreground leading-relaxed">
              You don&apos;t need to spend money to see the best of it. Here&apos;s what we&apos;d send a friend to do on a free day in Norwich. Works on a weekend too.
            </p>
          </section>

          {/* Items */}
          <section className="flex flex-col gap-8">
            {items.map((item) => (
              <div
                key={item.n}
                className="bg-white rounded-2xl border border-brand-accent/10 shadow-sm overflow-hidden"
              >
                {item.image && item.imageAlt && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                )}
                <div className="p-6 md:p-7">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-caveat text-3xl font-bold text-brand-accent">
                      {item.n}
                    </span>
                    <h2 className="font-caveat text-2xl md:text-3xl font-bold text-brand-accent leading-tight">
                      {item.title}
                    </h2>
                  </div>
                  <div className="font-lora text-base text-muted-foreground leading-relaxed space-y-3">
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Closing CTA */}
          <section className="mt-12 bg-brand-accent-light rounded-2xl p-8 md:p-10 border border-brand-accent/15 text-center">
            <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text mb-3">
              Want a local to show you the rest?
            </h2>
            <p className="font-lora text-base text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
              The free walking tour covers the city in 1h 45m with stories you won&apos;t find on a sign. Free to book, tip what it was worth at the end.
            </p>
            <TrackedBookLink
              location="things_to_do_bottom"
              className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg shadow-md"
            >
              Book your spot (free)
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </TrackedBookLink>
            <p className="font-lora text-sm text-muted-foreground mt-4">
              Or{" "}
              <Link href="/tour" className="text-brand-accent hover:underline font-semibold">
                see the full route first
              </Link>
              .
            </p>
          </section>

          {/* Light cross-links */}
          <nav aria-label="Related" className="mt-10 text-center font-lora text-sm text-muted-foreground">
            <Link href="/" className="text-brand-accent hover:underline">
              Back to home
            </Link>
            <span className="mx-2 text-brand-accent/40">&bull;</span>
            <Link href="/tour" className="text-brand-accent hover:underline">
              The 12 stops on the tour
            </Link>
            <span className="mx-2 text-brand-accent/40">&bull;</span>
            <Link href="/private-tours" className="text-brand-accent hover:underline">
              Private tours
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
