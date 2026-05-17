"use client";

import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavOverlay } from "./NavOverlay";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuOpen={() => setMenuOpen((o) => !o)}
      />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
