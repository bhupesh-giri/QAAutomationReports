const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  console.log('BODY TEXT START');
  console.log(await page.locator('body').textContent());
  console.log('BODY TEXT END');
  await browser.close();
})();
