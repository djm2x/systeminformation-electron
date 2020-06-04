"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = require("path");
var electron_1 = require("electron");
var systeminformation_1 = require("systeminformation");
var ENVIRONMENT = process.env.ELECTRON_ENV || 1;
var ELECTRON_ENV_TEST = process.env.ELECTRON_ENV_TEST ? true : false;
// const ENVIRONMENT = ENVIRONMENT1.toString();
var ANGULAR_SERVE = 'http://localhost:4200';
var FILE = "file://" + path_1.join(__dirname, 'angular/index.html');
var mainWindow;
console.log(FILE);
console.log(ELECTRON_ENV_TEST);
function createWindow() {
    // Initialize the window to our specified dimensions
    var dev = ENVIRONMENT === 1 ? false : true;
    var prod = !dev;
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        transparent: prod,
        frame: dev,
        // icon: __dirname + 'icon.png',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // load the dist folder from Angular
    prod || ELECTRON_ENV_TEST ? mainWindow.loadURL(FILE) : mainWindow.loadURL(ANGULAR_SERVE);
    // Show dev tools
    // Remove this line before distributing
    if (dev) {
        mainWindow.webContents.openDevTools();
    }
    // Remove window once app is closed
    mainWindow.on('closed', function () { return mainWindow = null; });
    activeDevToolsListner();
    getInfo();
    wifi();
    generale();
    // mainWindow.setMenu(null);
    // mainWindow.setFullScreen(true);
    // mainWindow.maximize();
}
function activeDevToolsListner() {
    electron_1.ipcMain.on('main', function (event, r) {
        mainWindow.webContents.openDevTools();
        mainWindow.webContents.send('page', 'i did click for you');
    });
}
function getInfo() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var all, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, systeminformation_1.system()];
                case 1:
                    _a.system = _b.sent();
                    return [4 /*yield*/, systeminformation_1.bios()];
                case 2:
                    _a.bios = _b.sent();
                    return [4 /*yield*/, systeminformation_1.baseboard()];
                case 3:
                    _a.baseboard = _b.sent();
                    return [4 /*yield*/, systeminformation_1.chassis()];
                case 4:
                    _a.chassis = _b.sent();
                    return [4 /*yield*/, systeminformation_1.wifiNetworks()];
                case 5:
                    all = (_a.wifiNetworks = _b.sent(),
                        _a);
                    electron_1.ipcMain.on('getInfo', function (event, r) {
                        // mainWindow.webContents.openDevTools();
                        mainWindow.webContents.send('angular', all);
                    });
                    return [2 /*return*/];
            }
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
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
