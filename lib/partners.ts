// Shared partner / listing data. Used by Hero (below booking widget) and
// Footer. Listing URLs are also mirrored into LocalBusiness `sameAs` in
// app/layout.tsx for Knowledge Graph entity linking.
//
// invertOnDark: map to flat white via brightness(0) invert(1) on dark
// backgrounds, so the three logos read as one set.
// keepWhiteOnHover: when true the white filter stays on hover too — used
// for logos whose native colour disappears on a dark background
// (VisitNorwich is solid black, so revealing it on hover hides it).

export type Partner = {
  name: string;
  href: string;
  src: string;
  width: number;
  height: number;
  invertOnDark: boolean;
  keepWhiteOnHover?: boolean;
};

export const partners: Partner[] = [
  {
    name: "VisitNorwich",
    href: "https://www.visitnorwich.co.uk/service/norwich-free-walking-tours/",
    src: "/partners/visitnorwich.svg",
    width: 253,
    height: 58,
    invertOnDark: true,
    keepWhiteOnHover: true,
  },
  {
    name: "GuruWalk",
    href: "https://www.guruwalk.com/walks/69964-norwich-free-walking-tour-the-real-norwich-with-a-local",
    src: "/partners/guruwalk.avif",
    width: 300,
    height: 53,
    invertOnDark: true,
  },
  {
    name: "FreeTour.com",
    href: "https://www.freetour.com/norwich",
    src: "/partners/freetour.svg",
    width: 170,
    height: 32,
    invertOnDark: true,
  },
];
