import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a private appointment with M Bhar — imported furniture and objects by enquiry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="By appointment"
        description="Our studio welcomes private viewings for designers, architects, and clients commissioning considered interiors."
      />

      <section className="page-padding pb-section">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="space-y-10">
              <div>
                <p className="section-label mb-3">Email</p>
                <a
                  href="mailto:studio@mbhar.com"
                  className="link-underline font-serif text-2xl text-charcoal"
                >
                  studio@mbhar.com
                </a>
              </div>
              <div>
                <p className="section-label mb-3">Hours</p>
                <p className="font-sans text-sm text-charcoal/60">
                  Tuesday — Thursday, 11:00 — 18:00
                  <br />
                  By appointment only
                </p>
              </div>
              <div>
                <p className="section-label mb-3">Studio</p>
                <address className="not-italic font-sans text-sm leading-relaxed text-charcoal/60">
                  M Bhar Showroom
                  <br />
                  Private viewings
                  <br />
                  International enquiries welcome
                </address>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
