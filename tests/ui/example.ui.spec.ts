import { test, expect } from '@playwright/test';
import { config } from '../../config/env';

test.describe('Example UI Test Suite', () => {
    test('should navigate to Playwright homepage', async ({ page }) => {
        await page.goto(config.playwrightBaseUrl);
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('should have correct heading', async ({ page }) => {
        await page.goto(config.playwrightBaseUrl);
        const heading = page.locator('h1');
        await expect(heading).toContainText('Playwright');
    });
});