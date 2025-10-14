import { expect, test } from '@playwright/test';
import { RegistrationPage } from '../POM/task2/registrationPage';

test.describe('Registration Page Tests for user registration @front', () => {
    let registrationPage: RegistrationPage;
    // Test data should be securely managed in real scenarios - don't hardcode them
    const testEmail = 'test@test.com';
    const testPassword = 'Test123!';
    const testCountry = 'Poland';
    const testHobby = '7';
    const testPhotoPath = './tests/utils/avatar.jpg';
    const testAdditionalInfo = 'Test additional info.';

    test('User Registration', async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        // Fill all registration form fields and submit
        await registrationPage.register(testEmail, testPassword, testCountry, testHobby, testPhotoPath, testAdditionalInfo);
        // Verify successful registration confirmation message
        await expect(page.getByText('Account created for: ' + testEmail)).toBeVisible();
        console.log("Registration successful for email: " + testEmail);
    });

});