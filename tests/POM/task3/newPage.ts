import { Locator, Page } from '@playwright/test';

//  Handles navigation to new page and clicking external links
export class NewPage {
    readonly page: Page;
    readonly clickMeLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickMeLink = page.getByRole('link', { name: 'Click me!' });
    }

    //  Navigates to the new page
    async openNewPage() {
        await this.page.goto('/new-page');
    }

    //  Clicks the external link that opens a new tab
    async clickButtonLink() {
        await this.page.getByRole('link', { name: 'Click me!' }).click();
    }
}
