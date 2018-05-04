const map = require("./map")
const _ = require('lodash')

const gameInit = assets => ({
    ...assets.config,
    map: map.init(assets)(assets.maps[assets.config.map]),
    assetPath:assets.assetPath
    //Load assets and config and initialize from there
})

module.exports.init = gameInit
