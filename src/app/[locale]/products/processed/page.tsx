import { CategoryPage } from "@/components/CategoryPage";
import { getProductsByCategory } from "@/lib/getProducts";

export default async function ProcessedPage() {
  const items = await getProductsByCategory("processed");
  return <CategoryPage category="processed" heroImage="/images/processing-1.jpg" items={items} />;
}
