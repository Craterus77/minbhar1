import Link from "next/link";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { getCollections } from "@/lib/cms";

export function FeaturedCollections() {
  const collections = getCollections().slice(0, 4);

  return (
    <section className="page-padding py-section">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">Collections</p>
            <h2 className="font-serif text-display-md text-charcoal">
              Material-led edit
            </h2>
          </div>
          <Link href="/collections" className="btn-minimal shrink-0">
            View all
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
        {collections.map((col, i) => {
          const spans = [
            "md:col-span-7 md:row-span-2",
            "md:col-span-5",
            "md:col-span-5",
            "md:col-span-7",
          ];
          const heights = [
            "aspect-[4/5] md:aspect-auto md:min-h-[520px]",
            "aspect-[4/3]",
            "aspect-[4/3]",
            "aspect-[16/10]",
          ];

          return (
            <Reveal key={col.slug} delay={i * 0.08} className={spans[i]}>
              <Link href={`/collections/${col.slug}`} className="group block">
                <ImageReveal
                  src={col.image}
                  alt={col.title}
                  className={heights[i]}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal transition-colors group-hover:text-bronze md:text-3xl">
                      {col.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-charcoal/50">
                      {col.subtitle}
                    </p>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 opacity-0 transition-opacity group-hover:opacity-100">
                    View
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
