/**
 * Central product catalog.
 *
 * Images are sourced from Unsplash (free for commercial use, no attribution required).
 * Swap any `image` URL with your own photos when you have them — just put the file in
 * /public/images/ and change the URL to `/images/your-photo.jpg`.
 */

export type ProductCategory = "livestock" | "crops" | "processed";

export type Product = {
  slug: string;
  category: ProductCategory;
  /** key for translations (in messages/*.json under "products.<slug>") */
  nameKey: string;
  /** Fallback English name if translation is missing */
  nameEn: string;
  /** Image URL — Unsplash CDN or local /images/... */
  image: string;
  /** Optional alt text override (uses name otherwise) */
  alt?: string;
};

export const products: Product[] = [
  // ===== LIVESTOCK =====
  {
    slug: "sheep",
    category: "livestock",
    nameKey: "sheep",
    nameEn: "Sheep",
    image: "/images/sheep-pen.jpg",
  },
  {
    slug: "cattle",
    category: "livestock",
    nameKey: "cattle",
    nameEn: "Cattle",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "goats",
    category: "livestock",
    nameKey: "goats",
    nameEn: "Goats",
    image:
      "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=1200&q=80&auto=format&fit=crop",
  },

  // ===== CROPS =====
  {
    slug: "sesame",
    category: "crops",
    nameKey: "sesame",
    nameEn: "Sesame",
    image:
      "https://images.unsplash.com/photo-1547390318-1f1a4f5ed89c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "peanut",
    category: "crops",
    nameKey: "peanut",
    nameEn: "Peanuts",
    image:
      "https://images.unsplash.com/photo-1567892737950-30c4db4d2bdd?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "wheat",
    category: "crops",
    nameKey: "wheat",
    nameEn: "Wheat",
    image:
      "https://images.unsplash.com/photo-1437252611977-07f74518abd7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "sorghum",
    category: "crops",
    nameKey: "sorghum",
    nameEn: "Sorghum (Dura)",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "sunflower",
    category: "crops",
    nameKey: "sunflower",
    nameEn: "Sunflower",
    image:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "berseem",
    category: "crops",
    nameKey: "berseem",
    nameEn: "Berseem (Clover)",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
  },
];

export function byCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}
