// TipAnchor — sets price expectation between HowItWorks and PracticalInfo.
// Standalone band on bg-brand-bg so it contrasts with HowItWorks's brand-accent-light above.
// No CTA — the PracticalInfo CTA sits one scroll below; this band exists to anchor the £.

export function TipAnchor() {
  return (
    <section className="section-padding bg-brand-bg">
      <div className="brand-container max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl border border-brand-accent/15 shadow-md p-8 md:p-10">
          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            What guests usually tip
          </p>
          <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text leading-tight mb-4">
            On a good day, guests tip £10 to £20 per person.
          </h2>
          <p
            className="text-lg text-brand-text leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Pay less, pay more, or pay nothing. All of those are fine.
          </p>
          <p
            className="text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Your guide does this full time. What you tip is what they earn.
          </p>
          <p
            className="mt-6 text-sm text-muted-foreground italic"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Card, Apple Pay, Google Pay or cash &mdash; all work.
          </p>
        </div>
      </div>
    </section>
  );
}
