import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

/** WhatsApp glyph in official brand green (#25D366) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="#25D366"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.45 3.43 1.32 4.93L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.11.82.83-3.04-.19-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.85.83-.85 2.03 0 1.2.87 2.36 1 2.52.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const phone = t("footer.phone");
  const phoneTel = phone.replace(/\s/g, "");
  const whatsappUrl = `https://wa.me/${phoneTel.replace(/[^0-9]/g, "")}`;
  const email = t("footer.email");

  return (
    <footer className="mt-24 border-t border-nile-100 bg-nile-900 text-sand-100">
      <div className="mx-auto max-w-page px-5 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* ===== Brand block ===== */}
          <div className="md:col-span-1">
            <div className="inline-block rounded-lg bg-sand-50 p-2 mb-4">
              <Logo className="h-16 w-auto" />
            </div>
            <p className="font-display text-base leading-tight text-sand-50">
              {t("footer.companyName")}
            </p>
            <p className="mt-2 text-sm text-sand-200/80 italic">
              {t("footer.tagline")}
            </p>
          </div>

          {/* ===== Company links ===== */}
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

          {/* ===== Product links ===== */}
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

          {/* ===== Contact ===== */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-sand-300 mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="h-4 w-4 mt-0.5 text-sand-400 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <span className="text-sand-100/80 leading-relaxed">
                  {t("footer.addressLine1")}
                  <br />
                  {t("footer.addressLine2")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="h-4 w-4 mt-0.5 text-sand-400 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <a
                  href={`tel:${phoneTel}`}
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                  dir="ltr"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <WhatsAppIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                >
                  {t("footer.whatsappLabel")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="h-4 w-4 mt-0.5 text-sand-400 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <a
                  href={`mailto:${email}`}
                  className="text-sand-100/80 hover:text-sand-50 transition-colors break-all"
                  dir="ltr"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe
                  className="h-4 w-4 mt-0.5 text-sand-400 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <a
                  href="https://nile-reach.com"
                  className="text-sand-100/80 hover:text-sand-50 transition-colors"
                  dir="ltr"
                >
                  {t("footer.website")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-nile-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sand-300/70">
          <p>
            © {year} {t("footer.companyName")}. {t("footer.rightsReserved")}
          </p>
          <p className="italic">Ajman · Khartoum · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
