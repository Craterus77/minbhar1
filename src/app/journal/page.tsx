import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { formatDate } from "@/lib/utils";
import { getJournalPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays on materiality, craft, and considered interiors from the M Bhar studio.",
};

export default function JournalPage() {
  const posts = getJournalPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        label="Journal"
        title="Notes on material & form"
        description="Editorial writing on craft, sourcing, and the quiet language of imported objects."
      />

      <section className="page-padding pb-section">
        {featured && (
          <Reveal>
            <Link href={`/journal/${featured.slug}`} className="group grid gap-8 md:grid-cols-2 md:gap-16">
              <ImageReveal
                src={featured.image}
                alt={featured.title}
                className="aspect-[4/3]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="flex flex-col justify-center">
                <p className="section-label">{featured.category}</p>
                <h2 className="mt-4 font-serif text-4xl text-charcoal transition-colors group-hover:text-bronze md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal/60">
                  {featured.excerpt}
                </p>
                <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/40">
                  {formatDate(featured.date)} · {featured.readTime}
                </p>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="divider my-20" />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <ImageReveal
                  src={post.image}
                  alt={post.title}
                  className="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <p className="section-label mt-6">{post.category}</p>
                <h3 className="mt-3 font-serif text-2xl text-charcoal transition-colors group-hover:text-bronze">
                  {post.title}
                </h3>
                <p className="mt-3 font-sans text-sm text-charcoal/50 line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/40">
                  {formatDate(post.date)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
