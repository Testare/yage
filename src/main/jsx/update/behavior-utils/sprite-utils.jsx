const _ = require('lodash')

// ANIMATION
module.exports.setAnimationFlipped = (state, spriteName, flipped) => _.update(state,`map.spriteList["${spriteName}"].player.flipped`,_=>flipped)
module.exports.setAnimation = (state, spriteName, animationName) => _.update(state,`map.spriteList["${spriteName}"].player`,p=>({...p,animation:animationName, currentFrame: 0, ticks: 0}))
module.exports.getAnimation = (state, spriteName) => state.map.spriteList[spriteName].player.animation
// Implement this: module.exports.checkAnimationFinished = (state, spriteName) =>

module.exports.updateSprite = (state, spriteName, spriteUpdate) => _.update(
    state,
    `map.spriteList['${spriteName}']`, 
    (typeof spriteUpdate === 'function') ? spriteUpdate : (spr) => (Object.assign(spr, spriteUpdate)))

module.exports.updatePhysics = (state, spriteName, physicsUpdate) => _.update(
    state,
    `map.spriteList['${spriteName}'].physics`, 
    (typeof physicsUpdate === 'function') ? physicsUpdate : (phys) => (Object.assign(phys, physicsUpdate)))