// WalkingPattern — fixed-position background motif for /home-v2.
// SVG tile of wandering dashed footpaths + scattered pace dots in
// the brand green, low opacity. Tileable, fixed attachment so it
// stays still as the page scrolls.
//
// Sits at z-0 behind the content stack. Content sections that
// have an opaque background cover the pattern; transparent
// sections let it show through.

const SVG_TILE = `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'><g stroke='#2DA96B' stroke-width='1.6' stroke-linecap='round' fill='none' opacity='0.18'><path d='M 0 50 Q 100 20 200 80 T 360 60' stroke-dasharray='1 8'/><path d='M 50 0 Q 120 90 60 180 T 80 360' stroke-dasharray='1 9'/><path d='M 360 120 Q 240 180 280 280 T 200 360' stroke-dasharray='1 10'/><path d='M 0 280 Q 100 240 220 280 T 360 240' stroke-dasharray='1 11'/></g><g fill='#2DA96B' opacity='0.22'><circle cx='40' cy='60' r='1.4'/><circle cx='80' cy='50' r='1.4'/><circle cx='200' cy='90' r='1.4'/><circle cx='320' cy='100' r='1.4'/><circle cx='60' cy='200' r='1.4'/><circle cx='180' cy='240' r='1.4'/><circle cx='300' cy='280' r='1.4'/><circle cx='40' cy='320' r='1.4'/><circle cx='200' cy='320' r='1.4'/></g></svg>`;

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
