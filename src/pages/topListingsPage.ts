import { Page } from "puppeteer";
import { delay, selectDropdownItem } from "../utils/utils";

export const waitForTopListingPage = async (page: Page) => {
  await page.$('select[name="search_term"]');
};

export const changeSearchTerm = async (page: Page, searchTerm: string) => {
  await selectDropdownItem(page, 'select[name="search_term"]', searchTerm);
};

export const clickCheckAvailability = async (page: Page) => {
  await page.click('button[name="submit"][value="Check availability"]');
  console.log("✅ Clicked Check Availability button");
};

export async function refreshBeforeTime(
  page: Page,
  targetTime: Date,
  buyNowButtonPosition: number,
  refreshBefore: number = 10
) {
  let now = new Date();
  const timeDifference = targetTime.getTime() - now.getTime();

  if (timeDifference <= 0) {
    throw new Error("❌ Target time is in the past!");
  }

  // Calculate the time when we should refresh the page
  const refreshAt = targetTime.getTime() - refreshBefore * 1000; // Convert seconds to milliseconds

  console.log(`⏰ Current time: ${now.toISOString()}`);
  console.log(`⏰ Target time: ${targetTime.toISOString()}`);
  console.log(`⏰ Refreshing at: ${new Date(refreshAt).toISOString()}`);

  // Continue refreshing until the button appears
  while (true) {
    now = new Date(); // Update the current time in every loop iteration
    const remainingTime = refreshAt - now.getTime();

    // If it's time to refresh the page, do so
    if (remainingTime <= 0) {
      console.log(`🔄 Refreshing the page at ${new Date().toISOString()}`);
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector('img[class="c-site-logo__image"]');
      console.log(`✅ Page refreshed at ${new Date().toISOString()}`);
    } else {
      console.log(
        `⏳ Waiting to refresh... ${Math.floor(
          remainingTime / 1000
        )} seconds remaining.`
      );
    }

    // Check if "Buy Now" button is present
    const buyButton = `button#submitposition${buyNowButtonPosition}`;
    const buttonExists = (await page.$(buyButton)) !== null;

    if (buttonExists) {
      console.log(`✅ "Buy Now" button appeared! Stopping refresh.`);
      await page.click(buyButton);
      return; // Exit once the button is clicked
    }

    let interval = Math.max(
      500,
      (remainingTime / (refreshBefore * 1000)) * 1000
    );
    await delay(interval);
  }
}

export const isSearchTermInTable = async (page: Page, searchTerm: string) => {
  console.log(`Waiting for '${searchTerm}' to be in the table!`);
  await page.waitForSelector(`::-p-xpath(//td[text()='${searchTerm}'])`);

  console.log(`'${searchTerm}' is now in the table!`);
};
