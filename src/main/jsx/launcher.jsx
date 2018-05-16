const path = require("path");
const {app, BrowserWindow, ipcMain: ipc } = require("electron")

let gameWindow;
const PRODUCTION = false

const startWhenReady = assetPath => {
    const safeAssetPath = path.resolve(
        __dirname,
        "../",
        assetPath
    )
    ipc.on('get-assets', (event, arg)=> {
        event.returnValue=safeAssetPath;
    })
    const assets = require('./loader').loadAssetsFromPath(safeAssetPath)
    app.on("ready", _ => {
        gameWindow = launchGame(assets)
    })
}

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
    window = null
}

process.argv.forEach((value,index)=>console.log(index + ":" + value));

if (require.main === module) {
    const asset_path = (process.argv.length > 2) 
            ? process.argv[2]
            : 'assets';
    startWhenReady(asset_path)
}

module.exports = startWhenReady
