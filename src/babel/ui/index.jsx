//RENDER PROCESS
const React = require("react")
const ReactDOM = require("react-dom")
const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")

const renderMap = (gameState,callback) => {
    //console.log("draw.renderMap+")
    //console.log((new Date()).getMilliseconds())
    return ReactDOM.render(<DrawMap {...gameState} />,document.getElementById("game-mount"),callback)
}

//EXPORTS
module.exports.renderMap = renderMap
