import type { Metadata } from "next";
import "@/styles/globals.css";
import { DockNav } from "@/shared/components/layout/DockNav";

export const metadata: Metadata = {
  title: "Umbrella",
  description: "Manage difficult conversations for you",
  icons: {
    icon: '/favicon.png',
  },
};

import { MainLayout } from "@/shared/components/layout/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased grid grid-rows-[1fr_auto]">
        <MainLayout>
          <main>{children}</main>
        </MainLayout>
        <DockNav />
      </body>
    </html>
  );
}
