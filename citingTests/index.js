import { BibtexParser } from "bibtex-js-parser";
import getData from "./worked_index.js";
import citingTypes from "./citingTypes.json" assert { type: "json" };

let parsed = BibtexParser.parseToJSON((await getData()).data);

console.log(parsed[0]);
