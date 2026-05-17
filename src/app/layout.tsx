import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Reach Global Group",
  description: "Sudanese origin, global reach.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
