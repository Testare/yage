const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!ui.checkPress('KeyP')) 
        ? state 
        : utils.ops.logState(
            utils.ops.screenshotMap(state),
            "Heyo"
        )
             //saveGameStateTo(state,"saveFile")