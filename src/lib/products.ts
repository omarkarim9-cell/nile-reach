/**
 * Central product catalog.
 *
 * Each product references a translation key (descKey) under
 * `productGallery.descriptions.<key>` in messages/*.json
 *
 * Swap any image with your own by changing the URL.
 */

export type ProductCategory = "livestock" | "crops" | "processed";

export type Product = {
  slug: string;
  category: ProductCategory;
  /** key for translations: productGallery.items.<nameKey> */
  nameKey: string;
  /** fallback name */
  nameEn: string;
  image: string;
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
    image: "/images/peanut.jpg",
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
    image: "/images/berseem.jpg",
  },

  // ===== PROCESSED =====
  {
    slug: "halal-meat",
    category: "processed",
    nameKey: "halalMeat",
    nameEn: "Halal Meat",
    image: "/images/processing-halal-stamps.jpg",
  },
  {
    slug: "oilseeds",
    category: "processed",
    nameKey: "oilseeds",
    nameEn: "Oilseeds",
    image:
      "https://images.unsplash.com/photo-1547390318-1f1a4f5ed89c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "value-added",
    category: "processed",
    nameKey: "valueAdded",
    nameEn: "Value-added Products",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1200&q=80&auto=format&fit=crop",
  },
];

export function byCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}

/**
 * Apply image overrides (from DB) to the product list, falling back to
 * the default image when no override exists.
 */
export function applyImageOverrides(
  overrides: Map<string, string>
): Product[] {
  return products.map((p) => {
    const overrideUrl = overrides.get(p.slug);
    return overrideUrl ? { ...p, image: overrideUrl } : p;
  });
}
