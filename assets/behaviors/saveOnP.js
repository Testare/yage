const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!ui.checkPress('KeyP')) 
        ? state 
        : utils.ops.logState(
            //utils.ops.saveGameStateNamed(state,"testsav.json"),
            utils.ops.togglePauseGame(state),
            "Heyo"
        )
             //saveGameStateTo(state,"saveFile")