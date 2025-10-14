import { Locator, Page } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly emailAddressInput: Locator;
    readonly passwordInput: Locator;
    readonly countryDropdown: Locator;
    readonly hobbyPicker: Locator;
    readonly addPhotoInput: Locator;
    readonly additionalInfoInput: Locator;
    readonly conditionsCheckbox1: Locator;
    readonly conditionsCheckbox2: Locator;
    readonly conditionsCheckbox3: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailAddressInput = page.getByRole('textbox', { name: 'Email address' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.countryDropdown = page.getByLabel('Country');
        this.hobbyPicker = page.getByLabel('Hobby');
        this.addPhotoInput = page.getByRole('button', { name: 'Photo' });
        this.additionalInfoInput = page.getByRole('textbox', { name: 'Additional info.' });
        this.conditionsCheckbox1 = page.getByRole('checkbox', { name: 'Conditions of Use and Privacy Notice 1.' });
        this.conditionsCheckbox2 = page.getByRole('checkbox', { name: 'Conditions of Use and Privacy Notice 2.' });
        this.conditionsCheckbox3 = page.getByRole('checkbox', { name: 'Conditions of Use and Privacy Notice 3.' });
        this.saveButton = page.getByRole('button', { name: 'Save' });

    }


    //  Completes user registration with all fields filled
    //  Fills form fields, uploads photo, accepts conditions, and submits

    async register(email: string, password: string, country: string, hobby: string, photoPath: string, additionalInfo: string) {
        await this.page.goto('/registration');
        await this.emailAddressInput.fill(email);
        await this.passwordInput.fill(password);
        await this.countryDropdown.selectOption(country);
        await this.hobbyPicker.selectOption(hobby);
        await this.addPhotoInput.setInputFiles(photoPath);
        await this.additionalInfoInput.fill(additionalInfo);
        await this.conditionsCheckbox1.check();
        await this.conditionsCheckbox2.check();
        await this.conditionsCheckbox3.check();
        await this.saveButton.click();
    }
}