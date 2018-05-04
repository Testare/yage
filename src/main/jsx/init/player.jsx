const actorInit = actor => actor

module.exports.init = assets => actor => {
    const {actor:actorName, ...player} = (typeof actor === 'string') ? {actor:actor} : actor
    console.log(actor)
    console.log(actorName)
    console.log(player)
    console.log("---")
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
