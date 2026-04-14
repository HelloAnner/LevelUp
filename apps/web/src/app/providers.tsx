'use client';

import type { ReactElement, ReactNode } from 'react';
import { ReducedMotionProvider } from '@levelup/motion';

export default function Providers({ children }: { children: ReactNode }): ReactElement {
  return (
    <ReducedMotionProvider>
      {children}
    </ReducedMotionProvider>
  );
}
