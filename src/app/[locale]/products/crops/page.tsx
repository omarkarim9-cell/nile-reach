import { CategoryPage } from "@/components/CategoryPage";
import { getProductsByCategory } from "@/lib/getProducts";

export default async function CropsPage() {
  const items = await getProductsByCategory("crops");
  return (
    <CategoryPage
      category="crops"
      heroImage="https://images.unsplash.com/photo-1437252611977-07f74518abd7?w=1600&q=80&auto=format&fit=crop"
      items={items}
    />
  );
}
