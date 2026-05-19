import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isRtl, locales, type Locale } from "@/i18n/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleDirSetter } from "@/components/LocaleDirSetter";

export const metadata: Metadata = {
  title: "Nile Reach Global Group — Sudanese origin, global reach.",
  description:
    "Premium agricultural commodities and livestock exported from Sudan by Nile Reach Global Group, Ajman, UAE. Sesame, peanuts, sorghum, sheep, cattle and more.",
  metadataBase: new URL("https://nile-reach.com"),
  openGraph: {
    title: "Nile Reach Global Group",
    description: "Sudanese origin, global reach.",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Sets the <html> lang+dir attributes on the client so RTL works */}
      <LocaleDirSetter locale={locale} dir={dir} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
