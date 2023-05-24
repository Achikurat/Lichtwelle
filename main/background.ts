import { app, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { IpcMessageType } from "../lib/enums";
import Store from "electron-store";
import { handleReloadFixtureDefinitions } from "./helpers/handleIPC";
import path from "path";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  Store.initRenderer();

  const loadinScreen = createWindow("load", {
    width: 600,
    height: 400,
    roundedCorners: false,
    autoHideMenuBar: true,
    frame: false,
  });
  loadinScreen.center();

  loadinScreen.loadFile(
    path.join(__dirname, "../main/helpers/loadingScreen.html")
  );

  const mainWindow = createWindow("main", {
    width: 600,
    height: 400,
    show: false,
    autoHideMenuBar: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  loadinScreen.hide();

  mainWindow.center();
  mainWindow.maximize();
  mainWindow.show();

  ipcMain.handle(IpcMessageType.OpenDirectoryPrompt, async (event, ...args) => {
    return await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle(
  IpcMessageType.ReloadFixtureDefinitions,
  async (event, ...args) => {
    return await handleReloadFixtureDefinitions(args[0] as string);
  }
);

ipcMain.on(IpcMessageType.SessionStateChange, (event, ...args) => {
  console.log("Engine Update", args);
});
