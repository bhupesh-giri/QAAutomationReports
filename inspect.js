const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const selectors = ['.login_credentials', '.login_password', '.login_logo', '.login-box'];
  for (const selector of selectors) {
    try {
      const element = page.locator(selector);
      console.log(`--- ${selector} ---`);
      console.log(await element.textContent());
      console.log(await element.innerHTML());
    } catch (error) {
      console.log(`Error for ${selector}:`, error.message);
    }
  }

  const bodyText = await page.locator('body').textContent();
  console.log('--- BODY TEXT ---');
  console.log(bodyText);

  await browser.close();
})();
