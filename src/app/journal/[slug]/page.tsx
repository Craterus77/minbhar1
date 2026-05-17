import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { formatDate } from "@/lib/utils";
import { getJournalPost, getJournalPosts } from "@/lib/cms";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getJournalPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Journal" };
  return { title: post.title, description: post.excerpt };
}

const articleBodies: Record<string, string[]> = {
  "on-travertine": [
    "Travertine carries the memory of water — its pores, its warmth, its refusal to read as cold stone. At M Bhar, we source honed slabs from quarries in Tivoli and Apulia, selecting blocks with consistent veining and a matte finish that catches light without glare.",
    "In residential interiors, travertine consoles and stools anchor entry sequences and bath suites. The material pairs naturally with brushed brass and walnut — a triad we return to across collections.",
  ],
  "curating-residential-calm": [
    "Restraint is not absence. It is the discipline of choosing fewer objects with greater presence. In our conversation with Elena Voss, she describes how imported furniture should feel discovered rather than placed — as though it has always belonged to the room.",
    "We discuss proportion, negative space, and the role of texture when colour palettes remain neutral. Bouclé and linen introduce tactility; stone provides weight; metal offers punctuation.",
  ],
  "brass-patina": [
    "Hand-patinated brass develops a living surface. Unlike lacquered finishes that arrest oxidation, our partners in Porto apply oils and heat treatments that allow bronze and brass to deepen over years of use.",
    "Pendant lights and side tables become more resolved with time — a quality we consider essential to quiet luxury.",
  ],
  "european-sourcing": [
    "M Bhar does not chase trends. We visit ateliers annually, reviewing new work against a simple criterion: will this piece still feel necessary in twenty years?",
    "Our network spans Milanese stone workshops, Copenhagen timber studios, and Portuguese metal foundries — each relationship built on mutual respect for craft.",
  ],
};

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const paragraphs = articleBodies[slug] ?? [post.excerpt];

  return (
    <>
      <section className="page-padding pt-32 pb-12 md:pt-40">
        <Reveal>
          <p className="section-label">{post.category}</p>
          <h1 className="mt-6 max-w-4xl font-serif text-display-md text-charcoal">
            {post.title}
          </h1>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/40">
            {formatDate(post.date)} · {post.readTime}
          </p>
        </Reveal>
      </section>

      <div className="page-padding">
        <ImageReveal
          src={post.image}
          alt={post.title}
          className="aspect-[21/9]"
          sizes="100vw"
        />
      </div>

      <article className="page-padding mx-auto max-w-2xl py-section">
        {paragraphs.map((para, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="mb-8 font-sans text-base leading-[1.8] text-charcoal/70">
              {para}
            </p>
          </Reveal>
        ))}
      </article>
    </>
  );
}
