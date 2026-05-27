// /guide-v2 — prototype comparison hub. Three layout paradigms for the
// post-tour recommendations page. Tom picks one on his phone, we rebuild
// /guide with that approach and delete /guide-v2.
//
// All three prototypes use the same data from lib/guide-picks.ts so the
// comparison is purely about LAYOUT/UX, not content.

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowRight, List, HelpCircle, LayoutGrid } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide layout prototypes",
  description: "Three layout paradigms for the post-tour recommendations page.",
  robots: { index: false, follow: false, nocache: true },
};

const prototypes = [
  {
    href: "/guide-v2/list",
    name: "Dense list",
    paradigm: "Eater 38 style",
    blurb: "Tight rows. Thumbnail, name, nickname, tags. ~7-8 picks visible per screen. Best for scanning.",
    icon: List,
  },
  {
    href: "/guide-v2/questions",
    name: "Question-first",
    paradigm: "The Infatuation style",
    blurb: "Opens with the question, not the list. 'Where for brunch?', 'Pub after the tour?'. Tap a question, see matching picks.",
    icon: HelpCircle,
  },
  {
    href: "/guide-v2/grid",
    name: "Tile grid",
    paradigm: "Instagram saved guides",
    blurb: "2-column square tiles. Image background, name overlay. Visual browse. Tap to expand.",
    icon: LayoutGrid,
  },
];

export default function GuideV2IndexPage() {
  return (
    <>
      <main id="top" className="bg-brand-bg pt-28 md:pt-32 pb-16 min-h-screen">
        <div className="brand-container max-w-2xl mx-auto">
          <header className="mb-10 text-center">
            <p
              className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Layout prototypes
            </p>
            <h1 className="leading-[1.0] mb-4">
              <span
                className="block text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Three takes on
              </span>
              <span
                className="block text-[clamp(40px,5.5vw,68px)] font-semibold leading-[0.95] text-brand-accent mt-1"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                the same idea.
              </span>
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Same content, three different UX paradigms. Try each on your phone, pick the one that feels right.
            </p>
          </header>

          <ol className="flex flex-col gap-4">
            {prototypes.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="block bg-white rounded-2xl border border-brand-accent/15 shadow-sm hover:shadow-md hover:border-brand-accent/40 transition-all duration-150 p-5 md:p-6 focus-brand touch-manipulation"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-accent-light flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span
                            className="text-xl font-bold text-brand-accent leading-none"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                          >
                            0{i + 1}
                          </span>
                          <h2
                            className="text-[18px] font-bold text-brand-text leading-tight"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            {p.name}
                          </h2>
                          <span
                            className="text-xs text-muted-foreground"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            · {p.paradigm}
                          </span>
                        </div>
                        <p
                          className="text-[14px] text-muted-foreground leading-relaxed"
                          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                        >
                          {p.blurb}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-5 h-5 text-brand-accent flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <p
            className="text-center mt-10 text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            For reference:{" "}
            <Link
              href="/guide"
              className="text-brand-accent hover:underline font-semibold"
            >
              the current /guide
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
