import { test, expect } from '@playwright/test';

test('renders homepage with heading and Connect button', async ({ page }) => {
  await page.goto('/');

  // ✅ Wait for heading to appear before checking text
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible(); // first, visible

  // ✅ Then assert the expected text
  await expect(heading).toHaveText(/Welcome to RainbowKit/i);

  // ✅ Connect button (provided by RainbowKit)
  const connectButton = page.getByRole('button', { name: /connect/i });
  await expect(connectButton).toBeVisible();

  // ✅ RainbowKit card link
  const rainbowCard = page.getByRole('link', { name: /RainbowKit Documentation/i });
  await expect(rainbowCard).toHaveAttribute('href', 'https://rainbowkit.com');
});
