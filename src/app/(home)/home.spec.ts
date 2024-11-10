import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Example app/);
});

test('has text', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('body')).toHaveText(/Hello world!/);
});
