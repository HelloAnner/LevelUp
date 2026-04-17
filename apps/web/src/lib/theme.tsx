'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

export type ThemeMode = 'dark' | 'light' | 'auto';
type Resolved = 'dark' | 'light';

interface ThemeCtx {
  mode: ThemeMode;
  resolved: Resolved;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
  showNightBanner: boolean;
  dismissNightBanner: () => void;
}

const Ctx = createContext<ThemeCtx>(null!);

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match && match[1] !== undefined ? decodeURIComponent(match[1]) : null;
}

function getStored(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const m = localStorage.getItem('theme') ?? readCookie('theme');
  return m === 'light' || m === 'auto' ? m : 'dark';
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolve(mode: ThemeMode): Resolved {
  if (mode === 'auto') return systemPrefersDark() ? 'dark' : 'light';
  return mode;
}

export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  const [mode, setModeState] = useState<ThemeMode>(getStored);
  const [resolved, setResolved] = useState<Resolved>(() => resolve(getStored()));
  const [showNightBanner, setShowNightBanner] = useState(false);

  const apply = useCallback((r: Resolved) => {
    setResolved(r);
    document.documentElement.setAttribute('data-theme', r);
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem('theme', m);
    document.cookie = `theme=${m};path=/;max-age=31536000;SameSite=Lax`;
    apply(resolve(m));
  }, [apply]);

  const toggle = useCallback(() => {
    setMode(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setMode]);

  const dismissNightBanner = useCallback(() => {
    setShowNightBanner(false);
    sessionStorage.setItem('night-banner-dismissed', '1');
  }, []);

  useEffect(() => {
    apply(resolve(mode));
  }, [mode, apply]);

  // Follow system preference when in auto
  useEffect(() => {
    if (mode !== 'auto' || typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => apply(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode, apply]);

  // 22:00 suggestion (only when actively in light)
  useEffect(() => {
    function checkTime() {
      const hour = new Date().getHours();
      const dismissed = sessionStorage.getItem('night-banner-dismissed') === '1';
      setShowNightBanner(hour >= 22 && resolved === 'light' && !dismissed);
    }
    checkTime();
    const interval = setInterval(checkTime, 60_000);
    return () => clearInterval(interval);
  }, [resolved]);

  const ctx = useMemo(
    () => ({ mode, resolved, setMode, toggle, showNightBanner, dismissNightBanner }),
    [mode, resolved, setMode, toggle, showNightBanner, dismissNightBanner],
  );

  return <Ctx value={ctx}>{children}</Ctx>;
}

export function useTheme() {
  return useContext(Ctx);
}
