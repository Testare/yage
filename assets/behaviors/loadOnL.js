const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!ui.checkPress('KeyL')) 
        ? state 
        : utils.ops.logState(
            utils.ops.loadGameStateNamed(state,"testsav.json"),
            "Heyo"
        )
             //saveGameStateTo(state,"saveFile")