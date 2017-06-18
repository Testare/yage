//Hackish... Later this should just be based in the state
const fp = require('lodash/fp')
const ui = require('../ui')
const { update: playerUpdate } = require("./update-player") //This should be moved to the update folder

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const testWrap = state => fn => {
    [x,y] = ui.mapPos() 
    state.map.spriteList.bob.physics.posX = x - 17
    state.map.spriteList.bob.physics.posY = y - 17
    return fn
}

const runUpdate = state => testWrap(state)(updatePlayers(state)) //STUB, to be modified

module.exports = runUpdate
