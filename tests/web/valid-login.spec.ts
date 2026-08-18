/**
 * Test Case: Valid Login Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account → Login
 * 3) Verify the login page is displayed
 * 4) Enter valid customer credentials
 * 5) Submit the login form
 * 6) Verify successful authentication
 * 7) Verify the My Account page is displayed
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Valid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Navigate to My Account → Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Verify the login page is displayed', async () => {
        const isLoginPage = await loginPage.isLoginPageExists();
        expect(isLoginPage).toBeTruthy();
    });

    await test.step('4) Enter valid credentials and submit', async () => {
        await loginPage.login(email, password);
    });

    await test.step('5) Verify successful authentication', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    await test.step('6) Verify the account dashboard is visible', async () => {
        const isAuth = await myAccountPage.isAuthenticated();
        expect(isAuth).toBeTruthy();
    });

    console.log('✅ Valid Login completed successfully!');
});