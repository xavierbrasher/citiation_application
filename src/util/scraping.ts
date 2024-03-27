import { load } from "cheerio";
import axios from "axios";
import type { CheerioAPI } from "cheerio";
import parseBibtext from "./bibtextToJson";

const headers = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9",
  "Sec-Ch-Ua":
    '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
};

function replaceNonUnicodeSymbols(text: any) {
  // eslint-disable-next-line no-control-regex
  return text.replace(/[^\x00-\x7F]/g, ""); // Replace non-Unicode characters with an empty string
}
const getDataFromJSTOR = async (url: string, $: CheerioAPI) => {
  const uuid = $("div #cdt")[0].attribs["data-content-id"];
  const data = (await axios.get("https://www.jstor.org/citation/text/" + uuid))
    .data;

  return parseBibtext(data);
};

const getCitationData = async (url: string) => {
  const page = axios.get(url, {
    headers: headers,
  });

  const html = (await page).data;
  const $ = load(html);
  if (url.includes("https://www.jstor.org")) {
    return await getDataFromJSTOR(url, $);
  }
};

export default getCitationData;
