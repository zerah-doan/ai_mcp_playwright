import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    private mainHeading = () => this.page.locator('h1');
    private getStartedLink = () => this.page.getByRole('link', { name: 'Get started' });
    private docsNavigation = () => this.page.locator('nav.theme-doc-sidebar-menu');

    // Actions
    async clickGetStarted(): Promise<void> {
        await this.getStartedLink().click();
    }

    // Getters
    async getMainHeadingText(): Promise<string> {
        return await this.mainHeading().textContent() || '';
    }

    async isDocumentationVisible(): Promise<boolean> {
        try {
            const nav = await this.docsNavigation().waitFor({ state: 'visible', timeout: 5000 });
            return nav !== null;
        } catch {
            return false;
        }
    }
}