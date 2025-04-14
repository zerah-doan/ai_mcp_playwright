import { test, expect } from '@playwright/test';

test('should login to Visa Online', async ({ page }) => {
    // Navigate to Visa Online
    await page.goto('https://visaonline.com');

    // Wait for login form to be available and visible
    await page.waitForSelector('input[type="text"]', { state: 'visible' });

    // Fill in username
    await page.getByRole('textbox').fill('xdoan');

    // Fill in password
    await page.locator('input[type="password"]').fill('1234567');

    // Click login button
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Add assertions here based on successful login
    // For example, check if we're redirected to dashboard or if a welcome element is visible
    // await expect(page.getByText('Welcome')).toBeVisible();
});