import type { Metadata } from "next";
import Image from "next/image";
import { RouteMapSVG } from "../_components/RouteMapSVG";

export const metadata: Metadata = {
  title: "SVG map test — Norwich Free Walking Tours",
  robots: { index: false, follow: false },
};

// Standalone preview page so Tom can compare the PNG route map against
// the experimental SVG version side-by-side. Not linked from anywhere.
// Lives at /home-v2/svg-map-test. Delete this page when done evaluating.
export default function SVGMapTestPage() {
  return (
    <main className="brand-container py-12">
      <h1 className="text-3xl font-bold mb-2">Route map: PNG vs SVG</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Experimental SVG version of the route map for evaluation. Honest
        framing: not a 1:1 trace of the hand-illustrated PNG — that&apos;s
        not feasible. This is a simplified vector version that hits the
        same cartographic notes (river, parks, pins, dashed route, labels).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-accent-text font-semibold mb-3">
            Current — PNG
          </p>
          <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden">
            <Image
              src="/images/route-map.png"
              alt="Hand-drawn PNG route map"
              width={1500}
              height={1155}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-brand-accent-text font-semibold mb-3">
            Experimental — SVG
          </p>
          <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-md overflow-hidden">
            <RouteMapSVG className="w-full h-auto" />
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-2xl text-sm text-muted-foreground space-y-3">
        <p>
          <strong>SVG advantages:</strong> crisp at any zoom level,
          animatable (the route line draws itself + pins drop in
          sequentially), smaller file size, can be re-themed with CSS,
          easier to make individual pins interactive (hover, click to
          open stop detail).
        </p>
        <p>
          <strong>PNG advantages:</strong> hand-illustrated charm,
          authentic cartographic detail (full street network, building
          blocks, organic park shapes) that a vector simplification
          can&apos;t match.
        </p>
        <p>
          <strong>Verdict to make:</strong> if the map is decorative
          and the cartographic character matters, keep PNG. If we want
          interactive pins or a tighter, modern look, switch to SVG.
        </p>
      </div>
    </main>
  );
}
