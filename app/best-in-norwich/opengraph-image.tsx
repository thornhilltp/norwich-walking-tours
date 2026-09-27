import { ImageResponse } from "next/og";
import { WINNERS_YEAR, WINNER_CATEGORIES, VOTE_YEAR } from "@/lib/best-in-norwich";

// Share card for /best-in-norwich.
//
// Generated rather than a static JPG, so it can never drift from the winners
// list: change a winner in lib/best-in-norwich.ts and the card that appears in
// WhatsApp and Facebook changes with it.
//
// No custom font is loaded on purpose. Caveat and Lora would each need their
// font files fetched at render time, which is a network dependency and a
// failure mode for the sake of a share thumbnail. Brand colours carry it.

export const runtime = "edge";
export const alt = `Best in Norwich ${WINNERS_YEAR} — the winners`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FCFAF8";
const ACCENT = "#2DA96B";
const ACCENT_LIGHT = "#E8F8F1";
const TEXT = "#1A1A1A";

export default async function Image() {
  const winners = WINNER_CATEGORIES.filter((c) => c.winner).slice(0, 10);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          padding: "56px 64px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: ACCENT_LIGHT,
              color: ACCENT,
              borderRadius: 999,
              padding: "10px 24px",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            BEST IN NORWICH {WINNERS_YEAR}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 74,
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.05,
            }}
          >
            The best of Norwich,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              color: ACCENT,
              lineHeight: 1.05,
            }}
          >
            argued over by locals.
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 1080 }}>
          {winners.map((c) => (
            <div
              key={c.key}
              style={{
                display: "flex",
                background: "#FFFFFF",
                border: `2px solid ${ACCENT_LIGHT}`,
                borderRadius: 12,
                padding: "10px 18px",
                fontSize: 27,
                color: TEXT,
              }}
            >
              {c.winner!.name}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#5F5E5A",
          }}
        >
          <div style={{ display: "flex" }}>
            No fees. No sponsors. {VOTE_YEAR} is an open vote.
          </div>
          <div style={{ display: "flex", color: ACCENT, fontWeight: 700 }}>
            norwichfreewalkingtours.co.uk
          </div>
        </div>
      </div>
    ),
    size
  );
}
