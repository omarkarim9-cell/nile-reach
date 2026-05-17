import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("nav");
  return (
    <div className="mx-auto max-w-page px-5 md:px-8 py-24">
      <h1 className="font-display text-4xl text-nile-900">{t("products")}</h1>
      <p className="mt-4 text-nile-700/80">Full products hub coming in Phase 2.</p>
    </div>
  );
}
