require("babel-register")
const electron = require("electron");
const {app, BrowserWindow} = electron;

let mainWindow;
app.on("ready",_ => {
    mainWindow = new BrowserWindow({
        height:800,
        width:800,
    })

    mainWindow.loadURL(`file://${__dirname}/main-window.html`);

    mainWindow.on("close", _ => {
        mainWindow = null
    })
})