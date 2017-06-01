const _ = require('lodash');
const fp = require('lodash/fp')
const {ipcMain:ipc} = require("electron")

const map = require("./map")
const assets = require("../assets")
const {update:playerUpdate} = require("./player")

//CONSTANTS
const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 //How many milliseconds to wait between frames

//STATE VARIABLES
//var currentLoop
//var gameState
//var renderWindow

const gameInit = window => {
    renderWindow = window
    gameState = assets.config
    mapstate = map.init(assets.maps[gameState.map])
    gameState = {
        ...gameState,
        map:mapstate,
        window:window
    }
       return gameState
    //Load assets and config and initialize from there
}

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const runUpdate = state => updatePlayers(state) //STUB, to be modified

const onLoop = runState => _ => {
    runState.gameState = runUpdate(runState.gameState)
    if(!runState.running || runState.tick == lastTick) {
        clearInterval(runState.currentLoop)
    } else {
        runState.gameState.window.webContents.send('render-map',runState.gameState)
    }
    gameState.tick++
}

const startLoop = gameState => {
    //Closure to store the mutating state
    runState = {
        gameState:gameState,
        tick:0,
        running:true
    }
    gameState.window.once('ready-to-show', _ => {
        runState['currentLoop'] = setInterval(onLoop(runState),interval)
        ipc.once('rendered',(_,mapState) => {
            gameState.window.show()
        })
    })
    return runState
}

const stopRun = runState => {
    runState.gameState.window = null;
    clearInterval(runState.currentLoop)
    renderWindow = null
}

//EXPORTS
module.exports.init = gameInit
module.exports.gameStop = stopRun
module.exports.startLoop = startLoop
