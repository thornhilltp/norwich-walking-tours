// /guide-v2/questions — prototype #2: question-first (Infatuation style).
//
// Landing state shows "What do you need?" + a grid of REAL questions
// ("Where for brunch?", "Pub after the tour?", "When it rains"). Tap a
// question → URL gets ?q=<id> and the matching picks render below the
// questions. URL-driven, server-rendered.
//
// Tagging is the same as /guide. Each question is a curated combination
// of tags or the favourite flag.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Beer,
  CloudRain,
  Coffee,
  Croissant,
  Globe,
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

export const metadata: Metadata = {
  title: "Question-first prototype | Tom's Norwich",
  description: "Layout prototype.",
  robots: { index: false, follow: false, nocache: true },
};

// ── The question vocabulary ──────────────────────────────────────────────
// Each question maps to either a set of tags or the favourite flag.
// Questions are deliberately conversational ("Where for brunch?" not
// "Brunch") to match The Infatuation pattern.
interface Question {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Filter behaviour. Either tags to match OR favourite=true. */
  tags?: GuideTag[];
  favourite?: boolean;
  /** Whether this question gets the gold/feature treatment. */
  feature?: boolean;
}

const QUESTIONS: Question[] = [
  {
    id: "fav",
    label: "Tom’s favourites",
    icon: Star,
    favourite: true,
    feature: true,
  },
  { id: "brunch", label: "Where for brunch?", icon: Croissant, tags: ["brunch"] },
  { id: "lunch", label: "Lunch, properly", icon: UtensilsCrossed, tags: ["lunch"] },
  { id: "dinner", label: "Where for dinner?", icon: UtensilsCrossed, tags: ["dinner"] },
  { id: "pub", label: "Pub after the tour", icon: Beer, tags: ["drink"] },
  { id: "coffee", label: "Coffee and cake", icon: Coffee, tags: ["coffee"] },
  { id: "free", label: "Free things to do", icon: Sparkles, tags: ["free"] },
  { id: "rainy", label: "When it rains", icon: CloudRain, tags: ["rainy-day"] },
  { id: "outdoors", label: "Outdoors today", icon: TreePine, tags: ["outdoors"] },
  { id: "daytrip", label: "Day trip out of town", icon: Route, tags: ["day-trip"] },
];

function findQuestion(id: string | undefined): Question | undefined {
  if (!id) return undefined;
  return QUESTIONS.find((q) => q.id === id);
}

function pickMatchesQuestion(pick: GuidePick, q: Question): boolean {
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

interface Props {
  searchParams: { q?: string | string[] };
}

export default function GuideQuestionsPrototype({ searchParams }: Props) {
  const qRaw = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const active = findQuestion(qRaw);

  const matchingPicks: { sectionName: string; pick: GuidePick }[] = active
    ? guideSections.flatMap((s) =>
        s.picks
          .filter((p) => pickMatchesQuestion(p, active))
          .map((pick) => ({ sectionName: s.shortLabel, pick }))
      )
    : [];

  return (
    <>
      <main id="top" className="bg-brand-bg pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="brand-container max-w-2xl mx-auto">
          {/* Tiny back link */}
          <Link
            href="/guide-v2"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-accent mb-5 touch-manipulation"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            <ArrowLeft className="w-3 h-3" aria-hidden="true" />
            Compare layouts
          </Link>

          {/* Tom inline + Lora→Caveat heading */}
          <header className="mb-8 flex items-start gap-4">
            <div className="flex-shrink-0 relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image
                src="/images/tour/guide-guildhall.jpg"
                alt="Tom"
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
              <h1 className="leading-[0.95]">
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

          {/* The questions */}
          <ol className="grid grid-cols-2 gap-3 mb-10">
            {QUESTIONS.map((q) => {
              const Icon = q.icon;
              const isActive = active?.id === q.id;
              const isFeature = q.feature;
              const classes = isFeature
                ? `col-span-2 ${
                    isActive
                      ? "bg-amber-400 border-amber-500 text-brand-text"
                      : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                  }`
                : isActive
                  ? "bg-brand-accent text-white border-brand-accent"
                  : "bg-white border-brand-accent/15 text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-light";
              return (
                <li key={q.id} className={isFeature ? "col-span-2" : undefined}>
                  <Link
                    href={isActive ? "/guide-v2/questions" : `/guide-v2/questions?q=${q.id}`}
                    scroll={false}
                    className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors duration-150 focus-brand touch-manipulation min-h-[72px] ${classes}`}
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    aria-pressed={isActive}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isFeature && isActive ? "fill-current" : ""
                      }`}
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

          {/* When a question is active, show the picks below */}
          {active && (
            <section aria-label="Matching picks" className="mt-6">
              <div className="flex items-baseline justify-between mb-4">
                <h2
                  className="text-[20px] font-semibold text-brand-accent"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {matchingPicks.length} pick{matchingPicks.length === 1 ? "" : "s"}
                </h2>
                <Link
                  href="/guide-v2/questions"
                  className="text-xs text-muted-foreground hover:text-brand-accent"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  Clear
                </Link>
              </div>

              {matchingPicks.length === 0 ? (
                <p
                  className="text-base text-muted-foreground text-center py-8"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  Nothing here yet. Tom hasn’t marked any picks for this question.
                </p>
              ) : (
                <ol className="flex flex-col gap-3">
                  {matchingPicks.map(({ sectionName, pick }, idx) => (
                    <li key={`${pick.name}-${idx}`}>
                      <article
                        className={`bg-white rounded-2xl shadow-sm overflow-hidden border ${
                          pick.favourite
                            ? "border-2 border-amber-400"
                            : "border-brand-accent/10"
                        }`}
                      >
                        <div className="flex items-stretch gap-3">
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
                                {pick.name.slice(0, 2)}
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
                          <div className="flex-grow min-w-0 py-2.5 pr-3">
                            <div className="flex items-baseline gap-2 mb-0.5">
                              <h3
                                className="text-[16px] font-bold text-brand-text leading-tight"
                                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                              >
                                {pick.name}
                              </h3>
                              <span
                                className="text-[10px] text-muted-foreground uppercase tracking-wider"
                                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                              >
                                · {sectionName}
                              </span>
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
                            <div className="flex items-center gap-3 mt-2">
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

          {/* Review CTA appears when no question is active */}
          {!active && (
            <div className="mt-12 bg-brand-accent-light rounded-2xl p-6 text-center">
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
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={reviewLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-accent text-white rounded-xl text-sm shadow-md touch-manipulation"
                >
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  Google
                </a>
                <a
                  href={reviewLinks.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-brand-text rounded-xl border border-brand-accent/30 text-sm touch-manipulation"
                >
                  <Star className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                  TripAdvisor
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
