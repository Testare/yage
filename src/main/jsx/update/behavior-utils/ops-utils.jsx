const _fp = require('lodash/fp')
const {optags} = require('../../ops')
// Later this might need to be required from another module

// This probably should not be exported
const registerOp = newOp => _fp.update('ops',x=>_fp.concat(x,[newOp]))
const registerOpParams = tag => params => registerOp([tag, params])

// Parameter-accepting functions
const loadGameStateParams = registerOpParams(optags.loadState) 
const loadMapParams = registerOpParams(optags.loadMap) 
const logParams = registerOpParams(optags.log) 
const pauseParams = registerOpParams(optags.pause)
const saveGameStateParams = registerOpParams(optags.saveState) 
const screenshotMapParams = registerOpParams(optags.screenshot)

// Pausing functions
const pauseGame = () => pauseParams({pause:true}) 
const unpauseGame = () => pauseParams({pause:false}) 
const togglePauseGame = () => pauseParams({pause:p=>!p}) 

// Basic use functions
const saveGameStateNamed = saveName => saveGameStateParams({saveName})
const saveGameStateTo = fileLocation => saveGameStateParams({fileLocation})
const loadGameStateNamed = saveName => loadGameStateParams({saveName})
const loadGameStateFrom = fileLocation => loadGameStateParams({fileLocation})
const loadMap = mapName => loadMapParams({mapName})

const log = message => logParams({message})
const logState = message => logParams({message, displayState:true})

const screenshotMap = () => screenshotMapParams({})
const screenshotMapToFile = fileLocation => screenshotMapParams({fileLocation})

const quitGame = () => registerOp([optags.quitGame, ({})])

module.exports = {
    loadGameStateParams,
    loadMapParams,
    logParams,
    saveGameStateParams,
    screenshotMapParams,
    loadGameStateFrom,
    loadGameStateNamed,
    log,
    logState,
    saveGameStateNamed,
    saveGameStateTo,
    pauseGame,
    unpauseGame,
    togglePauseGame,
    loadMap,
    screenshotMap,
    screenshotMapToFile,
    quitGame
}