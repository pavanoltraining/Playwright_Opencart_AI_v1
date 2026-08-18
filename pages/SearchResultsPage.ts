import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly searchHeading: Locator;
    private readonly productLinks: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.searchHeading = page.locator('#content h1');
        this.productLinks = page.locator('.product-thumb h4 a');
    }

    /**
     * Checks if the search results page is displayed
     * @returns Promise<boolean> - true if search results heading is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            return await this.searchHeading.isVisible();
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the search results heading text
     * @returns Promise<string> - The heading text
     */
    async getSearchHeadingText(): Promise<string> {
        return await this.searchHeading.textContent() ?? '';
    }

    /**
     * Checks if a product appears in the search results
     * @param productName - The product name to look for
     * @returns Promise<boolean> - true if the product is found
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        try {
            const count = await this.productLinks.filter({ hasText: productName }).count();
            return count > 0;
        } catch (error) {
            console.log(`Error checking product display: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on a product link in the search results
     * @param productName - The product name to click
     */
    async clickProduct(productName: string): Promise<void> {
        await this.productLinks.filter({ hasText: productName }).first().click();
        await this.page.waitForLoadState('networkidle');
    }
}