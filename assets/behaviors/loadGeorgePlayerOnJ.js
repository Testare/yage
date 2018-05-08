const _ = require('lodash');

module.exports.update = 
    ({utils, state, me}) => (!ui.checkPress('KeyJ')) 
        ? state 
        : utils.ops.logState(
            utils.ops.loadGameStateParams(state,{saveName:`${"george"}-save.json`,segment:`map.spriteList['${me}'].player`, loadHandler:k=>({saveObject:k.saveObject.player,version:k.version, segment:k.segment})}),
            "Heyo"
        )
             //saveGameStateTo(state,"saveFile")