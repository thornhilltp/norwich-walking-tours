// WalkingPattern — NO LONGER IN USE as of 2026-05-18 commit.
// Replaced by RouteDivider (between-section dashed lines) after the
// body-wide pattern repeatedly competed with text legibility through
// 4 opacity iterations. Kept on disk in case we want a different
// background motif approach later.
//
// Original concept:
// WalkingPattern — fixed-position background motif for /home-v2.
// SVG tile of wandering dashed footpaths + scattered pace dots in
// the brand green, low opacity. Tileable, fixed attachment so it
// stays still as the page scrolls.
//
// Sits at z-0 behind the content stack. Content sections that
// have an opaque background cover the pattern; transparent
// sections let it show through.

// Opacity / weight tuned over four passes:
//   Pass 1 (initial): 0.18/0.22 — too dark
//   Pass 2 (over-dimmed): 0.09/0.12 — invisible
//   Pass 3: 0.14/0.18 — present but faint, "no personality" per Tom
//   Pass 4 (this): 0.24/0.32 — bolder, with small map-pin icons
//                  scattered in for character (not just dots)
// Now reads as a brand asset, not noise.
const SVG_TILE = `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'><g stroke='#2DA96B' stroke-width='2' stroke-linecap='round' fill='none' opacity='0.24'><path d='M 0 50 Q 100 20 200 80 T 360 60' stroke-dasharray='1 7'/><path d='M 50 0 Q 120 90 60 180 T 80 360' stroke-dasharray='1 8'/><path d='M 360 120 Q 240 180 280 280 T 200 360' stroke-dasharray='1 9'/><path d='M 0 280 Q 100 240 220 280 T 360 240' stroke-dasharray='1 10'/><path d='M 150 0 Q 220 90 180 180 Q 140 270 220 360' stroke-dasharray='1 8'/><path d='M 0 160 Q 90 130 180 170 T 360 180' stroke-dasharray='1 9'/></g><g fill='#2DA96B' opacity='0.32'><circle cx='40' cy='60' r='1.4'/><circle cx='80' cy='50' r='1.4'/><circle cx='130' cy='80' r='1.4'/><circle cx='260' cy='80' r='1.4'/><circle cx='60' cy='200' r='1.4'/><circle cx='130' cy='220' r='1.4'/><circle cx='240' cy='260' r='1.4'/><circle cx='300' cy='280' r='1.4'/><circle cx='40' cy='320' r='1.4'/><circle cx='280' cy='340' r='1.4'/></g><g fill='#2DA96B' opacity='0.28'><path d='M 200 90 c -3.5 0 -6 2.8 -6 6.5 c 0 5 6 10 6 10 s 6 -5 6 -10 c 0 -3.7 -2.5 -6.5 -6 -6.5 z M 200 100 a 2 2 0 1 1 0 -4 a 2 2 0 0 1 0 4 z'/><path d='M 320 100 c -3.5 0 -6 2.8 -6 6.5 c 0 5 6 10 6 10 s 6 -5 6 -10 c 0 -3.7 -2.5 -6.5 -6 -6.5 z M 320 110 a 2 2 0 1 1 0 -4 a 2 2 0 0 1 0 4 z'/><path d='M 180 240 c -3.5 0 -6 2.8 -6 6.5 c 0 5 6 10 6 10 s 6 -5 6 -10 c 0 -3.7 -2.5 -6.5 -6 -6.5 z M 180 250 a 2 2 0 1 1 0 -4 a 2 2 0 0 1 0 4 z'/><path d='M 120 340 c -3.5 0 -6 2.8 -6 6.5 c 0 5 6 10 6 10 s 6 -5 6 -10 c 0 -3.7 -2.5 -6.5 -6 -6.5 z M 120 350 a 2 2 0 1 1 0 -4 a 2 2 0 0 1 0 4 z'/><path d='M 200 320 c -3.5 0 -6 2.8 -6 6.5 c 0 5 6 10 6 10 s 6 -5 6 -10 c 0 -3.7 -2.5 -6.5 -6 -6.5 z M 200 330 a 2 2 0 1 1 0 -4 a 2 2 0 0 1 0 4 z'/></g></svg>`;

const DATA_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(SVG_TILE)}")`;

export function WalkingPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: DATA_URI,
        backgroundSize: "360px 360px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    />
  );
}
