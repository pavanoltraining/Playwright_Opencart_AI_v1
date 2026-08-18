/**
 * Test Case: Invalid Login Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account → Login
 * 3) Enter invalid email and password
 * 4) Submit the form
 * 5) Verify authentication fails
 * 6) Verify the warning message is displayed
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Invalid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const invalidEmail = RandomDataUtil.getEmail();
    const invalidPassword = RandomDataUtil.getPassword();

    await test.step('1) Open the application', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Navigate to My Account → Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Enter invalid credentials and submit', async () => {
        await loginPage.login(invalidEmail, invalidPassword);
    });

    await test.step('4) Verify authentication fails with warning message', async () => {
        const isWarning = await loginPage.isWarningMessageVisible();
        expect(isWarning).toBeTruthy();

        const warningText = await loginPage.getWarningMessage();
        expect(warningText).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    await test.step('5) Verify the customer is not authenticated', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeFalsy();
    });

    console.log('✅ Invalid Login completed successfully!');
});