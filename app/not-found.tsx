import { ArrowRight, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80dvh] flex flex-col items-center justify-center bg-brand-bg px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-brand-accent-light flex items-center justify-center mb-6">
        <MapPin className="w-8 h-8 text-brand-accent" aria-hidden="true" />
      </div>

      {/* Heading */}
      <h1 className="font-caveat text-5xl md:text-6xl font-bold text-brand-text mb-3">
        You&apos;ve wandered off the route.
      </h1>

      {/* Sub */}
      <p
        className="text-lg text-muted-foreground max-w-md leading-relaxed mb-8"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        This page doesn&apos;t exist. But Norwich does, and the tour starts at
        The Forum.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="/"
          className="btn-cta inline-flex items-center justify-center gap-2 h-12 px-8 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-lg focus-brand"
        >
          Back to home
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
        <a
          href="/book"
          className="inline-flex items-center justify-center h-12 px-6 border border-brand-accent/30 text-brand-accent rounded-xl hover:bg-brand-accent/5 transition-colors duration-150 text-base focus-brand"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Book the tour
        </a>
      </div>
    </main>
  );
}
