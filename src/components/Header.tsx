"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/quality", label: t("quality") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-sand-50/85 backdrop-blur-md border-b border-nile-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 md:px-8 py-3 md:py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Nile Reach Global Group"
        >
          {/* Logo image (includes brand wordmark) */}
          <Logo className="h-20 md:h-24 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-nile-700 hover:text-nile-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-nile-800 px-4 py-2 text-xs font-semibold text-sand-50 transition-all hover:bg-nile-900 hover:shadow-md"
          >
            {t("requestQuote")}
          </Link>
          <button
            className="lg:hidden p-1.5 -me-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-nile-100 bg-sand-50/95 backdrop-blur-md">
          <nav className="mx-auto max-w-page px-5 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-nile-700 hover:text-nile-900"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-nile-800 px-4 py-2.5 text-xs font-semibold text-sand-50"
            >
              {t("requestQuote")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
