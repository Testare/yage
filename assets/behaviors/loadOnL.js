const _ = require('lodash');

module.exports.update = 
    ({utils}) => (!ui.checkPress('KeyL')) 
        ? _.identity 
        : utils.ops.loadGameStateNamed("testsav.json") //utils.ops.loadMap("castle")