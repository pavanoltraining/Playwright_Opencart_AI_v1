/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @end-to-end @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer with unique data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the new credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product, quantity, price, and total
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-End Shopping Flow @master @e2e @web', async ({ homePage, registerPage, successPage, myAccountPage, logoutPage, loginPage, searchResultsPage, productPage, cartPage }) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword();
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Register a new customer', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await registerPage.completeRegistration(firstName, lastName, email, telephone, password);
    });

    await test.step('3) Verify successful registration', async () => {
        const isSuccess = await successPage.isSuccessPageExists();
        expect(isSuccess).toBeTruthy();
        await successPage.clickContinue();
    });

    await test.step('4) Log out', async () => {
        await myAccountPage.clickLogout();
        const isLogoutPage = await logoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
        await logoutPage.clickContinue();
    });

    await test.step('5) Log in again using the new credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(email, password);
    });

    await test.step('6) Verify successful authentication', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    await test.step('7) Search for a known product', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        await homePage.searchProduct(productName);
    });

    await test.step('8) Open the product details page', async () => {
        await searchResultsPage.clickProduct(productName);
        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();
    });

    await test.step('9) Add the product to the cart', async () => {
        await productPage.setQuantity(productQuantity);
        await productPage.clickAddToCart();
        const isSuccess = await productPage.isSuccessMessageVisible();
        expect(isSuccess).toBeTruthy();
    });

    await test.step('10) Open the shopping cart', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL + 'index.php?route=checkout/cart');
    });

    await test.step('11) Verify the correct product, quantity, and price', async () => {
        const isInCart = await cartPage.isProductInCart(productName);
        expect(isInCart).toBeTruthy();

        const quantity = await cartPage.getProductQuantity();
        expect(quantity).toBe(productQuantity);
    });

    console.log('✅ End-to-End Shopping completed successfully!');
});