import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginHeading: Locator;
    private readonly warningMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginHeading = page.getByRole('heading', { name: 'Returning Customer' });
        this.warningMessage = page.locator('.alert-danger');
    }

    /**
     * Checks if the Login page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            return await this.loginHeading.isVisible();
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Sets the E-Mail Address field
     * @param email - Email value
     */
    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Sets the Password field
     * @param password - Password value
     */
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Clicks the Login button
     */
    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    /**
     * Performs a complete login action
     * @param email - Email address
     * @param password - Password
     */
    async login(email: string, password: string): Promise<void> {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

    /**
     * Gets the warning/error message text
     * @returns Promise<string> - The warning message text
     */
    async getWarningMessage(): Promise<string> {
        return await this.warningMessage.textContent() ?? '';
    }

    /**
     * Checks if the warning message is visible
     * @returns Promise<boolean> - true if warning is displayed
     */
    async isWarningMessageVisible(): Promise<boolean> {
        try {
            return await this.warningMessage.isVisible();
        } catch (error) {
            console.log(`Error checking warning message: ${error}`);
            return false;
        }
    }
}