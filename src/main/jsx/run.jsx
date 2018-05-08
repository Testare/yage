const electron = require("electron");
const {ipcRenderer: ipc } = electron;

// const assets = (process.argv.length > 2) ? require(path.join(__dirname, "../", process.argv[2])) : require('../assets');
const init = require("./init")
const loader = require("./loader")
const ui = require("./ui")
const update = require('./update')
const ops = require('./ops')

const assets = loader.loadAssetsFromPath(ipc.sendSync('get-assets','ping'))

const lastTick = -1 // Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 // How many milliseconds to wait between frames
const cleanupInterval = 120 // How many frames between similar cleanup ops

onkeydown = ui.inputDown
onkeyup = ui.inputUp
onmousedown = ui.inputDown
onmouseup = ui.inputUp
// Mousemove isn't handled here, but in the ui module.
// This means this is probably the wrong place for this to be handled as well
// It's just easy to do here for now because this is the window context.
// TODO Fix this by refactoring

const onLoop = runAtom => _ => {
    runAtom.gameState.input = ui.nextInput()
    runAtom.gameState = update(assets)(runAtom.gameState)
    if (runAtom.gameState.ops.length != 0) {
        runAtom.gameState = ops.runOps(runAtom.gameState, {document, assets, runAtom})
    }
    if (runAtom.tick % cleanupInterval == 0) { 
        // Every so often, remove finished sounds from ui
        runAtom.gameState = ui.cleanupSound(runAtom.gameState)
        // If more cleanup ops are necessary, switch with a switch statement
        // Do different cleanup ops for different values of runAtom.tick % cleanupInterval
        // To avoid putting huge loads on a single frame
    }
    // console.log(ui.derefInputAtom())
    if (!runAtom.running || runAtom.tick == lastTick) {
        // clearInterval(runAtom.currentLoop)
        stopRun(runAtom);

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
    runAtom.running = false
    console.log("daby")
    ipc.send('game-finished')
}

let globalRunAtom;

globalRunAtom = startRun(init.game(assets));

ipc.on('stop-game', _ => stopRun(globalRunAtom))
