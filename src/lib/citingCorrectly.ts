
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

const articleCite = (entry: any) => {
    const data = entry.entryTags
    if (!data.author) {
        return "NO AUTHOR (" + data.year + ") '" + data.title + "', <i>" + data.journal + "</i>, " + data.volume + "(" + data.number + "), pp." + data.pages + ". Available at: " + data.URL + ". (Accessed: " + data.urldate + ")."
    }
    const authorSurname = getSurname(data.author)
    const initials = getInitals(data.author)
    if (data.number) {
        return authorSurname + ", " + initials + " (" + data.year + ") '" + data.title + "', <i>" + data.journal + "</i>, " + data.volume + "(" + data.number + "), pp." + data.pages + ". Available at: " + data.URL + ". (Accessed: " + data.urldate + ")."
    }
    else {
        return authorSurname + ", " + initials + " (" + data.year + ") '" + data.title + "', <i>" + data.journal + "</i>, " + data.volume + ", pp." + data.pages + ". Available at: " + data.URL + ". (Accessed: " + data.urldate + ")."

    }
}

export default articleCite;