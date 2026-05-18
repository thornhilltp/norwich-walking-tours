// WalkingPattern — fixed-position background motif for /home-v2.
// SVG tile of wandering dashed footpaths + scattered pace dots in
// the brand green, low opacity. Tileable, fixed attachment so it
// stays still as the page scrolls.
//
// Sits at z-0 behind the content stack. Content sections that
// have an opaque background cover the pattern; transparent
// sections let it show through.

// Opacity tuned to be visible-but-quiet:
//   Pass 1 (initial): 0.18/0.22 — too dark, Tom feedback
//   Pass 2 (over-dimmed): 0.09/0.12 — invisible, Tom feedback
//   Pass 3 (this): 0.14/0.18 — middle ground, present without competing
// Added more paths (6) and more dots (15) for better tile density so
// the pattern reads as continuous footpaths instead of sparse marks.
const SVG_TILE = `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'><g stroke='#2DA96B' stroke-width='1.6' stroke-linecap='round' fill='none' opacity='0.14'><path d='M 0 50 Q 100 20 200 80 T 360 60' stroke-dasharray='1 7'/><path d='M 50 0 Q 120 90 60 180 T 80 360' stroke-dasharray='1 8'/><path d='M 360 120 Q 240 180 280 280 T 200 360' stroke-dasharray='1 9'/><path d='M 0 280 Q 100 240 220 280 T 360 240' stroke-dasharray='1 10'/><path d='M 150 0 Q 220 90 180 180 Q 140 270 220 360' stroke-dasharray='1 8'/><path d='M 0 160 Q 90 130 180 170 T 360 180' stroke-dasharray='1 9'/></g><g fill='#2DA96B' opacity='0.18'><circle cx='40' cy='60' r='1.2'/><circle cx='80' cy='50' r='1.2'/><circle cx='130' cy='80' r='1.2'/><circle cx='200' cy='90' r='1.2'/><circle cx='260' cy='80' r='1.2'/><circle cx='320' cy='100' r='1.2'/><circle cx='60' cy='200' r='1.2'/><circle cx='130' cy='220' r='1.2'/><circle cx='180' cy='240' r='1.2'/><circle cx='240' cy='260' r='1.2'/><circle cx='300' cy='280' r='1.2'/><circle cx='40' cy='320' r='1.2'/><circle cx='120' cy='340' r='1.2'/><circle cx='200' cy='320' r='1.2'/><circle cx='280' cy='340' r='1.2'/></g></svg>`;

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
