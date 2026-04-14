import Image from "next/image";
import type { Metadata } from "next";
import { tourStops } from "@/lib/tourStops";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Tour | Norwich Free Walking Tour",
  description:
    "11 stops through the real Norwich. Elm Hill, Norwich Cathedral, the Lanes, the Market and more. Near daily from The Forum. Book your spot free.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/tour",
  },
};

// Stop stories — humanized copy
const stopStories: Record<number, string> = {
  1: "A striking glass hub where modern life meets medieval history. It's the perfect spot to get your bearings. Your guide will be waiting here with a green map-pin flag.",
  2: "England's largest provincial medieval Guildhall. Stand next to 600 years of law and order in the city's past. Below street level, the dungeon was still in use in the 19th century.",
  3: "A maze of independent shops and hidden alleys. Wander here to find the best local coffee and unique souvenirs. No chains, no franchise coffee. This is the Norwich locals actually use.",
  4: "Grab lunch in one of Britain's oldest and largest open-air markets with its iconic colourful roof. Nine hundred years of buying and selling in the same spot.",
  5: "Elegant Victorian and Edwardian shopping. Escape the high street for a genuinely refined experience. Most people walk past the entrance without realising what's inside.",
  6: "The first pedestrianised street in the UK — and almost nobody in the city knows it. London Street carries centuries of commerce and quiet rebellion. The history here didn't make it onto any plaque.",
  7: "A massive Norman palace overlooking the city. The best place to visualise Norwich's medieval power and scale. Built on William the Conqueror's orders in 1067 and serving as a county gaol until 1887.",
  8: "Explore the city's most famous cobbled street, often used as a film set. Stunning medieval buildings, largely unchanged since the 16th century. The locals have complicated feelings about it.",
  9: "The Anglo-Saxon heart of the city. Learn Norwich's dark history and plague legends. Two medieval gates lead from here into the Cathedral Close: Erpingham Gate and Ethelbert Gate.",
  10: "The city's oldest river crossing with iconic 'postcard' views of the Wensum and stories of medieval punishments. It's a quiet spot now, mostly popular with ducks and people eating lunch from the market.",
  11: "Marvel at this 900-year-old icon, explore the church grounds and take a selfie with Paddington Bear. The spire is the second tallest in England. No queues. No entry fee. One of the great buildings of Europe and almost nobody knows it's here.",
};

// Stop photos
const stopImages: Record<number, { src: string; alt: string }> = {
  3:  { src: "/images/norwich-lane-stock.png",       alt: "The Norwich Lanes — independent shops, cafés and hidden courtyards in Norwich city centre" },
  4:  { src: "/images/norwich-market-sun-stock.png", alt: "Norwich Market — one of England's oldest and largest outdoor markets" },
  5:  { src: "/images/the-arcade-stock.png",         alt: "The Arcade Norwich — Victorian shopping arcade with ornate ironwork" },
  7:  { src: "/images/norwich-castle.png",           alt: "Norwich Castle, Norman fortress overlooking the city" },
  8:  { src: "/images/elm-hill-stock.png",           alt: "Elm Hill, Norwich's famous cobbled medieval street" },
  10: { src: "/images/vamous-view-norwich.png",      alt: "View of Norwich from Fye Bridge over the River Wensum" },
  11: { src: "/images/norwich-cathedral-stock.png",  alt: "Norwich Cathedral — 900-year-old Norman cathedral with England's second-tallest spire" },
};

export default function TourPage() {
  return (
    <main className="bg-brand-bg pt-16">
      {/* Hero */}
      <section className="section-padding bg-brand-bg border-b border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            The tour
          </p>
          <h1 className="font-caveat text-5xl md:text-6xl font-bold mb-5 leading-tight">
            The real Norwich. 11 stops. 1h 45m.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Here&apos;s exactly what you&apos;ll see. Every stop has a story. The kind that didn&apos;t make it onto any blue plaque.
          </p>
          <a
            href="/book"
            className="btn-cta inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
          >
            Book your free spot
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
              alt="Norwich Free Walking Tour route map showing all 11 stops"
              width={1200}
              height={900}
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

      {/* Bottom CTA */}
      <div className="py-10 flex justify-center bg-brand-bg border-t border-brand-accent/10">
        <div className="text-center">
          <a
            href="/book"
            className="btn-cta inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-xl shadow-md"
          >
            Book your spot
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
