import { Page } from "puppeteer";

export const selectDropdownItem = async (
  page: Page,
  dropdownSelector: string,
  value: string
) => {
  try {
    await page.select(dropdownSelector, value);
    console.log(`✅ Selected item with value "${value}" from dropdown.`);
  } catch (error) {
    console.log(
      `❌ Failed to select item with value "${value}" from dropdown.`
    );
    console.error(error);
  }
};

// delay function to pause execution for a specified time in milliseconds
export function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
