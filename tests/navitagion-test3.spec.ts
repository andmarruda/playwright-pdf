import { test, expect } from '@playwright/test';

test('User navigates from product list to cart', async ({ page }) => {
  const baseUrl = 'https://my-store.com';

  await page.goto(baseUrl + '/products', { waitUntil: 'load' });

  const productCards = page.locator('[data-testid="product-card"]');
  await expect(productCards).toHaveCount(1);

  const firstProduct = productCards.first();
  const productTitle = await firstProduct.locator('.product-title').textContent();

  await firstProduct.click();

  await expect(page).toHaveURL(/.*product/);

  const detailTitle = page.locator('h1');
  await expect(detailTitle).toBeVisible();

  const addToCartButton = page.getByRole('button', { name: /add to cart/i });
  await addToCartButton.click();

  const cartBadge = page.locator('[data-testid="cart-count"]');
  await expect(cartBadge).toHaveText('1');

  console.log('Product added to cart:', (productTitle ?? '').trim());
});
