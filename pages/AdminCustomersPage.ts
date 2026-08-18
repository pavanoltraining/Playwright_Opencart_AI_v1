import { Page, Locator } from '@playwright/test';

export class AdminCustomersPage {
    private readonly page: Page;

    // Locators
    private readonly customersMenu: Locator;
    private readonly customersHeading: Locator;
    private readonly filterEmailInput: Locator;
    private readonly filterButton: Locator;
    private readonly customersTable: Locator;
    private readonly noResultsAlert: Locator;
    private readonly securityModal: Locator;
    private readonly securityModalClose: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.customersMenu = page.locator('#menu-customer');
        this.customersHeading = page.getByRole('heading', { name: 'Customers' });
        this.filterEmailInput = page.locator('#input-email');
        this.filterButton = page.locator('#button-filter');
        this.customersTable = page.locator('#form-customer table');
        this.noResultsAlert = page.locator('.alert-danger');
        this.securityModal = page.locator('#modal-security');
        this.securityModalClose = this.securityModal.locator('button.close');
    }

    /**
     * Dismisses the developer security modal (storage directory warning)
     * that appears on the admin dashboard after login, when present
     */
    async dismissSecurityModal(): Promise<void> {
        try {
            if (await this.securityModal.isVisible()) {
                await this.securityModalClose.click();
                console.log('Dismissed the admin security modal');
            }
        } catch (error) {
            console.log(`Error dismissing security modal: ${error}`);
        }
    }

    /**
     * Clicks the Customers menu in the admin navigation to expand it
     */
    async clickCustomersMenu(): Promise<void> {
        await this.customersMenu.click();
    }

    /**
     * Clicks the Customers submenu link to open the customer list page
     */
    async clickCustomersSubmenu(): Promise<void> {
        await this.page.locator('#collapse5').getByRole('link', { name: 'Customers' }).click();
    }

    /**
     * Checks if the Customers list page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isCustomersPageExists(): Promise<boolean> {
        try {
            return await this.customersHeading.isVisible();
        } catch (error) {
            console.log(`Error checking customers page: ${error}`);
            return false;
        }
    }

    /**
     * Fills the E-Mail filter field
     * @param email - The email to search for
     */
    async setFilterEmail(email: string): Promise<void> {
        await this.filterEmailInput.fill(email);
    }

    /**
     * Clicks the Filter button to apply the search
     */
    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
    }

    /**
     * Searches for a customer by email address
     * @param email - The email to search for
     */
    async searchCustomerByEmail(email: string): Promise<void> {
        await this.setFilterEmail(email);
        await this.clickFilterButton();
    }

    /**
     * Checks if a customer row exists for the given email
     * @param email - The email to look for in the table
     * @returns Promise<boolean> - true if a row with the email is displayed
     */
    async isCustomerRowExists(email: string): Promise<boolean> {
        try {
            const row = this.customersTable.locator('tbody tr', { hasText: email });
            await row.first().waitFor({ state: 'visible', timeout: 5000 });
            return await row.first().isVisible();
        } catch (error) {
            console.log(`Error checking customer row: ${error}`);
            return false;
        }
    }

    /**
     * Gets the row content for the given email
     * @param email - The email to locate
     * @returns Promise<string> - The full row text
     */
    async getCustomerRowText(email: string): Promise<string> {
        const row = this.customersTable.locator('tbody tr', { hasText: email }).first();
        return (await row.textContent()) ?? '';
    }

    /**
     * Opens the customer record for the given email
     * @param email - The email of the customer to open
     */
    async clickEditCustomer(email: string): Promise<void> {
        const row = this.customersTable.locator('tbody tr', { hasText: email }).first();
        await row.locator('a[href*="customer/customer/edit"]').click();
    }

    /**
     * Checks if a "No results" alert is displayed
     * @returns Promise<boolean> - true if the alert is visible
     */
    async isNoResultsAlertVisible(): Promise<boolean> {
        try {
            return await this.noResultsAlert.isVisible();
        } catch (error) {
            console.log(`Error checking no results alert: ${error}`);
            return false;
        }
    }
}
