import { test, expect } from "@playwright/test";
import { PageKeywords, WebKeywords, CommonUtils } from "@ramam-v/common-pw";


// Initialize keywords
const pageKeywords = new PageKeywords();
const webKeywords = new WebKeywords();
const commonUtils = new CommonUtils();

test.describe('Demo Web Shop Registration Tests', () => {
    test('verify form interactions and data patterns', async ({ page }) => {
        // Use in test reporting
        await commonUtils.reportTestStart();
        // Navigate to registration page
        await pageKeywords.navigateToUrl(page, 'https://demowebshop.tricentis.com/register');

        // 1. Test Name Patterns
        const firstName = commonUtils.dataValueHandler('<FIRSTNAME>');
        const lastName = commonUtils.dataValueHandler('<LASTNAME>');

        // Find first name and last name input fields
        const firstNameInput = page.locator('#FirstName');
        const lastNameInput = page.locator('#LastName');

        // Enter names using WebKeywords
        await webKeywords.enterText(firstNameInput, firstName, 'First Name Input');
        await webKeywords.enterText(lastNameInput, lastName, 'Last Name Input');

        // 2. Test Optional Text Input
        const emailInput = page.locator('#Email');
        const emailAddress = commonUtils.dataValueHandler('<FIRSTNAME>').toLowerCase() + '@example.com';
        await webKeywords.optionallyEnterText(emailInput, emailAddress, 'Email Input');

        // 3. Test Checkbox (Gender Selection)
        const maleGenderRadio = page.locator('#gender-male');
        const femaleGenderRadio = page.locator('#gender-female');

        // Optionally set gender (randomize)
        await webKeywords.optionallySetCheckbox(
            Math.random() > 0.5 ? maleGenderRadio : femaleGenderRadio,
            true,
            'Gender Selection'
        );

        // 4. Test Password Input
        const passwordInput = page.locator('#Password');
        const confirmPasswordInput = page.locator('#ConfirmPassword');
        const password = 'Test' + commonUtils.dataValueHandler('<UNIQUEID6>') + '!';

        await webKeywords.enterText(passwordInput, password, 'Password Input');
        await webKeywords.enterText(confirmPasswordInput, password, 'Confirm Password Input');

        // 5. Screenshot Verification
        // Take screenshots at various stages
        await pageKeywords.capturePageScreenshot(page, 'registration-form-filled', false);
        await webKeywords.captureElementScreenshot(firstNameInput, 'first-name-input', 'First Name Input Field');
        await commonUtils.reportTestEnd()
    });

    test('verify advanced interactions', async ({ page }) => {
        // Use in test reporting
        await commonUtils.reportTestStart();
        // Navigate to registration page
        await pageKeywords.navigateToUrl(page, 'https://demowebshop.tricentis.com/register');

        // 1. Test Click Interactions
        const registerButton = page.locator('#register-button');

        // Double click (just for demonstration)
        await webKeywords.doubleClick(registerButton, 'Register Button');

        // 2. Test Right Click
        const registerPageHeader = page.locator('.page-title h1');
        await webKeywords.rightClick(registerPageHeader, 'Page Title');

        // 3. Test Click and Hold
        await webKeywords.clickAndHold(registerButton, 'Register Button', 1000);

        // 4. Take Various Screenshots
        // Full page screenshot
        await pageKeywords.capturePageScreenshot(page, 'registration-page', true);

        // Viewport screenshot
        await pageKeywords.captureViewportScreenshot(page, 'register-viewport', {
            x: 0,
            y: 0,
            width: 800,
            height: 600
        });
        await commonUtils.reportTestEnd()
    });

    test('verify data value patterns', async () => {
        // Use in test reporting
        await commonUtils.reportTestStart();
        // Test various data value handler patterns
        const dataPatterns = {
            // Date Patterns
            today: commonUtils.dataValueHandler('<TODAY>'),
            futureDatePlus2: commonUtils.dataValueHandler('<TODAY+2>'),
            pastDateMinus2: commonUtils.dataValueHandler('<TODAY-2>'),

            // Non-tagged values
            plainDate: commonUtils.dataValueHandler('04/03/2003'),
            plainText: commonUtils.dataValueHandler('Hello World'),
            emptyValue: commonUtils.dataValueHandler(''),
            nullValue: commonUtils.dataValueHandler(null as any),

            // Unique ID Patterns
            uniqueId12: commonUtils.dataValueHandler('<UNIQUEID>'),
            uniqueId7: commonUtils.dataValueHandler('<UNIQUEID7>'),

            // Name Patterns
            firstName: commonUtils.dataValueHandler('<FIRSTNAME>'),
            lastName: commonUtils.dataValueHandler('<LASTNAME>'),

            // DOB Patterns
            dob: commonUtils.dataValueHandler('<DOB>'),
            dobMinus20: commonUtils.dataValueHandler('<DOB-20Y>')
        };

        // Verify date formats for tagged values
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        expect(dataPatterns.today).toMatch(dateRegex);
        expect(dataPatterns.futureDatePlus2).toMatch(dateRegex);
        expect(dataPatterns.pastDateMinus2).toMatch(dateRegex);

        // Verify non-tagged values remain unchanged
        expect(dataPatterns.plainDate).toBe('04/03/2003');
        expect(dataPatterns.plainText).toBe('Hello World');
        expect(dataPatterns.emptyValue).toBe('');
        expect(dataPatterns.nullValue).toBeNull();

        // Verify unique ID lengths
        test.expect(dataPatterns.uniqueId12.length).toBe(12);
        test.expect(dataPatterns.uniqueId7.length).toBe(7);

        // Verify name and other patterns
        Object.entries(dataPatterns).forEach(([key, value]) => {
            if (key.includes('Name')) {
                test.expect(value.length).toBeGreaterThan(0);
                test.expect(typeof value).toBe('string');
            }
        });
        await commonUtils.reportTestEnd()
    });
});