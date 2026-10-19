// Sticker sheet (Tom 2026-10-19): the scrapbook stickers for the free tour
// page, numbered, each with what it stands for and its margin note. Round
// 2: Tom's shortlist, every note a question; footsteps and map pin dropped;
// full cathedral and church; a shopfront for independent shops. Hidden:
// noindex, unlinked.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CanarySticker, CastleSticker, CoinSticker, StickerLabel } from "../_components/Doodles";
import {
  AwningSticker,
  CathedralSticker,
  ChurchFullSticker,
  DragonSticker,
  FineCitySticker,
  MustardSticker,
  ShopSticker,
  StreetSignSticker,
} from "../_components/MoreDoodles";

export const metadata: Metadata = {
  title: "Sticker sheet (prototype)",
  robots: { index: false, follow: false },
};

const lora = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat = { fontFamily: "var(--font-caveat), cursive" };

// Every note is a question: tease, don't tell (messaging playbook).
const STICKERS: { name: string; means: string; note: string; art: ReactNode }[] = [
  { name: "Norwich Cathedral", means: "History", note: "Why did the Normans build a cathedral this big?", art: <CathedralSticker className="h-20 w-28" /> },
  { name: "Canary", means: "Stories", note: "Why are Norwich City the Canaries?", art: <CanarySticker className="h-20 w-24" /> },
  { name: "Castle keep", means: "Highlights", note: "What was the Castle really for?", art: <CastleSticker className="h-20 w-24" /> },
  { name: "£ coin", means: "Tip", note: "How much should you tip?", art: <CoinSticker className="h-20 w-20" /> },
  { name: "Market stall", means: "The Market's history", note: "How long has there been a market here?", art: <AwningSticker className="h-20 w-24" /> },
  { name: "Elm Hill sign", means: "Highlights", note: "How did Elm Hill survive?", art: <StreetSignSticker className="h-14 w-28" /> },
  { name: "Snap the dragon", means: "Stories", note: "Who was Snap the dragon?", art: <DragonSticker className="h-20 w-24" /> },
  { name: "Mustard tin", means: "Norwich icons", note: "What's Norwich got to do with mustard?", art: <MustardSticker className="h-20 w-16" /> },
  { name: "Medieval church", means: "History", note: "Why so many medieval churches?", art: <ChurchFullSticker className="h-20 w-24" /> },
  { name: "Fine City sign", means: "Life in Norwich", note: "Why is Norwich one of the best places to live?", art: <FineCitySticker className="h-20 w-28" /> },
  { name: "Lanes shopfront", means: "Independent shops", note: "Where are our favourite independent shops?", art: <ShopSticker className="h-20 w-20" /> },
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
          Round 2: your shortlist. Choose 5 to 10 by number.
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
                <StickerLabel className="!whitespace-normal leading-tight">{st.note}</StickerLabel>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
