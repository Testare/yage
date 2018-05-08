const path = require("path");
const asset_path = path.join(__dirname, (process.argv.length > 2) ? path.join("../", process.argv[2]) : '../assets');
const assets = require('./loader').loadAssetsFromPath(asset_path)
//const assets = require(asset_path)(asset_path)
const {app, BrowserWindow, ipcMain: ipc } = require("electron")

let gameWindow;
const PRODUCTION = false

ipc.on('get-assets', (event, arg)=> {
    event.returnValue=asset_path;
})

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
    window.loadURL(`file://${__dirname}/main-window.html`)
    window.once('ready-to-show', (PRODUCTION)? (
        _ => (
            ipc.once('rendered', _ => (
                window.show()
            ))
        )) : (
            _ => window.show()
        )
    )
    window.on("close", _ => {
        stopGame()
    })
    ipc.once('game-finished', _=> {
        window.destroy()
        stopGame()
    })
    return window
}

const stopGame = window => {
    // window.webContents.send('stop-game',1)
    window = null
}