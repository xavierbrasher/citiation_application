import getData from "./worked_index.ts";
import { getInitals, getSurname } from "./initals.ts";
import citingTypes from "./citingTypes.json" assert { type: "json" };
import parseBibtext from "./lib/BibtextoJson.ts";
import type { BibtextType } from "./lib/BibtextoJson.ts";

const test = (await getData("https://www.jstor.org/stable/j.ctv1wvncxk.31"))
  .data;
// const test = (await getData("https://www.jstor.org/stable/40379722")).data;

const parsed = parseBibtext(test);

function getDataFromEntry(text: string, data: BibtextType) {
  if (text == "i" || text == "/i") {
    return "<" + text + ">";
  }
  if (text == "edition") {
    return "Edition " + data.volume?.split(".")[1] || "NULL";
  }
  if (text == "authorSurname") {
    return getSurname(data.author || "NULL NULL");
  }
  if (text == "initials") {
    return getInitals(data.author || "NULL NULL");
  }

  return data[text as keyof typeof data];
}

function parseData(data: BibtextType) {
  const citingStr =
    citingTypes.types[data.type as keyof typeof citingTypes.types];
  // console.log(citingStr);
  let cited_string = "";
  let opened = false;
  let text = "";
  for (let i = 0; i < citingStr.length; i++) {
    if (citingStr[i] == "<") {
      opened = true;
      continue;
    }
    if (citingStr[i] == ">") {
      cited_string += getDataFromEntry(text, data);
      text = "";
      opened = false;
      continue;
    }
    if (opened) {
      text += citingStr[i];
    }
    if (!opened) {
      cited_string += citingStr[i];
    }
  }
  return cited_string;
}

// console.log(parsed);
// console.log(parseData(parsed));
