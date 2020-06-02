import { join } from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, IpcMessageEvent, remote } from 'electron';
import { bios, baseboard, chassis, system, wifiNetworks, getStaticData, getDynamicData } from 'systeminformation';
const ENVIRONMENT = process.env.ELECTRON_ENV || 1;
// const ENVIRONMENT = ENVIRONMENT1.toString();
const ANGULAR_SERVE = 'http://localhost:4200';
const FILE = `file://${join(__dirname, 'angular/index.html')}`;
let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Initialize the window to our specified dimensions
  const dev = ENVIRONMENT === 1 ? false : true;
  const prod = !dev;
  mainWindow = new BrowserWindow({
    width: 1700,
    height: 1000,
    transparent: prod,
    frame: dev,
    // icon: __dirname + 'icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  });
  // load the dist folder from Angular
  prod ? mainWindow.loadURL(FILE) : mainWindow.loadURL(ANGULAR_SERVE);

  // Show dev tools
  // Remove this line before distributing
  if (dev) {
    mainWindow.webContents.openDevTools();
  }

  // Remove window once app is closed
  mainWindow.on('closed', () => mainWindow = null);


  activeDevToolsListner();
  getInfo();
  wifi();
  generale();

  // mainWindow.setMenu(null);


  // mainWindow.setFullScreen(true);
  // mainWindow.maximize();
}

function activeDevToolsListner() {
  ipcMain.on('main', (event, r) => {
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('page', 'i did click for you');
  });
}

async function getInfo() {
  const all = {
    system: await system(),
    bios: await bios(),
    baseboard: await baseboard(),
    chassis: await chassis(),
    wifiNetworks: await wifiNetworks(),
  };
  ipcMain.on('getInfo', (event, r) => {
    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('angular', all);
  });
}

async function wifi() {
  ipcMain.on('wifi', async (event, r) => {
    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('angular', await wifiNetworks());
  });
}

async function generale() {
  send('generale', { staticData: await getStaticData(), dynamicData: await getDynamicData() });
}

function send(listningRoute: string, data: any) {
  ipcMain.on(listningRoute, (event, r) => {
    mainWindow.webContents.send('angular', data);
  });
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
