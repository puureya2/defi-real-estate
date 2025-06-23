import { test, expect } from '@playwright/test';

test('homepage loads with correct heading and description', async ({ page }) => {
  await page.goto('/');

  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveText(/Welcome to RainbowKit/i);

  const description = page.getByText(/Get started by editing/i);
  await expect(description).toBeVisible();
});

test('RainbowKit card link works and opens correct URL', async ({ page, context }) => {
  await page.goto('/');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: /RainbowKit Documentation/i }).click()
  ]);

  await newPage.waitForLoadState('domcontentloaded');
  expect(newPage.url()).toContain('rainbowkit.com');
});

test('all doc card links respond with status 200', async ({ page, request }) => {
  await page.goto('/');

  const links = await page.$$eval('.card', cards =>
    cards.map((el) => el.getAttribute('href'))
  );

  for (const href of links) {
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
  }
});

test('footer contains rainbow.me link', async ({ page }) => {
  await page.goto('/');

  const footerLink = page.getByRole('link', { name: /Made with/i });
  await expect(footerLink).toHaveAttribute('href', 'https://rainbow.me');
});
