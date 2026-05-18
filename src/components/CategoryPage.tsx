"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/products";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

type Props = {
  category: ProductCategory;
  heroImage: string;
  items: Product[];
};

export function CategoryPage({ category, heroImage, items }: Props) {
  const t = useTranslations();

  const eyebrow = t(`nav.${category}` as never);
  const title = t(`productsSection.${category}Title` as never);
  const subtitle = t(`products.page.category${capitalize(category)}Subtitle` as never);

  return (
    <>
      <PageHero
        eyebrow={t("products.page.eyebrow")}
        title={title}
        subtitle={subtitle}
        image={heroImage}
        imageAlt={eyebrow}
      />

      {/* ===== PRODUCT GRID ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductDetailCard
              key={p.slug}
              id={p.slug}
              name={t(`productGallery.items.${p.nameKey}` as never) || p.nameEn}
              description={getDescription(p, t)}
              image={p.image}
            />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getDescription(
  p: { slug: string; nameKey: string; category: ProductCategory },
  t: ReturnType<typeof useTranslations>
): string {
  if (p.category !== "processed") {
    try {
      return t(`productGallery.descriptions.${p.nameKey}` as never);
    } catch {
      return "";
    }
  }
  try {
    return t(`productGallery.${p.nameKey}` as never);
  } catch {
    return "";
  }
}

function ProductDetailCard({
  id, name, description, image,
}: {
  id: string;
  name: string;
  description: string;
  image: string;
}) {
  const t = useTranslations("products.page");

  return (
    <article
      id={id}
      className="group flex flex-col rounded-2xl bg-white border border-nile-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-nile-900/5 scroll-mt-32"
    >
      <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <h2 className="font-display text-2xl text-nile-900 font-medium mb-3">{name}</h2>
        <p className="text-sm text-nile-700/85 leading-relaxed flex-1">{description}</p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-nile-700 hover:text-nile-900 transition-colors group/cta"
        >
          {t("requestQuote")}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
            strokeWidth={2}
          />
        </Link>
      </div>
    </article>
  );
}
