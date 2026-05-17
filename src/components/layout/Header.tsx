"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuOpen: () => void;
  menuOpen: boolean;
}

export function Header({ onMenuOpen, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury page-padding",
        scrolled
          ? "py-4 backdrop-blur-md bg-bone/70"
          : "py-8 md:py-10 lg:py-12"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[3.5rem] items-center justify-between gap-6 md:min-h-[4.5rem]"
      >
        <Link
          href="/"
          className={cn(
            "header-logo text-charcoal",
            scrolled && "header-logo--compact"
          )}
          aria-label="M Bhar home"
        >
          M Bhar
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/70 transition-colors hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/trade"
            className="hidden font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60 transition-colors hover:text-charcoal md:block"
          >
            Trade
          </Link>
          <button
            type="button"
            onClick={onMenuOpen}
            className="group flex flex-col items-end gap-1.5 p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "block h-px bg-charcoal transition-all duration-500 ease-luxury",
                scrolled ? "w-8" : "w-10 md:w-12",
                menuOpen && "translate-y-[4px] rotate-45 w-10 md:w-12"
              )}
            />
            <span
              className={cn(
                "block h-px bg-charcoal transition-all duration-500 ease-luxury",
                scrolled ? "w-6" : "w-8 md:w-10",
                !menuOpen && "group-hover:w-10 md:group-hover:w-12",
                menuOpen && "-translate-y-[4px] -rotate-45 w-10 md:w-12"
              )}
            />
          </button>
        </div>
      </motion.div>
    </header>
  );
}
