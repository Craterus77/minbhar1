import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "M Bhar — Imported Furniture & Objects",
    template: "%s | M Bhar",
  },
  description:
    "M Bhar curates internationally sourced furniture and objects defined by materiality, craftsmanship, and timeless form.",
  keywords: [
    "luxury furniture",
    "imported furniture",
    "interior design",
    "curated objects",
    "M Bhar",
  ],
  openGraph: {
    title: "M Bhar — Imported Furniture & Objects",
    description:
      "Imported furniture and objects for considered interiors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>
          <SiteShell>{children}</SiteShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
