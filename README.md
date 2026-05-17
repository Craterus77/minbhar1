# M Bhar

Luxury furniture import website — editorial, minimalist, gallery-like aesthetic built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** — bone, travertine, walnut, charcoal, bronze, olive palette
- **Framer Motion** — scroll reveals, page transitions, hover scaling
- **Lenis** — smooth scrolling
- **File-based CMS** — JSON content in `/content` (ready to swap for Sanity, Contentful, etc.)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Cinematic hero, collections, materials, curated spaces, trade CTA |
| `/collections` | Material-led collections |
| `/collections/[slug]` | Collection detail + products |
| `/designers` | Makers & ateliers |
| `/about` | Brand philosophy |
| `/projects` | Residential & commercial spaces |
| `/journal` | Editorial articles |
| `/trade` | Trade program application |
| `/contact` | Appointment booking |

## CMS

Content lives in `content/*.json`. The `src/lib/cms` module abstracts data access — replace implementations with Sanity, Contentful, or Payload when ready.

## Environment

```env
NEXT_PUBLIC_SITE_URL=https://mbhar.com
```

## Production

```bash
npm run build
npm start
```

Product photography lives in `public/product-images/` (synced from `content/product-images/`). Update `content/products.json` and `content/collections.json` when adding new pieces.
