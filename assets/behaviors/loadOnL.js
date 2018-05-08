const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!ui.checkPress('KeyL')) 
        ? state 
        : utils.ops.loadMap(state,"castle") //utils.ops.loadGameStateNamed(state,"testsav.json")