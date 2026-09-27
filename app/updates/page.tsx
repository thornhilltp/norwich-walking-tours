import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { Footer } from "@/components/Footer";

// Standalone sign-up page for social bio links and the end-of-tour QR
// code. Unlisted: no nav link, noindex, not in the sitemap.
export const metadata: Metadata = {
  title: "New tours first | Norwich Free Walking Tours",
  description:
    "Join the list and hear about new Norwich walks before anyone else. A few emails a year, only when there's news.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/updates",
  },
  robots: { index: false, follow: true },
};

export default function UpdatesPage() {
  return (
    <main className="bg-brand-bg pt-16">
      <EmailCapture
        source="updates"
        asPageHeading
        photo={{
          src: "/images/tour/tom-tombland-talk.jpg",
          alt: "Guide telling a story to a tour group in Tombland",
          caption: "Thanks for walking with us",
        }}
      />

      <section className="py-10 bg-brand-bg">
        <div className="brand-container max-w-2xl mx-auto text-center">
          <p
            className="text-muted-foreground mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Not done the Essentials Tour yet? It runs every day from The Forum.
          </p>
          <TrackedBookLink
            location="updates"
            className="btn-cta inline-flex items-center justify-center h-12 px-6 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150"
          >
            Book a free tour
          </TrackedBookLink>
        </div>
      </section>

      <Footer />
    </main>
  );
}
