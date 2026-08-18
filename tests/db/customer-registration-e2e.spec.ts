/**
 * Test Case: OpenCart UI + Admin + MySQL End-to-End Customer Registration Validation
 *
 * Tags: @master @end-to-end @db @regression
 *
 * Steps:
 * 1) Register a unique customer through the frontend
 * 2) Verify the customer in the OpenCart Admin Portal
 * 3) Verify the customer record in the MySQL oc_customer table
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { executeQuery } from '../../utils/dbClient';

const ADMIN_URL = process.env.ADMIN_URL || 'http://localhost/opencart/upload/admin/index.php';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

test.describe('OpenCart Customer Registration - UI + Admin + DB Validation @master @end-to-end @db', () => {

    test('Register customer, verify in admin portal and MySQL @db', async ({
        page, homePage, registerPage, successPage, adminLoginPage, adminCustomersPage, adminCustomerEditPage
    }) => {
        // Generate unique customer data once, reused across all three layers
        const firstName = RandomDataUtil.getFirstName();
        const lastName = RandomDataUtil.getLastName();
        const email = RandomDataUtil.getEmail();
        const telephone = RandomDataUtil.getPhoneNumber();
        const password = RandomDataUtil.getPassword();

        await test.step('1) Register a new customer through the frontend', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
            await homePage.clickMyAccount();
            await homePage.clickRegister();

            const isRegisterPage = await registerPage.isRegisterPageExists();
            expect(isRegisterPage, 'Register Account page should be displayed').toBeTruthy();

            await registerPage.completeRegistration(firstName, lastName, email, telephone, password);

            const isSuccess = await successPage.isSuccessPageExists();
            expect(isSuccess, 'Account created success page should be displayed').toBeTruthy();

            const headingText = await successPage.getSuccessHeadingText();
            expect(headingText).toContain('Your Account Has Been Created!');
        });

        await test.step('2) Verify the customer in the Admin Portal', async () => {
            await page.goto(ADMIN_URL);

            const isLoginPage = await adminLoginPage.isAdminLoginPageExists();
            expect(isLoginPage, 'Admin login page should be displayed').toBeTruthy();

            await adminLoginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

            await page.waitForURL(/route=common\/dashboard/);

            await adminCustomersPage.dismissSecurityModal();

            await adminCustomersPage.clickCustomersMenu();
            await adminCustomersPage.clickCustomersSubmenu();
            await page.waitForURL(/route=customer\/customer/);

            const isCustomersPage = await adminCustomersPage.isCustomersPageExists();
            expect(isCustomersPage, 'Admin Customers list page should be displayed').toBeTruthy();

            await adminCustomersPage.searchCustomerByEmail(email);

            const isRowVisible = await adminCustomersPage.isCustomerRowExists(email);
            expect(isRowVisible, `Customer with email ${email} should appear in the admin customer list`).toBeTruthy();

            await adminCustomersPage.clickEditCustomer(email);

            const isEditPage = await adminCustomerEditPage.isEditCustomerPageExists();
            expect(isEditPage, 'Edit Customer page should be displayed').toBeTruthy();

            expect(await adminCustomerEditPage.getFirstNameValue(), 'First name should match').toBe(firstName);
            expect(await adminCustomerEditPage.getLastNameValue(), 'Last name should match').toBe(lastName);
            expect(await adminCustomerEditPage.getEmailValue(), 'Email should match').toBe(email);
            expect(await adminCustomerEditPage.getStatusValue(), 'Customer status should be enabled (1)').toBe('1');
        });

        await test.step('3) Verify the customer in the MySQL oc_customer table', async () => {
            const rows: any[] = (await executeQuery(
                'SELECT customer_id, firstname, lastname, email, status, date_added FROM oc_customer WHERE email = ?',
                [email]
            )) as any[];

            expect(rows.length, `Exactly one customer record should exist for email ${email}`).toBe(1);

            const customer = rows[0];
            expect(customer.firstname, 'DB firstname should match generated first name').toBe(firstName);
            expect(customer.lastname, 'DB lastname should match generated last name').toBe(lastName);
            expect(customer.email, 'DB email should match generated email').toBe(email);
            expect(customer.status, 'DB status should be 1 (enabled)').toBe(1);
            expect(customer.date_added, 'DB date_added should exist').toBeTruthy();
        });

        console.log('✅ Customer registration validated across UI, Admin and MySQL successfully!');
    });
});
