// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("data", {
  scrapeSite: (url: string) => ipcRenderer.invoke("scrapeSite", url),
  getFileData: (view: string) => ipcRenderer.invoke("getFileData", view),
  scrapeBibtex: (bibtex: string) => ipcRenderer.invoke("scrapeBibtex", bibtex),
  readCitationData: () => ipcRenderer.invoke("readthing"),
}) 
