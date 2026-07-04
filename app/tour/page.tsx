import Image from "next/image";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { tourStops } from "@/lib/tourStops";
import { tourReviews } from "@/lib/testimonials";
import { Footer } from "@/components/Footer";
import { ScrollTrail } from "@/components/ScrollTrail";

export const metadata: Metadata = {
  title: "Norwich Walking Tour | 12 Stops, 2 Hours",
  description:
    "12 stops through the real Norwich. Elm Hill, Norwich Cathedral, the Lanes, the Market and more. Daily from The Forum. Book your spot free.",
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
    a: "School-age and up tend to enjoy it. Under 5s might find 2 hours a stretch.",
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
    a: "About 2 hours, give or take. Roughly 2.5 km of easy, mostly flat walking. No big hikes.",
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

// Aha moment per stop — the headline you scan. The full story sits behind a
// tap (still in the DOM, so it stays crawlable). Keys follow the 2-hour
// route order in lib/tourStops.ts. Drawn from the stories below, nothing new.
const stopHooks: Record<number, string> = {
  1: "Half a million books burned here.",
  2: "Where the witch trials happened.",
  3: "The streets the developers never got.",
  4: "One building. Six lives.",
  5: "Saved by a single vote.",
  6: "They ducked witches here.",
  7: "Nothing to do with graves.",
  8: "Its stone was shipped from France.",
  9: "Britain's first car-free street.",
  10: "A palace that spent its life as a prison.",
  11: "Frozen in 1899.",
  12: "A thousand years of trading. And lunch.",
};

// Stop stories — the full read, revealed on tap.
const stopStories: Record<number, string> = {
  1: "We start where Norwich nearly didn't. The Forum was built in 2001 on the site of the old library, which burned down in 1994 and took half a million books with it. Look up at the curve of the building. It's deliberately shaped to mirror the cathedral spire across the city.",
  2: "England's largest surviving medieval guildhall, built when Norwich was the country's second city. The witch trials happened here. So did most of the city's important business for nearly 500 years. The flint chequerboard pattern on the front wall is showing off, and we'll talk about why.",
  3: "A maze of independent shops, hidden courtyards, and Tudor buildings the developers somehow never got hold of. This was the medieval shopping district. Walk slowly. Half the fun is what you spot in the side alleys you'd never find on your own.",
  4: "Originally a Dominican friary, then a town hall, then a synagogue, then a fire station, now a concert venue. One building, six lives. The roof beams are the original 14th-century timber.",
  5: "The most photographed street in Norwich and the closest you'll come to walking through a Tudor film set. Nearly demolished in the 1920s for being \"slum housing.\" Saved by a single vote on the city council. We'll show you exactly where the vote was cast.",
  6: "One of the oldest river crossings in the city, used as a ducking stool site in the medieval period. People accused of being witches, scolds, or generally awkward got dunked here. Quiet now. Not always.",
  7: "Doesn't mean what you think. The name is Saxon, predates Christianity, and has nothing to do with graves. The square in front of the cathedral was the original Norwich market before the current one was built. The story behind the name catches everyone out.",
  8: "Nearly a thousand years old, built from limestone shipped across from Caen in Normandy because the locals didn't think English stone was good enough. The cloisters are the largest in England. The spire is the second tallest. And the close around it is the only one in the country you can still walk through freely after dark.",
  9: "The first pedestrianised shopping street in the UK, going car-free in 1967. A small thing, but Norwich got there before everyone else. We'll talk about why this matters more than it sounds.",
  10: "A Norman keep built to remind the locals who was in charge. It worked. For most of its life it was a prison, and the stories from that period are not for the squeamish. Recently reopened after a major restoration, and now arguably the most impressive medieval royal palace in England you've never heard of.",
  11: "Norwich's small slice of Victorian shopping theatre. Built in 1899, decorated with art nouveau tiles, and one of the few places in the city that feels frozen in time. Walk through it slowly. The tiles tell their own story.",
  12: "Trading on the same patch of ground since the 11th century. One of the largest open-air markets in England and the most colourful from above. And this is where we finish: right in the heart of the city, surrounded by some of the best cheap lunch in Norwich. Ask your guide where they'd eat.",
};

// Stop photos — keyed to the route order.
const stopImages: Record<number, { src: string; alt: string }> = {
  1:  { src: "/images/tour/group-the-forum.jpg",     alt: "Walking tour group meeting at The Forum, Norwich's modern glass meeting hub on Millennium Plain." },
  2:  { src: "/images/tour/guide-guildhall.jpg",     alt: "Free Walking Tour Norwich guide explaining the chequerboard flintwork facade of Norwich Guildhall." },
  3:  { src: "/images/norwich-lane-stock.png",       alt: "The Norwich Lanes. Independent shops, cafés and hidden courtyards in Norwich city centre." },
  5:  { src: "/images/tour/elm-hill-tour.jpg",        alt: "Elm Hill, Norwich's famous cobbled medieval street, on the Norwich Free Walking Tour" },
  6:  { src: "/images/vamous-view-norwich.png",      alt: "View of Norwich from Fye Bridge over the River Wensum" },
  8:  { src: "/images/norwich-cathedral-stock.png",  alt: "Norwich Cathedral. 900-year-old Norman cathedral with England's second-tallest spire." },
  10: { src: "/images/norwich-castle.png",           alt: "Norwich Castle, Norman fortress overlooking the city" },
  11: { src: "/images/the-arcade-stock.png",         alt: "The Arcade Norwich. Victorian shopping arcade with ornate ironwork." },
  12: { src: "/images/norwich-market-sun-stock.png", alt: "Norwich Market. One of England's oldest and largest outdoor markets, where the tour finishes." },
};

// Per-card colour for the vibe-check review notes (mid tone tape, dark name).
const noteColors = [
  { tape: "#2DA96B", name: "#1A6B47" },
  { tape: "#E8734A", name: "#B44A28" },
  { tape: "#D99A2B", name: "#8A5E10" },
];

// Render **key phrase** markers as a handwritten green highlight.
function renderMarks(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span
        key={i}
        style={{
          fontFamily: "var(--font-caveat), cursive",
          fontWeight: 700,
          fontSize: "1.3em",
          lineHeight: 1,
          color: "#1A6B47",
        }}
      >
        {part.slice(2, -2)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function TourPage() {
  return (
    <main className="bg-brand-bg pt-16">
      <ScrollTrail
        sections={[
          { id: "top", label: "Top" },
          { id: "map", label: "Map" },
          { id: "stops", label: "Stops" },
          { id: "reviews", label: "Vibe" },
          { id: "guide", label: "Guide" },
          { id: "faq", label: "FAQ" },
        ]}
      />
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section id="top" className="relative isolate section-padding">
        <Image
          src="/images/tour/group-cathedral-lawn.jpg"
          alt="Tour group walking through Norwich city centre on the Norwich Free Walking Tour"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative brand-container max-w-3xl mx-auto text-center">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            The tour
          </p>
          <h1 className="font-caveat text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            The Norwich walking tour. 12 stops. 2 hours.
          </h1>
          <p className="font-lora text-lg text-white/85 leading-relaxed mb-8">
            The real Norwich, on foot, with someone who lives here.
          </p>
          <TrackedBookLink
            location="tour_hero"
            className="inline-flex items-center justify-center h-12 px-8 bg-brand-accent text-white font-lora font-semibold text-base rounded-xl hover:bg-brand-accent/90 transition-colors duration-150"
          >
            Book your spot (free)
          </TrackedBookLink>
          <p className="mt-4 text-sm text-white/70 font-lora">
            Free to book &bull; Daily &bull; Pay what it was worth at the end
          </p>
        </div>
      </section>

      {/* The route — map first. The old three-paragraph block is gone; the
          keywords live on in the stop hooks + stories below. */}
      <section id="map" className="section-padding bg-brand-bg border-b border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            The route
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-4">
            The whole city in one loop.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Two hours, about 2.5 easy kilometres, twelve stops. We start at The Forum and finish at Norwich Market, right in time for lunch. Elm Hill, the Cathedral, the Castle, the Lanes and Tombland in between. Nothing flat-out, no big hikes.
          </p>
          <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden">
            <Image
              src="/images/route-map.png"
              alt="Route map of the Norwich Free Walking Tours showing all 12 stops, starting at The Forum and finishing at Norwich Market."
              width={1500}
              height={1155}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Tour stops — hook first, story on tap. Native <details> keeps every
          word in the HTML (crawlable) while scanners get twelve punches. */}
      <section id="stops" className="section-padding bg-brand-bg">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Stop by stop
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-3">
              Twelve moments, one walk.
            </h2>
            <p className="text-base text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Tap any stop to read the story.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {tourStops.map((stop) => (
              <details
                key={stop.id}
                className="group bg-white rounded-xl border border-brand-accent/15 shadow-sm overflow-hidden"
              >
                <summary className="list-none [&::-webkit-details-marker]:hidden flex items-center gap-4 p-5 cursor-pointer">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-accent text-white font-bold text-sm flex items-center justify-center"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {stop.id}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                      {stop.name}
                    </span>
                    <span className="block font-caveat text-2xl md:text-[28px] font-bold text-brand-accent leading-[1.1]">
                      {stopHooks[stop.id]}
                    </span>
                  </span>
                  <ChevronDown
                    className="tour-stop-chevron flex-shrink-0 w-5 h-5 text-brand-accent"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-5">
                  {stopImages[stop.id] && (
                    <div className="relative aspect-[16/8] rounded-lg overflow-hidden mb-4 shadow-sm">
                      <Image
                        src={stopImages[stop.id].src}
                        alt={stopImages[stop.id].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 640px"
                      />
                    </div>
                  )}
                  <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    {stopStories[stop.id]}
                  </p>
                </div>
              </details>
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

      {/* Vibe check — is this my kind of thing? Proof + fit, minimal text. */}
      <section id="reviews" className="section-padding bg-brand-bg border-t border-brand-accent/10">
        <div className="brand-container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Will it be your thing?
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold">
              What it&apos;s actually like.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tourReviews.map((review, idx) => {
              const c = noteColors[idx % noteColors.length];
              const rotate = idx % 2 === 0 ? "-1.2deg" : "1deg";
              return (
                <div
                  key={review.id}
                  className="relative bg-white border border-[#EAE0D4] rounded-[4px] px-5 pt-6 pb-4 shadow-[2px_7px_17px_-10px_rgba(90,70,40,0.5)]"
                  style={{ transform: `rotate(${rotate})` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-[10px] left-1/2 w-16 h-5 rounded-[3px]"
                    style={{ transform: "translateX(-50%) rotate(-2deg)", backgroundColor: c.tape, borderTop: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
                  />
                  <p className="text-[19px] leading-[1.4] mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#000" }}>
                    {renderMarks(review.pullQuote)}
                  </p>
                  <div className="border-t border-[#F0E9DF] pt-3">
                    <div className="text-[23px] font-bold leading-none" style={{ fontFamily: "var(--font-caveat), cursive", color: c.name }}>
                      {review.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                      {review.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-lg text-brand-text leading-relaxed max-w-2xl mx-auto mt-10" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Relaxed pace, mostly flat, no big hikes. Kids from about six do fine, dogs are welcome, and rain doesn&apos;t stop us. If that sounds like your kind of morning, it probably is.
          </p>

          <div className="text-center mt-8">
            <TrackedBookLink
              location="tour_reviews"
              className="btn-cta inline-flex items-center justify-center px-8 py-3.5 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg shadow-md"
            >
              Sounds like you? Book your spot (free)
            </TrackedBookLink>
          </div>
        </div>
      </section>

      {/* Your guide */}
      <section id="guide" className="section-padding bg-brand-accent-light/40 border-t border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              Your guide
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold">
              Who&apos;s running it.
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-sm p-6 md:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            {/* Polaroid portrait — a face converts, especially for visitors
                arriving cold from search who've never seen the guide. */}
            <div className="flex-shrink-0 bg-white p-2.5 pb-8 shadow-lg border border-brand-text/5 rotate-[-2deg]">
              <div className="relative w-40 aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/tom-portrait.jpg"
                  alt="Tom Thornhill, founder and guide of the Norwich Free Walking Tour"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <p className="text-center font-caveat text-2xl font-bold text-brand-text mt-1">Tom</p>
            </div>
            <div>
              <p className="text-base text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                Tom. Local. Lives in Norwich, walks the city most days, and started this because the existing tours all seemed to skip the bits that make Norwich actually interesting. Not a costumed actor, not a script-reader. Just someone who likes telling people why this small city is worth their afternoon.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                Got questions about anything beyond the route: where to eat, what to skip, where to drink? Ask. That&apos;s the point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common questions / FAQ */}
      <section id="faq" className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
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
          <TrackedBookLink
            location="tour_bottom"
            className="btn-cta inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
          >
            Book your spot (free)
          </TrackedBookLink>
          <p className="text-sm text-muted-foreground mt-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Booking required &bull; Free to book &bull; Daily from The Forum
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
