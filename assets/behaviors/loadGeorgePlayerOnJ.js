const _ = require('lodash/fp');

module.exports.update = 
    ({utils:{ops}, me}) => (!ui.checkPress('KeyJ')) 
        ? _.identity 
        : _.pipe(
            ops.loadGameStateParams({saveName:`${"george"}-save.json`,segment:`map.spriteList['${me}'].player`, loadHandler:k=>({saveObject:k.saveObject.player,version:k.version, segment:k.segment})}),
            ops.logState("Heyo")
        )
             //saveGameStateTo(state,"saveFile")