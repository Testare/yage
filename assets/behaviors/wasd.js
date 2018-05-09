const _ = require('lodash')
module.exports.update = ({utils:{sprites}, ui, me}) => _.flow(
    sprites.updatePhysics(me, {
        velX: ui.checkDown('KeyA') 
            ? -3
            : (ui.checkDown('KeyD') ? 3 : 0),
        velY: ui.checkDown('KeyW') 
            ? -2 
            : (ui.checkDown('KeyS') ? 4 : 0)
    }),
    flipAnimation(sprites,ui,me)
)

const flipAnimation = (sprites, ui, me) => 
    ui.checkPress('KeyA') 
    ? sprites.setAnimationFlipped(me, true)
    : ui.checkPress('KeyD') 
        ? sprites.setAnimationFlipped(me, false)
        : _.identity
