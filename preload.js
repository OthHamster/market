const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
});
contextBridge.exposeInMainWorld("API", {
  login: (id, psw) => ipcRenderer.invoke("log", id, psw),
  logout: () => ipcRenderer.invoke("logout"),
  me: () => ipcRenderer.invoke("me"),
  per: () => ipcRenderer.invoke("per"),
  sender: (data, api) => ipcRenderer.invoke("sender", data, api),
  setdata: (key, value) => ipcRenderer.invoke("set-data", key, value),
  getdata: (key) => ipcRenderer.invoke("get-data", key),
  getUrl: () => ipcRenderer.invoke("getUrl"),
  setUrl: (url) => ipcRenderer.invoke("setUrl", url),
  relaunchApp: () => ipcRenderer.invoke("relaunchApp", url),
});
