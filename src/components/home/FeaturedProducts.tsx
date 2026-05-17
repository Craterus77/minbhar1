import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/lib/cms";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="page-padding py-section">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">Featured</p>
            <h2 className="font-serif text-display-md text-charcoal">
              Selected pieces
            </h2>
          </div>
          <Link href="/collections" className="btn-minimal shrink-0">
            View all pieces
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
