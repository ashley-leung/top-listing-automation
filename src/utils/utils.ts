import { Page } from "puppeteer";

export async function waitForText(page: Page, text: string, timeout = 5000) {
  try {
    await page.waitForFunction(
      (text) => {
        return [...document.querySelectorAll("*")].some((el) =>
          el.textContent!.includes(text)
        );
      },
      { timeout },
      text
    );
    console.log(`✅ Element containing text "${text}" found.`);
    return true;
  } catch (error) {
    console.error(
      `❌ Element containing text "${text}" not found within ${timeout}ms.`
    );

    return false;
  }
}

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
