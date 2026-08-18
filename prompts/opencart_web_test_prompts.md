# OpenCart Frontend Store – Web Test Scenarios

**Application URL:** `http://localhost/opencart/upload/`

Implement these scenarios following the framework conventions defined in `playwright-mcp-context.md`.

---

# 1. User Registration Flow

Validate successful customer registration in the OpenCart frontend.

1. Open the application.
2. Navigate to **My Account → Register**.
3. Verify that the registration page is displayed.
4. Generate a unique customer email.
5. Enter valid values for:
   - First Name
   - Last Name
   - Email Address
   - Telephone
   - Password
   - Password Confirmation
6. Accept the Privacy Policy.
7. Submit the registration form.
8. Verify that registration succeeds.
9. Verify the account-created confirmation, such as **"Your Account Has Been Created!"**.
10. Verify that the newly created account is available through the expected account navigation.

## Expected Result

The registration completes successfully and the confirmation message is displayed.

---

# 2. Valid Login Flow

Validate successful customer login.

1. Open the application.
2. Navigate to **My Account → Login**.
3. Verify that the login page is displayed.
4. Enter valid customer credentials from the project's configured test data.
5. Submit the login form.
6. Verify successful authentication.
7. Verify that the user is redirected to the **My Account** section.
8. Verify that the account dashboard or appropriate authenticated account navigation is visible.

## Expected Result

Valid credentials are accepted and the customer reaches the authenticated My Account area.

---

# 3. Invalid Login Flow

Verify login failure with invalid customer credentials.

1. Open the application.
2. Navigate to **My Account → Login**.
3. Enter an invalid email and/or password.
4. Submit the form.
5. Verify that authentication fails.
6. Verify the appropriate warning/error message.
7. Verify that the customer is not authenticated.

Expected warning for the supplied application scenario:

`Warning: No match for E-Mail Address and/or Password.`

## Expected Result

The invalid login is rejected and the expected warning is displayed.

---

# 4. Logout Flow

Validate customer logout.

1. Open the application.
2. Log in using valid customer credentials.
3. Verify that authentication succeeds.
4. Navigate to the account logout option.
5. Click **Logout**.
6. Verify that the logout confirmation page is displayed.
7. Click **Continue**.
8. Verify the expected redirect, such as the homepage.
9. Verify that authenticated account options are no longer available.

## Expected Result

The customer is logged out successfully and can no longer access authenticated account options.

---

# 5. Product Search Flow

Validate product search.

1. Open the application.
2. Locate the main product search field.
3. Enter a valid known product name.
4. Submit the search.
5. Verify that the search results page is displayed.
6. Verify that the expected product appears in the results.
7. Verify that the displayed product name matches the search criteria.

## Expected Result

The search returns the expected product and the product name is displayed correctly.

---

# 6. Add Product to Cart

Validate adding a product to the shopping cart.

1. Open the application.
2. Search for a valid known product.
3. Open the product details page.
4. Verify that the product details are displayed.
5. Set the required quantity when the product supports quantity selection.
6. Click **Add to Cart**.
7. Verify the product-added success/confirmation message.
8. Open the shopping cart.
9. Verify that the selected product is present.
10. Verify the displayed quantity matches the requested quantity.

## Expected Result

The selected product is successfully added to the cart with the expected quantity.

---

# 7. End-to-End Shopping Flow

Covers the complete customer shopping journey.

1. Open the application.
2. Register a new customer using dynamically generated unique data.
3. Verify successful registration.
4. Log out.
5. Log in again using the newly created credentials.
6. Verify successful authentication.
7. Search for a known product.
8. Open the product details page.
9. Add the product to the cart.
10. Open the shopping cart.
11. Verify the correct product.
12. Verify the quantity.
13. Verify the product price.
14. Verify the applicable cart total.
15. Verify that the complete journey finishes without errors.

## Expected Result

Registration, re-login, product search, cart addition, and cart validation all succeed in one continuous customer journey.

---

# 8. Login Flow (Data Driven using External File)

Validate OpenCart customer login using test data loaded from an external file, with one independent test generated per data row.

## Test Data

Load rows from an external data file — one of:

- `testdata/opencart_logindata.csv`
- `testdata/opencart_logindata.xlsx`
- `testdata/opencart_logindata.json`

Each row contains:

- `testName` or `TestName` — scenario name
- `email` — login email
- `password` — login password
- `expected` — `success` or `failure`

Do not hard-code test data in the spec.

## Test Flow

For each data row:

1. Open the OpenCart login page: `http://localhost/opencart/upload/`.
2. Enter the email and password.
3. If a value is blank/whitespace, leave that field empty.
4. Submit the login form.
5. Validate the result based on `expected`.

## Validation

**For `expected: success`:**

- Verify login is successful.
- Verify the **My Account** page is displayed.

**For `expected: failure`:**

- Verify login is unsuccessful.
- Verify the appropriate OpenCart warning/error message, such as:
  `Warning: No match for E-Mail Address and/or Password.`

**For blank email/password:**

- Verify the application's actual validation/error behavior.
- Do not replace blank values with dummy data.

## Expected Result

Loading the external test data produces one independent test per row, and the actual OpenCart login result matches each row's `expected` value.
