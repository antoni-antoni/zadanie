import { Locator, Page } from '@playwright/test';

export class NewPage {
    readonly page: Page;
    readonly clickMeLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickMeLink = page.getByRole('link', { name: 'Click me!' });
    }
    async openNewPage() {
        await this.page.goto('/new-page');
    }
    async clickButtonLink() {
        await this.page.getByRole('link', { name: 'Click me!' }).click();
    }
}
