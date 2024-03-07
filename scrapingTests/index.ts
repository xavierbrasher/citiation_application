const getSurname = (author: string) => {
  const split = author.split(" ");
  console.log(split);

  return split[split.length - 1];
};

const getInitals = (author: string) => {
  let initals = "";
  const arr = author.split(" ");
  for (let i = 0; i < arr.length - 1; i++) {
    initals += arr[i].toUpperCase()[0] + ". ";
  }
  return initals;
};

const author = "Xavier Jin Brasher";

console.log(getSurname(author) + ", " + getInitals(author));
