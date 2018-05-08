const _ = require('lodash');

module.exports.update = 
    ({utils, state, me}) => (!ui.checkPress('KeyO')) 
        ? state 
        : utils.ops.logState(
            utils.ops.saveGameStateParams(state,{saveName:`${me}-save.json`, segment:`map.spriteList['${me}']`,version:"a"}),
            "Heyo"
        )
             //saveGameStateTo(state,"saveFile")