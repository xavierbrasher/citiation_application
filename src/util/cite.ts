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

const author = (author: string) => {
  // check if ends with et el
  let hasEtEl = false;

  if (author.endsWith(" et al.")) {
    author = author.slice(0, -7);
    hasEtEl = true;
  }

  return (
    getSurname(author) + ", " + getInitals(author) + (hasEtEl ? " et al. " : "")
  );
};

const getDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

const handlePage = (page: string) => {
  const copied_page = page.split("--");
  return copied_page.join("-");
};

function getDataFromEntry(text: string, data: BibtextType) {
  if (text == "i" || text == "/i") {
    return "<" + text + ">";
  }
  if (text == "edition") {
    return "Edition " + data.volume?.split(".")[1] || "EDITION";
  }
  if (text == "author") {
    return author(data.author) || "AUTHOR";
  }
  if (text == "urldate") {
    return getDate();
  }

  if (text == "pages") {
    return handlePage(data.pages);
  }

  const output = data[text as keyof typeof data];
  if (output == null || output == "") {
    return text.toUpperCase();
  }

  return output;
}

export function parseData(data: BibtextType) {
  // console.log(data);

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
