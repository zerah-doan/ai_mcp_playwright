import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) { }

    async navigate(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}