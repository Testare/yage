const electron = require("electron");
const {Menu,app, BrowserWindow, ipcMain: ipc} = electron;
const game = require("../build/game")
const assets = require('../assets')
const {resolution:[resWidth,resHeight]} = assets.config

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
    game.gameInit(mainWindow)

    mainWindow.loadURL(`file://${__dirname}/main-window.html`);

    mainWindow.on("close", _ => {
        game.gameStop()
        mainWindow = null
    })
})
