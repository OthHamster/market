const { app, BrowserWindow } = require("electron");
const { session } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const AuthService = require("./auth.js");
const { sqlSender } = require("./sql.js");
const urlStore = require("./urlconfig.js").default;
let mainWindow;
console.log(urlStore.getUrl());
function createWindow() {
  const defaultSession = session.defaultSession;
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
  //mainWindow.webContents.openDevTools();

  mainWindow.on("close", async (event) => {
    console.log("窗口即将关闭...");

    event.preventDefault();
    try {
      await AuthService.logout();
      mainWindow.destroy();
    } catch (error) {
      mainWindow.destroy();
    }
  });
  mainWindow.setMenu(null);
}

ipcMain.handle("log", async (event, id, psw) => {
  let user;
  try {
    console.log(`收到登录请求，id: ${id}`);
    user = await AuthService.login(id, psw);
    console.log("登录成功，用户:", user);
    console.log("AuthService.role:", AuthService.role);
    const role = AuthService.role;
    if (role && role.includes("inventory")) {
      mainWindow.loadFile("./inventory/inventory.html");
    } else if (role && role.includes("manager")) {
      mainWindow.loadFile("./manager/manager.html");
    } else if (role && role.includes("cashier")) {
      mainWindow.loadFile("./cashier/cashier.html");
    } else {
      mainWindow.loadFile("./index.html");
    }
    return {
      success: true,
      user: user,
      role: role,
    };
  } catch (error) {
    console.error("登录过程中出错:", error);
    return {
      success: false,
      error: error.message,
    };
  }
});
ipcMain.handle("logout", () => {
  return AuthService.logout();
});
ipcMain.handle("me", () => {
  return AuthService.getCurrentUser();
});
ipcMain.handle("per", () => {
  return AuthService.perTest();
});
ipcMain.handle("sender", async (event, data, api) => {
  try {
    console.log(`发送`);
    const res = sqlSender(data, api);
    return res;
  } catch (error) {
    console.error("发送过程中出错:", error);
    mainWindow.loadFile("./login.html");
    return error.message;
  }
});
let globalSharedData = {};
ipcMain.handle("set-data", (event, key, value) => {
  globalSharedData[key] = value;
  return true;
});
ipcMain.handle("get-data", (event, key) => {
  return globalSharedData[key];
});
ipcMain.handle("setUrl", (event, url) => {
  urlStore.setUrl(url);
  return;
});
ipcMain.handle("getUrl", (event) => {
  return urlStore.getUrl();
});
ipcMain.handle("relaunchApp", (event) => {
  app.relaunch();
  app.exit(0);
  return;
});
app.whenReady().then(createWindow);
