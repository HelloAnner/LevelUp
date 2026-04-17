'use client';

import type { ReactElement, ReactNode } from 'react';
import { ReducedMotionProvider } from '@levelup/motion';
import { KeyboardProvider } from '@/lib/keyboard';
import { DrawerProvider } from '@/lib/drawer';
import { ThemeProvider } from '@/lib/theme';

interface ProvidersProps {
  children: ReactNode;
  initialSidebarCollapsed?: boolean;
}

export default function Providers({
  children,
  initialSidebarCollapsed,
}: ProvidersProps): ReactElement {
  return (
    <ReducedMotionProvider>
      <ThemeProvider>
        <KeyboardProvider initialSidebarCollapsed={initialSidebarCollapsed}>
          <DrawerProvider>
            {children}
          </DrawerProvider>
        </KeyboardProvider>
      </ThemeProvider>
    </ReducedMotionProvider>
  );
}
