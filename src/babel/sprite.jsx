const assets = require('../assets')
const {init:playerInit} = require('./player')

let templateCount = 0

const template = (templateName,rawState) => {console.log("hey!");console.log(templateName,rawState);return({
    ...assets.templateSprites[templateName],
    name:`${templateName}-${templateCount}つ`, //Default is templateName + (number) + つ (To prevent sprite name conflicts)
    ...rawState
})}

const init = ({fromTemplate,...rawState}) => (!fromTemplate)?{
    ...rawState,
    player:playerInit(rawState.player)
}:init(template(fromTemplate,rawState))

module.exports.init = init