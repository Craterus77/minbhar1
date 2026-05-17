import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { getDesigner, getDesigners } from "@/lib/cms";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getDesigners().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const designer = getDesigner(slug);
  if (!designer) return { title: "Designer" };
  return { title: designer.name, description: designer.bio };
}

export default async function DesignerPage({ params }: Props) {
  const { slug } = await params;
  const designer = getDesigner(slug);
  if (!designer) notFound();

  return (
    <section className="page-padding pt-28 pb-section">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <ImageReveal
          src={designer.image}
          alt={designer.name}
          className="aspect-[3/4]"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="section-label">{designer.discipline}</p>
            <h1 className="mt-4 font-serif text-display-md text-charcoal">
              {designer.name}
            </h1>
            <p className="mt-3 font-sans text-sm text-charcoal/50">{designer.origin}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 font-sans text-base leading-relaxed text-charcoal/65">
              {designer.bio}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
