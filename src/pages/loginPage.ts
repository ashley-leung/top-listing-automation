import { Page } from "puppeteer";

export const isLoginPage = async (page: Page) => {
  const passwordInput = await page.$("input[type='password']");
  if (passwordInput) {
    console.log("✅ Login page detected.");
    await fillLoginPage(page);
  } else {
    console.log("❌ Not a login page.");
  }
};

export const fillLoginPage = async (page: Page) => {
  try {
    const emailField = await page.$("input[type='text']");
    await emailField!.type("*");

    const passwordField = await page.$("input[type='password']");
    await passwordField!.type("*");
  } catch (error) {
    console.log("❌ Failed to fill login page.");
  }
};
