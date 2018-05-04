const _ = require('lodash')
const sprite = require("./sprite")

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

module.exports.init = assets => ({audio, spriteList,...initState}) => ({
    viewportX:0, //defaults
    viewportY:0,
    audio: audioInit(audio),
    ...initState,
    spriteList:spriteRemap(assets, spriteList)
})

