import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { getDesigners } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Designers & Makers",
  description:
    "Meet the European ateliers and studios behind M Bhar — craftsmen selected for permanence and material integrity.",
};

export default function DesignersPage() {
  const designers = getDesigners();

  return (
    <>
      <PageHero
        label="Designers"
        title="Makers we stand behind"
        description="We partner with a small circle of European ateliers — each chosen for craft, material honesty, and forms that endure beyond trend."
      />

      <section className="page-padding pb-section">
        <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-16">
          {designers.map((designer, i) => (
            <Reveal key={designer.slug} delay={i * 0.06}>
              <Link href={`/designers/${designer.slug}`} className="group block">
                <ImageReveal
                  src={designer.image}
                  alt={designer.name}
                  className="aspect-[4/5]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="mt-6">
                  <p className="section-label">{designer.discipline}</p>
                  <h2 className="mt-3 font-serif text-3xl text-charcoal transition-colors group-hover:text-bronze">
                    {designer.name}
                  </h2>
                  <p className="mt-2 font-sans text-sm text-charcoal/50">{designer.origin}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
