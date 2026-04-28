'use client';

import type { ReactElement } from 'react';
import { useTheme } from '@/lib/theme';
import { useI18n } from '@/lib/i18n-client';

export default function NightBanner(): ReactElement {
  const { showNightBanner, setMode, dismissNightBanner } = useTheme();
  const { messages } = useI18n();
  const t = messages.nightBanner;

  if (!showNightBanner) return <></>;

  return (
    <div className="night-banner">
      <span>{t.prompt}</span>
      <button
        className="night-banner-btn"
        onClick={() => {
          setMode('dark');
          dismissNightBanner();
        }}
      >
        {t.confirm}
      </button>
      <button
        className="night-banner-btn dim"
        onClick={dismissNightBanner}
      >
        {t.dismiss}
      </button>
    </div>
  );
}
