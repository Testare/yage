const _ = require('lodash');
const React = require("react")
const ReactDOM = require("react-dom")

const DrawMap = require("./draw-map")

const map = require("./map")
const transform = require("./transform")
const assets = require("../assets")
const {update:playerUpdate} = require("./player")

const updatePlayers = ({spriteList,...mapState}) => {
    return {...mapState,
    spriteList:_.mapValues(spriteList,({player,...spr}) => {
        return {...spr,
        player:playerUpdate(player)}
    })}
}
window.updatePlayers = updatePlayers
var currentLoop;

const gameLoop = (map) => {
    //Perhaps a bit a of a naive loop...
    var mapState = map
    window.mapState = map;
    var tick = 0
    const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
    const interval = 17 //How many milliseconds to wait between frames
    currentLoop = setInterval( _ => {
        var nextMapState = updatePlayers(mapState)
        console.log(tick)
        console.log("+",new Date().getTime())
        window.mapState = nextMapState
        mapState = nextMapState
        renderMap(nextMapState,_=>console.log("-",new Date().getTime()))
        if(tick === lastTick) {
            clearInterval(currentLoop);
        }
        tick++
    }, interval)
    window.currentLoop = currentLoop;
}

const renderMap = (mapState,callback=false) => {
    const map = (<DrawMap {...mapState} />)
    if(callback){
        ReactDOM.render(map,document.getElementById("game-mount"),_ => {
            callback(mapState,map)
        });
    } else {
    ReactDOM.render(map,document.getElementById("game-mount"));
    }

} 

module.exports.loadMap = mapName => {
    clearInterval(currentLoop)
    renderMap(map.init(assets.maps[mapName]), gameLoop)
}

module.exports.renderMap = renderMap