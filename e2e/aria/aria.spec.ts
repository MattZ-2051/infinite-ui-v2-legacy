import { expect, test } from '@playwright/test';

test('Aria page title', async ({ page }) => {
  await page.goto('http://localhost:3000/marketplace');
  expect(await page.title()).toBe('ARIA Exchange - Marketplace');
});
