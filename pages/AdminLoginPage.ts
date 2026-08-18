import { Page, Locator } from '@playwright/test';

export class AdminLoginPage {
    private readonly page: Page;

    // Locators
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.usernameInput = page.locator('#input-username');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginHeading = page.getByRole('heading', { name: 'Please enter your login details.' });
    }

    /**
     * Checks if the Admin login page is displayed
     * @returns Promise<boolean> - true if the login heading is visible
     */
    async isAdminLoginPageExists(): Promise<boolean> {
        try {
            return await this.loginHeading.isVisible();
        } catch (error) {
            console.log(`Error checking admin login page: ${error}`);
            return false;
        }
    }

    /**
     * Sets the Username field
     * @param username - Admin username
     */
    async setUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    /**
     * Sets the Password field
     * @param password - Admin password
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
     * Performs a complete admin login action
     * @param username - Admin username
     * @param password - Admin password
     */
    async login(username: string, password: string): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLogin();
    }
}
