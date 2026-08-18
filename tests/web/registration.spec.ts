/**
 * Test Case: User Registration Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account → Register
 * 3) Verify the registration page is displayed
 * 4) Generate unique customer data and fill the form
 * 5) Accept Privacy Policy and submit
 * 6) Verify registration success
 * 7) Verify the account-created confirmation
 * 8) Verify the account is accessible
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User Registration Flow @master @sanity @regression @web', async ({ homePage, registerPage, successPage, myAccountPage }) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Navigate to My Account → Register', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('3) Verify the registration page is displayed', async () => {
        const isRegisterPage = await registerPage.isRegisterPageExists();
        expect(isRegisterPage).toBeTruthy();
    });

    await test.step('4) Fill the registration form with unique data', async () => {
        await registerPage.completeRegistration(firstName, lastName, email, telephone, password);
    });

    await test.step('5) Verify registration success', async () => {
        const isSuccess = await successPage.isSuccessPageExists();
        expect(isSuccess).toBeTruthy();
    });

    await test.step('6) Verify the account-created confirmation heading', async () => {
        const headingText = await successPage.getSuccessHeadingText();
        expect(headingText).toContain('Your Account Has Been Created!');
    });

    await test.step('7) Navigate to My Account and verify account is accessible', async () => {
        await successPage.clickContinue();
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    console.log('✅ User Registration completed successfully!');
});