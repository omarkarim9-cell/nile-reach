"use client";

import { useEffect } from "react";

type Props = { locale: string; dir: "rtl" | "ltr" };

/**
 * Updates the <html lang> and <html dir> attributes whenever the locale
 * changes. Necessary because the root layout's <html> is rendered statically
 * once with lang="en", but locale-specific routes need to update it for SEO
 * and RTL support.
 */
export function LocaleDirSetter({ locale, dir }: Props) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  return null;
}
