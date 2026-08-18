/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Search for a valid known product
 * 3) Open the product details page
 * 4) Verify the product details are displayed
 * 5) Set the required quantity
 * 6) Click Add to Cart
 * 7) Verify the success message
 * 8) Open the shopping cart
 * 9) Verify the selected product is present
 * 10) Verify the displayed quantity matches
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add Product to Cart @master @regression @web', async ({ homePage, searchResultsPage, productPage, cartPage }) => {
    const { productName, productQuantity } = Helper.getProductDetails();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Search for a valid known product', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('3) Open the product details page', async () => {
        await searchResultsPage.clickProduct(productName);
    });

    await test.step('4) Verify the product details are displayed', async () => {
        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();

        const actualProductName = await productPage.getProductName();
        expect(actualProductName).toContain(productName);
    });

    await test.step('5) Set the required quantity', async () => {
        await productPage.setQuantity(productQuantity);
    });

    await test.step('6) Click Add to Cart', async () => {
        await productPage.clickAddToCart();
    });

    await test.step('7) Verify the success message', async () => {
        const isSuccess = await productPage.isSuccessMessageVisible();
        expect(isSuccess).toBeTruthy();

        const successMsg = await productPage.getSuccessMessage();
        expect(successMsg).toContain('Success');
    });

    await test.step('8) Open the shopping cart', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        await homePage.clickMyAccount();
        // Navigate directly to cart
        await homePage.navigateTo(process.env.WEB_APP_URL + 'index.php?route=checkout/cart');
    });

    await test.step('9) Verify the selected product is present in cart', async () => {
        const isInCart = await cartPage.isProductInCart(productName);
        expect(isInCart).toBeTruthy();
    });

    await test.step('10) Verify the displayed quantity matches', async () => {
        const quantity = await cartPage.getProductQuantity();
        expect(quantity).toBe(productQuantity);
    });

    console.log('✅ Add Product to Cart completed successfully!');
});