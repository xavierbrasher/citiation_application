"use strict";
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('data', {
    scrapeSite: (url) => electron_1.ipcRenderer.invoke('scrapeSite', url)
    // we can also expose variables, not just functions
});
//# sourceMappingURL=preload.js.map