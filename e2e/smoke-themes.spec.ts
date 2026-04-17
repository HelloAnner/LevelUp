import { test } from '@playwright/test';
import path from 'node:path';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/onboarding', name: 'onboarding' },
  { path: '/scenes/empty', name: 'empty' },
  { path: '/scenes/milestone', name: 'milestone' },
  { path: '/scenes/lost', name: 'lost' },
  { path: '/scenes/cmd', name: 'cmd' },
  { path: '/scenes/drawer', name: 'drawer' },
  { path: '/scenes/settings', name: 'settings' },
  { path: '/scenes/roadmap', name: 'roadmap' },
  { path: '/scenes/support-tree', name: 'support-tree' },
];

const OUT = path.join(__dirname, '..', '.smoke-shots');

const ONE_YEAR = Math.floor(Date.now() / 1000) + 31_536_000;

for (const theme of ['dark', 'light'] as const) {
  test.describe(`theme ${theme}`, () => {
    test.use({
      storageState: {
        cookies: [
          {
            name: 'theme',
            value: theme,
            domain: 'localhost',
            path: '/',
            expires: ONE_YEAR,
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
          },
        ],
        origins: [],
      },
    });
    for (const r of ROUTES) {
      test(`${r.name}`, async ({ page, context }) => {
        // Ensure cookie is seeded before first navigation
        await context.addCookies([
          {
            name: 'theme',
            value: theme,
            domain: 'localhost',
            path: '/',
            expires: ONE_YEAR,
          },
        ]);
        await page.goto(r.path, { waitUntil: 'networkidle' });
        await page.waitForTimeout(800);
        await page.screenshot({
          path: path.join(OUT, theme, `${r.name}.png`),
          fullPage: false,
        });
      });
    }
  });
}
