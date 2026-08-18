@echo off
echo ==========================================
echo  Environment Setup - Playwright + opencart
echo ==========================================

echo [1/7] Installing test data, env vars, date/time handling...
call npm install dotenv @faker-js/faker luxon
if errorlevel 1 goto :error

echo [2/7] Installing API / data validation...
call npm install ajv csv-parse xlsx
if errorlevel 1 goto :error

echo [3/7] Installing accessibility testing (WCAG)...
call npm install @axe-core/playwright
if errorlevel 1 goto :error

echo [4/7] Installing Allure reporting...
call npm install allure-playwright
if errorlevel 1 goto :error

echo [5/7] Installing Node.js TypeScript type definitions...
call npm install -D @types/node
if errorlevel 1 goto :error

echo [6/7] Installing Playwright browser binaries...
call npx playwright install
if errorlevel 1 goto :error

echo [7/7] Installing MySQL DB validation / DML...
call npm install mysql2
if errorlevel 1 goto :error

echo.
echo ==========================================
echo  Environment setup completed successfully!
echo ==========================================
pause
exit /b 0

:error
echo.
echo ERROR: Setup failed. See output above.
pause
exit /b 1
