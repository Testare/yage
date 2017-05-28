var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const _ = require('lodash');
const React = require("react");
const ReactDOM = require("react-dom");

const DrawMap = require("./draw-map");

const map = require("./map");
const transform = require("./transform");
const assets = require("../assets");
const { update: playerUpdate } = require("./player");

const updatePlayers = (_ref) => {
    let { spriteList } = _ref,
        mapState = _objectWithoutProperties(_ref, ["spriteList"]);

    return _extends({}, mapState, {
        spriteList: _.mapValues(spriteList, (_ref2) => {
            let { player } = _ref2,
                spr = _objectWithoutProperties(_ref2, ["player"]);

            return _extends({}, spr, {
                player: playerUpdate(player) });
        }) });
};
window.updatePlayers = updatePlayers;
var currentLoop;

const gameLoop = map => {
    //Perhaps a bit a of a naive loop...
    var mapState = map;
    window.mapState = map;
    var tick = 3;
    const lastTick = -1; //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
    const interval = 17; //How many milliseconds to wait between frames
    currentLoop = setInterval(_ => {
        var nextMapState = updatePlayers(mapState);
        console.log(tick);
        console.log("+", new Date().getTime());
        window.mapState = nextMapState;
        mapState = nextMapState;
        renderMap(nextMapState, _ => console.log("-", new Date().getTime()));
        if (tick === lastTick) {
            clearInterval(currentLoop);
        }
        tick++;
    }, interval);
    window.currentLoop = currentLoop;
};

const renderMap = (mapState, callback = false) => {
    const map = React.createElement(DrawMap, mapState);
    if (callback) {
        ReactDOM.render(map, document.getElementById("game-mount"), _ => {
            callback(mapState, map);
        });
    } else {
        ReactDOM.render(map, document.getElementById("game-mount"));
    }
};

module.exports.loadMap = mapName => {
    clearInterval(currentLoop);
    renderMap(map.init(assets.maps[mapName]), gameLoop);
};

module.exports.renderMap = renderMap;