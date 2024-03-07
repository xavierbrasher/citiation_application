const getSurname = (author) => author.split(" ")[author.length];
const getInitals = (author) => {
    let initals = "";
    const arr = author.split(" ");
    for (let i = 0; i < arr.length - 1; i++) {
        initals += arr[0].toUpperCase()[0] + ". ";
    }
    return initals;
};
const author = "Xavier Jin Brasher";
console.log(getSurname(author) + ", " + getInitals(author));
//# sourceMappingURL=index.js.map