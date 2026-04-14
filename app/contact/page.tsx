import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Norwich Free Walking Tour",
  description:
    "Get in touch with the Norwich Free Walking Tour. Questions, group bookings, or just want to say hello.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-bg pt-16">
      {/* Hero */}
      <section className="section-padding border-b border-brand-accent/10">
        <div className="brand-container max-w-3xl mx-auto text-center">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h1 className="font-caveat text-5xl md:text-6xl font-bold text-brand-text mb-4 leading-tight">
            Get in touch with Norwich Free Walking Tours
          </h1>
          <p className="font-lora text-lg text-muted-foreground leading-relaxed">
            Questions about the tour, group visits, or just want to get in
            touch. We&apos;re quick to respond.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="brand-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Left: Form */}
            <div>
              <h2 className="font-caveat text-3xl font-bold text-brand-text mb-6">
                Send a message
              </h2>
              <ContactForm />
            </div>

            {/* Right: Direct contact */}
            <div className="flex flex-col gap-6">
              <h2 className="font-caveat text-3xl font-bold text-brand-text">
                Or reach us directly
              </h2>

              {/* Email */}
              <a
                href="mailto:hello@norwichfreewalkingtours.co.uk"
                className="flex items-start gap-4 bg-brand-accent-light rounded-xl p-5 border border-brand-accent/20 hover:border-brand-accent/40 transition-colors duration-150 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors duration-150">
                  <Mail className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-lora text-sm font-semibold text-brand-text">
                    hello@norwichfreewalkingtours.co.uk
                  </p>
                </div>
              </a>

              {/* Meeting point */}
              <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-brand-accent/10">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-lora text-sm font-semibold text-brand-text">
                    Meeting point
                  </p>
                  <address className="font-lora text-sm text-muted-foreground mt-0.5 not-italic leading-relaxed">
                    Outside The Forum<br />
                    Millennium Plain<br />
                    Norwich, NR2 1TF<br />
                    Near daily
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
