const electron = require("electron");
const {ipcRenderer: ipc } = electron;

// const assets = (process.argv.length > 2) ? require(path.join(__dirname, "../", process.argv[2])) : require('../assets');
const init = require("./init")
const ui = require("./ui")
const loader = require("./loader")
const update = require('./update')

const assets = loader.loadAssetsFromPath(ipc.sendSync('get-assets','ping'))

const lastTick = -1 // Game stops when tick === lastTick. Just set it to -1 when ready to use for real
const interval = 17 // How many milliseconds to wait between frames

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
    // console.log(ui.derefInputAtom())
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

let globalRunAtom;

globalRunAtom = startRun(init.game(assets));

ipc.on('stop-game', _ => stopRun(globalRunAtom))
