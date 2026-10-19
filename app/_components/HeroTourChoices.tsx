"use client";

// Homepage header: pick your tour right in the hero (Tom 2026-10-19), three
// versions to compare on the hidden /home-hero preview. Free tour and Dark
// History open the booking pop-up on that tour; private goes to its page.
//   A  Three buttons, each in its tour's own look, with the next walk
//   B  Three ticket stubs
//   C  One switch (Free / Dark History / Private) and a single button that
//      changes with it
// The polaroid tours section below is unchanged.

import { useState, type CSSProperties, type ReactNode } from "react";
import { openBooking } from "./BrandBooking";
import { trackEvent } from "@/lib/tracking";

export type HeroChoiceVariant = "a" | "b" | "c";
type Next = { label: string; spotsLeft: number } | null;

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
const GLOW = "#5AE19E";
const NIGHT = "#121211";

type Choice = {
  key: "free" | "dark" | "private";
  name: string;
  when: string;
  action: string;
  href: string;
};

function nextLine(n: Next, fallback: string) {
  if (!n) return fallback;
  return n.spotsLeft <= 6 ? `${n.label} · ${n.spotsLeft} ${n.spotsLeft === 1 ? "spot" : "spots"} left` : n.label;
}

function choicesFor(next: { free: Next; dark: Next }, darkOn: boolean): Choice[] {
  const list: Choice[] = [
    { key: "free", name: "Free walking tour", when: `Next: ${nextLine(next.free, "most days, 10:30am")}`, action: "Book free", href: "/book" },
    { key: "dark", name: "Dark History", when: `Next: ${nextLine(next.dark, "most evenings, 6pm")}`, action: "Book free", href: "/tours/dark-history-of-norwich#book" },
    { key: "private", name: "Private group", when: "Any day you choose", action: "Ask us", href: "/private-tours" },
  ];
  return darkOn ? list : list.filter((c) => c.key !== "dark");
}

function go(e: React.MouseEvent, c: Choice, variant: string) {
  trackEvent("book_cta_click", { location: `hero_choice_${variant}_${c.key}` });
  if (c.key === "private") return;
  e.preventDefault();
  openBooking(c.key, `hero_choice_${variant}_${c.key}`);
}

function AllTours() {
  return (
    <a href="#tours" className="inline-flex min-h-[44px] items-center text-[16px] font-semibold text-white underline underline-offset-4 decoration-white/50 hover:decoration-white" style={lora}>
      Or see all tours &amp; experiences ↓
    </a>
  );
}

/* ── A: three buttons, each in its tour's look ────────────────────────── */

function VariantA({ choices }: { choices: Choice[] }) {
  const look: Record<Choice["key"], { cls: string; name: CSSProperties }> = {
    free: { cls: "bg-brand-accent text-white border-brand-accent", name: { ...caveat, fontSize: 26, fontWeight: 700 } },
    dark: { cls: "text-white border-[#5AE19E]/70 shadow-[0_0_16px_rgba(90,225,158,0.3)]", name: { ...caveat, fontSize: 26, fontWeight: 700, color: GLOW } },
    private: { cls: "bg-[#FCFAF8] text-brand-text border-[#FCFAF8]", name: { ...caveat, fontSize: 26, fontWeight: 700 } },
  };
  return (
    <div>
      <p className="mb-3 text-[15px] font-semibold text-white/85" style={lora}>
        Which walk?
      </p>
      <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-3">
        {choices.map((c) => (
          <li key={c.key}>
            <a
              href={c.href}
              onClick={(e) => go(e, c, "a")}
              className={`flex h-full flex-col justify-center rounded-2xl border-2 px-4 py-2.5 transition hover:-translate-y-0.5 ${look[c.key].cls}`}
              style={c.key === "dark" ? { backgroundColor: NIGHT } : undefined}
            >
              <span className="leading-none" style={look[c.key].name}>
                {c.name} →
              </span>
              <span className={`mt-1 text-[13px] leading-snug ${c.key === "private" ? "text-brand-text/70" : "text-white/80"}`} style={lora}>
                {c.when}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <AllTours />
      </div>
    </div>
  );
}

/* ── B: three ticket stubs ─────────────────────────────────────────────── */

function Ticket({ c, children }: { c: Choice; children: ReactNode }) {
  const bg = c.key === "free" ? "#E8F8F1" : c.key === "dark" ? NIGHT : "#FFF8EA";
  return (
    <a
      href={c.href}
      onClick={(e) => go(e, c, "b")}
      className="group relative flex h-full items-stretch overflow-hidden rounded-xl shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5"
      style={{
        backgroundColor: bg,
        // Notched ends, like a ticket.
        WebkitMaskImage: "radial-gradient(circle 9px at 0 50%, transparent 98%, #000 100%), radial-gradient(circle 9px at 100% 50%, transparent 98%, #000 100%)",
        WebkitMaskComposite: "source-in",
        maskImage: "radial-gradient(circle 9px at 0 50%, transparent 98%, #000 100%), radial-gradient(circle 9px at 100% 50%, transparent 98%, #000 100%)",
        maskComposite: "intersect",
      }}
    >
      {children}
    </a>
  );
}

function VariantB({ choices, eater }: { choices: Choice[]; eater: CSSProperties }) {
  return (
    <div>
      <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-3">
        {choices.map((c) => {
          const dark = c.key === "dark";
          return (
            <li key={c.key}>
              <Ticket c={c}>
                <div className="flex-1 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ ...lora, color: dark ? "rgba(255,255,255,0.6)" : "rgba(26,26,26,0.55)" }}>
                    {c.key === "private" ? "Your group" : "Free to book"}
                  </p>
                  <p
                    className="mt-0.5 leading-none"
                    style={dark ? { ...eater, color: GLOW, fontSize: 19 } : { ...caveat, fontWeight: 700, fontSize: 25, color: c.key === "free" ? "#1A6B47" : "#1A1A1A" }}
                  >
                    {c.name}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug" style={{ ...lora, color: dark ? "rgba(255,255,255,0.75)" : "rgba(26,26,26,0.7)" }}>
                    {c.when}
                  </p>
                </div>
                <div
                  className="flex w-[72px] shrink-0 items-center justify-center border-l-2 border-dashed px-2 text-center leading-tight"
                  style={{ borderColor: dark ? "rgba(90,225,158,0.4)" : "rgba(26,26,26,0.2)", ...(dark ? { ...eater, color: GLOW, fontSize: 13 } : { ...caveat, fontWeight: 700, fontSize: 19, color: c.key === "free" ? "#1A6B47" : "#1A1A1A" }) }}
                >
                  {c.action}
                </div>
              </Ticket>
            </li>
          );
        })}
      </ul>
      <div className="mt-3">
        <AllTours />
      </div>
    </div>
  );
}

/* ── C: one switch, one button ────────────────────────────────────────── */

function VariantC({ choices, eater }: { choices: Choice[]; eater: CSSProperties }) {
  const [active, setActive] = useState<Choice["key"]>(choices[0].key);
  const c = choices.find((x) => x.key === active) ?? choices[0];
  const label = c.key === "free" ? "Book the free tour" : c.key === "dark" ? "Book Dark History" : "Ask about a private tour";
  return (
    <div>
      <div role="tablist" aria-label="Choose a walk" className="inline-flex rounded-full bg-black/40 p-1 backdrop-blur-[2px]">
        {choices.map((x) => {
          const on = x.key === active;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(x.key)}
              className={`min-h-[44px] rounded-full px-4 text-[15px] font-semibold transition ${on ? (x.key === "dark" ? "text-[#5AE19E]" : "bg-[#FCFAF8] text-brand-text") : "text-white/80 hover:text-white"}`}
              style={on && x.key === "dark" ? { backgroundColor: NIGHT, boxShadow: "0 0 12px rgba(90,225,158,0.35)", ...lora } : lora}
            >
              {x.key === "free" ? "Free tour" : x.key === "dark" ? "Dark History" : "Private"}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[15px] text-white/85" style={lora}>
        {c.when}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <a
          href={c.href}
          onClick={(e) => go(e, c, "c")}
          className={`inline-flex min-h-[54px] items-center justify-center rounded-full px-8 shadow-lg transition hover:opacity-90 ${c.key === "dark" ? "border-2 border-[#5AE19E]/70" : c.key === "private" ? "bg-[#FCFAF8] text-brand-text" : "bg-brand-accent text-white"}`}
          style={c.key === "dark" ? { ...eater, backgroundColor: NIGHT, color: GLOW, fontSize: 19 } : { ...caveat, fontSize: 24, fontWeight: 700 }}
        >
          {label}
        </a>
        <AllTours />
      </div>
    </div>
  );
}

export function HeroTourChoices({
  variant,
  next,
  darkOn,
  eaterFamily,
}: {
  variant: HeroChoiceVariant;
  next: { free: Next; dark: Next };
  darkOn: boolean;
  eaterFamily: string;
}) {
  const choices = choicesFor(next, darkOn);
  const eater: CSSProperties = { fontFamily: eaterFamily, fontWeight: 400 };
  if (variant === "b") return <VariantB choices={choices} eater={eater} />;
  if (variant === "c") return <VariantC choices={choices} eater={eater} />;
  return <VariantA choices={choices} />;
}
