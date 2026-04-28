import { test, expect } from '@playwright/test';

test.use({ locale: 'zh-CN' });

test('onboarding respects a Chinese browser locale', async ({ page }) => {
  await page.goto('/onboarding');
  await page.waitForTimeout(3500);

  await expect(page.getByText('我该怎么称呼你？')).toBeVisible();
  await expect(page.getByRole('button', { name: '继续' })).toBeVisible();
});
