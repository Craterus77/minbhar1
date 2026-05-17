import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { getCollection, getProduct, getProducts } from "@/lib/cms";

interface Props {
  params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateStaticParams() {
  return getProducts().map((p) => ({
    slug: p.collection,
    productSlug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) return { title: "Piece" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, productSlug } = await params;
  const product = getProduct(productSlug);
  const collection = getCollection(slug);
  if (!product || !collection || product.collection !== slug) notFound();

  return (
    <>
      <section className="page-padding pt-28 pb-section">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ImageReveal
            src={product.image}
            alt={product.title}
            className="aspect-[3/4]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="flex flex-col justify-center">
            <Reveal>
              <Link
                href={`/collections/${slug}`}
                className="section-label link-underline"
              >
                {collection.title}
              </Link>
              <h1 className="mt-6 font-serif text-display-md text-charcoal">
                {product.title}
              </h1>
              <p className="mt-4 font-sans text-sm text-charcoal/50">
                {product.designer} · {product.origin}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="divider my-10" />
              <dl className="grid gap-6 font-sans text-sm">
                <div>
                  <dt className="section-label">Material</dt>
                  <dd className="mt-2 text-charcoal/80">{product.material}</dd>
                </div>
                <div>
                  <dt className="section-label">Origin</dt>
                  <dd className="mt-2 text-charcoal/80">{product.origin}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-10 font-sans text-base leading-relaxed text-charcoal/65">
                {product.description}
              </p>
              <Link href="/contact" className="btn-minimal mt-12 inline-flex">
                Enquire about this piece
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
