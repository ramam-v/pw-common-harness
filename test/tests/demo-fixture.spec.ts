import { test, expect } from '../fixtures/basePage';

test.describe('Demo Web Shop Registration Tests - With Fixtures', () => {
    test('verify registration form interactions', async ({ page, reg, cmn }) => {
        // Generate test user data
        const testUser = {
            firstName: cmn.dataValueHandler('<FIRSTNAME>'),
            lastName: cmn.dataValueHandler('<LASTNAME>'),
            email: `${cmn.dataValueHandler('<FIRSTNAME>').toLowerCase()}@example.com`,
            password: `Test${cmn.dataValueHandler('<UNIQUEID6>')}!`
        };

        // Fill the registration form with generated data
        const registeredUser = await reg.fillRegistrationForm(testUser);

        // Verify the data
        expect(registeredUser.firstName).toBeTruthy();
        expect(registeredUser.lastName).toBeTruthy();
        expect(registeredUser.email).toContain('@example.com');

        // Take screenshots
        await reg.capturePageScreenshot('registration-form-filled', false);
    });

    test('verify advanced page interactions', async ({ page, reg }) => {
        // Perform various interactions
        await reg.doubleClickRegister();
        await reg.rightClickPageTitle();

        // Verify page title
        const pageTitle = await reg.getPageTitle();
        expect(pageTitle).toBe('Register');

        // Take screenshots
        await reg.capturePageScreenshot('registration-page', true);
        await reg.captureViewportScreenshot('register-viewport', {
            x: 0,
            y: 0,
            width: 800,
            height: 600
        });
    });

    test('verify data value patterns', async ({ cmn }) => {
        // Test various data value handler patterns
        const dataPatterns = {
            // Date Patterns
            today: cmn.dataValueHandler('<TODAY>'),
            futureDatePlus2: cmn.dataValueHandler('<TODAY+2>'),
            pastDateMinus2: cmn.dataValueHandler('<TODAY-2>'),

            // Non-tagged values
            plainDate: cmn.dataValueHandler('04/03/2003'),
            plainText: cmn.dataValueHandler('Hello World'),
            emptyValue: cmn.dataValueHandler(''),
            nullValue: cmn.dataValueHandler(null as any),

            // Unique ID Patterns
            uniqueId12: cmn.dataValueHandler('<UNIQUEID>'),
            uniqueId7: cmn.dataValueHandler('<UNIQUEID7>'),

            // Name Patterns
            firstName: cmn.dataValueHandler('<FIRSTNAME>'),
            lastName: cmn.dataValueHandler('<LASTNAME>'),

            // DOB Patterns
            dob: cmn.dataValueHandler('<DOB>'),
            dobMinus20: cmn.dataValueHandler('<DOB-20Y>')
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
        expect(dataPatterns.uniqueId12.length).toBe(12);
        expect(dataPatterns.uniqueId7.length).toBe(7);

        // Verify name and other patterns
        Object.entries(dataPatterns).forEach(([key, value]) => {
            if (key.includes('Name')) {
                expect(value.length).toBeGreaterThan(0);
                expect(typeof value).toBe('string');
            }
        });
    });

    test('navigation between pages', async ({ home, reg }) => {
        // Navigate from home to registration
        await home.goToRegistration();

        // Verify registration page title
        const pageTitle = await reg.getPageTitle();
        expect(pageTitle).toBe('Register');
    });
});