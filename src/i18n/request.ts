import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (locales as readonly string[]).includes(requested as string)
    ? (requested as Locale)
    : "en";

  if (!(locales as readonly string[]).includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
