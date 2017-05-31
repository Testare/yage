//RENDER PROCESS
const React = require("react")
const ReactDOM = require("react-dom")
const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")

const renderMap = (event,mapState) => {
    return ReactDOM.render(<DrawMap {...mapState} />,document.getElementById("game-mount"),
    _ => event.sender.send('rendered',mapState))
}
console.log("draw added")

ipc.on('render-map',renderMap)

//EXPORTS
module.exports.renderMap = renderMap
