import { test, expect } from '@playwright/test';

test('homepage redirects to /settings', async ({ page }) => {
    await page.goto('/'); // remember -- we don't have to provide full URL as we already set baseUrl in playwright config file
    await expect(page).toHaveURL('/settings!');
});