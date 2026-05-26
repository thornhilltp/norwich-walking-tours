// /guide — "Tom's Norwich". Post-tour recommendations sheet that doubles
// as the review-ask landing page. Built 2026-05-24 as a content shell
// per Tom — picks data lives in lib/guide-picks.ts and is meant to be
// edited there, not in the JSX below. Body copy is placeholder until
// Tom writes the real lines.
//
// Page shape (top to bottom):
//   - Warm thank-you hero (no image — light + fast)
//   - Sticky horizontal anchor nav (10 sections, scrollable on mobile)
//   - 10 themed sections of picks (one card per pick, Maps link per card)
//   - Review CTA block (Google + TripAdvisor, light-green bg)
//   - Cross-link nav
//   - Footer
//
// The page is intentionally lean — no Framer Motion, no images, no iframe.
// Post-tour guests load this on hotel wifi and want recommendations fast.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Beer,
  Calendar,
  Coffee,
  Footprints,
  Globe,
  MapPin,
  Mountain,
  Route,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  guideSections,
  reviewLinks,
  TAG_FILTERS,
  type GuideIconKey,
  type GuidePick,
  type GuideTag,
} from "@/lib/guide-picks";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Tom's Norwich | A Local's Guide for Tour Guests",
  description:
    "Restaurants, pubs, walks, day trips, festivals — the places a local would actually send you in Norwich. Pulled together for guests of the Norwich Free Walking Tour.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/guide",
  },
  openGraph: {
    title: "Tom's Norwich | A Local's Guide",
    description:
      "Restaurants, pubs, walks, day trips and festivals — the places a local would actually send you.",
    url: "https://www.norwichfreewalkingtours.co.uk/guide",
    type: "article",
    images: [
      {
        url: "/og-image.jpg",
        alt: "Tom's Norwich — a local's guide.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom's Norwich | A Local's Guide",
    description:
      "Restaurants, pubs, walks, day trips and festivals from a Norwich local.",
    images: ["/og-image.jpg"],
  },
};

// ── JSON-LD ──────────────────────────────────────────────────────────────────
// Article schema — keeps this page eligible for Google's article-rich-result
// surface. Section count + pick names aren't enumerated in schema yet; once
// content stabilises we can add ItemList per section.
const SITE_URL = "https://www.norwichfreewalkingtours.co.uk";
const PAGE_URL = `${SITE_URL}/guide`;
const PUBLISHED = "2026-05-24";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tom's Norwich — a local's guide",
  description:
    "Restaurants, pubs, walks, day trips and festivals from a Norwich local. Built for guests of the free walking tour.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: "en-GB",
  author: { "@type": "Person", name: "Tom Thornhill" },
  publisher: { "@id": `${SITE_URL}/#localbusiness` },
  image: `${SITE_URL}/og-image.jpg`,
  about: { "@type": "Place", name: "Norwich" },
};

// ── Icon resolver ────────────────────────────────────────────────────────────
// className override lets the same icon serve both the small nav pills /
// section headers AND the large faded placeholder block on image-less cards.
function SectionIcon({
  icon,
  className = "w-5 h-5 text-brand-accent",
}: {
  icon: GuideIconKey;
  className?: string;
}) {
  switch (icon) {
    case "view":
      return <Mountain className={className} aria-hidden="true" />;
    case "fork":
      return <UtensilsCrossed className={className} aria-hidden="true" />;
    case "coffee":
      return <Coffee className={className} aria-hidden="true" />;
    case "beer":
      return <Beer className={className} aria-hidden="true" />;
    case "sparkle":
      return <Sparkles className={className} aria-hidden="true" />;
    case "bag":
      return <ShoppingBag className={className} aria-hidden="true" />;
    case "walk":
      return <Footprints className={className} aria-hidden="true" />;
    case "paddle":
      return <Waves className={className} aria-hidden="true" />;
    case "route":
      return <Route className={className} aria-hidden="true" />;
    case "calendar":
      return <Calendar className={className} aria-hidden="true" />;
    case "ticket":
      return <Ticket className={className} aria-hidden="true" />;
  }
}

// ── Filter helpers ───────────────────────────────────────────────────────────
// Filters are URL-driven (?tags=eat,outdoors) so they're shareable + server-
// rendered. No client state, no flicker on filter change.
//
// Matching is OR: a pick matches if it carries ANY of the active tag IDs.
// "favourites" is a special tag that maps to the `favourite` boolean, not
// to the pick.tags array.

const ALL_FILTER_IDS = new Set(TAG_FILTERS.map((f) => f.id as string));

function parseActiveFilters(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => ALL_FILTER_IDS.has(t));
}

function pickMatchesFilters(pick: GuidePick, active: string[]): boolean {
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
  if (next.length === 0) return "/guide";
  return `/guide?tags=${next.join(",")}`;
}

// Anchor-nav and footer-link href builder that preserves the active filter
// query string. Without this, clicking a section anchor wipes the user's
// filter selection.
function preserveQuery(active: string[], hash: string): string {
  const qs = active.length > 0 ? `?tags=${active.join(",")}` : "";
  return `${qs}#${hash}`;
}

// Append UTM params to outbound venue website links so each recommended
// venue sees us in their analytics as `norwichfreewalkingtours / referral
// / guide` instead of a generic referrer. Skipped for Google Maps URLs
// (Maps strips params, share.google links would break).
function withUtm(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("utm_source", "norwichfreewalkingtours");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", "guide");
    return url.toString();
  } catch {
    // Malformed URL — render as-is rather than throw.
    return rawUrl;
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
interface GuidePageProps {
  searchParams: { tags?: string | string[] };
}

export default function GuidePage({ searchParams }: GuidePageProps) {
  // searchParams.tags can be string or string[] depending on how the URL is
  // constructed. Normalize to a single string before parsing.
  const tagsRaw = Array.isArray(searchParams.tags)
    ? searchParams.tags[0]
    : searchParams.tags;
  const activeFilters = parseActiveFilters(tagsRaw);
  const filteredSections = guideSections
    .map((section) => ({
      ...section,
      picks: section.picks.filter((p) => pickMatchesFilters(p, activeFilters)),
    }))
    .filter((section) => section.picks.length > 0);
  const noResults = filteredSections.length === 0 && activeFilters.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main id="top" className="bg-brand-bg pt-28 md:pt-32 pb-16">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="brand-container max-w-3xl mx-auto text-center pb-10 md:pb-14">
          {/* Polaroid of Tom on tour — added per Tom 2026-05-24 so the page
              "reminds them who's recommending". Matches the polaroid
              language from PhotoShowcaseV2 (masking tape, slight tilt,
              Caveat caption). Small enough not to push the H1 below the
              fold on phones. */}
          <div className="flex justify-center mb-8">
            <div
              className="relative bg-white p-2.5 pb-9 shadow-lg border border-brand-text/5"
              style={{ transform: "rotate(-2deg)" }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 rounded-sm shadow-sm"
                style={{
                  backgroundColor: "rgba(241, 225, 161, 0.75)",
                  borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                }}
              />
              <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] overflow-hidden">
                <Image
                  src="/images/tour/guide-guildhall.jpg"
                  alt="Tom from the Norwich Free Walking Tour, mid-story at the Guildhall"
                  fill
                  className="object-cover"
                  sizes="200px"
                  priority
                />
              </div>
              <p
                className="absolute bottom-1.5 left-3 text-[19px] italic font-bold text-brand-text"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                hi again, Tom
              </p>
            </div>
          </div>
          <p
            className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            After the tour
          </p>
          <h1 className="leading-[1.0] mb-5">
            <span
              className="block text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text text-balance"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Now you’ve seen the city,
            </span>
            <span
              className="block text-[clamp(46px,6vw,76px)] font-semibold leading-[0.95] text-brand-accent mt-1 text-balance"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              here’s where to spend it.
            </span>
          </h1>
          <p
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            The places I’d actually send you to, from restaurants and pubs to
            walks and day trips. Mostly within a fifteen-minute walk of where
            we finished. Pulled together because I kept getting asked.
          </p>
        </header>

        {/* ── Sticky toolbar (anchor nav + filter pills) ──────────────────
            Both rows live in one sticky container so they share the same
            visual block. Anchor nav for section jumps; filter row for tag-
            filtering. Both stay reachable as the user scrolls. Combined
            sticky height ≈ 95px below main nav (96px) = scroll-margin
            target 192px on filtered section headings. ─────────────── */}
        <div
          className="sticky top-24 z-30 bg-brand-bg/95 backdrop-blur-sm border-y border-brand-accent/10 mb-10"
        >
          <div className="brand-container">
            {/* Anchor nav row — desktop only. On mobile, scrolling is the
                natural pattern; this row's 50px of chrome doesn't earn
                its keep on a small screen. Tom 2026-05-26: mobile-first. */}
            <nav aria-label="Sections" className="hidden md:block relative">
              <ul className="flex gap-2 py-2 overflow-x-auto guide-pills-scroll">
                {filteredSections.map((section) => (
                  <li key={section.id} className="flex-shrink-0 guide-pill-snap">
                    <a
                      href={preserveQuery(activeFilters, section.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-brand-text/75 hover:text-brand-accent hover:bg-brand-accent-light transition-colors duration-150 whitespace-nowrap focus-brand touch-manipulation"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      <SectionIcon icon={section.icon} />
                      {section.shortLabel}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Right-edge fade — signals "more pills →". 24px wide. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-brand-bg to-transparent"
              />
            </nav>
            {/* Filter row — Tom 2026-05-26: dropped the "Filter" eyebrow
                (pills self-explain) and folded into the sticky toolbar so
                filters are reachable mid-scroll. Top border only on md+
                because anchor nav above is hidden on mobile. */}
            <div className="relative md:border-t md:border-brand-accent/10">
              <div
                className="flex items-center gap-2 py-2 overflow-x-auto guide-pills-scroll"
                role="group"
                aria-label="Filter picks by tag"
              >
                <Link
                  href="/guide"
                  scroll={false}
                  className={`guide-pill-snap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-brand touch-manipulation flex-shrink-0 ${
                    activeFilters.length === 0
                      ? "bg-brand-text text-white"
                      : "bg-white border border-brand-accent/20 text-brand-text/75 hover:bg-brand-accent-light"
                  }`}
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  aria-pressed={activeFilters.length === 0}
                >
                  All
                </Link>
                {TAG_FILTERS.map((filter) => {
                  const isActive = activeFilters.includes(filter.id);
                  const isFav = filter.id === "favourites";
                  const activeClass = isFav
                    ? "bg-amber-400 text-brand-text border border-amber-500 shadow-sm"
                    : "bg-brand-accent text-white";
                  const ghostClass = isFav
                    ? "bg-white border border-amber-400/60 text-amber-700 hover:bg-amber-50"
                    : "bg-white border border-brand-accent/20 text-brand-text/75 hover:bg-brand-accent-light";
                  return (
                    <Link
                      key={filter.id}
                      href={buildFilterHref(activeFilters, filter.id)}
                      scroll={false}
                      className={`guide-pill-snap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-brand touch-manipulation flex-shrink-0 ${
                        isActive ? activeClass : ghostClass
                      }`}
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      aria-pressed={isActive}
                    >
                      {isFav && (
                        <Star
                          className="w-3 h-3 fill-current"
                          aria-hidden="true"
                        />
                      )}
                      {filter.label}
                    </Link>
                  );
                })}
              </div>
              {/* Right-edge fade — signals "more pills →" on mobile. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-brand-bg to-transparent"
              />
            </div>
          </div>
        </div>

        {/* ── Sections ─────────────────────────────────────────────────── */}
        <div className="brand-container max-w-5xl mx-auto">
          {noResults && (
            <div className="text-center py-20">
              <p
                className="text-lg text-muted-foreground mb-4"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Nothing matches that combination yet.
              </p>
              <Link
                href="/guide"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-text hover:underline"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Clear filters
              </Link>
            </div>
          )}
          {filteredSections.map((section, sIdx) => (
            <section
              key={section.id}
              id={section.id}
              className={`guide-section ${sIdx === 0 ? "pb-16" : "py-16 border-t border-brand-accent/10"}`}
            >
              {/* Section header */}
              <div className="max-w-2xl mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <SectionIcon icon={section.icon} />
                  <p
                    className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {section.eyebrow}
                  </p>
                </div>
                <h2 className="leading-[1.0] mb-3">
                  <span
                    className="block text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.01em] text-brand-text text-balance"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {section.headingLora}
                  </span>
                  <span
                    className="block text-[clamp(36px,4.6vw,60px)] font-semibold leading-[0.95] text-brand-accent mt-0.5 text-balance"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    {section.headingCaveat}
                  </span>
                </h2>
                {section.intro && (
                  <p
                    className="text-base text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {section.intro}
                  </p>
                )}
              </div>

              {/* Picks grid — 2 col on desktop, 1 col on mobile */}
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {section.picks.map((pick, pIdx) => {
                  const num = String(pIdx + 1).padStart(2, "0");
                  return (
                    <li
                      key={`${section.id}-${pIdx}`}
                      className={`relative bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col ${
                        pick.favourite
                          ? "border-2 border-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.18)]"
                          : "border border-brand-accent/10"
                      }`}
                    >
                      {/* Image slot — real image if pick.image, otherwise a
                          tinted block with a faded section icon. Lets cards
                          look intentional before all photos exist. */}
                      <div className="relative aspect-[16/9] bg-brand-accent-light/50 overflow-hidden">
                        {pick.image ? (
                          <Image
                            src={pick.image}
                            alt={pick.imageAlt ?? pick.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <SectionIcon
                              icon={section.icon}
                              className="w-14 h-14 text-brand-accent/25"
                            />
                          </div>
                        )}
                        {pick.favourite && (
                          <span
                            className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-400 text-brand-text text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide border border-amber-500/40"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                            Tom’s pick
                          </span>
                        )}
                      </div>
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span
                            className="text-2xl font-bold text-brand-accent leading-none flex-shrink-0"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                          >
                            {num}
                          </span>
                          <h3
                            className="text-[19px] md:text-[20px] font-bold text-brand-text leading-tight"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            {pick.name}
                          </h3>
                        </div>
                        {pick.nickname && (
                          <p
                            className="text-[18px] italic text-brand-accent-text leading-tight mb-3 ml-9"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                          >
                            {pick.nickname}
                          </p>
                        )}
                        <p
                          className="text-[15px] text-muted-foreground leading-relaxed mb-5 ml-9"
                          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                        >
                          {pick.body}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-auto ml-9">
                          <a
                            href={pick.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-text hover:underline focus-brand touch-manipulation"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                            Open in Maps
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                          {pick.website && (
                            <>
                              <span
                                aria-hidden="true"
                                className="text-brand-accent/35 text-sm"
                              >
                                ·
                              </span>
                              <a
                                href={withUtm(pick.website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-text hover:underline focus-brand touch-manipulation"
                                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                              >
                                <Globe className="w-4 h-4" aria-hidden="true" />
                                Visit website
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        {/* ── Review CTA block ─────────────────────────────────────────────
            Light-green panel below the picks. Two side-by-side review
            buttons (Google + TripAdvisor). Sits at the bottom because
            asking before delivering value is pushy — guests scroll
            through the recs first, then see the ask. ──────────────── */}
        <section
          aria-labelledby="review-heading"
          className="brand-container max-w-3xl mx-auto mt-8"
        >
          <div className="bg-brand-accent-light rounded-2xl p-8 md:p-12 border border-brand-accent/15 text-center">
            <p
              className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              One last thing
            </p>
            <h2 id="review-heading" className="leading-[1.0] mb-4">
              <span
                className="block text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.1] text-brand-text text-balance"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                If the tour earned it,
              </span>
              <span
                className="block text-[clamp(34px,4.6vw,56px)] font-semibold leading-[0.95] text-brand-accent mt-1 text-balance"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                leave a review.
              </span>
            </h2>
            <p
              className="text-base text-muted-foreground leading-relaxed mb-7 max-w-md mx-auto"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Free walking tours live or die on reviews. A line on Google or
              TripAdvisor takes a minute and means the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
              <a
                href={reviewLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-base shadow-md focus-brand touch-manipulation"
              >
                <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                Review on Google
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={reviewLinks.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-brand-text rounded-xl border border-brand-accent/30 hover:bg-brand-accent-light transition-colors duration-150 text-base focus-brand touch-manipulation"
              >
                <Star className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                Review on TripAdvisor
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Cross-link nav ───────────────────────────────────────────── */}
        <nav
          aria-label="Related"
          className="brand-container mt-12 text-center"
        >
          {/* Back-to-top — page is ~14,000px tall on mobile with all picks
              loaded, so this matters. `#top` is HTML-spec for "top of page"
              and works without an explicit name="top" anchor. The id="top"
              on <main> is belt + braces. */}
          <p className="mb-6">
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-text hover:underline focus-brand touch-manipulation"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              <span aria-hidden="true">↑</span> Back to top
            </a>
          </p>
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
      </main>

      <Footer />

      {/* Hide the horizontal scrollbar on the pill nav (visual noise on
          desktop where everything fits on one line). Mobile keeps the
          natural swipe — no scrollbar needed there either. */}
      <style>{`
        .guide-pills-scroll::-webkit-scrollbar { display: none; }
        .guide-pills-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        /* Pill row scroll-snap — pills snap into view on swipe so mobile
           users land cleanly on each filter rather than mid-pill. Uses
           proximity (not mandatory) to stay gentle. */
        .guide-pills-scroll {
          scroll-snap-type: x proximity;
          scroll-padding-left: 1rem;
        }
        .guide-pill-snap { scroll-snap-align: start; }
        /* Sticky toolbar height varies by breakpoint. Mobile: filter row
           only (~50px) since anchor nav is hidden. Desktop: anchor nav +
           filter row (~95px). Main nav (96px) on both. Section anchors
           need to clear the full sticky stack. */
        .guide-section[id] { scroll-margin-top: 152px; }
        @media (min-width: 768px) {
          .guide-section[id] { scroll-margin-top: 192px; }
        }
      `}</style>
    </>
  );
}
