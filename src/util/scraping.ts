import { load } from "cheerio";
import axios, { AxiosError } from "axios";
import type { CheerioAPI } from "cheerio";
import parseBibtex from "./bibtexToJson";

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

const headers2 = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "en-US,en;q=0.9",
  "cache-control": "max-age=0",
  cookie:
    "UUID=72d9a842-6eef-4b5f-8657-91538ac1b374; csrftoken=M9dHXyhRMUCkcdWpktNUMj3oa2wErXuZ; pxcts=a25f88bf-2af5-11ef-ba4c-912721af38c5; _pxvid=a1632150-2af5-11ef-89eb-105fd897251d; __zlcmid=1OlnApkKzWt2b6r; _pxhd=lqwPbH/3kCBUKag5pRA3Y6XBF7gSGae95LPt32ZRszHsxHak0P1yLNXJzIJkbXrBzWshfQYeTko2seZ3pjQT0Q==:mWOlkfJDpcDJp2E2D1WZN5Zq9dLONHEOdWdDvwcyRDlgQzN01yvQsbUnTgvWQfHE8ua8iPZ2YTpP64qTWFq8VQPXY2KwbKWZd2Pudgntrb4=; AccessSessionTimedSignature=dcab525e695bf6fc5531f6d9305daaed376cd13344a8574dbcdee3ad012ca6d0; AccessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwMTkzMzQwZjg3NWY3ODNhODRjZmY4ZGZkMjM0OWUyYiIsInV1aWQiOiI3MmQ5YTg0Mi02ZWVmLTRiNWYtODY1Ny05MTUzOGFjMWIzNzQiLCJ1c2VyIjp7ImlkIjoiIiwibG9nZ2VkSW4iOmZhbHNlLCJhZG1pbiI6ZmFsc2V9LCJpYXQiOjE3MzE3NDk0NzQsImV4cCI6MTczMTc0OTc3NH0.CELpzZBkQMT7OanhwKAtn9PMr_Jrmk8NASisep_zvCQ; AccessSession=H4sIAAAAAAAA_4WSTW_bMAyG_4vOVUBRUiT5FgRYN-zWpId2GAZ9Zh7cJPDHgC3ofy_leF2xw-qLSOLhy1eUL2ya2sQaZjA5bxXydc6Fq6ALt2ttuBNaWh9FkEaxG9aeiRUgV6hxhfWcq1UBhJNSQbFGF2MlicVSbCoJpXIZA3H9DEaNNiXMnCjDlS2K-2AltzaJENDLbDPBnR8JRkDFheBivQfbIDSaZgr9WIHpX8A1UjRCrgBdBYZ3BMbImuK7Id-wn76bvb2hBb6qmUr7cewH1lzYdkvgZkel7Z6ioT0e_PnU528gau2Bartbiu62f6Jd5T7tP24-b9gzKU3j902MI6l9-UrpEl6ue6RFG2GQ2vKcF4wBDShOa_VcQVY8CCN5gZTK2hYNItbL_Dpnou_yoT0dKX9qj-1T-zt_6PyBNWM_0S27ZYC0ztUB3dLUz033Q-7J3mJDAIB8NeGyBZNy5EWawFU0mvtokUMU1nkdA3j4a-K2P03n_3p4O_1Q6etw2saP68_0zseuW1ze7_kFsv9aPccCAAA; AccessSessionSignature=9b711b70aa01fcfbce7cc43a7405bb9a2208948acc7cee39c57fe10237e3c191; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Nov+16+2024+17%3A32%3A02+GMT%2B0800+(Singapore+Standard+Time)&version=202303.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=31620fad-1e59-4c37-99b3-306ee235f949&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0005%3A0%2CC0004%3A0%2CC0003%3A1&AwaitingReconsent=false; _px2=eyJ1IjoiYTJhMzUwNDAtYTNmZC0xMWVmLTk1YzEtMTVhMjU4YWY0MzFmIiwidiI6ImExNjMyMTUwLTJhZjUtMTFlZi04OWViLTEwNWZkODk3MjUxZCIsInQiOjE3MzE3NDk3ODcwMzAsImgiOiIxNmVlNGQ5OTIwYjc0ZTdmN2FhNTkyMTJmM2EwN2I4NWQyZDM0YmJkZWRkZGFjMDQ4YzgxNDZiYjNhOTIxMzQ4In0=; ReferringRequestId=fastly-default:2eb481e997351cfc80df7ede5a7c6154",
  dnt: "1",
  priority: "u=0, i",
  "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

function replaceNonUnicodeSymbols(text: any) {
  // eslint-disable-next-line no-control-regex
  return text.replace(/[^\x00-\x7F]/g, ""); // Replace non-Unicode characters with an empty string
}
const getDataFromJSTOR = async (url: string, $: CheerioAPI) => {
  const uuid = $("div #cdt")[0].attribs["data-content-id"];
  const data = (await axios.get("https://www.jstor.org/citation/text/" + uuid))
    .data;

  return parseBibtex(data);
};

const getCitationData = async (url: string) => {
  try {
    const page = await axios.get(url, {
      headers: headers2,
    });
    const html = page.data;
    const $ = load(html);
    if (url.includes("https://www.jstor.org")) {
      return await getDataFromJSTOR(url, $);
    }
  } catch (error) {
    console.log("\n\n\nERROR:\n\n\n" + error);

    const code = error.toString().slice(-3);
    const check_error = Number(code);
    try {
      const page = await axios.get(url, {
        headers: headers,
      });
      const html = page.data;
      const $ = load(html);
      if (url.includes("https://www.jstor.org")) {
        return await getDataFromJSTOR(url, $);
      }
    } catch (_error) {
      return check_error;
    }
  }
};

export default getCitationData;
