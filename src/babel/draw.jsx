//RENDER PROCESS
const React = require("react")
const ReactDOM = require("react-dom")
const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")

const renderMap = (event,gameState) => {
    return ReactDOM.render(<DrawMap {...gameState} />,document.getElementById("game-mount"),
    _ => event.sender.send('rendered',gameState))
}

ipc.on('render-map',renderMap)

//EXPORTS
module.exports.renderMap = renderMap
