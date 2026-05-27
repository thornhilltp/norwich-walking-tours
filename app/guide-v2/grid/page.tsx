// /guide-v2/grid — prototype #3: tile grid (Instagram saved guides).
//
// 2-column square tiles. Image background, name + nickname overlaid at
// bottom with a fade-to-black scrim for legibility. Gold border + star
// badge for favourites. Single filter row at top. Tap a tile = opens
// Maps in a new tab (primary action). Long-press / "site" pill in the
// top-right corner if a website exists.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  guideSections,
  reviewLinks,
  TAG_FILTERS,
  type GuidePick,
  type GuideTag,
} from "@/lib/guide-picks";

export const metadata: Metadata = {
  title: "Tile grid prototype | Tom's Norwich",
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
  if (next.length === 0) return "/guide-v2/grid";
  return `/guide-v2/grid?tags=${next.join(",")}`;
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

export default function GuideGridPrototype({ searchParams }: Props) {
  const active = parseActiveFilters(searchParams.tags);
  const allPicks: GuidePick[] = guideSections.flatMap((s) =>
    s.picks.filter((p) => pickMatches(p, active))
  );
  const noResults = allPicks.length === 0 && active.length > 0;

  return (
    <>
      <main id="top" className="bg-brand-bg pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="brand-container max-w-2xl mx-auto">
          <Link
            href="/guide-v2"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-accent mb-5 touch-manipulation"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            <ArrowLeft className="w-3 h-3" aria-hidden="true" />
            Compare layouts
          </Link>

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
                  Norwich, in tiles.
                </span>
                <span
                  className="block text-[26px] font-semibold text-brand-accent"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  tap to go.
                </span>
              </h1>
            </div>
          </header>
        </div>

        {/* Sticky filter row */}
        <div className="sticky top-24 z-30 bg-brand-bg/95 backdrop-blur-sm border-y border-brand-accent/10 mb-6">
          <div className="brand-container max-w-2xl mx-auto">
            <div
              className="flex items-center gap-2 py-2 overflow-x-auto guide-pills-scroll"
              role="group"
              aria-label="Filter picks by tag"
            >
              <Link
                href="/guide-v2/grid"
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
          {!noResults && (
            <p
              className="text-xs text-muted-foreground mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {allPicks.length} pick{allPicks.length === 1 ? "" : "s"}
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
                href="/guide-v2/grid"
                className="text-sm font-semibold text-brand-accent-text hover:underline"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Clear filters
              </Link>
            </div>
          )}

          {/* Tile grid */}
          <ol className="grid grid-cols-2 gap-3">
            {allPicks.map((pick, idx) => (
              <li key={`${pick.name}-${idx}`}>
                <a
                  href={pick.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative block aspect-square rounded-2xl overflow-hidden shadow-sm touch-manipulation focus-brand ${
                    pick.favourite
                      ? "border-2 border-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.18)]"
                      : "border border-brand-accent/10"
                  }`}
                >
                  {/* Background: image OR colored block with initials */}
                  {pick.image ? (
                    <Image
                      src={pick.image}
                      alt={pick.imageAlt ?? pick.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 240px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-brand-accent-light flex items-center justify-center">
                      <span
                        className="text-4xl font-bold text-brand-accent/30"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                      >
                        {pick.name
                          .replace(/^\[[^\]]+\]\s*/, "")
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    </div>
                  )}

                  {/* Bottom-to-top scrim for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Favourite badge */}
                  {pick.favourite && (
                    <span
                      className="absolute top-2 left-2 inline-flex items-center gap-1 bg-amber-400 text-brand-text text-[10px] font-bold px-2 py-1 rounded-full shadow"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                      Tom’s pick
                    </span>
                  )}

                  {/* Website corner pill if present */}
                  {pick.website && (
                    <span
                      className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow"
                      aria-hidden="true"
                      title="Has website"
                    >
                      <Globe className="w-3.5 h-3.5 text-brand-text" />
                    </span>
                  )}

                  {/* Name + nickname overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h3
                      className="text-[15px] font-bold text-white leading-tight drop-shadow-md"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      {pick.name.replace(/^\[[^\]]+\]\s*/, "")}
                    </h3>
                    {pick.nickname && (
                      <p
                        className="text-[15px] italic text-white/95 leading-tight drop-shadow-md"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                      >
                        {pick.nickname}
                      </p>
                    )}
                  </div>
                </a>
                {/* Secondary website link below the tile */}
                {pick.website && (
                  <a
                    href={withUtm(pick.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-brand-accent mt-1 ml-1 touch-manipulation"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    <Globe className="w-3 h-3" aria-hidden="true" />
                    Visit site
                  </a>
                )}
              </li>
            ))}
          </ol>

          {/* Review CTA */}
          {!noResults && (
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

        <style>{`
          .guide-pills-scroll::-webkit-scrollbar { display: none; }
          .guide-pills-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
