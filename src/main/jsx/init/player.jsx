const _ = require('lodash/fp')
const {init:actorInit} = require('./actor')

// Actors should not change, ever.
// They're like a collection of animations.
// PLAYERS change, indicating which animation the actor
// plays, how long until the next frame, what frame they're
// on currently.

// Therefore, it makes sense to cache actors.

// An interesting side effect is that if somebody were to 
// load actors but pass different assets the first time an
// actor is loaded then the second, the actor for the second
// would be from the first assets object. This might be exploitable
// for mods.

let actorCache = {} 

module.exports.init = assets => actor => {
    const {actor:actorName, ...player} = (typeof actor === 'string') ? {actor:actor} : actor
    return {
        currentFrame:0, //defaults
        flipped:false,
        animation:"main",
        ...player,
        ticks: 0,
        actor:(_.contains(actorName, actorCache)
            ? actorCache[actorName] 
            : (actorCache[actorName] =  actorInit(assets.actors[actorName]))
        )
    }
}