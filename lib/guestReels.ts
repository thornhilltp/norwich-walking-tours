// Videos creators made on the free tour (Tom 2026-10-16), on the homepage.
// Self-hosted copies: only ship a video once the creator's OK is on record.

// Both creators agreed in writing (Tom confirmed 2026-10-17). Set back to
// false to pull the videos from the live site; they still show on a local
// dev server.
export const CREATORS_OK = true;
export const showGuestReels = CREATORS_OK || process.env.NODE_ENV === "development";

export type GuestReel = {
  id: string;
  src: string;
  poster: string;
  handle: string;
  profile: string;
  label: string;
};

export const guestReels: GuestReel[] = [
  {
    id: "hungover",
    src: "/videos/guest-reel-hungover.mp4",
    poster: "/videos/guest-reel-hungover-poster.jpg",
    handle: "@miniinnorwich",
    profile: "https://www.instagram.com/miniinnorwich/",
    label: "A guest's video of the free tour: the Guildhall, the Royal Arcade, Elm Hill and Norwich Market",
  },
  {
    id: "facts",
    src: "/videos/guest-reel-facts.mp4",
    poster: "/videos/guest-reel-facts-poster.jpg",
    handle: "@slow_you_down_buh",
    profile: "https://www.instagram.com/slow_you_down_buh/",
    label: "A guest sharing Norwich facts from the free tour, filmed in Tombland, by the Cathedral and on the river",
  },
];
