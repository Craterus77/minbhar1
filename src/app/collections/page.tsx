import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { getCollections } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore M Bhar collections — stone, timber, textile, and metal furniture curated for considered interiors.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <>
      <PageHero
        label="Collections"
        title="A material-led edit"
        description="Each collection is organised around a primary material language — stone, timber, textile, or metal — and the makers who shape it."
      />

      <section className="page-padding pb-section">
        <div className="space-y-24 md:space-y-32">
          {collections.map((col, i) => (
            <Reveal key={col.slug} delay={i * 0.05}>
              <Link
                href={`/collections/${col.slug}`}
                className="group grid gap-8 md:grid-cols-12 md:items-center md:gap-16"
              >
                <div className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-7 md:order-2"}>
                  <ImageReveal
                    src={col.image}
                    alt={col.title}
                    className="aspect-[16/10]"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                <div className={i % 2 === 0 ? "md:col-span-5" : "md:col-span-5 md:order-1"}>
                  <p className="section-label">{col.material}</p>
                  <h2 className="mt-4 font-serif text-4xl text-charcoal transition-colors group-hover:text-bronze md:text-5xl">
                    {col.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm text-charcoal/50">{col.subtitle}</p>
                  <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal/60">
                    {col.description}
                  </p>
                  <span className="btn-minimal mt-8 inline-flex">Explore collection</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
