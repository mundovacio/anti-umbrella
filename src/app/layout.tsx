import type { Metadata } from "next";
import "@/styles/globals.css";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Umbrella",
  description: "Manage difficult conversations for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased grid grid-rows-[1fr_auto]">
        <main className="pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
