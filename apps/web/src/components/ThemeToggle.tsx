'use client';

import type { ReactElement } from 'react';
import { useTheme, type ThemeMode } from '@/lib/theme';

const OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'auto', label: 'Auto' },
];

export default function ThemeToggle(): ReactElement {
  const { mode, setMode } = useTheme();
  return (
    <div className="seg">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`seg-btn${mode === o.value ? ' active' : ''}`}
          onClick={() => setMode(o.value)}
          aria-pressed={mode === o.value}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
