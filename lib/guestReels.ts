// Videos creators made on the free tour (Tom 2026-10-16, prototype).
// Self-hosted copies: only ship a video once the creator's OK is on record.

// Flip to true once both creators have said yes in writing. Until then the
// videos only render on a local dev server, never on the live site, and the
// .mp4 files stay out of git.
export const CREATORS_OK = false;
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
