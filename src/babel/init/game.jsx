const map = require("./map")

const gameInit = assets => ({
    ...assets.config,
    map: map.init(assets.maps[assets.config.map]),
    //Load assets and config and initialize from there
})

module.exports.init = gameInit
