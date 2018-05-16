const _fp = require('lodash/fp')
const {optags} = require('../../ops')
// Later this might need to be required from another module

// This probably should not be exported
registerOp = newOp => _fp.update('ops',x=>_fp.concat(x,[newOp]))
registerOpParams = tag => params => registerOp([tag, params])

// Parameter-accepting functions
loadGameStateParams = registerOpParams(optags.loadState) 
loadMapParams = registerOpParams(optags.loadMap) 
logParams = registerOpParams(optags.log) 
pauseParams = registerOpParams(optags.pause)
saveGameStateParams = registerOpParams(optags.saveState) 
screenshotMapParams = registerOpParams(optags.screenshot)

// Pausing functions
pauseGame = () => pauseParams({pause:true}) 
unpauseGame = () => pauseParams({pause:false}) 
togglePauseGame = () => pauseParams({pause:p=>!p}) 

// Basic use functions
saveGameStateNamed = saveName => saveGameStateParams({saveName})
saveGameStateTo = fileLocation => saveGameStateParams({fileLocation})
loadGameStateNamed = saveName => loadGameStateParams({saveName})
loadGameStateFrom = fileLocation => loadGameStateParams({fileLocation})
loadMap = mapName => loadMapParams({mapName})

log = message => logParams({message})
logState = message => logParams({message, displayState:true})

screenshotMap = () => screenshotMapParams({})
screenshotMapToFile = fileLocation => screenshotMapParams({fileLocation})

quitGame = () => registerOp([optags.quitGame, ({})])

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