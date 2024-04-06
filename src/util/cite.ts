import { BibtextType } from "./bibtextToJson";
import citingTypes from "./citingTypes.json";
import getCitationData from "./scraping";

const getSurname = (author: string) => {
  const splitd = author.split(" ");
  return splitd[splitd.length - 1];
};

const getInitals = (author: string) => {
  let initals = "";
  const arr = author.split(" ");
  for (let i = 0; i < arr.length - 1; i++) {
    initals += arr[i].toUpperCase()[0] + ". ";
  }
  return initals;
};

function getDataFromEntry(text: string, data: BibtextType) {
  if (text == "i" || text == "/i") {
    return "<" + text + ">";
  }
  if (text == "edition") {
    return "Edition " + data.volume?.split(".")[1] || "EDITION";
  }
  if (text == "authorSurname") {
    return getSurname(data.author || "AUTHORSURNAME");
  }
  if (text == "initials") {
    return getInitals(data.author || "INITIALS");
  }

  const output = data[text as keyof typeof data];

  if (output == null || output == "") {
    return text.toUpperCase();
  }

  return output;
}

function parseData(data: BibtextType) {
  const citingStr =
    citingTypes.types[data.type as keyof typeof citingTypes.types];
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

async function cite(url: string) {
  const res = await getCitationData(url);
  return parseData(res);
}

export default cite;
