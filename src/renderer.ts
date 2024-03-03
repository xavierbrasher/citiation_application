/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

type data = {
    scrapeSite: (url: string) => any
}

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const submit_button = document.getElementById("submit_button")
const url_text = document.getElementById("url_text")

function validateURL(url: string) {
    return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)
}


submit_button.onclick = async (e) => {
    const text = url_text.value;
    const validUrl = validateURL(text)

    if (!validUrl) {
        url_text.value = ""
        url_text.placeholder = "Please enter valid url (https://www.google.com)"
        return
    }

    const response: any = data.scrapeSite(text)
}