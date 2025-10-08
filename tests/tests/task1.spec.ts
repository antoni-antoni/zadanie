import { expect, test } from '@playwright/test';
import { LoginPage } from '../POM/task1/loginPage';

test.describe('Login Page Tests for valid and invalid credentials', () => {
    let loginPage: LoginPage;
    // In real life scenario I'd use .env for storing credentials
    const validUsername = 'jan.testowy@wskz.pl';
    const validPassword = 'aqLrvDJ348';
    const invalidPassword = 'wrongpassword';

    test('Login with valid credentials', async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.login(validUsername, validPassword);
        expect(page.url().includes('/home'));
        await expect(page.getByText('Welcome back, '+ validUsername+"!")).toBeVisible();
        console.log("Login successful with valid credentials");
    });

    test('Login with invalid credentials', async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.login(validUsername, invalidPassword);
        expect(page.url().includes('/auth'));
        await expect(page.getByText('Incorrect Username and/or Password!')).toBeVisible();
        console.log("Login failed with invalid credentials as expected");
    });

});