import parseBibtext, { BibtextType } from "./bibtextToJson";

import storage from "electron-json-storage";

const defaultDataPath = storage.getDefaultDataPath();

export const save_cite_data = async (citations: BibtextType[]) => {
  storage.setDataPath(defaultDataPath);

  await storage.set("data", citations, (error) => {
    throw error;
  });
};

const parse_data_one_object = (data: object) => {
  const bibtext: BibtextType = { id: "", raw: "", title: "", type: "" };

  for (const [index, key] of Object.keys(data).entries()) {
    bibtext[key as keyof typeof bibtext] = data[key as keyof typeof data];
  }
  return bibtext;
};

export async function read_cite_data() {
  let arr: BibtextType[] = [];
  arr = [];

  await storage.get("data", (err, data) => {
    if (err) throw err;

    for (const [index, key] of Object.keys(data).entries()) {
      arr.push(parseBibtext(data[key].raw));
    }
    // console.log(arr);

    return arr;
  });

  return arr;
}
