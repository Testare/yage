const _ = require('lodash/fp');

module.exports.update = 
    ({utils, me}) => (!ui.checkPress('KeyK')) 
        ? _.identity 
        : _.pipe(
            utils.ops.loadGameStateParams({saveName:`${me}-save.json`,segment:`map.spriteList['${me}'].player`, loadHandler:k=>({saveObject:k.saveObject.player,version:k.version, segment:k.segment})}),
            utils.ops.logState("Heyo")
        )
             //saveGameStateTo(state,"saveFile")