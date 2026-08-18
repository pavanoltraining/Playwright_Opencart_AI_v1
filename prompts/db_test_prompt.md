# OpenCart UI + Admin + MySQL End-to-End Test Scenario

Implement this scenario following the framework conventions defined in `playwright-mcp-context.md`.

## Objective

Validate a newly registered OpenCart customer across three layers:

1. Frontend customer UI
2. OpenCart Admin Portal
3. MySQL database

The test must use dynamically generated customer data so that every execution creates a unique customer.

## Application Details

### Frontend

- URL: `http://localhost/opencart/upload/`

### Admin Portal

- URL: `http://localhost/opencart/upload/admin/index.php`
- Use the administrator credentials configured for the test environment.

### MySQL

- Host: `localhost`
- Port: `3306`
- Database: `openshop`
- Username: `root`
- Password: empty
- Table: `oc_customer`

## Test Scenario

One independent end-to-end test with the following flow.

### Step 1: Register a Customer Through the Frontend

1. Open `http://localhost/opencart/upload/`.
2. Navigate to **My Account → Register**.
3. Verify that the registration page is displayed.
4. Generate unique test data:
   - First Name
   - Last Name
   - Unique Email Address
   - Telephone
   - Password
   - Password Confirmation
5. Fill all mandatory registration fields.
6. Accept the Privacy Policy.
7. Submit the registration form.
8. Verify that registration succeeds.
9. Verify the expected account-created confirmation, such as **"Your Account Has Been Created!"**.
10. Store the generated customer data for later Admin and database validation.

### Step 2: Verify the Customer in the Admin Portal

1. Open the OpenCart Admin Portal.
2. Log in using configured administrator credentials.
3. Navigate to the **Customers** section.
4. Search for the customer using the unique email address.
5. Verify that the customer exists.
6. Open the customer record/details when applicable.
7. Verify:
   - First Name matches the generated value.
   - Last Name matches the generated value.
   - Email matches the generated value.
   - Customer status is displayed as expected.

### Step 3: Verify the Customer in MySQL

1. Open a MySQL connection using the configured database details.
2. Query `oc_customer` using the unique registered email address.
3. Verify that exactly the expected customer record is found.
4. Validate:
   - `firstname` matches the generated first name.
   - `lastname` matches the generated last name.
   - `email` matches the generated email.
   - `status` matches the expected registration status.
   - `date_added` exists when the column is available.
5. Close the database connection reliably, even when assertions fail.

## Expected Result

The test passes only when the same newly generated customer is successfully:

1. Registered through the frontend.
2. Found and validated in the Admin Portal.
3. Found and validated in the `oc_customer` MySQL table.

If any layer contains mismatched customer data, the test must fail with a clear assertion message.
