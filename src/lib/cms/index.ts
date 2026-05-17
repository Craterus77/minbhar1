import collectionsData from "../../../content/collections.json";
import productsData from "../../../content/products.json";
import designersData from "../../../content/designers.json";
import journalData from "../../../content/journal.json";
import projectsData from "../../../content/projects.json";
import type {
  Collection,
  Designer,
  JournalPost,
  Product,
  Project,
} from "./types";

export type {
  Collection,
  Designer,
  JournalPost,
  Product,
  Project,
} from "./types";

export function getCollections(): Collection[] {
  return collectionsData as Collection[];
}

export function getCollection(slug: string): Collection | undefined {
  return getCollections().find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.featured);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return getProducts().filter((p) => p.collection === collectionSlug);
}

export function getDesigners(): Designer[] {
  return designersData as Designer[];
}

export function getDesigner(slug: string): Designer | undefined {
  return getDesigners().find((d) => d.slug === slug);
}

export function getJournalPosts(): JournalPost[] {
  return (journalData as JournalPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getJournalPost(slug: string): JournalPost | undefined {
  return getJournalPosts().find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
