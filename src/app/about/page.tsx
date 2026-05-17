import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "M Bhar curates internationally sourced furniture and objects for luxury residential and boutique commercial interiors.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Quiet luxury, considered sourcing"
        description="M Bhar exists at the intersection of gallery, studio, and European furniture house — a destination for architects and designers seeking permanence."
      />

      <section className="page-padding pb-section">
        <Reveal>
          <ParallaxImage
            src="/product-images/freedom_mandaguari-wardrobe.jpg"
            alt="Mandaguari wardrobe"
            className="aspect-[21/9]"
          />
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
              Our philosophy
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 font-sans text-base leading-relaxed text-charcoal/65">
              <p>
                We believe furniture should be collected, not consumed. Every piece
                in the M Bhar edit is selected for its material integrity,
                sculptural presence, and capacity to anchor a room for decades.
              </p>
              <p>
                Rather than mass retail, we operate as a curator — partnering with
                interior designers and architects on residential lofts, gallery
                suites, and boutique hospitality spaces where craft is paramount.
              </p>
              <p>
                Our sourcing spans Italy, Denmark, Portugal, and Belgium — regions
                where stone, timber, and metal traditions remain alive in small
                ateliers rather than factories.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="divider my-20" />

        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Curated",
              text: "A tightly edited selection — never catalogue breadth.",
            },
            {
              title: "Architectural",
              text: "Forms conceived for spatial dialogue, not trend cycles.",
            },
            {
              title: "Permanent",
              text: "Materials and joinery chosen to age with grace.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal/55">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
