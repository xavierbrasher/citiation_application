import { load } from "cheerio";
import axios from "axios";
import minim from "minimist";

var argv = minim(process.argv.slice(2));
// console.log(argv);

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

var main1 = argv._[0] || "https://www.jstor.org/stable/30216523";
var page = axios.get(main1, {
  headers: headers,
});
const getHTML = async () => {
  return (await page).data;
};

let html = await getHTML();
let $ = load(html);

const descriptionData = $('meta[name="description"]');
// console.log(a[0].attribs.content);

const uuid = $("div #cdt")[0].attribs["data-content-id"];
const data = await axios.get("https://www.jstor.org/citation/text/" + uuid);
console.log(data.data);
