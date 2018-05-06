const _ = require('lodash')
const {optags} = require('../../ops')
// Later this might need to be required from another module

// This probably should not be exported
registerOp = (state, newOp) => _.update(state,'ops',x=>_.concat(x,[newOp]))

// Pausing functions
pauseGame = (state) => registerOp(state, [optag.pause, {pauseValue:true}])
unpauseGame = (state) => registerOp(state, [optag.pause, {pauseValue:false}])
togglePauseGame = (state) => registerOp(state, [optag.pause, {pauseValue:"toggle"}]) // Might change implementation later

// Parameter-accepting functions
saveGameStateParams = (state, params) => registerOp(state, [optags.saveState, params])
loadGameStateParams = (state, params) => registerOp(state, [optags.loadState, params])
loadMapParams = (state, params) => registerOp(state, [optag.loadMap, params])
screenshotMapParams = (state, params) => registerOp(state, [optags.screenshot, params])

// Basic use functions
saveGameStateTo = (state, fileLocation) => saveGameStateParams(state, {fileLocation})
loadGameStateFrom = (state, fileLocation) => loadGameStateParams(state, {fileLocation})
loadMap = (state, mapName) => loadMapParams(state, {mapName})

screenshotMap = (state) => screenshotMapParams(state,{})
screenshotMapToFile = (state, fileLocation) => screenshotMapParams(state, {fileLocation})

module.exports = {
    saveGameStateParams,
    saveGameStateTo,
    loadGameStateParams,
    loadGameStateFrom,
    pauseGame,
    unpauseGame,
    togglePauseGame,
    loadMap,
    loadMapParams,
    screenshotMap
}