//RENDER PROCESS
const React = require("react")
const ReactDOM = require("react-dom")
const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")

let inputAtom = {
    mouseIn:{},
    mouseExited:{},
}

const updateInput = id => event => {
    const eventType = event.nativeEvent.type
    console.log(id)
    console.log(eventType)
}

const renderMap = (gameState,callback) => {
    return ReactDOM.render(<DrawMap {...gameState} update={updateInput}/>,document.getElementById("game-mount"),callback)
}


//EXPORTS
module.exports.renderMap = renderMap
module.exports.inputDeref = _ => ({...inputAtom})
