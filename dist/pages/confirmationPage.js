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
exports.clickCompletePayment = exports.clickAcceptTsAndCs = void 0;
const clickAcceptTsAndCs = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.click('input[type="checkbox"]');
    console.log("✅ Clicked Accept Terms and Conditions checkbox");
});
exports.clickAcceptTsAndCs = clickAcceptTsAndCs;
const clickCompletePayment = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const completePayment = 'button[type="submit"][value="Complete payment"]';
    const button = yield page.$(completePayment);
    if (button === null) {
        throw new Error("Complete payment button not found");
    }
    yield page.click(completePayment);
});
exports.clickCompletePayment = clickCompletePayment;
