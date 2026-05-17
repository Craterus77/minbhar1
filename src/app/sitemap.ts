import type { MetadataRoute } from "next";
import {
  getCollections,
  getDesigners,
  getJournalPosts,
  getProducts,
  getProjects,
} from "@/lib/cms";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mbhar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collections",
    "/designers",
    "/about",
    "/projects",
    "/journal",
    "/trade",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const collectionRoutes = getCollections().map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = getProducts().map((p) => ({
    url: `${baseUrl}/collections/${p.collection}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const designerRoutes = getDesigners().map((d) => ({
    url: `${baseUrl}/designers/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectRoutes = getProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes = getJournalPosts().map((j) => ({
    url: `${baseUrl}/journal/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...productRoutes,
    ...designerRoutes,
    ...projectRoutes,
    ...journalRoutes,
  ];
}
