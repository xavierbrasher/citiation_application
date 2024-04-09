import "./index.css";

const bibtex_input_button = document.getElementById(
  "custom_bibtex_input_button"
);
const submit_button = document.getElementById("submit_button");
const url_text = document.getElementById("url_text");
const bibtex_input = document.getElementById("bibtex_input");
const bibtex_submit = document.getElementById("bibtex_submit");

bibtex_submit.onclick = async (e) => {
  const text = bibtex_input.value;
  const validBibtex = true;

  if (!validBibtex) {
    bibtex_input.value = "";
    bibtex_input.placeholder = "Please enter valid bibtex";
    return;
  }

  const response = await data.scrapeBibtex(text);

  // document.getElementById("res").innerHTML = response;
  addToHistory(response);
  router(e, "home");
};

bibtex_input.addEventListener("input", (ev) => {
  auto_grow(ev.target);
});

bibtex_input_button.addEventListener("click", (ev) => {
  router(ev, "custom_bibtex_input");
});
url_text.value = "https://www.jstor.org/stable/26057991";
const history = [];

type data = {
  scrapeSite: (url: string) => any;
};

function router(e: any, route: string) {
  // Get all elements with class="tabcontent" and hide them
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].className = "tabcontent hidden";
  }
  const newRoute = document.getElementById(route);
  console.log(newRoute);

  newRoute.className = "tabcontent";
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

  // document.getElementById("res").innerHTML = response;
  addToHistory(response);
};

function addToHistory(newItem: string) {
  // can you change this to add it to top of list
  history.unshift(newItem);
  const historyList = document.getElementById("history");
  const li = document.createElement("li");
  li.innerHTML = newItem;
  historyList.innerHTML = li.outerHTML + historyList.innerHTML;
}
function validateURL(url: string) {
  return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
    url
  );
}

function auto_grow(element: any) {
  element.style.height = "2rem";
  element.style.height = element.scrollHeight + "px";
}
