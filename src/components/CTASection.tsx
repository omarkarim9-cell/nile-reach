import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="mx-auto max-w-page px-5 md:px-8 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-nile-800 to-nile-900 px-8 md:px-16 py-16 md:py-20 text-center">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-sand-400/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-sand-400/30 rounded-br-3xl" />

        <h2 className="font-display text-3xl md:text-5xl font-medium text-sand-50 leading-tight tracking-tight max-w-2xl mx-auto">
          {t("title")}
        </h2>
        <p className="mt-5 text-base md:text-lg text-sand-100/85 max-w-xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-sand-400 px-8 py-3.5 text-sm font-semibold text-nile-900 transition-all hover:bg-sand-300 hover:shadow-lg hover:shadow-sand-400/20 group"
        >
          {t("button")}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            strokeWidth={2}
          />
        </Link>
      </div>
    </section>
  );
}
