const electron = require("electron");
const {Menu,app, BrowserWindow, ipcMain: ipc} = electron;
const {resolution:[resWidth,resHeight]} = require("../assets/gameConfig")
let mainWindow;
app.on("ready",_ => {
    mainWindow = new BrowserWindow({
        autoHideMenuBar:true,
        useContentSize:true,
        height:resHeight+6,
        width:resWidth+6,
        show:false
    })
    //Menu.setApplicationMenu(null) //Might have to get more sophisticated for macOs, cuz this won't work
    //^Will have to do when not in development mode, since it reveals the app menu on "Alt"
    //Better yet maybe: Alt for pause?
    mainWindow.once('ready-to-show',mainWindow.show)
    mainWindow.loadURL(`file://${__dirname}/main-window.html`);
    mainWindow.webContents.setZoomFactor(4)

    mainWindow.on("close", _ => {
        mainWindow = null
    })
})
