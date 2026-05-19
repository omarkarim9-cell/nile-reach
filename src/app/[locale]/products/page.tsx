import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Beef, Leaf, Package2 } from "lucide-react";
import { getProductsWithOverrides } from "@/lib/getProducts";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export default async function ProductsHubPage() {
  const t = await getTranslations();
  const products = await getProductsWithOverrides();

  return (
    <>
      <PageHero
        eyebrow={t("products.page.eyebrow")}
        title={t("products.page.title")}
        subtitle={t("products.page.subtitle")}
        image="/images/sheep-flock-1.jpg"
      />

      {/* ===== 3 CATEGORY CARDS ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-sand-500 mb-3">
            — {t("products.page.browseTitle")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <CategoryCard
            href="/products/livestock"
            icon={<Beef className="h-5 w-5" strokeWidth={1.6} />}
            title={t("productsSection.livestockTitle")}
            desc={t("productsSection.livestockDesc")}
            image="/images/sheep-flock-1.jpg"
          />
          <CategoryCard
            href="/products/crops"
            icon={<Leaf className="h-5 w-5" strokeWidth={1.6} />}
            title={t("productsSection.cropsTitle")}
            desc={t("productsSection.cropsDesc")}
            image="https://images.unsplash.com/photo-1437252611977-07f74518abd7?w=1200&q=80&auto=format&fit=crop"
          />
          <CategoryCard
            href="/products/processed"
            icon={<Package2 className="h-5 w-5" strokeWidth={1.6} />}
            title={t("productsSection.processedTitle")}
            desc={t("productsSection.processedDesc")}
            image="/images/processing-1.jpg"
          />
        </div>
      </section>

      {/* ===== FULL GALLERY ===== */}
      <section className="bg-sand-100/50 border-y border-sand-200/60">
        <div className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.28em] text-sand-600 mb-4">
              — {t("products.page.allProductsTitle")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-nile-900 leading-tight tracking-tight">
              {t("products.page.allProductsSubtitle")}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((p) => (
              <ProductTile
                key={p.slug}
                image={p.image}
                name={t(`productGallery.items.${p.nameKey}` as never) || p.nameEn}
                href={`/products/${p.category}#${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function CategoryCard({
  href, icon, title, desc, image,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white border border-nile-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-nile-900/5 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 h-9 w-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-nile-800 shadow-sm">
          {icon}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-medium text-nile-900">{title}</h3>
        <p className="mt-2 text-sm text-nile-700/80 leading-relaxed flex-1">{desc}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-nile-700 group-hover:text-nile-900 transition-colors">
          Explore
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}

function ProductTile({ image, name, href }: { image: string; name: string; href: string }) {
  return (
    <Link
      href={href}
      className="group relative aspect-square rounded-xl overflow-hidden bg-nile-100"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nile-900/85 via-nile-900/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <p className="font-display text-base md:text-lg text-sand-50 font-medium leading-tight">
          {name}
        </p>
      </div>
    </Link>
  );
}
