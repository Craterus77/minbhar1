"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/config/navigation";

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function NavOverlay({ open, onClose }: NavOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-charcoal text-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="relative z-10 flex flex-1 flex-col justify-between page-padding py-8 md:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="flex justify-between"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="font-hero text-2xl">M Bhar</span>
              <button
                type="button"
                onClick={onClose}
                className="font-sans text-[11px] uppercase tracking-[0.2em] text-bone/60 hover:text-bone"
              >
                Close
              </button>
            </motion.div>

            <nav className="flex flex-col gap-2 md:gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.06,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 font-serif text-display-md text-bone/90 transition-colors hover:text-bone"
                  >
                    <span className="font-sans text-[10px] tracking-[0.2em] text-bone/30">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="flex flex-col gap-6 border-t border-bone/10 pt-8 md:flex-row md:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="max-w-sm font-sans text-sm leading-relaxed text-bone/50">
                Imported furniture and objects for considered interiors.
              </p>
              <div className="flex flex-col gap-2 font-sans text-[11px] uppercase tracking-[0.15em] text-bone/40">
                <a href="mailto:studio@mbhar.com" className="hover:text-bone/70">
                  studio@mbhar.com
                </a>
                <span>By appointment</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
