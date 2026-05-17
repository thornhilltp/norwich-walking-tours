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
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/tour/what-is-free-tour.jpg"
              alt="Visitors joining the Norwich Free Walking Tour and exploring the city with a local guide."
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
