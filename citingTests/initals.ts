export const getSurname = (author: string) => {
  const split = author.split(" ");

  return split[split.length - 1];
};

export const getInitals = (author: string) => {
  let initals = "";
  const arr = author.split(" ");
  for (let i = 0; i < arr.length - 1; i++) {
    initals += arr[i].toUpperCase()[0] + ". ";
  }
  return initals;
};
