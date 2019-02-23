const _ = require('lodash/fp')
const {init:playerInit} = require('./player')

let templateCount = 0

// Verify behavior
const template = (assets, templateName, rawState) => {{
    const template = assets.templateSprites[templateName];
    const physics = {...template.physics, ...rawState.physics};
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

const applyOffset = sprite => _.isEmpty(sprite.physics)
    ? sprite
    : {...sprite, physics: {
        velX:0,
        velY:0,
        ...sprite.physics,
        posX:sprite.physics.posX - sprite.player.actor[sprite.player.animation].offsetX,
        posY:sprite.physics.posY - sprite.player.actor[sprite.player.animation].offsetY
    }}

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
        ? applyOffset({
            data: {},
            zFrame:20,
            ...rawState,
            collidesWith:spriteGroupsToFlag(spriteGroups, rawState.collidesWith || ["map"]), // Should default be none or map?
            groups:spriteGroupsToFlag(spriteGroups, rawState.groups || []),
            player:playerInit(assets)(rawState.player)
        }) : spriteInit(assets)(template(assets, fromTemplate, rawState), spriteGroups)
    }
} 



module.exports.init = spriteInit
