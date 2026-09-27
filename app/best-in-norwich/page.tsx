import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { WinnerLink } from "@/components/BestInNorwichLinks";
import { VoteBoard } from "@/components/VoteBoard";
import { getBoard } from "@/lib/binBoard";
import {
  BADGE_IMAGE,
  CONTENT_READY,
  PHASE,
  RESULTS_DATE,
  TOTAL_CATEGORIES,
  VOTE_PATH,
  VOTE_YEAR,
  VOTING_CLOSES,
  WINNERS_YEAR,
  WINNER_CATEGORIES,
  formatDate,
  mapsSearch,
} from "@/lib/best-in-norwich";

// /best-in-norwich — the winners guide, with the 2027 vote on the page.
//
// Two rewrites on 2026-08-30. First the essay came out: every winner is one
// line now. Then the vote came back in, as an actual form rather than a button
// to another page — which matches how the rest of the site works (the homepage
// embeds the booking widget instead of linking to /book).
//
// Order is deliberate: winners first, because that is what people arrive for
// and what ranks. The vote sits below with its own short statement of what
// these awards are for.
//
// /best-in-norwich/vote still exists, rendering the same VoteForm, so the
// ballot can be shared as a link of its own.
//
// Keep it short. If a section needs three paragraphs to justify itself, it
// does not belong here.
//
// CONTENT_READY gates indexing, the sitemap and the site-wide links.

// Board counts move, so the page is revalidated rather than baked at build
// time. VoteBoard also refreshes on mount, so a cached page is never stale to
// the person looking at it.
export const revalidate = 60;

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
    // Image comes from opengraph-image.tsx in this folder, generated from the
    // winners list so the two can never drift apart.
  },
  twitter: {
    card: "summary_large_image",
    title: `Best in Norwich ${WINNERS_YEAR}`,
    description: "Ten categories, picked by 25 locals. No fees, no sponsors.",
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

export default async function BestInNorwichPage() {
  const board = await getBoard();
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
        {/* ── Hero. Copy left, vote widget right — same shape as the
              homepage hero, which puts the booking widget in the same place.
              On a phone the widget lands directly under the headline. ───── */}
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="brand-container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] lg:grid-rows-[auto_auto] gap-x-10 lg:gap-x-14 gap-y-8 lg:gap-y-6 items-start">
              <div className="lg:col-start-1 lg:row-start-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-brand-accent-light px-4 py-1.5 text-sm font-semibold text-brand-accent">
                    Best in Norwich {WINNERS_YEAR}
                  </span>
                  <span className="text-sm text-muted-foreground" style={lora}>
                    {TOTAL_CATEGORIES} winners · no fees, no sponsors
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

                <p
                  className="text-lg text-brand-text leading-relaxed max-w-xl"
                  style={{ fontWeight: 700 }}
                >
                  The best places here have no marketing budget. That is the whole point
                  of this.
                </p>
              </div>

              {voteOpen && (
                <div
                  id="vote"
                  className="w-full max-w-md mx-auto lg:mx-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 scroll-mt-24"
                >
                  <VoteBoard initialCategories={board} />
                </div>
              )}

              <div className="lg:col-start-1 lg:row-start-2">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl" style={lora}>
                  Ten winners for {WINNERS_YEAR}, picked by about 25 locals we know. So we
                  have missed things, and {VOTE_YEAR} is not our call: six categories, no
                  shortlist, and nobody can buy their way in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── The winners. Own band, own heading, so the hero has room to
              breathe instead of the cards running straight on from it. ──── */}
        <section className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
          <div className="brand-container">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={lora}
              >
                The results
              </p>
              <h2 className="mb-3 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  The {WINNERS_YEAR} winners.
                </span>
                <span className="block font-caveat text-4xl md:text-5xl font-bold text-brand-accent">
                  Every category.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
                Go and give them your money. That is the whole point of a list like this.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {WINNER_CATEGORIES.map((category) => {
                const winner = category.winner;

                return (
                  <article
                    key={category.key}
                    className="flex flex-col bg-brand-white rounded-xl border border-brand-text/5 shadow-sm overflow-hidden"
                  >
                    {/* Every card gets an image block, photo or not. Half the
                        winners have photography and half do not, and letting
                        that show made the grid jump about. */}
                    <div className="relative aspect-[16/10] bg-brand-accent-light">
                      {winner?.image ? (
                        <Image
                          src={winner.image.src}
                          alt={winner.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                          className="object-cover"
                          style={
                            winner.image.position
                              ? { objectPosition: winner.image.position }
                              : undefined
                          }
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center font-caveat text-6xl font-bold text-brand-accent/40"
                        >
                          {winner?.name?.replace(/^(The|A)\s+/i, "").charAt(0) ?? "?"}
                        </span>
                      )}

                      <span
                        className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-accent shadow-sm"
                        style={lora}
                      >
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {WINNERS_YEAR} winner
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      <p
                        className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-1.5"
                        style={lora}
                      >
                        {category.label}
                      </p>

                      {winner ? (
                        <>
                          <h3
                            className="text-xl font-bold text-brand-text leading-snug"
                            style={lora}
                          >
                            {winner.name}
                          </h3>
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
                        <h3 className="text-xl font-bold text-brand-text" style={lora}>
                          Still counting.
                        </h3>
                      )}

                      {voteOpen && (
                        <a
                          href="#vote"
                          className="mt-auto pt-4 text-sm font-semibold text-brand-accent underline-offset-4 hover:underline"
                          style={lora}
                        >
                          Think someone is better? Vote →
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How this was decided. Short, and load-bearing. ──────────── */}
        <section className="py-12 sm:py-14 border-t border-brand-accent/10">
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
              <p className="text-lg text-muted-foreground leading-relaxed mb-4" style={lora}>
                Not a public vote. About 25 people we know, all living here, arguing it
                out. Everything on the list is independent and local, nobody paid, and
                most winners had no idea they were in it.
              </p>
              <p className="text-lg text-brand-text leading-relaxed" style={{ ...lora, fontWeight: 700 }}>
                {voteOpen ? (
                  <>
                    {VOTE_YEAR} is yours.{" "}
                    <Link href={VOTE_PATH} className="text-brand-accent underline underline-offset-4">
                      Vote here
                    </Link>
                    , closing {formatDate(VOTING_CLOSES)}, winners {formatDate(RESULTS_DATE)}.
                  </>
                ) : (
                  <>Winners for {VOTE_YEAR} announced {formatDate(RESULTS_DATE)}.</>
                )}
              </p>
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
