const _ = require('lodash')

const actorInit = ({name,...actor}) => _.mapValues(actor, (animation, animName) => ({
    src: (animName === 'main') ? `${name}.png` : `${name}.${animName}.png`, 
    offsetX: 0,
    offsetY: 0,
    ...animation
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