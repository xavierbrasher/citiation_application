// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('data', {
    scrapeSite: (url: string) => ipcRenderer.invoke('scrapeSite', url)
    // we can also expose variables, not just functions
})