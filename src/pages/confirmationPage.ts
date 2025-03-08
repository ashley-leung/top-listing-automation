import { Page } from "puppeteer";

export const clickAcceptTsAndCs = async (page: Page) => {
  await page.click('input[type="checkbox"]');
  console.log("✅ Clicked Accept Terms and Conditions checkbox");
};

export const clickCompletePayment = async (page: Page) => {
  const completePayment = 'button[type="submit"][value="Complete payment"]';
  const button = await page.$(completePayment);

  if (button === null) {
    throw new Error("Complete payment button not found");
  }
  await page.click(completePayment);
};
