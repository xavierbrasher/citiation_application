"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
const bibtex_js_parser_1 = require("bibtex-js-parser");
// console.log(argv);
const headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Ch-Ua": '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
};
const getDataFromJSTOR = async (url, $) => {
    // const descriptionData = $('meta[name="description"]');
    // console.log(descriptionData[0].attribs.content);
    const uuid = $("div #cdt")[0].attribs["data-content-id"];
    const data = (await axios_1.default.get("https://www.jstor.org/citation/text/" + uuid)).data;
    // const boo = data.split("{")
    // const textType = boo[0].substring(1, boo.length)
    // console.log("text type: " + textType)
    const DataJson = bibtex_js_parser_1.BibtexParser.parseToJSON(data)[0];
    console.log(DataJson);
    return DataJson;
};
const getCitationData = async (url) => {
    const page = axios_1.default.get(url, {
        headers: headers,
    });
    const html = (await page).data;
    const $ = (0, cheerio_1.load)(html);
    if (url.includes("https://www.jstor.org")) {
        return await getDataFromJSTOR(url, $);
    }
};
exports.default = getCitationData;
//# sourceMappingURL=scraping.js.map