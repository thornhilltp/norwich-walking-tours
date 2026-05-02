import Image from "next/image";
import type { Metadata } from "next";
import { tourStops } from "@/lib/tourStops";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Norwich Walking Tour | 12 Stops, 1h 45m",
  description:
    "12 stops through the real Norwich. Elm Hill, Norwich Cathedral, the Lanes, the Market and more. Near daily from The Forum. Book your spot free.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/tour",
  },
};

const faqItems = [
  {
    q: "Is it actually free?",
    a: "Yes. You book free, walk the route, and at the end you tip what you think it was worth. If the tour was rubbish, pay nothing. Most guests tip £10 to £20.",
  },
  {
    q: 'Why "merit-based" instead of "free"?',
    a: "Because the guide has to earn it every time. No fixed fee, no captive audience. If we don't deliver, the tip reflects that.",
  },
  {
    q: "Do I need to book?",
    a: "Yes. Spots are limited to 15 per tour and they fill up, especially in summer.",
  },
  {
    q: "What if it rains?",
    a: "We walk anyway. Norwich looks better in the drizzle. Bring a coat.",
  },
  {
    q: "Is it suitable for kids?",
    a: "School-age and up tend to enjoy it. Under 5s might find 1h 45m a stretch.",
  },
  {
    q: "Is the route accessible?",
    a: "Mostly flat, mostly paved. A few cobbles around Elm Hill. Get in touch in advance if you want the full route map or have specific access needs.",
  },
  {
    q: "Where do we meet?",
    a: "Outside The Forum, Millennium Plain, NR2 1TF. Look for the green branding.",
  },
  {
    q: "How long is the tour?",
    a: "1 hour 45 minutes, give or take.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

// Stop stories — one-line hook + story + fun fact
const stopStories: Record<number, string> = {
  1: "We start where Norwich nearly didn't. The Forum was built in 2001 on the site of the old library, which burned down in 1994 and took half a million books with it. Look up at the curve of the building. It's deliberately shaped to mirror the cathedral spire across the city.",
  2: "England's largest surviving medieval guildhall, built when Norwich was the country's second city. The witch trials happened here. So did most of the city's important business for nearly 500 years. The flint chequerboard pattern on the front wall is showing off, and we'll talk about why.",
  3: "A maze of independent shops, hidden courtyards, and Tudor buildings the developers somehow never got hold of. This was the medieval shopping district. Walk slowly. Half the fun is what you spot in the side alleys you'd never find on your own.",
  4: "Trading on the same patch of ground since the 11th century. One of the largest open-air markets in England and the most colourful from above. The stalls have been here longer than most countries have existed in their current form.",
  5: "Norwich's small slice of Victorian shopping theatre. Built in 1899, decorated with art nouveau tiles, and one of the few places in the city that feels frozen in time. Walk through it slowly. The tiles tell their own story.",
  6: "The first pedestrianised shopping street in the UK, going car-free in 1967. A small thing, but Norwich got there before everyone else. We'll talk about why this matters more than it sounds.",
  7: "A Norman keep built to remind the locals who was in charge. It worked. For most of its life it was a prison, and the stories from that period are not for the squeamish. Recently reopened after a major restoration, and now arguably the most impressive medieval royal palace in England you've never heard of.",
  8: "Originally a Dominican friary, then a town hall, then a synagogue, then a fire station, now a concert venue. One building, six lives. The roof beams are the original 14th-century timber.",
  9: "The most photographed street in Norwich and the closest you'll come to walking through a Tudor film set. Nearly demolished in the 1920s for being \"slum housing.\" Saved by a single vote on the city council. We'll show you exactly where the vote was cast.",
  10: "Doesn't mean what you think. The name is Saxon, predates Christianity, and has nothing to do with graves. The square in front of the cathedral was the original Norwich market before the current one was built. The story behind the name catches everyone out.",
  11: "One of the oldest river crossings in the city, used as a ducking stool site in the medieval period. People accused of being witches, scolds, or generally awkward got dunked here. Quiet now. Not always.",
  12: "Nearly a thousand years old, built from limestone shipped across from Caen in Normandy because the locals didn't think English stone was good enough. The cloisters are the largest in England. The spire is the second tallest. And the close around it is the only one in the country you can still walk through freely after dark.",
};

// Stop photos
const stopImages: Record<number, { src: string; alt: string }> = {
  1:  { src: "/images/tour/group-the-forum.jpg",     alt: "Walking tour group meeting at The Forum, Norwich's modern glass meeting hub on Millennium Plain." },
  2:  { src: "/images/tour/guide-guildhall.jpg",     alt: "Free Walking Tour Norwich guide explaining the chequerboard flintwork facade of Norwich Guildhall." },
  3:  { src: "/images/norwich-lane-stock.png",       alt: "The Norwich Lanes. Independent shops, cafés and hidden courtyards in Norwich city centre." },
  4:  { src: "/images/norwich-market-sun-stock.png", alt: "Norwich Market. One of England's oldest and largest outdoor markets." },
  5:  { src: "/images/the-arcade-stock.png",         alt: "The Arcade Norwich. Victorian shopping arcade with ornate ironwork." },
  7:  { src: "/images/norwich-castle.png",           alt: "Norwich Castle, Norman fortress overlooking the city" },
  9:  { src: "/images/tour/elm-hill-tour.jpg",        alt: "Elm Hill, Norwich's famous cobbled medieval street, on the Norwich Free Walking Tour" },
  11: { src: "/images/vamous-view-norwich.png",      alt: "View of Norwich from Fye Bridge over the River Wensum" },
  12: { src: "/images/norwich-cathedral-stock.png",  alt: "Norwich Cathedral. 900-year-old Norman cathedral with England's second-tallest spire." },
};

export default function TourPage() {
  return (
    <main className="bg-brand-bg pt-16">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="section-padding bg-brand-bg border-b border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            The tour
          </p>
          <h1 className="font-caveat text-5xl md:text-6xl font-bold mb-5 leading-tight">
            The Norwich walking tour. 12 stops. 1h 45m.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            The real Norwich, on foot, with someone who lives here. You&apos;ll cover a thousand years of history without realising it, hear the stories most guidebooks miss, and find out why the city has more medieval churches per square mile than anywhere else in Europe. No booking fee, no card needed. You only pay what the tour was worth at the end.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            We meet at The Forum, walk twelve stops through the old city, and finish near the Cathedral 1 hour 45 minutes later. Group size is capped at 15 so you can actually hear what&apos;s being said. Mon to Sat, rain or shine.
          </p>
          <a
            href="/book"
            className="btn-cta inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
          >
            Book your spot (free)
          </a>
          <p className="mt-3 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Free to book &bull; English language &bull; Near daily
          </p>
        </div>
      </section>

      {/* Route Map */}
      <section className="section-padding bg-brand-bg border-b border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-caveat text-4xl md:text-5xl font-bold">
              Map of the Route
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden max-w-xl mx-auto">
            <Image
              src="/images/route-map.png"
              alt="Hand-drawn route map of the Norwich Free Walking Tours showing all 12 stops from The Forum to Norwich Cathedral."
              width={1500}
              height={1155}
              className="w-full h-auto"
              priority
            />
            <p className="px-4 py-2 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Map of Norwich City Centre
            </p>
          </div>
        </div>
      </section>

      {/* Tour Stops */}
      <section className="section-padding bg-brand-bg">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Stop by stop
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold">
              What you&apos;ll see
            </h2>
          </div>
          <div className="flex flex-col gap-0">
            {tourStops.map((stop) => (
              <article key={stop.id} className="flex gap-5 pb-0">
                {/* Number + line */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-accent text-white font-bold text-sm flex items-center justify-center" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {stop.id}
                  </div>
                  {stop.id < tourStops.length && (
                    <div className="w-px flex-1 bg-brand-accent/20 mt-3 min-h-[2rem]" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 flex-1 min-w-0">
                  <h3 className="font-caveat text-3xl font-bold mb-2">
                    {stop.name}
                  </h3>

                  {/* Stop image where available */}
                  {stopImages[stop.id] && (
                    <div className="relative aspect-[16/7] rounded-xl overflow-hidden mb-4 shadow-sm">
                      <Image
                        src={stopImages[stop.id].src}
                        alt={stopImages[stop.id].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </div>
                  )}

                  <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {stopStories[stop.id]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pointed out, not visited */}
      <section className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Pointed out, not visited
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-4">
              A few extras you&apos;ll hear about along the way.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Bonus stops we&apos;ll mention if there&apos;s time, or point you towards for after the tour.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="bg-white rounded-xl p-5 border border-brand-accent/15 shadow-sm">
              <p className="font-caveat text-2xl font-bold text-brand-text mb-2">Cow Tower</p>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                Visible in the distance from Fye Bridge. Part of the medieval defences that paid for themselves in wool money.
              </p>
            </li>
            <li className="bg-white rounded-xl p-5 border border-brand-accent/15 shadow-sm">
              <p className="font-caveat text-2xl font-bold text-brand-text mb-2">Bishop Bridge</p>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                Pointed out from Fye Bridge. The story of the old gate, the river, and what happened to anyone who tried to dodge the toll.
              </p>
            </li>
            <li className="bg-white rounded-xl p-5 border border-brand-accent/15 shadow-sm">
              <p className="font-caveat text-2xl font-bold text-brand-text mb-2">Strangers&apos; Hall</p>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                The actual house of the Flemish weavers. We don&apos;t go in, but you&apos;ll know exactly who lived there and why it matters.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Who's running it */}
      <section className="section-padding bg-brand-bg border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="mb-6">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Your guide
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-6">
              Who&apos;s running it
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-sm p-6 md:p-8">
            <p className="text-base text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Tom. Local. Lives in Norwich, walks the city most days, and started this because the existing tours all seemed to skip the bits that make Norwich actually interesting. Not a costumed actor, not a script-reader. Just someone who likes telling people why this small city is worth their afternoon.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              If you&apos;ve got questions about anything beyond the route: where to eat, what to skip, where to drink. Ask. That&apos;s the point.
            </p>
          </div>
        </div>
      </section>

      {/* Common questions / FAQ */}
      <section className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              FAQ
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold">
              Common questions
            </h2>
          </div>
          <dl className="flex flex-col gap-4">
            {faqItems.map((item) => (
              <div key={item.q} className="bg-white rounded-xl border border-brand-accent/15 shadow-sm p-5 md:p-6">
                <dt className="font-semibold text-brand-text mb-2" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  {item.q}
                </dt>
                <dd className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="py-10 flex justify-center bg-brand-bg border-t border-brand-accent/10">
        <div className="text-center">
          <p className="text-base text-muted-foreground mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Pick a date, lock in a spot, turn up. That&apos;s it.
          </p>
          <a
            href="/book"
            className="btn-cta inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
          >
            Book your spot (free)
          </a>
          <p className="text-sm text-muted-foreground mt-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Booking required &bull; Free to book &bull; Near daily from The Forum
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
