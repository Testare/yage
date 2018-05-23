const _ = require('lodash/fp')


// Actors should not change, ever.
// They're like a collection of animations.
// PLAYERS change, indicating which animaiton the actor
// plays, how long until the next frame, what frame they're
// on currently.

// Therefore, it makes sense to cache actors.

// An interesting side effect is that if somebody were to 
// load actors but pass different assets the first time an
// actor is loaded then the second, the actor for the second
// would be from the first assets object. This might be exploitable
// for mods.

let actorCache = {} 

const parseCD = _.cond([
    [({coords}) => _.isString(coords), ({coords, ...cd}) => ({...cd, coords:_.map(_.toNumber,coords.split(','))})],
    [({coords}) => _.isArray(coords), _.map(_.toNumber)],
    [_.stubTrue, ({coords, ...obj}) => {throw Error(`Can't recognize coord format "${coords}" in ${obj}!`)}]
])

/*const frameInit = ({collisionData, ...frame}) => ({
    collisionData:_.map(parseCD, collisionData),
    ...frame
})*/

const actorInit = ({name,...actor}) => _.mapValues.convert({'cap':false})((animation, animName) => ({
    src: (animName === 'main') ? `${name}.png` : `${name}.${animName}.png`, 
    offsetX: 0,
    offsetY: 0,
    ...animation,
    frames:_.map(x=>({...x, collisionData:_.map(parseCD,x.collisionData)}), animation.frames)
}), actor)

module.exports.init = assets => actor => {
    const {actor:actorName, ...player} = (typeof actor === 'string') ? {actor:actor} : actor
    return {
        currentFrame:0, //defaults
        flipped:false,
        animation:"main",
        ...player,
        ticks: 0,
        actor:(_.contains(actorName,actorCache)
            ? actorCache[actorName] 
            : (actorCache[actorName] =  actorInit(assets.actors[actorName]))
        )
    }
}

//module.exports.useMap ...
//potentially could use this to get a useMap for sprites that already have a mouseOver event and give them a detailed
//use-map to determine which collision boxes have been intersected.
