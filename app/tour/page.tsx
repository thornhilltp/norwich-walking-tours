import Image from "next/image";
import type { Metadata } from "next";
import { tourStops } from "@/lib/tourStops";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "The Tour | Norwich Free Walking Tours",
  description:
    "12 stops through the real Norwich. Elm Hill, Norwich Cathedral, the Lanes, the Market and more. Near daily from The Forum. Book your spot free.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/tour",
  },
};

// Stop stories — humanized copy
const stopStories: Record<number, string> = {
  1: "A striking glass hub where modern life meets medieval history. It's the perfect spot to get your bearings. Your guide will be waiting here with a green map-pin flag.",
  2: "England's largest provincial medieval Guildhall, with the chequerboard flint walls that put Norwich on the postcards. Stand next to 600 years of law and order in the city's past. Below street level, the dungeon was still in use in the 19th century.",
  3: "A maze of independent shops and hidden alleys. Wander here to find the best local coffee and unique souvenirs. No chains, no franchise coffee. This is the Norwich locals actually use. Tom will point out Jarrolds (the city's department store since 1770), Elm, and Grosvenor Fish & Chips on the way through.",
  4: "Grab lunch in one of Britain's oldest and largest open-air markets, with its iconic colourful roof. Nine hundred years of buying and selling in the same spot. Colman's mustard was sold from a stall here for the best part of two centuries. Three industries that started in this city went global from streets like these: Colman's, Norwich Union (the start of UK insurance, founded 1797), and Gurneys Bank (which became Barclays).",
  5: "Elegant Victorian and Edwardian shopping. Escape the high street for a genuinely refined experience. Most people walk past the entrance without realising what's inside.",
  6: "The first pedestrianised street in the UK. London Street carries centuries of commerce and quiet rebellion. The history here didn't make it onto any plaque. Almost nobody in the city knows it.",
  7: "A massive Norman palace overlooking the city. The best place to visualise Norwich's medieval power and scale. Built on William the Conqueror's orders in 1067 and serving as a county gaol until 1887. Long before the Normans, this was Iceni country: Boudicca and her warriors fought the Romans on land just outside the city. And in 1549 the rebel leader Robert Kett was hanged from these very walls after his peasants' revolt against the enclosures.",
  8: "England's most complete medieval friary complex. This former 14th-century home of the Dominican 'Black Friars' now serves as the city's grandest venue for festivals and theatre. It's also where the Strangers worshipped: Dutch and Flemish Protestant weavers who arrived from 1565 fleeing religious persecution. They doubled the population of Norwich, brought their looms with them, and turned this into the second city of England for two centuries.",
  9: "Explore the city's most famous cobbled street, used as the Netflix filming location for Jingle Jangle. Stunning medieval buildings, largely unchanged since the 16th century.",
  10: "The Anglo-Saxon heart of the city. Learn Norwich's dark history and plague legends. Two medieval gates lead from here into the Cathedral Close: Erpingham Gate and Ethelbert Gate. A few minutes away, on Hay Hill, sits the statue of Sir Thomas Browne: 17th-century Norwich physician and author of Religio Medici, one of the first English-language books to make philosophy readable.",
  11: "The city's oldest river crossing with iconic 'postcard' views of the Wensum and stories of medieval punishments. It's a quiet spot now, mostly popular with ducks and people eating lunch from the market.",
  12: "Marvel at this 900-year-old icon, explore the church grounds and take a selfie with Paddington Bear. The spire is the second tallest in England. No queues. No entry fee. One of the great buildings of Europe and almost nobody knows it's here. The Cloisters are the largest medieval cloisters in England. Beside the Erpingham Gate stands the statue of Edith Cavell, the Norwich-trained nurse executed by the Germans in 1915 for helping Allied soldiers escape occupied Belgium. The Close itself was hit during the WW2 Baedeker raids of 1942, when the Luftwaffe targeted historic English cities. And a short walk south takes you to the cell of Julian of Norwich: medieval anchorite, mystic, and author of Revelations of Divine Love, the first book in English known to be written by a woman. Norwich is England's first UNESCO City of Literature for a reason.",
};

// Stop photos
const stopImages: Record<number, { src: string; alt: string }> = {
  3:  { src: "/images/norwich-lane-stock.png",       alt: "The Norwich Lanes. Independent shops, cafés and hidden courtyards in Norwich city centre." },
  4:  { src: "/images/norwich-market-sun-stock.png", alt: "Norwich Market. One of England's oldest and largest outdoor markets." },
  5:  { src: "/images/the-arcade-stock.png",         alt: "The Arcade Norwich. Victorian shopping arcade with ornate ironwork." },
  7:  { src: "/images/norwich-castle.png",           alt: "Norwich Castle, Norman fortress overlooking the city" },
  9:  { src: "/images/elm-hill-stock.png",           alt: "Elm Hill, Norwich's famous cobbled medieval street" },
  11: { src: "/images/vamous-view-norwich.png",      alt: "View of Norwich from Fye Bridge over the River Wensum" },
  12: { src: "/images/norwich-cathedral-stock.png",  alt: "Norwich Cathedral. 900-year-old Norman cathedral with England's second-tallest spire." },
};

export default function TourPage() {
  return (
    <main className="bg-brand-bg pt-16">
      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "The Tour", url: "/tour" }]} />
      {/* Hero */}
      <section className="section-padding bg-brand-bg border-b border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            The tour
          </p>
          <h1 className="font-caveat text-5xl md:text-6xl font-bold mb-5 leading-tight">
            The real Norwich. 12 stops. 2h.
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
              Your guide tells the story of these as you walk past, even though we don&apos;t stop at them. Here&apos;s what to look out for.
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
