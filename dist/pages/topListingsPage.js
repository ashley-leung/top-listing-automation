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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSearchTermInTable = exports.clickCheckAvailability = exports.changeSearchTerm = exports.waitForTopListingPage = void 0;
exports.refreshBeforeTime = refreshBeforeTime;
const utils_1 = require("../utils/utils");
const waitForTopListingPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("⏳ Waiting for Top Listing page to appear");
    yield page.waitForSelector('select[name="search_term"]');
    console.log("✅ Top Listing page appeared");
});
exports.waitForTopListingPage = waitForTopListingPage;
const changeSearchTerm = (page, searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⏳ Changing Search Term to ${searchTerm}`);
    yield (0, utils_1.selectDropdownItem)(page, 'select[name="search_term"]', searchTerm);
    console.log(`✅ Search Term ${searchTerm} changed`);
});
exports.changeSearchTerm = changeSearchTerm;
const clickCheckAvailability = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.click('button[name="submit"][value="Check availability"]');
    console.log("✅ Clicked Check Availability button");
});
exports.clickCheckAvailability = clickCheckAvailability;
function refreshBeforeTime(page_1, targetTime_1, buyNowButtonPosition_1) {
    return __awaiter(this, arguments, void 0, function* (page, targetTime, buyNowButtonPosition, refreshBefore = 10) {
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
                yield page.reload({ waitUntil: "domcontentloaded" });
                yield page.waitForSelector('img[class="c-site-logo__image"]');
                console.log(`✅ Page refreshed at ${new Date().toISOString()}`);
            }
            else {
                console.log(`⏳ Waiting to refresh... ${Math.floor(remainingTime / 1000)} seconds remaining`);
            }
            // Check if "Buy Now" button is present
            const buyButton = `button#submitposition${buyNowButtonPosition}`;
            const buttonExists = (yield page.$(buyButton)) !== null;
            if (buttonExists) {
                console.log(`✅ "Buy Now" button appeared! Stopping refresh`);
                yield page.click(buyButton);
                console.log(`✅ "Buy Now" button clicked`);
                return; // Exit once the button is clicked
            }
            let interval = Math.max(500, (remainingTime / (refreshBefore * 1000)) * 1000);
            yield (0, utils_1.delay)(interval);
        }
    });
}
const isSearchTermInTable = (page, searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⏳ Waiting for '${searchTerm}' to be in the table!`);
    yield page.waitForSelector(`::-p-xpath(//td[text()='${searchTerm}'])`);
    console.log(`✅ '${searchTerm}' is now in the table!`);
});
exports.isSearchTermInTable = isSearchTermInTable;
