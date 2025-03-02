import { Builder, By, WebDriver } from "selenium-webdriver";
import { fillLoginPage, isLoginPage } from "./pages/loginPage";
import { changeSearchTerm, isTopListingsPage } from "./pages/topListingsPage";

async function StartAutomation() {
  const url =
    "https://secure.counselling-directory.org.uk/members/general-information.php";

  const driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(url);

    await isLoginPage(driver);
    await fillLoginPage(driver);
    await isTopListingsPage(driver);

    /*
    [1] = Berkshire
    [2] = Buckinghamshire
    [3] = Central London
    [4] = Hammersmith
    [5] = Hampshire
    [6] = North West London
    [7] = Outer London
    [8] = Oxfordshire
    [9] = RG1
    [10] = Reading
    [11] = South West London
    [12] = Surrey
    [13] = W6
    [14] = West London
    */
    await changeSearchTerm(driver, 2);
  } catch (error) {
    console.error("❌ Automation failed:", error);
  } finally {
    await driver.quit();
  }
}

StartAutomation();
