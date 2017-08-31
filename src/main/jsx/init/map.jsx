const sprite = require("./sprite")

const spriteRemap = (assets, sprList) => Object.keys(sprList).reduce(
    (acm,key) => ({
        ...acm,
        [key]:sprite.init(assets)({name:key,...sprList[key]})
    }),
    {}
)

module.exports.init = assets => ({spriteList,...initState}) => ({
    viewportX:0, //defaults
    viewportY:0,
    ...initState,
    spriteList:spriteRemap(assets, spriteList)
})

