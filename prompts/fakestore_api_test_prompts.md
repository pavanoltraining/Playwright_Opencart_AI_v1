# FakeStore REST API – API Test Prompts

**Base URL:** `https://fakestoreapi.com`

## Common Requirements

For every prompt:

- Create a **Playwright API test using TypeScript**.
- Use the existing Playwright project/framework structure.
- Use Playwright's `request` fixture / APIRequestContext according to the existing project framework.
- Use the existing `Routes` constants when the project already defines them.
- Do not invent route names that are not present in the project.
- Keep request construction, response parsing, and assertions clear for beginners.
- Validate status codes, response structure, and important business fields.
- Add meaningful test and assertion messages.
- Avoid weak assertions such as checking only that a response exists.
- Use API response data as input to later operations in workflow tests.
- Keep independent tests independent; do not rely on another test's execution order unless the prompt explicitly requires a workflow.
- For CRUD tests, use deterministic test data and capture returned IDs.
- Where the API's behavior is not guaranteed by the supplied test material, validate the response contract rather than adding unsupported assumptions.

---

# Authentication

## 1. Successful Login

Create a Playwright API test using TypeScript to verify successful authentication.

1. Use `AUTH_LOGIN` from `Routes`.
2. Send a POST request with valid username and password.
3. Verify status code `201`.
4. Parse the JSON response.
5. Verify that `token` exists.
6. Verify that `token` is a non-empty string.

### Expected Result

Status `201` is returned and a non-empty authentication token is provided.

---

## 2. Invalid Login

Create a Playwright API test using TypeScript to verify authentication failure.

1. Use `AUTH_LOGIN` from `Routes`.
2. Send invalid username and password.
3. Verify status code `401`.
4. Parse the response.
5. Verify the error message is:

`username or password is incorrect`

### Expected Result

Status `401` is returned with the expected authentication error.

---

# Products API

## 3. Get All Products

Create a Playwright API test to retrieve all products.

1. Use `GET_ALL_PRODUCTS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body is an array.
5. Verify that the array contains at least one product.
6. Validate important fields such as:
   - `id`
   - `title`
   - `price`
   - `category`
   - `image`

### Expected Result

A non-empty product array is returned with the expected product structure.

---

## 4. Get Product by ID

Create a Playwright API test to retrieve one product.

1. Use `GET_PRODUCT_BY_ID` from `Routes`.
2. Select a valid product ID.
3. Replace the `{id}` path parameter.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned `id` matches the requested ID.
7. Validate the important product properties.

### Expected Result

The requested product is returned and its ID matches the requested ID.

---

## 5. Get Products with Limit

Create a Playwright API test to validate the product limit parameter.

1. Use `GET_PRODUCTS_WITH_LIMIT` from `Routes`.
2. Send a GET request with a predefined limit.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the returned number of products matches the requested limit.

### Expected Result

The response contains an array with the requested number of products.

---

## 6. Sort Products – Ascending

Create a Playwright API test to verify ascending product sorting.

1. Use `GET_PRODUCTS_SORTED` from `Routes`.
2. Send the request with the project's supported ascending sort parameter.
3. Verify status `200`.
4. Extract product IDs.
5. Verify IDs are in ascending order.

### Expected Result

Product IDs follow ascending order.

---

## 7. Sort Products – Descending

Create a Playwright API test to verify descending product sorting.

1. Use `GET_PRODUCTS_SORTED` from `Routes`.
2. Send the request with the project's supported descending sort parameter.
3. Verify status `200`.
4. Extract product IDs.
5. Verify IDs are in descending order.

### Expected Result

Product IDs follow descending order.

---

## 8. Get All Product Categories

Create a Playwright API test to retrieve all product categories.

1. Use `GET_ALL_CATEGORIES` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the category list is not empty.

### Expected Result

A non-empty category array is returned.

---

## 9. Get Products by Category

Create a Playwright API test to retrieve products for a specific category.

1. Use `GET_PRODUCTS_BY_CATEGORY` from `Routes`.
2. Use a valid category such as `electronics`.
3. Replace `{category}` with the selected category.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response is an array.
7. Verify every returned product has the requested category.

### Expected Result

Products for the requested category are returned and each product belongs to that category.

---

## 10. Product CRUD – Create

Create a Playwright API test to create a product.

1. Use `CREATE_PRODUCT` from `Routes`.
2. Send a POST request with valid product data.
3. Verify status `201`.
4. Parse the response.
5. Verify a product ID is returned.
6. Verify the response contains the submitted product information.

### Expected Result

The product creation request succeeds and a product ID is returned.

---

## 11. Product CRUD – Update

Create a Playwright API test to update an existing product.

1. Use `UPDATE_PRODUCT` from `Routes`.
2. Select a valid product ID.
3. Send a PUT request with updated product information.
4. Verify status `200`.
5. Verify the response contains the updated values.
6. Verify the returned product ID matches the requested ID.

### Expected Result

The update request succeeds and the response reflects the requested changes.

---

## 12. Product CRUD – Delete

Create a Playwright API test to delete a product.

1. Use `DELETE_PRODUCT` from `Routes`.
2. Select a valid product ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Validate the response body where the API contract provides one.

### Expected Result

The delete request is processed successfully.

---

# Users API

## 13. Get All Users

Create a Playwright API test to retrieve all users.

1. Use `GET_ALL_USERS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the array is not empty.

### Expected Result

A non-empty user array is returned.

---

## 14. Get User by ID

Create a Playwright API test to retrieve a specific user.

1. Use `GET_USER_BY_ID` from `Routes`.
2. Select a valid user ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned user ID matches the requested ID.

### Expected Result

The requested user is returned with the correct ID.

---

## 15. Get Users with Limit

Create a Playwright API test to validate user result limiting.

1. Use `GET_USERS_WITH_LIMIT` from `Routes`.
2. Send a GET request with a predefined limit.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the returned user count matches the requested limit.

### Expected Result

The response contains the requested number of users.

---

## 16. Sort Users

Create Playwright API tests using TypeScript to verify user sorting.

1. Use `GET_USERS_SORTED` from `Routes`.
2. Test both ascending and descending sorting.
3. Verify status `200` for each request.
4. Extract user IDs.
5. Verify the IDs follow the requested sort order.

### Expected Result

User IDs follow the requested ascending or descending order.

---

## 17. User CRUD – Create

Create a Playwright API test to create a user.

1. Use `CREATE_USER` from `Routes`.
2. Send a POST request with valid user information.
3. Verify status `201`.
4. Verify a generated user ID is returned.
5. Validate the returned user information.

### Expected Result

The user is created successfully and a user ID is returned.

---

## 18. User CRUD – Update

Create a Playwright API test to update a user.

1. Use `UPDATE_USER` from `Routes`.
2. Select a valid user ID.
3. Send a PUT request with updated user information.
4. Verify status `200`.
5. Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response contains the requested changes.

---

## 19. User CRUD – Delete

Create a Playwright API test to delete a user.

1. Use `DELETE_USER` from `Routes`.
2. Select a valid user ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Validate the response body where applicable.

### Expected Result

The delete request is processed successfully.

---

# Carts API

## 20. Get All Carts

Create a Playwright API test to retrieve all carts.

1. Use `GET_ALL_CARTS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the array is not empty.

### Expected Result

A non-empty cart array is returned.

---

## 21. Get Cart by ID

Create a Playwright API test to retrieve a specific cart.

1. Use `GET_CART_BY_ID` from `Routes`.
2. Select a valid cart ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned cart ID matches the requested ID.

### Expected Result

The requested cart is returned with the correct ID.

---

## 22. Get Carts by Date Range

Create a Playwright API test to validate cart filtering by date range.

1. Use `GET_CARTS_BY_DATE_RANGE` from `Routes`.
2. Provide valid start and end dates.
3. Send a GET request.
4. Verify status `200`.
5. Verify the response is an array.
6. Verify returned cart records fall within the requested date range according to the API's response format.

### Expected Result

The response contains carts matching the requested date range.

---

## 23. Get User Cart

Create a Playwright API test to retrieve carts belonging to a specific user.

1. Use `GET_USER_CART` from `Routes`.
2. Provide a valid user ID.
3. Send a GET request.
4. Verify status `200`.
5. Verify the response contains cart records where applicable.
6. Verify returned carts belong to the requested user.

### Expected Result

The requested user's carts are returned.

---

## 24. Get Carts with Limit

Create a Playwright API test to validate cart result limiting.

1. Use `GET_CARTS_WITH_LIMIT` from `Routes`.
2. Send a GET request with a predefined limit.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the returned cart count matches the requested limit.

### Expected Result

The response contains the requested number of carts.

---

## 25. Sort Carts

Create Playwright API tests to verify cart sorting.

1. Use `GET_CARTS_SORTED` from `Routes`.
2. Test ascending and descending sorting.
3. Verify status `200` for each request.
4. Extract cart IDs.
5. Verify IDs are sorted according to the requested order.

### Expected Result

Cart IDs follow the requested sort order.

---

## 26. Cart CRUD – Create

Create a Playwright API test to create a cart.

1. Use `CREATE_CART` from `Routes`.
2. Send a POST request containing a valid user ID and products list.
3. Verify status `201`.
4. Verify a cart ID is returned.
5. Verify the response contains the expected user ID and products.

### Expected Result

The cart is created successfully and its returned data matches the submitted data.

---

## 27. Cart CRUD – Update

Create a Playwright API test to update an existing cart.

1. Use `UPDATE_CART` from `Routes`.
2. Select a valid cart ID.
3. Send a PUT request with updated cart information.
4. Change at least one product quantity.
5. Verify status `200`.
6. Verify the response reflects the updated values.

### Expected Result

The cart update succeeds and the requested quantity change is reflected.

---

## 28. Cart CRUD – Delete

Create a Playwright API test to delete an existing cart.

1. Use `DELETE_CART` from `Routes`.
2. Select a valid cart ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Validate the response body where applicable.

### Expected Result

The cart deletion request is processed successfully.

---

# JSON Schema Validation

## 29. Product Response Schema

Create a Playwright API test to validate the JSON schema of a product response.

1. Retrieve a product using `GET_PRODUCT_BY_ID`.
2. Verify status `200`.
3. Define the expected product JSON schema based on the API response contract.
4. Validate the response against the schema.
5. Fail the test with a useful validation message when the schema does not match.

### Expected Result

The product response conforms to the expected JSON schema.

---

## 30. User Response Schema

Create a Playwright API test to validate the JSON schema of a user response.

1. Retrieve a user using `GET_USER_BY_ID`.
2. Verify status `200`.
3. Define the expected user JSON schema.
4. Validate the response against the schema.
5. Fail the test when the response does not conform to the schema.

### Expected Result

The user response conforms to the expected JSON schema.

---

## 31. Cart Response Schema

Create a Playwright API test to validate the JSON schema of a cart response.

1. Retrieve a cart using `GET_CART_BY_ID`.
2. Verify status `200`.
3. Define the expected cart JSON schema.
4. Validate the response against the schema.
5. Fail the test when the response does not conform to the schema.

### Expected Result

The cart response conforms to the expected JSON schema.

---

# End-to-End API Workflows

## 32. Product CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Product CRUD workflow.

Execute these operations in sequence:

1. Create a product using `CREATE_PRODUCT`.
2. Verify status `201`.
3. Extract the returned product ID.
4. Update the same product using `UPDATE_PRODUCT`.
5. Verify status `200`.
6. Verify the updated product values.
7. Delete the same product using `DELETE_PRODUCT`.
8. Verify status `200`.

Use the product ID returned by the create operation for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated product ID.

---

## 33. User CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete User CRUD workflow.

Execute these operations in sequence:

1. Create a user using `CREATE_USER`.
2. Verify status `201`.
3. Extract the returned user ID.
4. Update the same user using `UPDATE_USER`.
5. Verify status `200`.
6. Verify the updated user information.
7. Delete the same user using `DELETE_USER`.
8. Verify status `200`.

Use response data from each step as input for the next operation.

### Expected Result

The create → update → delete workflow completes successfully using the same generated user ID.

---

## 34. Cart CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Cart CRUD workflow.

Execute these operations in sequence:

1. Create a cart using `CREATE_CART`.
2. Verify status `201`.
3. Extract the returned cart ID.
4. Verify the returned user ID and products list.
5. Update the same cart using `UPDATE_CART`.
6. Verify status `200`.
7. Verify the updated product quantity.
8. Delete the same cart using `DELETE_CART`.
9. Verify status `200`.

Use the generated cart ID for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated cart ID.

---

# Final Implementation Quality Criteria

The generated API tests must:

- Use TypeScript and Playwright API testing.
- Follow the existing project's `Routes` structure.
- Validate both status codes and response content.
- Use strong assertions for important fields.
- Produce useful failure messages.
- Avoid duplicated setup where the existing framework already provides fixtures.
- Keep independent tests isolated.
- Use response chaining only where the prompt explicitly defines a workflow.
- Keep the implementation simple enough for beginners to understand.
