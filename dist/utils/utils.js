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
exports.selectDropdownItem = void 0;
exports.waitForText = waitForText;
exports.delay = delay;
function waitForText(page_1, text_1) {
    return __awaiter(this, arguments, void 0, function* (page, text, timeout = 5000) {
        try {
            yield page.waitForFunction((text) => {
                return [...document.querySelectorAll("*")].some((el) => el.textContent.includes(text));
            }, { timeout }, text);
            console.log(`✅ Element containing text "${text}" found.`);
            return true;
        }
        catch (error) {
            console.error(`❌ Element containing text "${text}" not found within ${timeout}ms.`);
            return false;
        }
    });
}
const selectDropdownItem = (page, dropdownSelector, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page.select(dropdownSelector, value);
        console.log(`✅ Selected item with value "${value}" from dropdown.`);
    }
    catch (error) {
        console.log(`❌ Failed to select item with value "${value}" from dropdown.`);
        console.error(error);
    }
});
exports.selectDropdownItem = selectDropdownItem;
// delay function to pause execution for a specified time in milliseconds
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
