const _ = require('lodash')
module.exports.update = ({utils:{sprites}, ui, me}) => state => _.flow(
    _ => sprites.updatePhysics(state, me, {
        velX: ui.checkDown('KeyA') 
            ? -3
            : (ui.checkDown('KeyD') ? 3 : 0),
        velY: ui.checkDown('KeyW') 
            ? -2 
            : (ui.checkDown('KeyS') ? 4 : 0)
    }),
    flipAnimation(sprites,ui,me)
)()


const flipAnimation = (sprites, ui, me) => (state) =>
    ui.checkPress('KeyA') 
    ? sprites.setAnimationFlipped(state, me, true) 
    : ui.checkPress('KeyD') ? sprites.setAnimationFlipped(state, me, false) : state
