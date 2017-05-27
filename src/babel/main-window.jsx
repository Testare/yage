const React = require("react")
const ReactDOM = require("react-dom")
const DrawMap = require("./draw-map")

const example_map = require("../assets/maps/default")
const map = require("./map")

const transform = require("./transform")
const assets = require("../assets")
window.assets = assets //This is just so I can refer to assets in the console log

const gameLoop = (map) => {
    var tick = 0
    var loop = setInterval( _ => {
            map.setState( (prevState) => {
            updatedSprites = prevState.sprites.map((spr) => {
                const incr = (inc) => (oldVal) => ((oldVal || 0) + inc)
                return transform(spr,{x:incr(30),y:incr(10)})
                //return Object.assign({},spr,{x:newX,y:newY})
            }) //.slice(1)
            return {
                sprites:updatedSprites
            }
        })
        tick++
        if(tick === 1) {
            clearInterval(loop);
        }
    }, 1000)
}

const gameStop = (x) => {window.gameState=x}
const dungeon = map.init(assets.maps["dungeon"])
window.dungeon = dungeon
ReactDOM.render(<div id="draw-viewport"><DrawMap ref={gameStop} {...dungeon} /></div>,document.getElementById("react-mount"));
