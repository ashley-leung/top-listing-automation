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
  const emailField = await page.$("input[type='text']");
  await emailField!.type("*");

  const passwordField = await page.$("input[type='password']");
  await passwordField!.type("*");

  console.log("✅ Filled in dummy data into the login page");
};
