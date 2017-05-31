const _ = require('lodash');
const fp = require('lodash/fp')
const {ipcRenderer:ipc} = require("electron")

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
module.exports.loadMap = (mapName, window) => {
    clearInterval(currentLoop)
    renderWindow = window
    window.webContents.send('render-map',map.init(assets.maps[mapName]))
}

module.exports.gameLoop = gameLoop
module.exports.gameStop = gameStop
