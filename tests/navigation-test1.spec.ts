import { test, expect } from '@playwright/test';

test('The user access home and see the main section.', async ({ page }) => {
  const url = 'https://example.com';

  await page.goto(url, { waitUntil: 'load' });

  const mainHeading = page.locator('h1');
  await expect(mainHeading).toBeVisible();
  const headingText = await mainHeading.textContent();
  expect((headingText ?? '').trim().length).toBeGreaterThan(0);
});
