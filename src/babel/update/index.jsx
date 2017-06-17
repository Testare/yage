const fp = require('lodash/fp')
const { update: playerUpdate } = require("./update-player") //This should be moved to the update folder

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const testWrap = state => fn => {
    state.map.spriteList.bob.physics.posX += 1;
    return fn
}

const runUpdate = state => testWrap(state)(updatePlayers(state)) //STUB, to be modified

module.exports = runUpdate
