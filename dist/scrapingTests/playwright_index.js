"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = __importDefault(require("playwright"));
const cheerio = __importStar(require("cheerio"));
async function getHtml(url) {
    // 'webkit' is also supported, but there is a problem on Linux
    const browser = await playwright_1.default["firefox"].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();
    return html;
}
function findTextAndReturnRemainder(target, variable) {
    var chopFront = target.substring(target.search(variable) + variable.length, target.length);
    var result = chopFront.substring(0, chopFront.search(";"));
    return result;
}
function cut(str, cutStart, cutEnd) {
    return str.substr(0, cutStart) + str.substr(cutEnd + 1);
}
function cutFromString(oldStrRegex, fullStr) {
    return fullStr.replace(oldStrRegex, "");
}
let url = "https://www.jstor.org/stable/30216523";
const html = await getHtml(url);
// console.log(html);
const $ = cheerio.load(html);
var text = $('[data-analytics-provider="ga"]').text();
const pattern = /gaData\.content = \{[\s\S]*?\};/;
const matches = text.match(pattern);
var description = $("meta");
// console.log(description);
var splitMatches = matches[0].split("\n");
splitMatches[0] = "{";
splitMatches[splitMatches.length - 1] = "}";
var finalJoined = splitMatches.join("\n");
console.log(JSON.parse(finalJoined));
// var result = JSON.parse(res);
// console.log(result);
//# sourceMappingURL=playwright_index.js.map