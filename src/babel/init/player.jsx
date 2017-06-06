const assets = require("../../assets")

const actorInit = actor => actor
module.exports.init = ({actor:actorName,...player}) => ({
    currentFrame:0, //defaults
    flipped:false,
    ...player,
    ticks: 0,
    actor:actorInit(assets.actors[actorName])
})

//module.exports.useMap ...
//potentially could use this to get a useMap for sprites that already have a mouseOver event and give them a detailed
//use-map to determine which collision boxes have been intersected.
