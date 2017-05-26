var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = require("react");
const ReactDOM = require("react-dom");
const example_map = require("../assets/maps/default");
const Map = require("./map");
const Game = require("./game");
const transform = require("./transform");
window.assets = require("../assets");

console.log(window.assets);

const gameLoop = map => {
    var tick = 0;
    var loop = setInterval(_ => {
        map.setState(prevState => {
            updatedSprites = prevState.sprites.map(spr => {
                const incr = inc => oldVal => (oldVal || 0) + inc;
                return transform(spr, { x: incr(30), y: incr(10) });
                //return Object.assign({},spr,{x:newX,y:newY})
            }); //.slice(1)
            return {
                sprites: updatedSprites
            };
        });
        tick++;
        if (tick === 1) {
            clearInterval(loop);
        }
    }, 1000);
};

ReactDOM.render(React.createElement(Map, _extends({ ref: gameLoop }, example_map)), document.getElementById("react-mount"));