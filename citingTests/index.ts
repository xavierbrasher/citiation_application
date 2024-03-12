import { BibtexParser } from "bibtex-js-parser";
import type { Entry } from "bibtex-js-parser";
import getData from "./worked_index.ts";
import { getInitals, getSurname } from "./initals.ts";
import citingTypes from "./citingTypes.json" assert { type: "json" };

const parsed = BibtexParser.parseToJSON((await getData()).data);

function getDataFromEntry(text: string, data: Entry) {
  if (text == "i" || text == "/i") {
    return "<" + text + ">";
  }
  if (text == "authorSurname") {
    return getSurname(data.author || "NULL NULL");
  }
  if (text == "initials") {
    return getInitals(data.author || "NULL NULL");
  }

  return data[text as keyof typeof data];
}

function parseData(data: Entry) {
  const citingStr =
    citingTypes.types[data.type as keyof typeof citingTypes.types];
  console.log(citingStr);
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

console.log(parsed[0]);
console.log(parseData(parsed[0]));
