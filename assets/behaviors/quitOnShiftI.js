const _ = require('lodash');

module.exports.update = 
    ({utils, state}) => (!(ui.checkPress('KeyI') && (ui.checkDown("ShiftLeft") || ui.checkDown("ShiftRight"))))
        ? state 
        : utils.ops.quitGame(state) //utils.ops.loadGameStateNamed(state,"testsav.json")