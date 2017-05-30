const React = require("react")
const ReactDOM = require("react-dom")
//const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")

const renderMap = (mapState,callback=false) => (callback)?(
    ReactDOM.render(<DrawMap {...mapState} />,document.getElementById("game-mount"),_ => {
        callback(mapState)
    })
) : (
    ReactDOM.render(<DrawMap {...mapState} />,document.getElementById("game-mount"))
)


//EXPORTS
module.exports.renderMap = renderMap
