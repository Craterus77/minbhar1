import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { getProjects } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Projects & Spaces",
  description:
    "Residential and commercial interiors furnished with M Bhar — curated spaces shaped by material continuity.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHero
        label="Projects"
        title="Spaces we have shaped"
        description="A selection of residential and boutique commercial interiors where imported objects define the architectural character of the room."
      />

      <section className="page-padding pb-section">
        <div className="space-y-20">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid gap-8 md:grid-cols-12 md:gap-12"
              >
                <div className="md:col-span-8">
                  <ImageReveal
                    src={project.image}
                    alt={project.title}
                    className="aspect-[16/10]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                <div className="flex flex-col justify-center md:col-span-4">
                  <p className="section-label">
                    {project.type} · {project.location}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl text-charcoal transition-colors group-hover:text-bronze md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal/55">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
