const electron = require("electron");
const fp = require('lodash/fp')
const game = require("../build/game")
const assets = require('../assets')
const { Menu, app, BrowserWindow, ipcMain: ipc } = electron;
const { update: playerUpdate } = require("./player")

const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 //How many milliseconds to wait between frames
let mainState;

app.on("ready", _ => {
    mainState = startRun(game.init(assets))
})

const createWindow = ({ resolution: [resWidth, resHeight] }) => new BrowserWindow({
    autoHideMenuBar: true,
    useContentSize: true,
    height: resHeight + 7,
    width: resWidth + 7,
    show: false
})

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const runUpdate = state => updatePlayers(state) //STUB, to be modified

const onLoop = runState => _ => {
    runState.gameState = runUpdate(runState.gameState)
    if (!runState.running || runState.tick == lastTick) {
        clearInterval(runState.currentLoop)
    } else {
        runState.window.webContents.send('render-map', runState.gameState)
    }
    runState.tick++
    console.log((new Date()).getMilliseconds())
}

const startRun = gameState => {
    //Closure to store the mutating state
    runState = {
        window:createWindow(assets.config),
        gameState: gameState,
        tick: 0,
        running: true
    }
    runState.window.loadURL(`file://${__dirname}/../docs/main-window.html`);
    runState.window.once('ready-to-show', _ => {
        runState['currentLoop'] = setInterval(onLoop(runState), interval)
        ipc.once('rendered', (_, mapState) => {
            runState.window.show()
        })
    })
    runState.window.on("close", _ => {
        stopRun(runState)
        mainWindow = null
    })
    return runState
}

const stopRun = runState => {
    runState.window = null
    clearInterval(runState.currentLoop)
    renderWindow = null
}
