const _ = require('lodash')
const {optags} = require('../../ops')
// Later this might need to be required from another module

// This probably should not be exported
registerOp = (state, newOp) => _.update(state,'ops',x=>_.concat(x,[newOp]))
registerOpParams = tag => (state, params) => registerOp(state, [tag, params])

// Parameter-accepting functions
loadGameStateParams = registerOpParams(optags.loadState) 
loadMapParams = registerOpParams(optags.loadMap) 
logParams = registerOpParams(optags.log) 
pauseParams = registerOpParams(optags.pause)
saveGameStateParams = registerOpParams(optags.saveState) 
screenshotMapParams = registerOpParams(optags.screenshot)

// Pausing functions
pauseGame = (state) => pauseParams(state, {pauseValue:true}) 
unpauseGame = (state) => pauseParams(state, {pauseValue:false}) 
togglePauseGame = (state) => pauseParams(state, {pauseValue:"toggle"}) 

// Basic use functions
saveGameStateNamed = (state, saveName) => saveGameStateParams(state, {saveName})
saveGameStateTo = (state, fileLocation) => saveGameStateParams(state, {fileLocation})
loadGameStateNamed = (state, saveName) => loadGameStateParams(state, {saveName})
loadGameStateFrom = (state, fileLocation) => loadGameStateParams(state, {fileLocation})
loadMap = (state, mapName) => loadMapParams(state, {mapName})

log = (state, message) => logParams(state,{message})
logState = (state, message) => logParams(state,{message, displayState:true})

screenshotMap = (state) => screenshotMapParams(state,{})
screenshotMapToFile = (state, fileLocation) => screenshotMapParams(state, {fileLocation})

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
    screenshotMapToFile
}