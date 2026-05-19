import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Nile Reach Global",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sand-50">{children}</div>;
}
