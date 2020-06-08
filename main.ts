import { join } from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, IpcMessageEvent, remote } from 'electron';
import { bios, baseboard, chassis, system, wifiNetworks, getStaticData, getDynamicData } from 'systeminformation';
import * as si from 'systeminformation';
import * as fis from 'fetch-installed-software';




const ENVIRONMENT = process.env.ELECTRON_ENV || 1;
const ELECTRON_ENV_TEST = process.env.ELECTRON_ENV_TEST ? true : false;
// const ENVIRONMENT = ENVIRONMENT1.toString();
const ANGULAR_SERVE = 'http://localhost:4200';
const FILE = `file://${join(__dirname, 'angular/index.html')}`;
let mainWindow: Electron.BrowserWindow;

console.log(FILE)
console.log(ELECTRON_ENV_TEST)

const dev = ENVIRONMENT === 1 ? false : true;
// if (dev) { 
//   try { 
//       require('electron-reloader')(module, { 
//           debug: true, 
//           watchRenderer: true
//       }); 
//   } catch (_) { console.log('Error'); }     
// } 

function createWindow() {
  // Initialize the window to our specified dimensions
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
  dev ? mainWindow.loadURL(ANGULAR_SERVE) : mainWindow.loadURL(FILE) ;

  // Show dev tools
  // Remove this line before distributing
  if (dev) {
    mainWindow.webContents.openDevTools();
  }

  // Remove window once app is closed
  mainWindow.on('closed', () => mainWindow = null);

  // const env = process.env.NODE_ENV || 'development';
  activeDevToolsListner();
  getInfo();
  wifi();
  generale();

  // mainWindow.setMenu(null);


  // mainWindow.setFullScreen(true);
  // mainWindow.maximize();

  

}

// let softwares = (fis.getAllInstalledSoftwareSync() as any[]).filter(e => {
//               // console.log(e.RegistryDirName)
//               // console.log('>>>>>>>>>>>>>>>>>>', (e.RegistryDirName as string).startsWith(`{`))
//               return !(e.RegistryDirName as string).startsWith(`{`);
//             })
// console.log(softwares.map((e, i) => i +'---'+ e.RegistryDirName), softwares.length)



async function getInfo() {
  // const softwares = (fis.getAllInstalledSoftwareSync() as any[]).filter(e => {
  //   // console.log(e)
  //   return true || !(e.RegistryDirName as string).startsWith(`'{`);
  // })
  
  console.log('call 1')
  ipcMain.on('getInfo', async (event, r) => {
    // mainWindow.webContents.openDevTools();
    const all = {
      // generalStaticData: await si.get,
      generalStaticData: await si.getStaticData(),
      memoire: await si.mem(),
      // system: await si.system(),
      // bios: await si.bios(),
      // baseboard: await si.baseboard(),
      // chassis: await si.chassis(),
      wifiNetworks: await si.wifiNetworks(),
      softwares: (fis.getAllInstalledSoftwareSync() as any[]).filter(e => !(e.RegistryDirName as string).startsWith(`{`)),
    };
    console.log('call 2')

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

function activeDevToolsListner() {
  ipcMain.on('main', (event, r) => {
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('page', 'i did click for you');
  });
}


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
