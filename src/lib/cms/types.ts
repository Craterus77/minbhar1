export interface Product {
  slug: string;
  title: string;
  designer: string;
  collection: string;
  material: string;
  origin: string;
  description: string;
  image: string;
  images?: string[];
  featured?: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  material: string;
}

export interface Designer {
  slug: string;
  name: string;
  studio: string;
  origin: string;
  bio: string;
  image: string;
  discipline: string;
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  type: string;
  description: string;
  image: string;
  images?: string[];
}

export interface Material {
  slug: string;
  name: string;
  description: string;
  image: string;
}
