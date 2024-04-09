import playwright from "playwright";
import * as cheerio from "cheerio";

async function getHtml(url) {
  // 'webkit' is also supported, but there is a problem on Linux
  const browser = await playwright["firefox"].launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  const html = await page.content();

  await browser.close();

  return html;
}

function findTextAndReturnRemainder(target, variable) {
  var chopFront = target.substring(
    target.search(variable) + variable.length,
    target.length
  );
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
