const _ = require('lodash/fp');

module.exports.update = 
    ({utils, me}) => (!ui.checkPress('KeyO')) 
        ? _.identity 
        : _.pipe(
            utils.ops.logState("Heyo"),
            utils.ops.saveGameStateParams({saveName:`${me}-save.json`, segment:`map.spriteList['${me}']`,version:"a"})
        )
             //saveGameStateTo(state,"saveFile")