import electron from 'electron';
import fs from 'fs';
import path from 'path';
import parseBibtext, { BibtextType } from './bibtextToJson';

const dataPath = electron.app.getPath('userData');
const filePath = path.join(dataPath, 'config.json');

export const read_cite_data = async () => {

  console.log(filePath);

  let responce = ""
  fs.readFile(filePath, "utf-8", (err, string) => {
    if (err) {
      console.debug(err);

      return
    }
    responce = JSON.parse(responce)
    console.debug(responce);

  })

  console.log(responce);
  let new_res: BibtextType[] = []

  for (let i = 0; i < responce.length; i++) {
    new_res = [...new_res, parseBibtext(responce[i])]
  }


  return new_res
}

export const save_cite_data = (data: BibtextType[]) => {
  const string_json_data = JSON.stringify(data)
  console.debug("PARSE WORKED" + JSON.parse(string_json_data))

  fs.writeFile(filePath, string_json_data, (err) => {
    if (err) {
      console.log(err);
      return
    }
  })

}
