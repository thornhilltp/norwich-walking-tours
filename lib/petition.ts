// Shared config for the Roy's Plaza parody petition (/roys-plaza).
// Lives outside the widget so the server-rendered page and the client widget
// read the same ladder and can never drift apart.

export type Demand = {
  key: "rename" | "statue" | "allShops";
  threshold: number;
  short: string;
  headline: string;
  detail: string;
  // Artist's impression for this stage. Stage three has no card image because
  // it gets the full-width site plan directly below the ladder instead.
  image?: { src: string; alt: string };
};

export const DEMANDS: Demand[] = [
  {
    key: "rename",
    threshold: 1000,
    short: "The renaming",
    headline: "Anglia Square becomes Roy's Plaza",
    detail:
      "Signs, maps, bus stops, the lot. The bare minimum this county is owed. Everything below is contingent on hitting this first.",
    image: {
      src: "/images/roys-plaza-render-hub.jpg",
      alt: "Artist's impression of the new Anglia Square development with a Roys Plaza logo on the front of the building.",
    },
  },
  {
    key: "statue",
    threshold: 5000,
    short: "The statue",
    headline: "A statue of a Roy goes up in the middle",
    detail:
      "Bronze. Life size at the absolute minimum. Positioned facing the Cathedral so the two great institutions of this city can look each other in the eye.",
    image: {
      src: "/images/roys-plaza-render-street.jpg",
      alt: "Artist's impression of the new development with Roys signs on the buildings and a bronze statue of one of the Roy brothers in the foreground, captioned statue of the original Roy, a Roy.",
    },
  },
  {
    key: "allShops",
    threshold: 10000,
    short: "All of it",
    headline: "Every single shop in there becomes a Roys",
    detail:
      "Back-to-back Roys. A Roys next to a Roys next to a Roys. You walk out of one Roys and you are immediately in another Roys. Front and centre, where it belongs. See the site plan below.",
  },
];

export const FINAL_TARGET = DEMANDS[DEMANDS.length - 1].threshold;
