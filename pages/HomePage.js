const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.inventoryTitle = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async verifyInventoryPage() {
    console.log('Validating inventory page...');
    await expect(this.inventoryList).toBeVisible();
    await expect(this.inventoryTitle).toContainText('Products');
  }

  async clickMenu() {
    console.log('Opening the menu...');
    await this.menuButton.waitFor({ state: 'visible' });
    await this.menuButton.click();
  }

  async logout() {
    console.log('Logging out...');
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }

  async verifyLogout() {
    console.log('Verifying logout redirected to login page...');
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = HomePage;
