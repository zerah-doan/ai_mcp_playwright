import { test, expect } from '@playwright/test';

test('navigate to Google and search for Facebook', async ({ page }) => {
    // Navigate to Google
    await page.goto('https://www.google.com');

    // Accept any cookie consent if present (common in some regions)
    try {
        const acceptButton = page.getByRole('button', { name: /Accept|Agree|Consent/i });
        if (await acceptButton.isVisible())
            await acceptButton.click();
    } catch (e) {
        // Continue if no consent button is found
    }

    // Type "facebook" into the search box
    await page.getByRole('combobox', { name: 'Search' }).fill('facebook');

    // Press Enter to search
    await page.keyboard.press('Enter');

    // Verify that we got search results
    await expect(page.getByRole('main')).toBeVisible();

    // Verify that the first result contains "Facebook"
    const firstResult = page.locator('#search a').first();
    await expect(firstResult).toContainText(/Facebook/i);
});