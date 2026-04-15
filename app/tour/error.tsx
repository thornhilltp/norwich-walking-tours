"use client";

import { useEffect } from "react";

export default function TourError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[/tour] Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-caveat text-4xl font-bold text-brand-text mb-4">
          Tour page hit a snag
        </h1>
        <p
          className="text-base text-brand-text/70 mb-6 leading-relaxed"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Something didn&apos;t load right. Try again, or head to the{" "}
          <a href="/book" className="text-brand-accent underline underline-offset-2">
            booking page
          </a>{" "}
          to reserve your spot directly.
        </p>
        <button
          onClick={reset}
          className="btn-cta inline-flex items-center justify-center px-6 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
