const _ = require('lodash')
const _fp = require('lodash/fp')
const sprite = require("./sprite")

// TODO This can probably be updated with some lodash functions and mapping the values
const spriteRemap = (assets, sprList) => Object.keys(sprList).reduce(
    ([spAcm, mspAcm], key) => (spr = {...sprite.init(assets)(sprList[key]), name:key},
        _.isEmpty(spr.physics)
        ? [spAcm, {
            ...mspAcm,
            [key]:spr
        }]
        : [{
            ...spAcm,
            [key]:spr
        }, mspAcm]
    ), 
    [{},{}]
)

const audioInit = ({tracks={},soundBoards=["all"], ...audio}) => ({
    fadeRate: 0,
    tracks: _.mapValues(tracks,v=>[v]),
    soundBoards:soundBoards,
    ...audio,
    sounds: {}, // Switch this and the previous line to allow sounds at start of map
    soundCounter: 0
})

const getAnimations = _fp.compose(
    _fp.uniq,
    _fp.filter(_fp.identity),
    _fp.flatMap(sprite => _fp.map(anim => anim.src, sprite.player.actor)),
    k=>(console.log(k),k)
)

module.exports.init = assets => ({audio, spriteList:sprites,...initState}) => (
    [spriteList, masterSpriteList] = spriteRemap(assets, sprites),
    {
        viewportX:0, //defaults
        viewportY:0,
        audio: audioInit(audio),
        ...initState,
        spriteList,
        masterSpriteList,
        animations:getAnimations({...spriteList, ...masterSpriteList})
    }
)

