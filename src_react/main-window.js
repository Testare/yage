const React = require("react")
const ReactDOM = require("react-dom")
const example_map = require("../assets/maps/default")
const Map = require("./map")
const Game = require("./game")
const transform = require("./transform")
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

ReactDOM.render(<Map ref={gameLoop} {...example_map}/>,document.getElementById("react-mount"));
