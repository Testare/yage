const assets = require("../assets")

const pAnimation = ({actor,animation}) => actor[animation]
const actorInit = actor => actor

module.exports.init = ({actor:actorName,...player}) => ({
    currentFrame:0, //default
    ...player,
    ticks: 0, 
    actor:actorInit(assets.actors[actorName])
})

module.exports.styleFor = ({currentFrame,...player}) => ({
    backgroundImage: `url('../assets/actors/strips/${pAnimation(player).src}')`,
    backgroundPositionX: -currentFrame * pAnimation(player).width,
    width: pAnimation(player).width,
    height: pAnimation(player).height
})


module.exports.update =  ({currentFrame,ticks,...player}) => {
    //returns an update of the animation
    //maybe should have a flag at this level to pause animation
    //But more likely just have that flag set before this function is called
    const frames = pAnimation(player).frames
    const frameTicks = frames[currentFrames].ticks
    const newticks = frameTicks?((ticks + 1) % frameTicks):-1
    return ({
        ticks: newticks,
        currentFrame: (newticks != 0)?currentFrame:((currentFrame +1) % frameTicks.length),
        ...player
    })
}

//module.exports.useMap ...
//potentially could use this to get a useMap for sprites that already have a mouseOver event and give them a detailed
//use-map to determine which collision boxes have been intersected.