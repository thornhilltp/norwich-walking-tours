import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { WinnerLink } from "@/components/BestInNorwichLinks";
import { VoteForm } from "@/components/VoteForm";
import {
  BADGE_IMAGE,
  CATEGORIES,
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
                  <a
                    href="#vote"
                    className="inline-flex items-center justify-center rounded-full bg-brand-accent px-7 py-3.5 text-2xl font-bold text-brand-white shadow-lg transition hover:opacity-90 min-h-[52px]"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    Vote for {VOTE_YEAR}
                  </a>
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

        {/* ── The vote. On the page, not behind a link: the homepage embeds
              the booking widget rather than pointing at /book, and this is the
              same call. The mission sits directly above it because the two
              only make sense together. ───────────────────────────────────── */}
        <section
          id="vote"
          className="section-padding bg-brand-accent-light border-t border-brand-accent/10 scroll-mt-20"
        >
          <div className="brand-container">
            <div className="max-w-2xl mb-10">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={lora}
              >
                Best in Norwich {VOTE_YEAR}
              </p>
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  The best places here have
                </span>
                <span className="block font-caveat text-4xl md:text-5xl font-bold text-brand-accent">
                  no marketing budget.
                </span>
              </h2>
              <div className="space-y-3" style={lora}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  That is the whole point of this. We spend every day telling visitors
                  where to eat and drink in Norwich, and the places worth sending them to
                  are almost always the small independent ones nobody is advertising.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This year&apos;s list came from about 25 locals we know, so we have
                  missed things. {VOTE_YEAR} is not our call. No shortlist, no fees, no
                  sponsors, and nobody can buy a category. Fill in the ones you have an
                  opinion on and you will see where the city stands as soon as you
                  submit.
                </p>
                <p
                  className="text-lg text-brand-text leading-relaxed"
                  style={{ fontWeight: 700 }}
                >
                  {voteOpen ? (
                    <>
                      Open until {formatDate(VOTING_CLOSES)}. Winners announced{" "}
                      {formatDate(RESULTS_DATE)}.
                    </>
                  ) : (
                    <>
                      Voting has closed. Winners announced {formatDate(RESULTS_DATE)}.
                    </>
                  )}
                </p>
              </div>
            </div>

            {voteOpen ? (
              <VoteForm
                initialCategories={CATEGORIES.map((c) => ({
                  key: c.key,
                  label: c.label,
                  blurb: c.blurb,
                  nominees: [],
                }))}
              />
            ) : (
              <p className="text-lg text-muted-foreground" style={lora}>
                Counting now. Winners go up on {formatDate(RESULTS_DATE)}.
              </p>
            )}

            <p className="mt-8 text-sm text-muted-foreground" style={lora}>
              Want to send just the vote to someone?{" "}
              <Link
                href={VOTE_PATH}
                className="text-brand-accent underline underline-offset-4"
              >
                It has its own page
              </Link>
              .
            </p>
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
