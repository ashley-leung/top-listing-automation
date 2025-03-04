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
exports.fillLoginPage = exports.isLoginPage = void 0;
const isLoginPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordInput = yield page.$("input[type='password']");
    if (passwordInput) {
        console.log("✅ Login page detected.");
        yield (0, exports.fillLoginPage)(page);
    }
    else {
        console.log("❌ Not a login page.");
    }
});
exports.isLoginPage = isLoginPage;
const fillLoginPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const emailField = yield page.$("input[type='text']");
    yield emailField.type("*");
    const passwordField = yield page.$("input[type='password']");
    yield passwordField.type("*");
    console.log("✅ Filled in dummy data into the login page");
});
exports.fillLoginPage = fillLoginPage;
