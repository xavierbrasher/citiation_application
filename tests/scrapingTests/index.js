import axios from "axios";
import { load } from "cheerio";

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

const getHTML = async (url) => {
  return (await axios.get(url, { headers: headers })).data;
};

const data = await getHTML(
  "https://www.redhat.com/en/blog/understanding-random-number-generators-and-their-limitations-linux"
);

// console.log(data);

const $ = load(data);

const spans = $("span");

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let numbers = [0];
for (let i = 1; i <= 31; i++) {
  numbers[i] = i;
}
// console.log(numbers);

let first = "";

spans.each((i, el) => {
  const thing = $(el).text();
  months.forEach((j, month) => {
    numbers.forEach((j, number) => {
      if (thing.includes(month) && thing.includes(number)) {
        if (first == "") {
          first = thing;
        }
      }
    });
  });
});
