# Setting UP

### Run tests

1. Run the command `npm install`
2. Run the command `npx playwright test` to run tests in a headless mode or `npx playwright test --ui` to run tests in UI mode

### Generate Allure Report

1. Run the following command to generate the Allure report `allure generate allure-results --clean -o allure-report`
2. After generating the report, open it using the following command `allure open allure-report`

### Notes

Tests are configured to run in the Chrome browser by default. You have the option to choose other browsers or every browser by modifying playwright.config.ts.
