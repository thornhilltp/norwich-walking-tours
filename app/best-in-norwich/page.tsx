import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { VoteWidget } from "@/components/VoteWidget";
import { CategoryVoteLink, WinnerLink } from "@/components/BestInNorwichLinks";
import {
  BADGE_IMAGE,
  CONTENT_READY,
  PHASE,
  RESULTS_DATE,
  TIMELINE,
  TOTAL_BALLOT_CATEGORIES,
  TOTAL_CATEGORIES,
  VOTE_YEAR,
  VOTING_CLOSES,
  WINNERS_YEAR,
  WINNER_CATEGORIES,
  formatDate,
  mapsSearch,
} from "@/lib/best-in-norwich";

// /best-in-norwich — the awards page. Two jobs on one page: publish the
// winners, and take votes for next year. Campaign page in the same mould as
// /roys-plaza, but unlike that one this is an evergreen SEO asset that gets a
// yearly refresh ("best coffee in norwich" and friends are real queries).
//
// Content and phase live in lib/best-in-norwich.ts. Nothing here is hard-coded
// except the copy.
//
// CONTENT_READY is false until the real winners land, which keeps the page
// noindex and out of the sitemap so half-written placeholders never get
// crawled. Flip the flag in the lib file, not here.

const CANONICAL = "https://www.norwichfreewalkingtours.co.uk/best-in-norwich";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export const metadata: Metadata = {
  title: `Best in Norwich ${WINNERS_YEAR} | The Winners, Picked By Locals`,
  description: `The best coffee, pasta, pizza, bakery and market stall in Norwich for ${WINNERS_YEAR}, picked by 25 locals. No fees, no sponsors. Nominate for the ${VOTE_YEAR} public vote.`,
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

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: `Who picked the ${WINNERS_YEAR} winners?`,
    a: `About 25 locals we know well. Not a public vote, not a judging panel, and definitely not exhaustive. It is the list we would give a friend who moved here last week. The ${VOTE_YEAR} awards are a proper open vote instead.`,
  },
  {
    q: "Did anyone pay to be on this list?",
    a: "No. No fees, no sponsors, no arrangements, no affiliate links. Most of the winners had no idea they were in the running. If that ever changes it will say so on this page in large letters.",
  },
  {
    q: `How do I get involved in ${VOTE_YEAR}?`,
    a: `Use the form at the top of this page. Vote in any category you have an opinion on, and if the place you want is not listed, add it. Voting runs until ${formatDate(
      VOTING_CLOSES
    )} and the winners are announced ${formatDate(RESULTS_DATE)}.`,
  },
  {
    q: "My favourite is missing. What do I do?",
    a: "Add it. Every category on the form has a free-text box, and a human reads every suggestion before it joins the ballot. That is the entire point of opening it up.",
  },
  {
    q: "Why do you need my email?",
    a: "To stop one person voting fifty times, and to come back to you if a suggestion needs checking. It is never published, and we only email you if you tick the box asking us to.",
  },
  {
    q: "Can a business rally its own customers?",
    a: "Yes, and we would expect them to. One vote per person per category is the only rule. Forty votes from the same laptop is not rallying, and it gets stripped out before the count.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

// ItemList naming the winners. Deliberately no Review or aggregateRating —
// we are not a review platform and rating markup about other people's
// businesses is a policy risk.
const winnersWithData = WINNER_CATEGORIES.filter((c) => c.winner);

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
  const votingOpen = PHASE === "voting-open";
  const nominating = PHASE === "nominations-open";
  const ballotOpen = votingOpen || nominating;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {winnersWithData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <main className="bg-brand-bg pt-16">
        {/* ── Hero + ballot ────────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="brand-container">
            {/* Three blocks, explicitly placed. On a phone the DOM order wins:
                headline, then the ballot, then the longer explanation — so
                anyone arriving from a video can vote without scrolling past
                three paragraphs first. On desktop the copy stacks back into
                the left column and the ballot sits alongside it, spanning
                both rows. */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_auto] gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-6 items-start">
              {/* 1. Badge, headline, the one-line hook */}
              <div className="lg:col-start-1 lg:row-start-1">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-brand-accent-light px-4 py-1.5 text-sm font-semibold text-brand-accent">
                    Best in Norwich {WINNERS_YEAR}
                  </span>
                  <span className="text-sm text-muted-foreground" style={lora}>
                    {TOTAL_CATEGORIES} categories
                  </span>
                </div>

                <h1 className="mb-6 leading-[1.05]">
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
                  className="text-xl text-brand-text leading-relaxed max-w-xl"
                  style={{ ...lora, fontWeight: 700 }}
                >
                  Nobody paid to be on this list. Nobody could have.
                </p>
              </div>

              {/* 2. The ballot. Second on a phone, right-hand column on desktop. */}
              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24">
                <VoteWidget />
              </div>

              {/* 3. The rest of the story, plus the trust row. */}
              <div className="lg:col-start-1 lg:row-start-2">
                <div className="space-y-4 max-w-xl" style={lora}>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We guide people round Norwich every day and get asked the same
                    questions every time. Best coffee. Best pasta. Best thing on the
                    market. So we put it to about 25 locals we know and trust, argued
                    about it for a fortnight, and this is where we landed. Independent
                    places, run by people who live here.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {ballotOpen
                      ? `Which means we have missed things. Definitely. So ${VOTE_YEAR} is not our call: voting is open now across ${TOTAL_BALLOT_CATEGORIES} categories, anyone can add a place we have missed, and the whole city decides.`
                      : `Voting for ${VOTE_YEAR} has closed. Winners announced ${formatDate(
                          RESULTS_DATE
                        )}.`}
                  </p>
                </div>

                {/* Trust row, same language as the homepage hero */}
                <div
                  className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
                  style={lora}
                >
                  <span>{TOTAL_CATEGORIES} categories, all food and drink</span>
                  <span aria-hidden="true">·</span>
                  <span>No fees, no sponsors</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {ballotOpen
                      ? `${VOTE_YEAR} voting open until ${formatDate(VOTING_CLOSES)}`
                      : `${VOTE_YEAR} results ${formatDate(RESULTS_DATE)}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Winners ──────────────────────────────────────────────────── */}
        <section className="section-padding bg-brand-accent-light">
          <div className="brand-container">
            <div className="max-w-3xl mb-10">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={lora}
              >
                The results
              </p>
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  The {WINNERS_YEAR} winners.
                </span>
                <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                  Every category.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
                Every category this year was food and drink, because that is what people
                kept asking us about. Go and give them your money. That is the whole point
                of a list like this. The {VOTE_YEAR} ballot adds pubs, views, shops and the
                best free thing to do in the city.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {WINNER_CATEGORIES.map((category) => {
                const winner = category.winner;

                return (
                  <article
                    key={category.key}
                    className="flex flex-col bg-brand-white rounded-xl border border-brand-text/5 shadow-sm overflow-hidden"
                  >
                    {winner?.image && (
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={winner.image.src}
                          alt={winner.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-6">
                      <p
                        className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2"
                        style={lora}
                      >
                        {category.label}
                      </p>

                      {winner ? (
                        <>
                          <h3
                            className="text-2xl font-bold text-brand-text leading-snug"
                            style={lora}
                          >
                            {winner.name}
                          </h3>
                          {winner.nickname && (
                            <p className="font-caveat text-2xl text-brand-accent leading-tight mt-0.5">
                              {winner.nickname}
                            </p>
                          )}
                          {winner.why && (
                            <p
                              className="mt-3 text-base text-muted-foreground leading-relaxed"
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

                          {category.runnersUp && category.runnersUp.length > 0 && (
                            <p
                              className="mt-4 text-sm text-muted-foreground"
                              style={lora}
                            >
                              {category.runnersUp.map((runner, i) => (
                                <span key={runner.name}>
                                  {i > 0 && " · "}
                                  {i === 0 ? "2nd" : "3rd"} —{" "}
                                  {runner.url ? (
                                    <a
                                      href={runner.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="underline underline-offset-2 hover:text-brand-accent"
                                    >
                                      {runner.name}
                                    </a>
                                  ) : (
                                    runner.name
                                  )}
                                </span>
                              ))}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <h3
                            className="text-2xl font-bold text-brand-text leading-snug"
                            style={lora}
                          >
                            Still counting.
                          </h3>
                          {category.blurb && (
                            <p
                              className="mt-3 text-base text-muted-foreground leading-relaxed"
                              style={lora}
                            >
                              {category.blurb}
                            </p>
                          )}
                        </>
                      )}

                      {ballotOpen && (
                        <div className="mt-auto pt-4">
                          <CategoryVoteLink
                            categoryKey={category.key}
                            label={
                              nominating
                                ? `Suggest someone for ${VOTE_YEAR} →`
                                : `Vote in this category for ${VOTE_YEAR} →`
                            }
                          />
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How this was decided ─────────────────────────────────────── */}
        <section className="section-padding">
          <div className="brand-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <p
                  className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                  style={lora}
                >
                  How this was decided
                </p>
                <h2 className="mb-6 leading-tight">
                  <span
                    className="block text-2xl md:text-3xl font-bold text-brand-text"
                    style={lora}
                  >
                    Twenty-five locals.
                  </span>
                  <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                    That was the whole panel.
                  </span>
                </h2>
                <div className="space-y-4" style={lora}>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Being straight with you: this was not a public vote. It was about 25
                    people we know, all of them living in Norwich, arguing it out between
                    them. Our inner circle, basically.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    So we have missed things. Guaranteed. There are places in this city
                    none of the 25 have walked into yet, and some of them are probably
                    better than what is on this list.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    What it is not is an advert. Nobody paid a fee, nobody was approached
                    for money, and no winner knew they were in the running. Every place
                    here is independent and local, and this is simply what we recommend
                    when a guest asks on tour.
                  </p>
                  <p
                    className="text-lg text-brand-text leading-relaxed"
                    style={{ fontWeight: 700 }}
                  >
                    Next year we hand it over. {VOTE_YEAR} is a proper public vote, open
                    to anyone.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-brand-accent-light p-6 sm:p-8">
                <p className="font-caveat text-3xl font-bold text-brand-text mb-4">
                  The rules
                </p>
                <ul className="space-y-3" style={lora}>
                  <li className="text-lg text-muted-foreground leading-relaxed">
                    Independent and Norwich-based. Chains are out, however good.
                  </li>
                  <li className="text-lg text-muted-foreground leading-relaxed">
                    No fees, no sponsors, nothing for sale. Not a category, not a link.
                  </li>
                  <li className="text-lg text-muted-foreground leading-relaxed">
                    From {VOTE_YEAR}: one vote per person per category, and every
                    suggestion read by a human before it joins the ballot.
                  </li>
                  <li className="text-lg text-muted-foreground leading-relaxed">
                    No running totals published. A live leaderboard just tells people who
                    to rally against.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <section className="section-padding bg-brand-accent-light">
          <div className="brand-container">
            <div className="max-w-3xl mb-10">
              <p
                className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                style={lora}
              >
                What happens next
              </p>
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  {VOTE_YEAR} is open to everyone.
                </span>
                <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                  Here are the dates.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
One window, one form. Vote in the categories you care about and add anyone
                we have missed at the same time. New names go on the ballot as soon as a
                human has checked them.
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {TIMELINE.map((stage, i) => {
                const current = stage.phase === PHASE;
                return (
                  <li
                    key={stage.phase}
                    className={`rounded-xl border p-6 ${
                      current
                        ? "bg-brand-white border-brand-accent shadow-sm"
                        : "bg-brand-white/60 border-brand-text/5"
                    }`}
                  >
                    <p className="font-caveat text-4xl font-bold text-brand-accent leading-none mb-2">
                      {i + 1}
                    </p>
                    <p
                      className="text-lg font-bold text-brand-text leading-snug"
                      style={lora}
                    >
                      {stage.label}
                    </p>
                    {current && (
                      <p
                        className="mt-1 inline-flex items-center rounded-full bg-brand-accent-light px-3 py-1 text-xs font-semibold text-brand-accent"
                        style={lora}
                      >
                        Happening now
                      </p>
                    )}
                    <p
                      className="mt-2 text-base text-muted-foreground leading-relaxed"
                      style={lora}
                    >
                      {stage.detail}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── For winners: the badge ───────────────────────────────────── */}
        {BADGE_IMAGE && (
          <section className="section-padding">
            <div className="brand-container">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center max-w-3xl">
                <Image
                  src={BADGE_IMAGE.src}
                  alt={BADGE_IMAGE.alt}
                  width={220}
                  height={220}
                  className="w-40 md:w-52 h-auto mx-auto md:mx-0"
                />
                <div>
                  <p
                    className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
                    style={lora}
                  >
                    If you won
                  </p>
                  <h2 className="mb-4 leading-tight">
                    <span
                      className="block text-2xl md:text-3xl font-bold text-brand-text"
                      style={lora}
                    >
                      Put it in the window.
                    </span>
                    <span className="block font-caveat text-4xl md:text-5xl font-bold text-brand-accent">
                      It&apos;s yours, free.
                    </span>
                  </h2>
                  <p
                    className="text-lg text-muted-foreground leading-relaxed"
                    style={lora}
                  >
                    Every {WINNERS_YEAR} winner can use this however they like. Window,
                    menu, Instagram, the lot. No cost, no catch, no permission needed.
                    Email{" "}
                    <a
                      href="mailto:hello@norwichfreewalkingtours.co.uk?subject=Best%20in%20Norwich%20badge"
                      className="text-brand-accent underline underline-offset-4"
                    >
                      hello@norwichfreewalkingtours.co.uk
                    </a>{" "}
                    and we will send the print-quality version.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="brand-container">
            <div className="max-w-3xl mb-8">
              <h2 className="leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  The {VOTE_YEAR} awards,
                </span>
                <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                  in plain English.
                </span>
              </h2>
            </div>

            <dl className="max-w-3xl space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl bg-brand-white p-6 border border-brand-text/5"
                >
                  <dt className="text-lg font-bold text-brand-text mb-2" style={lora}>
                    {faq.q}
                  </dt>
                  <dd
                    className="text-base text-muted-foreground leading-relaxed"
                    style={lora}
                  >
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Tour CTA ─────────────────────────────────────────────────── */}
        <section className="section-padding bg-brand-accent-light">
          <div className="brand-container">
            <div className="max-w-3xl">
              <h2 className="mb-4 leading-tight">
                <span
                  className="block text-2xl md:text-3xl font-bold text-brand-text"
                  style={lora}
                >
                  We put this list together because
                </span>
                <span className="block font-caveat text-5xl md:text-6xl font-bold text-brand-accent">
                  people keep asking us.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" style={lora}>
                We walk Norwich every day and answer these questions for a living. Come
                on the tour, see the city properly, and ask us the ones that are not on
                this page. It is free to book and you decide at the end what it was worth.
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
                  See the route first
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
