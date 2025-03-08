"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const loginPage_1 = require("./pages/loginPage");
const topListingsPage_1 = require("./pages/topListingsPage");
const confirmationPage_1 = require("./pages/confirmationPage");
// Create an interface for user input
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function StartAutomation() {
    return __awaiter(this, void 0, void 0, function* () {
        // Prompt the user for searchTerm and position
        rl.question("Enter the search term: ", (searchTerm) => {
            if (!searchTerm) {
                console.error("❌ No search term provided!");
                rl.close();
                return;
            }
            console.log(`Using "${searchTerm}" as the search term`);
            rl.question("Enter the position (1 for first, 2 for second, 3 for third): ", (position) => {
                if (!position) {
                    console.error("❌ No position provided!");
                    rl.close();
                    return;
                }
                console.log(`Position ${position} selected`);
                const currentYear = new Date().getFullYear();
                // Prompt for target date and time (Year, Month, Day, Hour, Minute)
                rl.question("Enter the month (e.g., 3 for March): ", (monthIndex) => {
                    rl.question("Enter the day (e.g., 15): ", (day) => {
                        rl.question("Enter the hour (0-23): ", (hour) => {
                            rl.question("Enter the minute (0-59): ", (minute) => {
                                const targetTime = new Date(+currentYear, +monthIndex - 1, +day, +hour, +minute);
                                if (targetTime < new Date()) {
                                    console.error("❌ The target time is in the past!");
                                    rl.close();
                                    return;
                                }
                                console.log(`Target time set for: ${targetTime.toISOString()}`);
                                const url = "https://secure.counselling-directory.org.uk/members/toplistings.php";
                                puppeteer_1.default
                                    .launch({
                                    headless: false,
                                })
                                    .then((browser) => __awaiter(this, void 0, void 0, function* () {
                                    const page = yield browser.newPage();
                                    try {
                                        yield page.goto(url);
                                        yield page.setViewport({ width: 1080, height: 1024 });
                                        yield (0, loginPage_1.isLoginPage)(page);
                                        yield (0, topListingsPage_1.waitForTopListingPage)(page);
                                        yield (0, topListingsPage_1.changeSearchTerm)(page, searchTerm);
                                        yield (0, topListingsPage_1.clickCheckAvailability)(page);
                                        yield (0, topListingsPage_1.isSearchTermInTable)(page, searchTerm);
                                        yield (0, topListingsPage_1.refreshBeforeTime)(page, targetTime, +position);
                                        yield (0, confirmationPage_1.clickAcceptTsAndCs)(page);
                                        yield (0, confirmationPage_1.clickCompletePayment)(page);
                                    }
                                    catch (error) {
                                        console.error("❌ Automation failed:", error);
                                    }
                                    finally {
                                        yield browser.close();
                                        rl.close();
                                    }
                                }));
                            });
                        });
                    });
                });
            });
        });
    });
}
StartAutomation();
