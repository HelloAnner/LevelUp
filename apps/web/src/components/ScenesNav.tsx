'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { useI18n } from '@/lib/i18n-client';

export default function ScenesNav(): ReactElement {
  // Hide in production — dev-only navigation
  if (process.env.NODE_ENV === 'production') return <></>;

  const { messages } = useI18n();
  const nav = messages.scenesNav;
  const scenes: Array<{ href: string; label: string }> = [
    { href: '/', label: nav.chat },
    { href: '/onboarding', label: nav.onboarding },
    { href: '/scenes/empty', label: nav.empty },
    { href: '/scenes/milestone', label: nav.milestone },
    { href: '/scenes/lost', label: nav.lost },
    { href: '/scenes/cmd', label: nav.command },
    { href: '/scenes/drawer', label: nav.drawer },
    { href: '/scenes/settings', label: nav.settings },
    { href: '/scenes/roadmap', label: nav.roadmap },
    { href: '/scenes/support-tree', label: nav.support },
  ];
  const pathname = usePathname();
  return (
    <nav className="scenes-nav">
      {scenes.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className={pathname === s.href ? 'active' : ''}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
