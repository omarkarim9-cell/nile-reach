"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-full border border-nile-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-nile-800 transition-colors hover:bg-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.8} />
        <span className="hidden sm:inline">{localeNames[locale as Locale]}</span>
        <span className="sm:hidden uppercase">{locale}</span>
        <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-44 overflow-hidden rounded-xl border border-nile-100 bg-white shadow-lg ring-1 ring-black/5 z-50">
          <ul role="listbox" className="py-1">
            {locales.map((l) => (
              <li key={l}>
                <button
                  onClick={() => changeLocale(l)}
                  className={`w-full text-start px-4 py-2 text-sm transition-colors hover:bg-sand-50 ${
                    l === locale ? "text-nile-700 font-semibold" : "text-ink"
                  }`}
                  role="option"
                  aria-selected={l === locale}
                >
                  {localeNames[l]}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-nile-100 px-4 py-2 text-[10px] text-nile-400">
            More via Google Translate
          </div>
        </div>
      )}
    </div>
  );
}
