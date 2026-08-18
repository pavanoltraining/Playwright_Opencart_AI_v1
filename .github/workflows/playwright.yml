#To run manually: go to your repo → Actions → Playwright Tests → Run workflow → choose your parameters → Run.

name: 🎭 Playwright Tests

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
  workflow_dispatch:
    inputs:
      test_suite:
        description: "Select test suite"
        type: choice
        options:
          - test:master
          - test:sanity
          - test:regression
          - test:e2e
          - test:api
          - test:web
          - test:datadriven
        default: "test:e2e"
      browser:
        description: "Select browser"
        type: choice
        options:
          - chromium
          - firefox
          - webkit
        default: "chromium"
      mode:
        description: "Run mode"
        type: choice
        options:
          - headless
          - headed
        default: "headless"

jobs:
  test:
    timeout-minutes: 60
    runs-on: windows-latest

    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4

      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: lts/*

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 🎭 Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: ⚙️ Create .env File
        run: Copy-Item .env.example .env

      - name: 🧪 Run Playwright Tests
        run: |
          $suite = "${{ github.event.inputs.test_suite || 'test:e2e' }}"
          $browser = "${{ github.event.inputs.browser || 'chromium' }}"
          $mode = "${{ github.event.inputs.mode || 'headless' }}"
          $tag = $suite -replace 'test:', ''
          $browserFlag = "--project=$browser"
          $modeFlag = if ($mode -eq 'headed') { '--headed' } else { '' }
          npx playwright test --grep "@$tag" $browserFlag $modeFlag --output=test-results
        env:
          CI: "1"

      - name: 📊 Upload Playwright HTML Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: reports/
          retention-days: 30

      - name: 📋 Upload Custom Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: custom-report
          path: custom-report/
          retention-days: 30

      - name: 📈 Upload Allure Results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results/
          retention-days: 30
