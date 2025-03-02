import { By, until, WebDriver } from "selenium-webdriver";

async function refreshPageUntilElementFound(
  driver: WebDriver,
  locator: By,
  retries = 3
) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await driver.wait(until.elementLocated(locator), 1000); // 1 seconds
    } catch (error) {
      if (attempt < retries - 1) {
        console.log(
          `Element not found, refreshing page... Attempt ${attempt + 1}`
        );
        await driver.navigate().refresh();
        await isWebsiteLoaded(driver); // Wait for the page to reload
      } else {
        throw new Error("Element not found after multiple retries.");
      }
    }
  }
}

async function isWebsiteLoaded(driver: WebDriver) {
  const logo = By.className("c-site-logo__image");
  await driver.wait(until.elementLocated(logo));
}
