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

import { auth } from '@/features/auth/config/auth';
import { getSettings } from '@/features/settings/actions/get-settings';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let theme = 'sunset';

  if (session?.user) {
    try {
      const settings = await getSettings();
      theme = settings.theme;
    } catch (error) {
      console.log('Failed to load settings for theme', error);
    }
  }

  return (
    <html lang="es" data-theme={theme}>
      <body className="antialiased grid grid-rows-[1fr_auto]">
        <MainLayout>
          <main>{children}</main>
        </MainLayout>
        <DockNav />
      </body>
    </html>
  );
}
