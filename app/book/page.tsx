import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";

export const metadata: Metadata = {
  title: "Book | Norwich Free Walking Tour",
  description:
    "Book your spot on the Norwich Free Walking Tour. Free to reserve. Near daily from The Forum. Pay what it was worth at the end by card, Apple Pay, Google Pay or cash.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/book",
  },
};

export default function BookPage() {
  return (
    <>
      <main className="min-h-screen bg-brand-bg">
        {/* Page header */}
        <div className="brand-container pt-16 pb-8 text-center">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Reserve your spot
          </p>
          <h1 className="font-caveat text-4xl md:text-5xl font-bold mb-4">
            Book your free Norwich walking tour spot
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            Free to book. Meet outside The Forum. Pay what it was worth at the end by card, Apple Pay, Google Pay or cash.
          </p>
        </div>

        {/* Booking widget — full width */}
        <div className="brand-container pb-16">
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-brand-accent/15 bg-white">
            <BookingFrame height={700} />
          </div>

          {/* Reassurance strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
            <span>Free to book</span>
            <span className="hidden sm:block text-brand-accent/40">&bull;</span>
            <span>English language &bull; Near daily</span>
            <span className="hidden sm:block text-brand-accent/40">&bull;</span>
            <span>Pay at the end by card, Apple Pay, Google Pay or cash</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
