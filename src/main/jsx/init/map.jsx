const sprite = require("./sprite")

const spriteRemap = (assets, sprList) => Object.keys(sprList).reduce(
    (acm,key) => ({
        ...acm,
        [key]:sprite.init(assets)({name:key,...sprList[key]})
    }),
    {}
)

const audioInit = (audio) => ({
    fadeRate: 0,
    sounds: {}, // Switch this and the following line to not allow sounds at start of map
    ...audio,
    soundCounter: 0
})

module.exports.init = assets => ({audio, spriteList,...initState}) => ({
    viewportX:0, //defaults
    viewportY:0,
    audio: audioInit(audio),
    ...initState,
    spriteList:spriteRemap(assets, spriteList)
})

