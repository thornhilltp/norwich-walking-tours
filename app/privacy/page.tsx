import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Norwich Free Walking Tour",
  description: "How Norwich Free Walking Tour collects and uses your data.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-caveat text-2xl font-bold mb-3">{title}</h2>
      <div className="font-lora text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-brand-bg pt-24 pb-16">
        <div className="brand-container max-w-2xl mx-auto">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3 font-lora">
            Legal
          </p>
          <h1 className="font-caveat text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          <p className="font-lora text-sm text-muted-foreground mb-10">
            Last updated: April 2026
          </p>

          <Section title="Who we are">
            <p>
              Norwich Free Walking Tour is operated by Thomas Thornhill, a sole trader based in
              Norwich, Norfolk, UK. Thomas Thornhill is the data controller for personal data
              collected through this website.
            </p>
            <p>
              We operate the website at norwichfreewalkingtours.co.uk. For any questions about this
              policy or to exercise your data rights, contact us via the{" "}
              <a href="/contact" className="text-brand-accent hover:underline">contact page</a> or
              at{" "}
              <a href="mailto:hello@norwichfreewalkingtours.co.uk" className="text-brand-accent hover:underline">
                hello@norwichfreewalkingtours.co.uk
              </a>.
            </p>
          </Section>

          <Section title="What data we collect">
            <p>
              <strong>Contact form:</strong> When you submit our contact form we collect your name,
              email address, and message. This is used only to respond to your enquiry and is not
              used for marketing.
            </p>
            <p>
              <strong>Booking data:</strong> When you book a tour through our booking widget, we
              collect your full name, email address, and phone number (for booking confirmation and
              reminders), and the number of adults and children in your group (for capacity
              management). We also record your group type (e.g. solo, couple, family) for
              operational purposes, and any UTM parameters present in the URL at the time of
              booking (e.g. source, medium, campaign) for marketing attribution.
            </p>
            <p>
              <strong>Payment data:</strong> We do not collect, process, or store any payment card
              information. The tour is free to book. Tips at the end of the tour are given directly
              to the guide by card reader or cash.
            </p>
            <p>
              <strong>Analytics:</strong> With your consent, we use Google Analytics 4 to understand
              how visitors use the site. This collects anonymised data such as pages visited, time
              on site, and device type. IP addresses are anonymised. No personally identifiable
              information is collected through analytics.
            </p>
          </Section>

          <Section title="How we use your data">
            <p>
              <strong>Contact enquiries</strong> are used solely to respond to your message. We do
              not add you to any mailing list without your explicit consent.
            </p>
            <p>
              <strong>Booking data</strong> is used to manage your reservation, send confirmation
              and reminder emails, and manage tour capacity. Email addresses may be used to send
              you information about future tours if you have not unsubscribed.
            </p>
            <p>
              <strong>Analytics data</strong> is used to improve the website experience. It is
              never sold or shared with third parties for advertising purposes.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              <strong>Contact form messages</strong> are delivered to our inbox via Resend and are
              retained in our email account for as long as necessary to handle your enquiry.
            </p>
            <p>
              <strong>Booking data</strong> is stored in Supabase (hosted on AWS in the EU region).
              Personal information (name, email, phone) is automatically anonymised after 2 years.
              Email preference records (e.g. unsubscribe records) are deleted after 3 years of
              inactivity.
            </p>
            <p>
              <strong>Google Analytics data</strong> is retained for 14 months in accordance with
              our GA4 settings.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under UK GDPR you have the right to access, correct, or request deletion of any
              personal data we hold about you. To exercise these rights,{" "}
              <a href="/contact" className="text-brand-accent hover:underline">contact us</a> or
              email{" "}
              <a href="mailto:hello@norwichfreewalkingtours.co.uk" className="text-brand-accent hover:underline">
                hello@norwichfreewalkingtours.co.uk
              </a>.
            </p>
            <p>
              You can opt out of analytics cookies at any time via the cookie banner or by
              installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-brand-accent hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Analytics opt-out browser add-on
              </a>.
            </p>
            <p>
              You can unsubscribe from booking reminder emails at any time by clicking the
              unsubscribe link in any email we send.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              We use Google Analytics, which places cookies to distinguish users and analyse site
              usage. No other cookies are set by this website.
            </p>
            <p>
              A consent banner appears on your first visit. Analytics cookies are only placed on
              your device if you choose to accept. You can change your preference at any time by
              clearing your browser&apos;s local storage for this site, which will cause the banner
              to reappear.
            </p>
          </Section>

          <Section title="Third parties">
            <p>We share data with the following service providers only as necessary to operate:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Resend</strong> — receives your name and email address to deliver booking
                confirmations, reminders, and contact form replies.
              </li>
              <li>
                <strong>Supabase</strong> — hosts our booking database (AWS EU region). Stores
                booking fields as described above.
              </li>
              <li>
                <strong>Vercel</strong> — hosts this website. Receives your IP address and request
                metadata as part of normal web hosting. This is not stored beyond standard server
                logs.
              </li>
              <li>
                <strong>Google Analytics</strong> — receives anonymised usage data if you accept
                analytics cookies.
              </li>
            </ul>
            <p>No personal data is sold or shared for marketing purposes.</p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. Changes will be posted on this page with
              an updated date. Continued use of the site after changes constitutes acceptance of the
              updated policy.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
