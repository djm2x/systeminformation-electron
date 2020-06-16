"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = require("path");
var electron_1 = require("electron");
var systeminformation_1 = require("systeminformation");
var si = require("systeminformation");
var fis = require("fetch-installed-software");
var ENVIRONMENT = process.env.ELECTRON_ENV || 1;
var ELECTRON_ENV_TEST = process.env.ELECTRON_ENV_TEST ? true : false;
// const ENVIRONMENT = ENVIRONMENT1.toString();
var ANGULAR_SERVE = 'http://localhost:4200';
var FILE = "file://" + path_1.join(__dirname, 'angular/index.html');
var mainWindow;
console.log(FILE);
console.log(ELECTRON_ENV_TEST);
var dev = ENVIRONMENT === 1 ? false : true;
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
    var prod = !dev;
    mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        // backgroundColor: '#303030',
        transparent: prod,
        titleBarStyle: 'customButtonsOnHover',
        frame: dev,
        // show: false,
        // icon: __dirname + 'icon.png',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // load the dist folder from Angular
    dev ? mainWindow.loadURL(ANGULAR_SERVE) : mainWindow.loadURL(FILE);
    // Show dev tools
    // Remove this line before distributing
    if (dev) {
        mainWindow.webContents.openDevTools();
    }
    // Remove window once app is closed
    mainWindow.on('closed', function () { return mainWindow = null; });
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
function getInfo() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            // const softwares = (fis.getAllInstalledSoftwareSync() as any[]).filter(e => {
            //   // console.log(e)
            //   return true || !(e.RegistryDirName as string).startsWith(`'{`);
            // })
            console.log('call 1');
            electron_1.ipcMain.on('getInfo', function (event, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var all, _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {};
                            return [4 /*yield*/, si.getStaticData()];
                        case 1:
                            all = (
                            // generalStaticData: await si.get,
                            _a.generalStaticData = _b.sent(),
                                // memoire: await si.mem(),
                                // system: await si.system(),
                                // bios: await si.bios(),
                                // baseboard: await si.baseboard(),
                                // chassis: await si.chassis(),
                                // wifiNetworks: await si.wifiNetworks(),
                                _a.softwares = fis.getAllInstalledSoftwareSync().filter(function (e) { return !e.RegistryDirName.startsWith("{"); }),
                                _a);
                            console.log('call 2');
                            mainWindow.webContents.send('angular', all);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function wifi() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            electron_1.ipcMain.on('wifi', function (event, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            // mainWindow.webContents.openDevTools();
                            _b = (_a = mainWindow.webContents).send;
                            _c = ['angular'];
                            return [4 /*yield*/, systeminformation_1.wifiNetworks()];
                        case 1:
                            // mainWindow.webContents.openDevTools();
                            _b.apply(_a, _c.concat([_d.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function generale() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = send;
                    _b = ['generale'];
                    _c = {};
                    return [4 /*yield*/, systeminformation_1.getStaticData()];
                case 1:
                    _c.staticData = _d.sent();
                    return [4 /*yield*/, systeminformation_1.getDynamicData()];
                case 2:
                    _a.apply(void 0, _b.concat([(_c.dynamicData = _d.sent(), _c)]));
                    return [2 /*return*/];
            }
        });
    });
}
function send(listningRoute, data) {
    electron_1.ipcMain.on(listningRoute, function (event, r) {
        mainWindow.webContents.send('angular', data);
    });
}
function activeDevToolsListner() {
    electron_1.ipcMain.on('main', function (event, r) {
        mainWindow.webContents.openDevTools();
        mainWindow.webContents.send('page', 'i did click for you');
    });
}
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
