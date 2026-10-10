// "Your storytellers" as a murder board: aged evidence polaroids nailed
// up with exhibit tags, and guest reviews as pinned parchment notes.
// Prototyped with Tom 2026-10-11 (artifact option 2).

import Image from "next/image";
import type { CSSProperties } from "react";
import s from "./murder-board.module.css";
import { NoteCarousel } from "./NoteCarousel";

export interface BoardGuide {
  name: string;
  img: string;
  focal?: string;
  blurb?: string;
  reviews?: { quote: string; author: string }[];
}


const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export function MurderBoard({
  guides,
  scriptStyle,
}: {
  guides: BoardGuide[];
  scriptStyle: CSSProperties;
}) {
  return (
    <ul className={`${s.grid} m-0 p-0 list-none`}>
      {guides.map((g, i) => (
        <li key={g.name} className={s.guide}>
          <div className={s.pol} style={{ transform: `rotate(${i % 2 ? 2 : -2.5}deg)` }}>
            <span className={s.nail} aria-hidden="true" />
            <span className={s.tag} style={lora} aria-hidden="true">
              Exhibit {String.fromCharCode(65 + i)}
            </span>
            <div className={s.photo}>
              <Image
                src={g.img}
                alt={`Portrait of ${g.name}`}
                fill
                className="object-cover"
                style={{ objectPosition: g.focal ?? "50% 25%" }}
                sizes="252px"
              />
            </div>
            <span className={s.ring} aria-hidden="true" />
            <span className={s.smudge} aria-hidden="true" />
            <span className={s.spat} aria-hidden="true" />
            <p className={s.cap} style={scriptStyle}>
              {g.name}
            </p>
          </div>
          {g.blurb && (
            <p className={s.blurb} style={lora}>
              {g.blurb}
            </p>
          )}
          {g.reviews && g.reviews.length > 0 && (
            <NoteCarousel name={g.name} reviews={g.reviews} />
          )}
        </li>
      ))}
    </ul>
  );
}

export const bandFrame = {
  band: s.band,
  corners: [s.corner + " " + s.tl, s.corner + " " + s.tr, s.corner + " " + s.bl, s.corner + " " + s.br],
};
