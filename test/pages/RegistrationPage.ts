import { Page, Locator } from '@playwright/test';
import { PageKeywords, WebKeywords, CommonUtils } from "@ramam-v/common-pw";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

export class RegistrationPage {
    private page: Page;
    private webKeywords: WebKeywords;
    private pageKeywords: PageKeywords;
    private commonUtils: CommonUtils;

    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly maleGenderRadio: Locator;
    private readonly femaleGenderRadio: Locator;
    private readonly registerButton: Locator;
    private readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webKeywords = new WebKeywords();
        this.pageKeywords = new PageKeywords();
        this.commonUtils = new CommonUtils();

        // Initialize locators
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');
        this.maleGenderRadio = page.locator('#gender-male');
        this.femaleGenderRadio = page.locator('#gender-female');
        this.registerButton = page.locator('#register-button');
        this.pageTitle = page.locator('.page-title h1');
    }

    /**
     * Fill registration form with provided user data
     * @param userData - User registration data
     * @returns Used registration data
     */
    async fillRegistrationForm(userData: UserData): Promise<UserData> {
        // Enter personal information
        await this.webKeywords.enterText(this.firstNameInput, userData.firstName, 'First Name Input');
        await this.webKeywords.enterText(this.lastNameInput, userData.lastName, 'Last Name Input');
        await this.webKeywords.enterText(this.emailInput, userData.email, 'Email Input');

        // Set gender (random)
        await this.webKeywords.optionallySetCheckbox(
            Math.random() > 0.5 ? this.maleGenderRadio : this.femaleGenderRadio,
            true,
            'Gender Selection'
        );

        // Set password
        const password = userData.password ||
            `Test${this.commonUtils.dataValueHandler('<UNIQUEID6>')}!`;

        await this.webKeywords.enterText(this.passwordInput, password, 'Password Input');
        await this.webKeywords.enterText(this.confirmPasswordInput, password, 'Confirm Password Input');

        return { ...userData, password };
    }

    /**
     * Click register button
     */
    async clickRegister(): Promise<void> {
        await this.webKeywords.click(this.registerButton, 'Register Button');
    }

    /**
     * Perform double click on register button (for testing)
     */
    async doubleClickRegister(): Promise<void> {
        await this.webKeywords.doubleClick(this.registerButton, 'Register Button');
    }

    /**
     * Perform right click on page title (for testing)
     */
    async rightClickPageTitle(): Promise<void> {
        await this.webKeywords.rightClick(this.pageTitle, 'Page Title');
    }

    /**
     * Get page title text
     * @returns Page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    /**
     * Navigate to a specific URL
     * @param url - URL to navigate to
     */
    async navigateTo(url: string): Promise<void> {
        await this.pageKeywords.navigateToUrl(this.page, url);
    }

    /**
     * Capture full page screenshot
     * @param name - Screenshot name
     * @param fullPage - Whether to capture full page
     */
    async capturePageScreenshot(name: string, fullPage: boolean = false): Promise<void> {
        await this.pageKeywords.capturePageScreenshot(this.page, name, fullPage);
    }

    /**
     * Capture viewport screenshot
     * @param name - Screenshot name
     * @param clip - Viewport area to capture
     */
    async captureViewportScreenshot(
        name: string,
        clip: { x: number; y: number; width: number; height: number }
    ): Promise<void> {
        await this.pageKeywords.captureViewportScreenshot(this.page, name, clip);
    }
}