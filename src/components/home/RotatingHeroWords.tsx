"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Edit order and copy here — cycles with fade in/out */
const words = ["Hands", "Women", "Craft", "Community", "Purpose", "Artisans"];

const INTERVAL_MS = 3200;

export function RotatingHeroWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1
      className="hero-headline max-w-[min(100%,64rem)] text-bone md:max-w-[72rem] lg:max-w-[80rem]"
      aria-live="polite"
    >
      <span className="sr-only">
        {words.join(", ")} — handmade, women empowering furniture and objects
      </span>
      <span className="relative block h-[0.88em] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="absolute left-0 top-0 inline-block"
            initial={{ opacity: 0, y: "40%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-35%" }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
