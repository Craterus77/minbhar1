import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";

const materials = [
  {
    name: "Upholstery",
    detail: "Tufted · Leather",
    image:
      "/product-images/collections_accent-chairs_products_aquino-faux-leather-armchair.webp",
  },
  {
    name: "Timber",
    detail: "Beech · Solid wood",
    image:
      "/product-images/collections_closet_products_noelle-wood-sideboard.jpg",
  },
  {
    name: "Rattan",
    detail: "Woven · Natural fibre",
    image: "/product-images/products_panama-rattan-2-door-buffet.jpg",
  },
  {
    name: "Stone",
    detail: "Marble · Dining",
    image:
      "/product-images/collections_dining-tables_products_willa-marble-dining-table-1.png",
  },
];

export function MaterialsSection() {
  return (
    <section className="bg-travertine/40 py-section">
      <div className="page-padding">
        <Reveal>
          <p className="section-label mb-4">Materiality</p>
          <h2 className="max-w-2xl font-serif text-display-md text-charcoal">
            Surfaces that define the room
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {materials.map((mat, i) => (
            <Reveal key={mat.name} delay={i * 0.06}>
              <article className="group">
                <ImageReveal
                  src={mat.image}
                  alt={mat.name}
                  className="aspect-[3/4]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="mt-4 border-t border-charcoal/10 pt-4">
                  <h3 className="font-serif text-xl text-charcoal md:text-2xl">
                    {mat.name}
                  </h3>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/45">
                    {mat.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
