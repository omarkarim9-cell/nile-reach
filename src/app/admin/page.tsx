import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllImageOverrides } from "@/lib/db";
import { products, applyImageOverrides } from "@/lib/products";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const overrides = await getAllImageOverrides();
  const resolved = applyImageOverrides(overrides);

  // Pass which products have overrides (vs defaults) so the UI can show a badge
  const items = resolved.map((p) => ({
    slug: p.slug,
    category: p.category,
    name: p.nameEn,
    image: p.image,
    hasOverride: overrides.has(p.slug),
  }));

  return <AdminDashboard items={items} />;
}
