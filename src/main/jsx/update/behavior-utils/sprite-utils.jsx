const _ = require('lodash')
const _fp = require('lodash/fp')

let cloneCount = 0;

module.exports.cloneMasterSprite = (spr, physics, state) => cloneMasterSpriteCallback(spr, physics, (m=>s=>s), state)
const cloneMasterSpriteCallback = (spr, physics, callback, state) => (
    name = `${spr}.${cloneCount++}つ`,
    _.curry(callback)(name)(_fp.update(
        'map.spriteList',
        spriteList => ({...spriteList, [name]:({...state.map.masterSpriteList[spr], physics, name})}),
        state
    ))
)

module.exports.cloneMasterSpriteCallback = cloneMasterSpriteCallback
module.exports.isAnimationFlipped = (spriteName, state) => state.map.spriteList[spriteName].player.flipped
module.exports.getPhysics = (spriteName, state) => state.map.spriteList[spriteName].physics
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