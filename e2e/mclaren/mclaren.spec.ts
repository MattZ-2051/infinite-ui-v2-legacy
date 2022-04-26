import { expect, test } from '@playwright/test';

test('McLaren page title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  expect(await page.title()).toBe('McLaren NFT Collection - Buy Rare & Exclusive Supercar NFTs');
});
