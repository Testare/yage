const _ = require('lodash/fp')

let cloneCount = 0;
// ANIMATION
const bName = behavior => _.isString(behavior) ? behavior : behavior[0]

const removeBehavior = (spriteName, behaviorName, state) => _.update(
    `map.spriteList["${spriteName}"].behaviors`,
    _.filter(behavior => (bName(behavior) != behaviorName)),
    state
)

const cloneMasterSprite = (spr, physics, state) => cloneMasterSpriteCallback(spr, physics, (m=>s=>s), state)

//  Needs to be changed to apply behaviorInitialization after cloning
const cloneMasterSpriteCallback = (spr, physics, callback, state) => (
    name = `${spr}.${cloneCount++}つ`,
    _.curry(callback)(name)(_.update(
        'map.spriteList',
        spriteList => ({...spriteList, [name]:({...state.map.masterSpriteList[spr], physics, name})}),
        state
    ))
)

// ANIMATION
const setAnimation = (spriteName, animationName, state) => _.update(`map.spriteList["${spriteName}"].player`,p=>({...p,animation:animationName, currentFrame: 0, ticks: 0}), state)
const getAnimation = (spriteName, state) => state.map.spriteList[spriteName].player.animation
const isAnimationFlipped = (spriteName, state) => state.map.spriteList[spriteName].player.flipped
const setAnimationFlipped = (spriteName, flipped, state) => _.update(`map.spriteList["${spriteName}"].player.flipped`,_=>flipped, state)
// Implement this: module.exports.checkAnimationFinished = (state, spriteName) =>

const updateSprite = (spriteName, spriteUpdate, state) => _.update(
    `map.spriteList['${spriteName}']`, 
    (typeof spriteUpdate === 'function') ? spriteUpdate : (spr) => (Object.assign(spr, spriteUpdate)),
    state)

const getPhysics = (spriteName, state) => state.map.spriteList[spriteName].physics
const updatePhysics = (spriteName, physicsUpdate, state) => _.update(
    `map.spriteList['${spriteName}'].physics`, 
    (typeof physicsUpdate === 'function') ? physicsUpdate : (phys) => (Object.assign(phys, physicsUpdate)),
    state)

const functions = {
    cloneMasterSpriteCallback,
    cloneMasterSprite,
    getAnimation,
    setAnimation,
    isAnimationFlipped,
    setAnimationFlipped,
    updateSprite,
    getPhysics,
    updatePhysics
}

module.exports = _.mapValues(_.curry, functions)