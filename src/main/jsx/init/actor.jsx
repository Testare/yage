import _ from 'lodash/fp'

const parseCD = _.cond([
    [({coords}) => _.isString(coords), _.update('coords',_.compose(_.map(_.toNumber),_.split(',')))],
    [({coords}) => _.isArray(coords), _.identity],
    [_.stubTrue, collData => {throw Error(`Can't recognize coord format "${collData.coords}" in ${collData}!`)}]
])

// In the future: 
// * Add verification that input is correct, such as verifying that all animations have a width and height value
// * Verify that an animation works fine with no frames, or add verification to ensure there are frames/default frame
// * Add verification that this is called with a name attribute, which should be automatically added when assets are loaded


/*
const actorInit = ({name,...actor}) => _.mapValues.convert({'cap':false})((animation, animName) => ({
    src: (animName === 'main') ? `${name}.png` : `${name}.${animName}.png`, 
    offsetX: 0,
    offsetY: 0,
    ...animation,
    frames:_.map(x=>_.update('collisionData',_.map(parseCD), x), animation.frames)
}), actor)
*/

const actorInit = ({name,...actor}) => _.mapValues.convert({'cap':false})(animationInit(name), actor)


const animationInit = actorName => (animation, animationName) => ({
    src: (animationName === 'main') ? `${actorName}.png` : `${actorName}.${animationName}.png`, 
    offsetX: 0,
    offsetY: 0,
    ...animation,
    frames:_.map(x=>_.update('collisionData',_.map(parseCD), x), animation.frames)
})

export const init = actorInit