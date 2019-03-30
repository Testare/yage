const _ = require('lodash/fp')
const {init:playerInit} = require('./player')
const {initializeBehaviors} = require('./behaviors')

const physicsInit = physics => (!physics || _.isEmpty(physics))
    ? undefined 
    : _.assign({
        "posX":0,
        "posY":0,
        "velX":0,
        "velY":0
    }, physics
    ) 
// Verify behavior
const template = (assets, templateName, rawState) => {{
    const template = assets.templateSprites[templateName];
    const physics = physicsInit({...template.physics, ...rawState.physics})
    const player = {
        ...((typeof template.player === 'string')?{actor:template.player}:template.player),
        ...((typeof rawState.player === 'string')?{actor:rawState.player}:rawState.player)
    }
    return {
        ...template,
        ...rawState,
        physics,
        player
    }
}}

const applyOffsetAndBehaviors = (assets, sprite) => _.isEmpty(sprite.physics)
    ? sprite //Masters don't have behaviors initialized until they are cloned
    : initializeBehaviors(assets, {...sprite, physics: {
        velX:0,
        velY:0,
        ...sprite.physics,
        posX:(sprite.physics.posX || 0) - sprite.player.actor[sprite.player.animation].offsetX,
        posY:(sprite.physics.posY || 0) - sprite.player.actor[sprite.player.animation].offsetY
    }})

// This function might need to be refactored to another location
const spriteGroupsToFlag = (spriteGroupMap, spriteGroups) => _.reduce(
    (acm, sg) => spriteGroupMap[sg] | acm,
    0,
    spriteGroups
)

const spriteInit = assets => (spr, spriteGroups) => {
    if (_.isString(spr)) {
        return spriteInit(assets)(template(assets, spr, {}), spriteGroups)
    }
    else {
        const {fromTemplate, ...rawState} = spr
        return (!fromTemplate)
        ? applyOffsetAndBehaviors(assets, {
            data: {},
            behaviors: [],
            zFrame:20,
            ...rawState,
            collidesWith:spriteGroupsToFlag(spriteGroups, rawState.collidesWith || ["map"]), // Should default be none or map?
            groups:spriteGroupsToFlag(spriteGroups, rawState.groups || []),
            player:playerInit(assets)(rawState.player)
        }) : spriteInit(assets)(template(assets, fromTemplate, rawState), spriteGroups)
    }
} 

module.exports.init = spriteInit
