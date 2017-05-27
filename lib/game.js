var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = require("react");
const ReactDOM = require("react-dom");
const DrawMap = require("./draw-map");

const map = require("./map");
const transform = require("./transform");
const assets = require("../assets");

const gameLoop2 = map => {
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
module.exports.loadMap = mapName => {
    const gameStop = x => {
        window.gameState = x;
    };
    const dungeon = map.init(assets.maps[mapName]);
    ReactDOM.render(React.createElement(DrawMap, _extends({ ref: gameStop }, dungeon)), document.getElementById("react-mount"));
    window.dungeon = dungeon;
    window.assets = assets; //This is just so I can refer to assets in the console log
};