const electron = require("electron");
const {ipcRenderer: ipc } = electron;

const assets = require('../assets')
const init = require("./init")
const ui = require("./ui")
const update = require('./update')

const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 //How many milliseconds to wait between frames


//This should not be here forever
//Should be refactored to update submodule

const onLoop = runAtom => _ => {
    runAtom.gameState = update(runAtom.gameState)
    if (!runAtom.running || runAtom.tick == lastTick) {
        clearInterval(runAtom.currentLoop)
    } else if(!runAtom.tick) {
        ui.renderMap(runAtom.gameState,_=>ipc.send('rendered',true))
    } else {
        ui.renderMap(runAtom.gameState)
    }
    runAtom.tick++
}

const startRun = gameState => {
    //Closure to store the mutating state
    let runAtom = {
        gameState: gameState,
        tick: 0,
        running: true
    }
    runAtom['currentLoop'] = setInterval(onLoop(runAtom), interval)
    return runAtom
}

const stopRun = runAtom => {
    clearInterval(runAtom.currentLoop)
    runAtom[running] = false
}

let globalRunAtom = startRun(init.game(assets))

ipc.on('stop-game', _ => stopRun(globalRunAtom))
