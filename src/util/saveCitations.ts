import electron from 'electron';
import fs, { readFile } from 'fs';
import path from 'path';
import parseBibtext, { BibtextType } from './bibtextToJson';

const dataPath = electron.app.getPath('userData');
const filePath = path.join(dataPath, 'config.json');

const read_file = () => {
  return fs.readFileSync(filePath, "utf-8")
}
export const read_cite_data = async () => {

  const responce = read_file()

  const json_res = await JSON.parse(responce)

  let new_res: BibtextType[] = []

  for (let i = 0; i < json_res.length; i++) {
    new_res = [...new_res, parseBibtext(json_res[i].raw)]
  }



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
