const _ = require('lodash')
module.exports.update = ({utils:{sprites}, ui, state, me}) => sprites.updatePhysics(state, me, {
    velX: ui.checkDown('KeyA') 
        ? -1 
        : (ui.checkDown('KeyD') ? 1 : 0),
    velY: ui.checkDown('KeyW') 
        ? -1 
        : (ui.checkDown('KeyS') ? 1 : 0)
})