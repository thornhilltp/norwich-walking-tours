// /guide-v2/list — prototype #1: dense list (Eater 38 style).
//
// Goal: maximise picks visible per screen. Each pick is a tight row with
// thumbnail, name, Caveat nickname, tag chips, and tap targets on the
// right. ~7-8 picks per screen on mobile. Tag chips at top filter
// in-place. No section anchor nav — sections render as flat list with
// section headers between groups.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Globe,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  guideSections,
  reviewLinks,
  TAG_FILTERS,
  type GuidePick,
  type GuideTag,
} from "@/lib/guide-picks";

export const metadata: Metadata = {
  title: "Dense list prototype | Tom's Norwich",
  description: "Layout prototype.",
  robots: { index: false, follow: false, nocache: true },
};

const ALL_FILTER_IDS = new Set(TAG_FILTERS.map((f) => f.id as string));

function parseActiveFilters(raw: string | string[] | undefined): string[] {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return [];
  return value.split(",").map((t) => t.trim()).filter((t) => ALL_FILTER_IDS.has(t));
}

function pickMatches(pick: GuidePick, active: string[]): boolean {
  if (active.length === 0) return true;
  return active.some((id) => {
    if (id === "favourites") return pick.favourite === true;
    return pick.tags?.includes(id as GuideTag) ?? false;
  });
}

function buildFilterHref(active: string[], toggleId: string): string {
  const next = active.includes(toggleId)
    ? active.filter((t) => t !== toggleId)
    : [...active, toggleId];
  if (next.length === 0) return "/guide-v2/list";
  return `/guide-v2/list?tags=${next.join(",")}`;
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
  searchParams: { tags?: string | string[] };
}

export default function GuideListPrototype({ searchParams }: Props) {
  const active = parseActiveFilters(searchParams.tags);
  const sections = guideSections
    .map((s) => ({ ...s, picks: s.picks.filter((p) => pickMatches(p, active)) }))
    .filter((s) => s.picks.length > 0);
  const noResults = sections.length === 0 && active.length > 0;
  const totalPicks = sections.reduce((acc, s) => acc + s.picks.length, 0);

  return (
    <>
      <main id="top" className="bg-brand-bg pt-24 md:pt-28 pb-16">
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

          {/* Compact hero: Tom avatar inline + Lora→Caveat heading */}
          <header className="mb-6 flex items-start gap-4">
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
                  Where to spend it,
                </span>
                <span
                  className="block text-[34px] font-semibold text-brand-accent"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  now you’ve seen the city.
                </span>
              </h1>
            </div>
          </header>
        </div>

        {/* Sticky filter row */}
        <div className="sticky top-24 z-30 bg-brand-bg/95 backdrop-blur-sm border-y border-brand-accent/10 mb-6">
          <div className="brand-container max-w-2xl mx-auto">
            <div
              className="flex items-center gap-2 py-2 overflow-x-auto guide-pills-scroll relative"
              role="group"
              aria-label="Filter picks by tag"
            >
              <Link
                href="/guide-v2/list"
                scroll={false}
                className={`flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-brand touch-manipulation ${
                  active.length === 0
                    ? "bg-brand-text text-white"
                    : "bg-white border border-brand-accent/20 text-brand-text/75"
                }`}
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                All
              </Link>
              {TAG_FILTERS.map((f) => {
                const isActive = active.includes(f.id);
                const isFav = f.id === "favourites";
                const activeClass = isFav
                  ? "bg-amber-400 text-brand-text border border-amber-500"
                  : "bg-brand-accent text-white";
                const ghostClass = isFav
                  ? "bg-white border border-amber-400/60 text-amber-700"
                  : "bg-white border border-brand-accent/20 text-brand-text/75";
                return (
                  <Link
                    key={f.id}
                    href={buildFilterHref(active, f.id)}
                    scroll={false}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-brand touch-manipulation ${
                      isActive ? activeClass : ghostClass
                    }`}
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    aria-pressed={isActive}
                  >
                    {isFav && <Star className="w-3 h-3 fill-current" aria-hidden="true" />}
                    {f.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="brand-container max-w-2xl mx-auto">
          {/* Count */}
          {!noResults && (
            <p
              className="text-xs text-muted-foreground mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {totalPicks} pick{totalPicks === 1 ? "" : "s"}
              {active.length > 0 ? ", filtered" : ""}
            </p>
          )}

          {noResults && (
            <div className="text-center py-16">
              <p
                className="text-base text-muted-foreground mb-3"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Nothing matches that combination.
              </p>
              <Link
                href="/guide-v2/list"
                className="text-sm font-semibold text-brand-accent-text hover:underline"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Clear filters
              </Link>
            </div>
          )}

          {/* Sections rendered as flat list with small section headers between */}
          {sections.map((section) => (
            <section key={section.id} className="mb-7 last:mb-0">
              <h2
                className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-accent-text mb-2 px-1"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {section.eyebrow} · {section.shortLabel}
              </h2>
              <ol className="flex flex-col gap-2">
                {section.picks.map((pick, pIdx) => (
                  <li key={`${section.id}-${pIdx}`}>
                    <a
                      href={pick.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-stretch gap-3 bg-white rounded-xl shadow-sm border overflow-hidden touch-manipulation hover:shadow-md transition-shadow duration-150 focus-brand ${
                        pick.favourite
                          ? "border-2 border-amber-400"
                          : "border-brand-accent/10"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 relative w-20 h-20 bg-brand-accent-light/50">
                        {pick.image ? (
                          <Image
                            src={pick.image}
                            alt={pick.imageAlt ?? pick.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-brand-accent/40 text-xs font-semibold uppercase tracking-wider">
                            {pick.name.slice(0, 2)}
                          </div>
                        )}
                        {pick.favourite && (
                          <span className="absolute top-1 left-1 inline-flex items-center justify-center w-5 h-5 bg-amber-400 rounded-full shadow">
                            <Star
                              className="w-3 h-3 fill-current text-brand-text"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </div>
                      {/* Body */}
                      <div className="flex-grow min-w-0 py-2 pr-2 flex flex-col justify-center">
                        <h3
                          className="text-[15px] font-bold text-brand-text leading-tight truncate"
                          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                        >
                          {pick.name}
                        </h3>
                        {pick.nickname && (
                          <p
                            className="text-[15px] italic text-brand-accent-text leading-tight truncate"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                          >
                            {pick.nickname}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {(pick.tags ?? []).slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-medium text-brand-accent-text bg-brand-accent-light px-1.5 py-0.5 rounded-full"
                              style={{
                                fontFamily: "var(--font-lora), Georgia, serif",
                              }}
                            >
                              {TAG_FILTERS.find((f) => f.id === t)?.label ?? t}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Right action */}
                      <div className="flex-shrink-0 flex items-center pr-3 text-brand-accent">
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </a>
                    {/* Secondary website link (visible on hover/tap) — rendered tightly */}
                    {pick.website && (
                      <a
                        href={withUtm(pick.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-brand-accent ml-[92px] mt-0.5 touch-manipulation"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        <Globe className="w-3 h-3" aria-hidden="true" />
                        Visit website
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {/* Review CTA — minimal */}
          {!noResults && (
            <div className="mt-12 bg-brand-accent-light rounded-2xl p-6 text-center">
              <h2
                className="text-[22px] font-semibold text-brand-text mb-1 leading-tight"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                If the tour earned it,
              </h2>
              <p
                className="text-[24px] font-semibold text-brand-accent leading-tight mb-4"
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

        <style>{`
          .guide-pills-scroll::-webkit-scrollbar { display: none; }
          .guide-pills-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
