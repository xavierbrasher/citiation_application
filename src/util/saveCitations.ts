import electron from 'electron';
import fs from 'fs';
import path from 'path';
import parseBibtext, { BibtextType } from './bibtextToJson';

const dataPath = electron.app.getPath('userData');
const filePath = path.join(dataPath, 'config.json');

export const read_cite_data = async () => {

  let responce = ""
  fs.readFile(filePath, "utf-8", async (err, string) => {
    if (err) {

      return
    }
    responce = string
    console.log(string);


  })

  console.log(responce);

  const json_res = await JSON.parse(responce)
  console.log(json_res);


  let new_res: BibtextType[] = []

  for (let i = 0; i < json_res.length; i++) {
    new_res = [...new_res, parseBibtext(json_res[i])]
  }

  console.log(new_res);



  return new_res
}

export const save_cite_data = async (data: BibtextType[]) => {
  const string_json_data = await JSON.stringify(data)
  console.debug("PARSE WORKED" + await JSON.parse(string_json_data))

  fs.writeFile(filePath, string_json_data, (err) => {
    if (err) {
      return
    }
  })

}
