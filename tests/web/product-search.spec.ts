/**
 * Test Case: Product Search Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Locate the search field
 * 3) Enter a valid known product name
 * 4) Submit the search
 * 5) Verify the search results page is displayed
 * 6) Verify the expected product appears
 * 7) Verify the product name matches the search criteria
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product Search Flow @master @regression @web', async ({ homePage, searchResultsPage }) => {
    const { productName } = Helper.getProductDetails();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Search for a valid known product', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('3) Verify the search results page is displayed', async () => {
        const isSearchPage = await searchResultsPage.isSearchResultsPageExists();
        expect(isSearchPage).toBeTruthy();
    });

    await test.step('4) Verify the expected product appears in results', async () => {
        const isDisplayed = await searchResultsPage.isProductDisplayed(productName);
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('5) Verify the product name matches the search criteria', async () => {
        const headingText = await searchResultsPage.getSearchHeadingText();
        expect(headingText).toContain(productName);
    });

    console.log('✅ Product Search completed successfully!');
});