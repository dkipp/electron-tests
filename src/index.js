import { app, BrowserWindow, Menu } from "electron";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let template = [
  {
    label: "App",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
      { role: "minimize" },
      { role: "close" }
    ]
  },
  {
    label: "PDF.js",
    submenu: [
      {
        label: "Basic Setup",
        click: (item, focusedWindow) => {
          mainWindow.loadURL(`file://${__dirname}/pdfjs/setup.html`);
        }
      },
      {
        label: "All Pages",
        click: (item, focusedWindow) => {
          mainWindow.loadURL(`file://${__dirname}/pdfjs/pages.html`);
        }
      }
    ]
  },
  {
    label: "CSS",
    submenu: [
      {
        label: "Grid Layout",
        submenu: [
          {
            label: "basics",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(`file://${__dirname}/css/grids/basics.html`);
            }
          },
          {
            label: "pattern",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(`file://${__dirname}/css/grids/pattern.html`);
            }
          }
        ]
      },
      {
        label: "3D transforms",
        submenu: [
          {
            label: "basics",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/css/3DTransforms/basics.html`
              );
            }
          }
        ]
      }
    ]
  },
  {
    label: "Babylonjs",
    submenu: [
      {
        label: "setup"
      }
    ]
  }
];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
