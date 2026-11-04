import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly myAccountHeading: Locator;
    private readonly logoutLink: Locator;
    private readonly accountLinks: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.myAccountHeading = page.locator('#content h2', { hasText: 'My Account' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.accountLinks = page.locator('#content .list-group a');
    }

    /**
     * Checks if the My Account page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.myAccountHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Logout link
     */
    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    /**
     * Checks if authenticated account options are visible
     * @returns Promise<boolean> - true if the Logout link is visible
     */
    async isAuthenticated(): Promise<boolean> {
        try {
            await this.logoutLink.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking authentication: ${error}`);
            return false;
        }
    }
}