import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function TradeCTA() {
  return (
    <section className="border-y border-charcoal/10 bg-charcoal text-bone">
      <div className="page-padding py-section">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="section-label mb-4 text-bone/40">Trade Program</p>
            <h2 className="font-serif text-display-md text-bone">
              For designers & architects
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-sm leading-relaxed text-bone/55 md:text-base">
              M Bhar partners with interior designers and architectural studios
              on residential and boutique commercial projects. Trade members
              receive dedicated sourcing, specification support, and priority
              access to new collections.
            </p>
            <Link href="/trade" className="btn-minimal mt-10 text-bone/70 hover:text-bone">
              Apply for trade access
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
