const _ = require('lodash');
const fp = require('lodash/fp')
const React = require("react")
const ReactDOM = require("react-dom")

const DrawMap = require("./draw-map")

const map = require("./map")
const transform = require("./transform")
const assets = require("../assets")
const {update:playerUpdate} = require("./player")

//CONSTANTS
const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 //How many milliseconds to wait between frames

//STATE VARIABLES
var currentLoop
var mapState

//TEMP FUNCS
//Probably will be changed somehow in the future, feels a bit out of place here

const updatePlayers = fp.update('spriteList', 
    fp.mapValues(fp.update('player', playerUpdate))
)

window.mapState = _ => mapState

//FUNCS
const runUpdate = state => updatePlayers(state) //STUB, to be modified


const gameLoop = (map) => {
    mapState = map
    var tick = 0
    currentLoop = setInterval(_ => {
        renderMap(mapState = runUpdate(mapState))
        if(tick === lastTick) {
            clearInterval(currentLoop);
        }
        tick++
    }, interval)
    window.currentLoop = currentLoop;
}

const renderMap = (mapState,callback=false) => (callback)?(
    ReactDOM.render(<DrawMap {...mapState} />,document.getElementById("game-mount"),_ => {
        callback(mapState)
    })
) : (
    ReactDOM.render(<DrawMap {...mapState} />,document.getElementById("game-mount"))
)
 
//EXPORTS
module.exports.renderMap = renderMap
module.exports.loadMap = mapName => {
    clearInterval(currentLoop)
    renderMap(map.init(assets.maps[mapName]), gameLoop)
}