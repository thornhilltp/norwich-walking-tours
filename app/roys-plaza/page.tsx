import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { PetitionWidget } from "@/components/PetitionWidget";
import { RoysPlazaMap } from "@/components/RoysPlazaMap";
import { DEMANDS } from "@/lib/petition";

// /roys-plaza — parody petition page to accompany the "Rename Anglia Square
// to Roy's Plaza" video. Not a real petition. Nothing is submitted anywhere.
// The disclaimer band at the bottom is load-bearing: keep it.
//
// Signatures go to public.roys_plaza_signatures in Supabase via /api/petition.

const CANONICAL = "https://www.norwichfreewalkingtours.co.uk/roys-plaza";

export const metadata: Metadata = {
  title: "Rename Anglia Square to Roy's Plaza | The Petition",
  description:
    "They're rebuilding Anglia Square and nobody asked Norfolk what to call it. One simple request: rename it Roy's Plaza. Sign the petition.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Rename Anglia Square to Roy's Plaza",
    description:
      "The most important petition Norwich has ever seen. One simple request. Rename it Roy's Plaza.",
    url: CANONICAL,
    type: "website",
    images: [{ url: "/images/roys-plaza-render-street.jpg", width: 1600, height: 1104 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rename Anglia Square to Roy's Plaza",
    description: "One simple request. Sign the petition.",
    images: ["/images/roys-plaza-render-street.jpg"],
  },
};

export default function RoysPlazaPage() {
  return (
    <>
      <main className="bg-brand-bg pt-16">
        {/* ── Hero + signature widget ──────────────────────────────────── */}
        <section className="section-padding">
          <div className="brand-container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-brand-accent-light px-4 py-1.5 text-sm font-semibold text-brand-accent">
                    Official petition
                  </span>
                  <span
                    className="text-sm text-muted-foreground"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    To Norwich City Council
                  </span>
                </div>

                <h1 className="mb-6 leading-[1.05]">
                  <span
                    className="block text-3xl md:text-4xl font-bold text-brand-text"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    Rename Anglia Square
                  </span>
                  <span className="block font-caveat text-6xl md:text-7xl font-bold text-brand-accent">
                    Roy&apos;s Plaza
                  </span>
                </h1>

                <div
                  className="space-y-4 max-w-xl"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  <p className="text-xl text-brand-text leading-relaxed" style={{ fontWeight: 700 }}>
                    Norwich. It&apos;s time we had a serious conversation about Anglia Square.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    They&apos;re redoing Anglia Square, and they&apos;ve asked nobody what to call
                    it. We have a once-in-a-generation chance to right a wrong in this city.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    One simple request. Rename it Roy&apos;s Plaza. Back-to-back Roys all over
                    Anglia Square, front and centre where it belongs.
                  </p>
                  <p className="text-lg text-brand-text leading-relaxed" style={{ fontWeight: 700 }}>
                    If you&apos;re from Norfolk, this affects you.
                  </p>
                </div>

                <div className="mt-8">
                  <Image
                    src="/images/roys-plaza-logo.png"
                    alt="Roy's Plaza"
                    width={900}
                    height={636}
                    priority
                    sizes="(max-width: 640px) 60vw, 260px"
                    className="w-44 sm:w-56 h-auto"
                  />
                </div>
              </div>

              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-24">
                <PetitionWidget />
              </div>
            </div>
          </div>
        </section>

        {/* ── The case ─────────────────────────────────────────────────── */}
        <section className="section-padding bg-brand-accent-light">
          <div className="brand-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <p
                  className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  The case for Roy&apos;s Plaza
                </p>
                <h2 className="mb-6 leading-tight">
                  <span
                    className="block text-2xl md:text-3xl font-bold text-brand-text"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    Roys isn&apos;t just a shop.
                  </span>
                  <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                    Roys is Norfolk.
                  </span>
                </h2>
                <div
                  className="space-y-4"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every county has the handful of names that actually mean something. Ours are
                    Colman&apos;s mustard. Jarrolds. Delia. Alan Partridge, whether we like it or
                    not. And Roys.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Two brothers opened a general store in Coltishall in 1895. It moved to Wroxham
                    and grew into the World&apos;s Largest Village Store, a title won in a
                    competition and never given back. Generations of Norfolk people have been
                    dragged round it on a wet Sunday. You know Roys. Your nan knows Roys.
                  </p>
                  <p className="text-lg text-brand-text leading-relaxed" style={{ fontWeight: 700 }}>
                    This isn&apos;t a Norwich shop that Norfolk borrowed.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    It&apos;s a Norfolk institution, out of Coltishall by way of Wroxham, that
                    Norwich was lucky enough to get a piece of. Which brings us to the part that
                    should make your blood boil.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Roys opened a store in Anglia Square in 1996. For five years the place actually
                    made sense. Then in 2001 it closed. We had it. We lost it. Nobody has ever been
                    held accountable.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-5">
                  Meanwhile, the square itself
                </h3>
                <div
                  className="space-y-4"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Anglia Square opened in July 1970 and has been a stain on this city ever since.
                    Fifty-five years of wet concrete, dead escalators and a car park you can see from
                    space.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    It shut for good in November 2025. The bulldozers went in the same month. Around
                    1,100 homes are going up in its place.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    So the slate is genuinely blank. Every other city gets to name its own square.
                    Nobody has asked us a single question about ours.
                  </p>
                  <p className="text-lg text-brand-text leading-relaxed" style={{ fontWeight: 700 }}>
                    This is the most important petition Norwich has ever seen.
                  </p>
                </div>

                <div className="mt-8 rounded-xl bg-brand-white p-6 border border-brand-text/5">
                  <p className="font-caveat text-3xl font-bold text-brand-text mb-2">In short</p>
                  <p
                    className="text-lg text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    A much-loved institution was thrown out of a building that everybody hated. The
                    building is now rubble. The institution is still going. You do the maths.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── The demands ladder ───────────────────────────────────────── */}
        <section className="section-padding">
          <div className="brand-container">
            <div className="max-w-3xl mb-10">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                What your signature unlocks
              </p>
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  We are reasonable people.
                </span>
                <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                  We start small.
                </span>
              </h2>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Each milestone escalates the ask. Sign once and you are counted towards all three.
              </p>
            </div>

            <ol className="space-y-8">
              {DEMANDS.map((demand, i) => (
                <li
                  key={demand.key}
                  className="bg-brand-white rounded-xl border border-brand-text/5 shadow-sm overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 sm:p-8 order-2 md:order-1">
                      <p className="font-caveat text-5xl font-bold text-brand-accent leading-none mb-1">
                        {demand.threshold.toLocaleString("en-GB")}
                      </p>
                      <p
                        className="text-sm text-muted-foreground uppercase tracking-widest mb-5"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        signatures
                      </p>
                      <p
                        className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-1"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        Stage {i + 1}. {demand.short}
                      </p>
                      <p
                        className="text-xl md:text-2xl text-brand-text leading-snug mb-3"
                        style={{
                          fontFamily: "var(--font-lora), Georgia, serif",
                          fontWeight: 700,
                        }}
                      >
                        {demand.headline}
                      </p>
                      <p
                        className="text-base text-muted-foreground leading-relaxed"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        {demand.detail}
                      </p>
                    </div>

                    {demand.image ? (
                      <div className="relative order-1 md:order-2 aspect-[16/11] md:aspect-auto md:min-h-[300px]">
                        <Image
                          src={demand.image.src}
                          alt={demand.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 550px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="order-1 md:order-2 flex items-center justify-center bg-brand-accent-light p-8">
                        <p className="font-caveat text-4xl md:text-5xl font-bold text-brand-accent text-center leading-tight">
                          Site plan below.
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-l-4 border-brand-text/15 pl-6 max-w-2xl">
              <p
                className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                At 0 signatures
              </p>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Norwich gets exactly the square it deserves.
              </p>
            </div>
          </div>
        </section>

        {/* ── Stage three, visualised ──────────────────────────────────── */}
        <section className="section-padding bg-brand-accent-light">
          <div className="brand-container">
            <div className="max-w-3xl mb-8">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Proposed revision
              </p>
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  We&apos;ve gone ahead and
                </span>
                <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                  updated the map.
                </span>
              </h2>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                No sense waiting around. Here is the site as it should look once all three stages
                land, with every unit allocated and the statue marked in the middle.
              </p>
            </div>
            <RoysPlazaMap />
          </div>
        </section>

        {/* ── Disclaimer band. Deliberately dry. Do not remove. ─────────── */}
        <section className="border-t border-brand-text/10 bg-brand-bg py-10">
          <div className="brand-container">
            <p
              className="max-w-3xl text-sm leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              This page is a parody and is not a real petition. It has no affiliation with,
              endorsement from or connection to Roys, Norwich City Council, Aviva Capital Partners
              or the Anglia Square Investment Partnership. Nothing signed here is submitted to any
              authority, and no decision about the naming of the Anglia Square development rests
              with us in any way. The images are published development visuals and planning
              documents that we have drawn on top of for comedic effect, and are not real proposals.
              Your email is only used to email you if you tick the box asking us to. It is a joke,
              but the affection for Roys is genuine.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
