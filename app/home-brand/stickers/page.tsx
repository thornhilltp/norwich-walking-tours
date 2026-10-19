// Sticker sheet (Tom 2026-10-19): every scrapbook sticker, numbered, with
// what it stands for and a sample margin note, so Tom can pick the 5 to 10
// the free tour page uses. Hidden: noindex, unlinked.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CanarySticker,
  CastleSticker,
  CoinSticker,
  CupSticker,
  FootstepsSticker,
  PinSticker,
  SpireSticker,
  StickerLabel,
} from "../_components/Doodles";
import {
  AwningSticker,
  BubbleSticker,
  CameraSticker,
  ChurchSticker,
  DragonSticker,
  FineCitySticker,
  FlintSticker,
  MustardSticker,
  PintSticker,
  RiverSticker,
  SheepSticker,
  StreetSignSticker,
  TeeSticker,
  TicketSticker,
} from "../_components/MoreDoodles";

export const metadata: Metadata = {
  title: "Sticker sheet (prototype)",
  robots: { index: false, follow: false },
};

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };

const STICKERS: { name: string; means: string; note: string; art: ReactNode }[] = [
  { name: "Cathedral spire", means: "History", note: "Norwich Cathedral was begun in 1096", art: <SpireSticker className="h-24 w-14" /> },
  { name: "Canary", means: "Stories", note: "Why are Norwich City the Canaries?", art: <CanarySticker className="h-20 w-24" /> },
  { name: "Coffee cup", means: "Local tips", note: "Ask us where to get coffee", art: <CupSticker className="h-20 w-20" /> },
  { name: "Castle keep", means: "Highlights", note: "What was the Castle really for?", art: <CastleSticker className="h-20 w-24" /> },
  { name: "Map pin", means: "Meet", note: "Start at The Forum", art: <PinSticker className="h-20 w-16" /> },
  { name: "Footsteps", means: "Walk", note: "Two easy hours on foot", art: <FootstepsSticker className="h-20 w-20" /> },
  { name: "£ coin", means: "Tip", note: "Tip what it was worth", art: <CoinSticker className="h-20 w-20" /> },
  { name: "Market stall", means: "The Market", note: "Lunch at the Market after?", art: <AwningSticker className="h-20 w-24" /> },
  { name: "Pint", means: "Pubs", note: "Ask for our favourite pub", art: <PintSticker className="h-20 w-16" /> },
  { name: "Elm Hill sign", means: "Highlights", note: "How did Elm Hill survive?", art: <StreetSignSticker className="h-14 w-28" /> },
  { name: "Flint", means: "History", note: "Why so much flint?", art: <FlintSticker className="h-20 w-20" /> },
  { name: "Snap the dragon", means: "Stories", note: "Who was Snap?", art: <DragonSticker className="h-20 w-24" /> },
  { name: "Mustard tin", means: "Norwich icons", note: "Ask about Colman's mustard", art: <MustardSticker className="h-20 w-16" /> },
  { name: "Sheep", means: "History: the wool money", note: "Where did the wool money go?", art: <SheepSticker className="h-20 w-24" /> },
  { name: "Church tower", means: "History", note: "Why so many medieval churches?", art: <ChurchSticker className="h-24 w-16" /> },
  { name: "Camera", means: "Photo spots", note: "Our favourite photo spot is on the way", art: <CameraSticker className="h-16 w-20" /> },
  { name: "Ticket", means: "Free to book", note: "£0 to book", art: <TicketSticker className="h-14 w-28" /> },
  { name: "\"Did you know?\" bubble", means: "Stories", note: "(the bubble is the note)", art: <BubbleSticker className="h-16 w-28" /> },
  { name: "Fine City sign", means: "Norwich", note: "Norwich, a fine city", art: <FineCitySticker className="h-20 w-28" /> },
  { name: "Green t-shirt", means: "The guides", note: "Walk with a local", art: <TeeSticker className="h-20 w-24" /> },
  { name: "River and boat", means: "The Wensum", note: "Ask about the river", art: <RiverSticker className="h-16 w-24" /> },
];

export default function StickerSheet() {
  return (
    <main className="bg-brand-bg pt-28 pb-20">
      <div className="brand-container max-w-6xl">
        <h1 className="text-center leading-[1.0]">
          <span className="text-[clamp(30px,4vw,48px)] font-semibold text-brand-text" style={lora}>
            Pick your
          </span>{" "}
          <span className="text-[clamp(42px,5.4vw,68px)] text-brand-accent" style={caveat}>
            stickers.
          </span>
        </h1>
        <p className="mt-3 text-center text-[17px] text-brand-text/70" style={lora}>
          Choose 5 to 10 by number. Each one shows what it stands for and a sample margin note.
        </p>
        <ol className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 list-none p-0 m-0">
          {STICKERS.map((st, i) => (
            <li key={st.name} className="relative rounded-2xl border border-brand-text/10 bg-white px-4 pt-8 pb-5 text-center shadow-sm">
              <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-text text-[15px] font-bold text-white" style={lora}>
                {i + 1}
              </span>
              <div className="flex h-28 items-center justify-center">{st.art}</div>
              <p className="mt-3 text-[16px] font-bold text-brand-text" style={lora}>
                {st.name}
              </p>
              <p className="text-[13px] uppercase tracking-[0.12em] text-brand-text/50" style={lora}>
                {st.means}
              </p>
              <div className="mt-3">
                <StickerLabel className="whitespace-normal">{st.note}</StickerLabel>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
