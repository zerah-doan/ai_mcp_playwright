import { expect } from '@playwright/test';
import { test } from '@tests/fixtures/testFixtures';
import { HomePage } from '@pages/HomePage';
import AxeBuilder from '@axe-core/playwright';

test.describe('Playwright Homepage', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page, logger }) => {
        logger.info('Setting up homepage test');
        // Set consistent viewport size for all tests
        await page.setViewportSize({ width: 1280, height: 720 });
        homePage = new HomePage(page);
        await homePage.navigate();
        logger.debug('Waiting for page load');
        await homePage.waitForPageLoad();
    });

    test.describe('Navigation and Content', () => {
        test('should display correct page title', async ({ page, logger }) => {
            logger.info('Checking page title');
            await expect(page).toHaveTitle(/Playwright/);
        });

        test('should display correct heading', async ({ logger }) => {
            logger.info('Checking main heading');
            const headingText = await homePage.getMainHeadingText();
            logger.debug('Heading text found', { text: headingText });
            expect(headingText).toContain('Playwright');
        });

        test('should show documentation navigation', async ({ logger }) => {
            logger.info('Checking documentation visibility');
            const isDocsVisible = await homePage.isDocumentationVisible();
            logger.debug('Documentation visibility status', { visible: isDocsVisible });
            expect(isDocsVisible).toBeTruthy();
        });
    });

    test.describe('Accessibility', () => {
        test('should meet accessibility guidelines', async ({ page, logger }) => {
            logger.info('Running accessibility tests');
            const results = await new AxeBuilder({ page })
                .disableRules(['empty-heading', 'heading-order']) // Temporarily disable known issues
                .analyze();

            logger.debug('Accessibility test results', {
                violations: results.violations.length,
                passes: results.passes.length
            });

            // Log violations for debugging
            if (results.violations.length > 0) {
                logger.warn('Accessibility violations found:', { violations: results.violations });
            }

            // Only fail on critical and serious issues
            const criticalViolations = results.violations.filter(v =>
                v.impact === 'critical' || v.impact === 'serious'
            );

            expect(criticalViolations).toEqual([]);
        });
    });

    test.describe('Visual Testing', () => {
        test('should match homepage snapshot', async ({ page, logger }) => {
            logger.info('Taking homepage screenshot for visual comparison');
            await page.waitForLoadState('networkidle');
            logger.debug('Page ready for screenshot');

            // Create snapshots first time, then compare
            await expect(page).toHaveScreenshot('homepage.png', {
                threshold: 0.2, // Allow small differences
                maxDiffPixels: 100
            });
        });
    });
});