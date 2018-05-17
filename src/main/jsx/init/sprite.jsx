const _ = require('lodash/fp')
const {init:playerInit} = require('./player')

let templateCount = 0

const template = (assets, templateName, rawState) => ({
    ...({physics:tPhysics,player:tPlayer}=assets.templateSprites[templateName]),
    name:`${templateName}-${(templateCount=1+templateCount)}つ`, //Default is templateName + (number) + つ (To prevent sprite name conflicts)
    ...({physics:rPhysics,player:rPlayer}=rawState),
    physics:{...tPhysics,...rPhysics},
    player:{
        ...((typeof tPlayer === 'string')?{actor:tPlayer}:tPlayer),
        ...((typeof rPlayer === 'string')?{actor:rPlayer}:rPlayer)
    }
})

const applyOffset = sprite => _.isEmpty(sprite.physics)
    ? sprite
    : {...sprite, physics: {
        ...sprite.physics,
        posX:sprite.physics.posX - sprite.player.actor[sprite.player.animation].offsetX,
        posY:sprite.physics.posY - sprite.player.actor[sprite.player.animation].offsetY,
        candy:true
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
