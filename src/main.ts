import { app, BrowserWindow, clipboard, ipcMain } from "electron";
import path from "path";
import getCitationData from "./util/scraping";
import { parseData } from "./util/cite";
import { readFileSync } from "fs";
import parseBibtext, { BibtextType } from "./util/bibtextToJson";
import { read_cite_data, save_cite_data } from "./util/saveCitations";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
  mainWindow.title = "Citation Application";
  mainWindow.center();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

let citations: BibtextType[] = [];

ipcMain.handle("scrapeSite", async (event, url: string) => {
  const citation_data = await getCitationData(url);
  if (typeof citation_data == "number") {
    return citation_data;
  }
  citations = [...citations, citation_data];
  save_cite_data(citations);
  return parseData(citation_data);
});

ipcMain.handle("getFileData", async (event, view: string) => {
  return readFileSync(+__dirname + "/..//" + view, "utf-8");
});

ipcMain.handle("scrapeBibtex", async (event, bibtex: string) => {
  try {
    const parsed = parseBibtext(bibtex);
    const cited = parseData(parsed);
    citations = [...citations, parsed];
    save_cite_data(citations);
    return cited;
  } catch (e) {
    return "ERROR BAM";
  }
});

ipcMain.handle("copy", (event, text: string) => {
  clipboard.writeHTML(text);
});

ipcMain.handle("saveCitationData", async (event) => {
  save_cite_data(citations);
});

ipcMain.handle("readCitationData", async (event) => {
  citations = await read_cite_data();
  let parsedCitations: string[] = [];
  for (let i = 0; i < citations.length; i++) {
    parsedCitations = [...parsedCitations, parseData(citations[i])];
  }

  return parsedCitations;
});

ipcMain.handle("clearHistory", () => {
  citations = [];
  save_cite_data(citations);
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
