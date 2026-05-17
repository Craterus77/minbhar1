import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="page-padding pt-32 pb-16 md:pt-40 md:pb-24">
      <FadeIn>
        <p className="section-label mb-6">{label}</p>
      </FadeIn>
      <Reveal>
        <h1 className="max-w-4xl font-serif text-display-lg text-charcoal">
          {title}
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-charcoal/60">
            {description}
          </p>
        </Reveal>
      )}
    </section>
  );
}
