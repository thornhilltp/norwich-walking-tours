// /guide — "Tom's Norwich". Post-tour recommendations page, redesigned
// 2026-05-26 (Tom's call) as a QUESTION-FIRST paradigm.
//
// The old card-heavy /guide was failing its primary job: helping post-tour
// guests DECIDE what to do. The redesign leads with the question ("Where
// for brunch?", "Pub after the tour?") rather than a list. Tap a question
// → matching picks render below. Tom's-favourites is a feature tile at
// the top in gold.
//
// "Browse all" escape hatch at the bottom of the question grid for the
// rare power user who wants to scroll the full list (e.g. searching for
// a specific name).
//
// Page is UNLISTED — distributed via QR card / booking-confirmation
// email, not via search. noindex layered across:
//   1. robots meta tag below
//   2. /guide in app/robots.ts Disallow
//   3. excluded from app/sitemap.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Beer,
  CloudRain,
  Coffee,
  Croissant,
  Footprints,
  Globe,
  IceCream,
  List,
  MapPin,
  Route,
  Sparkles,
  Star,
  TreePine,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  guideSections,
  reviewLinks,
  type GuidePick,
  type GuideTag,
} from "@/lib/guide-picks";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Tom's Norwich | A Local's Guide for Tour Guests",
  description:
    "What do you need? Brunch, dinner, pub, free things to do, day trip. The places a local would actually send you in Norwich.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/guide",
  },
  openGraph: {
    title: "Tom's Norwich | A Local's Guide",
    description:
      "What do you need? Brunch, dinner, pub, free things, day trip — the places a local would send you.",
    url: "https://www.norwichfreewalkingtours.co.uk/guide",
    type: "article",
    images: [{ url: "/og-image.jpg", alt: "Tom's Norwich — a local's guide." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom's Norwich | A Local's Guide",
    description:
      "What do you need? The places a local would actually send you in Norwich.",
    images: ["/og-image.jpg"],
  },
};

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const SITE_URL = "https://www.norwichfreewalkingtours.co.uk";
const PAGE_URL = `${SITE_URL}/guide`;
const PUBLISHED = "2026-05-24";
const MODIFIED = "2026-05-26";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tom's Norwich — a local's guide",
  description:
    "What do you need? Brunch, dinner, pub, free things to do, day trip. The places a local would actually send you in Norwich.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  inLanguage: "en-GB",
  author: { "@type": "Person", name: "Tom Thornhill" },
  publisher: { "@id": `${SITE_URL}/#localbusiness` },
  image: `${SITE_URL}/og-image.jpg`,
  about: { "@type": "Place", name: "Norwich" },
};

// ── Question vocabulary ──────────────────────────────────────────────────────
// Each question maps to either a set of tags or the `favourite` boolean.
// Wording is deliberately conversational — these are the questions guests
// actually ask Tom on tour ("Where should I eat tonight?") not category
// labels ("Dinner"). Order = priority on the grid.

interface Question {
  id: string;
  label: string;
  icon: LucideIcon;
  tags?: GuideTag[];
  favourite?: boolean;
  /** "feature" question gets the gold full-width treatment at top. */
  feature?: boolean;
  /** "all" is the escape hatch — matches every pick. */
  all?: boolean;
}

const QUESTIONS: Question[] = [
  // "Tom's favourites" sits with the others as a regular tile, just amber
  // instead of green. When highlighted as the active question it goes
  // solid amber. Favourite picks WITHIN any other question's results
  // already get the gold border + badge per the pick card render below.
  {
    id: "fav",
    label: "Tom’s favourites",
    icon: Star,
    favourite: true,
  },
  { id: "tour", label: "Places on the tour", icon: Footprints, tags: ["on-the-tour"] },
  { id: "brunch", label: "Where for brunch?", icon: Croissant, tags: ["brunch"] },
  { id: "lunch", label: "Lunch, properly", icon: UtensilsCrossed, tags: ["lunch"] },
  { id: "dinner", label: "Where for dinner?", icon: UtensilsCrossed, tags: ["dinner"] },
  { id: "snacks", label: "Snacks & sweets", icon: IceCream, tags: ["snacks"] },
  { id: "pub", label: "Pub after the tour", icon: Beer, tags: ["drink"] },
  { id: "coffee", label: "Coffee and cake", icon: Coffee, tags: ["coffee"] },
  { id: "free", label: "Free things to do", icon: Sparkles, tags: ["free"] },
  { id: "rainy", label: "When it rains", icon: CloudRain, tags: ["rainy-day"] },
  { id: "outdoors", label: "Outdoors today", icon: TreePine, tags: ["outdoors"] },
  { id: "daytrip", label: "Day trip out of town", icon: Route, tags: ["day-trip"] },
];

function findQuestion(id: string | undefined): Question | undefined {
  if (!id) return undefined;
  if (id === "all") return { id: "all", label: "All picks", icon: List, all: true };
  return QUESTIONS.find((q) => q.id === id);
}

function pickMatchesQuestion(pick: GuidePick, q: Question): boolean {
  if (q.all) return true;
  if (q.favourite) return pick.favourite === true;
  if (!q.tags || q.tags.length === 0) return true;
  return q.tags.some((tag) => pick.tags?.includes(tag) ?? false);
}

function withUtm(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("utm_source", "norwichfreewalkingtours");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", "guide");
    return url.toString();
  } catch {
    return rawUrl;
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
interface GuidePageProps {
  searchParams: { q?: string | string[] };
}

export default function GuidePage({ searchParams }: GuidePageProps) {
  const qRaw = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const active = findQuestion(qRaw);

  // Collect matching picks across all sections, preserving the section name
  // so we can show "Yard · Eat" style attribution.
  const matchingPicks: { sectionName: string; pick: GuidePick }[] = active
    ? guideSections.flatMap((s) =>
        s.picks
          .filter((p) => pickMatchesQuestion(p, active))
          .map((pick) => ({ sectionName: s.shortLabel, pick }))
      )
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main id="top" className="bg-brand-bg pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="brand-container max-w-2xl mx-auto">
          {/* Tom inline avatar + Lora→Caveat heading. No chunky polaroid. */}
          <header className="mb-8 flex items-start gap-4">
            <div className="flex-shrink-0 relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image
                src="/images/tour/guide-guildhall.jpg"
                alt="Tom from the Norwich Free Walking Tour"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-grow">
              <p
                className="text-brand-accent-text text-[10px] font-semibold tracking-[0.18em] uppercase mb-1"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Tom’s Norwich
              </p>
              <h1 className="leading-[0.95] text-balance">
                <span
                  className="block text-[26px] font-semibold text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  What do you need
                </span>
                <span
                  className="block text-[34px] font-semibold text-brand-accent"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  right now?
                </span>
              </h1>
            </div>
          </header>

          {/* Question grid — always visible. Tapping a question switches the
              selection (URL ?q=...); tapping the active question again
              clears it back to the landing state. Tom 2026-05-26 feedback. */}
          <ol className="grid grid-cols-2 gap-3 mb-6">
            {QUESTIONS.map((q) => {
              const Icon = q.icon;
              const isActive = active?.id === q.id;
              const isFav = q.favourite;
              // Selected state takes priority over the favourite-amber resting state
              const classes = isActive
                ? isFav
                  ? "bg-amber-400 text-brand-text border-amber-500 shadow-md"
                  : "bg-brand-accent text-white border-brand-accent shadow-md"
                : isFav
                  ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                  : "bg-white border-brand-accent/15 text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-light";
              return (
                <li key={q.id}>
                  <Link
                    href={isActive ? "/guide" : `/guide?q=${q.id}`}
                    scroll={false}
                    className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors duration-150 focus-brand touch-manipulation min-h-[72px] ${classes}`}
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    aria-pressed={isActive}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${isFav ? "fill-current" : ""}`}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] font-semibold leading-tight">
                      {q.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Escape hatch for power users who want to scroll the full list.
              Hidden when "all" is the active question (it'd be a redundant link). */}
          {active?.id !== "all" && (
            <div className="text-center mb-10">
              <Link
                href="/guide?q=all"
                scroll={false}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-accent touch-manipulation"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                <List className="w-4 h-4" aria-hidden="true" />
                Or browse the full list
              </Link>
            </div>
          )}

          {/* Matching picks for the active question — render BELOW the grid
              so users can switch question without scrolling back up. */}
          {active && (
            <section aria-label={`Picks for ${active.label}`} className="mb-10">
              <div className="flex items-baseline justify-between mb-3">
                <h2
                  className="text-[18px] font-semibold text-brand-text"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {active.label}
                </h2>
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  {matchingPicks.length} pick{matchingPicks.length === 1 ? "" : "s"}
                </span>
              </div>
              {matchingPicks.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-2xl border border-brand-accent/10">
                  <p
                    className="text-base text-muted-foreground"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    Nothing here yet for that question.
                  </p>
                </div>
              ) : (
                <ol className="flex flex-col gap-3">
                  {matchingPicks.map(({ sectionName, pick }, idx) => (
                    <li key={`${pick.name}-${idx}`}>
                      <article
                        className={`bg-white rounded-2xl shadow-sm overflow-hidden border ${
                          pick.favourite
                            ? "border-2 border-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.18)]"
                            : "border-brand-accent/10"
                        }`}
                      >
                        <div className="flex items-stretch gap-3">
                          {/* Thumbnail */}
                          <div className="flex-shrink-0 relative w-24 h-24 bg-brand-accent-light/50">
                            {pick.image ? (
                              <Image
                                src={pick.image}
                                alt={pick.imageAlt ?? pick.name}
                                fill
                                sizes="96px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-brand-accent/40 text-xs font-semibold uppercase tracking-wider">
                                {pick.name
                                  .replace(/^\[[^\]]+\]\s*/, "")
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((w) => w[0])
                                  .join("")}
                              </div>
                            )}
                            {pick.favourite && (
                              <span className="absolute top-1.5 left-1.5 inline-flex items-center justify-center w-5 h-5 bg-amber-400 rounded-full shadow">
                                <Star
                                  className="w-3 h-3 fill-current text-brand-text"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                          {/* Body */}
                          <div className="flex-grow min-w-0 py-2.5 pr-3">
                            <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                              <h3
                                className="text-[16px] font-bold text-brand-text leading-tight"
                                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                              >
                                {pick.name.replace(/^\[[^\]]+\]\s*/, "")}
                              </h3>
                              <span
                                className="text-[10px] text-muted-foreground uppercase tracking-wider"
                                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                              >
                                · {sectionName}
                              </span>
                              {pick.favourite && (
                                <span
                                  className="inline-flex items-center gap-1 bg-amber-400 text-brand-text text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-500/40"
                                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                                >
                                  <Star className="w-2.5 h-2.5 fill-current" aria-hidden="true" />
                                  Tom’s pick
                                </span>
                              )}
                            </div>
                            {pick.nickname && (
                              <p
                                className="text-[15px] italic text-brand-accent-text leading-tight mb-1"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                              >
                                {pick.nickname}
                              </p>
                            )}
                            <p
                              className="text-[13px] text-muted-foreground leading-snug line-clamp-2"
                              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                            >
                              {pick.body}
                            </p>
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                              <a
                                href={pick.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent-text hover:underline touch-manipulation"
                                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                              >
                                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                                Maps
                                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                              </a>
                              {pick.website && (
                                <a
                                  href={withUtm(pick.website)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-brand-accent touch-manipulation"
                                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                                >
                                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                                  Site
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          )}

          {/* Review CTA — always shown at the bottom, below any active picks. */}
          <div className="bg-brand-accent-light rounded-2xl p-6 text-center">
              <h2
                className="text-[22px] font-semibold text-brand-text mb-1 leading-tight"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                If the tour earned it,
              </h2>
              <p
                className="text-[26px] font-semibold text-brand-accent leading-tight mb-4"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                leave a review.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                <a
                  href={reviewLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 bg-brand-accent text-white rounded-xl text-sm shadow-md touch-manipulation"
                >
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  Google
                </a>
                <a
                  href={reviewLinks.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 bg-white text-brand-text rounded-xl border border-brand-accent/30 text-sm touch-manipulation"
                >
                  <Star className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                  TripAdvisor
                </a>
              </div>
            </div>

          {/* Cross-link nav */}
          <nav aria-label="Related" className="text-center mt-10">
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              <Link href="/" className="text-brand-accent hover:underline font-semibold touch-manipulation">
                Back to home
              </Link>
              <span className="mx-2 text-brand-accent/40">&bull;</span>
              <Link href="/book" className="text-brand-accent hover:underline font-semibold touch-manipulation">
                Book another tour
              </Link>
              <span className="mx-2 text-brand-accent/40">&bull;</span>
              <Link href="/contact" className="text-brand-accent hover:underline font-semibold touch-manipulation">
                Say hi
              </Link>
            </p>
            <p
              className="mt-4 text-xs italic text-muted-foreground/70"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Spotted a mistake or know somewhere better?{" "}
              <Link href="/contact" className="underline hover:text-brand-accent touch-manipulation">
                Tell me.
              </Link>
            </p>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
