import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
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
        visual={{ kind: "guides" }}
        eyebrow="Thanks for walking with us"
      />

      <Footer />
    </main>
  );
}
