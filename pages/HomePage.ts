import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.myAccountLink = page.locator('.list-inline a').filter({ hasText: 'My Account' });
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.searchInput = page.locator('#search input[name="search"]');
        this.searchButton = page.locator('#search button[type="button"]');
        this.cartButton = page.locator('#cart-total');
    }

    /**
     * Navigates to the application URL
     * @param url - The application URL
     */
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Clicks the My Account link to open the dropdown
     */
    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    /**
     * Clicks the Register link from the My Account dropdown
     */
    async clickRegister(): Promise<void> {
        await this.registerLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Clicks the Login link from the My Account dropdown
     */
    async clickLogin(): Promise<void> {
        await this.loginLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Performs a product search
     * @param productName - The product name to search for
     */
    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    /**
     * Clicks the cart button in the header
     */
    async clickCartButton(): Promise<void> {
        await this.cartButton.click();
    }

    /**
     * Checks if the My Account link is visible
     * @returns Promise<boolean> - true if visible
     */
    async isMyAccountLinkVisible(): Promise<boolean> {
        try {
            return await this.myAccountLink.isVisible();
        } catch (error) {
            console.log(`Error checking My Account link: ${error}`);
            return false;
        }
    }
}