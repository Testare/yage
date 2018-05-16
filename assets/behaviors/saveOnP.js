const _ = require('lodash');

module.exports.update = 
    ({utils}) => (!ui.checkPress('KeyP')) 
        ? _.identity 
        : _.flow(
            utils.ops.saveGameStateNamed("testsav.json"),
            utils.ops.logState("Heyo")
        )