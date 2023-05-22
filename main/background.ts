import { app, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { IpcMessageType } from "../lib/enums";
import Store from "electron-store";
import { handleReloadFixtureDefinitions } from "./helpers/handleIPC";
import { PersistentSettings } from "../lib/types";
import { StyleKeyframesDefinition } from "framer-motion";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  Store.initRenderer();

  const mainWindow = createWindow("main", {
    width: 1600,
    height: 900,
    autoHideMenuBar: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

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
    console.log("1234");

    console.log(await handleReloadFixtureDefinitions(args[0] as string));
    console.log("4321");

    return await handleReloadFixtureDefinitions(args[0] as string);
  }
);

ipcMain.on(IpcMessageType.SessionStateChange, (event, ...args) => {
  console.log("Engine Update", args);
});
