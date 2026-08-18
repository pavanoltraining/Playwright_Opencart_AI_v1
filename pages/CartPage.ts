import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartHeading: Locator;
    private readonly cartItems: Locator;
    private readonly productNames: Locator;
    private readonly quantityInputs: Locator;
    private readonly totalPrices: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.cartHeading = page.getByRole('heading', { name: 'Shopping Cart' });
        this.cartItems = page.locator('.table-responsive tbody tr');
        this.productNames = page.locator('.table-responsive tbody tr td:nth-child(2) a');
        this.quantityInputs = page.locator('.table-responsive tbody tr td:nth-child(4) input');
        this.totalPrices = page.locator('.table-responsive tbody tr td:nth-child(6)');
    }

    /**
     * Checks if the Shopping Cart page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            return await this.cartHeading.isVisible();
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Checks if a product is present in the cart
     * @param productName - The product name to look for
     * @returns Promise<boolean> - true if the product is in the cart
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            const count = await this.productNames.filter({ hasText: productName }).count();
            return count > 0;
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }

    /**
     * Gets the quantity of a product in the cart
     * @returns Promise<string> - The quantity value
     */
    async getProductQuantity(): Promise<string> {
        const value = await this.quantityInputs.first().getAttribute('value');
        return value ?? '';
    }

    /**
     * Gets the total price text for a product
     * @returns Promise<string> - The total price text
     */
    async getProductTotalPrice(): Promise<string> {
        return await this.totalPrices.first().textContent() ?? '';
    }

    /**
     * Gets the number of items in the cart
     * @returns Promise<number> - The item count
     */
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }
}