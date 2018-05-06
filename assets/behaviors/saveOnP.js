const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!ui.checkPress('KeyP')) 
        ? state 
        : utils.ops.screenshotMap(state) //saveGameStateTo(state,"saveFile")