"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

const slides = [
  {
    src: "/product-images/collections_accent-chairs_products_decrescendo-tufted-armchair.webp",
    alt: "Decrescendo tufted armchair",
  },
  {
    src: "/product-images/collections_dining-tables_products_willa-marble-dining-table-1.png",
    alt: "Willa marble dining table",
  },
  {
    src: "/product-images/products_panama-4-door-rattan-buffet.jpg",
    alt: "Panama four-door rattan buffet",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col justify-end page-padding pb-16 md:pb-24">
        <FadeIn delay={0.5}>
          <p className="section-label mb-6 text-bone/50">M Bhar</p>
        </FadeIn>
        <FadeIn delay={0.7}>
          <h1 className="max-w-4xl font-serif text-display-lg text-balance text-bone">
            Hand made, women empowering and socially responsible Furniture and
            objects
          </h1>
        </FadeIn>
        <FadeIn delay={0.9}>
          <p className="mt-8 max-w-lg font-sans text-sm leading-relaxed text-bone/60 md:text-base">
            Crafted by women artisans across the world — each piece supports fair
            livelihoods, ethical production, and enduring design for considered
            interiors.
          </p>
        </FadeIn>
        <FadeIn delay={1.1}>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Link href="/collections" className="btn-minimal text-bone/80 hover:text-bone">
              Explore collections
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-bone"
            >
              Book appointment
            </Link>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 right-6 flex gap-2 md:right-12">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-px transition-all duration-500 ${
              i === index ? "w-8 bg-bone" : "w-4 bg-bone/30 hover:bg-bone/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
