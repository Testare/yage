//RENDER PROCESS
const React = require("react")
const ReactDOM = require("react-dom")
const {ipcRenderer:ipc} = require("electron")

const DrawMap = require("./draw-map")
const input = require("./input")

let inputAtom = {
    mouseIn:{},
    mouseExited:{},
}

const updateInput = id => event => {
    const eventType = event.nativeEvent.type
    // console.log(id)
    // console.log(eventType)
    // console.log(event)
}

const renderMap = (gameState,callback) => {
    return ReactDOM.render(<DrawMap {...gameState} update={updateInput}/>,document.getElementById("game-mount"),callback)
}


//EXPORTS
module.exports.renderMap = renderMap
module.exports

// module.exports.inputDown = input.inputDown
// module.exports.inputUp = input.inputUp
// module.exports.next = input.next
// module.exports.derefInputAtom = input.derefAtom
// module.exports.checkUp = input.checkUp
// module.exports.checkDown = input.checkDown
// module.exports.checkRelease = input.checkRelease
// module.exports.checkPress = input.checkPress
//TODO Refactor this better
