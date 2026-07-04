import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { TrackedBookLink } from "@/components/TrackedBookLink";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Users, Accessibility, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Norwich Free Walking Tours",
  description:
    "Get in touch with the Norwich Free Walking Tours. Questions, group bookings, or just want to say hello.",
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk/contact",
  },
};

const askedAbout = [
  {
    icon: Users,
    title: "Group bookings",
    body: "Got a group of 10 or more? You can still book the standard tour, but a private tour gives you a dedicated guide, your own start time, and a route shaped around what your group cares about. Drop us your group size and a rough date and we'll come back with options.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    body: "A few of our stops are gloriously medieval, which is a polite way of saying cobbled. We can skip or go around the trickiest bits without missing the good stuff. Email ahead with anything we should know (wheelchair, pushchair, limited mobility) and we'll shape the walk around you.",
  },
  {
    icon: Sparkles,
    title: "Custom requests",
    body: "School trips, hen and stag groups, family birthdays, corporate days, university welcomes. We tailor the route, the pace and the stories. Tell us who's coming and what kind of day you want, and we'll build it.",
  },
];

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
          <p className="font-lora text-sm text-muted-foreground mt-3">
            Booking the standard daily tour? Use the{" "}
            <TrackedBookLink location="contact" className="text-brand-accent hover:underline font-semibold">
              booking page
            </TrackedBookLink>
            {" "}instead. It&apos;s faster.
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
                    Daily, typically 10:30am
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we usually get asked */}
      <section className="section-padding bg-brand-accent-light border-t border-brand-accent/10">
        <div className="brand-container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3 font-lora">
              Before you write
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
              What we usually get asked
            </h2>
            <p className="font-lora text-base text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
              Three of the most common reasons people drop us a line. If yours is one of these, you can save time and tell us straight away.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {askedAbout.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-brand-accent/10 shadow-sm flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-caveat text-2xl font-bold text-brand-text mb-2">
                    {item.title}
                  </h3>
                  <p className="font-lora text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center font-lora text-sm text-muted-foreground mt-8">
            Looking for a private tour quote?{" "}
            <a href="/private-tours" className="text-brand-accent hover:underline font-semibold">
              See private tours
            </a>
            {" "}for what&apos;s included, then drop us a message above.
          </p>
        </div>
      </section>

      {/* About the tour, briefly */}
      <section className="section-padding bg-brand-bg border-t border-brand-accent/10">
        <div className="brand-container max-w-2xl mx-auto text-center">
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            About the tour
          </p>
          <h2 className="font-caveat text-3xl md:text-4xl font-bold text-brand-text mb-4">
            Free to book. Pay what it was worth.
          </h2>
          <p className="font-lora text-base text-muted-foreground leading-relaxed mb-3">
            We&apos;re the only daily free walking tour in Norwich. Every day from The Forum, typically 10:30am. 2 hours, about 2.5 km, mostly flat, group capped at 15. Local guides who actually live here.
          </p>
          <p className="font-lora text-base text-muted-foreground leading-relaxed">
            At the end you tip what you think the tour was worth. Most guests tip £10 to £20 per person. If it wasn&apos;t worth it, you don&apos;t pay. That&apos;s the deal.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
