import type {Entry} from "bibtex-js-parser";

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

const articleCite = (data: Entry) => {
    console.log("hello!")
    console.log(data)
    const authorSurname = getSurname(data.author || data.publisher)
    const initials = getInitals(data.author || data.publisher)
    return authorSurname + ", " + initials + " (" + data.year + ") '" + data.title + "', <i>" + data.journal + "</i>, " + data.volume + "(" + data.number + "), pp." + data.pages + ". Available at: " + data.url + ". (Accessed: " + data.urldate + ")."
}

export default articleCite;