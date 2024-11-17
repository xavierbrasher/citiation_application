import electron from "electron";
import fs, { readFile } from "fs";
import path from "path";
import parseBibtext, { BibtextType } from "./bibtexToJson";

const dataPath = electron.app.getPath("userData");
const filePath = path.join(dataPath, "config.json");

export const read_cite_data = async () => {
  try {
    const responce = fs.readFileSync(filePath, "utf-8");
    const json_res = await JSON.parse(responce);

    let new_res: BibtextType[] = [];

    for (let i = 0; i < json_res.length; i++) {
      new_res = [...new_res, parseBibtext(json_res[i].raw)];
    }

    return new_res;

  } catch (error) {
    fs.writeFileSync(filePath, "{}", { encoding: "utf-8" });
    return [];
  }

};

export const save_cite_data = async (data: BibtextType[]) => {
  const string_json_data = await JSON.stringify(data);

  fs.writeFile(filePath, string_json_data, (err) => {
    if (err) {
      return;
    }
  });
};
