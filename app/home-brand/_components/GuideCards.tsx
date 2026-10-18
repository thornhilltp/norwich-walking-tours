"use client";

// Our locals: taped polaroids that pop out on hover; click one and it opens
// into the full guide card (bio, Instagram, what guests said), the same
// details as /our-guides (Tom 2026-10-18).

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { guides, type Guide } from "@/lib/guides";
import { GuideReviews } from "@/app/our-guides/_components/GuideReviews";
import { trackEvent } from "@/lib/tracking";

const lora: CSSProperties = { fontFamily: "var(--font-lora), Georgia, serif" };
const caveat: CSSProperties = { fontFamily: "var(--font-caveat), cursive" };

function Polaroid({ g, big }: { g: Guide; big?: boolean }) {
  return (
    <div className={`relative w-full bg-[#F5EBDA] p-2.5 ${big ? "pb-14" : "pb-12"} shadow-lg border border-brand-text/5`}>
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 w-20 h-6 rounded-[2px]"
        style={{ transform: "translateX(-50%) rotate(-2deg)", backgroundColor: g.accent.ac, boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
      />
      <div className="relative aspect-[4/5] overflow-hidden" style={{ background: g.tint }}>
        <Image
          src={g.img}
          alt={`${g.name}, guide with Norwich Free Walking Tours`}
          fill
          sizes={big ? "(max-width: 768px) 70vw, 340px" : "(max-width: 640px) 80vw, 280px"}
          className="object-cover"
          style={{ objectPosition: g.focal }}
        />
      </div>
      <p className={`absolute ${big ? "bottom-3.5 text-[38px]" : "bottom-3 text-[32px]"} left-0 right-0 text-center font-bold leading-none text-brand-text`} style={caveat}>
        {g.name}
      </p>
    </div>
  );
}

export function GuideCards() {
  const [open, setOpen] = useState<Guide | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 list-none p-0 m-0">
        {guides.map((g) => (
          <li key={g.name} className="flex flex-col items-center text-center">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setOpen(g);
                trackEvent("guide_card_open", { guide: g.name });
              }}
              className="group w-full max-w-[280px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand-accent"
            >
              <span
                className="block transition-transform duration-300 ease-out [transform:rotate(var(--r))] group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.06)]"
                style={{ ["--r" as string]: g.rotate } as CSSProperties}
              >
                <Polaroid g={g} />
              </span>
              <span className="mt-4 inline-block text-[22px] font-bold text-brand-accent-text group-hover:underline underline-offset-4" style={caveat}>
                Meet {g.name} →
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* The full guide card. */}
      <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/55 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(null)} />
        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`About ${open.name}`}
            className="absolute inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[760px] max-h-[92dvh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-brand-bg p-5 md:p-8 shadow-2xl"
          >
            <button
              ref={closeRef}
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-text/5 text-brand-text"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8 items-start">
              <div className="mx-auto w-[62%] md:w-full pt-3" style={{ transform: `rotate(${open.rotate})` }}>
                <Polaroid g={open} big />
              </div>
              <div>
                <p className="text-[44px] font-bold leading-none text-brand-text" style={caveat}>
                  {open.name}
                </p>
                <p className="mt-3 text-[17px] leading-relaxed text-brand-text/80" style={lora}>
                  {open.blurb}
                </p>
                {open.handle && (
                  <a
                    href={open.handle.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[15px] font-semibold text-brand-accent-text underline underline-offset-4"
                    style={lora}
                  >
                    {open.handle.label}
                  </a>
                )}
                {open.reviews.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[26px] font-bold leading-none text-brand-text mb-3" style={caveat}>
                      What guests said about {open.name}
                    </p>
                    <GuideReviews reviews={open.reviews} accent={open.accent} />
                  </div>
                )}
                <p className="mt-6" style={lora}>
                  <a href="/our-guides" className="font-semibold text-brand-accent-text underline underline-offset-4 decoration-brand-accent/40">
                    Meet all our guides →
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
