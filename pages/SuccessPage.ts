import { Page, Locator } from '@playwright/test';

export class SuccessPage {
    private readonly page: Page;

    // Locators
    private readonly successHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.successHeading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Checks if the account created success page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isSuccessPageExists(): Promise<boolean> {
        try {
            return await this.successHeading.isVisible();
        } catch (error) {
            console.log(`Error checking success page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the success heading text
     * @returns Promise<string> - The heading text
     */
    async getSuccessHeadingText(): Promise<string> {
        return await this.successHeading.textContent() ?? '';
    }

    /**
     * Clicks the Continue button to proceed to the account page
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}