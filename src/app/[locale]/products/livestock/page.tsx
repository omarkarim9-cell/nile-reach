import { CategoryPage } from "@/components/CategoryPage";
import { getProductsByCategory } from "@/lib/getProducts";

export default async function LivestockPage() {
  const items = await getProductsByCategory("livestock");
  return <CategoryPage category="livestock" heroImage="/images/sheep-pen.jpg" items={items} />;
}
