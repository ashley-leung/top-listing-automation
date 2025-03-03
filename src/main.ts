import puppeteer from "puppeteer";
import { isLoginPage } from "./pages/loginPage";
import {
  changeSearchTerm,
  clickCheckAvailability,
  isSearchTermInTable,
  isTopListingsPage,
  refreshBeforeTime,
} from "./pages/topListingsPage";
import { clickAcceptTsAndCs } from "./pages/confirmationPage";

async function StartAutomation() {
  const args = process.argv.slice(2); // Remove first two elements
  const searchTerm = args[0];
  if (searchTerm === undefined || searchTerm === "") {
    throw new Error("❌ No search terms provided");
  }
  console.log(`Using "${searchTerm}" as the search term`);

  const position = args[1];
  if (position === undefined || searchTerm === null) {
    throw new Error("❌ No position provided");
  }
  console.log(`"${position}" position selected`);

  // Parse the date and time parameters (year, month, day, hour, minute)
  const year = parseInt(args[2]);
  const month = parseInt(args[3]) - 1; // JavaScript months are zero-indexed
  const day = parseInt(args[4]);
  const hour = parseInt(args[5]);
  const minute = parseInt(args[6]);

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hour) ||
    isNaN(minute)
  ) {
    throw new Error(
      "❌ Invalid date and time parameters provided. Please provide year, month, day, hour, and minute."
    );
  }

  const targetDate = new Date(year, month, day, hour, minute);
  console.log(`Target date and time: ${targetDate.toISOString()}`);

  const url =
    "https://secure.counselling-directory.org.uk/members/toplistings.php";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1024 });

    await isLoginPage(page);
    await isTopListingsPage(page);
    await changeSearchTerm(page, searchTerm);
    await clickCheckAvailability(page);
    await isSearchTermInTable(page, searchTerm);
    await refreshBeforeTime(page, targetDate, +position);
    await clickAcceptTsAndCs(page);
  } catch (error) {
    console.error("❌ Automation failed:", error);
  } finally {
    await browser.close();
  }
}

StartAutomation();
