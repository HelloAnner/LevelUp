import { test, expect } from '@playwright/test';

test('onboarding can continue from the name step without relying on a hardware Enter key', async ({
  page,
}) => {
  await page.goto('/onboarding');
  await page.waitForTimeout(3500);

  await page.locator('.scene-input-text').fill('Anner');

  await expect(page.locator('.scene-cta')).toBeVisible();
  await page.locator('.scene-cta').click();

  await expect(page.locator('.scene-col')).toContainText('Anner');
});
