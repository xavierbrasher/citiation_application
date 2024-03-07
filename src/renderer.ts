import "./index.css";

type data = {
  scrapeSite: (url: string) => any;
};

const submit_button = document.getElementById("submit_button");
const url_text = document.getElementById("url_text");

url_text.value = "https://www.jstor.org/stable/26057991";

function validateURL(url: string) {
  return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
    url
  );
}

submit_button.onclick = async (e) => {
  const text = url_text.value;
  const validUrl = validateURL(text);

  if (!validUrl) {
    url_text.value = "";
    url_text.placeholder = "Please enter valid url (https://www.google.com)";
    return;
  }

  const response = await data.scrapeSite(text);

  document.getElementById("res").innerHTML = response;

};
