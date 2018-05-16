const _ = require('lodash')
const actorInit = actor => _.mapValues(actor, (animation, animName) => ({
    src: (animName === 'main') ? `${actor.name}.png` : `${actor.name}.${animName}.png`, ...animation
}))

module.exports.init = assets => actor => {
    const {actor:actorName, ...player} = (typeof actor === 'string') ? {actor:actor} : actor
    return {
        currentFrame:0, //defaults
        flipped:false,
        animation:"main",
        ...player,
        ticks: 0,
        actor:actorInit(assets.actors[actorName])
    }
}

//module.exports.useMap ...
//potentially could use this to get a useMap for sprites that already have a mouseOver event and give them a detailed
//use-map to determine which collision boxes have been intersected.
