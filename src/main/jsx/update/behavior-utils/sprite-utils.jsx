const _ = require('lodash/fp')

// ANIMATION

const setAnimationFlipped = (spriteName, flipped, state) => _.update(`map.spriteList["${spriteName}"].player.flipped`,_=>flipped, state)
const setAnimation = (spriteName, animationName, state) => _.update(`map.spriteList["${spriteName}"].player`,p=>({...p,animation:animationName, currentFrame: 0, ticks: 0}), state)
const getAnimation = (spriteName, state) => state.map.spriteList[spriteName].player.animation
// Implement this: module.exports.checkAnimationFinished = (state, spriteName) =>

const updateSprite = (spriteName, spriteUpdate, state) => _.update(
    `map.spriteList['${spriteName}']`, 
    (typeof spriteUpdate === 'function') ? spriteUpdate : (spr) => (Object.assign(spr, spriteUpdate)),
    state)

const updatePhysics = (spriteName, physicsUpdate, state) => _.update(
    `map.spriteList['${spriteName}'].physics`, 
    (typeof physicsUpdate === 'function') ? physicsUpdate : (phys) => (Object.assign(phys, physicsUpdate)),
    state)

const functions = {
    setAnimationFlipped,
    setAnimation,
    getAnimation,
    updateSprite,
    updatePhysics
}

module.exports = _.mapValues(_.curry, functions)