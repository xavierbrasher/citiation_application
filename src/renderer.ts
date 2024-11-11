import { fileURLToPath } from "node:url";
import "./index.css";

const bibtex_input_button = document.getElementById(
  "custom_bibtex_input_button"
);
const submit_button = document.getElementById("submit_button");
const error_field = document.getElementById("error_field")
const submit_form = document.getElementById("url_form");
const url_text = document.getElementById("url_text");
const bibtex_input = document.getElementById("bibtex_input");
const bibtex_submit = document.getElementById("bibtex_submit");
const bibtex_back = document.getElementById("bibtex_back");

bibtex_back.onclick = (e) => {
  router(e, "home");
};

const load_startup = async () => {
  try {
    console.log("here");
    const citaions = await data.read_cite_data();
    console.log(citaions);


    for (let i = 0; i < citaions.length(); i++) {
      addToHistory(citaions[i])
      console.log(citaions[i]);
    }
  } catch (e) {
    console.log(e);
  }
  // `text` is not available here
}

await load_startup()



bibtex_submit.onclick = async (e) => {
  const text = bibtex_input.value;
  const validBibtex = true;

  try {
    const response = await data.scrapeBibtex(text);
    // document.getElementById("res").innerHTML = response;
    addToHistory(response);
    router(e, "home");
  } catch {
    bibtex_input.value = "";
    bibtex_input.placeholder = "Please enter valid bibtex";
    return;
  }
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
  // console.log(newRoute);

  newRoute.className = "tabcontent";
}
submit_form.onsubmit = async (e) => {
  e.preventDefault()
  const text = url_text.value;

  const validUrl = validateURL(text);

  if (!validUrl) {
    url_text.value = "";
    url_text.placeholder = "Please enter valid url (https://www.google.com)";
    return;
  }

  const response = await data.scrapeSite(text);

  if (typeof response == "number") {
    error_field.innerHTML = response.toString()
    return
  }
  else {
    error_field.innerHTML = ""
  }

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

