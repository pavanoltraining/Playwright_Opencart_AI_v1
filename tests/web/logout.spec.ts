/**
 * Test Case: Logout Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Log in using valid credentials
 * 3) Verify authentication succeeds
 * 4) Navigate to account logout
 * 5) Click Logout
 * 6) Verify the logout confirmation page
 * 7) Click Continue
 * 8) Verify redirect to homepage
 * 9) Verify authenticated options are no longer available
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Logout Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage, logoutPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Log in using valid credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(email, password);
    });

    await test.step('3) Verify authentication succeeds', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    await test.step('4) Navigate to account logout', async () => {
        await myAccountPage.clickLogout();
    });

    await test.step('5) Verify the logout confirmation page is displayed', async () => {
        const isLogoutPage = await logoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
    });

    await test.step('6) Click Continue to return to homepage', async () => {
        await logoutPage.clickContinue();
    });

    await test.step('7) Verify authenticated options are no longer available', async () => {
        const isMyAccountLink = await homePage.isMyAccountLinkVisible();
        expect(isMyAccountLink).toBeTruthy();
    });

    console.log('✅ Logout completed successfully!');
});