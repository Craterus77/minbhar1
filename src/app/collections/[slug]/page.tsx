import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { ImageReveal } from "@/components/ui/ImageReveal";
import {
  getCollection,
  getCollections,
  getProductsByCollection,
} from "@/lib/cms";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  return (
    <>
      <section className="relative">
        <ImageReveal
          src={collection.image}
          alt={collection.title}
          className="aspect-[21/9] min-h-[50vh]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 page-padding pb-12 md:pb-16">
          <p className="section-label text-bone/50">{collection.material}</p>
          <h1 className="mt-4 font-serif text-display-lg text-bone">
            {collection.title}
          </h1>
        </div>
      </section>

      <section className="page-padding py-section">
        <Reveal>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-charcoal/60">
            {collection.description}
          </p>
        </Reveal>

        {products.length > 0 && (
          <div className="mt-20">
            <p className="section-label mb-12">Pieces</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Reveal key={product.slug}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
