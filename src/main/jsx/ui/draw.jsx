const React = require("react")
const ReactDOM = require("react-dom")
const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")
const input = require("./input")

const renderMap = (gameState, callback) => {
    return ReactDOM.render(<DrawMap {...gameState} />,document.getElementById("game-mount"),callback)
}


module.exports.renderMap = renderMap
