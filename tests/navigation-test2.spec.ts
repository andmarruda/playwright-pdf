import { test, expect } from '@playwright/test';

test('User navigate to login screen and access dashboard', async ({ page }) => {
  const baseUrl = 'https://myapp.com'; // replace with your app URL

  await page.goto(baseUrl, { waitUntil: 'load' });

  const loginLink = page.getByRole('link', { name: /login/i });
  await loginLink.click();

  await expect(page).toHaveURL(/.*login/);

  await page.getByLabel('Email').fill('user@test.com');
  await page.getByLabel('Password').fill('secret-password');

  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/.*dashboard/);

  const dashboardHeading = page.getByRole('heading', { name: /dashboard|panel/i });
  await expect(dashboardHeading).toBeVisible();
});
