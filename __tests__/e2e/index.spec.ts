import { test, expect } from '@playwright/test';

test('renders homepage with heading and Connect button', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // ✅ Expect the main heading to be present
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveText(/Welcome to RainbowKit/i);

  // ✅ Expect the Connect Wallet button to be visible (provided by RainbowKit)
  const connectButton = page.getByRole('button', { name: /connect/i });
  await expect(connectButton).toBeVisible();

  // ✅ Expect the RainbowKit card link to exist
  const rainbowCard = page.getByRole('link', { name: /RainbowKit Documentation/i });
  await expect(rainbowCard).toHaveAttribute('href', 'https://rainbowkit.com');
});
