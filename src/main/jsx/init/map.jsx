const _ = require('lodash')
const _fp = require('lodash/fp')
const sprite = require("./sprite")

// TODO This can probably be updated with some lodash functions and mapping the values
const spriteRemap = (assets, sprList) => Object.keys(sprList).reduce(
    (acm,key) => ({
        ...acm,
        [key]:sprite.init(assets)({name:key,...sprList[key]})
    }),
    {}
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
    _fp.flatMap(sprite => _fp.map(anim => anim.src, sprite.player.actor))
)

module.exports.init = assets => ({audio, spriteList,...initState}) => (sprites=spriteRemap(assets,spriteList), {
    viewportX:0, //defaults
    viewportY:0,
    audio: audioInit(audio),
    ...initState,
    spriteList:sprites,
    animations:getAnimations(sprites)
})

