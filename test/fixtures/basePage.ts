import { test as base } from '@playwright/test';
import { PageKeywords, WebKeywords, CommonUtils } from "@ramam-v/common-pw";

// Page Objects
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';

// Extended test fixture
export const test = base.extend<{
    cmn: CommonUtils;
    web: WebKeywords;
    pkey: PageKeywords;
    reg: RegistrationPage;
    home: HomePage;
}>({
    // Utilities
    cmn: async ({ }, use) => {
        await use(new CommonUtils());
    },
    web: async ({ }, use) => {
        await use(new WebKeywords());
    },
    pkey: async ({ }, use) => {
        await use(new PageKeywords());
    },

    // Page Objects
    reg: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.navigateTo('https://demowebshop.tricentis.com/register');
        await use(registrationPage);
    },

    home: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateTo('https://demowebshop.tricentis.com/');
        await use(homePage);
    }
});

// Export expect for custom assertions if needed
export const { expect } = test;