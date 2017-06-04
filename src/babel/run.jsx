const electron = require("electron");
const fp = require('lodash/fp')
const game = require("./init/game")
const assets = require('../assets')
const {ipcRenderer: ipc } = electron;
const { update: playerUpdate } = require("./init/player")
const ui = require("./ui")

const lastTick = -1 //Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 //How many milliseconds to wait between frames


//This should not be here forever
//Should be refactored to update submodule
const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const runUpdate = state => updatePlayers(state) //STUB, to be modified

const onLoop = runAtom => _ => {
    runAtom.gameState = runUpdate(runAtom.gameState)
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

let globalRunAtom = startRun(game.init(assets))

ipc.on('stop-game', _ => stopRun(globalRunAtom))
