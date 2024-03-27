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

// const articleCite = (entry: any) => {
//   const data = entry.entryTags;
//   if (!data.author) {
//     return (
//       "NO AUTHOR (" +
//       data.year +
//       ") '" +
//       data.title +
//       "', <i>" +
//       data.journal +
//       "</i>, " +
//       data.volume +
//       "(" +
//       data.number +
//       "), pp." +
//       data.pages +
//       ". Available at: " +
//       data.URL +
//       ". (Accessed: " +
//       data.urldate +
//       ")."
//     );
//   }
//   const authorSurname = getSurname(data.author);
//   const initials = getInitals(data.author);
//   if (data.number) {
//     return (
//       authorSurname +
//       ", " +
//       initials +
//       " (" +
//       data.year +
//       ") '" +
//       data.title +
//       "', <i>" +
//       data.journal +
//       "</i>, " +
//       data.volume +
//       "(" +
//       data.number +
//       "), pp." +
//       data.pages +
//       ". Available at: " +
//       data.URL +
//       ". (Accessed: " +
//       data.urldate +
//       ")."
//     );
//   } else {
//     return (
//       authorSurname +
//       ", " +
//       initials +
//       " (" +
//       data.year +
//       ") '" +
//       data.title +
//       "', <i>" +
//       data.journal +
//       "</i>, " +
//       data.volume +
//       ", pp." +
//       data.pages +
//       ". Available at: " +
//       data.URL +
//       ". (Accessed: " +
//       data.urldate +
//       ")."
//     );
//   }
// };

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
  console.log(res);

  return parseData(res);
}

export default cite;
