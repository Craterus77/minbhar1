import Link from "next/link";
import { navLinks } from "@/config/navigation";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  return (
    <footer className="bg-charcoal text-bone">
      <div className="page-padding py-section">
        <Reveal>
          <p className="font-serif text-display-xl leading-[0.9] text-bone/90">
            M Bhar
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.1}>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-bone/50">
              Curating internationally sourced furniture and objects defined by
              materiality, craftsmanship, and timeless form.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="section-label mb-6 text-bone/40">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline font-sans text-sm text-bone/70 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="section-label mb-6 text-bone/40">Studio</p>
            <address className="not-italic font-sans text-sm leading-relaxed text-bone/50">
              <p>By appointment</p>
              <p className="mt-2">
                <a
                  href="mailto:studio@mbhar.com"
                  className="text-bone/70 hover:text-bone"
                >
                  studio@mbhar.com
                </a>
              </p>
            </address>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="section-label mb-6 text-bone/40">Trade</p>
            <p className="font-sans text-sm leading-relaxed text-bone/50">
              For interior designers and architects.{" "}
              <Link href="/trade" className="text-bone/70 hover:text-bone">
                Apply for trade access
              </Link>
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-bone/10 pt-8 md:flex-row md:justify-between">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-bone/30">
            © {new Date().getFullYear()} M Bhar. All rights reserved.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-bone/30">
            Craft · Materiality · Permanence
          </p>
        </div>
      </div>
    </footer>
  );
}