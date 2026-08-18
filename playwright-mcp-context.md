# Playwright MCP Context — Generic Test Generation Instructions

This file is the **central coding and automation guideline** and the **single source of truth** for AI-assisted Playwright + TypeScript test generation.

Use it with: Playwright MCP, Playwright Test Agents, Playwright CLI, GitHub Copilot, Claude Code, Codex, and any other AI coding / vibe-coding agent.

Every generated artifact — Web test, Page Object class, custom fixture, API test, route, schema, test data, DB test, utility — MUST follow the structure, naming, conventions, dependency order, and execution sequence defined below so it plugs into the framework consistently.

## Purpose & Scope

This context file is **project-independent**. It does not reference any specific application, URL, API endpoint, database, or business scenario. It defines **HOW** a Playwright + TypeScript automation framework should be designed, structured, and extended — not **WHAT** should be tested.

The **actual test requirements** (application under test, URLs, scenarios, test data values, endpoints, tables, expected results) come from a separate **test prompt file** supplied alongside this context file.

```
playwright-mcp-context.md   →  HOW the framework is built (this file)
test-prompt.md              →  WHAT needs to be tested (supplied per project)
```

The same context file is meant to be reused, unmodified, across different projects. Different test prompt files are supplied for different applications, APIs, databases, and test scenarios.

This context file supports four kinds of automation:

- **Web UI Automation** — browser-driven testing via Page Object Model
- **API Automation** — REST/HTTP testing via Playwright's `request` fixture
- **Database (DB) Testing** — validating relational or other databases from `tests/db/`
- **Combined Web + API + DB Automation** — end-to-end scenarios spanning multiple layers

**Do not hallucinate** files, folders, classes, methods, locators, endpoints, schemas, test data, tables, columns, or framework components. When information cannot be verified, clearly identify what is missing instead of guessing.

---

# 1. Overall Objective

For every test prompt, AI agents MUST:

1. Analyze the supplied test prompt file and the application/API/database it describes.
2. Understand the requested test scenario(s).
3. Analyze the application under test (UI / API / DB) using available tools (browser, API calls, DB queries, or documentation).
4. Identify the required framework components.
5. Inspect the existing project first — reuse existing Page Objects, fixtures, utilities, routes, schemas, test data, and configuration wherever they already satisfy the scenario.
6. Create missing components only when required, following this file's conventions.
7. Generate Web, API, and/or DB tests according to the appropriate architecture.
8. Follow the correct dependency and execution sequence (§25).
9. Avoid duplicate, conflicting, unnecessary, or hard-coded implementations.

The instructions in this file are detailed and deterministic so different AI coding agents produce **consistent results from the same test prompt**, regardless of the underlying project.

---

# 2. Framework Overview

- **Test runner:** `@playwright/test`
- **Language:** TypeScript, strict mode (`tsconfig.json`: `strict: true`)
- **UI pattern:** Page Object Model (POM) under `pages/`, exposed to tests via custom fixtures in `fixtures/pageFixtures.ts`
- **API testing:** Playwright's built-in `request` fixture (or `APIRequestContext`) against the REST API under test
- **Data:** Faker.js random data generation, JSON/CSV/Excel readers, static/fixed test-data helpers
- **Validation:** JSON-schema validation (e.g. AJV) for API responses, with schemas stored under `api/schemas/`
- **Environment:** `dotenv` + `.env` for URLs, credentials, IDs, and other environment-specific values
- **Reports:** Playwright HTML reporter, optional custom reporter, optional Allure or other reporting integrations
- **Prompt sources (generation drivers):** one or more test prompt files supplied per project (Web scenarios, API scenarios, DB scenarios, or a combined prompt) — these prompts are the **only** source of new test scenarios; this context file supplies everything about *how* to implement them

This file makes **no assumption** about whether a project already has existing tests, Page Objects, fixtures, routes, or utilities. Before generating anything, the agent must inspect the actual project state (§3.1) rather than assume a greenfield or brownfield repo.

---

# 3. Mandatory Rules for AI Agents

## 3.1 Analyze Before Creating

Before creating or modifying any file:

- Analyze the complete project structure as it actually exists on disk.
- Inspect existing folders and files (`pages/`, `fixtures/`, `tests/`, `api/`, `utils/`, `testdata/`, `.env`, `playwright.config.ts`, etc.).
- Understand the framework architecture defined in this file and reconcile it with what actually exists in the project.
- Check whether the required class, function, fixture, utility, test data, route, schema, or configuration already exists.
- Reuse existing implementations whenever appropriate.
- Update existing files instead of creating duplicate files.
- Do not create duplicate classes, utilities, fixtures, routes, schemas, or test files.
- If the project has no existing Web/API/DB tests, Page Objects, or fixtures, treat the test prompt(s) as the scaffolding driver: build the required components from scratch following this file's conventions.

## 3.2 Do Not Hallucinate

AI agents MUST NOT:

- Invent application behavior.
- Invent locators.
- Invent API endpoints.
- Invent request/response fields.
- Invent database tables or columns.
- Invent test data.
- Invent framework files.
- Invent page classes.
- Invent utility methods.
- Invent configuration values.
- Assume functionality that cannot be verified.

If required information cannot be determined from the application, existing source files, the test prompt, API documentation, database information, or available tools, the agent MUST clearly identify the missing information instead of silently guessing.

## 3.3 Follow the Framework Conventions

Before implementing anything, follow the framework conventions defined in this file:

- Folder structure (§4)
- Naming conventions (files, classes, methods)
- Locator strategy
- Fixture strategy
- Environment variable strategy
- Test organization and tagging
- Web architecture
- API architecture
- DB architecture
- Reporting configuration
- Utility conventions
- Test-data conventions
- TypeScript configuration
- Playwright configuration

Do not introduce a new architectural pattern when the framework convention in this file already covers it. Where the actual project already has an established (but slightly different) convention, prefer consistency with the existing project over this file's defaults — but flag the deviation rather than silently mixing styles.

---

# 4. Project Structure

The folders below are the **generic target layout**. Not every project needs every folder — include only the layers (Web / API / DB) that the supplied test prompt(s) require. If the project already has an established structure that differs, extend that structure instead of imposing this one.

```
├── .env                          # Env vars: app URL(s), API base URL(s), credentials, IDs, DB config
├── api/
│   ├── endpoints/routes.ts       # Routes constants object (all API endpoints of the app under test)
│   └── schemas/                  # JSON response/request schemas for schema validation
├── fixtures/
│   └── pageFixtures.ts           # Custom fixtures exposing Web page objects (re-exports expect)
├── pages/                        # Page Object classes (PascalCase, one class per file)
├── prompts/                      # Test-scenario prompt file(s) supplied per project (the generation drivers)
├── tests/
│   ├── web/                      # UI tests — use the custom page fixtures
│   ├── api/                      # REST API tests — use the request fixture
│   └── db/                       # DB-backed tests
├── testdata/                     # Data files (JSON / CSV / XLSX) for data-driven tests
└── utils/                        # Reusable utility classes/functions (data generation, data reading, DB client, fixed test fixtures, reporting, etc.)
```

**Where new files go:**

| Artifact                    | Location                       | File naming                                |
| ---------------------------- | ------------------------------- | ------------------------------------------- |
| Page Object class            | `pages/`                        | `XxxPage.ts` (PascalCase)                   |
| Test fixture changes         | `fixtures/pageFixtures.ts`      | add to `PageFixtures` type + `base.extend`  |
| Web test spec                | `tests/web/`                    | `kebab-case.spec.ts`                        |
| API test spec                | `tests/api/`                    | `kebab-case.spec.ts`                        |
| DB test spec                 | `tests/db/`                     | `kebab-case.spec.ts`                        |
| JSON schema                  | `api/schemas/`                  | `xxx_api_schema.json`                       |
| Route constants              | `api/endpoints/routes.ts`       | add to `Routes` object                      |
| Test data                    | `testdata/`                     | `xxx.json` / `.csv` / `.xlsx`               |
| Utility                      | `utils/`                        | `camelCase.ts` or `PascalCase.ts` (match existing convention in the project) |

---

# 5. Test Prompt Mapping

Define the relationship between the supplied prompt file(s) and the framework before any test is created. A project may supply one combined prompt file, or separate prompt files per layer (Web / API / DB). The agent must determine which layer(s) a given prompt targets before starting.

## Web

```
Web Test Prompt (scenario)
        ↓
Application/Page Analysis
        ↓
Page Objects
        ↓
Custom Page Fixture
        ↓
Test Data / Utilities
        ↓
Web Test
```

## API

```
API Test Prompt (scenario)
        ↓
Endpoint/Route Analysis
        ↓
Schemas
        ↓
Test Data / Utilities
        ↓
API Test
```

## DB

```
DB Test Prompt (scenario)
        ↓
Database Analysis
        ↓
DB Configuration
        ↓
Queries / DB Utilities
        ↓
Test Data
        ↓
DB Test
```

## Combined (Web + API + DB)

When a single scenario spans multiple layers (e.g., an action performed via the UI, then verified via an API and/or a database), build each layer in the order Web → API → DB, reusing the same generated test data across layers, and keep each layer's implementation in its own section/step within the test — do not blur the architectural boundaries defined in §19.

---

# 6. Web Testing Architecture

Web tests are generated from Web scenarios in the supplied test prompt(s) and MUST follow this exact sequence:

```text
Web Test Prompt
      ↓
Analyze Web Application
      ↓
Analyze Required Pages
      ↓
Create / Update Page Object Classes
      ↓
Create / Update Custom Page Fixture
      ↓
Create / Update Test Data
      ↓
Create / Update Utilities if Required
      ↓
Create Web Test
      ↓
Execute and Validate Test
      ↓
Fix Only Actual Failures
```

---

# 7. Mandatory Web Test Creation Sequence

For every Web test scenario, AI agents MUST follow this sequence in order. Do not skip steps and do not create the test file early.

## Step 1 — Analyze the Test Scenario

Read the corresponding scenario from the supplied Web test prompt. Understand:

- Test objective
- Preconditions
- Application flow
- Pages involved
- User actions
- Input data
- Expected results
- Validation points
- Dependencies between steps

Do not immediately create the test file.

## Step 2 — Analyze the Web Pages

According to the test scenario and its steps:

- Open/analyze the required application pages (via MCP browser tools or the test runner).
- Identify the actual page structure.
- Identify elements required by the scenario.
- Determine reliable locators.
- Understand navigation between pages.
- Identify forms, buttons, links, tables, dropdowns, messages, etc.
- Verify the actual text and accessible roles where possible.

Prefer Playwright's built-in locators, in priority order:

```text
getByRole()
getByLabel()
getByText()
getByPlaceholder()
getByTestId()
```

Use CSS/XPath only when necessary and when a better Playwright locator is not available. Never invent locators based only on assumptions.

Avoid: XPath, `nth-child`, long CSS chains, and fragile auto-generated attribute selectors.

## Step 3 — Page Object Creation / Update

After analyzing the required pages:

- Check whether a Page Object class already exists (`pages/`).
- If it exists, update it only when required.
- If it does not exist, create it.
- Keep page-specific locators and actions inside the Page Object class.
- Do not put application-specific page interaction logic directly inside tests unless there is a strong reason.

Page Objects should contain:

- Page-specific locators
- Page-specific actions
- Page-specific navigation
- Page-specific reusable methods
- Page-specific validation methods where appropriate

Avoid putting generic utilities inside Page Objects. See §9 for the exact class conventions.

## Step 4 — Custom Page Fixture

The custom page fixture MUST be created or updated **after** the required Page Object classes exist.

Before creating the fixture:

1. Identify all Page Object classes required by the scenario.
2. Verify that those classes exist.
3. Verify their constructors and dependencies.
4. Then create or update `fixtures/pageFixtures.ts`.

The custom fixture exposes the required Page Objects to tests:

```text
test
 ├── homePage
 ├── loginPage
 ├── <otherPage>
 └── ...
```

Do not create Page Objects inside the test file — the framework uses a custom Page Fixture. See §10 for the fixture conventions.

## Step 5 — Web Test Data

Web tests must use the framework's test-data strategy.

Before creating test data:

- Check existing test-data files (`testdata/`).
- Reuse existing data where appropriate.
- Create new data only when required.
- Avoid hard-coding values directly inside tests when the framework provides a test-data mechanism.
- Use `.env` only for environment-specific configuration and secrets.
- Never place passwords, tokens, API keys, or other secrets directly in test files.

Use the project's random-data utility (Faker-based or equivalent) for dynamic data, and a fixed-data helper for known/static test fixtures. See §14.

## Step 6 — Web Utilities

Use existing utilities whenever possible.

Before creating a utility:

1. Search the framework for an existing implementation.
2. Determine whether it can be reused.
3. Extend the existing utility when appropriate.
4. Create a new utility only when functionality genuinely does not exist.

Do not create multiple utilities that perform the same operation.

## Step 7 — Web Test Creation

Only after steps 1–6 are complete should the AI agent create or update the Web test.

Web tests should:

- Be readable.
- Be beginner-friendly.
- Use the custom page fixture (`fixtures/pageFixtures`).
- Use Page Objects.
- Avoid duplicated page interaction code.
- Avoid unnecessary helper functions.
- Follow the existing project test structure.
- Contain meaningful assertions.
- Validate the expected result of each important business step.
- Use appropriate Playwright assertions.
- Avoid arbitrary waits such as `waitForTimeout()` unless there is a documented and genuine requirement.

## Step 8 — Web Test Execution and Validation

After generating the test:

1. Run the appropriate Playwright test.
2. Analyze the actual failure if the test fails.
3. Determine whether the failure is caused by:
   - Locator issue
   - Application behavior
   - Test-data issue
   - Fixture issue
   - Page Object issue
   - Configuration issue
   - Environment issue
4. Fix the actual problem.
5. Re-run the test.
6. Do not make unrelated framework changes merely to make a test pass.

Never modify application behavior to accommodate an incorrect test.

---

# 8. Web Test Conventions (`tests/web/`)

- **Import the custom fixtures, never `@playwright/test` directly:** `import { test, expect } from '../../fixtures/pageFixtures'`
- Optional JSDoc-style header comment: `Test Case`, `Tags`, `Steps`.

- Test title includes tags: `test('User login test @master @sanity @regression @web', ...)`.
- Destructure only the page fixtures you need: `async ({ homePage, loginPage, ... })`.
- Wrap every flow section in `await test.step('N) description', async () => { ... })`.
- Data comes from a fixed-data helper (e.g. `Helper.getLoginDetails()`), or a random-data utility for random values.
- Assertions use `expect(...)` (boolean checks from page methods, `toBeTruthy()` / `toBe()` / `toContain(...)`).
- End with a `console.log('✅ ...')` success message.
- Data-driven specs load datasets via a data-reader utility from `testdata/` and loop over each row, creating one test per row with the `@datadriven` tag.

### Waiting Strategy

- Use Playwright auto-waiting (`expect(locator).toBeVisible()`, `waitForURL()`, `waitForLoadState()`)
- ❌ Avoid hardcoded timeouts / `waitForTimeout()`

### Template

```ts
/**
 * Test Case: <Description>
 *
 * Tags: @master @sanity
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) ...
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures'
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('<Description> test @master @sanity', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Navigate to the login page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('2) Perform the action', async () => {
        await loginPage.login(email, password);
        const isLoggedIn = await myAccountPage.isMyAccountPageExists();
        expect(isLoggedIn).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});
```

---

# 9. Page Object Class Conventions

- Class name matches the file (`HomePage` in `HomePage.ts`), `export class`.
- `private readonly page: Page;` plus `private readonly` `Locator` fields.
- A `// Locators` comment block above the locator fields; a `// Initialize locators with CSS selectors` comment in the constructor.
- Locators come from live page discovery and use `getByRole()` (preferred), `getByText()`, `getByLabel()`, `getByPlaceholder()`, `getByTestId()`, CSS selectors and text-based selectors when nothing better is available.
- Every public method has a JSDoc comment (`/** ... */`) describing it, with `@param` and `@returns` tags where applicable.
- Methods return `Promise<void>` for actions, `Promise<boolean>` for existence checks (`isXxxExists()`), or a typed instance of the next page object when the action navigates (e.g., `clickLogout(): Promise<LogoutPage>`, `clickContinue(): Promise<HomePage>`).
- Group related actions into a composite method (e.g., `login(email, password)`, `completeRegistration(userData)`).
- Wrap volatile actions in `try/catch` that `console.log`s the error and rethrows for complex/composite actions; simple form fills may skip the try/catch.
- Avoid assertions inside page objects (existence checks like `isXxxPageExists()` are the only exception).

### Template

```ts
import { Page, Locator, expect } from '@playwright/test';

export class XxxPage {
    private readonly page: Page;

    // Locators
    private readonly txtField: Locator;
    private readonly btnSubmit: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtField = page.locator('#input-field');
        this.btnSubmit = page.locator('input[value="Submit"]');
    }

    /**
     * Fills the field
     * @param value - Value to enter
     */
    async setField(value: string): Promise<void> {
        await this.txtField.fill(value);
    }

    /**
     * Clicks the submit button
     * @returns Promise<NextPage> - Instance of the next page
     */
    async clickSubmit(): Promise<NextPage> {
        await this.btnSubmit.click();
        return new NextPage(this.page);
    }

    /**
     * Verifies the page exists
     * @returns Promise<boolean> - true if the page is displayed
     */
    async isXxxPageExists(): Promise<boolean> {
        try {
            return await this.someLocator.isVisible();
        } catch (error) {
            console.log(`Error checking page: ${error}`);
            return false;
        }
    }
}
```

---

# 10. Custom Fixtures (`fixtures/pageFixtures.ts`)

- Extend `test as base` from `@playwright/test` with a `PageFixtures` type that maps each fixture name to its page class.
- The entry-point fixture (typically `homePage`) navigates to the application URL (`process.env.WEB_APP_URL` or the project's configured app-URL variable); every other fixture just does `await use(new XxxPage(page))`.
- Call `dotenv.config()` at the top and read the app URL from env.
- Keep a `test.afterEach` cleanup that closes `page` and `context` if not already closed.
- Re-export `expect` at the bottom: `export { expect } from '@playwright/test';`

```ts
type PageFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    // ... one entry per page object
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    // ...
});
```

> When a **new page object** is created, it MUST be added here (type + `base.extend` entry) so web tests can consume it via the fixture.

---

# 11. API Testing Architecture

API tests are generated from API scenarios in the supplied test prompt(s) and MUST use this separate architecture:

```text
API Test Prompt
      ↓
Analyze Endpoint / Route
      ↓
Analyze Request
      ↓
Analyze Response
      ↓
Analyze Schema
      ↓
Create / Update Routes
      ↓
Create / Update Schemas
      ↓
Create / Update Test Data
      ↓
Create / Update Utilities
      ↓
Create API Test
      ↓
Execute and Validate
```

---

# 12. API Routes / Endpoints

API tests must use the project's endpoint/route architecture (`api/endpoints/routes.ts`).

Before creating a route:

- Check existing routes.
- Reuse existing routes where possible.
- Do not duplicate endpoints.
- Keep endpoint definitions centralized in the `Routes` object.

The agent must use the exact API URL and endpoint specified by the test prompt or verified from the API. Do not invent endpoints.

New endpoints MUST be added to the `Routes` object with the `{placeholder}` style, e.g.:

```
AUTH_LOGIN: '/auth/login'
GET_ALL_RESOURCES: '/resources'
GET_RESOURCE_BY_ID: '/resources/{id}'
GET_RESOURCES_WITH_LIMIT: '/resources?limit={limit}'
GET_RESOURCES_SORTED: '/resources?sort={order}'
CREATE_RESOURCE / UPDATE_RESOURCE / DELETE_RESOURCE: '/resources' / '/resources/{id}'
// same pattern for every resource of the API under test
```

Replace placeholders before use: `Routes.GET_RESOURCE_BY_ID.replace('{id}', String(id))` or build inline template literals.

---

# 13. API Schemas

API response/request schemas (`api/schemas/`) should be created or updated when schema validation is required.

Before creating a schema:

- Check whether the schema already exists.
- Reuse existing schemas.
- Update an existing schema when appropriate.
- Create a new schema only when necessary.

Schema definitions must reflect the actual API response/request structure. Do not create fields based on assumptions. If the API response changes, update the schema based on the actual response rather than guessing.

- Draft-07 (or project-standard) schemas validated with AJV or an equivalent JSON-schema validator.
- Generate new schemas from actual API responses.
- Store as `xxx_api_schema.json`.
- Load via the project's data-reader utility (e.g. `DataProvider.readJson('./api/schemas/xxx_api_schema.json')`).
- Compile with the validator and log validation errors when validation fails.

---

# 14. Test Data & Utilities (Web + API)

Web and API tests should use the framework's shared test-data architecture:

- For **dynamic data**, use a Faker-backed random-data utility (conventionally `utils/dataGenerator.ts` exporting a class such as `RandomDataUtil`) that wraps Faker's person/location/date/commerce APIs, plus `generate<Resource>Payload()` / `generateUpdated<Resource>Payload()` builders for API create/update payloads.
- For **fixed/known data** (e.g. a known product, known login credentials used across many tests), use a small fixed-data helper (conventionally `utils/helper.ts` exporting a class such as `Helper`).
- For **reading external/static test data** (JSON/CSV/Excel), use a data-reader utility (conventionally `utils/DataReader.ts` exporting a class such as `DataProvider` with `readJson` / `readCsv` / `readExcel` methods).

Before creating or modifying any of these:

- Inspect the existing implementation.
- Reuse existing functionality.
- Avoid duplicate methods.
- Follow the existing naming and coding conventions.
- Use the utility's existing methods internally rather than duplicating logic (e.g. a payload generator should call the utility's own field generators instead of calling Faker directly a second time).

---

# 15. General Utility Conventions

Utilities (`utils/`) must be reusable and separated from tests, Page Objects, and API specs.

Common utility categories include:

- Random/dynamic data generation (Faker-backed)
- Fixed/static test-data fixtures
- File-based test-data readers (JSON / CSV / Excel)
- Database client / query execution
- Request helpers
- Schema validation helpers
- Custom reporting

Rules for any utility file:

- Use only dependencies already present in the project (`package.json`). Do not add new dependencies unless explicitly required and approved.
- Implement exactly the methods, classes, parameters, and return structures specified by the driving prompt — do not add extra methods, validation, logging, or functionality beyond what was requested.
- Do not change existing class names, method names, parameter names, return structures, or behavior when updating a utility, unless the prompt explicitly asks for that change.
- Keep utility code simple, clean, and beginner-friendly.
- Do not create a utility simply for the sake of abstraction — if the framework already contains an appropriate utility or method, reuse or extend it instead of creating a new one.
- Do not create multiple utilities that perform the same operation.

---

# 16. Environment Configuration (Web + API + DB)

All environment-specific configuration and sensitive values must be centralized in `.env` (and, where present, `.env.example`):

```text
# Web
WEB_APP_URL

# API
API_BASE_URL
API_KEY
TOKEN
CLIENT_ID
CLIENT_SECRET

# DB
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME

ADMIN_USERNAME
ADMIN_PASSWORD

```

The exact variable names, defaults, and any additional application-specific variables (resource IDs, limits, date ranges, credentials, table names) are defined by the project's `.env` / `.env.example` and by the supplied test prompt(s) — never invented by the agent.

Rules:

- Check `.env` and `.env.example` first.
- Check `playwright.config.ts` for already-wired configuration.
- Reuse existing environment configuration; never duplicate the same value across multiple files.
- Read config via `process.env.X` with a sensible fallback where appropriate; call `dotenv.config()` at the top of API and DB specs (Web fixtures typically already load it once).
- Never hard-code secrets, credentials, tokens, or environment-specific URLs directly inside test files, route files, schema files, utility files, or any file committed to source control.
- Never expose secrets in logs, console output, or reports.

---

# 17. API Test Conventions (`tests/api/`)

- **Import from `@playwright/test` directly** (API tests do NOT use the custom Web page fixtures): `import { test, expect } from '@playwright/test';`
- Import the project's random-data utility and call `dotenv.config()` at the top of the spec.
- Group tests in `test.describe('<ApiName> API Tests', () => { ... })` (use `test.describe.serial` for sequential CRUD workflows).
- Declare env-driven config constants at the top of the describe block:
  - `const BASE_URL = process.env.API_BASE_URL || '<project default>';`
  - Resource IDs, limits, date ranges, and credentials similarly, sourced from `.env` or the test prompt.
- Use section separator comments around each group (Configuration / GET / POST / PUT / DELETE).
- **Prefer the `Routes` constants** from `api/endpoints/routes.ts`; URLs may also be built inline with template literals when routes are not yet centralized.
- Payloads come from the random-data utility's `generate<Resource>Payload()`, `generateUpdated<Resource>Payload()`, etc.
- Assertions: `expect(response.status()).toBe(...)`, `await response.json()`, `Array.isArray(...)`, `length`, field equality, sorting checks, and per-item validation with `forEach`.
- CRUD tests create a resource, assert the create status code, capture the generated `id`, then update/delete using that id; cleanup delete is done inside the same test.
- Schema tests load schemas with the project's data-reader utility, compile with the validator, and `expect(isValid).toBeTruthy()`.
- Test titles follow the pattern `'GET - All <Resources> @master @sanity @api'`, `'POST - Create <Resource> @master @regression @api'`.

### API Test Creation Checklist

Only after analyzing and preparing the required routes, schemas, test data, utilities, and environment configuration should the AI agent create the API test.

API tests should validate:

- HTTP status code
- Response body
- Response structure
- Required fields
- Data types
- Business validations
- Headers when required
- Error responses when required

### Template

```ts
import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('<Resource> API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';
    const RESOURCE_ID = Number(process.env.RESOURCE_ID ?? 1);

    // ---------------------------------------------------------
    // GET - All <Resources>
    // ---------------------------------------------------------

    test('GET - All <Resources> @master @sanity', async ({ request }) => {

        const response = await request.get(`${BASE_URL}/<resources>`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // POST - Create <Resource>
    // ---------------------------------------------------------

    test('POST - Create <Resource> @master @regression', async ({ request }) => {

        const payload = RandomDataUtil.generate<Resource>Payload();

        const createResponse = await request.post(`${BASE_URL}/<resources>`, { data: payload });

        expect(createResponse.status()).toBe(201);

        const created = await createResponse.json();

        expect(created.id).toBeTruthy();

        // DELETE - Cleanup Created Resource
        const deleteResponse = await request.delete(`${BASE_URL}/<resources>/${created.id}`);
        expect(deleteResponse.status()).toBe(200);
    });
});
```

---

# 18. Database Testing Support

The MCP context supports DB testing using Playwright with TypeScript against `tests/db/`, for any relational (or otherwise queryable) database the project targets.

### Guidelines

ADMIN_USERNAME
ADMIN_PASSWORD

- **Database configuration:** externalized via `.env` (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`,`ADMIN_USERNAME`, `ADMIN_PASSWORD`, and any project-specific equivalents). Never hard-code credentials.
- **`.env` usage:** call `dotenv.config()` at the top of DB specs; read config via `process.env.X` with sensible fallbacks.
- **Database connections:** use the project's existing DB client utility (conventionally `utils/dbClient.ts` exporting an `executeQuery(sql, params)` function) — do not create new connection code per test.
- **Query organization:** keep SQL (or equivalent query-language) statements inside the DB spec, or in a dedicated DB utility if the project already organizes queries that way.
- **Reusable DB utilities:** extend the DB client utility only when genuinely required; reuse the existing query-execution function everywhere.
- **Test data preparation:** use existing test-data files and the random-data utility for dynamic values.
- **DML operations:** place inserts/updates/deletes where the framework already does (e.g., inside the test with a matching validation).
- **Data validation:** validate database state by executing queries and asserting on the returned rows.
- **Cleanup:** remove any rows created by the test (delete after validation) so tests are repeatable, unless the scenario explicitly requires persisted data.
- **Connection management:** let the DB client utility manage the connection lifecycle; do not add parallel/duplicate connection logic.

Do not assume:

- Database type
- Host
- Port
- Database name
- Username
- Password
- Tables
- Columns
- Query syntax

unless they are explicitly provided by the project's configuration or the test prompt, or can be verified.

Database credentials must always be externalized through environment variables.

---

# 19. Web + API + DB Test Separation

The framework layers MUST remain logically separated:

```text
Web Testing
→ Page Objects
→ Custom Page Fixture
→ Web Tests

API Testing
→ Routes
→ Schemas
→ Utilities
→ Test Data
→ API Tests

DB Testing
→ DB Configuration
→ DB Utilities
→ Queries
→ DB Validation
→ DB Tests
```

Do not mix Web, API, and DB implementation unnecessarily.

When an end-to-end scenario requires multiple layers, clearly define the interaction between them (e.g., generate customer data once, use it to drive the UI step, then validate the same data via API and/or DB steps) without breaking the framework architecture — keep each layer's logic in its own `test.step()` and avoid leaking Page Object/browser logic into the DB layer or vice versa.

---

# 20. TypeScript Rules

All generated code must follow the project's TypeScript configuration (`tsconfig.json`).

Agents must:

- Use proper TypeScript types.
- Avoid unnecessary `any`.
- Avoid duplicate interfaces/types.
- Reuse existing types.
- Follow existing naming conventions.
- Keep code readable and beginner-friendly.
- Avoid unnecessary complexity.

Do not change `tsconfig.json` unless the requested implementation genuinely requires it.

---

# 21. Playwright Rules

The MCP context enforces good Playwright practices.

Prefer:

```text
Playwright built-in locators
Auto-waiting
Web-first assertions
Fixtures
Page Objects
APIRequestContext
Playwright configuration
Trace
Screenshots
Videos
```

Avoid:

```text
Unnecessary XPath
Unnecessary CSS selectors
Hard-coded waits
Duplicate browser/page creation
Direct low-level browser management when Playwright fixtures already provide it
Duplicated authentication logic
Duplicated utility functions
```

Use the existing framework configuration (`playwright.config.ts`) instead of creating independent Playwright configurations.

---

# 22. File Creation Rules

Before creating any file, AI agents must determine:

1. Does the file already exist?
2. Does equivalent functionality already exist?
3. Is a new file actually required?
4. What folder should contain it?
5. What naming convention does the project use?
6. Which existing files depend on it?
7. Will creating it introduce duplication or conflicts?

Only create a new file when required.

---

# 23. File Modification Rules

When modifying an existing file:

- Preserve existing working functionality.
- Make the smallest necessary change.
- Do not rewrite unrelated code.
- Do not change naming conventions unnecessarily.
- Do not introduce unrelated refactoring.
- Do not remove existing functionality unless explicitly required.
- Check dependent files after making changes.

---

# 24. Test Organization, Tagging & Execution

- Tags live **inside test titles** (e.g. `test('... @master @sanity', ...)`). `playwright.config.ts` may set a default `grep` pattern (e.g. `/@master/`).

| Tag | Typical scope |
| --- | --- |
| `@master` | Default/core suite |
| `@sanity` | Critical smoke coverage |
| `@regression` | Full regression coverage |
| `@datadriven` | Data-driven tests |
| `@end-to-end` | Full user journeys spanning multiple steps or layers |
| `@db` | Database-backed tests |

- A test tagged `@sanity` or `@regression` should almost always also carry `@master`.
- Exact tag set and NPM scripts are project-specific — reuse whatever the project's `playwright.config.ts` / `package.json` already define; only introduce a new tag when the test prompt explicitly needs a category not already covered.

---

# 25. Dependency Order

The dependency order is mandatory. If one component depends on another, the dependency must be created or updated first.

**For Web:**

```text
Application Analysis
        ↓
Page Objects
        ↓
Custom Page Fixture
        ↓
Test Data / Utilities
        ↓
Web Tests
```

**For API:**

```text
Endpoint Analysis
        ↓
Routes
        ↓
Schemas
        ↓
Test Data / Utilities
        ↓
API Tests
```

**For DB:**

```text
Database Analysis
        ↓
Configuration
        ↓
DB Utilities / Queries
        ↓
Test Data
        ↓
DB Tests
```

---

# 26. Vibe-Coding Workflow

This file is optimized for AI-assisted / vibe coding. For every prompt received from the user, AI agents should internally follow this workflow:

```text
1. Read the user's test prompt.
2. Identify whether it is Web, API, DB, or combined testing.
3. Inspect the actual project structure and reconcile it with this file's conventions.
4. Identify reusable framework components (pages, fixtures, routes, schemas, utils, testdata, config already present or generated earlier in this session).
5. Analyze the application/API/database.
6. Determine exactly which files must be created or modified.
7. Create/update foundational components first.
8. Create/update dependent components next.
9. Create the final test only after its dependencies are ready.
10. Run the test.
11. Analyze actual failures.
12. Fix only the required issue.
13. Re-run the test.
14. Confirm the final implementation.
```

The agent must not jump directly from a test scenario to creating a test file when framework components are required.

---

# 27. Validation Before Completion

Before considering a task complete, the AI agent must verify:

- Required files exist.
- No duplicate files were unnecessarily created.
- Imports are correct.
- Types are correct.
- Fixtures are correctly wired.
- Page Objects are correctly connected to fixtures.
- Routes are correct.
- Schemas match actual API responses.
- Test data is valid.
- `.env` configuration is correctly referenced.
- Tests compile (`npx tsc --noEmit` when the project uses strict mode).
- Tests execute successfully where the environment is available (`npx playwright test <spec> --grep @master` or the project's equivalent script).
- No unnecessary configuration changes were introduced.
- No secrets were hard-coded.
- No unrelated files were modified.
- No `.only`, no skipped tests, no leftover debug code.

---

# 28. Quick Reference — Where to Look / What to Generate

| Want to generate | Driven by | Conventions |
| --- | --- | --- |
| Simple web flow test | Web test prompt | §8 Web Test Conventions + template |
| Web test using random data | Web test prompt | §8 + random-data utility (§14) |
| Multi-step end-to-end web journey | Web test prompt | §8 (steps + `@end-to-end` tag) |
| Data-driven web test | Web test prompt | §8 + data-reader utility + `@datadriven` |
| New page object | Web test prompt | §9 Page Object Class Conventions + template |
| Page fixture wiring | Web scenarios that use page objects | §10 Custom Fixtures (type + `base.extend`) |
| Simple API resource suite | API test prompt | §17 API Test Conventions + template |
| Auth API tests | API test prompt | §12 Routes + §17 |
| JSON-schema validation | API test prompt | §13 Schemas + §17 schema-test pattern |
| DB-backed test | DB test prompt | §18 DB Testing Support |
| Combined Web+API+DB journey | Combined test prompt | §19 Test Separation + §25 Dependency Order |

---



# 29: Iterative Fixing (Mandatory)

When a test fails, execute the following mandatory loop until Zero Failures are achieved:

* **Diagnose:** Perform a root-cause analysis of the error stack.

* **Replicate**: Re-run the test to confirm the failure context.

* **Remediate:** Target and correct the specific failure points:
  * Page Object locators
  * Page Object methods
  * Explicit wait conditions & timeouts
  * Assertion logic
  * Upstream/downstream dependencies

* **Regenerate:** Update and recompile the affected code.

* **Re-validate:** Execute the test again.

* **Repeat:** steps 1–5 until the test passes unequivocally.

# Strict DO-NOT Rules

* No skipping MCP/CLI execution.
* No hallucinated or imagination-based code generation.
* No reliance on unstable/flaky selectors.
* No hardcoded or arbitrary sleep timers.
* No intermingling of test logic within Page Object classes.
* No delivery of incomplete or partial implementations.

---

# 30 Definition Of Done (Success Criteria)

A test is complete only if:

* **MCP Validation**: Every interaction has been verified through live MCP/CLI execution.

* **Selector Integrity**: Every CSS/XPath selector has been empirically confirmed in the actual DOM.

* **Architectural Purity**: Page Objects are correctly structured, isolated, and maintainable.

* **Execution Verdict**: The test suite runs from start to finish with a 100% pass rate.

* **Anti-Flakiness**: The test exhibits deterministic behavior with zero fragility across multiple runs.

---

# Final Requirement

This file is a **practical instruction manual for AI coding agents**, not a high-level conceptual document. It is detailed, explicit, deterministic, structured, beginner-friendly, AI-agent-friendly, reusable, maintainable, and scalable — and it is **independent of any single project**.

It supports the full framework:

```text
Playwright + TypeScript

├── Web Testing
│   ├── Page Objects
│   ├── Custom Page Fixtures
│   ├── Test Data
│   ├── Utilities
│   ├── .env
│   └── Web Tests
│
├── API Testing
│   ├── Routes / Endpoints
│   ├── Schemas
│   ├── Test Data
│   ├── Random-Data Utility
│   ├── Data-Reader Utility
│   ├── Utilities
│   ├── .env
│   └── API Tests
│
└── DB Testing
    ├── Configuration
    ├── DB Client Utility
    ├── Test Data
    ├── .env
    └── DB Tests
```

Use this file as the **single source of truth for AI-assisted Playwright TypeScript test generation**, reusable across any Web, API, DB, or combined automation project. Supply it together with a project-specific test prompt file to drive actual test generation.

Do not add unrelated technologies, frameworks, libraries, files, or architectural patterns unless they are already present in the project or explicitly required.

Do not hallucinate missing implementation details. When information is unavailable, clearly identify what needs to be provided or verified rather than guessing.
