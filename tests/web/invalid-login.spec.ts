/**
 * Test Suite: Invalid Login Flows
 *
 * Tags: @master @regression
 *
 * Description:
 * Comprehensive invalid login test cases covering:
 * - Random invalid credentials
 * - SQL Injection attacks
 * - XSS (Cross-Site Scripting) attacks
 * - Empty field validations
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { SecurityPayloads } from '../../utils/securityPayloads';

test.describe('Invalid Login Flows @master @regression @web', () => {

    /**
     * Test Case 1: Random Invalid Credentials
     * Tests login with randomly generated invalid email and password
     */
    test('Invalid Login - Random Credentials', async ({ homePage, loginPage, myAccountPage }) => {
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

        console.log('✅ Invalid Login - Random Credentials completed!');
    });

    /**
     * Test Case 2: SQL Injection Attack
     * Tests if the application is vulnerable to SQL injection
     * Severity: 🔴 Critical - Security
     */
    test('Invalid Login - SQL Injection Attack', async ({ homePage, loginPage, myAccountPage }) => {
        const sqlInjectionEmail = SecurityPayloads.SQL_INJECTION_EMAIL;
        const sqlInjectionPassword = SecurityPayloads.SQL_INJECTION_PASSWORD;

        await test.step('1) Open the application', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        });

        await test.step('2) Navigate to My Account → Login', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('3) Enter SQL injection payload and submit', async () => {
            await loginPage.login(sqlInjectionEmail, sqlInjectionPassword);
        });

        await test.step('4) Verify authentication fails with warning message', async () => {
            const isWarning = await loginPage.isWarningMessageVisible();
            expect(isWarning).toBeTruthy();

            const warningText = await loginPage.getWarningMessage();
            expect(warningText).toContain('Warning');
        });

        await test.step('5) Verify the customer is not authenticated', async () => {
            const isMyAccount = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccount).toBeFalsy();
        });

        console.log('✅ Invalid Login - SQL Injection Attack prevented!');
    });

    /**
     * Test Case 3: XSS (Cross-Site Scripting) Attack
     * Tests if the application sanitizes user input to prevent XSS
     * Severity: 🔴 Critical - Security
     */
    test('Invalid Login - XSS Attack', async ({ homePage, loginPage, myAccountPage }) => {
        const xssEmail = SecurityPayloads.XSS_EMAIL;
        const xssPassword = SecurityPayloads.XSS_PASSWORD;

        await test.step('1) Open the application', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        });

        await test.step('2) Navigate to My Account → Login', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('3) Enter XSS payload and submit', async () => {
            await loginPage.login(xssEmail, xssPassword);
        });

        await test.step('4) Verify authentication fails with warning message', async () => {
            const isWarning = await loginPage.isWarningMessageVisible();
            expect(isWarning).toBeTruthy();

            const warningText = await loginPage.getWarningMessage();
            expect(warningText).toContain('Warning');
        });

        await test.step('5) Verify the customer is not authenticated', async () => {
            const isMyAccount = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccount).toBeFalsy();
        });

        console.log('✅ Invalid Login - XSS Attack prevented!');
    });

    /**
     * Test Case 4: Empty Email Field
     * Tests required field validation for email
     * Severity: 🟡 High - Validation
     */
    test('Invalid Login - Empty Email Field', async ({ homePage, loginPage, myAccountPage }) => {
        const emptyEmail = SecurityPayloads.EMPTY_STRING;
        const validPassword = "test@123";

        await test.step('1) Open the application', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        });

        await test.step('2) Navigate to My Account → Login', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('3) Leave email empty and enter password', async () => {
            await loginPage.setPassword(validPassword);
            await loginPage.clickLogin();
        });

        await test.step('4) Verify authentication fails with warning message', async () => {
            const isWarning = await loginPage.isWarningMessageVisible();
            expect(isWarning).toBeTruthy();

            const warningText = await loginPage.getWarningMessage();
            expect(warningText).toContain('Warning');
        });

        await test.step('5) Verify the customer is not authenticated', async () => {
            const isMyAccount = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccount).toBeFalsy();
        });

        console.log('✅ Invalid Login - Empty Email Field validated!');
    });

    /**
     * Test Case 5: Empty Password Field
     * Tests required field validation for password
     * Severity: 🟡 High - Validation
     */
    test('Invalid Login - Empty Password Field', async ({ homePage, loginPage, myAccountPage }) => {
        const validEmail = "pavanol@xyz.com";
        const emptyPassword = SecurityPayloads.EMPTY_STRING;

        await test.step('1) Open the application', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        });

        await test.step('2) Navigate to My Account → Login', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('3) Enter email and leave password empty', async () => {
            await loginPage.setEmail(validEmail);
            await loginPage.clickLogin();
        });

        await test.step('4) Verify authentication fails with warning message', async () => {
            const isWarning = await loginPage.isWarningMessageVisible();
            expect(isWarning).toBeTruthy();

            const warningText = await loginPage.getWarningMessage();
            expect(warningText).toContain('Warning');
        });

        await test.step('5) Verify the customer is not authenticated', async () => {
            const isMyAccount = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccount).toBeFalsy();
        });

        console.log('✅ Invalid Login - Empty Password Field validated!');
    });

    /**
     * Test Case 6: Very Long Email (255+ characters)
     * Tests boundary validation for email field length
     * Severity: 🟡 High - Boundary Testing
     */
    test('Invalid Login - Very Long Email (255+ chars)', async ({ homePage, loginPage, myAccountPage }) => {
        const longEmail = 'a'.repeat(250) + '@example.com'; // 262 characters
        const validPassword = "test@123";

        await test.step('1) Open the application', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        });

        await test.step('2) Navigate to My Account → Login', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('3) Enter very long email and valid password', async () => {
            await loginPage.login(longEmail, validPassword);
        });

        await test.step('4) Verify authentication fails with warning message', async () => {
            const isWarning = await loginPage.isWarningMessageVisible();
            expect(isWarning).toBeTruthy();

            const warningText = await loginPage.getWarningMessage();
            expect(warningText).toContain('Warning');
        });

        await test.step('5) Verify the customer is not authenticated', async () => {
            const isMyAccount = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccount).toBeFalsy();
        });

        console.log('✅ Invalid Login - Very Long Email validated!');
    });

    /**
     * Test Case 7: Very Long Password (255+ characters)
     * Tests boundary validation for password field length
     * Severity: 🟡 High - Boundary Testing
     */
    test('Invalid Login - Very Long Password (255+ chars)', async ({ homePage, loginPage, myAccountPage }) => {
        const validEmail = "pavanol@xyz.com";
        const longPassword = 'a'.repeat(255); // 255 characters

        await test.step('1) Open the application', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
        });

        await test.step('2) Navigate to My Account → Login', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('3) Enter valid email and very long password', async () => {
            await loginPage.login(validEmail, longPassword);
        });

        await test.step('4) Verify authentication fails with warning message', async () => {
            const isWarning = await loginPage.isWarningMessageVisible();
            expect(isWarning).toBeTruthy();

            const warningText = await loginPage.getWarningMessage();
            expect(warningText).toContain('Warning');
        });

        await test.step('5) Verify the customer is not authenticated', async () => {
            const isMyAccount = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccount).toBeFalsy();
        });

        console.log('✅ Invalid Login - Very Long Password validated!');
    });

});
// End of Invalid Login Tests