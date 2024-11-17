import "./index.css";
const bibtex_input_button = document.getElementById(
  "custom_bibtex_input_button",
);

const submit_button = document.getElementById("submit_button");
const error_field = document.getElementById("error_field");
const submit_form = document.getElementById("url_form");
const url_text = document.getElementById("url_text");
const bibtex_input = document.getElementById("bibtex_input");
const bibtex_submit = document.getElementById("bibtex_submit");
const bibtex_back = document.getElementById("bibtex_back");
const clear_history = document.getElementById("clear_history");
let li_items = document.getElementsByName("li_element");

bibtex_back.onclick = (e: any) => {
  router(e, "home");
};

const load_startup = async () => {
  const loaded_citations = await data.readCitationData().then((
    data: string[],
  ) => data);

  for (const citation of loaded_citations) {
    addToHistory(citation);
  }
};

load_startup().then(() => {
  console.log("done");
});

bibtex_submit.onclick = async (e) => {
  const text = bibtex_input.value;
  const validBibtex = true;

  const response = await data.scrapeBibtex(text);
  if (response != "ERROR BAM") { // document.getElementById("res").innerHTML = response;
    addToHistory(response);
    router(e, "home");
    bibtex_input.value = "";
  } else {
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

let history = [];

type data = {
  scrapeSite: (url: string) => any;
};

function router(e: any, route: string) {
  // Get all elements with class="tabcontent" and hide them
  const tabcontents = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontents.length; i++) {
    tabcontents[i].className = "tabcontent hidden";
  }
  const newRoute = document.getElementById(route);
  // console.log(newRoute);

  newRoute.className = "tabcontent";
}

submit_form.onsubmit = async (e) => {
  e.preventDefault();
  const text = url_text.value;

  const validUrl = validateURL(text);

  if (!validUrl) {
    url_text.value = "";
    url_text.placeholder = "Please enter valid url (https://www.google.com)";
    return;
  }

  const response = await data.scrapeSite(text);

  if (typeof response == "number") {
    if (response == 403) {
      error_field.innerHTML = response.toString() +
        " Try a different network connection. Your network may be blocked by JSTOR.";
      return;
    }
    error_field.innerHTML = response.toString();
    return;
  } else {
    error_field.innerHTML = "";
    url_text.value = ""
  }

  // document.getElementById("res").innerHTML = response;
  addToHistory(response);
};

function click(e) {
  alert("Copied to Clipboard");
  data.copy(e.target.innerHTML);
}

function addToHistory(newItem: string) {
  history.unshift(newItem); // unshift adds it to the top of an array
  const historyList = document.getElementById("history");
  const li = document.createElement("li");
  li.innerHTML = newItem;
  li.onclick = click;

  historyList.prepend(li); // prepend adds it to the top of the tree
}

function validateURL(url: string) {
  return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
    .test(
      url,
    );
}

function auto_grow(element: any) {
  element.style.height = "2rem";
  element.style.height = element.scrollHeight + "px";
}

clear_history.onclick = (e: any) => {
  history = [];
  const historyList = document.getElementById("history");
  historyList.innerHTML = "";
  data.clearHistory();
};
