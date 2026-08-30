import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { VoteForm } from "@/components/VoteForm";
import {
  CATEGORIES,
  CONTENT_READY,
  PHASE,
  RESULTS_DATE,
  TOTAL_BALLOT_CATEGORIES,
  VOTE_YEAR,
  VOTING_CLOSES,
  WINNERS_YEAR,
  formatDate,
} from "@/lib/best-in-norwich";

// /best-in-norwich/vote — the 2027 ballot, split off from the guide on
// 2026-08-30. One page was trying to be a recommendation list and a voting
// form at the same time and did neither well.

const CANONICAL =
  "https://www.norwichfreewalkingtours.co.uk/best-in-norwich/vote";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export const metadata: Metadata = {
  title: `Vote — Best in Norwich ${VOTE_YEAR}`,
  description: `Tell us the best coffee, pub, chippy and view in Norwich. Open vote, no shortlist, ${TOTAL_BALLOT_CATEGORIES} categories. Closes ${formatDate(VOTING_CLOSES)}.`,
  alternates: { canonical: CANONICAL },
  robots: CONTENT_READY ? undefined : { index: false, follow: false },
  openGraph: {
    title: `Vote — Best in Norwich ${VOTE_YEAR}`,
    description: "No shortlist. Type whoever you think deserves it.",
    url: CANONICAL,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: "Is there a shortlist?",
    a: "No. Every box is blank on purpose. Last year's list came from 25 people we know, so putting it in front of you would just get it voted back in.",
  },
  {
    q: "Why do you want my email?",
    a: "To stop one person voting fifty times. It is never published and never shared with anyone on the list.",
  },
  {
    q: "Does anyone pay to be in this?",
    a: "No. No fees, no sponsors, no affiliate links. If that ever changes it will say so here in large letters.",
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

export default function VotePage() {
  const open = PHASE === "voting-open" || PHASE === "nominations-open";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="bg-brand-bg pt-16">
        <section className="section-padding">
          <div className="brand-container">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-brand-accent-light px-4 py-1.5 text-sm font-semibold text-brand-accent mb-6">
                Best in Norwich {VOTE_YEAR}
              </span>

              <h1 className="mb-5 leading-[1.05]">
                <span
                  className="block text-3xl md:text-4xl font-bold text-brand-text"
                  style={lora}
                >
                  No shortlist.
                </span>
                <span className="block font-caveat text-5xl sm:text-6xl md:text-7xl font-bold text-brand-accent">
                  Just tell us.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
                {open
                  ? `Every box is blank. Fill in the ones you care about, skip the rest, and you will see where the city stands as soon as you submit. Closes ${formatDate(VOTING_CLOSES)}.`
                  : `Voting has closed. Winners announced ${formatDate(RESULTS_DATE)}.`}
              </p>

              <p className="mt-3 text-sm text-muted-foreground" style={lora}>
                <Link
                  href="/best-in-norwich"
                  className="text-brand-accent underline underline-offset-4"
                >
                  See the {WINNERS_YEAR} winners
                </Link>{" "}
                if you want a steer first.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="brand-container">
            {open ? (
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
          </div>
        </section>

        <section className="section-padding bg-brand-accent-light">
          <div className="brand-container">
            <dl className="max-w-2xl space-y-5">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <dt className="text-lg font-bold text-brand-text" style={lora}>
                    {faq.q}
                  </dt>
                  <dd
                    className="mt-1 text-base text-muted-foreground leading-relaxed"
                    style={lora}
                  >
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <TrackedBookLink
                location="best_in_norwich_vote"
                className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-4 text-2xl font-bold text-brand-white shadow-lg transition hover:opacity-90 min-h-[52px]"
              >
                <span style={{ fontFamily: "var(--font-caveat), cursive" }}>
                  Book the walking tour
                </span>
              </TrackedBookLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
