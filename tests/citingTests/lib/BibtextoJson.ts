export type BibtexType = {
  id: string;
  type: string;
  raw: string;
  title: string;
  author?: string;
  editor?: string;
  booktitle?: string;
  publisher?: string;
  school?: string;
  address?: string;
  year?: string | number;
  month?: string;
  pages?: string;
  journal?: string;
  volume?: string;
  number?: string | number;
  series?: string;
  doi?: string;
  issn?: string;
  url?: string;
  urldate?: string;
  language?: string;
  copyright?: string;
  note?: string;
  keyword?: string;
  abstract?: string;
};

const checkValue = (val: string) => {
  if (!(val.includes("{") || val.includes("}"))) {
    return val;
  }

  let output = "";

  for (let i = 0; i < val.length; i++) {
    if (val[i] == "{") {
      continue;
    } else if (val[i] == "}") {
      break;
    }
    output += val[i];
  }

  return output;
};

export default function parseBibtex(bibtex: string): BibtexType {
  // if (!false) {
  //   throw new Error("Invalid bibtex format");
  // }

  const fields = bibtex.split(",\n");
  // console.log(fields);

  const parsedData: Partial<BibtexType> = {};

  parsedData.raw = bibtex;
  for (const field of fields) {
    if (field[0] == "@") {
      const [key, value] = field.split("{");

      parsedData.id = value;
      parsedData.type = key.slice(1);
      continue;
    }
    const [key, value] = field.split(" = ");
    const trimmedKey = key.trim().toLowerCase();

    const trimmedValue = checkValue(value.replace(/^{(.*)}$/, "$1"));

    if (trimmedKey == "title") {
      parsedData.title = trimmedValue;
    } else if (trimmedKey == "author") {
      parsedData.author = trimmedValue;
    } else if (trimmedKey == "year") {
      parsedData.year = trimmedValue;
    } else if (trimmedKey == "journal") {
      parsedData.journal = trimmedValue;
    } else if (trimmedKey == "volume") {
      parsedData.volume = trimmedValue;
    } else if (trimmedKey == "number") {
      parsedData.number = trimmedValue;
    } else if (trimmedKey == "issn") {
      parsedData.issn = trimmedValue;
    } else if (trimmedKey == "pages") {
      parsedData.pages = trimmedValue;
    } else if (trimmedKey == "publisher") {
      parsedData.publisher = trimmedValue;
    } else if (trimmedKey == "edition" || trimmedKey == "series") {
      parsedData.series = trimmedValue;
    } else if (trimmedKey == "doi") {
      parsedData.doi = trimmedValue;
    } else if (trimmedKey == "booktitle") {
      parsedData.booktitle = trimmedValue;
    } else if (trimmedKey == "url") {
      parsedData.url = trimmedValue;
    } else if (trimmedKey == "urldate") {
      parsedData.urldate = trimmedValue;
    }
  }

  return parsedData as BibtexType;
}
