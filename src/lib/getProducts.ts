import "server-only";
import { getAllImageOverrides } from "./db";
import { products, applyImageOverrides, byCategory, type ProductCategory } from "./products";

/**
 * Server-only: returns the canonical product list with any
 * admin-uploaded image overrides applied. Use this instead of
 * importing `products` directly in pages that render images.
 */
export async function getProductsWithOverrides() {
  const overrides = await getAllImageOverrides();
  return applyImageOverrides(overrides);
}

export async function getProductsByCategory(category: ProductCategory) {
  const overrides = await getAllImageOverrides();
  const resolved = applyImageOverrides(overrides);
  return resolved.filter((p) => p.category === category);
}

// Re-export for convenience
export { byCategory, products };
