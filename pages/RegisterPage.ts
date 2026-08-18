import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly passwordConfirmInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly registerHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.passwordConfirmInput = page.locator('#input-confirm');
        this.privacyPolicyCheckbox = page.locator('input[type="checkbox"][name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.registerHeading = page.getByRole('heading', { name: 'Register Account' });
    }

    /**
     * Checks if the Register Account page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            return await this.registerHeading.isVisible();
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Sets the First Name field
     * @param firstName - First name value
     */
    async setFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Sets the Last Name field
     * @param lastName - Last name value
     */
    async setLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Sets the E-Mail field
     * @param email - Email value
     */
    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Sets the Telephone field
     * @param telephone - Telephone value
     */
    async setTelephone(telephone: string): Promise<void> {
        await this.telephoneInput.fill(telephone);
    }

    /**
     * Sets the Password field
     * @param password - Password value
     */
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Sets the Password Confirm field
     * @param passwordConfirm - Password confirmation value
     */
    async setPasswordConfirm(passwordConfirm: string): Promise<void> {
        await this.passwordConfirmInput.fill(passwordConfirm);
    }

    /**
     * Checks the Privacy Policy checkbox
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    /**
     * Clicks the Continue button to submit the registration form
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Completes the full registration form with all fields
     * @param firstName - First name
     * @param lastName - Last name
     * @param email - Email address
     * @param telephone - Telephone number
     * @param password - Password
     */
    async completeRegistration(firstName: string, lastName: string, email: string, telephone: string, password: string): Promise<void> {
        await this.setFirstName(firstName);
        await this.setLastName(lastName);
        await this.setEmail(email);
        await this.setTelephone(telephone);
        await this.setPassword(password);
        await this.setPasswordConfirm(password);
        await this.acceptPrivacyPolicy();
        await this.clickContinue();
    }
}