import { CuratedSpaces } from "@/components/home/CuratedSpaces";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { TradeCTA } from "@/components/home/TradeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <FeaturedProducts />
      <MaterialsSection />
      <CuratedSpaces />
      <TradeCTA />
    </>
  );
}
