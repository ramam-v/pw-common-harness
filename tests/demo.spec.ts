import { test, expect } from '@playwright/test';
import { PageKeywords, WebKeywords, CommonUtils } from '@ramam-v/common-pw';

test.describe('Common Library Demo Tests', () => {
    let pageKeywords: PageKeywords;
    let webKeywords: WebKeywords;
    let commonUtils: CommonUtils;

    test.beforeEach(({ page }) => {
        pageKeywords = new PageKeywords();
        webKeywords = new WebKeywords();
        commonUtils = new CommonUtils();
    });

    test('validate common library basic functionality', async ({ page }) => {
        // 1. Test Navigation and Screenshots
        await pageKeywords.navigateToUrl(page, 'https://playwright.dev/');
        await pageKeywords.capturePageScreenshot(page, 'playwright-landing');
        await expect(page).toHaveTitle(/Playwright/);

        // 2. Test Click Operations
        const getStartedLink = page.getByRole('link', { name: 'Get started' });
        await webKeywords.click(getStartedLink, 'Get Started Link');

        const installationHeading = page.getByRole('heading', { name: 'Installation' });
        await webKeywords.captureElementScreenshot(
            installationHeading,
            'installation-heading',
            'Installation Heading'
        );
        await expect(installationHeading).toBeVisible();
    });

    test('verify data value patterns', async ({ page }) => {
        // Navigate to test form
        await pageKeywords.navigateToUrl(page, 'https://demoqa.com/automation-practice-form');

        // 1. Test Date Patterns
        const datePatterns = {
            today: commonUtils.dataValueHandler('<TODAY>'),
            futureDatePlus2: commonUtils.dataValueHandler('<TODAY+2>'),
            pastDateMinus2: commonUtils.dataValueHandler('<TODAY-2>')
        };

        // Verify date formats
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        Object.values(datePatterns).forEach(date => {
            expect(date).toMatch(dateRegex);
        });

        // 2. Test ID Patterns
        const idPatterns = {
            uniqueId12: commonUtils.dataValueHandler('<UNIQUEID>'),
            uniqueId7: commonUtils.dataValueHandler('<UNIQUEID7>')
        };

        expect(idPatterns.uniqueId12.length).toBe(12);
        expect(idPatterns.uniqueId7.length).toBe(7);

        // 3. Test Name Patterns
        const namePatterns = {
            firstName: commonUtils.dataValueHandler('<FIRSTNAME>'),
            lastName: commonUtils.dataValueHandler('<LASTNAME>')
        };

        Object.values(namePatterns).forEach(name => {
            expect(name.length).toBeGreaterThan(0);
            expect(typeof name).toBe('string');
        });

        // 4. Test DOB Patterns
        const dobPatterns = {
            dob: commonUtils.dataValueHandler('<DOB>'),
            dobMinus20: commonUtils.dataValueHandler('<DOB -20Y>')
        };

        Object.values(dobPatterns).forEach(dob => {
            expect(dob).toMatch(dateRegex);
        });
    });

    test('verify form interactions', async ({ page }) => {
        // Navigate to test form
        await pageKeywords.navigateToUrl(page, 'https://demoqa.com/automation-practice-form');

        // 1. Test Text Input
        const firstNameInput = page.getByPlaceholder('First Name');
        const lastName = commonUtils.dataValueHandler('<LASTNAME>');
        await webKeywords.enterText(firstNameInput, lastName, 'Last Name Input');
        await expect(firstNameInput).toHaveValue(lastName);

        // 2. Test Optional Text Input
        const lastNameInput = page.getByPlaceholder('Last Name');
        await webKeywords.optionallyEnterText(lastNameInput, lastName, 'Optional Last Name');
        await expect(lastNameInput).toHaveValue(lastName);

        // 3. Test Checkbox
        const sportsCheckbox = page.locator('input[type="checkbox"]').first();
        await webKeywords.setCheckbox(sportsCheckbox, true, 'Sports Checkbox');
        await expect(sportsCheckbox).toBeChecked();

        // 4. Test Optional Checkbox
        await webKeywords.optionallySetCheckbox(sportsCheckbox, false, 'Sports Checkbox');
        await expect(sportsCheckbox).not.toBeChecked();
    });

    test('verify advanced interactions', async ({ page }) => {
        // Navigate to test page
        await pageKeywords.navigateToUrl(page, 'https://demoqa.com/automation-practice-form');

        // 1. Test Double Click
        const header = page.locator('h1').first();
        await webKeywords.doubleClick(header, 'Page Header');

        // 2. Test Right Click
        await webKeywords.rightClick(header, 'Page Header');

        // 3. Test Click and Hold
        await webKeywords.clickAndHold(header, 'Page Header', 1000);

        // 4. Take Various Screenshots
        // Full page screenshot
        await pageKeywords.capturePageScreenshot(page, 'full-page', true);

        // Viewport screenshot
        await pageKeywords.captureViewportScreenshot(page, 'viewport-area', {
            x: 0,
            y: 0,
            width: 800,
            height: 600
        });

        // Element screenshot
        await webKeywords.captureElementScreenshot(header, 'header-element', 'Page Header');
    });

    test('verify date selection', async ({ page }) => {
        // Navigate to test page
        await pageKeywords.navigateToUrl(page, 'https://demoqa.com/automation-practice-form');

        // 1. Test Date Selection
        const dateInput = page.locator('#dateOfBirthInput');

        // Select today's date
        await pageKeywords.selectDate(page, '#dateOfBirthInput', '<TODAY>', 'Today\'s Date');

        // Select future date
        await pageKeywords.selectDate(page, '#dateOfBirthInput', '<TODAY+5>', 'Future Date');

        // Optional date selection
        await pageKeywords.optionallySelectDate(page, '#dateOfBirthInput', '<TODAY-5>', 'Past Date');
    });
});