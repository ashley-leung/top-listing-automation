import { Page } from "puppeteer";

export const clickAcceptTsAndCs = async (page: Page) => {
  await page.click('input[type="checkbox"]');
  console.log("✅ Clicked Accept Terms and Conditions checkbox");
};
