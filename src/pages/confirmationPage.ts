import { Page } from "puppeteer";

export const clickAcceptTsAndCs = async (page: Page) => {
  await page.click('input[type="checkbox"]');
  console.log("✅ Clicked Accept Terms and Conditions checkbox");
};

export const clickCompletePayment = async (page: Page) => {
  await page.click('button[type="submit"]');
};
