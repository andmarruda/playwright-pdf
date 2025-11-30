import { test, expect } from '@playwright/test';

test('Basic informations, load time, page title, meta tag, description and console vitals.', async ({ page }) => {
  const consoleWarnings: string[] = [];
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'warning') {
      consoleWarnings.push(msg.text());
    }

    if (type === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  const url = 'https://example.com'; //change this to your target URL

  const start = Date.now();
  await page.goto(url, { waitUntil: 'load' });
  const loadTime = Date.now() - start;

  const title = await page.title();
  const metaDescriptionLocator = page.locator('head meta[name="description"]');
  const hasMetaDescription = (await metaDescriptionLocator.count()) > 0;

  const description = hasMetaDescription
    ? await metaDescriptionLocator.first().getAttribute('content')
    : null;

  const metaTags = await page.locator('head meta').evaluateAll((elements) =>
    elements.map((el) => {
      const attrs: Record<string, string> = {};
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes.item(i);
        if (attr) attrs[attr.name] = attr.value;
      }
      return attrs;
    })
  );

  //Logs with data collected
  console.log(`URL: ${url}`);
  console.log(`Page Title: ${title}`);
  console.log(`Meta Description: ${description ?? ''}`);
  console.log(`Load Time: ${loadTime} ms`);
  console.log('Meta Tags:', metaTags);
  console.log('Console Warnings:', consoleWarnings);
  console.log('Console Errors:', consoleErrors);
  console.log('Page Errors:', pageErrors);

  expect(title.trim()).not.toBe('');
  expect(description).not.toBeNull();
  expect(metaTags.length).toBeGreaterThan(0);
  expect(loadTime).toBeLessThan(2000); // Example threshold
  expect(consoleErrors.length).toBe(0);
  expect(pageErrors.length).toBe(0);
  expect(consoleWarnings.length).toBeLessThan(0); // Example threshold
});