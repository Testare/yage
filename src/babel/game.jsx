const _ = require('lodash');
const fp = require('lodash/fp')
const {ipcMain:ipc} = require("electron")

const map = require("./map")
const transform = require("./transform")
const assets = require("../assets")
const {update:playerUpdate} = require("./player")
//const {renderMap} = require("./draw")

//const draw = require('./draw')

//CONSTANTS
const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 //How many milliseconds to wait between frames

//STATE VARIABLES
var currentLoop
var mapState
var renderWindow

const loadMap = (map) => {
    clearInterval(currentLoop)
    if(renderWindow)
        renderWindow.webContents.send('render-map',map)
}

const gameInit = window => {
    renderWindow = window
    gameState = assets.config
    mapstate = map.init(assets.maps[gameState.map])
    console.log(mapstate)
    window.once('ready-to-show', _ => {
        ipc.once('rendered',(_,state) => {
            gameLoop(state)
        })
        loadMap(mapstate)
        window.show()
    })
    //Load assets and config and initialize from there
}

const renderMap = mapState => {
    if(renderWindow) {
        renderWindow.webContents.send('render-map',mapState)
    }
}

const updatePlayers = fp.update('spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const runUpdate = state => updatePlayers(state) //STUB, to be modified

const gameLoop = (map) => {
    mapState = map
    var tick = 0
    currentLoop = setInterval(_ => {
        renderMap(mapState = runUpdate(mapState))
        if(!renderWindow || tick === lastTick) {
            clearInterval(currentLoop);
        }
        tick++
    }, interval)
    //window.currentLoop = currentLoop;
}

const gameStop = _ => {
    clearInterval(currentLoop)
    renderWindow = null
}

//EXPORTS
module.exports.loadMap = loadMap
module.exports.gameInit = gameInit
module.exports.gameLoop = gameLoop
module.exports.gameStop = gameStop
