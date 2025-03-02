import { WebDriver } from "selenium-webdriver";
import { emailField, passwordField } from "../conselling-directory/variables";

export const isLoginPage = async (driver: WebDriver) => {
  try {
    await driver.findElement(passwordField);
    console.log("✅ Login page detected.");
  } catch (error) {
    console.log("❌ Not a login page.");
  }
};

export const fillLoginPage = async (driver: WebDriver) => {
  const email = await driver.findElement(emailField);
  await email.sendKeys("*");

  const password = await driver.findElement(passwordField);
  await password.sendKeys("*");
};
