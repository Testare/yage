//Hackish... Later this should just be based in the state
const fp = require('lodash/fp')
const ui = require('../ui')
const { update: playerUpdate } = require("./update-player") //This should be moved to the update folder
const {updateState: physicsUpdate} = require("./physics")

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

const testWrap = state => obj => {
    // Used for debugging, currently empty
    // [x,y] = ui.mapPos()
    // state.map.spriteList.bob.physics.posX = x - 17
    // state.map.spriteList.bob.physics.posY = y - 17
    if (ui.checkDown('KeyA')) {
        obj.map.spriteList.bob.physics.velX = -1;
    } else if (ui.checkDown('KeyD')) {
        obj.map.spriteList.bob.physics.velX = 1;
    } else {
        obj.map.spriteList.bob.physics.velX = 0;
    }
    if (ui.checkDown('KeyW')) {
        obj.map.spriteList.bob.physics.velY = -1;
    } else if (ui.checkDown('KeyS')) {
        obj.map.spriteList.bob.physics.velY = 1;
    } else {
        obj.map.spriteList.bob.physics.velY = 0;
    }
    return obj
}

const runUpdate = state => testWrap(state)(
    physicsUpdate(
        updatePlayers(state)
    )
) //STUB, to be modified

module.exports = runUpdate
