import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin · Nile Reach Global Group",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-sand-50 font-sans">{children}</body>
    </html>
  );
}
