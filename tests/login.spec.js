const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const { defaultPassword } = require('../utils/credentials');

test.describe('SauceDemo login automation', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    console.log('Launching browser and opening the SauceDemo login page...');
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `./screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Failure screenshot saved to ${screenshotPath}`);
    }
  });

  test('login for all displayed users', async ({ page }) => {
    let usernames = [];

    try {
      usernames = await loginPage.getDisplayedUsernames();
      console.log('Displayed usernames:', usernames);
    } catch (error) {
      console.error('Unable to read usernames from the UI:', error);
      throw error;
    }

    if (!usernames.length) {
      throw new Error('No usernames were found on the login page.');
    }

    for (const username of usernames) {
      console.log(`\n=== Testing user: ${username} ===`);

      await page.goto('https://www.saucedemo.com/');
      await loginPage.goto();

      try {
        await loginPage.login(username, defaultPassword);

        const currentUrl = page.url();
        if (currentUrl.includes('/inventory.html')) {
          console.log(`Login succeeded for ${username}`);
          await homePage.verifyInventoryPage();
          await homePage.clickMenu();
          await homePage.logout();
          await homePage.verifyLogout();
        } else {
          console.log(`Login failed for ${username} as expected.`);
          const errorText = await loginPage.getErrorMessage();
          console.log(`Error message: ${errorText}`);
          await expect(errorText).toContain('Epic sadface');
        }
      } catch (error) {
        console.error(`Error during login flow for ${username}:`, error);
        throw error;
      }
    }
  });
});
