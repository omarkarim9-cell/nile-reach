export const locales = ["en", "ar", "fr", "es", "de", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  zh: "中文",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: string) {
  return rtlLocales.includes(locale as Locale);
}
