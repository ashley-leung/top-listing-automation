import { until, WebDriver } from "selenium-webdriver";
import {
  firstNameDropDown,
  firstNameDropDownWithOption,
  saveButton,
} from "../conselling-directory/variables";

export const isTopListingsPage = async (driver: WebDriver) => {
  try {
    const dropdown = await driver.wait(
      until.elementLocated(firstNameDropDown),
      10000 // 10 seconds
    );
    console.log("✅ Top Listings Page detected.");

    await dropdown.click();
  } catch (error) {
    console.log("❌ Top Listings Page not found.");
    throw new Error("❌ Top Listings Page not found.");
  }
};

export const changeSearchTerm = async (
  driver: WebDriver,
  searchTermIndex: number
) => {
  try {
    const dropdown = await driver.wait(until.elementLocated(firstNameDropDown));

    await dropdown.click();

    const option = await driver.findElement(
      firstNameDropDownWithOption(searchTermIndex)
    );
    await option.click();

    const save = await driver.findElement(saveButton);

    await driver.sleep(50000);
  } catch (error) {
    console.error(error);
  }
};
