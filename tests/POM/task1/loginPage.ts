import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // I had to use locators with placeholders as there were no accessible names for the inputs
        this.usernameInput = page.locator('input[placeholder="Username"]');
        this.passwordInput = page.locator('input[placeholder="Password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username: string, password: string) {
        await this.page.goto('/');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
