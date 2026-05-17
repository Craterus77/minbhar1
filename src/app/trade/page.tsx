import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { TradeForm } from "@/components/forms/TradeForm";

export const metadata: Metadata = {
  title: "Trade Program",
  description:
    "Apply for M Bhar trade access — dedicated sourcing and specification support for interior designers and architects.",
};

const benefits = [
  {
    title: "Dedicated sourcing",
    text: "Priority access to new collections and limited editions before public release.",
  },
  {
    title: "Specification support",
    text: "Material samples, dimensions, and technical documentation for project submissions.",
  },
  {
    title: "Project pricing",
    text: "Trade pricing structured for residential and boutique commercial specifications.",
  },
  {
    title: "White-glove logistics",
    text: "Coordinated delivery and installation support for international freight.",
  },
];

export default function TradePage() {
  return (
    <>
      <PageHero
        label="Trade"
        title="Partner with M Bhar"
        description="Our trade program serves interior designers, architects, and design studios working on luxury residential and boutique commercial projects."
      />

      <section className="page-padding pb-section">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="space-y-12">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.06}>
                  <h3 className="font-serif text-2xl text-charcoal">{b.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/60">
                    {b.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <TradeForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
