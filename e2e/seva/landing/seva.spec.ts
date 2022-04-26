import { expect, test } from '@playwright/test';

test('Seva page title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  expect(await page.title()).toBe('SEVA.LOVE');
});
