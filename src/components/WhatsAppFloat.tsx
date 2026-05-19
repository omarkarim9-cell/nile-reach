"use client";

import { useTranslations } from "next-intl";

/**
 * Floating WhatsApp button — bottom-right (bottom-left in RTL).
 * Persistent across all pages of the locale routes.
 */
export function WhatsAppFloat() {
  const t = useTranslations("footer");

  const phone = t("phone");
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${phoneDigits}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        group fixed z-40
        bottom-5 end-5 md:bottom-7 md:end-7
        inline-flex items-center justify-center
        h-14 w-14 md:h-15 md:w-15
        rounded-full
        bg-[#25D366] hover:bg-[#1ebe5d]
        shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40
        transition-all duration-300
        hover:scale-105
      "
    >
      {/* WhatsApp glyph (white on green) */}
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 md:h-8 md:w-8 text-white"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.45 3.43 1.32 4.93L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.11.82.83-3.04-.19-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.85.83-.85 2.03 0 1.2.87 2.36 1 2.52.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
      </svg>

      {/* Pulse ring on hover for a bit of life */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-30 group-hover:animate-ping pointer-events-none" />
    </a>
  );
}
