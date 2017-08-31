const {init:playerInit} = require('./player')

let templateCount = 0

const template = (assets, templateName, rawState) => ({
    ...assets.templateSprites[templateName],
    name:`${templateName}-${(templateCount=1+templateCount)}つ`, //Default is templateName + (number) + つ (To prevent sprite name conflicts)
    ...rawState
})

const spriteInit = (assets) => ({fromTemplate,...rawState}) => (!fromTemplate)?{
    zFrame:20,
    ...rawState,
    player:playerInit(assets)(rawState.player)
}:spriteInit(assets)(template(assets, fromTemplate, rawState))

module.exports.init = spriteInit
