import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

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

export default function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  const phone = tFooter("phone");
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${phoneDigits}`;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-nile-900 via-nile-800 to-nile-900 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/60 to-transparent" />

        <div className="relative mx-auto max-w-page px-5 md:px-8 pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <p className="animate-fade-up delay-1 text-xs md:text-sm uppercase tracking-[0.32em] text-sand-300 mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-sand-400" />
              {t("eyebrow")}
            </p>
            <h1 className="animate-fade-up delay-2 font-display text-3xl md:text-5xl lg:text-6xl font-medium text-sand-50 leading-[1.1] tracking-tight">
              {t("title")}
            </h1>
            <p className="animate-fade-up delay-3 mt-5 text-base md:text-lg text-sand-100/85 max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-10 md:gap-14">
          {/* === Form === */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* === Direct contact sidebar === */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-sand-100 p-6 md:p-7 space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-600 font-semibold">
                {t("direct.title")}
              </p>

              <ContactCard
                icon={<WhatsAppIcon className="h-5 w-5" />}
                label={t("direct.whatsapp")}
                value={phone}
                href={whatsappUrl}
                external
              />

              <ContactCard
                icon={<Phone className="h-4 w-4 text-nile-700" strokeWidth={2} />}
                label={t("direct.phone")}
                value={phone}
                href={`tel:${phoneDigits}`}
              />

              <ContactCard
                icon={<Mail className="h-4 w-4 text-nile-700" strokeWidth={2} />}
                label={t("direct.email")}
                value={tFooter("email")}
                href={`mailto:${tFooter("email")}`}
              />

              <div className="pt-5 border-t border-sand-300/60">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    className="h-4 w-4 mt-0.5 text-nile-700 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <div className="text-sm text-nile-800 leading-relaxed">
                    <p className="font-semibold">{tFooter("companyName")}</p>
                    <p className="text-nile-700/85 mt-1">
                      {tFooter("addressLine1")}
                      <br />
                      {tFooter("addressLine2")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon, label, value, href, external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 group"
    >
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-nile-600/70 uppercase tracking-wider">{label}</p>
        <p
          className="text-sm font-medium text-nile-900 group-hover:text-nile-700 transition-colors"
          dir="ltr"
        >
          {value}
        </p>
      </div>
    </a>
  );
}
