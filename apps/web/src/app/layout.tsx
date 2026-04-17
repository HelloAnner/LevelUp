import type { ReactElement, ReactNode } from 'react';
import { cookies } from 'next/headers';
import Providers from './providers';
import GlobalShortcuts from '@/components/GlobalShortcuts';
import CommandBar from '@/components/CommandBar';
import DrawerHost from '@/components/DrawerHost';
import NightBanner from '@/components/NightBanner';
import ScenesNav from '@/components/ScenesNav';
import './globals.css';

export const metadata = {
  title: 'LevelUp',
  description: 'Your growth companion — one who walked the road with you.',
};

export default async function RootLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
  const cookieStore = await cookies();
  const stored = cookieStore.get('theme')?.value;
  // 'auto' resolves client-side — server picks dark as a neutral default to match :root
  const initial = stored === 'light' ? 'light' : 'dark';
  const sidebarCollapsed = cookieStore.get('sidebar-collapsed')?.value === '1';
  return (
    <html lang="en" data-theme={initial}>
      <body>
        <Providers initialSidebarCollapsed={sidebarCollapsed}>
          <GlobalShortcuts />
          <NightBanner />
          {children}
          <CommandBar />
          <DrawerHost />
          <ScenesNav />
        </Providers>
      </body>
    </html>
  );
}
