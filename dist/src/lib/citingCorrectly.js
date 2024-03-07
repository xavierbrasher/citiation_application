"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSurname = (author) => author.split(" ")[author.length];
const getInitals = (author) => {
    let initals = "";
    const arr = author.split(" ");
    for (let i = 0; i < arr.length - 1; i++) {
        initals += arr[0].toUpperCase()[0];
    }
    return initals;
};
const articleCite = (data) => {
    const authorSurname = getSurname(data.author);
    const initials = getInitals(data.author);
    return authorSurname + ", ";
};
//# sourceMappingURL=citingCorrectly.js.map