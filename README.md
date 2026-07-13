<<<<<<< HEAD
# SauceDemo Playwright Framework

This project contains a Playwright automation framework for SauceDemo using the Page Object Model (POM).

## Project Structure

- pages/LoginPage.js: Contains reusable login page interactions.
- pages/HomePage.js: Contains inventory and logout interactions.
- tests/login.spec.js: Main end-to-end login test covering all visible usernames.
- utils/credentials.js: Stores shared test credentials.
- playwright.config.js: Playwright configuration with HTML report, screenshots, traces, and video.

## Installation

```bash
npm install
```

## Install Playwright browsers

```bash
npx playwright install
```

## Run tests

```bash
npx playwright test
```

## Run headed mode

```bash
npx playwright test --headed
```

## Open HTML report

```bash
npx playwright show-report playwright-report
```

## Notes

- Usernames are read from the UI instead of being hardcoded.
- The test continues even when a user is locked out.
- Screenshots are captured on failures.
=======

>>>>>>> cdb6589dbd862a8ce05cb7f23fc41e864ddb385b
