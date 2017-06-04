const assets = require('../assets')
const {app, BrowserWindow, ipcMain: ipc } = require("electron")

let gameWindow;

app.on("ready", _ => {
    gameWindow = launchGame(assets)
})

const createWindow = ({ resolution: [resWidth, resHeight] }) => new BrowserWindow({
    autoHideMenuBar: true,
    useContentSize: true,
    height: resHeight + 6,
    width: resWidth + 6,
    show: false
})

const launchGame = assets => {
    let window = createWindow(assets.config)
    window.loadURL(`file://${__dirname}/../docs/main-window.html`)
    window.once('ready-to-show', _ => (
        ipc.once('rendered', _ => (
            window.show()
        ))
    ))
    window.on("close", _ => {
        stopGame()
    })
    return window
}

const stopGame = window => {
    // window.webContents.send('stop-game',1)
    window = null
}

