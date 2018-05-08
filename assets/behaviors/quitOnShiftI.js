const _ = require('lodash');

module.exports.update = 
    ({utils}) => (!(ui.checkPress('KeyI') && (ui.checkDown("ShiftLeft") || ui.checkDown("ShiftRight"))))
        ? _.identity 
        : utils.ops.quitGame()