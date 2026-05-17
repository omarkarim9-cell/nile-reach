import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-nile-100 bg-nile-900 text-sand-100">
      <div className="mx-auto max-w-page px-5 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo variant="mark" className="h-14 w-14 mb-3" />
            <p className="font-display text-lg leading-tight text-sand-50">
              Nile Reach Global
            </p>
            <p className="mt-2 text-sm text-sand-200/80 italic">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-sand-300 mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/quality"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("nav.quality")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("nav.sustainability")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-sand-300 mb-4">
              {t("footer.products")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products/livestock"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("nav.livestock")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/crops"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("nav.crops")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/processed"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("nav.processed")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-sand-300 mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-sand-400" strokeWidth={1.8} />
                <span className="text-sand-100/80">{t("footer.address")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-sand-400" strokeWidth={1.8} />
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("footer.email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-nile-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sand-300/70">
          <p>© {year} Nile Reach Global. {t("footer.rightsReserved")}</p>
          <p className="italic">Khartoum · Dubai · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
