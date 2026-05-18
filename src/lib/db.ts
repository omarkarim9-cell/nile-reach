import { neon } from "@neondatabase/serverless";

/**
 * Lazily-created Neon SQL client. Returns null if DATABASE_URL is missing
 * (e.g. during local dev without DB set up) — callers should handle null.
 */
let _sql: ReturnType<typeof neon> | null = null;
let _attempted = false;

function getSql() {
  if (_attempted) return _sql;
  _attempted = true;

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("[db] DATABASE_URL not set — image overrides disabled.");
    return null;
  }

  _sql = neon(url);
  return _sql;
}

/**
 * Ensures the product_images table exists. Safe to call repeatedly.
 * Called automatically on first read; no manual migration needed.
 */
let _ensured = false;
async function ensureTable() {
  if (_ensured) return;
  const sql = getSql();
  if (!sql) return;

  await sql`
    CREATE TABLE IF NOT EXISTS product_images (
      product_slug TEXT PRIMARY KEY,
      image_url TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  _ensured = true;
}

/**
 * Fetch all image overrides as a Map<slug, url>.
 * Returns empty Map if DB is unavailable.
 */
export async function getAllImageOverrides(): Promise<Map<string, string>> {
  const sql = getSql();
  if (!sql) return new Map();

  try {
    await ensureTable();
    const rows = (await sql`
      SELECT product_slug, image_url FROM product_images
    `) as Array<{ product_slug: string; image_url: string }>;
    return new Map(rows.map((r) => [r.product_slug, r.image_url]));
  } catch (err) {
    console.error("[db] getAllImageOverrides failed:", err);
    return new Map();
  }
}

/**
 * Upsert a product image override.
 */
export async function setImageOverride(slug: string, imageUrl: string) {
  const sql = getSql();
  if (!sql) throw new Error("Database not configured");

  await ensureTable();
  await sql`
    INSERT INTO product_images (product_slug, image_url, updated_at)
    VALUES (${slug}, ${imageUrl}, NOW())
    ON CONFLICT (product_slug)
    DO UPDATE SET image_url = EXCLUDED.image_url, updated_at = NOW()
  `;
}

/**
 * Delete an override, falling back to the default in products.ts.
 */
export async function deleteImageOverride(slug: string) {
  const sql = getSql();
  if (!sql) throw new Error("Database not configured");

  await ensureTable();
  await sql`DELETE FROM product_images WHERE product_slug = ${slug}`;
}
