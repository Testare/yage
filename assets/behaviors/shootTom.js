const _ = require('lodash/fp')
module.exports.update = ({utils:{sprites}, ui, me}) => state => ui.checkPress('KeyT') ? (
    myPhysics = sprites.getPhysics(me, state),
    flipped = sprites.isAnimationFlipped(me, state),
    velX = flipped ? -1 : 1,
    sprites.cloneMasterSpriteCallback("tom",Object.assign(_.clone(myPhysics), {velX, velY:0}),
    (me, state) => sprites.setAnimationFlipped(state, me, flipped),
    state)
) : state