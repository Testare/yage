const _ = require('lodash/fp')
const {init:playerInit} = require('./player')

let templateCount = 0

const template = (assets, templateName, rawState) => ({
    ...({physics:tPhysics,player:tPlayer}=assets.templateSprites[templateName]),
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
        posY:sprite.physics.posY - sprite.player.actor[sprite.player.animation].offsetY
    }}

const spriteInit = (assets) => spr => {
    if (_.isString(spr)) {
        return spriteInit(assets)(template(assets, spr, {}))
    }
    else {
        const {fromTemplate, ...rawState} = spr
        return (!fromTemplate)
        ? applyOffset({
            data: {},
            zFrame:20,
            ...rawState,
            player:playerInit(assets)(rawState.player)
        }) : spriteInit(assets)(template(assets, fromTemplate, rawState))
    }
} 



module.exports.init = spriteInit
