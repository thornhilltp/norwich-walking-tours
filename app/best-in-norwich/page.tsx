import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { WinnerLink } from "@/components/BestInNorwichLinks";
import {
  BADGE_IMAGE,
  CONTENT_READY,
  PHASE,
  RESULTS_DATE,
  TOTAL_BALLOT_CATEGORIES,
  TOTAL_CATEGORIES,
  VOTE_PATH,
  VOTE_YEAR,
  VOTING_CLOSES,
  WINNERS_YEAR,
  WINNER_CATEGORIES,
  formatDate,
  mapsSearch,
} from "@/lib/best-in-norwich";

// /best-in-norwich — the winners guide.
//
// Rewritten 2026-08-30. The first version carried the winners AND the ballot
// AND the rules AND a timeline, and read like an essay. The vote now lives at
// /best-in-norwich/vote and this page has one job: answer "where is the best
// coffee in Norwich" in as few words as possible.
//
// Keep it short. Every winner is one line. If a section needs three paragraphs
// to justify itself, it belongs on the vote page or nowhere.
//
// CONTENT_READY gates indexing, the sitemap and the site-wide links.

const CANONICAL = "https://www.norwichfreewalkingtours.co.uk/best-in-norwich";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export const metadata: Metadata = {
  title: `Best in Norwich ${WINNERS_YEAR} | The Winners, Picked By Locals`,
  description: `The best coffee, pasta, pizza, bakery and market stall in Norwich for ${WINNERS_YEAR}, picked by 25 locals. No fees, no sponsors.`,
  alternates: { canonical: CANONICAL },
  robots: CONTENT_READY ? undefined : { index: false, follow: false },
  openGraph: {
    title: `Best in Norwich ${WINNERS_YEAR}`,
    description: `Ten categories, picked by 25 locals. No fees, no sponsors. ${VOTE_YEAR} is open to everyone.`,
    url: CANONICAL,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Best in Norwich ${WINNERS_YEAR}`,
    description: "Ten categories, picked by 25 locals. No fees, no sponsors.",
    images: ["/og-image.jpg"],
  },
};

const winnersWithData = WINNER_CATEGORIES.filter((c) => c.winner);

// ItemList naming the winners. Deliberately no Review or aggregateRating — we
// are not a review platform and rating markup about other people's businesses
// is a policy risk.
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Best in Norwich ${WINNERS_YEAR}`,
  numberOfItems: winnersWithData.length,
  itemListElement: winnersWithData.map((category, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${category.label}: ${category.winner!.name}`,
    ...(category.winner!.url ? { url: category.winner!.url } : {}),
  })),
};

export default function BestInNorwichPage() {
  const voteOpen = PHASE === "voting-open" || PHASE === "nominations-open";

  return (
    <>
      {winnersWithData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <main className="bg-brand-bg pt-16">
        {/* ── Hero. Two lines, then straight into the winners. ──────────── */}
        <section className="pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="brand-container">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center rounded-full bg-brand-accent-light px-4 py-1.5 text-sm font-semibold text-brand-accent">
                  Best in Norwich {WINNERS_YEAR}
                </span>
                <span className="text-sm text-muted-foreground" style={lora}>
                  {TOTAL_CATEGORIES} categories · no fees, no sponsors
                </span>
              </div>

              <h1 className="mb-4 leading-[1.05]">
                <span
                  className="block text-3xl md:text-4xl font-bold text-brand-text"
                  style={lora}
                >
                  The best of Norwich,
                </span>
                <span className="block font-caveat text-5xl sm:text-6xl md:text-7xl font-bold text-brand-accent">
                  argued over by locals.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
                Where we send people when they ask on tour. Twenty-five locals argued it
                out, and nobody paid a penny to be here.
              </p>

              {voteOpen && (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={VOTE_PATH}
                    className="inline-flex items-center justify-center rounded-full bg-brand-accent px-7 py-3.5 text-2xl font-bold text-brand-white shadow-lg transition hover:opacity-90 min-h-[52px]"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    Vote for {VOTE_YEAR}
                  </Link>
                  <p className="text-sm text-muted-foreground" style={lora}>
                    {TOTAL_BALLOT_CATEGORIES} categories, no shortlist. Closes{" "}
                    {formatDate(VOTING_CLOSES)}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── The winners. The whole point of the page. ─────────────────── */}
        <section className="pb-14 sm:pb-16">
          <div className="brand-container">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {WINNER_CATEGORIES.map((category) => {
                const winner = category.winner;

                return (
                  <article
                    key={category.key}
                    className="flex flex-col bg-brand-white rounded-xl border border-brand-text/5 shadow-sm overflow-hidden"
                  >
                    {winner?.image && (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={winner.image.src}
                          alt={winner.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-5">
                      <p
                        className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-1.5"
                        style={lora}
                      >
                        {category.label}
                      </p>

                      {winner ? (
                        <>
                          <h2
                            className="text-xl font-bold text-brand-text leading-snug"
                            style={lora}
                          >
                            {winner.name}
                          </h2>
                          {winner.why && (
                            <p
                              className="mt-1.5 text-base text-muted-foreground leading-snug"
                              style={lora}
                            >
                              {winner.why}
                            </p>
                          )}

                          <div className="mt-4 flex flex-wrap gap-2">
                            {winner.url && (
                              <WinnerLink
                                href={winner.url}
                                category={category.key}
                                winner={winner.name}
                                linkType="website"
                              >
                                Website
                              </WinnerLink>
                            )}
                            <WinnerLink
                              href={winner.mapsUrl ?? mapsSearch(winner.name)}
                              category={category.key}
                              winner={winner.name}
                              linkType="map"
                            >
                              Map
                            </WinnerLink>
                          </div>
                        </>
                      ) : (
                        <h2 className="text-xl font-bold text-brand-text" style={lora}>
                          Still counting.
                        </h2>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How it was decided. Short, and load-bearing for credibility. ─ */}
        <section className="py-12 sm:py-14 bg-brand-accent-light">
          <div className="brand-container">
            <div className="max-w-2xl">
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  Twenty-five locals.
                </span>
                <span className="block font-caveat text-4xl md:text-5xl font-bold text-brand-accent">
                  That was the whole panel.
                </span>
              </h2>
              <div className="space-y-3" style={lora}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Not a public vote. About 25 people we know, all living here, arguing it
                  out. So we have missed things. Everything here is independent and local,
                  nobody paid, and most winners had no idea they were in it.
                </p>
                <p
                  className="text-lg text-brand-text leading-relaxed"
                  style={{ fontWeight: 700 }}
                >
                  {voteOpen ? (
                    <>
                      {VOTE_YEAR} is not our call.{" "}
                      <Link
                        href={VOTE_PATH}
                        className="text-brand-accent underline underline-offset-4"
                      >
                        Open vote, no shortlist
                      </Link>
                      , closing {formatDate(VOTING_CLOSES)}. Winners announced{" "}
                      {formatDate(RESULTS_DATE)}.
                    </>
                  ) : (
                    <>
                      Winners for {VOTE_YEAR} announced {formatDate(RESULTS_DATE)}.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── For winners: the badge. Hidden until the art exists. ──────── */}
        {BADGE_IMAGE && (
          <section className="py-12 sm:py-14">
            <div className="brand-container">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center max-w-3xl">
                <Image
                  src={BADGE_IMAGE.src}
                  alt={BADGE_IMAGE.alt}
                  width={220}
                  height={220}
                  className="w-36 md:w-48 h-auto mx-auto md:mx-0"
                />
                <div>
                  <h2 className="font-caveat text-4xl font-bold text-brand-accent mb-2">
                    Won something? Put it in the window.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
                    Yours to use however you like, free.{" "}
                    <a
                      href="mailto:hello@norwichfreewalkingtours.co.uk?subject=Best%20in%20Norwich%20badge"
                      className="text-brand-accent underline underline-offset-4"
                    >
                      Email us
                    </a>{" "}
                    for the print-quality file.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Tour CTA ──────────────────────────────────────────────────── */}
        <section className="py-12 sm:py-14">
          <div className="brand-container">
            <div className="max-w-2xl">
              <h2 className="mb-3 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  We wrote this because
                </span>
                <span className="block font-caveat text-4xl md:text-5xl font-bold text-brand-accent">
                  people keep asking us.
                </span>
              </h2>
              <p
                className="text-lg text-muted-foreground leading-relaxed mb-5"
                style={lora}
              >
                Come on the tour and ask us the ones that are not on this page. Free to
                book, and you decide at the end what it was worth.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <TrackedBookLink
                  location="best_in_norwich"
                  className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-4 text-2xl font-bold text-brand-white shadow-lg transition hover:opacity-90 min-h-[52px]"
                >
                  <span style={{ fontFamily: "var(--font-caveat), cursive" }}>
                    Book the walking tour
                  </span>
                </TrackedBookLink>
                <Link
                  href="/tour"
                  className="text-lg font-semibold text-brand-accent underline-offset-4 hover:underline"
                  style={lora}
                >
                  See the route
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
