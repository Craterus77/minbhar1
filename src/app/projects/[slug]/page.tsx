import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { getProject, getProjects } from "@/lib/cms";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative">
        <ImageReveal
          src={project.image}
          alt={project.title}
          className="aspect-[21/9] min-h-[60vh]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 page-padding pb-12">
          <p className="section-label text-bone/50">
            {project.type} · {project.location}
          </p>
          <h1 className="mt-4 font-serif text-display-lg text-bone">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="page-padding py-section">
        <Reveal>
          <p className="max-w-2xl font-sans text-lg leading-relaxed text-charcoal/65">
            {project.description}
          </p>
        </Reveal>
      </section>
    </>
  );
}
