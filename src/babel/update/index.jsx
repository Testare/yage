const fp = require('lodash/fp')
const { update: playerUpdate } = require("./update-player") //This should be moved to the update folder

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const runUpdate = state => updatePlayers(state) //STUB, to be modified

module.exports = runUpdate
