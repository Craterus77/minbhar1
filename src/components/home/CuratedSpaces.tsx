import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { getProjects } from "@/lib/cms";

export function CuratedSpaces() {
  const projects = getProjects().slice(0, 2);

  return (
    <section className="page-padding py-section">
      <Reveal>
        <p className="section-label mb-4">Curated Spaces</p>
        <h2 className="max-w-xl font-serif text-display-md text-charcoal">
          Interiors shaped by permanence
        </h2>
      </Reveal>

      <div className="mt-16 space-y-24 md:space-y-32">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={0.1}>
            <Link
              href={`/projects/${project.slug}`}
              className={`group grid gap-8 md:grid-cols-12 md:items-center md:gap-12 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              <div
                className={`md:col-span-7 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  className="aspect-[16/10]"
                />
              </div>
              <div
                className={`md:col-span-5 ${
                  i % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                  {project.type} · {project.location}
                </p>
                <h3 className="mt-4 font-serif text-3xl text-charcoal transition-colors group-hover:text-bronze md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal/60">
                  {project.description}
                </p>
                <span className="btn-minimal mt-8 inline-flex">View project</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-20 text-center">
          <Link href="/projects" className="btn-minimal">
            All projects
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
