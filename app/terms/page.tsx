import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Norwich Free Walking Tour",
  description: "Terms and conditions for joining the Norwich Free Walking Tour.",
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

export default function TermsPage() {
  return (
    <>
      <main className="bg-brand-bg pt-24 pb-16">
        <div className="brand-container max-w-2xl mx-auto">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3 font-lora">
            Legal
          </p>
          <h1 className="font-caveat text-4xl md:text-5xl font-bold mb-2">Terms &amp; Conditions</h1>
          <p className="font-lora text-sm text-muted-foreground mb-10">
            Last updated: April 2026
          </p>

          <Section title="The tour">
            <p>Norwich Free Walking Tour is operated by Thomas Thornhill (sole trader), Norwich, Norfolk, UK. Contact: <a href="mailto:hello@norwichfreewalkingtours.co.uk" className="text-brand-accent hover:underline">hello@norwichfreewalkingtours.co.uk</a>.</p>
            <p>Norwich Free Walking Tour is a pay what you want walking tour. Joining the tour is free. At the end, participants are invited to tip the guide based on their experience. There is no minimum or maximum tip amount.</p>
            <p>The tour runs near daily, starting outside The Forum on Millennium Plain, Norwich city centre NR2 1TF. The tour lasts approximately 1 hour 45 minutes.</p>
          </Section>

          <Section title="Booking">
            <p>Booking is required to guarantee your place. You can book through our website. Booking is free.</p>
            <p>Bookings may be cancelled at any time at no charge. If you can no longer attend, please cancel your booking so your spot can be offered to others.</p>
          </Section>

          <Section title="Tour operation">
            <p>The tour runs every day, rain or shine. In the event of severe weather or exceptional circumstances, we reserve the right to cancel or modify the tour. We will make reasonable efforts to notify confirmed bookings in advance.</p>
            <p>The guide reserves the right to modify the route, order of stops, or content of the tour based on conditions on the day.</p>
          </Section>

          <Section title="Participant responsibility">
            <p>Participants join the tour at their own risk. The route is mostly flat and easy underfoot, but participants should wear appropriate footwear and clothing for the weather.</p>
            <p>Participants are responsible for their own safety and the safety of any children or dependants in their care. The guide is not responsible for any loss, injury, or damage arising from participation in the tour.</p>
            <p>Participants are expected to behave respectfully towards the guide, other participants, and members of the public.</p>
          </Section>

          <Section title="Photographs and media">
            <p>By joining the tour you consent to being photographed or filmed for promotional purposes. If you do not wish to be included in any photographs or video, please inform the guide at the start of the tour.</p>
          </Section>

          <Section title="Governing law">
            <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </Section>

          <Section title="Contact">
            <p>If you have questions about these terms, please <a href="/contact" className="text-brand-accent hover:underline">contact us</a>.</p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
