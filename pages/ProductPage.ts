import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly productHeading: Locator;
    private readonly addToCartButton: Locator;
    private readonly quantityInput: Locator;
    private readonly priceText: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.productHeading = page.locator('#content h1');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.quantityInput = page.locator('#input-quantity');
        this.priceText = page.locator('h2');
        this.successMessage = page.locator('.alert-success');
    }

    /**
     * Checks if the product details page is displayed
     * @returns Promise<boolean> - true if the product heading is visible
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            return await this.productHeading.isVisible();
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name from the heading
     * @returns Promise<string> - The product name
     */
    async getProductName(): Promise<string> {
        return await this.productHeading.textContent() ?? '';
    }

    /**
     * Gets the product price text
     * @returns Promise<string> - The price text
     */
    async getProductPrice(): Promise<string> {
        return await this.priceText.first().textContent() ?? '';
    }

    /**
     * Sets the quantity for the product
     * @param quantity - Quantity value
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity);
    }

    /**
     * Clicks the Add to Cart button
     */
    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Gets the success message text after adding to cart
     * @returns Promise<string> - The success message text
     */
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.textContent() ?? '';
    }

    /**
     * Checks if the success message is visible
     * @returns Promise<boolean> - true if success message is displayed
     */
    async isSuccessMessageVisible(): Promise<boolean> {
        try {
            await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            console.log(`Error checking success message: ${error}`);
            return false;
        }
    }
}