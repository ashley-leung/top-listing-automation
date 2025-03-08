import readline from "readline";
import puppeteer from "puppeteer";
import { isLoginPage } from "./pages/loginPage";
import {
  changeSearchTerm,
  clickCheckAvailability,
  isSearchTermInTable,
  refreshBeforeTime,
  waitForTopListingPage,
} from "./pages/topListingsPage";
import {
  clickAcceptTsAndCs,
  clickCompletePayment,
} from "./pages/confirmationPage";

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function StartAutomation() {
  // Prompt the user for searchTerm and position
  rl.question("Enter the search term: ", (searchTerm) => {
    if (!searchTerm) {
      console.error("❌ No search term provided!");
      rl.close();
      return;
    }

    console.log(`Using "${searchTerm}" as the search term`);

    rl.question(
      "Enter the position (1 for first, 2 for second, 3 for third): ",
      (position) => {
        if (!position) {
          console.error("❌ No position provided!");
          rl.close();
          return;
        }

        console.log(`Position ${position} selected`);

        const currentYear: number = new Date().getFullYear();

        // Prompt for target date and time (Year, Month, Day, Hour, Minute)
        rl.question("Enter the month (e.g., 3 for March): ", (monthIndex) => {
          rl.question("Enter the day (e.g., 15): ", (day) => {
            rl.question("Enter the hour (0-23): ", (hour) => {
              rl.question("Enter the minute (0-59): ", (minute) => {
                const targetTime = new Date(
                  +currentYear,
                  +monthIndex - 1,
                  +day,
                  +hour,
                  +minute
                );

                if (targetTime < new Date()) {
                  console.error("❌ The target time is in the past!");
                  rl.close();
                  return;
                }

                console.log(`Target time set for: ${targetTime.toISOString()}`);

                const url =
                  "https://secure.counselling-directory.org.uk/members/toplistings.php";

                puppeteer
                  .launch({
                    headless: false,
                  })
                  .then(async (browser) => {
                    const page = await browser.newPage();

                    try {
                      await page.goto(url);
                      await page.setViewport({ width: 1080, height: 1024 });

                      await isLoginPage(page);
                      await waitForTopListingPage(page);
                      await changeSearchTerm(page, searchTerm);
                      await clickCheckAvailability(page);
                      await isSearchTermInTable(page, searchTerm);
                      await refreshBeforeTime(page, targetTime, +position);
                      await clickAcceptTsAndCs(page);
                      await clickCompletePayment(page);
                    } catch (error) {
                      console.error("❌ Automation failed:", error);
                    } finally {
                      await browser.close();
                      rl.close();
                    }
                  });
              });
            });
          });
        });
      }
    );
  });
}

StartAutomation();
