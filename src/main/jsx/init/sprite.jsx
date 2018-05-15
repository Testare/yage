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

const spriteInit = (assets) => spr => {
    if (_.isString(spr)) {
        return spriteInit(assets)((k = template(assets, spr, {}), console.log(k), k))
    }
    else {
        const {fromTemplate, ...rawState} = spr
        return (!fromTemplate)
        ? applyOffset({
            zFrame:20,
            ...rawState,
            player:playerInit(assets)(rawState.player)
        }) : spriteInit(assets)(template(assets, fromTemplate, rawState))
    }
} 



module.exports.init = spriteInit
