import Image from "next/image";

// WhatIsFreeTour — explainer of the free-tour model.
// Extracted from app/page.tsx so it can be reused on /what-is-a-free-tour.

export function WhatIsFreeTour() {
  return (
    <section className="section-padding bg-brand-accent-light">
      <div className="brand-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p
              className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              How free tours work
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold mb-5 leading-tight">
              What&apos;s a free tour?
            </h2>
            <div
              className="space-y-3"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              <p className="text-lg text-brand-text leading-relaxed" style={{ fontWeight: 700 }}>
                Free tours are a growing accessible way to get a great local introduction to a city.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You join for free, spend 1 hour 45 minutes with a local guide who will show you the best spots and tell their favourite stories, and at the end you tip what you thought it was worth.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">No fixed price.</p>
              <p className="text-base text-muted-foreground leading-relaxed">No pressure.</p>
              <p className="text-base text-muted-foreground leading-relaxed">Just a fair exchange.</p>
            </div>
          </div>
          {/* Polaroid wrap — Tom 2026-05-19. Source image is portrait, so
              the frame uses aspect-[4/5] (portrait) + object-position
              center top to keep guests' heads in frame. Warm-cream paper
              tone (#F5EBDA) to match the polaroid aesthetic on /home-v2
              and /about. */}
          <div
            className="relative max-w-sm w-full mx-auto"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <div
              className="p-3 pb-12 shadow-2xl border border-brand-text/5"
              style={{ backgroundColor: "#F5EBDA" }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-sm shadow-sm"
                style={{
                  backgroundColor: "rgba(241, 225, 161, 0.75)",
                  borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                }}
              />
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/tour/what-is-free-tour.jpg"
                  alt="Visitors joining the Norwich Free Walking Tour and exploring the city with a local guide."
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              </div>
              <p
                className="absolute bottom-2 left-4 italic text-brand-text/75 text-[20px] leading-none"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                a typical group
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
