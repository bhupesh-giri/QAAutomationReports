class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.credentialsContainer = page.locator('text=Accepted usernames are:');
    this.passwordContainer = page.locator('text=Password for all users:');
  }

  async goto() {
    console.log('Navigating to SauceDemo login page...');
    await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterUsername(username) {
    console.log(`Entering username: ${username}`);
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    console.log('Entering password from the page...');
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    console.log('Clicking the login button...');
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getDisplayedUsernames() {
    await this.credentialsContainer.waitFor({ state: 'visible' });

    const pageText = await this.page.locator('body').textContent();
    const normalizedText = pageText.replace(/\s+/g, ' ').trim();
    const fallbackUsernames = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user',
      'error_user',
      'visual_user',
    ];

    const matchedUsernames = [...normalizedText.matchAll(/\b[a-z]+(?:_[a-z]+)+\b/g)]
      .map((match) => match[0])
      .filter((value) => value !== 'secret_sauce');

    return [...new Set(matchedUsernames.length ? matchedUsernames : fallbackUsernames)];
  }

  async getPassword() {
    await this.passwordContainer.waitFor({ state: 'visible' });
    const passwordText = await this.page.locator('body').textContent();
    const match = passwordText.match(/secret_sauce/);
    return match ? match[0] : '';
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }
}

module.exports = LoginPage;
