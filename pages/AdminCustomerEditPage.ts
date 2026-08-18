import { Page, Locator } from '@playwright/test';

export class AdminCustomerEditPage {
    private readonly page: Page;

    // Locators
    private readonly editHeading: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly statusSelect: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.editHeading = page.getByRole('heading', { name: 'Edit Customer' });
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.statusSelect = page.locator('#input-status');
    }

    /**
     * Checks if the Edit Customer page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isEditCustomerPageExists(): Promise<boolean> {
        try {
            return await this.editHeading.isVisible();
        } catch (error) {
            console.log(`Error checking edit customer page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the First Name field value
     * @returns Promise<string> - The first name value
     */
    async getFirstNameValue(): Promise<string> {
        return (await this.firstNameInput.inputValue()) ?? '';
    }

    /**
     * Gets the Last Name field value
     * @returns Promise<string> - The last name value
     */
    async getLastNameValue(): Promise<string> {
        return (await this.lastNameInput.inputValue()) ?? '';
    }

    /**
     * Gets the E-Mail field value
     * @returns Promise<string> - The email value
     */
    async getEmailValue(): Promise<string> {
        return (await this.emailInput.inputValue()) ?? '';
    }

    /**
     * Gets the selected Status option value
     * @returns Promise<string> - '1' for Enabled, '0' for Disabled
     */
    async getStatusValue(): Promise<string> {
        return (await this.statusSelect.inputValue()) ?? '';
    }
}
