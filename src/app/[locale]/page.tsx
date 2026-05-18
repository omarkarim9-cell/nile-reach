import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, Leaf, Beef, Package2, ShieldCheck } from "lucide-react";
import { getProductsWithOverrides } from "@/lib/getProducts";

export default async function HomePage() {
  const t = useTranslations();
  const products = await getProductsWithOverrides();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sheep-pen.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-nile-900/85 via-nile-900/70 to-sand-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-nile-900/70 via-transparent to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/60 to-transparent" />

        <div className="relative mx-auto max-w-page px-5 md:px-8 pt-24 md:pt-36 pb-32 md:pb-48">
          <div className="max-w-2xl">
            <p className="animate-fade-up delay-1 text-xs md:text-sm uppercase tracking-[0.32em] text-sand-300 mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-sand-400" />
              {t("hero.eyebrow")}
            </p>
            <h1 className="animate-fade-up delay-2 font-display text-4xl md:text-6xl lg:text-7xl font-medium text-sand-50 leading-[1.05] tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="animate-fade-up delay-3 mt-6 text-base md:text-lg text-sand-100/85 max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="animate-fade-up delay-4 mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-sand-400 px-6 py-3 text-sm font-semibold text-nile-900 transition-all hover:bg-sand-300 hover:shadow-lg hover:shadow-sand-400/20"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-sand-300/40 px-6 py-3 text-sm font-medium text-sand-50 transition-all hover:bg-sand-50/10"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-page px-5 md:px-8 -mt-16 md:-mt-20 pb-2">
          <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-nile-100 shadow-xl shadow-nile-900/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-nile-100 rtl:divide-x-reverse">
            <Stat number="20+" label={t("stats.countries")} />
            <Stat number="15+" label={t("stats.products")} />
            <Stat number="30+" label={t("stats.experience")} />
            <Stat number="100%" label={t("stats.certified")} />
          </div>
        </div>
      </section>

      {/* ===== CATEGORY CARDS ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 pt-28 md:pt-36 pb-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.28em] text-sand-500 mb-4">
              — {t("productsSection.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-nile-900 leading-tight tracking-tight max-w-2xl">
              {t("productsSection.title")}
            </h2>
          </div>
          <p className="text-base text-nile-700/85 leading-relaxed md:pt-12">
            {t("productsSection.subtitle")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ProductCard
            href="/products/livestock"
            icon={<Beef className="h-5 w-5" strokeWidth={1.6} />}
            title={t("productsSection.livestockTitle")}
            desc={t("productsSection.livestockDesc")}
            image="/images/sheep-flock-1.jpg"
            items={["Sheep", "Cattle", "Goats"]}
          />
          <ProductCard
            href="/products/crops"
            icon={<Leaf className="h-5 w-5" strokeWidth={1.6} />}
            title={t("productsSection.cropsTitle")}
            desc={t("productsSection.cropsDesc")}
            image="https://images.unsplash.com/photo-1437252611977-07f74518abd7?w=1200&q=80&auto=format&fit=crop"
            items={["Sesame", "Peanuts", "Sorghum", "Wheat", "Sunflower", "Berseem"]}
          />
          <ProductCard
            href="/products/processed"
            icon={<Package2 className="h-5 w-5" strokeWidth={1.6} />}
            title={t("productsSection.processedTitle")}
            desc={t("productsSection.processedDesc")}
            image="https://images.unsplash.com/photo-1547390318-1f1a4f5ed89c?w=1200&q=80&auto=format&fit=crop"
            items={["Halal meat", "Oilseeds", "Value-added"]}
          />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-nile-700 hover:text-nile-900 transition-colors group"
          >
            {t("productsSection.viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ===== PRODUCT GALLERY ===== */}
      <section className="bg-sand-100/50 border-y border-sand-200/60">
        <div className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.28em] text-sand-600 mb-4">
              — {t("productGallery.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-nile-900 leading-tight tracking-tight">
              {t("productGallery.title")}
            </h2>
            <p className="mt-5 text-base text-nile-700/85 leading-relaxed">
              {t("productGallery.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
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

      {/* ===== ABOUT (story strip) ===== */}
      <section className="relative bg-nile-900 text-sand-50 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 600"
        >
          <path
            d="M -100 200 Q 300 100 500 280 T 1300 400"
            stroke="#C9A961"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -100 350 Q 400 250 600 420 T 1300 500"
            stroke="#FAF7F2"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-page px-5 md:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-sand-400 mb-4">
              — {t("about.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium leading-tight tracking-tight">
              {t("about.title")}
            </h2>
          </div>
          <div>
            <p className="text-base md:text-lg leading-relaxed text-sand-100/90">
              {t("about.body")}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sand-300 hover:text-sand-50 transition-colors group"
            >
              {t("about.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUALITY ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
          <div className="md:col-span-2">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-earth-500/10 text-earth-600 mb-5">
              <ShieldCheck className="h-6 w-6" strokeWidth={1.7} />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-sand-500 mb-3">
              — {t("quality.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-nile-900 leading-tight tracking-tight">
              {t("quality.title")}
            </h2>
            <p className="mt-5 text-base text-nile-700/85 leading-relaxed">
              {t("quality.body")}
            </p>
            <Link
              href="/quality"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-nile-700 hover:text-nile-900 transition-colors group"
            >
              {t("quality.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-nile-100">
              <Image
                src="/images/sheep-flock-2.jpg"
                alt="Livestock at our partner facility"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 mt-8">
              <div className="rounded-2xl bg-sand-100 p-5 border border-sand-200">
                <p className="font-display text-2xl text-nile-900 font-medium">Halal</p>
                <p className="text-xs text-nile-700/70 mt-1">Certified slaughter</p>
              </div>
              <div className="rounded-2xl bg-earth-500/10 p-5 border border-earth-500/20">
                <p className="font-display text-2xl text-earth-700 font-medium">ISO</p>
                <p className="text-xs text-nile-700/70 mt-1">Quality management</p>
              </div>
              <div className="rounded-2xl bg-nile-100 p-5 border border-nile-200">
                <p className="font-display text-2xl text-nile-900 font-medium">Vet.</p>
                <p className="text-xs text-nile-700/70 mt-1">Veterinary inspection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-nile-800 to-nile-900 px-8 md:px-16 py-16 md:py-20 text-center">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-sand-400/30 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-sand-400/30 rounded-br-3xl" />

          <h2 className="font-display text-3xl md:text-5xl font-medium text-sand-50 leading-tight tracking-tight max-w-2xl mx-auto">
            {t("cta.title")}
          </h2>
          <p className="mt-5 text-base md:text-lg text-sand-100/85 max-w-xl mx-auto leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-sand-400 px-8 py-3.5 text-sm font-semibold text-nile-900 transition-all hover:bg-sand-300 hover:shadow-lg hover:shadow-sand-400/20 group"
          >
            {t("cta.button")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}

// ============================================================
// Sub-components
// ============================================================

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="px-6 py-6 md:py-7 text-center">
      <p className="font-display text-3xl md:text-4xl font-medium text-nile-900 leading-none">
        {number}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-nile-600/80 leading-tight">
        {label}
      </p>
    </div>
  );
}

function ProductCard({
  href,
  icon,
  title,
  desc,
  image,
  items,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  image: string;
  items: string[];
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
        <div className="mt-5 flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="inline-block text-[10px] uppercase tracking-wider text-nile-600 bg-sand-100 px-2.5 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ProductTile({
  image,
  name,
  href,
}: {
  image: string;
  name: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-nile-100"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nile-900/85 via-nile-900/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-lg md:text-xl text-sand-50 font-medium leading-tight">
          {name}
        </p>
      </div>
    </Link>
  );
}
