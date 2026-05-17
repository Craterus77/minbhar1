"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/cms/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collections/${product.collection}/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-travertine">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/60 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          initial={false}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-bone/70">
            {product.material}
          </p>
        </motion.div>
      </div>
      <div className="mt-5">
        <h3 className="font-serif text-xl text-charcoal transition-colors group-hover:text-bronze">
          {product.title}
        </h3>
        <p className="mt-1 font-sans text-sm text-charcoal/50">{product.designer}</p>
      </div>
    </Link>
  );
}
