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
            label: "Transformed Canvas",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/css/3DTransforms/transformCanvas.html`
              );
            }
          },
          {
            label: "Transformed SVG",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/css/3DTransforms/transformSVG.html`
              );
            }
          },
          {
            label: "Perspective Mapping",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/css/3DTransforms/perspectiveMapping.html`
              );
            }
          }
        ]
      },
      {
        label: "Fluent Design",
        submenu: [
          {
            label: "inspiration",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/css/Fluent-Design/inspiration.html`
              );
            }
          }
        ]
      }
    ]
  },
  {
    label: "SVG",
    submenu: []
  },
  {
    label: "Media",
    submenu: [
      {
        label: "Webcam Stream",
        click: (item, focusedWindow) => {
          mainWindow.loadURL(`file://${__dirname}/media/webcam.html`);
        }
      }
    ]
  },
  {
    label: "PDF.js",
    submenu: [
      {
        label: "Basic SVG Setup",
        click: (item, focusedWindow) => {
          mainWindow.loadURL(`file://${__dirname}/pdfjs/pages-svg.html`);
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
    label: "Vue.js",
    submenu: []
  },
  ,
  {
    label: "Babylon.JS",
    submenu: [
      {
        label: "Babylon.JS Basics",
        submenu: [
          {
            label: "Getting Started",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/babylonjs/basics/quickstart.html`
              );
            }
          },
          {
            label: "Dummy",
            click: (item, focusedWindow) => {
              mainWindow.loadURL(
                `file://${__dirname}/babylonjs/basics/dummy.html`
              );
            }
          }
        ]
      }
    ]
  },
  {
    label: "openCV",
    submenu: []
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
