import { Page, Locator } from '@playwright/test';
import { PageKeywords, WebKeywords } from "@ramam-v/common-pw";

export class HomePage {
    private page: Page;
    private webKeywords: WebKeywords;
    private pageKeywords: PageKeywords;


    // Page-specific locators
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webKeywords = new WebKeywords();
        this.pageKeywords = new PageKeywords();


        // Initialize locators
        this.registerLink = page.locator('a.ico-register');
        this.loginLink = page.locator('a.ico-login');
        this.shoppingCartLink = page.locator('a.ico-cart');
        this.welcomeMessage = page.locator('.header-links .account');
    }

    /**
     * Navigate to registration page
     */
    async goToRegistration(): Promise<void> {
        await this.webKeywords.click(this.registerLink, 'Register Link');
    }

    /**
     * Navigate to login page
     */
    async goToLogin(): Promise<void> {
        await this.webKeywords.click(this.loginLink, 'Login Link');
    }

    /**
     * Navigate to shopping cart
     */
    async goToShoppingCart(): Promise<void> {
        await this.webKeywords.click(this.shoppingCartLink, 'Shopping Cart Link');
    }

    /**
     * Check if user is logged in
     * @returns Boolean indicating login status
     */
    async isLoggedIn(): Promise<boolean> {
        try {
            const accountLink = await this.welcomeMessage.textContent();
            return !!accountLink && accountLink.trim().length > 0;
        } catch {
            return false;
        }
    }

    /**
     * Get welcome message/account email
     * @returns Account email or empty string
     */
    async getAccountEmail(): Promise<string> {
        return await this.welcomeMessage.textContent() || '';
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