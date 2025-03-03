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
const puppeteer_1 = __importDefault(require("puppeteer"));
const loginPage_1 = require("./pages/loginPage");
const topListingsPage_1 = require("./pages/topListingsPage");
const confirmationPage_1 = require("./pages/confirmationPage");
function StartAutomation() {
    return __awaiter(this, void 0, void 0, function* () {
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
        if (isNaN(year) ||
            isNaN(month) ||
            isNaN(day) ||
            isNaN(hour) ||
            isNaN(minute)) {
            throw new Error("❌ Invalid date and time parameters provided. Please provide year, month, day, hour, and minute.");
        }
        const targetDate = new Date(year, month, day, hour, minute);
        console.log(`Target date and time: ${targetDate.toISOString()}`);
        const url = "https://secure.counselling-directory.org.uk/members/toplistings.php";
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        try {
            yield page.goto(url);
            yield page.setViewport({ width: 1080, height: 1024 });
            yield (0, loginPage_1.isLoginPage)(page);
            yield (0, topListingsPage_1.isTopListingsPage)(page);
            yield (0, topListingsPage_1.changeSearchTerm)(page, searchTerm);
            yield (0, topListingsPage_1.clickCheckAvailability)(page);
            yield (0, topListingsPage_1.isSearchTermInTable)(page, searchTerm);
            yield (0, topListingsPage_1.refreshBeforeTime)(page, targetDate, +position);
            yield (0, confirmationPage_1.clickAcceptTsAndCs)(page);
        }
        catch (error) {
            console.error("❌ Automation failed:", error);
        }
        finally {
            yield browser.close();
        }
    });
}
StartAutomation();
